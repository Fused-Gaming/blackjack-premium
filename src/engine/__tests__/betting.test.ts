import { describe, it, expect } from 'vitest';
import {
  placeBet,
  cancelBet,
  settleBet,
  settleAllBets,
  canAffordBet,
  validateInsuranceBet,
  validateSplitBet,
  validateDoubleBet,
  calculateHandsBet,
  calculateRequiredBalance,
  deductFromBalance,
  addToBalance,
  DEFAULT_BETTING_CONFIG,
  type BettingConfig,
} from '../betting';
import { createHand } from '../hand';

describe('Betting System', () => {
  describe('placeBet', () => {
    it('should successfully place a valid bet', () => {
      const result = placeBet(1000, 100);

      expect(result.success).toBe(true);
      expect(result.newBalance).toBe(900);
      expect(result.error).toBeUndefined();
    });

    it('should reject bet below minimum', () => {
      const result = placeBet(1000, 0.5);

      expect(result.success).toBe(false);
      expect(result.newBalance).toBe(1000);
      expect(result.error).toBe('Minimum bet is 1');
    });

    it('should reject bet above maximum', () => {
      const result = placeBet(2000, 1500);

      expect(result.success).toBe(false);
      expect(result.newBalance).toBe(2000);
      expect(result.error).toBe('Maximum bet is 1000');
    });

    it('should reject bet exceeding balance', () => {
      const result = placeBet(500, 600);

      expect(result.success).toBe(false);
      expect(result.newBalance).toBe(500);
      expect(result.error).toBe('Insufficient balance');
    });

    it('should reject negative bet', () => {
      const result = placeBet(1000, -50);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Minimum bet is 1'); // Negative numbers fail min check first
    });

    it('should reject NaN bet', () => {
      const result = placeBet(1000, NaN);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject Infinity bet', () => {
      const result = placeBet(1000, Infinity);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Maximum bet is 1000'); // Infinity fails max check first
    });

    it('should accept bet at minimum limit', () => {
      const result = placeBet(1000, 1);

      expect(result.success).toBe(true);
      expect(result.newBalance).toBe(999);
    });

    it('should accept bet at maximum limit', () => {
      const result = placeBet(1000, 1000);

      expect(result.success).toBe(true);
      expect(result.newBalance).toBe(0);
    });

    it('should accept bet equal to balance', () => {
      const result = placeBet(500, 500);

      expect(result.success).toBe(true);
      expect(result.newBalance).toBe(0);
    });

    it('should handle decimal bet amounts', () => {
      const result = placeBet(1000, 50.5);

      expect(result.success).toBe(true);
      expect(result.newBalance).toBe(949.5);
    });

    it('should use custom betting config', () => {
      const customConfig: BettingConfig = {
        minBet: 10,
        maxBet: 500,
        insuranceMaxRatio: 0.5,
      };

      const resultTooLow = placeBet(1000, 5, customConfig);
      expect(resultTooLow.success).toBe(false);
      expect(resultTooLow.error).toBe('Minimum bet is 10');

      const resultTooHigh = placeBet(1000, 600, customConfig);
      expect(resultTooHigh.success).toBe(false);
      expect(resultTooHigh.error).toBe('Maximum bet is 500');

      const resultValid = placeBet(1000, 100, customConfig);
      expect(resultValid.success).toBe(true);
      expect(resultValid.newBalance).toBe(900);
    });
  });

  describe('cancelBet', () => {
    it('should return bet amount to balance', () => {
      const newBalance = cancelBet(900, 100);

      expect(newBalance).toBe(1000);
    });

    it('should handle zero bet cancellation', () => {
      const newBalance = cancelBet(1000, 0);

      expect(newBalance).toBe(1000);
    });

    it('should handle decimal amounts', () => {
      const newBalance = cancelBet(949.5, 50.5);

      expect(newBalance).toBe(1000);
    });

    it('should throw error for negative bet', () => {
      expect(() => cancelBet(1000, -100)).toThrow('Invalid bet amount to cancel');
    });

    it('should throw error for NaN bet', () => {
      expect(() => cancelBet(1000, NaN)).toThrow('Invalid bet amount to cancel');
    });

    it('should throw error for Infinity bet', () => {
      expect(() => cancelBet(1000, Infinity)).toThrow('Invalid bet amount to cancel');
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete bet placement and settlement flow', () => {
      let balance = 1000;

      // Place bet
      const placeBetResult = placeBet(balance, 100);
      expect(placeBetResult.success).toBe(true);
      balance = placeBetResult.newBalance;
      expect(balance).toBe(900);

      // Win bet (payout is bet * 2 for regular win)
      const settlementResult = settleBet(balance, 200);
      balance = settlementResult.newBalance;

      expect(balance).toBe(1100);
      expect(settlementResult.profit).toBe(200);
    });
  });
});
