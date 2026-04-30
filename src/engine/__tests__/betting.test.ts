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

  describe('settleBet', () => {
    it('should add payout to balance', () => {
      const result = settleBet(900, 200);

      expect(result.payout).toBe(200);
      expect(result.newBalance).toBe(1100);
      expect(result.profit).toBe(200);
    });

    it('should handle zero payout (loss)', () => {
      const result = settleBet(900, 0);

      expect(result.payout).toBe(0);
      expect(result.newBalance).toBe(900);
      expect(result.profit).toBe(0);
    });

    it('should handle decimal payouts', () => {
      const result = settleBet(900, 150.75);

      expect(result.payout).toBe(150.75);
      expect(result.newBalance).toBe(1050.75);
      expect(result.profit).toBe(150.75);
    });

    it('should throw error for negative payout', () => {
      expect(() => settleBet(1000, -100)).toThrow('Invalid payout amount');
    });

    it('should throw error for NaN payout', () => {
      expect(() => settleBet(1000, NaN)).toThrow('Invalid payout amount');
    });

    it('should throw error for Infinity payout', () => {
      expect(() => settleBet(1000, Infinity)).toThrow('Invalid payout amount');
    });
  });

  describe('settleAllBets', () => {
    it('should settle multiple payouts', () => {
      const result = settleAllBets(1000, [200, 100, 150]);

      expect(result.payout).toBe(450);
      expect(result.newBalance).toBe(1450);
      expect(result.profit).toBe(450);
    });

    it('should handle empty payouts array', () => {
      const result = settleAllBets(1000, []);

      expect(result.payout).toBe(0);
      expect(result.newBalance).toBe(1000);
      expect(result.profit).toBe(0);
    });

    it('should handle mix of wins and losses (zeros)', () => {
      const result = settleAllBets(700, [200, 0, 100]);

      expect(result.payout).toBe(300);
      expect(result.newBalance).toBe(1000);
      expect(result.profit).toBe(300);
    });

    it('should handle decimal amounts', () => {
      const result = settleAllBets(1000, [100.5, 50.25, 25.75]);

      expect(result.payout).toBeCloseTo(176.5, 2);
      expect(result.newBalance).toBeCloseTo(1176.5, 2);
    });

    it('should throw error for negative payout in array', () => {
      expect(() => settleAllBets(1000, [100, -50, 200])).toThrow('Invalid payout in payouts array');
    });

    it('should throw error for NaN in array', () => {
      expect(() => settleAllBets(1000, [100, NaN, 200])).toThrow('Invalid payout in payouts array');
    });

    it('should throw error for Infinity in array', () => {
      expect(() => settleAllBets(1000, [100, Infinity, 200])).toThrow(
        'Invalid payout in payouts array'
      );
    });
  });

  describe('canAffordBet', () => {
    it('should return true for affordable bet', () => {
      expect(canAffordBet(1000, 100)).toBe(true);
    });

    it('should return true for bet equal to balance', () => {
      expect(canAffordBet(1000, 1000)).toBe(true);
    });

    it('should return false for bet exceeding balance', () => {
      expect(canAffordBet(500, 600)).toBe(false);
    });

    it('should return false for zero bet', () => {
      expect(canAffordBet(1000, 0)).toBe(false);
    });

    it('should return false for negative bet', () => {
      expect(canAffordBet(1000, -100)).toBe(false);
    });

    it('should return false for NaN bet', () => {
      expect(canAffordBet(1000, NaN)).toBe(false);
    });

    it('should return false for Infinity bet', () => {
      expect(canAffordBet(1000, Infinity)).toBe(false);
    });

    it('should handle decimal amounts', () => {
      expect(canAffordBet(100.5, 50.25)).toBe(true);
      expect(canAffordBet(50.25, 100.5)).toBe(false);
    });
  });

  describe('validateInsuranceBet', () => {
    it('should accept valid insurance bet (half of original)', () => {
      const result = validateInsuranceBet(50, 100, 1000);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept insurance bet less than half', () => {
      const result = validateInsuranceBet(25, 100, 1000);

      expect(result.valid).toBe(true);
    });

    it('should reject insurance bet exceeding half of original', () => {
      const result = validateInsuranceBet(60, 100, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('cannot exceed 50%');
    });

    it('should reject insurance bet exceeding balance', () => {
      const result = validateInsuranceBet(50, 100, 40);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Insufficient balance for insurance');
    });

    it('should reject zero insurance bet', () => {
      const result = validateInsuranceBet(0, 100, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid insurance amount');
    });

    it('should reject negative insurance bet', () => {
      const result = validateInsuranceBet(-50, 100, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid insurance amount');
    });

    it('should reject NaN insurance bet', () => {
      const result = validateInsuranceBet(NaN, 100, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid insurance amount');
    });

    it('should handle decimal amounts', () => {
      const result = validateInsuranceBet(25.5, 51, 1000);

      expect(result.valid).toBe(true);
    });

    it('should use custom insurance ratio', () => {
      const customConfig: BettingConfig = {
        minBet: 1,
        maxBet: 1000,
        insuranceMaxRatio: 0.3, // Only 30% allowed
      };

      const result = validateInsuranceBet(40, 100, 1000, customConfig);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('cannot exceed 30%');
    });
  });

  describe('validateSplitBet', () => {
    it('should accept split bet equal to original', () => {
      const result = validateSplitBet(100, 100, 1000);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject split bet not equal to original', () => {
      const result = validateSplitBet(50, 100, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Split bet must equal original bet');
    });

    it('should reject split bet exceeding balance', () => {
      const result = validateSplitBet(100, 100, 50);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Insufficient balance to split');
    });

    it('should reject zero split bet', () => {
      const result = validateSplitBet(0, 0, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid split bet amount');
    });

    it('should reject negative split bet', () => {
      const result = validateSplitBet(-100, -100, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid split bet amount');
    });

    it('should handle decimal amounts', () => {
      const result = validateSplitBet(50.5, 50.5, 1000);

      expect(result.valid).toBe(true);
    });
  });

  describe('validateDoubleBet', () => {
    it('should accept valid double down', () => {
      const result = validateDoubleBet(100, 1000);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept double down when balance equals bet', () => {
      const result = validateDoubleBet(100, 100);

      expect(result.valid).toBe(true);
    });

    it('should reject double down with insufficient balance', () => {
      const result = validateDoubleBet(100, 50);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Insufficient balance to double down');
    });

    it('should reject zero bet', () => {
      const result = validateDoubleBet(0, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject negative bet', () => {
      const result = validateDoubleBet(-100, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should handle decimal amounts', () => {
      const result = validateDoubleBet(50.5, 1000);

      expect(result.valid).toBe(true);
    });
  });

  describe('calculateHandsBet', () => {
    it('should calculate total bet for single hand', () => {
      const hands = [createHand(100)];
      const total = calculateHandsBet(hands);

      expect(total).toBe(100);
    });

    it('should calculate total bet for multiple hands', () => {
      const hands = [createHand(100), createHand(200), createHand(50)];
      const total = calculateHandsBet(hands);

      expect(total).toBe(350);
    });

    it('should return 0 for empty hands array', () => {
      const total = calculateHandsBet([]);

      expect(total).toBe(0);
    });

    it('should handle decimal bet amounts', () => {
      const hands = [createHand(50.5), createHand(25.25)];
      const total = calculateHandsBet(hands);

      expect(total).toBe(75.75);
    });

    it('should handle split hands', () => {
      const hand1 = createHand(100);
      hand1.isSplit = true;
      const hand2 = createHand(100);
      hand2.isSplit = true;

      const total = calculateHandsBet([hand1, hand2]);

      expect(total).toBe(200);
    });
  });

  describe('calculateRequiredBalance', () => {
    it('should calculate required balance for additional bet', () => {
      const required = calculateRequiredBalance(200, 100);

      expect(required).toBe(300);
    });

    it('should handle zero current bets', () => {
      const required = calculateRequiredBalance(0, 100);

      expect(required).toBe(100);
    });

    it('should handle zero additional bet', () => {
      const required = calculateRequiredBalance(200, 0);

      expect(required).toBe(200);
    });

    it('should handle decimal amounts', () => {
      const required = calculateRequiredBalance(150.5, 50.25);

      expect(required).toBeCloseTo(200.75, 2);
    });

    it('should throw error for negative current bets', () => {
      expect(() => calculateRequiredBalance(-100, 50)).toThrow('Invalid current bets amount');
    });

    it('should throw error for negative additional bet', () => {
      expect(() => calculateRequiredBalance(100, -50)).toThrow('Invalid additional bet amount');
    });

    it('should throw error for NaN current bets', () => {
      expect(() => calculateRequiredBalance(NaN, 100)).toThrow('Invalid current bets amount');
    });

    it('should throw error for NaN additional bet', () => {
      expect(() => calculateRequiredBalance(100, NaN)).toThrow('Invalid additional bet amount');
    });
  });

  describe('deductFromBalance', () => {
    it('should deduct amount from balance', () => {
      const newBalance = deductFromBalance(1000, 100);

      expect(newBalance).toBe(900);
    });

    it('should handle deducting entire balance', () => {
      const newBalance = deductFromBalance(1000, 1000);

      expect(newBalance).toBe(0);
    });

    it('should handle decimal amounts', () => {
      const newBalance = deductFromBalance(1000, 50.5);

      expect(newBalance).toBe(949.5);
    });

    it('should throw error for negative balance', () => {
      expect(() => deductFromBalance(-100, 50)).toThrow('Invalid balance');
    });

    it('should throw error for negative amount', () => {
      expect(() => deductFromBalance(1000, -50)).toThrow('Invalid amount to deduct');
    });

    it('should throw error when deducting more than balance', () => {
      expect(() => deductFromBalance(500, 600)).toThrow('Cannot deduct more than balance');
    });

    it('should throw error for NaN balance', () => {
      expect(() => deductFromBalance(NaN, 100)).toThrow('Invalid balance');
    });

    it('should throw error for NaN amount', () => {
      expect(() => deductFromBalance(1000, NaN)).toThrow('Invalid amount to deduct');
    });
  });

  describe('addToBalance', () => {
    it('should add amount to balance', () => {
      const newBalance = addToBalance(1000, 200);

      expect(newBalance).toBe(1200);
    });

    it('should handle zero amount', () => {
      const newBalance = addToBalance(1000, 0);

      expect(newBalance).toBe(1000);
    });

    it('should handle decimal amounts', () => {
      const newBalance = addToBalance(1000, 50.5);

      expect(newBalance).toBe(1050.5);
    });

    it('should throw error for negative balance', () => {
      expect(() => addToBalance(-100, 50)).toThrow('Invalid balance');
    });

    it('should throw error for negative amount', () => {
      expect(() => addToBalance(1000, -50)).toThrow('Invalid amount to add');
    });

    it('should throw error for NaN balance', () => {
      expect(() => addToBalance(NaN, 100)).toThrow('Invalid balance');
    });

    it('should throw error for NaN amount', () => {
      expect(() => addToBalance(1000, NaN)).toThrow('Invalid amount to add');
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

    it('should handle bet placement and loss', () => {
      let balance = 1000;

      // Place bet
      const placeBetResult = placeBet(balance, 100);
      balance = placeBetResult.newBalance;
      expect(balance).toBe(900);

      // Lose bet (payout is 0)
      const settlementResult = settleBet(balance, 0);
      balance = settlementResult.newBalance;

      expect(balance).toBe(900); // Lost the 100 bet
    });

    it('should handle split hand scenario', () => {
      let balance = 1000;
      const originalBet = 100;

      // Place initial bet
      const initialBetResult = placeBet(balance, originalBet);
      balance = initialBetResult.newBalance;
      expect(balance).toBe(900);

      // Split validation
      const splitValidation = validateSplitBet(originalBet, originalBet, balance);
      expect(splitValidation.valid).toBe(true);

      // Place split bet
      const splitBetResult = placeBet(balance, originalBet);
      balance = splitBetResult.newBalance;
      expect(balance).toBe(800);

      // Both hands win
      const settlementResult = settleAllBets(balance, [200, 200]);
      balance = settlementResult.newBalance;

      expect(balance).toBe(1200); // 800 + 400
      expect(settlementResult.profit).toBe(400);
    });

    it('should handle double down scenario', () => {
      let balance = 1000;
      const originalBet = 100;

      // Place initial bet
      const initialBetResult = placeBet(balance, originalBet);
      balance = initialBetResult.newBalance;
      expect(balance).toBe(900);

      // Double down validation
      const doubleValidation = validateDoubleBet(originalBet, balance);
      expect(doubleValidation.valid).toBe(true);

      // Place double bet
      const doubleBetResult = placeBet(balance, originalBet);
      balance = doubleBetResult.newBalance;
      expect(balance).toBe(800);

      // Win with doubled bet (total bet is 200, payout is 400)
      const settlementResult = settleBet(balance, 400);
      balance = settlementResult.newBalance;

      expect(balance).toBe(1200);
      expect(settlementResult.profit).toBe(400);
    });

    it('should handle insurance scenario', () => {
      let balance = 1000;
      const originalBet = 100;

      // Place initial bet
      const initialBetResult = placeBet(balance, originalBet);
      balance = initialBetResult.newBalance;
      expect(balance).toBe(900);

      // Insurance validation
      const insuranceAmount = 50;
      const insuranceValidation = validateInsuranceBet(insuranceAmount, originalBet, balance);
      expect(insuranceValidation.valid).toBe(true);

      // Place insurance bet
      const insuranceBetResult = placeBet(balance, insuranceAmount);
      balance = insuranceBetResult.newBalance;
      expect(balance).toBe(850);

      // Dealer has blackjack - lose main bet, win insurance (insurance pays 2:1 + original)
      const settlementResult = settleAllBets(balance, [0, 150]); // Main bet loss, insurance win
      balance = settlementResult.newBalance;

      expect(balance).toBe(1000); // Break even
    });

    it('should handle insufficient balance for split', () => {
      let balance = 150;
      const originalBet = 100;

      // Place initial bet
      const initialBetResult = placeBet(balance, originalBet);
      balance = initialBetResult.newBalance;
      expect(balance).toBe(50);

      // Try to split (need another 100)
      const splitValidation = validateSplitBet(originalBet, originalBet, balance);
      expect(splitValidation.valid).toBe(false);
      expect(splitValidation.error).toBe('Insufficient balance to split');
    });

    it('should handle bet cancellation and re-bet', () => {
      let balance = 1000;

      // Place bet
      const placeBetResult = placeBet(balance, 100);
      balance = placeBetResult.newBalance;
      expect(balance).toBe(900);

      // Cancel bet
      balance = cancelBet(balance, 100);
      expect(balance).toBe(1000);

      // Place different bet
      const newBetResult = placeBet(balance, 200);
      balance = newBetResult.newBalance;
      expect(balance).toBe(800);
    });

    it('should handle multiple hands with different outcomes', () => {
      let balance = 1000;

      // Place three bets
      const bet1 = placeBet(balance, 100);
      balance = bet1.newBalance; // 900
      const bet2 = placeBet(balance, 100);
      balance = bet2.newBalance; // 800
      const bet3 = placeBet(balance, 100);
      balance = bet3.newBalance; // 700

      // Outcomes: win, push, loss
      // Win: 200, Push: 100, Loss: 0
      const settlementResult = settleAllBets(balance, [200, 100, 0]);
      balance = settlementResult.newBalance;

      expect(balance).toBe(1000); // 700 + 300 = 1000
    });
  });

  describe('Edge Cases and Precision', () => {
    it('should handle floating point precision for bets', () => {
      const result = placeBet(1000.99, 100.33);

      expect(result.success).toBe(true);
      expect(result.newBalance).toBeCloseTo(900.66, 2);
    });

    it('should handle floating point precision for settlements', () => {
      const result = settleBet(900.66, 200.67);

      expect(result.newBalance).toBeCloseTo(1101.33, 2);
    });

    it('should handle very small bets', () => {
      const result = placeBet(10, 1);

      expect(result.success).toBe(true);
      expect(result.newBalance).toBe(9);
    });

    it('should handle very large balances', () => {
      const result = placeBet(1000000, 1000);

      expect(result.success).toBe(true);
      expect(result.newBalance).toBe(999000);
    });

    it('should maintain precision across multiple operations', () => {
      let balance = 1000.99;

      balance = placeBet(balance, 50.33).newBalance;
      expect(balance).toBeCloseTo(950.66, 2);

      balance = settleBet(balance, 100.67).newBalance;
      expect(balance).toBeCloseTo(1051.33, 2);

      balance = deductFromBalance(balance, 25.25);
      expect(balance).toBeCloseTo(1026.08, 2);

      balance = addToBalance(balance, 73.92);
      expect(balance).toBeCloseTo(1100, 2);
    });
  });
});
