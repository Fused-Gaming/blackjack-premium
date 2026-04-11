import type { Hand } from '../types';
import { validateBet } from './payouts';

/**
 * Betting system configuration
 */
export interface BettingConfig {
  minBet: number;
  maxBet: number;
  insuranceMaxRatio: number; // Insurance bet max as ratio of original bet (typically 0.5)
}

/**
 * Default betting configuration
 */
export const DEFAULT_BETTING_CONFIG: BettingConfig = {
  minBet: 1,
  maxBet: 1000,
  insuranceMaxRatio: 0.5,
};

/**
 * Result of a bet operation
 */
export interface BetResult {
  success: boolean;
  newBalance: number;
  error?: string;
}

/**
 * Result of a bet settlement
 */
export interface SettlementResult {
  payout: number;
  newBalance: number;
  profit: number;
}

/**
 * Place a bet by deducting the amount from balance
 *
 * @param balance - Current balance
 * @param amount - Bet amount
 * @param config - Betting configuration
 * @returns Bet result with new balance or error
 *
 * @example
 * ```ts
 * const result = placeBet(1000, 100);
 * if (result.success) {
 *   console.log('New balance:', result.newBalance); // 900
 * }
 * ```
 */
export function placeBet(
  balance: number,
  amount: number,
  config: BettingConfig = DEFAULT_BETTING_CONFIG
): BetResult {
  // Validate the bet
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
 * Cancel a bet and return the amount to balance
 *
 * @param balance - Current balance
 * @param amount - Bet amount to return
 * @returns New balance with bet returned
 *
 * @example
 * ```ts
 * const newBalance = cancelBet(900, 100); // 1000
 * ```
 */
export function cancelBet(balance: number, amount: number): number {
  if (amount < 0 || !Number.isFinite(amount)) {
    throw new Error('Invalid bet amount to cancel');
  }

  return balance + amount;
}

/**
 * Settle a bet and add payout to balance
 *
 * @param balance - Current balance
 * @param payout - Payout amount from the bet
 * @returns Settlement result with payout, new balance, and profit
 *
 * @example
 * ```ts
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
 * Settle multiple bets and add total payout to balance
 *
 * @param balance - Current balance
 * @param payouts - Array of payout amounts
 * @returns Settlement result with total payout and new balance
 *
 * @example
 * ```ts
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
 * Check if player can afford a bet
 *
 * @param balance - Current balance
 * @param amount - Bet amount
 * @returns True if player can afford the bet
 *
 * @example
 * ```ts
 * if (canAffordBet(1000, 100)) {
 *   // Place the bet
 * }
 * ```
 */
export function canAffordBet(balance: number, amount: number): boolean {
  return balance >= amount && amount > 0 && Number.isFinite(amount);
}

/**
 * Validate insurance bet amount
 * Insurance bets must be <= half of the original bet
 *
 * @param insuranceAmount - Insurance bet amount
 * @param originalBet - Original bet amount
 * @param balance - Current balance
 * @param config - Betting configuration
 * @returns Validation result
 *
 * @example
 * ```ts
 * const result = validateInsuranceBet(50, 100, 1000);
 * console.log(result.valid); // true
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
 * Validate split bet amount
 * Split bets must equal the original bet
 *
 * @param splitAmount - Split bet amount (should equal original)
 * @param originalBet - Original bet amount
 * @param balance - Current balance
 * @returns Validation result
 *
 * @example
 * ```ts
 * const result = validateSplitBet(100, 100, 1000);
 * console.log(result.valid); // true
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
 * Validate double down bet amount
 * Double down requires doubling the original bet
 *
 * @param originalBet - Original bet amount (will be doubled)
 * @param balance - Current balance
 * @returns Validation result
 *
 * @example
 * ```ts
 * const result = validateDoubleBet(100, 1000);
 * console.log(result.valid); // true (needs 100 more in balance)
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
 * Calculate total bet amount across multiple hands
 *
 * @param hands - Array of hands with bet amounts
 * @returns Total bet amount
 *
 * @example
 * ```ts
 * const total = calculateHandsBet([
 *   { bet: 100, cards: [], status: 'playing', isDouble: false, isSplit: false },
 *   { bet: 100, cards: [], status: 'playing', isDouble: false, isSplit: false }
 * ]);
 * console.log(total); // 200
 * ```
 */
export function calculateHandsBet(hands: Hand[]): number {
  return hands.reduce((total, hand) => total + hand.bet, 0);
}

/**
 * Calculate required balance for an operation
 * Useful for checking if player can afford split, double, or insurance
 *
 * @param currentHandsBet - Total bet amount from current hands
 * @param additionalBet - Additional bet required for operation
 * @returns Total required balance
 *
 * @example
 * ```ts
 * const required = calculateRequiredBalance(200, 100); // 300
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
 * Deduct amount from balance (pure function)
 *
 * @param balance - Current balance
 * @param amount - Amount to deduct
 * @returns New balance
 *
 * @example
 * ```ts
 * const newBalance = deductFromBalance(1000, 100); // 900
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
 * Add amount to balance (pure function)
 *
 * @param balance - Current balance
 * @param amount - Amount to add
 * @returns New balance
 *
 * @example
 * ```ts
 * const newBalance = addToBalance(1000, 200); // 1200
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
