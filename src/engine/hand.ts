import type { Card, Hand, HandValue } from '../types';

/**
 * Get the numeric value of a card rank
 */
export function getCardValue(rank: string): number {
  if (rank === 'A') return 11;
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  return parseInt(rank, 10);
}

/**
 * Evaluate a hand and return its value, considering soft/hard aces
 */
export function evaluateHand(cards: Card[]): HandValue {
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
  const isBlackjack = cards.length === 2 && value === 21;
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
 */
export function canSplit(hand: Hand): boolean {
  if (hand.cards.length !== 2) return false;
  if (hand.isSplit) return false; // Only allow one split per original hand

  return hand.cards[0].rank === hand.cards[1].rank;
}

/**
 * Check if a hand can double down
 */
export function canDouble(hand: Hand): boolean {
  return hand.cards.length === 2 && !hand.isDouble && !hand.isSplit;
}

/**
 * Check if dealer should hit (hits on 16 or less, stands on 17+)
 */
export function shouldDealerHit(cards: Card[]): boolean {
  const handValue = evaluateHand(cards);
  return handValue.value < 17;
}

/**
 * Create a new empty hand
 */
export function createHand(bet: number = 0): Hand {
  return {
    cards: [],
    bet,
    status: 'playing',
    isDouble: false,
    isSplit: false,
  };
}

/**
 * Add a card to a hand
 */
export function addCardToHand(hand: Hand, card: Card): Hand {
  const newHand = {
    ...hand,
    cards: [...hand.cards, card],
  };

  // Auto-update status if bust
  const handValue = evaluateHand(newHand.cards);
  if (handValue.isBust) {
    newHand.status = 'bust';
  } else if (handValue.isBlackjack && newHand.cards.length === 2) {
    newHand.status = 'blackjack';
  }

  return newHand;
}

/**
 * Split a hand into two hands
 */
export function splitHand(hand: Hand): { hand1: Hand; hand2: Hand } {
  if (!canSplit(hand)) {
    throw new Error('Cannot split this hand');
  }

  const [card1, card2] = hand.cards;

  return {
    hand1: {
      cards: [card1],
      bet: hand.bet,
      status: 'playing',
      isDouble: false,
      isSplit: true,
    },
    hand2: {
      cards: [card2],
      bet: hand.bet,
      status: 'playing',
      isDouble: false,
      isSplit: true,
    },
  };
}

/**
 * Double down a hand (double bet, will receive exactly one more card)
 */
export function doubleDownHand(hand: Hand): Hand {
  if (!canDouble(hand)) {
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
 *
 * @param playerCards - Player's cards (Card[]) or full Hand object
 * @param dealerCards - Dealer's cards
 * @returns Outcome of the comparison
 *
 * @example
 * // Using Card arrays
 * const result = compareHands(playerCards, dealerCards);
 *
 * @example
 * // Using Hand object
 * const result = compareHands(playerHand.cards, dealerCards);
 */
export function compareHands(
  playerCards: Card[] | Hand,
  dealerCards: Card[]
): 'win' | 'loss' | 'push' | 'blackjack' {
  // Handle both Card[] and Hand inputs
  const playerCardArray = Array.isArray(playerCards) ? playerCards : playerCards.cards;
  const playerValue = evaluateHand(playerCardArray);
  const dealerValue = evaluateHand(dealerCards);

  // Player bust always loses
  if (playerValue.isBust) {
    return 'loss';
  }

  // Dealer bust, player wins
  if (dealerValue.isBust) {
    return 'win';
  }

  // Player blackjack
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
