import type { Hand } from '../types';
import { validateBet } from './payouts';

/**
 * Betting system configuration for table limits and rules
 */
export interface BettingConfig {
  minBet: number;
  maxBet: number;
  insuranceMaxRatio: number; // Insurance bet max as ratio of original bet (typically 0.5)
}

/**
 * Default betting configuration matching standard blackjack rules
 */
export const DEFAULT_BETTING_CONFIG: BettingConfig = {
  minBet: 1,
  maxBet: 1000,
  insuranceMaxRatio: 0.5,
};

/**
 * Result of a bet placement operation
 */
export interface BetResult {
  success: boolean;
  newBalance: number;
  error?: string;
}

/**
 * Result of a bet settlement operation
 */
export interface SettlementResult {
  payout: number;
  newBalance: number;
  profit: number;
}

/**
 * Place a bet by deducting the amount from the player's balance.
 * Validates the bet amount against table limits and balance before deducting.
 *
 * @param balance - Current player balance
 * @param amount - Bet amount to place
 * @param config - Betting configuration (optional, uses defaults if not provided)
 * @returns BetResult with success status, new balance, and optional error message
 *
 * @example
 * ```typescript
 * const result = placeBet(1000, 100);
 * if (result.success) {
 *   console.log('New balance:', result.newBalance); // 900
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export function placeBet(
  balance: number,
  amount: number,
  config: BettingConfig = DEFAULT_BETTING_CONFIG
): BetResult {
  // Validate the bet using existing validation function
  const validation = validateBet(amount, balance, config.minBet, config.maxBet);

  if (!validation.valid) {
    return {
      success: false,
      newBalance: balance,
      error: validation.error,
    };
  }

  // Deduct bet from balance
  return {
    success: true,
    newBalance: balance - amount,
  };
}

/**
 * Cancel a bet and return the amount to the player's balance.
 * Used when a player wants to take back their bet before the round starts.
 *
 * @param balance - Current player balance
 * @param amount - Bet amount to return
 * @returns New balance with bet amount added back
 *
 * @throws Error if amount is invalid (negative, NaN, or Infinity)
 *
 * @example
 * ```typescript
 * const newBalance = cancelBet(900, 100); // Returns 1000
 * ```
 */
export function cancelBet(balance: number, amount: number): number {
  if (amount < 0 || !Number.isFinite(amount)) {
    throw new Error('Invalid bet amount to cancel');
  }

  return balance + amount;
}

/**
 * Settle a bet by adding the payout to the player's balance.
 * Called after a hand is complete and the outcome is determined.
 *
 * @param balance - Current player balance
 * @param payout - Payout amount (already calculated by calculatePayout)
 * @returns SettlementResult with payout, new balance, and profit
 *
 * @throws Error if payout is invalid (negative, NaN, or Infinity)
 *
 * @example
 * ```typescript
 * // After winning a $100 bet (payout is $200 for 1:1 win)
 * const result = settleBet(900, 200);
 * console.log(result); // { payout: 200, newBalance: 1100, profit: 200 }
 * ```
 */
export function settleBet(balance: number, payout: number): SettlementResult {
  if (payout < 0 || !Number.isFinite(payout)) {
    throw new Error('Invalid payout amount');
  }

  const newBalance = balance + payout;

  return {
    payout,
    newBalance,
    profit: payout, // Profit is same as payout since bet was already deducted
  };
}

/**
 * Settle multiple bets at once by adding total payout to balance.
 * Useful for settling split hands or multiple player seats simultaneously.
 *
 * @param balance - Current player balance
 * @param payouts - Array of payout amounts
 * @returns SettlementResult with total payout, new balance, and total profit
 *
 * @throws Error if any payout in array is invalid
 *
 * @example
 * ```typescript
 * // Settling 3 hands: win ($200), push ($100), loss ($0)
 * const result = settleAllBets(1000, [200, 100, 0]);
 * console.log(result); // { payout: 300, newBalance: 1300, profit: 300 }
 * ```
 */
export function settleAllBets(balance: number, payouts: number[]): SettlementResult {
  const totalPayout = payouts.reduce((sum, payout) => {
    if (payout < 0 || !Number.isFinite(payout)) {
      throw new Error('Invalid payout in payouts array');
    }
    return sum + payout;
  }, 0);

  return settleBet(balance, totalPayout);
}

/**
 * Check if a player can afford to place a specific bet.
 * Used for quick validation before attempting to place a bet.
 *
 * @param balance - Current player balance
 * @param amount - Bet amount to check
 * @returns True if player has sufficient balance and amount is valid
 *
 * @example
 * ```typescript
 * if (canAffordBet(1000, 100)) {
 *   // Player can afford this bet
 *   const result = placeBet(1000, 100);
 * }
 * ```
 */
export function canAffordBet(balance: number, amount: number): boolean {
  return balance >= amount && amount > 0 && Number.isFinite(amount);
}

