import type { Card, Rank, Suit } from '../types';

/**
 * Standard deck configuration constants
 */
export const DECK_CONFIG = {
  /** Standard suits in a deck of cards */
  SUITS: ['♠', '♥', '♦', '♣'] as const,
  /** Standard ranks in a deck of cards */
  RANKS: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const,
  /** Standard number of cards in a single deck */
  STANDARD_DECK_SIZE: 52,
  /** Default number of decks in a blackjack shoe */
  DEFAULT_SHOE_SIZE: 6,
  /** Recommended minimum cards before reshuffling */
  SHUFFLE_THRESHOLD: 52, // Reshuffle when less than 1 deck remains
} as const;

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/**
 * Create a standard 52-card deck
 *
 * Creates a new deck with all cards face down by default.
 * The deck contains 4 suits (♠, ♥, ♦, ♣) with 13 ranks each (A-K).
 *
 * @returns A new array of 52 Card objects, all face down
 *
 * @example
 * ```typescript
 * const deck = createDeck();
 * console.log(deck.length); // 52
 * ```
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
 *
 * In casino blackjack, multiple decks are used to reduce card counting effectiveness.
 * Standard practice is to use 6 or 8 decks in a "shoe".
 *
 * @param deckCount - Number of decks to include (default: 6)
 * @returns A new array containing the specified number of decks
 * @throws {Error} If deckCount is less than 1
 *
 * @example
 * ```typescript
 * const shoe = createShoe(6); // 312 cards (6 × 52)
 * const smallShoe = createShoe(1); // 52 cards (single deck)
 * ```
 */
export function createShoe(deckCount: number = DECK_CONFIG.DEFAULT_SHOE_SIZE): Card[] {
  if (deckCount < 1) {
    throw new Error('Deck count must be at least 1');
  }

  const shoe: Card[] = [];

  for (let i = 0; i < deckCount; i++) {
    shoe.push(...createDeck());
  }

  return shoe;
}

/**
 * Shuffle deck using Fisher-Yates algorithm with crypto.getRandomValues
 * for provably fair shuffling
 */
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    // Use crypto.getRandomValues for secure randomness
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const j = Math.floor((randomBuffer[0] / (0xffffffff + 1)) * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Deal a card from the deck
 *
 * Removes and returns the top card from the deck along with the remaining cards.
 * This is a pure function - it does not mutate the original deck.
 *
 * @param deck - The deck to deal from
 * @param faceUp - Whether the dealt card should be face up (default: true)
 * @returns Object containing the dealt card and the remaining deck
 * @throws {Error} If the deck is empty
 *
 * @example
 * ```typescript
 * const deck = createDeck();
 * const { card, remainingDeck } = dealCard(deck, true);
 * console.log(remainingDeck.length); // 51
 * ```
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
 *
 * Convenience function to deal several cards at once. Useful for initial deals
 * or when dealing to multiple players.
 *
 * @param deck - The deck to deal from
 * @param count - Number of cards to deal
 * @param faceUp - Whether the dealt cards should be face up (default: true)
 * @returns Object containing the dealt cards array and the remaining deck
 * @throws {Error} If there are not enough cards in the deck
 *
 * @example
 * ```typescript
 * const deck = createDeck();
 * const { cards, remainingDeck } = dealCards(deck, 5);
 * console.log(cards.length); // 5
 * console.log(remainingDeck.length); // 47
 * ```
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
 *
 * Returns a new card object with the specified faceUp state.
 * Commonly used when revealing the dealer's hole card.
 *
 * @param card - The card to flip
 * @param faceUp - The new face up state
 * @returns A new Card object with updated faceUp property
 *
 * @example
 * ```typescript
 * const faceDownCard = { suit: '♠', rank: 'A', faceUp: false };
 * const revealedCard = flipCard(faceDownCard, true);
 * console.log(revealedCard.faceUp); // true
 * ```
 */
export function flipCard(card: Card, faceUp: boolean): Card {
  return { ...card, faceUp };
}

/**
 * Check if the deck needs to be reshuffled
 *
 * In casino blackjack, a colored "cut card" is placed near the end of the shoe.
 * When this card is reached, the shoe is reshuffled after the current round.
 *
 * @param deck - The current deck/shoe
 * @param threshold - Minimum number of cards before reshuffle (default: 52)
 * @returns True if the deck should be reshuffled
 *
 * @example
 * ```typescript
 * const shoe = createShoe(6);
 * if (shouldReshuffle(shoe)) {
 *   shoe = shuffleDeck(createShoe(6));
 * }
 * ```
 */
export function shouldReshuffle(deck: Card[], threshold: number = DECK_CONFIG.SHUFFLE_THRESHOLD): boolean {
  return deck.length <= threshold;
}

/**
 * Get the remaining cards count in the deck
 *
 * Utility function to check how many cards are left in the deck/shoe.
 *
 * @param deck - The current deck/shoe
 * @returns Number of cards remaining
 *
 * @example
 * ```typescript
 * const shoe = createShoe(6);
 * console.log(getRemainingCards(shoe)); // 312
 * ```
 */
export function getRemainingCards(deck: Card[]): number {
  return deck.length;
}

/**
 * Count specific cards in the deck
 *
 * Useful for debugging, testing, or implementing card counting features.
 *
 * @param deck - The deck to search
 * @param rank - The rank to count (optional)
 * @param suit - The suit to count (optional)
 * @returns Number of matching cards
 *
 * @example
 * ```typescript
 * const deck = createDeck();
 * console.log(countCards(deck, 'A')); // 4 (all Aces)
 * console.log(countCards(deck, undefined, '♠')); // 13 (all Spades)
 * console.log(countCards(deck, 'A', '♠')); // 1 (Ace of Spades)
 * ```
 */
export function countCards(deck: Card[], rank?: Rank, suit?: Suit): number {
  return deck.filter(card => {
    if (rank && suit) return card.rank === rank && card.suit === suit;
    if (rank) return card.rank === rank;
    if (suit) return card.suit === suit;
    return true;
  }).length;
}
