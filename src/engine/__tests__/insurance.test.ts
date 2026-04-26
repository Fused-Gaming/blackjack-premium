import { describe, it, expect } from 'vitest';
import {
  shouldOfferInsurance,
  validateInsuranceBet,
  calculateInsurancePayout,
  canPlaceInsurance,
  getMaxInsuranceBet,
} from '../insurance';
import type { Card, Hand, Rank, Suit } from '../../types';

const createCard = (rank: string, suit: string = '♠', faceUp: boolean = true): Card => ({
  rank: rank as Rank,
  suit: suit as Suit,
  faceUp,
});

const createHand = (bet: number, cards: Card[] = []): Hand => ({
  cards,
  bet,
  status: 'playing',
  isDouble: false,
  isSplit: false,
  splitFromAces: false,
  canHit: true,
});

describe('Insurance Logic', () => {
  describe('shouldOfferInsurance', () => {
    it('should offer insurance when dealer shows Ace', () => {
      const dealerUpCard = createCard('A');
      expect(shouldOfferInsurance(dealerUpCard)).toBe(true);
    });

    it('should not offer insurance when dealer shows non-Ace', () => {
      expect(shouldOfferInsurance(createCard('K'))).toBe(false);
      expect(shouldOfferInsurance(createCard('10'))).toBe(false);
      expect(shouldOfferInsurance(createCard('5'))).toBe(false);
      expect(shouldOfferInsurance(createCard('2'))).toBe(false);
    });

    it('should not offer insurance when dealer card is face down', () => {
      const dealerDownCard = createCard('A', '♠', false);
      expect(shouldOfferInsurance(dealerDownCard)).toBe(false);
    });
  });

  describe('getMaxInsuranceBet', () => {
    it('should return half of original bet', () => {
      const hand = createHand(100);
      expect(getMaxInsuranceBet(hand)).toBe(50);
    });

    it('should handle odd bet amounts', () => {
      const hand = createHand(75);
      expect(getMaxInsuranceBet(hand)).toBe(37.5);
    });

    it('should handle small bets', () => {
      const hand = createHand(1);
      expect(getMaxInsuranceBet(hand)).toBe(0.5);
    });

    it('should return 0 for zero bet', () => {
      const hand = createHand(0);
      expect(getMaxInsuranceBet(hand)).toBe(0);
    });
  });

  describe('validateInsuranceBet', () => {
    it('should accept valid insurance bet (exactly half of original)', () => {
      const hand = createHand(100);
      const result = validateInsuranceBet(50, hand, 1000);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept insurance bet less than half', () => {
      const hand = createHand(100);
      const result = validateInsuranceBet(25, hand, 1000);

      expect(result.valid).toBe(true);
    });

    it('should reject insurance bet greater than half of original', () => {
      const hand = createHand(100);
      const result = validateInsuranceBet(51, hand, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('cannot exceed half');
    });

    it('should reject insurance bet when insufficient balance', () => {
      const hand = createHand(100);
      const result = validateInsuranceBet(50, hand, 40);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('Insufficient balance');
    });

    it('should reject zero or negative insurance bet', () => {
      const hand = createHand(100);

      const zeroResult = validateInsuranceBet(0, hand, 1000);
      expect(zeroResult.valid).toBe(false);
      expect(zeroResult.error).toContain('must be greater than 0');

      const negativeResult = validateInsuranceBet(-10, hand, 1000);
      expect(negativeResult.valid).toBe(false);
      expect(negativeResult.error).toContain('must be greater than 0');
    });

    it('should reject invalid number values', () => {
      const hand = createHand(100);

      const nanResult = validateInsuranceBet(NaN, hand, 1000);
      expect(nanResult.valid).toBe(false);

      const infinityResult = validateInsuranceBet(Infinity, hand, 1000);
      expect(infinityResult.valid).toBe(false);
    });

    it('should handle edge case with minimum bet', () => {
      const hand = createHand(2);
      const result = validateInsuranceBet(1, hand, 100);

      expect(result.valid).toBe(true);
    });
  });

  describe('calculateInsurancePayout', () => {
    it('should pay 2:1 when dealer has blackjack', () => {
      const dealerCards = [createCard('A'), createCard('K')];
      const insuranceBet = 50;

      const payout = calculateInsurancePayout(insuranceBet, dealerCards);

      // Insurance pays 2:1 plus original bet back = 3x total
      expect(payout).toBe(150);
    });

    it('should pay 2:1 with Ace and 10', () => {
      const dealerCards = [createCard('A'), createCard('10')];
      const insuranceBet = 25;

      const payout = calculateInsurancePayout(insuranceBet, dealerCards);
      expect(payout).toBe(75);
    });

    it('should pay 2:1 with Ace and face card (Q)', () => {
      const dealerCards = [createCard('A'), createCard('Q')];
      const insuranceBet = 100;

      const payout = calculateInsurancePayout(insuranceBet, dealerCards);
      expect(payout).toBe(300);
    });

    it('should return 0 when dealer does not have blackjack', () => {
      const dealerCards = [createCard('A'), createCard('9')];
      const insuranceBet = 50;

      const payout = calculateInsurancePayout(insuranceBet, dealerCards);
      expect(payout).toBe(0);
    });

    it('should return 0 when dealer has 21 but not blackjack (3+ cards)', () => {
      const dealerCards = [createCard('A'), createCard('5'), createCard('5')];
      const insuranceBet = 50;

      const payout = calculateInsurancePayout(insuranceBet, dealerCards);
      expect(payout).toBe(0);
    });

    it('should handle small insurance bets', () => {
      const dealerCards = [createCard('A'), createCard('K')];
      const insuranceBet = 0.5;

      const payout = calculateInsurancePayout(insuranceBet, dealerCards);
      expect(payout).toBe(1.5);
    });

    it('should handle large insurance bets', () => {
      const dealerCards = [createCard('A'), createCard('J')];
      const insuranceBet = 500;

      const payout = calculateInsurancePayout(insuranceBet, dealerCards);
      expect(payout).toBe(1500);
    });
  });

  describe('canPlaceInsurance', () => {
    it('should allow insurance when dealer shows Ace and player has sufficient balance', () => {
      const dealerUpCard = createCard('A');
      const hand = createHand(100);
      const balance = 1000;

      const result = canPlaceInsurance(dealerUpCard, hand, balance);
      expect(result).toBe(true);
    });

    it('should not allow insurance when dealer does not show Ace', () => {
      const dealerUpCard = createCard('K');
      const hand = createHand(100);
      const balance = 1000;

      const result = canPlaceInsurance(dealerUpCard, hand, balance);
      expect(result).toBe(false);
    });

    it('should not allow insurance when player has insufficient balance', () => {
      const dealerUpCard = createCard('A');
      const hand = createHand(100);
      const balance = 40; // Less than half the bet (50)

      const result = canPlaceInsurance(dealerUpCard, hand, balance);
      expect(result).toBe(false);
    });

    it('should allow insurance with exactly sufficient balance', () => {
      const dealerUpCard = createCard('A');
      const hand = createHand(100);
      const balance = 50; // Exactly half the bet

      const result = canPlaceInsurance(dealerUpCard, hand, balance);
      expect(result).toBe(true);
    });

    it('should not allow insurance when hand has zero bet', () => {
      const dealerUpCard = createCard('A');
      const hand = createHand(0);
      const balance = 1000;

      const result = canPlaceInsurance(dealerUpCard, hand, balance);
      expect(result).toBe(false);
    });

    it('should handle edge case with minimum balance', () => {
      const dealerUpCard = createCard('A');
      const hand = createHand(2);
      const balance = 1;

      const result = canPlaceInsurance(dealerUpCard, hand, balance);
      expect(result).toBe(true);
    });
  });

  describe('Edge Cases and Integration', () => {
    it('should handle full insurance flow - dealer blackjack wins', () => {
      const dealerUpCard = createCard('A');
      const hand = createHand(100);
      const balance = 1000;

      // Check if insurance should be offered
      expect(shouldOfferInsurance(dealerUpCard)).toBe(true);

      // Check if player can place insurance
      expect(canPlaceInsurance(dealerUpCard, hand, balance)).toBe(true);

      // Get max insurance bet
      const maxBet = getMaxInsuranceBet(hand);
      expect(maxBet).toBe(50);

      // Validate insurance bet
      const validation = validateInsuranceBet(50, hand, balance);
      expect(validation.valid).toBe(true);

      // Calculate payout (dealer has blackjack)
      const dealerCards = [dealerUpCard, createCard('K', '♥', false)];
      const payout = calculateInsurancePayout(50, dealerCards);
      expect(payout).toBe(150);

      // Net result: paid 50 for insurance, got back 150, net +100
      // Original bet lost, but insurance covered it
    });

    it('should handle full insurance flow - dealer no blackjack loses', () => {
      const dealerUpCard = createCard('A');
      const hand = createHand(100);
      const balance = 1000;

      // Place insurance
      const insuranceBet = 50;
      const validation = validateInsuranceBet(insuranceBet, hand, balance);
      expect(validation.valid).toBe(true);

      // Dealer does not have blackjack
      const dealerCards = [dealerUpCard, createCard('6', '♥', false)];
      const payout = calculateInsurancePayout(insuranceBet, dealerCards);
      expect(payout).toBe(0);

      // Net result: paid 50 for insurance, got back 0, net -50
      // Game continues, original bet still in play
    });

    it('should handle multiple validations in sequence', () => {
      const hand = createHand(100);
      const balance = 200;

      // First insurance bet - valid
      const result1 = validateInsuranceBet(50, hand, balance);
      expect(result1.valid).toBe(true);

      // After first bet, balance reduces but is still sufficient
      const afterFirstBet = balance - 50; // 150
      const result2 = validateInsuranceBet(50, hand, afterFirstBet);
      expect(result2.valid).toBe(true);

      // Attempting to bet more than max fails (max is 50 for bet of 100)
      const result3 = validateInsuranceBet(60, hand, afterFirstBet);
      expect(result3.valid).toBe(false);
      expect(result3.error).toContain('cannot exceed half');
    });
  });
});
