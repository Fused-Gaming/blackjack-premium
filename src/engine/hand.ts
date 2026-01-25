import type { Card, Hand, HandValue } from '../types';

/**
 * Get the numeric value of a card rank
 * @param rank - The card rank
 * @returns The numeric value of the card
 */
export function getCardValue(rank: string): number {
  if (rank === 'A') return 11;
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  return parseInt(rank, 10);
}

/**
 * Evaluate a hand and return its value, considering soft/hard aces
 * @param cards - Array of cards in the hand
 * @param isSplitHand - Whether this hand came from a split (affects blackjack detection)
 * @returns HandValue object containing value, soft/hard status, blackjack, and bust status
 */
export function evaluateHand(cards: Card[], isSplitHand: boolean = false): HandValue {
  let value = 0;
  let aces = 0;

  // Calculate initial value
  for (const card of cards) {
    const cardValue = getCardValue(card.rank);
    value += cardValue;
    if (card.rank === 'A') {
      aces++;
    }
  }

  // Adjust for aces (convert from 11 to 1 if needed)
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  const isSoft = aces > 0; // Has an ace counted as 11
  // Blackjack only on original 2-card hands, not after splits
  const isBlackjack = cards.length === 2 && value === 21 && !isSplitHand;
  const isBust = value > 21;

  return {
    value,
    isSoft,
    isBlackjack,
    isBust,
  };
}

/**
 * Check if a hand can be split (pair of same rank)
 * @param hand - The hand to check
 * @param currentHandCount - Current number of hands (to enforce max limit)
 * @param maxHands - Maximum number of hands allowed (default: 4)
 * @param allowResplitAces - Whether Aces can be re-split (default: false)
 * @returns True if the hand can be split
 */
export function canSplit(
  hand: Hand,
  currentHandCount: number = 1,
  maxHands: number = 4,
  allowResplitAces: boolean = false
): boolean {
  // Must have exactly 2 cards
  if (hand.cards.length !== 2) return false;

  // Cards must be the same rank
  if (hand.cards[0].rank !== hand.cards[1].rank) return false;

  // Cannot exceed max hands
  if (currentHandCount >= maxHands) return false;

  // Split Aces typically cannot be re-split
  if (hand.splitFromAces && !allowResplitAces) return false;

  // Cannot split Aces that were already split (unless house rules allow)
  if (hand.isSplit && hand.cards[0].rank === 'A' && !allowResplitAces) return false;

  return true;
}

/**
 * Check if a hand can double down
 * @param hand - The hand to check
 * @param allowDoubleAfterSplit - Whether doubling is allowed after split (default: true)
 * @returns True if the hand can be doubled down
 */
export function canDouble(hand: Hand, allowDoubleAfterSplit: boolean = true): boolean {
  if (hand.cards.length !== 2) return false;
  if (hand.isDouble) return false;
  if (hand.isSplit && !allowDoubleAfterSplit) return false;

  return true;
}

/**
 * Check if a hand can hit (receive another card)
 * @param hand - The hand to check
 * @returns True if the hand can hit
 */
export function canHit(hand: Hand): boolean {
  if (hand.status !== 'playing') return false;
  if (!hand.canHit) return false; // Split Aces cannot hit
  return true;
}

/**
 * Check if dealer should hit (hits on 16 or less, stands on 17+)
 * @param cards - The dealer's cards
 * @returns True if the dealer should hit
 */
export function shouldDealerHit(cards: Card[]): boolean {
  const handValue = evaluateHand(cards, false);
  return handValue.value < 17;
}

/**
 * Create a new empty hand
 * @param bet - Initial bet amount (default: 0)
 * @returns A new Hand object
 */
export function createHand(bet: number = 0): Hand {
  return {
    cards: [],
    bet,
    status: 'playing',
    isDouble: false,
    isSplit: false,
    splitFromAces: false,
    canHit: true,
  };
}

/**
 * Add a card to a hand
 * @param hand - The hand to add the card to
 * @param card - The card to add
 * @returns A new Hand object with the card added
 */
export function addCardToHand(hand: Hand, card: Card): Hand {
  const newHand = {
    ...hand,
    cards: [...hand.cards, card],
  };

  // Auto-update status if bust or blackjack
  const handValue = evaluateHand(newHand.cards, newHand.isSplit);
  if (handValue.isBust) {
    newHand.status = 'bust';
  } else if (handValue.isBlackjack && newHand.cards.length === 2) {
    newHand.status = 'blackjack';
  }

  return newHand;
}

/**
 * Split a hand into two hands
 * @param hand - The hand to split
 * @param currentHandCount - Current number of hands (for validation)
 * @param maxHands - Maximum allowed hands (default: 4)
 * @param allowResplitAces - Whether Aces can be re-split (default: false)
 * @returns Object containing the two new hands
 */
export function splitHand(
  hand: Hand,
  currentHandCount: number = 1,
  maxHands: number = 4,
  allowResplitAces: boolean = false
): { hand1: Hand; hand2: Hand } {
  if (!canSplit(hand, currentHandCount, maxHands, allowResplitAces)) {
    throw new Error('Cannot split this hand');
  }

  const [card1, card2] = hand.cards;
  const isSplittingAces = card1.rank === 'A';

  return {
    hand1: {
      cards: [card1],
      bet: hand.bet,
      status: 'playing',
      isDouble: false,
      isSplit: true,
      splitFromAces: isSplittingAces,
      canHit: !isSplittingAces, // Split Aces can only receive one card
    },
    hand2: {
      cards: [card2],
      bet: hand.bet,
      status: 'playing',
      isDouble: false,
      isSplit: true,
      splitFromAces: isSplittingAces,
      canHit: !isSplittingAces, // Split Aces can only receive one card
    },
  };
}

/**
 * Double down a hand (double bet, will receive exactly one more card)
 * @param hand - The hand to double down
 * @param allowDoubleAfterSplit - Whether doubling is allowed after split (default: true)
 * @returns A new Hand object with doubled bet
 */
export function doubleDownHand(hand: Hand, allowDoubleAfterSplit: boolean = true): Hand {
  if (!canDouble(hand, allowDoubleAfterSplit)) {
    throw new Error('Cannot double down this hand');
  }

  return {
    ...hand,
    bet: hand.bet * 2,
    isDouble: true,
  };
}

/**
 * Compare player hand to dealer hand and determine outcome
 * @param playerHand - The player's hand
 * @param dealerCards - The dealer's cards
 * @returns The outcome of the comparison
 */
export function compareHands(
  playerCards: Card[] | Hand,
  dealerCards: Card[]
): 'win' | 'loss' | 'push' | 'blackjack' {
  const playerValue = evaluateHand(playerHand.cards, playerHand.isSplit);
  const dealerValue = evaluateHand(dealerCards, false); // Dealer never splits

  // Player bust always loses
  if (playerValue.isBust) {
    return 'loss';
  }

  // Dealer bust, player wins
  if (dealerValue.isBust) {
    return 'win';
  }

  // Player blackjack (only possible on non-split hands)
  if (playerValue.isBlackjack) {
    if (dealerValue.isBlackjack) {
      return 'push';
    }
    return 'blackjack';
  }

  // Dealer blackjack, player doesn't have blackjack
  if (dealerValue.isBlackjack) {
    return 'loss';
  }

  // Compare values
  if (playerValue.value > dealerValue.value) {
    return 'win';
  } else if (playerValue.value < dealerValue.value) {
    return 'loss';
  } else {
    return 'push';
  }
}
