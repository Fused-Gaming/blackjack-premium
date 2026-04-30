/**
 * M2-T3: Hand Evaluation Logic Tests
 *
 * This test file covers comprehensive hand evaluation scenarios for blackjack:
 * - Basic hand value calculation
 * - Soft/hard hand detection
 * - Multiple aces handling
 * - Player vs dealer comparison
 * - Edge cases and boundary conditions
 */

import { describe, it, expect } from 'vitest';
import { evaluateHand, getCardValue, compareHands, canSplit, canDouble } from '../hand';
import type { Card } from '../../types';

// Helper to create test cards
const createCard = (rank: string, suit = '♠', faceUp = true): Card => ({
  rank: rank as Card['rank'],
  suit: suit as Card['suit'],
  faceUp,
});

describe('M2-T3: Hand Evaluation Logic', () => {
  describe('getCardValue', () => {
    it('should return 11 for Ace', () => {
      expect(getCardValue('A')).toBe(11);
    });

    it('should return 10 for face cards', () => {
      expect(getCardValue('J')).toBe(10);
      expect(getCardValue('Q')).toBe(10);
      expect(getCardValue('K')).toBe(10);
    });

    it('should return numeric value for number cards', () => {
      expect(getCardValue('2')).toBe(2);
      expect(getCardValue('5')).toBe(5);
      expect(getCardValue('10')).toBe(10);
    });
  });

  describe('evaluateHand', () => {
    describe('basic hand values', () => {
      it('should calculate simple hand value', () => {
        const cards = [createCard('5'), createCard('7')];
        const result = evaluateHand(cards);
        expect(result.value).toBe(12);
        expect(result.isSoft).toBe(false);
        expect(result.isBust).toBe(false);
      });

      it('should detect blackjack', () => {
        const cards = [createCard('A'), createCard('K')];
        const result = evaluateHand(cards);
        expect(result.value).toBe(21);
        expect(result.isBlackjack).toBe(true);
      });

      it('should detect bust', () => {
        const cards = [createCard('K'), createCard('Q'), createCard('5')];
        const result = evaluateHand(cards);
        expect(result.value).toBe(25);
        expect(result.isBust).toBe(true);
      });
    });

    describe('soft hands with aces', () => {
      it('should detect soft hand with one ace', () => {
        const cards = [createCard('A'), createCard('6')];
        const result = evaluateHand(cards);
        expect(result.value).toBe(17);
        expect(result.isSoft).toBe(true);
      });

      it('should convert soft to hard when necessary', () => {
        const cards = [createCard('A'), createCard('6'), createCard('8')];
        const result = evaluateHand(cards);
        expect(result.value).toBe(15); // A=1, 6, 8
        expect(result.isSoft).toBe(false);
      });
    });

    describe('multiple aces edge cases', () => {
      it('should handle two aces correctly', () => {
        const cards = [createCard('A'), createCard('A')];
        const result = evaluateHand(cards);
        expect(result.value).toBe(12); // One ace = 11, other = 1
        expect(result.isSoft).toBe(true);
      });

      it('should handle three aces correctly', () => {
        const cards = [createCard('A'), createCard('A'), createCard('A')];
        const result = evaluateHand(cards);
        expect(result.value).toBe(13); // 11 + 1 + 1
        expect(result.isSoft).toBe(true);
      });

      it('should handle four aces correctly', () => {
        const cards = [
          createCard('A'), createCard('A'),
          createCard('A'), createCard('A')
        ];
        const result = evaluateHand(cards);
        expect(result.value).toBe(14); // 11 + 1 + 1 + 1
        expect(result.isSoft).toBe(true);
      });

      it('should handle multiple aces with bust prevention', () => {
        const cards = [
          createCard('A'), createCard('A'),
          createCard('9'), createCard('9')
        ];
        const result = evaluateHand(cards);
        expect(result.value).toBe(20); // 1 + 1 + 9 + 9
        expect(result.isSoft).toBe(false);
      });
    });
  });

  describe('compareHands', () => {
    it('should return player wins when player has higher value', () => {
      const playerCards = [createCard('K'), createCard('9')]; // 19
      const dealerCards = [createCard('K'), createCard('7')]; // 17
      const result = compareHands(playerCards, dealerCards);
      expect(result).toBe('win');
    });

    it('should return dealer wins when dealer has higher value', () => {
      const playerCards = [createCard('K'), createCard('7')]; // 17
      const dealerCards = [createCard('K'), createCard('9')]; // 19
      const result = compareHands(playerCards, dealerCards);
      expect(result).toBe('loss');
    });

    it('should return push on equal values', () => {
      const playerCards = [createCard('K'), createCard('8')]; // 18
      const dealerCards = [createCard('9'), createCard('9')]; // 18
      const result = compareHands(playerCards, dealerCards);
      expect(result).toBe('push');
    });

    it('should return blackjack when player has natural 21', () => {
      const playerCards = [createCard('A'), createCard('K')]; // Blackjack
      const dealerCards = [createCard('K'), createCard('9')]; // 19
      const result = compareHands(playerCards, dealerCards);
      expect(result).toBe('blackjack');
    });

    it('should return loss when player busts', () => {
      const playerCards = [createCard('K'), createCard('Q'), createCard('5')]; // 25 (bust)
      const dealerCards = [createCard('K'), createCard('7')]; // 17
      const result = compareHands(playerCards, dealerCards);
      expect(result).toBe('loss');
    });

    it('should return win when dealer busts', () => {
      const playerCards = [createCard('K'), createCard('7')]; // 17
      const dealerCards = [createCard('K'), createCard('Q'), createCard('5')]; // 25 (bust)
      const result = compareHands(playerCards, dealerCards);
      expect(result).toBe('win');
    });
  });

  describe('canSplit', () => {
    it('should allow split on matching ranks', () => {
      const hand = {
        cards: [createCard('8'), createCard('8')],
        bet: 10,
        status: 'playing' as const,
        isDouble: false,
        isSplit: false,
      };
      expect(canSplit(hand)).toBe(true);
    });

    it('should not allow split on different ranks', () => {
      const hand = {
        cards: [createCard('K'), createCard('Q')],
        bet: 10,
        status: 'playing' as const,
        isDouble: false,
        isSplit: false,
      };
      // Standard blackjack: only exact rank matches can split
      expect(canSplit(hand)).toBe(false);
    });

    it('should not allow split with more than 2 cards', () => {
      const hand = {
        cards: [createCard('8'), createCard('8'), createCard('2')],
        bet: 10,
        status: 'playing' as const,
        isDouble: false,
        isSplit: false,
      };
      expect(canSplit(hand)).toBe(false);
    });
  });

  describe('canDouble', () => {
    it('should allow double on first two cards', () => {
      const hand = {
        cards: [createCard('5'), createCard('6')],
        bet: 10,
        status: 'playing' as const,
        isDouble: false,
        isSplit: false,
      };
      expect(canDouble(hand)).toBe(true);
    });

    it('should not allow double after hit', () => {
      const hand = {
        cards: [createCard('5'), createCard('6'), createCard('2')],
        bet: 10,
        status: 'playing' as const,
        isDouble: false,
        isSplit: false,
      };
      expect(canDouble(hand)).toBe(false);
    });
  });
});
