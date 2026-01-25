import { describe, it, expect } from 'vitest';
import {
  calculatePayout,
  calculateInsurancePayout,
  calculateProfit,
  validateBet,
  validateDoubleDown,
  calculateTotalBet,
} from '../payouts';
import { createHand } from '../hand';

describe('Payout Calculations', () => {
  describe('calculatePayout', () => {
    it('should calculate blackjack payout (3:2)', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'blackjack');

      // Blackjack pays 3:2, so bet of 100 should return 100 + 150 = 250
      expect(payout).toBe(250);
    });

    it('should calculate regular win payout (1:1)', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'win');

      // Regular win pays 1:1, so bet of 100 should return 100 + 100 = 200
      expect(payout).toBe(200);
    });

    it('should return original bet on push', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'push');

      // Push returns original bet
      expect(payout).toBe(100);
    });

    it('should return 0 on loss', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'loss');

      // Loss returns nothing
      expect(payout).toBe(0);
    });

    it('should handle decimal bet amounts for blackjack', () => {
      const hand = createHand(50.50);
      const payout = calculatePayout(hand, 'blackjack');

      // 50.50 + (50.50 * 1.5) = 50.50 + 75.75 = 126.25
      expect(payout).toBe(126.25);
    });

    it('should handle decimal bet amounts for regular win', () => {
      const hand = createHand(25.75);
      const payout = calculatePayout(hand, 'win');

      // 25.75 * 2 = 51.50
      expect(payout).toBe(51.5);
    });

    it('should handle zero bet', () => {
      const hand = createHand(0);
      const payout = calculatePayout(hand, 'win');

      expect(payout).toBe(0);
    });

    it('should handle large bet amounts', () => {
      const hand = createHand(10000);
      const payout = calculatePayout(hand, 'blackjack');

      // 10000 + 15000 = 25000
      expect(payout).toBe(25000);
    });

    it('should handle minimum bet amounts', () => {
      const hand = createHand(1);
      const payout = calculatePayout(hand, 'blackjack');

      // 1 + 1.5 = 2.5
      expect(payout).toBe(2.5);
    });
  });

  describe('calculateInsurancePayout', () => {
    it('should pay 2:1 when dealer has blackjack', () => {
      const insuranceBet = 50;
      const payout = calculateInsurancePayout(insuranceBet, true);

      // Insurance pays 2:1 plus original bet back (50 * 3 = 150)
      expect(payout).toBe(150);
    });

    it('should return 0 when dealer does not have blackjack', () => {
      const insuranceBet = 50;
      const payout = calculateInsurancePayout(insuranceBet, false);

      expect(payout).toBe(0);
    });

    it('should handle decimal insurance bets', () => {
      const insuranceBet = 25.50;
      const payout = calculateInsurancePayout(insuranceBet, true);

      // 25.50 * 3 = 76.50
      expect(payout).toBe(76.5);
    });

    it('should handle zero insurance bet', () => {
      const insuranceBet = 0;
      const payout = calculateInsurancePayout(insuranceBet, true);

      expect(payout).toBe(0);
    });

    it('should handle large insurance bets', () => {
      const insuranceBet = 5000;
      const payout = calculateInsurancePayout(insuranceBet, true);

      expect(payout).toBe(15000);
    });
  });

  describe('calculateProfit', () => {
    it('should calculate profit for blackjack win', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'blackjack');
      const profit = calculateProfit(hand, payout);

      // Payout is 250, bet is 100, profit is 150
      expect(profit).toBe(150);
    });

    it('should calculate profit for regular win', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'win');
      const profit = calculateProfit(hand, payout);

      // Payout is 200, bet is 100, profit is 100
      expect(profit).toBe(100);
    });

    it('should calculate zero profit for push', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'push');
      const profit = calculateProfit(hand, payout);

      // Payout is 100, bet is 100, profit is 0
      expect(profit).toBe(0);
    });

    it('should calculate negative profit (loss) for lost hand', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'loss');
      const profit = calculateProfit(hand, payout);

      // Payout is 0, bet is 100, profit is -100
      expect(profit).toBe(-100);
    });

    it('should handle decimal amounts', () => {
      const hand = createHand(50.50);
      const payout = calculatePayout(hand, 'win');
      const profit = calculateProfit(hand, payout);

      // Payout is 101, bet is 50.50, profit is 50.50
      expect(profit).toBe(50.5);
    });
  });

  describe('validateBet', () => {
    it('should accept valid bet within limits', () => {
      const result = validateBet(100, 1000, 10, 500);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject bet below minimum', () => {
      const result = validateBet(5, 1000, 10, 500);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Minimum bet is 10');
    });

    it('should reject bet above maximum', () => {
      const result = validateBet(600, 1000, 10, 500);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Maximum bet is 500');
    });

    it('should reject bet exceeding balance', () => {
      const result = validateBet(500, 400, 10, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Insufficient balance');
    });

    it('should reject negative bet', () => {
      const result = validateBet(-50, 1000, 10, 500);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject zero bet', () => {
      const result = validateBet(0, 1000, 10, 500);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject NaN bet', () => {
      const result = validateBet(NaN, 1000, 10, 500);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject Infinity bet', () => {
      const result = validateBet(Infinity, 1000, 10, 500);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should accept bet at minimum limit', () => {
      const result = validateBet(10, 1000, 10, 500);

      expect(result.valid).toBe(true);
    });

    it('should accept bet at maximum limit', () => {
      const result = validateBet(500, 1000, 10, 500);

      expect(result.valid).toBe(true);
    });

    it('should accept bet equal to balance', () => {
      const result = validateBet(500, 500, 10, 500);

      expect(result.valid).toBe(true);
    });

    it('should use default min/max when not provided', () => {
      const resultTooLow = validateBet(0.5, 1000);
      expect(resultTooLow.valid).toBe(false);

      const resultTooHigh = validateBet(1500, 2000);
      expect(resultTooHigh.valid).toBe(false);

      const resultValid = validateBet(100, 1000);
      expect(resultValid.valid).toBe(true);
    });

    it('should handle decimal bet amounts', () => {
      const result = validateBet(50.50, 1000, 10, 500);

      expect(result.valid).toBe(true);
    });
  });

  describe('validateDoubleDown', () => {
    it('should accept double down when balance is sufficient', () => {
      const hand = createHand(100);
      const result = validateDoubleDown(hand, 200);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept double down when balance exactly matches bet', () => {
      const hand = createHand(100);
      const result = validateDoubleDown(hand, 100);

      expect(result.valid).toBe(true);
    });

    it('should reject double down when balance is insufficient', () => {
      const hand = createHand(100);
      const result = validateDoubleDown(hand, 50);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('Insufficient balance to double down');
      expect(result.error).toContain('Need 100');
      expect(result.error).toContain('have 50');
    });

    it('should reject double down with zero balance', () => {
      const hand = createHand(100);
      const result = validateDoubleDown(hand, 0);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('Insufficient balance');
    });

    it('should handle decimal bet amounts', () => {
      const hand = createHand(50.50);
      const result = validateDoubleDown(hand, 60);

      expect(result.valid).toBe(true);
    });

    it('should reject double down with invalid hand bet (zero)', () => {
      const hand = createHand(0);
      const result = validateDoubleDown(hand, 100);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject double down with invalid hand bet (negative)', () => {
      const hand = createHand(-50);
      const result = validateDoubleDown(hand, 100);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject double down with NaN hand bet', () => {
      const hand = createHand(NaN);
      const result = validateDoubleDown(hand, 100);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should handle large bet amounts', () => {
      const hand = createHand(5000);
      const result = validateDoubleDown(hand, 10000);

      expect(result.valid).toBe(true);
    });
  });

  describe('calculateTotalBet', () => {
    it('should calculate total bet across single seat with single hand', () => {
      const seats = {
        seat1: {
          active: true,
          hands: [createHand(100)],
        },
      };

      const total = calculateTotalBet(seats);
      expect(total).toBe(100);
    });

    it('should calculate total bet across multiple seats', () => {
      const seats = {
        seat1: {
          active: true,
          hands: [createHand(100)],
        },
        seat2: {
          active: true,
          hands: [createHand(200)],
        },
        seat3: {
          active: true,
          hands: [createHand(150)],
        },
      };

      const total = calculateTotalBet(seats);
      expect(total).toBe(450);
    });

    it('should calculate total bet for seat with split hands', () => {
      const seats = {
        seat1: {
          active: true,
          hands: [createHand(100), createHand(100)], // Split hand
        },
      };

      const total = calculateTotalBet(seats);
      expect(total).toBe(200);
    });

    it('should ignore inactive seats', () => {
      const seats = {
        seat1: {
          active: true,
          hands: [createHand(100)],
        },
        seat2: {
          active: false,
          hands: [createHand(200)],
        },
      };

      const total = calculateTotalBet(seats);
      expect(total).toBe(100);
    });

    it('should return 0 for empty seats object', () => {
      const seats = {};

      const total = calculateTotalBet(seats);
      expect(total).toBe(0);
    });

    it('should return 0 when all seats are inactive', () => {
      const seats = {
        seat1: {
          active: false,
          hands: [createHand(100)],
        },
        seat2: {
          active: false,
          hands: [createHand(200)],
        },
      };

      const total = calculateTotalBet(seats);
      expect(total).toBe(0);
    });

    it('should handle seats with no hands', () => {
      const seats = {
        seat1: {
          active: true,
          hands: [],
        },
      };

      const total = calculateTotalBet(seats);
      expect(total).toBe(0);
    });

    it('should handle decimal bet amounts', () => {
      const seats = {
        seat1: {
          active: true,
          hands: [createHand(50.50), createHand(25.25)],
        },
      };

      const total = calculateTotalBet(seats);
      expect(total).toBe(75.75);
    });

    it('should handle complex multi-seat, multi-hand scenario', () => {
      const seats = {
        seat1: {
          active: true,
          hands: [createHand(100), createHand(100)], // Split
        },
        seat2: {
          active: true,
          hands: [createHand(200)],
        },
        seat3: {
          active: false,
          hands: [createHand(300)], // Inactive, should be ignored
        },
        seat4: {
          active: true,
          hands: [createHand(50), createHand(50), createHand(50)], // Multiple splits
        },
      };

      const total = calculateTotalBet(seats);
      // seat1: 200, seat2: 200, seat3: 0 (inactive), seat4: 150
      expect(total).toBe(550);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete game flow for winning hand', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'win');
      const profit = calculateProfit(hand, payout);

      expect(payout).toBe(200);
      expect(profit).toBe(100);
    });

    it('should handle complete game flow for blackjack', () => {
      const hand = createHand(100);
      const payout = calculatePayout(hand, 'blackjack');
      const profit = calculateProfit(hand, payout);

      expect(payout).toBe(250);
      expect(profit).toBe(150);
    });

    it('should handle insurance win with dealer blackjack', () => {
      const hand = createHand(100);
      const insuranceBet = 50; // Half of original bet

      // Player loses main bet
      const mainPayout = calculatePayout(hand, 'loss');
      const mainProfit = calculateProfit(hand, mainPayout);

      // But wins insurance
      const insurancePayout = calculateInsurancePayout(insuranceBet, true);
      const insuranceProfit = insurancePayout - insuranceBet;

      // Net result
      const netProfit = mainProfit + insuranceProfit;

      expect(mainPayout).toBe(0);
      expect(mainProfit).toBe(-100);
      expect(insurancePayout).toBe(150);
      expect(insuranceProfit).toBe(100);
      expect(netProfit).toBe(0); // Break even
    });

    it('should handle split hands payout calculation', () => {
      const hand1 = createHand(100);
      const hand2 = createHand(100);

      const payout1 = calculatePayout(hand1, 'win');
      const payout2 = calculatePayout(hand2, 'loss');

      const profit1 = calculateProfit(hand1, payout1);
      const profit2 = calculateProfit(hand2, payout2);

      const totalProfit = profit1 + profit2;

      expect(profit1).toBe(100);
      expect(profit2).toBe(-100);
      expect(totalProfit).toBe(0); // One wins, one loses
    });

    it('should validate and execute double down flow', () => {
      const hand = createHand(100);
      const balance = 200;

      // Validate double down
      const validation = validateDoubleDown(hand, balance);
      expect(validation.valid).toBe(true);

      // Double the bet (would happen in game logic)
      const doubledBet = hand.bet * 2;

      // Calculate payout if win
      const doubledHand = { ...hand, bet: doubledBet };
      const payout = calculatePayout(doubledHand, 'win');
      const profit = calculateProfit(doubledHand, payout);

      expect(payout).toBe(400); // $200 bet returns $400
      expect(profit).toBe(200); // Net profit of $200
    });
  });

  describe('Edge Cases and Precision', () => {
    it('should handle floating point precision for blackjack payout', () => {
      const hand = createHand(33.33);
      const payout = calculatePayout(hand, 'blackjack');

      // 33.33 + (33.33 * 1.5) = 33.33 + 49.995 = 83.325
      expect(payout).toBeCloseTo(83.325, 2);
    });

    it('should maintain precision for multiple operations', () => {
      const hand = createHand(99.99);
      const payout = calculatePayout(hand, 'win');
      const profit = calculateProfit(hand, payout);

      expect(payout).toBeCloseTo(199.98, 2);
      expect(profit).toBeCloseTo(99.99, 2);
    });

    it('should handle very small bets', () => {
      const hand = createHand(0.01);
      const payout = calculatePayout(hand, 'blackjack');

      expect(payout).toBeCloseTo(0.025, 3);
    });
  });
});
