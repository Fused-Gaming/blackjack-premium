import type { Card } from '../types';
import { evaluateHand } from './hand';

/**
 * Configuration rules for dealer behavior
 */
export interface DealerRules {
  /**
   * Whether dealer should hit on soft 17
   * - false: Stand on soft 17 (standard/player-friendly rule)
   * - true: Hit on soft 17 (house-favorable rule, common in many casinos)
   */
  hitOnSoft17: boolean;
}

/**
 * Represents a single decision made by the dealer AI
 * Used for debugging and game transparency
 */
export interface DealerDecision {
  /**
   * The action taken by the dealer
   */
  action: 'hit' | 'stand';

  /**
   * The hand value at the time of decision
   */
  handValue: number;

  /**
   * Whether the hand was soft (contains an Ace counted as 11)
   */
  isSoft: boolean;

  /**
   * Human-readable reason for the decision
   */
  reason: string;
}

/**
 * Result of dealer's automated play sequence
 */
export interface DealerPlayResult {
  /**
   * The final cards in the dealer's hand after playing
   */
  finalCards: Card[];

  /**
   * Log of all decisions made during play
   */
  decisions: DealerDecision[];
}

/**
 * Determine if the dealer should hit based on their current hand and rules
 *
 * @param cards - The dealer's current cards
 * @param rules - The dealer rules configuration
 * @returns true if dealer should hit, false if dealer should stand
 *
 * @example
 * ```ts
 * const cards = [{ rank: 'K', suit: '♠', faceUp: true }, { rank: '6', suit: '♥', faceUp: true }];
 * const rules = { hitOnSoft17: false };
 * shouldDealerHit(cards, rules); // true (16 < 17)
 * ```
 */
export function shouldDealerHit(cards: Card[], rules: DealerRules): boolean {
  // Handle empty hand (should always hit)
  if (cards.length === 0) {
    return true;
  }

  const handValue = evaluateHand(cards);

  // Always stand on bust
  if (handValue.isBust) {
    return false;
  }

  // Always stand on blackjack
  if (handValue.isBlackjack) {
    return false;
  }

  // Hit on anything less than 17
  if (handValue.value < 17) {
    return true;
  }

  // Stand on hard 17 or higher
  if (handValue.value >= 17 && !handValue.isSoft) {
    return false;
  }

  // Soft 17 - depends on rules
  if (handValue.value === 17 && handValue.isSoft) {
    return rules.hitOnSoft17;
  }

  // Soft 18+ - always stand
  if (handValue.value >= 18 && handValue.isSoft) {
    return false;
  }

  // Default: stand
  return false;
}

/**
 * Play out the dealer's hand automatically according to blackjack rules
 *
 * The dealer will:
 * 1. Hit if hand value is less than 17
 * 2. Hit or stand on soft 17 based on rules
 * 3. Stand on hard 17 or higher
 * 4. Stand when bust
 *
 * @param initialCards - The dealer's starting cards
 * @param availableCards - Cards available to draw from (typically the deck)
 * @param rules - The dealer rules configuration
 * @returns Result containing final cards and decision log
 * @throws Error if not enough cards available to complete the hand
 *
 * @example
 * ```ts
 * const initialCards = [
 *   { rank: 'K', suit: '♠', faceUp: true },
 *   { rank: '6', suit: '♥', faceUp: true }
 * ];
 * const deck = [...]; // remaining cards
 * const rules = { hitOnSoft17: false };
 *
 * const result = playDealerHand(initialCards, deck, rules);
 * console.log(result.finalCards); // Dealer's final hand
 * console.log(result.decisions);  // All decisions made
 * ```
 */
export function playDealerHand(
  initialCards: Card[],
  availableCards: Card[],
  rules: DealerRules
): DealerPlayResult {
  const decisions: DealerDecision[] = [];
  let currentCards = [...initialCards];
  let cardIndex = 0;

  // Play until dealer must stand
  while (shouldDealerHit(currentCards, rules)) {
    const handValue = evaluateHand(currentCards);

    // Log the hit decision
    decisions.push({
      action: 'hit',
      handValue: handValue.value,
      isSoft: handValue.isSoft,
      reason: `Hand value ${handValue.value}${handValue.isSoft ? ' (soft)' : ''} is less than ${
        handValue.isSoft && handValue.value === 17 && rules.hitOnSoft17 ? '18 (hitting on soft 17)' : '17'
      }`,
    });

    // Check if we have cards available
    if (cardIndex >= availableCards.length) {
      throw new Error(
        `Not enough cards available to complete dealer hand. Needed at least ${cardIndex + 1} cards, but only ${availableCards.length} available.`
      );
    }

    // Draw the next card
    const newCard = availableCards[cardIndex];
    currentCards = [...currentCards, newCard];
    cardIndex++;
  }

  // Log the final stand decision
  const finalHandValue = evaluateHand(currentCards);
  decisions.push({
    action: 'stand',
    handValue: finalHandValue.value,
    isSoft: finalHandValue.isSoft,
    reason: finalHandValue.isBust
      ? `Hand is bust (${finalHandValue.value})`
      : `Hand value ${finalHandValue.value}${finalHandValue.isSoft ? ' (soft)' : ''} is 17 or higher`,
  });

  return {
    finalCards: currentCards,
    decisions,
  };
}
