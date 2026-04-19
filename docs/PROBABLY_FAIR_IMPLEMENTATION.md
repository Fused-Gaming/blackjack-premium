# ProbablyFair Implementation Guide

## Overview

This document describes the implementation of the ProbablyFair Verifiability Layer (PF-VL-1.0) compatible provably fair shuffle algorithm for Blackjack Premium.

## Architecture

The ProbablyFair implementation is located in `/src/engine/probablyFair.ts` and provides cryptographic seed generation, deterministic shuffling, and verification capabilities aligned with ProbablyFair standards.

### Core Components

#### 1. **Seed Generation** (`generateSeed`)
- Generates cryptographically secure random seeds using `crypto.getRandomValues()`
- Produces 256-bit (64 hexadecimal character) seeds
- Validates provided seeds for format compliance
- Supports reproducible shuffles when given an explicit seed

```typescript
// Generate a new random seed
const seed = generateSeed();

// Use a specific seed for reproducibility
const seed = generateSeed('abc123...(64 chars)...');
```

#### 2. **Seed Hashing** (`hashSeed`)
- Creates SHA-256 hashes of seeds for pre-commitment
- Prevents server from changing seeds after shuffle generation
- Uses Web Crypto API for browser/Node.js compatibility

```typescript
const seed = generateSeed();
const seedHash = await hashSeed(seed);
// seedHash can be committed to client before revealing seed
```

#### 3. **Shuffle Proofs** (`generateShuffleProof`)
- Generates complete proof objects containing:
  - **seed**: Hex-encoded 256-bit seed
  - **seedHash**: SHA-256 hash of the seed
  - **timestamp**: ISO 8601 timestamp
  - **version**: Algorithm version (PF-VL-1.0-A)

```typescript
const proof = await generateShuffleProof();
// Or with a specific seed:
const proof = await generateShuffleProof(mySeed);
```

#### 4. **Deterministic Shuffle** (`seededShuffle`)
- Implements Fisher-Yates algorithm with seeded PRNG
- Uses SHA-256 in counter mode for reproducible randomness
- Given the same seed, produces identical shuffles
- Allows independent verification of shuffle fairness

```typescript
const deckIndices = Array.from({ length: 52 }, (_, i) => i);
const seed = generateSeed();
const shuffled = await seededShuffle(deckIndices, seed);
// Same seed always produces same shuffle:
const shuffled2 = await seededShuffle(deckIndices, seed);
// shuffled === shuffled2
```

#### 5. **Verification** (`verifyShuffleWithSeed`)
- Reproduces shuffle using provided seed
- Compares with claimed shuffled result
- Returns true if shuffle was fair and reproducible

```typescript
const isValid = await verifyShuffleWithSeed(originalDeck, shuffledDeck, seed);
```

## Workflow: Auditable Shuffle Process

### Phase 1: Commitment
Server generates seed and commits hash to client:

```typescript
const proof = await generateShuffleProof();
// Send seedHash to client for commitment
sendToClient({ seedHash: proof.seedHash });
```

### Phase 2: Shuffle
Server performs the deterministic shuffle:

```typescript
const shoe = createShoe(6); // Standard 6-deck shoe
const shuffled = await shuffleCardsWithSeed(shoe, proof.seed);
```

### Phase 3: Verification
Client can independently verify the shuffle:

```typescript
// Client receives revealed seed
const isValid = await verifyShuffleWithSeed(originalDeck, shuffledDeck, seed);

// Client can also verify seed hash matches
const recalculatedHash = await hashSeed(seed);
expect(recalculatedHash).toBe(committedSeedHash);
```

### Phase 4: Proof Validation
Verify the complete proof:

```typescript
const result = await verifyShuffleProof(proof);
if (result.valid) {
  console.log('Shuffle proof is cryptographically valid');
}
```

## Integration with Game Engine

### Current Implementation

The deck module provides convenient wrapper functions:

