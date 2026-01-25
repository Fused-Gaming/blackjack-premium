import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateSeed,
  hashSeed,
  generateShuffleProof,
  verifyShuffleProof,
  seededShuffle,
  verifyShuffleWithSeed,
  shuffleCardsWithSeed,
} from '../probablyFair';
import type { ShuffleProof } from '../probablyFair';

describe('ProbablyFair Implementation', () => {
  describe('generateSeed', () => {
    it('should generate a 64-character hex string', () => {
      const seed = generateSeed();
      expect(seed).toMatch(/^[a-f0-9]{64}$/);
      expect(seed.length).toBe(64);
    });

    it('should generate different seeds on each call', () => {
      const seed1 = generateSeed();
      const seed2 = generateSeed();
      expect(seed1).not.toBe(seed2);
    });

    it('should accept and return provided seed in lowercase', () => {
      const provided = 'A'.repeat(64);
      const seed = generateSeed(provided);
      expect(seed).toBe(provided.toLowerCase());
    });

    it('should throw error for invalid seed format', () => {
      expect(() => generateSeed('invalid')).toThrow('Invalid seed format');
      expect(() => generateSeed('xyz')).toThrow('Invalid seed format');
      expect(() => generateSeed('1'.repeat(63))).toThrow('Invalid seed format'); // 63 chars
    });

    it('should throw error for non-hex characters', () => {
      expect(() => generateSeed('g' + 'a'.repeat(63))).toThrow('Invalid seed format');
      expect(() => generateSeed('z' + 'a'.repeat(63))).toThrow('Invalid seed format');
    });

    it('should accept uppercase and convert to lowercase', () => {
      const upper = 'ABCDEF0123456789'.repeat(4); // 64 chars
      const result = generateSeed(upper);
      expect(result).toBe(upper.toLowerCase());
    });
  });

  describe('hashSeed', () => {
    it('should return 64-character hex hash', async () => {
      const seed = generateSeed();
      const hash = await hashSeed(seed);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
      expect(hash.length).toBe(64);
    });

    it('should be deterministic (same seed = same hash)', async () => {
      const seed = generateSeed();
      const hash1 = await hashSeed(seed);
      const hash2 = await hashSeed(seed);
      expect(hash1).toBe(hash2);
    });

    it('should differ for different seeds', async () => {
      const seed1 = generateSeed();
      const seed2 = generateSeed();
      const hash1 = await hashSeed(seed1);
      const hash2 = await hashSeed(seed2);
      expect(hash1).not.toBe(hash2);
    });

    it('should produce consistent SHA-256 output', async () => {
      // Known seed should always produce same hash
      const knownSeed = 'a'.repeat(64);
      const hash1 = await hashSeed(knownSeed);
      const hash2 = await hashSeed(knownSeed);
      expect(hash1).toBe(hash2);
    });
  });

  describe('generateShuffleProof', () => {
    it('should generate a valid shuffle proof', async () => {
      const proof = await generateShuffleProof();
      expect(proof).toHaveProperty('seed');
      expect(proof).toHaveProperty('seedHash');
      expect(proof).toHaveProperty('timestamp');
      expect(proof).toHaveProperty('version');
    });

    it('should have 64-char hex seed', async () => {
      const proof = await generateShuffleProof();
      expect(proof.seed).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should have 64-char hex seedHash', async () => {
      const proof = await generateShuffleProof();
      expect(proof.seedHash).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should have valid ISO 8601 timestamp', async () => {
      const proof = await generateShuffleProof();
      const date = new Date(proof.timestamp);
      expect(date.getTime()).not.toBeNaN();
    });

    it('should have correct version', async () => {
      const proof = await generateShuffleProof();
      expect(proof.version).toBe('PF-VL-1.0-A');
    });

    it('should use provided seed', async () => {
      const seed = generateSeed();
      const proof = await generateShuffleProof(seed);
      expect(proof.seed).toBe(seed);
      expect(proof.seedHash).toBe(await hashSeed(seed));
    });

    it('seedHash should match hash of seed', async () => {
      const proof = await generateShuffleProof();
      const recalculatedHash = await hashSeed(proof.seed);
      expect(proof.seedHash).toBe(recalculatedHash);
    });
  });

  describe('verifyShuffleProof', () => {
    let validProof: ShuffleProof;

    beforeEach(async () => {
      validProof = await generateShuffleProof();
    });

    it('should verify a valid proof', async () => {
      const result = await verifyShuffleProof(validProof);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should detect invalid seed hash', async () => {
      const proof = await generateShuffleProof();
      proof.seedHash = 'a'.repeat(64); // Wrong hash
      const result = await verifyShuffleProof(proof);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Seed hash does not match');
    });

    it('should detect invalid timestamp', async () => {
      const proof = await generateShuffleProof();
      proof.timestamp = 'invalid-date';
      const result = await verifyShuffleProof(proof);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid timestamp');
    });

    it('should detect unsupported version', async () => {
      const proof = await generateShuffleProof();
      proof.version = 'PF-VL-2.0-A';
      const result = await verifyShuffleProof(proof);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Unsupported version');
    });

    it('should provide detailed verification info', async () => {
      const result = await verifyShuffleProof(validProof);
      expect(result.details).toHaveProperty('seedHashValid', true);
      expect(result.details).toHaveProperty('timestampValid', true);
      expect(result.details).toHaveProperty('versionSupported', true);
    });

    it('should fail gracefully on invalid seed format', async () => {
      const proof = await generateShuffleProof();
      proof.seed = 'invalid'; // Not hex
      const result = await verifyShuffleProof(proof);
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('seededShuffle', () => {
    it('should shuffle an array of indices', async () => {
      const deck = [0, 1, 2, 3, 4];
      const seed = generateSeed();
      const shuffled = await seededShuffle(deck, seed);
      expect(shuffled.sort((a, b) => a - b)).toEqual(deck.sort((a, b) => a - b));
      expect(shuffled).toHaveLength(5);
    });

    it('should be deterministic (same seed = same shuffle)', async () => {
      const deck = Array.from({ length: 52 }, (_, i) => i);
      const seed = generateSeed();
      const shuffle1 = await seededShuffle(deck, seed);
      const shuffle2 = await seededShuffle(deck, seed);
      expect(shuffle1).toEqual(shuffle2);
    });

    it('should produce different shuffles with different seeds', async () => {
      const deck = Array.from({ length: 52 }, (_, i) => i);
      const seed1 = generateSeed();
      const seed2 = generateSeed();
      const shuffle1 = await seededShuffle(deck, seed1);
      const shuffle2 = await seededShuffle(deck, seed2);
      expect(shuffle1).not.toEqual(shuffle2);
    });

    it('should not modify original deck', async () => {
      const deck = [0, 1, 2, 3, 4];
      const original = [...deck];
      const seed = generateSeed();
      await seededShuffle(deck, seed);
      expect(deck).toEqual(original);
    });

    it('should work with large decks', async () => {
      const deck = Array.from({ length: 312 }, (_, i) => i); // 6 decks
      const seed = generateSeed();
      const shuffled = await seededShuffle(deck, seed);
      expect(shuffled).toHaveLength(312);
      expect(new Set(shuffled).size).toBe(312); // All unique
    });

    it('should throw error for invalid seed', async () => {
      const deck = [0, 1, 2, 3];
      await expect(seededShuffle(deck, 'invalid')).rejects.toThrow('Invalid seed format');
      await expect(seededShuffle(deck, 'abc')).rejects.toThrow('Invalid seed format');
    });

    it('should validate seed format strictly', async () => {
      const deck = [0, 1, 2, 3];
      const validSeed = generateSeed();
      // Should work
      await expect(seededShuffle(deck, validSeed)).resolves.toBeDefined();
      // Should fail
      await expect(seededShuffle(deck, validSeed.slice(0, 63))).rejects.toThrow();
    });

    it('should produce unbiased distribution over multiple shuffles', async () => {
      // Statistical test: position 0 should appear at each index roughly equally
      const deck = Array.from({ length: 10 }, (_, i) => i);
      const positions = new Map<number, number>();

      for (let i = 0; i < 100; i++) {
        const seed = generateSeed();
        const shuffled = await seededShuffle(deck, seed);
        const pos = shuffled.indexOf(0); // Where did card 0 end up?
        positions.set(pos, (positions.get(pos) ?? 0) + 1);
      }

      // Each position should have roughly equal frequency (10 positions, 100 tests)
      // With some tolerance (5-15 occurrences expected instead of 10)
      for (const count of positions.values()) {
        expect(count).toBeGreaterThan(3); // Not too skewed
        expect(count).toBeLessThan(25); // Not too concentrated
      }
    });
  });

  describe('verifyShuffleWithSeed', () => {
    it('should verify correct shuffle with seed', async () => {
      const deck = Array.from({ length: 52 }, (_, i) => i);
      const seed = generateSeed();
      const shuffled = await seededShuffle(deck, seed);
      const isValid = await verifyShuffleWithSeed(deck, shuffled, seed);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect shuffle', async () => {
      const deck = Array.from({ length: 52 }, (_, i) => i);
      const seed = generateSeed();
      const shuffled = await seededShuffle(deck, seed);
      // Manually shuffle to create wrong shuffle
      shuffled[0] = shuffled[1];
      const isValid = await verifyShuffleWithSeed(deck, shuffled, seed);
      expect(isValid).toBe(false);
    });

    it('should reject wrong seed', async () => {
      const deck = Array.from({ length: 52 }, (_, i) => i);
      const seed1 = generateSeed();
      const seed2 = generateSeed();
      const shuffled = await seededShuffle(deck, seed1);
      const isValid = await verifyShuffleWithSeed(deck, shuffled, seed2);
      expect(isValid).toBe(false);
    });

    it('should handle invalid seed gracefully', async () => {
      const deck = Array.from({ length: 52 }, (_, i) => i);
      const shuffled = await seededShuffle(deck, generateSeed());
      const isValid = await verifyShuffleWithSeed(deck, shuffled, 'invalid');
      expect(isValid).toBe(false);
    });

    it('should verify full roundtrip', async () => {
      const originalDeck = Array.from({ length: 100 }, (_, i) => i);
      const seed = generateSeed();
      const shuffled = await seededShuffle(originalDeck, seed);
      const verified = await verifyShuffleWithSeed(originalDeck, shuffled, seed);
      expect(verified).toBe(true);
    });
  });

  describe('shuffleCardsWithSeed', () => {
    it('should shuffle an array of objects deterministically', async () => {
      const cards = Array.from({ length: 5 }, (_, i) => ({ id: i, value: i * 2 }));
      const seed = generateSeed();
      const shuffled1 = await shuffleCardsWithSeed(cards, seed);
      const shuffled2 = await shuffleCardsWithSeed(cards, seed);
      expect(shuffled1).toEqual(shuffled2);
    });

    it('should not modify original array', async () => {
      const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const original = JSON.parse(JSON.stringify(cards));
      const seed = generateSeed();
      await shuffleCardsWithSeed(cards, seed);
      expect(cards).toEqual(original);
    });

    it('should maintain all elements', async () => {
      const cards = Array.from({ length: 52 }, (_, i) => ({ index: i }));
      const seed = generateSeed();
      const shuffled = await shuffleCardsWithSeed(cards, seed);
      expect(shuffled).toHaveLength(52);
      expect(new Set(shuffled.map(c => c.index)).size).toBe(52);
    });

    it('should throw on invalid seed', async () => {
      const cards = [1, 2, 3];
      await expect(shuffleCardsWithSeed(cards, 'invalid')).rejects.toThrow();
    });

    it('should work with different data types', async () => {
      // Test with strings
      const strings = ['a', 'b', 'c', 'd'];
      const seed = generateSeed();
      const shuffledStrings = await shuffleCardsWithSeed(strings, seed);
      expect(new Set(shuffledStrings)).toEqual(new Set(strings));

      // Test with objects
      const objects = [{ name: 'Alice' }, { name: 'Bob' }];
      const shuffledObjects = await shuffleCardsWithSeed(objects, seed);
      expect(shuffledObjects).toHaveLength(2);
    });
  });

  describe('Integration Tests', () => {
    it('should support full shuffle-and-verify workflow', async () => {
      // Setup
      const deck = Array.from({ length: 52 }, (_, i) => i);

      // Generate proof and shuffle
      const proof = await generateShuffleProof();
      const shuffled = await seededShuffle(deck, proof.seed);

      // Verify proof
      const proofResult = await verifyShuffleProof(proof);
      expect(proofResult.valid).toBe(true);

      // Verify shuffle with seed
      const shuffleResult = await verifyShuffleWithSeed(deck, shuffled, proof.seed);
      expect(shuffleResult).toBe(true);
    });

    it('should support auditable shuffle workflow', async () => {
      // Phase 1: Server generates seed and commits
      const proof = await generateShuffleProof();
      const seedHash = proof.seedHash; // Send to client for commitment

      // Phase 2: Server shuffles with seed
      const deck = Array.from({ length: 52 }, (_, i) => i);
      const shuffled = await seededShuffle(deck, proof.seed);

      // Phase 3: Client can verify with revealed seed
      const isValid = await verifyShuffleWithSeed(deck, shuffled, proof.seed);
      expect(isValid).toBe(true);

      // Phase 4: Client verifies seed hash matches
      const recalculatedHash = await hashSeed(proof.seed);
      expect(recalculatedHash).toBe(seedHash);
    });

    it('should maintain consistency across multiple shuffles', async () => {
      const deck = Array.from({ length: 52 }, (_, i) => i);
      const seed = generateSeed();

      // Multiple shuffles with same seed
      const shuffles = await Promise.all(
        Array.from({ length: 10 }, () => seededShuffle(deck, seed))
      );

      // All should be identical
      for (let i = 1; i < shuffles.length; i++) {
        expect(shuffles[i]).toEqual(shuffles[0]);
      }
    });
  });

  describe('Performance Benchmarks', () => {
    it('should generate seed quickly', () => {
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        generateSeed();
      }
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(1000); // Should be < 1 second for 1000 seeds
    });

    it('should shuffle 312 cards quickly', async () => {
      const deck = Array.from({ length: 312 }, (_, i) => i);
      const seed = generateSeed();
      const start = performance.now();
      for (let i = 0; i < 10; i++) {
        await seededShuffle(deck, seed);
      }
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(5000); // Should be < 5 second for 10 shuffles
    });
  });
});
