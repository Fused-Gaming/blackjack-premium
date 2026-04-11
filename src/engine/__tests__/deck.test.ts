import { describe, it, expect } from 'vitest';
import {
  createDeck,
  createShoe,
  shuffleDeck,
  dealCard,
  dealCards,
  flipCard,
  shouldReshuffle,
  getRemainingCards,
  countCards,
  DECK_CONFIG,
} from '../deck';

describe('Deck Functions', () => {
  describe('createDeck', () => {
    it('should create a standard 52-card deck', () => {
      const deck = createDeck();
      expect(deck).toHaveLength(52);
    });

    it('should have 13 cards of each suit', () => {
      const deck = createDeck();
      const suits = ['♠', '♥', '♦', '♣'];

      suits.forEach(suit => {
        const suitCards = deck.filter(card => card.suit === suit);
        expect(suitCards).toHaveLength(13);
      });
    });

    it('should have 4 of each rank', () => {
      const deck = createDeck();
      const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

      ranks.forEach(rank => {
        const rankCards = deck.filter(card => card.rank === rank);
        expect(rankCards).toHaveLength(4);
      });
    });
  });

  describe('createShoe', () => {
    it('should create 6 decks by default', () => {
      const shoe = createShoe();
      expect(shoe).toHaveLength(312); // 52 * 6
    });

    it('should create specified number of decks', () => {
      const shoe = createShoe(8);
      expect(shoe).toHaveLength(416); // 52 * 8
    });
  });

  describe('shuffleDeck', () => {
    it('should return same number of cards', () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);
      expect(shuffled).toHaveLength(52);
    });

    it('should not modify original deck', () => {
      const deck = createDeck();
      const original = [...deck];
      shuffleDeck(deck);
      expect(deck).toEqual(original);
    });

    it('should shuffle cards (very unlikely to be in same order)', () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);

      // Check that at least some cards are in different positions
      let differences = 0;
      for (let i = 0; i < deck.length; i++) {
        if (deck[i].suit !== shuffled[i].suit || deck[i].rank !== shuffled[i].rank) {
          differences++;
        }
      }

      expect(differences).toBeGreaterThan(40); // Expect most cards moved
    });
  });

  describe('dealCard', () => {
    it('should deal one card from deck', () => {
      const deck = createDeck();
      const result = dealCard(deck);

      expect(result.card).toBeDefined();
      expect(result.remainingDeck).toHaveLength(51);
    });

    it('should deal card face up by default', () => {
      const deck = createDeck();
      const result = dealCard(deck);

      expect(result.card.faceUp).toBe(true);
    });

    it('should deal card face down when specified', () => {
      const deck = createDeck();
      const result = dealCard(deck, false);

      expect(result.card.faceUp).toBe(false);
    });

    it('should throw error when deck is empty', () => {
      expect(() => dealCard([])).toThrow('Cannot deal from empty deck');
    });
  });

  describe('dealCards', () => {
    it('should deal multiple cards', () => {
      const deck = createDeck();
      const result = dealCards(deck, 5);

      expect(result.cards).toHaveLength(5);
      expect(result.remainingDeck).toHaveLength(47);
    });

    it('should throw error when not enough cards', () => {
      const deck = createDeck();
      expect(() => dealCards(deck, 53)).toThrow();
    });
  });

  describe('flipCard', () => {
    it('should flip card face up', () => {
      const card = { suit: '♠' as const, rank: 'A' as const, faceUp: false };
      const flipped = flipCard(card, true);

      expect(flipped.faceUp).toBe(true);
      expect(flipped.suit).toBe('♠');
      expect(flipped.rank).toBe('A');
    });

    it('should flip card face down', () => {
      const card = { suit: '♥' as const, rank: 'K' as const, faceUp: true };
      const flipped = flipCard(card, false);

      expect(flipped.faceUp).toBe(false);
    });

    it('should not mutate original card', () => {
      const card = { suit: '♦' as const, rank: 'Q' as const, faceUp: false };
      flipCard(card, true);

      expect(card.faceUp).toBe(false);
    });
  });

  describe('shouldReshuffle', () => {
    it('should return true when deck is below threshold', () => {
      const smallDeck = dealCards(createDeck(), 42).remainingDeck; // 10 cards left
      expect(shouldReshuffle(smallDeck, 52)).toBe(true);
    });

    it('should return false when deck is above threshold', () => {
      const deck = createShoe(6); // 312 cards
      expect(shouldReshuffle(deck, 52)).toBe(false);
    });

    it('should use default threshold', () => {
      const deck = dealCards(createDeck(), 40).remainingDeck; // 12 cards left
      expect(shouldReshuffle(deck)).toBe(true);
    });

    it('should return true when deck equals threshold', () => {
      const deck = dealCards(createShoe(), 260).remainingDeck; // 52 cards left
      expect(shouldReshuffle(deck, 52)).toBe(true);
    });
  });

  describe('getRemainingCards', () => {
    it('should return correct count for full deck', () => {
      const deck = createDeck();
      expect(getRemainingCards(deck)).toBe(52);
    });

    it('should return correct count after dealing', () => {
      const deck = createDeck();
      const { remainingDeck } = dealCards(deck, 10);
      expect(getRemainingCards(remainingDeck)).toBe(42);
    });

    it('should return 0 for empty deck', () => {
      expect(getRemainingCards([])).toBe(0);
    });
  });

  describe('countCards', () => {
    it('should count cards by rank', () => {
      const deck = createDeck();
      expect(countCards(deck, 'A')).toBe(4);
      expect(countCards(deck, 'K')).toBe(4);
    });

    it('should count cards by suit', () => {
      const deck = createDeck();
      expect(countCards(deck, undefined, '♠')).toBe(13);
      expect(countCards(deck, undefined, '♥')).toBe(13);
    });

    it('should count specific card', () => {
      const deck = createDeck();
      expect(countCards(deck, 'A', '♠')).toBe(1);
    });

    it('should count all cards when no filters', () => {
      const deck = createDeck();
      expect(countCards(deck)).toBe(52);
    });

    it('should return 0 for cards not in deck', () => {
      const { remainingDeck } = dealCard(createDeck());
      const firstCard = createDeck()[0];

      // Count might be less if the first card was of that type
      const count = countCards(remainingDeck, firstCard.rank, firstCard.suit);
      expect(count).toBe(0);
    });
  });

  describe('DECK_CONFIG', () => {
    it('should have correct constants', () => {
      expect(DECK_CONFIG.STANDARD_DECK_SIZE).toBe(52);
      expect(DECK_CONFIG.DEFAULT_SHOE_SIZE).toBe(6);
      expect(DECK_CONFIG.SHUFFLE_THRESHOLD).toBe(52);
    });

    it('should have all suits', () => {
      expect(DECK_CONFIG.SUITS).toHaveLength(4);
      expect(DECK_CONFIG.SUITS).toContain('♠');
      expect(DECK_CONFIG.SUITS).toContain('♥');
      expect(DECK_CONFIG.SUITS).toContain('♦');
      expect(DECK_CONFIG.SUITS).toContain('♣');
    });

    it('should have all ranks', () => {
      expect(DECK_CONFIG.RANKS).toHaveLength(13);
      expect(DECK_CONFIG.RANKS).toContain('A');
      expect(DECK_CONFIG.RANKS).toContain('K');
    });
  });

  describe('createShoe edge cases', () => {
    it('should throw error for invalid deck count', () => {
      expect(() => createShoe(0)).toThrow('Deck count must be at least 1');
      expect(() => createShoe(-1)).toThrow('Deck count must be at least 1');
    });

    it('should create single deck shoe', () => {
      const shoe = createShoe(1);
      expect(shoe).toHaveLength(52);
    });
  });
});
