import type { Card, Hand } from '../types';
import { evaluateHand } from './hand';

/**
 * Determines if insurance should be offered to the player.
 * Insurance is only offered when the dealer's face-up card is an Ace.
 *
 * @param dealerUpCard - The dealer's visible card
 * @returns True if insurance should be offered, false otherwise
 *
 * @example
 * ```typescript
 * const dealerCard = { rank: 'A', suit: '♠', faceUp: true };
 * const shouldOffer = shouldOfferInsurance(dealerCard); // true
 * ```
 */
export function shouldOfferInsurance(dealerUpCard: Card): boolean {
  // Insurance is only offered when dealer shows Ace and card is face up
  return dealerUpCard.faceUp && dealerUpCard.rank === 'A';
}

/**
 * Calculates the maximum allowed insurance bet.
 * The maximum insurance bet is always half of the original hand bet.
 *
 * @param hand - The player's hand
 * @returns The maximum insurance bet amount (half of the original bet)
 *
 * @example
 * ```typescript
 * const hand = { bet: 100, cards: [], status: 'playing', isDouble: false, isSplit: false };
 * const maxBet = getMaxInsuranceBet(hand); // 50
 * ```
 */
export function getMaxInsuranceBet(hand: Hand): number {
  return hand.bet / 2;
}

/**
 * Validates an insurance bet amount against game rules and player balance.
 *
 * Rules:
 * - Insurance bet must be greater than 0
 * - Insurance bet cannot exceed half of the original bet
 * - Player must have sufficient balance
 * - Insurance bet must be a valid finite number
 *
 * @param amount - The insurance bet amount to validate
 * @param hand - The player's hand
 * @param balance - The player's current balance
 * @returns Validation result with valid flag and optional error message
 *
 * @example
 * ```typescript
 * const hand = { bet: 100, cards: [], status: 'playing', isDouble: false, isSplit: false };
 * const result = validateInsuranceBet(50, hand, 1000);
 * // { valid: true }
 *
 * const invalidResult = validateInsuranceBet(60, hand, 1000);
 * // { valid: false, error: 'Insurance bet cannot exceed half of original bet' }
 * ```
 */
export function validateInsuranceBet(
  amount: number,
  hand: Hand,
  balance: number
): { valid: boolean; error?: string } {
  // Check for invalid number values
  if (!Number.isFinite(amount)) {
    return { valid: false, error: 'Insurance bet must be a valid number' };
  }

  // Check for zero or negative amount
  if (amount <= 0) {
    return { valid: false, error: 'Insurance bet must be greater than 0' };
  }

  // Check against maximum (half of original bet)
  const maxBet = getMaxInsuranceBet(hand);
  if (amount > maxBet) {
    return { valid: false, error: `Insurance bet cannot exceed half of original bet (${maxBet})` };
  }

  // Check balance
  if (amount > balance) {
    return { valid: false, error: 'Insufficient balance for insurance bet' };
  }

  return { valid: true };
}

/**
 * Calculates the insurance payout based on dealer's final hand.
 *
 * Insurance pays 2:1 if the dealer has blackjack (Ace + 10-value card in 2 cards).
 * Returns 0 if dealer does not have blackjack.
 * The payout includes the original insurance bet plus the winnings (3x total).
 *
 * @param insuranceBet - The amount of the insurance bet
 * @param dealerCards - The dealer's complete hand
 * @returns The total payout amount (0 if dealer doesn't have blackjack, 3x bet if they do)
 *
 * @example
 * ```typescript
 * const dealerCards = [
 *   { rank: 'A', suit: '♠', faceUp: true },
 *   { rank: 'K', suit: '♥', faceUp: true }
 * ];
 * const payout = calculateInsurancePayout(50, dealerCards); // 150 (2:1 + original bet)
 *
 * const noBjCards = [
 *   { rank: 'A', suit: '♠', faceUp: true },
 *   { rank: '9', suit: '♥', faceUp: true }
 * ];
 * const noPayout = calculateInsurancePayout(50, noBjCards); // 0
 * ```
 */
export function calculateInsurancePayout(insuranceBet: number, dealerCards: Card[]): number {
  const handValue = evaluateHand(dealerCards);

  // Insurance only pays if dealer has blackjack
  // Blackjack is only with exactly 2 cards
  if (handValue.isBlackjack && dealerCards.length === 2) {
    // Insurance pays 2:1 plus original bet back
    // This means total payout is 3x the insurance bet
    return insuranceBet * 3;
  }

  return 0;
}

/**
 * Determines if a player can place an insurance bet.
 *
 * Checks all conditions required for placing insurance:
 * - Dealer must show an Ace
 * - Player must have a bet placed
 * - Player must have sufficient balance for at least minimum insurance
 *
 * @param dealerUpCard - The dealer's visible card
 * @param hand - The player's hand
 * @param balance - The player's current balance
 * @returns True if player can place insurance, false otherwise
 *
 * @example
 * ```typescript
 * const dealerCard = { rank: 'A', suit: '♠', faceUp: true };
 * const hand = { bet: 100, cards: [], status: 'playing', isDouble: false, isSplit: false };
 * const canPlace = canPlaceInsurance(dealerCard, hand, 1000); // true
 * ```
 */
export function canPlaceInsurance(dealerUpCard: Card, hand: Hand, balance: number): boolean {
  // Must offer insurance (dealer shows Ace)
  if (!shouldOfferInsurance(dealerUpCard)) {
    return false;
  }

  // Hand must have a bet
  if (hand.bet <= 0) {
    return false;
  }

  // Must have enough balance for at least the maximum insurance bet
  const maxInsuranceBet = getMaxInsuranceBet(hand);
  if (balance < maxInsuranceBet) {
    return false;
  }

  return true;
}
