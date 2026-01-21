import { describe, it, expect } from 'vitest';
import { createDeck, createShoe, shuffleDeck, dealCard, dealCards } from '../deck';

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
});
