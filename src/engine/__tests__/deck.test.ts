import { describe, it, expect } from 'vitest';
import { createDeck, createShoe, shuffleDeck, dealCard, dealCards, shuffleDeckWithSeed, shuffleDeckWithProof } from '../deck';
import { generateSeed } from '../probablyFair';

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

  describe('shuffleDeckWithSeed', () => {
    it('should shuffle deck deterministically with seed', async () => {
      const deck = createDeck();
      const seed = generateSeed();
      const shuffled1 = await shuffleDeckWithSeed(deck, seed);
      const shuffled2 = await shuffleDeckWithSeed(deck, seed);

      expect(shuffled1).toEqual(shuffled2);
    });

    it('should not modify original deck', async () => {
      const deck = createDeck();
      const original = [...deck];
      const seed = generateSeed();
      await shuffleDeckWithSeed(deck, seed);

      expect(deck).toEqual(original);
    });

    it('should produce different shuffle with different seed', async () => {
      const deck = createDeck();
      const seed1 = generateSeed();
      const seed2 = generateSeed();
      const shuffled1 = await shuffleDeckWithSeed(deck, seed1);
      const shuffled2 = await shuffleDeckWithSeed(deck, seed2);

      expect(shuffled1).not.toEqual(shuffled2);
    });

    it('should return same card count', async () => {
      const deck = createDeck();
      const seed = generateSeed();
      const shuffled = await shuffleDeckWithSeed(deck, seed);

      expect(shuffled).toHaveLength(52);
    });

    it('should contain all original cards', async () => {
      const deck = createDeck();
      const seed = generateSeed();
      const shuffled = await shuffleDeckWithSeed(deck, seed);

      const originalCards = new Set(deck.map(c => `${c.suit}${c.rank}`));
      const shuffledCards = new Set(shuffled.map(c => `${c.suit}${c.rank}`));

      expect(shuffledCards).toEqual(originalCards);
    });
  });

  describe('shuffleDeckWithProof', () => {
    it('should return shuffled deck and proof', async () => {
      const deck = createDeck();
      const result = await shuffleDeckWithProof(deck);

      expect(result).toHaveProperty('shuffled');
      expect(result).toHaveProperty('proof');
      expect(result.shuffled).toHaveLength(52);
    });

    it('should generate valid proof', async () => {
      const deck = createDeck();
      const result = await shuffleDeckWithProof(deck);

      expect(result.proof).toHaveProperty('seed');
      expect(result.proof).toHaveProperty('seedHash');
      expect(result.proof).toHaveProperty('timestamp');
      expect(result.proof).toHaveProperty('version');
    });

    it('should use provided seed if given', async () => {
      const deck = createDeck();
      const seed = generateSeed();
      const result = await shuffleDeckWithProof(deck, seed);

      expect(result.proof.seed).toBe(seed);
    });

    it('should produce reproducible shuffle with proof seed', async () => {
      const deck = createDeck();
      const result1 = await shuffleDeckWithProof(deck);
      const result2 = await shuffleDeckWithProof(deck, result1.proof.seed);

      expect(result2.shuffled).toEqual(result1.shuffled);
    });

    it('should preserve all cards in shuffled deck', async () => {
      const deck = createDeck();
      const result = await shuffleDeckWithProof(deck);

      const originalCards = new Set(deck.map(c => `${c.suit}${c.rank}`));
      const shuffledCards = new Set(result.shuffled.map(c => `${c.suit}${c.rank}`));

      expect(shuffledCards).toEqual(originalCards);
    });
  });
});