```typescript
import { shuffleDeckWithSeed, shuffleDeckWithProof, createShoe } from '@/engine/deck';

// Get a shuffled deck with proof
const shoe = createShoe(6);
const { shuffled, proof } = await shuffleDeckWithProof(shoe);

// Or with a specific seed
const { shuffled: shuffledAgain } = await shuffleDeckWithSeed(shoe, proof.seed);
```

### Legacy Synchronous Shuffle

For backward compatibility with existing game logic, a synchronous `shuffleDeck()` function is provided. This uses basic cryptographic randomness without ProbablyFair verification:

```typescript
const shuffle = shuffleDeck(deck); // Synchronous, no verification
```

## Cryptographic Details

### Algorithm Version
- **PF-VL-1.0-A**: ProbablyFair Verifiability Layer version 1.0, Algorithm profile A

### Hash Algorithm
- **SHA-256**: Industry-standard cryptographic hash function

### Seed Size
- **256 bits (32 bytes)**: Provides strong entropy (2^256 possible seeds)

### PRNG Implementation
- **SHA-256 Counter Mode**: Deterministic PRNG using SHA-256 in counter mode
  - Seed + counter is hashed repeatedly
  - Counter increments for each random number
  - First 32 bits of hash used as random value

### Fisher-Yates Shuffle
- **O(n) complexity**: Linear time shuffle
- **Unbiased**: Every permutation equally likely (with proper PRNG)
- **In-place**: Memory efficient

## Security Properties

### Fairness Guarantees
1. **Pre-commitment**: Seed hash committed before shuffle
2. **Determinism**: Same seed always produces same shuffle
3. **Transparency**: Anyone can verify shuffle with seed
4. **Auditability**: Complete proof trail for compliance

### Cryptographic Security
1. **256-bit entropy**: Seed has 2^256 possible values
2. **SHA-256**: Collision-resistant hash function
3. **Web Crypto API**: Uses native browser cryptography
4. **No User RNG**: Uses only crypto-secure randomness

## Testing

### Test Coverage

Complete test suite in `/src/engine/__tests__/probablyFair.test.ts`:

- **Seed Generation**: Format validation, entropy, determinism
- **Hashing**: Consistency, collision resistance
- **Shuffle**: Determinism, unbiased distribution, edge cases
- **Verification**: Proof validation, shuffle reproduction
- **Integration**: Full auditable workflow, consistency guarantees
- **Performance**: Benchmarks for production use

### Running Tests

```bash
npm test probablyFair.test.ts
```

### Key Test Scenarios

#### 1. Deterministic Shuffle
```typescript
const seed = generateSeed();
const shuffle1 = await seededShuffle(deck, seed);
const shuffle2 = await seededShuffle(deck, seed);
expect(shuffle1).toEqual(shuffle2); // Always true
```

#### 2. Unbiased Distribution
```typescript
// Statistical test: card positions distributed evenly
for (let i = 0; i < 100; i++) {
  const shuffled = await seededShuffle(deck, generateSeed());
  // Track where each card ends up
}
// All positions should have roughly equal frequency
```

#### 3. Proof Verification
```typescript
const proof = await generateShuffleProof();
const result = await verifyShuffleProof(proof);
expect(result.valid).toBe(true);
expect(result.details.seedHashValid).toBe(true);
```

## Performance Characteristics

### Benchmarks

On modern hardware:

- **Seed Generation**: < 1ms per seed (1000 seeds < 1 second)
- **Hash Operation**: < 1ms per hash
- **Shuffle 312 cards**: < 500ms for 100 shuffles
- **Verification**: < 500ms for 100 verifications

### Optimization Notes

- Seed generation uses native `crypto.getRandomValues()`
- Hashing uses Web Crypto API (hardware-accelerated)
- Shuffle uses pure JavaScript (I/O bounded by hash operations)
- No external dependencies for cryptography

## Future Enhancements

### Planned Improvements

1. **Merkle Tree Proofs**: For larger datasets (multiple rounds)
2. **Timing Proofs**: To prevent pre-computation attacks
3. **Public Registry**: Publish proof hashes to immutable ledger
4. **Client Verification**: Browser-based proof validation SDK
5. **Analytics**: Track fairness metrics and RTP verification

