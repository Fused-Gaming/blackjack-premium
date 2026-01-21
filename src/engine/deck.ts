import type { Card, Rank, Suit } from '../types';

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
