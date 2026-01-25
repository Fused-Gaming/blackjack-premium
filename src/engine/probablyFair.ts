/**
 * ProbablyFair Verifiability Layer (PF-VL-1.0) compatible implementation
 * for provably fair card shuffling and verification.
 *
 * This module provides cryptographic seed generation, deterministic shuffling,
 * and verification capabilities aligned with ProbablyFair standards.
 *
 * Uses Web Crypto API for browser/Node.js compatibility
 */

/**
 * Represents a shuffle proof containing the seed and verification hash
 */
export interface ShuffleProof {
  /** Hex-encoded seed used for deterministic shuffle */
  seed: string;
  /** SHA-256 hash of the seed for pre-commitment */
  seedHash: string;
  /** Timestamp when shuffle was performed (ISO 8601) */
  timestamp: string;
  /** Version of the shuffle algorithm */
  version: string;
}

/**
 * Verification result for a shuffle proof
 */
export interface VerificationResult {
  /** Whether the proof is valid */
  valid: boolean;
  /** Error message if invalid */
  error?: string;
  /** Details about the verification */
  details: {
    seedHashValid: boolean;
    timestampValid: boolean;
    versionSupported: boolean;
  };
}

const ALGORITHM_VERSION = 'PF-VL-1.0-A';
const SEED_BYTES = 32; // 256 bits for strong entropy
const HASH_ALGORITHM = 'SHA-256';

/**
 * Convert array buffer to hex string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const view = new Uint8Array(buffer);
  return Array.from(view).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a cryptographically secure random seed
 *
 * Uses crypto.getRandomValues for secure entropy generation.
 * The seed is deterministic when provided, or random if not.
 *
 * @param providedSeed Optional hex-encoded seed. If not provided, a new one is generated.
 * @returns Hex-encoded seed string of 64 characters (256 bits)
 *
 * @example
 * // Generate a new random seed
 * const seed = generateSeed();
 *
 * // Use a specific seed for reproducibility
 * const seed = generateSeed('abc123...');
 */
export function generateSeed(providedSeed?: string): string {
  if (providedSeed) {
    // Validate provided seed format
    if (!/^[a-f0-9]{64}$/i.test(providedSeed)) {
      throw new Error('Invalid seed format. Expected 64 hexadecimal characters.');
    }
    return providedSeed.toLowerCase();
  }

  // Generate random seed using crypto.getRandomValues
  const randomArray = new Uint8Array(SEED_BYTES);
  crypto.getRandomValues(randomArray);
  return bufferToHex(randomArray.buffer);
}

/**
 * Create a SHA-256 hash of a seed for pre-commitment
 *
 * Used in the commitment phase of the shuffle proof to hash the seed
 * before it's revealed. This prevents the server from changing the seed
 * after the shuffle has been generated.
 *
 * @param seed Hex-encoded seed string
 * @returns Hex-encoded SHA-256 hash
 *
 * @example
 * const seed = generateSeed();
 * const seedHash = hashSeed(seed);
 */
export async function hashSeed(seed: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(seed);
  const hashBuffer = await crypto.subtle.digest(HASH_ALGORITHM, data);
  return bufferToHex(hashBuffer);
}

/**
 * Generate a shuffle proof (commitment + hash)
 *
 * Creates a verifiable record of the shuffle with timestamp and version info.
 * This proof can be stored and later used to verify the shuffle was fair.
 *
 * @param seed Optional hex-encoded seed. If not provided, a new one is generated.
 * @returns ShuffleProof object containing seed, hash, timestamp, and version
 *
 * @example
 * const proof = await generateShuffleProof();
 * // Store proof for later verification
 * console.log(proof.seedHash); // Can be committed to client before shuffle
 */
export async function generateShuffleProof(seed?: string): Promise<ShuffleProof> {
  const finalSeed = generateSeed(seed);
  const seedHash = await hashSeed(finalSeed);

  return {
    seed: finalSeed,
    seedHash,
    timestamp: new Date().toISOString(),
    version: ALGORITHM_VERSION,
  };
}

/**
 * Verify a shuffle proof is valid and well-formed
 *
 * Validates that:
 * - The seed hash matches the hash of the seed
 * - The timestamp is a valid ISO 8601 date
 * - The algorithm version is supported
 *
 * @param proof ShuffleProof to verify
 * @returns VerificationResult with validation status and details
 *
 * @example
 * const proof = await generateShuffleProof();
 * const result = await verifyShuffleProof(proof);
 * if (result.valid) {
 *   console.log('Shuffle proof is valid');
 * }
 */
