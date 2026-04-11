import { describe, it, expect } from 'vitest';
import { evaluateHand, canSplit, canDouble, shouldDealerHit, createHand } from '../hand';
import type { Card, Hand, Rank, Suit } from '../../types';

const createCard = (rank: string, suit: string = '♠'): Card => ({
  rank: rank as Rank,
  suit: suit as Suit,
  faceUp: true,
});

describe('Hand Functions', () => {
  describe('evaluateHand', () => {
    it('should evaluate simple hand correctly', () => {
      const cards = [createCard('5'), createCard('7')];
      const result = evaluateHand(cards);

      expect(result.value).toBe(12);
      expect(result.isSoft).toBe(false);
      expect(result.isBlackjack).toBe(false);
      expect(result.isBust).toBe(false);
    });

    it('should recognize blackjack', () => {
      const cards = [createCard('A'), createCard('K')];
      const result = evaluateHand(cards);

      expect(result.value).toBe(21);
      expect(result.isBlackjack).toBe(true);
      expect(result.isBust).toBe(false);
    });

    it('should handle soft ace (Ace as 11)', () => {
      const cards = [createCard('A'), createCard('6')];
      const result = evaluateHand(cards);

      expect(result.value).toBe(17);
      expect(result.isSoft).toBe(true);
    });

    it('should convert ace from 11 to 1 to avoid bust', () => {
      const cards = [createCard('A'), createCard('8'), createCard('9')];
      const result = evaluateHand(cards);

      expect(result.value).toBe(18); // 1 + 8 + 9
      expect(result.isSoft).toBe(false);
      expect(result.isBust).toBe(false);
    });

    it('should detect bust', () => {
      const cards = [createCard('K'), createCard('Q'), createCard('5')];
      const result = evaluateHand(cards);

      expect(result.value).toBe(25);
      expect(result.isBust).toBe(true);
    });

    it('should handle multiple aces', () => {
      const cards = [createCard('A'), createCard('A'), createCard('9')];
      const result = evaluateHand(cards);

      expect(result.value).toBe(21); // 1 + 1 + 9 with one ace as 11 = 11 + 1 + 9 = 21
    });
  });

  describe('canSplit', () => {
    it('should allow split for matching ranks', () => {
      const hand: Hand = {
        cards: [createCard('8'), createCard('8')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      expect(canSplit(hand)).toBe(true);
    });

    it('should not allow split for different ranks', () => {
      const hand: Hand = {
        cards: [createCard('8'), createCard('9')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      expect(canSplit(hand)).toBe(false);
    });

    it('should allow re-split for regular pairs', () => {
      const hand: Hand = {
        cards: [createCard('8'), createCard('8')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: true,
        splitFromAces: false,
        canHit: true,
      };

      // Regular pairs can be re-split (default behavior)
      expect(canSplit(hand, 1, 4, false)).toBe(true);
    });

    it('should not allow split on Aces that were split', () => {
      const hand: Hand = {
        cards: [createCard('A'), createCard('A')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: true,
        splitFromAces: true,
        canHit: false,
      };

      // Split Aces cannot be re-split by default
      expect(canSplit(hand, 1, 4, false)).toBe(false);
    });

    it('should not allow split with more than 2 cards', () => {
      const hand: Hand = {
        cards: [createCard('8'), createCard('8'), createCard('5')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      expect(canSplit(hand)).toBe(false);
    });
  });

  describe('canDouble', () => {
    it('should allow double on first 2 cards', () => {
      const hand: Hand = {
        cards: [createCard('5'), createCard('6')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      expect(canDouble(hand)).toBe(true);
    });

    it('should not allow double with more than 2 cards', () => {
      const hand: Hand = {
        cards: [createCard('5'), createCard('6'), createCard('2')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      expect(canDouble(hand)).toBe(false);
    });
  });

  describe('shouldDealerHit', () => {
    it('should hit on 16 or less', () => {
      expect(shouldDealerHit([createCard('K'), createCard('6')])).toBe(true);
      expect(shouldDealerHit([createCard('9'), createCard('7')])).toBe(true);
    });

    it('should stand on 17 or more', () => {
      expect(shouldDealerHit([createCard('K'), createCard('7')])).toBe(false);
      expect(shouldDealerHit([createCard('10'), createCard('10')])).toBe(false);
    });

    it('should stand on soft 17', () => {
      expect(shouldDealerHit([createCard('A'), createCard('6')])).toBe(false);
    });
  });

  describe('createHand', () => {
    it('should create empty hand with default bet', () => {
      const hand = createHand();

      expect(hand.cards).toHaveLength(0);
      expect(hand.bet).toBe(0);
      expect(hand.status).toBe('playing');
    });

    it('should create hand with specified bet', () => {
      const hand = createHand(50);

      expect(hand.bet).toBe(50);
    });
  });
});
