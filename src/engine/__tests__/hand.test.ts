import { describe, it, expect } from 'vitest';
import {
  evaluateHand,
  canSplit,
  canDouble,
  shouldDealerHit,
  createHand,
  addCardToHand,
  splitHand,
  doubleDownHand,
  compareHands,
} from '../hand';
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

    it('should not allow split if already split', () => {
      const hand: Hand = {
        cards: [createCard('8'), createCard('8')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: true,
      };

      expect(canSplit(hand)).toBe(false);
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

  describe('addCardToHand', () => {
    it('should add card to hand', () => {
      const hand = createHand(10);
      const card = createCard('5');
      const newHand = addCardToHand(hand, card);

      expect(newHand.cards).toHaveLength(1);
      expect(newHand.cards[0]).toEqual(card);
    });

    it('should auto-detect bust', () => {
      const hand: Hand = {
        cards: [createCard('K'), createCard('Q')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      const newHand = addCardToHand(hand, createCard('5'));
      expect(newHand.status).toBe('bust');
    });

    it('should auto-detect blackjack', () => {
      const hand: Hand = {
        cards: [createCard('A')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      const newHand = addCardToHand(hand, createCard('K'));
      expect(newHand.status).toBe('blackjack');
    });
  });

  describe('splitHand', () => {
    it('should split pair into two hands', () => {
      const hand: Hand = {
        cards: [createCard('8'), createCard('8')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      const { hand1, hand2 } = splitHand(hand);

      expect(hand1.cards).toHaveLength(1);
      expect(hand2.cards).toHaveLength(1);
      expect(hand1.bet).toBe(10);
      expect(hand2.bet).toBe(10);
      expect(hand1.isSplit).toBe(true);
      expect(hand2.isSplit).toBe(true);
    });

    it('should throw error for invalid split', () => {
      const hand: Hand = {
        cards: [createCard('8'), createCard('9')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      expect(() => splitHand(hand)).toThrow('Cannot split this hand');
    });
  });

  describe('doubleDownHand', () => {
    it('should double the bet', () => {
      const hand: Hand = {
        cards: [createCard('5'), createCard('6')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      const doubled = doubleDownHand(hand);
      expect(doubled.bet).toBe(20);
      expect(doubled.isDouble).toBe(true);
    });

    it('should throw error for invalid double', () => {
      const hand: Hand = {
        cards: [createCard('5'), createCard('6'), createCard('2')],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
      };

      expect(() => doubleDownHand(hand)).toThrow('Cannot double down this hand');
    });
  });

  describe('compareHands', () => {
    it('should return loss when player busts', () => {
      const playerHand: Hand = {
        cards: [createCard('K'), createCard('Q'), createCard('5')],
        bet: 10,
        status: 'bust',
        isDouble: false,
        isSplit: false,
      };

      expect(compareHands(playerHand, [createCard('10'), createCard('7')])).toBe('loss');
    });

    it('should return win when dealer busts', () => {
      const playerHand: Hand = {
        cards: [createCard('10'), createCard('7')],
        bet: 10,
        status: 'stand',
        isDouble: false,
        isSplit: false,
      };

      expect(compareHands(playerHand, [createCard('K'), createCard('Q'), createCard('5')])).toBe('win');
    });

    it('should return blackjack when player has blackjack', () => {
      const playerHand: Hand = {
        cards: [createCard('A'), createCard('K')],
        bet: 10,
        status: 'blackjack',
        isDouble: false,
        isSplit: false,
      };

      expect(compareHands(playerHand, [createCard('10'), createCard('10')])).toBe('blackjack');
    });

    it('should return push when both have blackjack', () => {
      const playerHand: Hand = {
        cards: [createCard('A'), createCard('K')],
        bet: 10,
        status: 'blackjack',
        isDouble: false,
        isSplit: false,
      };

      expect(compareHands(playerHand, [createCard('A'), createCard('Q')])).toBe('push');
    });

    it('should return loss when dealer has blackjack', () => {
      const playerHand: Hand = {
        cards: [createCard('10'), createCard('10')],
        bet: 10,
        status: 'stand',
        isDouble: false,
        isSplit: false,
      };

      expect(compareHands(playerHand, [createCard('A'), createCard('K')])).toBe('loss');
    });

    it('should return win when player value is higher', () => {
      const playerHand: Hand = {
        cards: [createCard('10'), createCard('9')],
        bet: 10,
        status: 'stand',
        isDouble: false,
        isSplit: false,
      };

      expect(compareHands(playerHand, [createCard('10'), createCard('7')])).toBe('win');
    });

    it('should return loss when dealer value is higher', () => {
      const playerHand: Hand = {
        cards: [createCard('10'), createCard('7')],
        bet: 10,
        status: 'stand',
        isDouble: false,
        isSplit: false,
      };

      expect(compareHands(playerHand, [createCard('10'), createCard('9')])).toBe('loss');
    });

    it('should return push when values are equal', () => {
      const playerHand: Hand = {
        cards: [createCard('10'), createCard('8')],
        bet: 10,
        status: 'stand',
        isDouble: false,
        isSplit: false,
      };

      expect(compareHands(playerHand, [createCard('9'), createCard('9')])).toBe('push');
    });
  });
});
