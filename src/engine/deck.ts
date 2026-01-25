import type { Card, Rank, Suit } from '../types';
import { shuffleCardsWithSeed, generateShuffleProof } from './probablyFair';
import type { ShuffleProof } from './probablyFair';

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/**
 * Create a standard 52-card deck
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        suit,
        rank,
        faceUp: false,
      });
    }
  }

  return deck;
}

/**
 * Create multiple decks (typically 6 for blackjack)
 */
export function createShoe(deckCount: number = 6): Card[] {
  const shoe: Card[] = [];

  for (let i = 0; i < deckCount; i++) {
    shoe.push(...createDeck());
  }

  return shoe;
}

/**
 * Synchronous shuffle using Web Crypto API (deprecated - use shuffleDeckWithSeed for ProbablyFair)
 * This is kept for backward compatibility with existing code
 *
 * @param deck The card deck to shuffle
 * @returns Shuffled deck (uses async internally)
 */
export function shuffleDeck(deck: Card[]): Card[] {
  // For backward compatibility, create a simple random shuffle without ProbablyFair
  // This avoids blocking the main thread
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const j = Math.floor((randomBuffer[0] / (0xffffffff + 1)) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffle deck with a specific seed for reproducibility
 * Enables ProbablyFair verification
 *
 * @param deck The card deck to shuffle
 * @param seed Hex-encoded seed for deterministic shuffling
 * @returns Promise resolving to shuffled deck
 *
 * @example
 * const seed = generateSeed();
 * const shuffled = await shuffleDeckWithSeed(deck, seed);
 */
export async function shuffleDeckWithSeed(deck: Card[], seed: string): Promise<Card[]> {
  return shuffleCardsWithSeed(deck, seed);
}

/**
 * Shuffle deck and generate a proof for verification
 *
 * Returns both the shuffled deck and a proof that can be used to verify
 * the shuffle was fair and reproducible with the same seed.
 *
 * @param deck The card deck to shuffle
 * @param providedSeed Optional seed. If not provided, a new one is generated.
 * @returns Promise resolving to object containing shuffled deck and shuffle proof
 *
 * @example
 * const { shuffled, proof } = await shuffleDeckWithProof(deck);
 * // Store proof for later verification
 * // Verify with: await verifyShuffleWithSeed(originalDeck, shuffled, proof.seed)
 */
export async function shuffleDeckWithProof(
  deck: Card[],
  providedSeed?: string
): Promise<{ shuffled: Card[]; proof: ShuffleProof }> {
  const proof = await generateShuffleProof(providedSeed);
  const shuffled = await shuffleCardsWithSeed(deck, proof.seed);

  return {
    shuffled,
    proof,
  };
}

/**
 * Deal a card from the deck
 */
export function dealCard(deck: Card[], faceUp: boolean = true): { card: Card; remainingDeck: Card[] } {
  if (deck.length === 0) {
    throw new Error('Cannot deal from empty deck');
  }

  const [card, ...remainingDeck] = deck;

  return {
    card: { ...card, faceUp },
    remainingDeck,
  };
}

/**
 * Deal multiple cards from the deck
 */
export function dealCards(
  deck: Card[],
  count: number,
  faceUp: boolean = true
): { cards: Card[]; remainingDeck: Card[] } {
  if (deck.length < count) {
    throw new Error(`Cannot deal ${count} cards from deck with ${deck.length} cards`);
  }

  const cards: Card[] = [];
  let currentDeck = deck;

  for (let i = 0; i < count; i++) {
    const result = dealCard(currentDeck, faceUp);
    cards.push(result.card);
    currentDeck = result.remainingDeck;
  }

  return {
    cards,
    remainingDeck: currentDeck,
  };
}

/**
 * Flip a card face up or down
 */
export function flipCard(card: Card, faceUp: boolean): Card {
  return { ...card, faceUp };
}