export async function verifyShuffleProof(proof: ShuffleProof): Promise<VerificationResult> {
  const details = {
    seedHashValid: false,
    timestampValid: false,
    versionSupported: false,
  };

  // Verify seed hash
  try {
    const calculatedHash = await hashSeed(proof.seed);
    details.seedHashValid = calculatedHash === proof.seedHash;
    if (!details.seedHashValid) {
      return {
        valid: false,
        error: 'Seed hash does not match provided seed',
        details,
      };
    }
  } catch {
    return {
      valid: false,
      error: 'Invalid seed format',
      details,
    };
  }

  // Verify timestamp
  try {
    const timestamp = new Date(proof.timestamp);
    details.timestampValid = !isNaN(timestamp.getTime());
    if (!details.timestampValid) {
      return {
        valid: false,
        error: 'Invalid timestamp format',
        details,
      };
    }
  } catch {
    return {
      valid: false,
      error: 'Timestamp parsing failed',
      details,
    };
  }

  // Verify version support
  details.versionSupported = proof.version === ALGORITHM_VERSION;
  if (!details.versionSupported) {
    return {
      valid: false,
      error: `Unsupported version: ${proof.version}. Expected: ${ALGORITHM_VERSION}`,
      details,
    };
  }

  return {
    valid: true,
    details,
  };
}

/**
 * Deterministically shuffle a deck using a seed
 *
 * Implements Fisher-Yates shuffle algorithm using a seeded PRNG.
 * Given the same seed, produces identical shuffles (deterministic).
 * This allows independent verification of shuffle fairness.
 *
 * The PRNG uses SHA-256 in counter mode for deterministic randomness
 * that matches the ProbablyFair specification.
 *
 * @param deck Array of indices [0, 1, 2, ..., deckSize-1] to shuffle
 * @param seed Hex-encoded seed string
 * @returns Shuffled array maintaining all original indices
 *
 * @throws Error if seed is invalid format
 *
 * @example
 * // Shuffle a 52-card deck deterministically
 * const deckIndices = Array.from({ length: 52 }, (_, i) => i);
 * const seed = generateSeed();
 * const shuffled = seededShuffle(deckIndices, seed);
 * // Same seed always produces same shuffle
 * const shuffled2 = seededShuffle(deckIndices, seed);
 * // shuffled === shuffled2 (deep equal)
 */
export async function seededShuffle(deck: number[], seed: string): Promise<number[]> {
  // Validate seed format
  if (!/^[a-f0-9]{64}$/i.test(seed)) {
    throw new Error('Invalid seed format. Expected 64 hexadecimal characters.');
  }

  const shuffled = [...deck];
  const deckSize = shuffled.length;
  let seedCounter = 0;

  /**
   * Deterministic PRNG using SHA-256 in counter mode
   * Produces reproducible random numbers from seed
   */
  const seededRandom = async (): Promise<number> => {
    const encoder = new TextEncoder();
    const seedWithCounter = seed + seedCounter.toString().padStart(10, '0');
    const data = encoder.encode(seedWithCounter);
    const hashBuffer = await crypto.subtle.digest(HASH_ALGORITHM, data);
    seedCounter++;

    const view = new Uint32Array(hashBuffer);
    // Convert first 4 bytes to number in range [0, 1)
    const value = view[0] / 0xffffffff;
    return value;
  };

  // Fisher-Yates shuffle with seeded randomness
  for (let i = deckSize - 1; i > 0; i--) {
    const rand = await seededRandom();
    const j = Math.floor(rand * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Verify that a shuffle was performed with a specific seed
 *
 * Reproduces the shuffle using the given seed and compares it with
 * the provided shuffled result. If they match, the shuffle was fair
 * and reproducible using the claimed seed.
 *
 * @param originalDeck Original unshuaffle deck indices [0, 1, 2, ...]
 * @param shuffledDeck The shuffled deck that was claimed to use the seed
 * @param seed Hex-encoded seed to verify
 * @returns true if the seed produces the given shuffle result
 *
 * @example
 * const deck = Array.from({ length: 52 }, (_, i) => i);
 * const seed = generateSeed();
 * const shuffled = await seededShuffle(deck, seed);
 * const isValid = await verifyShuffleWithSeed(deck, shuffled, seed);
 * // isValid === true
 */
export async function verifyShuffleWithSeed(
  originalDeck: number[],
  shuffledDeck: number[],
  seed: string
): Promise<boolean> {
  try {
    const reproducedShuffle = await seededShuffle(originalDeck, seed);
    return JSON.stringify(reproducedShuffle) === JSON.stringify(shuffledDeck);
  } catch {
    return false;
  }
}

/**
 * Apply a seeded shuffle to a deck of cards
 *
 * High-level convenience function that takes a card deck and seed,
 * returns a shuffled deck using deterministic seeded algorithm.
 *
 * @param cards Array of Card objects
 * @param seed Hex-encoded seed string
 * @returns Shuffled card array
 *
 * @throws Error if seed is invalid
 *
 * @example
 * import { Card } from '../types';
 * import { createShoe } from './deck';
 *
 * const shoe = createShoe(6);
 * const seed = generateSeed();
 * const shuffled = await shuffleCardsWithSeed(shoe, seed);
 */
export async function shuffleCardsWithSeed<T>(cards: T[], seed: string): Promise<T[]> {
  const indices = Array.from({ length: cards.length }, (_, i) => i);
  const shuffledIndices = await seededShuffle(indices, seed);
  return shuffledIndices.map(i => cards[i]);
}
