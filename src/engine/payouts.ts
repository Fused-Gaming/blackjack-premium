import type { Hand } from '../types';

/**
 * Calculate payout for a hand based on outcome
 */
export function calculatePayout(
  hand: Hand,
  outcome: 'win' | 'loss' | 'push' | 'blackjack'
): number {
  switch (outcome) {
    case 'blackjack':
      // Blackjack pays 3:2
      return hand.bet + hand.bet * 1.5;

    case 'win':
      // Regular win pays 1:1
      return hand.bet * 2;

    case 'push':
      // Push returns original bet
      return hand.bet;

    case 'loss':
      // Loss returns nothing
      return 0;

    default:
      return 0;
  }
}

/**
 * Calculate insurance payout (pays 2:1)
 */
export function calculateInsurancePayout(insuranceBet: number, dealerHasBlackjack: boolean): number {
  if (dealerHasBlackjack) {
    // Insurance pays 2:1 plus original bet back
    return insuranceBet * 3;
  }
  return 0;
}

/**
 * Calculate net profit/loss for a hand
 */
export function calculateProfit(hand: Hand, payout: number): number {
  return payout - hand.bet;
}

/**
 * Validate bet amount against balance and limits
 */
export function validateBet(
  amount: number,
  balance: number,
  minBet: number = 1,
  maxBet: number = 1000
): { valid: boolean; error?: string } {
  if (amount < minBet) {
    return { valid: false, error: `Minimum bet is ${minBet}` };
  }

  if (amount > maxBet) {
    return { valid: false, error: `Maximum bet is ${maxBet}` };
  }

  if (amount > balance) {
    return { valid: false, error: 'Insufficient balance' };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return { valid: false, error: 'Invalid bet amount' };
  }

  return { valid: true };
}

/**
 * Calculate total bet across all active seats
 */
export function calculateTotalBet(seats: Record<string, { hands: Hand[]; active: boolean }>): number {
  let total = 0;

  for (const seat of Object.values(seats)) {
    if (seat.active) {
      for (const hand of seat.hands) {
        total += hand.bet;
      }
    }
  }

  return total;
}