/**
 * Validate an insurance bet amount.
 * Insurance bets must be <= half of the original bet (configurable).
 *
 * @param insuranceAmount - Insurance bet amount
 * @param originalBet - Original hand bet amount
 * @param balance - Current player balance
 * @param config - Betting configuration (optional, uses defaults if not provided)
 * @returns Validation result with valid flag and optional error message
 *
 * @example
 * ```typescript
 * const result = validateInsuranceBet(50, 100, 1000);
 * if (result.valid) {
 *   // Can place insurance bet
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export function validateInsuranceBet(
  insuranceAmount: number,
  originalBet: number,
  balance: number,
  config: BettingConfig = DEFAULT_BETTING_CONFIG
): { valid: boolean; error?: string } {
  // Check basic validity
  if (!Number.isFinite(insuranceAmount) || insuranceAmount <= 0) {
    return { valid: false, error: 'Invalid insurance amount' };
  }

  // Check if player can afford it
  if (insuranceAmount > balance) {
    return { valid: false, error: 'Insufficient balance for insurance' };
  }

  // Check maximum insurance ratio (typically 0.5 of original bet)
  const maxInsurance = originalBet * config.insuranceMaxRatio;
  if (insuranceAmount > maxInsurance) {
    return {
      valid: false,
      error: `Insurance bet cannot exceed ${config.insuranceMaxRatio * 100}% of original bet`,
    };
  }

  return { valid: true };
}

/**
 * Validate a split bet amount.
 * Split bets must equal the original bet amount.
 *
 * @param splitAmount - Split bet amount (should equal original bet)
 * @param originalBet - Original hand bet amount
 * @param balance - Current player balance
 * @returns Validation result with valid flag and optional error message
 *
 * @example
 * ```typescript
 * const result = validateSplitBet(100, 100, 1000);
 * if (result.valid) {
 *   // Can split hand
 * }
 * ```
 */
export function validateSplitBet(
  splitAmount: number,
  originalBet: number,
  balance: number
): { valid: boolean; error?: string } {
  // Split bet must equal original bet
  if (splitAmount !== originalBet) {
    return { valid: false, error: 'Split bet must equal original bet' };
  }

  // Check basic validity
  if (!Number.isFinite(splitAmount) || splitAmount <= 0) {
    return { valid: false, error: 'Invalid split bet amount' };
  }

  // Check if player can afford it
  if (splitAmount > balance) {
    return { valid: false, error: 'Insufficient balance to split' };
  }

  return { valid: true };
}

/**
 * Validate a double down operation.
 * Double down requires the player to have enough balance to match their original bet.
 *
 * @param originalBet - Original hand bet amount (will be doubled)
 * @param balance - Current player balance
 * @returns Validation result with valid flag and optional error message
 *
 * @example
 * ```typescript
 * // Player has $100 bet and $150 balance
 * const result = validateDoubleBet(100, 150);
 * // Returns { valid: true } - can afford to add $100 more
 * ```
 */
export function validateDoubleBet(
  originalBet: number,
  balance: number
): { valid: boolean; error?: string } {
  // Check basic validity
  if (!Number.isFinite(originalBet) || originalBet <= 0) {
    return { valid: false, error: 'Invalid bet amount' };
  }

  // Check if player can afford to double (need to add originalBet to current bet)
  if (originalBet > balance) {
    return { valid: false, error: 'Insufficient balance to double down' };
  }

  return { valid: true };
}

/**
 * Calculate the total bet amount across multiple hands.
 * Used for tracking total exposure when a player has split hands.
 *
 * @param hands - Array of hands with bet amounts
 * @returns Total bet amount across all hands
 *
 * @example
 * ```typescript
 * const hands = [
 *   createHand(100), // First hand
 *   createHand(100)  // Split hand
 * ];
 * const total = calculateHandsBet(hands); // Returns 200
 * ```
 */
export function calculateHandsBet(hands: Hand[]): number {
  return hands.reduce((total, hand) => total + hand.bet, 0);
}

/**
 * Calculate the required balance for an operation that adds a bet.
 * Useful for checking if player can afford split, double, or insurance.
 *
 * @param currentHandsBet - Total bet amount from current hands
 * @param additionalBet - Additional bet required for the operation
 * @returns Total required balance
 *
 * @throws Error if any value is invalid (negative, NaN, or Infinity)
 *
 * @example
 * ```typescript
 * // Player has $200 in current bets, wants to double for $100 more
 * const required = calculateRequiredBalance(200, 100); // Returns 300
 * ```
 */
export function calculateRequiredBalance(
  currentHandsBet: number,
  additionalBet: number
): number {
  if (!Number.isFinite(currentHandsBet) || currentHandsBet < 0) {
    throw new Error('Invalid current bets amount');
  }

  if (!Number.isFinite(additionalBet) || additionalBet < 0) {
    throw new Error('Invalid additional bet amount');
  }

  return currentHandsBet + additionalBet;
}

/**
 * Deduct an amount from balance (pure function).
 * Used for internal balance operations with validation.
 *
 * @param balance - Current balance
 * @param amount - Amount to deduct
 * @returns New balance after deduction
 *
 * @throws Error if balance or amount is invalid, or if amount exceeds balance
 *
 * @example
 * ```typescript
 * const newBalance = deductFromBalance(1000, 100); // Returns 900
 * ```
 */
export function deductFromBalance(balance: number, amount: number): number {
  if (!Number.isFinite(balance) || balance < 0) {
    throw new Error('Invalid balance');
  }

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error('Invalid amount to deduct');
  }

  if (amount > balance) {
    throw new Error('Cannot deduct more than balance');
  }

  return balance - amount;
}

/**
 * Add an amount to balance (pure function).
 * Used for internal balance operations with validation.
 *
 * @param balance - Current balance
 * @param amount - Amount to add
 * @returns New balance after addition
 *
 * @throws Error if balance or amount is invalid (negative, NaN, or Infinity)
 *
 * @example
 * ```typescript
 * const newBalance = addToBalance(1000, 200); // Returns 1200
 * ```
 */
export function addToBalance(balance: number, amount: number): number {
  if (!Number.isFinite(balance) || balance < 0) {
    throw new Error('Invalid balance');
  }

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error('Invalid amount to add');
  }

  return balance + amount;
}
