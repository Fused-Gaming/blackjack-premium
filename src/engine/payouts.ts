import type { Hand } from '../types';

/**
 * Calculate payout for a hand based on the game outcome.
 *
 * Payout Rules:
 * - Blackjack: 3:2 (e.g., $100 bet returns $250)
 * - Win: 1:1 (e.g., $100 bet returns $200)
 * - Push: Original bet returned (e.g., $100 bet returns $100)
 * - Loss: No payout (e.g., $100 bet returns $0)
 *
 * @param hand - The player's hand containing bet amount
 * @param outcome - The result of the hand ('win' | 'loss' | 'push' | 'blackjack')
 * @returns The total payout amount (including original bet for wins)
 *
 * @example
 * ```typescript
 * const hand = createHand(100);
 * const payout = calculatePayout(hand, 'blackjack'); // Returns 250
 * ```
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
 * Calculate insurance payout when dealer shows an Ace.
 *
 * Insurance is a side bet that pays 2:1 if the dealer has blackjack.
 * The payout includes the original insurance bet plus winnings (3x the bet total).
 *
 * @param insuranceBet - The amount of the insurance side bet
 * @param dealerHasBlackjack - Whether the dealer has blackjack
 * @returns The total insurance payout (3x bet if dealer has blackjack, 0 otherwise)
 *
 * @example
 * ```typescript
 * // Player bets $50 on insurance
 * const payout = calculateInsurancePayout(50, true); // Returns 150 (original $50 + $100 winnings)
 * const lost = calculateInsurancePayout(50, false); // Returns 0
 * ```
 */
export function calculateInsurancePayout(insuranceBet: number, dealerHasBlackjack: boolean): number {
  if (dealerHasBlackjack) {
    // Insurance pays 2:1 plus original bet back
    return insuranceBet * 3;
  }
  return 0;
}

/**
 * Calculate net profit or loss for a hand after payout.
 *
 * The profit is calculated by subtracting the original bet from the payout.
 * - Positive value: Player won money
 * - Zero: Break even (push)
 * - Negative value: Player lost money
 *
 * @param hand - The player's hand containing the original bet amount
 * @param payout - The total payout received (from calculatePayout)
 * @returns The net profit/loss amount (can be negative)
 *
 * @example
 * ```typescript
 * const hand = createHand(100);
 * const payout = calculatePayout(hand, 'blackjack'); // 250
 * const profit = calculateProfit(hand, payout); // Returns 150 (net win)
 *
 * const lostPayout = calculatePayout(hand, 'loss'); // 0
 * const loss = calculateProfit(hand, lostPayout); // Returns -100 (net loss)
 * ```
 */
export function calculateProfit(hand: Hand, payout: number): number {
  return payout - hand.bet;
}

/**
 * Validate a bet amount against player balance and table limits.
 *
 * Performs the following validations in order:
 * 1. Checks for invalid values (NaN, Infinity, negative, zero)
 * 2. Validates against minimum bet requirement
 * 3. Validates against maximum bet limit
 * 4. Ensures player has sufficient balance
 *
 * @param amount - The bet amount to validate
 * @param balance - The player's current balance
 * @param minBet - Minimum allowed bet (default: 1)
 * @param maxBet - Maximum allowed bet (default: 1000)
 * @returns Object with valid flag and optional error message
 *
 * @example
 * ```typescript
 * const result = validateBet(100, 1000, 10, 500);
 * if (result.valid) {
 *   // Proceed with bet
 * } else {
 *   console.error(result.error); // Display error to user
 * }
 * ```
 */
export function validateBet(
  amount: number,
  balance: number,
  minBet: number = 1,
  maxBet: number = 1000
): { valid: boolean; error?: string } {
  // Check for invalid values first (NaN, Infinity, negative, zero)
  if (!Number.isFinite(amount) || amount <= 0) {
    return { valid: false, error: 'Invalid bet amount' };
  }

  if (amount < minBet) {
    return { valid: false, error: `Minimum bet is ${minBet}` };
  }

  if (amount > maxBet) {
    return { valid: false, error: `Maximum bet is ${maxBet}` };
  }

  if (amount > balance) {
    return { valid: false, error: 'Insufficient balance' };
  }

  return { valid: true };
}

/**
 * Validate if player can afford to double down on a hand.
 *
 * Double down requires the player to match their original bet amount.
 * This function checks if the player has sufficient balance to cover
 * the additional bet required for doubling down.
 *
 * @param hand - The hand to double down (must have valid bet amount)
 * @param balance - Current player balance available for betting
 * @returns Object with valid flag and optional error message
 *
 * @example
 * ```typescript
 * const hand = createHand(100); // Original bet of $100
 * const result = validateDoubleDown(hand, 150); // Player has $150
 * // Returns { valid: true } - player can afford to add $100 more
 *
 * const insufficientResult = validateDoubleDown(hand, 50);
 * // Returns { valid: false, error: "Insufficient balance..." }
 * ```
 */
export function validateDoubleDown(
  hand: Hand,
  balance: number
): { valid: boolean; error?: string } {
  const additionalBetNeeded = hand.bet;

  if (!Number.isFinite(additionalBetNeeded) || additionalBetNeeded <= 0) {
    return { valid: false, error: 'Invalid bet amount' };
  }

  if (additionalBetNeeded > balance) {
    return {
      valid: false,
      error: `Insufficient balance to double down. Need ${additionalBetNeeded}, have ${balance}`
    };
  }

  return { valid: true };
}

/**
 * Calculate the total bet amount across all active seats at the table.
 *
 * Sums all bets from all hands in active seats. This is useful for:
 * - Validating total table exposure
 * - Calculating total winnings/losses across all seats
 * - Managing multi-hand gameplay scenarios (splits, multiple seats)
 *
 * Inactive seats and their bets are excluded from the calculation.
 *
 * @param seats - Record of seat IDs to seat data (hands and active status)
 * @returns Total bet amount across all active seats and their hands
 *
 * @example
 * ```typescript
 * const seats = {
 *   seat1: { active: true, hands: [createHand(100), createHand(100)] }, // Split hand
 *   seat2: { active: true, hands: [createHand(50)] },
 *   seat3: { active: false, hands: [createHand(200)] } // Inactive, excluded
 * };
 * const total = calculateTotalBet(seats); // Returns 250 (100 + 100 + 50)
 * ```
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