### ProbablyFair SDK Integration

When official JavaScript bindings become available:

```bash
npm install @probablyfair/js-sdk
```

The implementation is designed to be compatible with the official ProbablyFair SDK and can be migrated when ready.

## Compliance and Standards

### PF-VL-1.0 Compliance

This implementation follows the ProbablyFair Verifiability Layer 1.0 specification:

- ✅ Seed-based deterministic randomness
- ✅ SHA-256 cryptographic hashing
- ✅ Seed pre-commitment via hash
- ✅ Timestamp recording
- ✅ Version tracking
- ✅ Complete verification workflow

### Standards References

- **Web Crypto API**: MDN Web Docs
- **SHA-256**: NIST FIPS 180-4
- **Fisher-Yates**: D. Knuth, "The Art of Computer Programming"
- **ProbablyFair**: https://probablyfair.org/specs

## Examples and Usage

### Example 1: Basic Shuffle with Verification

```typescript
import { generateSeed, seededShuffle, verifyShuffleWithSeed } from '@/engine/probablyFair';

const deck = Array.from({ length: 52 }, (_, i) => i);
const seed = generateSeed();

// Shuffle deterministically
const shuffled = await seededShuffle(deck, seed);

// Verify the shuffle
const isValid = await verifyShuffleWithSeed(deck, shuffled, seed);
console.log(isValid); // true
```

### Example 2: Auditable Game Round

```typescript
import { shuffleDeckWithProof, createShoe } from '@/engine/deck';

async function startAuditableRound() {
  // Create shoe
  const shoe = createShoe(6);

  // Shuffle with proof
  const { shuffled, proof } = await shuffleDeckWithProof(shoe);

  // Store proof for later verification
  storeProof({
    gameId: Date.now(),
    seedHash: proof.seedHash, // Commit this to client
    timestamp: proof.timestamp,
    version: proof.version,
  });

  // Later: reveal seed and verify
  // const verified = await verifyShuffleWithSeed(originalShoe, shuffled, proof.seed);
}
```

### Example 3: Multiple Shuffles with Same Seed

```typescript
const seed = generateSeed();
const deck = createDeck();

// Generate multiple shuffles with same seed
const shuffles = await Promise.all(
  Array.from({ length: 10 }, () => shuffleCardsWithSeed(deck, seed))
);

// All should be identical
for (let i = 1; i < shuffles.length; i++) {
  expect(shuffles[i]).toEqual(shuffles[0]);
}
```

## Troubleshooting

### Common Issues

#### "Invalid seed format"
- Seed must be exactly 64 hexadecimal characters
- Allowed characters: 0-9, a-f (case-insensitive)

#### "Shuffle does not match seed"
- Ensure you're using the exact same seed
- Verify no mutations to original deck
- Check that seed wasn't accidentally modified

#### Performance Issues
- Large decks (>1000 cards): Break into multiple shuffles
- Multiple shuffles: Use Promise.all for parallelization
- High frequency: Cache frequently used seeds

## API Reference

### Seed Generation

```typescript
generateSeed(providedSeed?: string): string
```

### Hashing

```typescript
hashSeed(seed: string): Promise<string>
```

### Proof Generation

```typescript
generateShuffleProof(seed?: string): Promise<ShuffleProof>
verifyShuffleProof(proof: ShuffleProof): Promise<VerificationResult>
```

### Shuffling

```typescript
seededShuffle(deck: number[], seed: string): Promise<number[]>
shuffleCardsWithSeed<T>(cards: T[], seed: string): Promise<T[]>
```

### Verification

```typescript
verifyShuffleWithSeed(
  originalDeck: number[],
  shuffledDeck: number[],
  seed: string
): Promise<boolean>
```

## Contact and Support

For questions about the ProbablyFair implementation:

- **Implementation**: See `/src/engine/probablyFair.ts`
- **Tests**: See `/src/engine/__tests__/probablyFair.test.ts`
- **Standards**: https://probablyfair.org/specs
- **GitHub**: https://github.com/probablyfair

## License

This implementation is provided under the same license as Blackjack Premium.
