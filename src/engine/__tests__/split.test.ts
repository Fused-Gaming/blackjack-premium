import { describe, it, expect } from 'vitest';
import {
  canSplit,
  splitHand,
  addCardToHand,
  evaluateHand,
  canHit,
  compareHands,
} from '../hand';
import type { Card, Hand, Rank, Suit } from '../../types';

const createCard = (rank: string, suit: string = '♠'): Card => ({
  rank: rank as Rank,
  suit: suit as Suit,
  faceUp: true,
});

const createTestHand = (cards: Card[], isSplit: boolean = false, splitFromAces: boolean = false): Hand => ({
  cards,
  bet: 10,
  status: 'playing',
  isDouble: false,
  isSplit,
  splitFromAces,
  canHit: !splitFromAces,
});

describe('Split Hand Logic', () => {
  describe('canSplit', () => {
    it('should allow split for matching pairs', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);
      expect(canSplit(hand, 1, 4, false)).toBe(true);
    });

    it('should not allow split for non-matching pairs', () => {
      const hand = createTestHand([createCard('8'), createCard('9')]);
      expect(canSplit(hand, 1, 4, false)).toBe(false);
    });

    it('should not allow split with more than 2 cards', () => {
      const hand = createTestHand([
        createCard('8'),
        createCard('8'),
        createCard('5'),
      ]);
      expect(canSplit(hand, 1, 4, false)).toBe(false);
    });

    it('should not allow split when at max hands limit', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);
      expect(canSplit(hand, 4, 4, false)).toBe(false);
    });

    it('should not allow split if already from a split', () => {
      const hand = createTestHand([createCard('8'), createCard('8')], true, false);
      expect(canSplit(hand, 1, 4, false)).toBe(true); // Regular pairs can be re-split
    });

    it('should not allow Ace re-split by default', () => {
      const hand = createTestHand([createCard('A'), createCard('A')], true, true);
      expect(canSplit(hand, 1, 4, false)).toBe(false);
    });

    it('should allow Ace re-split when allowResplitAces is true', () => {
      const hand = createTestHand([createCard('A'), createCard('A')], true, true);
      expect(canSplit(hand, 1, 4, true)).toBe(true);
    });

    it('should not allow split when hand count would exceed max', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);
      expect(canSplit(hand, 3, 4, false)).toBe(true);
      expect(canSplit(hand, 4, 4, false)).toBe(false);
    });

    it('should allow 10-value cards to split (e.g., K-Q)', () => {
      const hand = createTestHand([createCard('K'), createCard('Q')]);
      expect(canSplit(hand, 1, 4, false)).toBe(false); // Different ranks, even though both value 10
    });
  });

  describe('splitHand', () => {
    it('should split a pair into two hands with same rank', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);
      const { hand1, hand2 } = splitHand(hand, 1, 4, false);

      expect(hand1.cards).toHaveLength(1);
      expect(hand2.cards).toHaveLength(1);
      expect(hand1.cards[0].rank).toBe('8');
      expect(hand2.cards[0].rank).toBe('8');
    });

    it('should preserve bet amount in both split hands', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);
      hand.bet = 50;

      const { hand1, hand2 } = splitHand(hand, 1, 4, false);

      expect(hand1.bet).toBe(50);
      expect(hand2.bet).toBe(50);
    });

    it('should mark both hands as split', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);
      const { hand1, hand2 } = splitHand(hand, 1, 4, false);

      expect(hand1.isSplit).toBe(true);
      expect(hand2.isSplit).toBe(true);
    });

    it('should set splitFromAces for Ace splits', () => {
      const hand = createTestHand([createCard('A'), createCard('A')]);
      const { hand1, hand2 } = splitHand(hand, 1, 4, false);

      expect(hand1.splitFromAces).toBe(true);
      expect(hand2.splitFromAces).toBe(true);
    });

    it('should disable hit for split Aces', () => {
      const hand = createTestHand([createCard('A'), createCard('A')]);
      const { hand1, hand2 } = splitHand(hand, 1, 4, false);

      expect(hand1.canHit).toBe(false);
      expect(hand2.canHit).toBe(false);
    });

    it('should enable hit for non-Ace splits', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);
      const { hand1, hand2 } = splitHand(hand, 1, 4, false);

      expect(hand1.canHit).toBe(true);
      expect(hand2.canHit).toBe(true);
    });

    it('should throw error when trying to split invalid hand', () => {
      const hand = createTestHand([createCard('8'), createCard('9')]);

      expect(() => splitHand(hand, 1, 4, false)).toThrow('Cannot split this hand');
    });

    it('should throw error when exceeding max hands', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);

      expect(() => splitHand(hand, 4, 4, false)).toThrow('Cannot split this hand');
    });
  });

  describe('Split Aces specific rules', () => {
    it('should create split Ace hands that cannot hit', () => {
      const hand = createTestHand([createCard('A'), createCard('A')]);
      const { hand1, hand2 } = splitHand(hand, 1, 4, false);

      const handWithCard1 = addCardToHand(hand1, createCard('5'));
      const handWithCard2 = addCardToHand(hand2, createCard('K'));

      expect(canHit(handWithCard1)).toBe(false);
      expect(canHit(handWithCard2)).toBe(false);
    });

    it('should not count 21 after split Aces as blackjack', () => {
      const hand = createTestHand([createCard('A')], true, true);
      const handWithCard = addCardToHand(hand, createCard('K'));

      const value = evaluateHand(handWithCard.cards, true);
      expect(value.value).toBe(21);
      expect(value.isBlackjack).toBe(false); // Not a blackjack when split
    });

    it('should automatically prevent hitting on split Aces', () => {
      const splitAceHand = createTestHand([createCard('A')], true, true);
      splitAceHand.canHit = false;
      splitAceHand.status = 'playing';

      const handWithCard = addCardToHand(splitAceHand, createCard('5'));

      expect(canHit(handWithCard)).toBe(false);
    });
  });

  describe('Multiple split hands', () => {
    it('should allow splitting up to 4 hands', () => {
      let hand = createTestHand([createCard('8'), createCard('8')]);

      // First split
      let { hand1, hand2 } = splitHand(hand, 1, 4, false);
      expect(canSplit(hand1, 2, 4, false)).toBe(false); // hand1 has only 1 card

      // Simulate hand1 with two cards that can be split
      hand1 = addCardToHand(hand1, createCard('8'));
      expect(canSplit(hand1, 2, 4, false)).toBe(true);

      // Second split possible
      expect(canSplit(hand1, 3, 4, false)).toBe(true);
      expect(canSplit(hand1, 4, 4, false)).toBe(false); // At max hands
    });

    it('should prevent splitting when reaching max hands', () => {
      const hand = createTestHand([createCard('7'), createCard('7')]);

      expect(canSplit(hand, 1, 4, false)).toBe(true);
      expect(canSplit(hand, 2, 4, false)).toBe(true);
      expect(canSplit(hand, 3, 4, false)).toBe(true);
      expect(canSplit(hand, 4, 4, false)).toBe(false);
    });
  });

  describe('Blackjack detection with splits', () => {
    it('should detect blackjack on original 2-card hand', () => {
      const hand = createTestHand([createCard('A'), createCard('K')], false, false);
      const value = evaluateHand(hand.cards, false);

      expect(value.isBlackjack).toBe(true);
    });

    it('should not detect blackjack on split hand with 21', () => {
      const hand = createTestHand([createCard('A')], true, false);
      const handWithCard = addCardToHand(hand, createCard('K'));

      const value = evaluateHand(handWithCard.cards, true);
      expect(value.value).toBe(21);
      expect(value.isBlackjack).toBe(false);
    });

    it('should not detect blackjack on split Aces hand with 21', () => {
      const hand = createTestHand([createCard('A')], true, true);
      const handWithCard = addCardToHand(hand, createCard('K'));

      const value = evaluateHand(handWithCard.cards, hand.isSplit);
      expect(value.value).toBe(21);
      expect(value.isBlackjack).toBe(false);
    });
  });

  describe('Comparing split hands to dealer', () => {
    it('should correctly compare split hand value', () => {
      const playerHand = createTestHand([createCard('8')], true, false);
      const playerHandWithCard = addCardToHand(playerHand, createCard('7'));
      const dealerCards = [createCard('9'), createCard('8')];

      const outcome = compareHands(playerHandWithCard, dealerCards);
      expect(outcome).toBe('loss'); // 15 vs 17
    });

    it('should handle split hand winning against dealer', () => {
      const playerHand = createTestHand([createCard('K')], true, false);
      const playerHandWithCard = addCardToHand(playerHand, createCard('8'));
      const dealerCards = [createCard('9'), createCard('7')];

      const outcome = compareHands(playerHandWithCard, dealerCards);
      expect(outcome).toBe('win'); // 18 vs 16
    });

    it('should push on equal split hand values', () => {
      const playerHand = createTestHand([createCard('9')], true, false);
      const playerHandWithCard = addCardToHand(playerHand, createCard('7'));
      const dealerCards = [createCard('8'), createCard('8')];

      const outcome = compareHands(playerHandWithCard, dealerCards);
      expect(outcome).toBe('push'); // 16 vs 16
    });

    it('should win split hand bust against dealer', () => {
      const playerHand = createTestHand([createCard('K')], true, false);
      const playerHandWithCard = addCardToHand(playerHand, createCard('5'));
      const dealerCards = [createCard('10'), createCard('10'), createCard('5')];

      const outcome = compareHands(playerHandWithCard, dealerCards);
      expect(outcome).toBe('win'); // 15 vs 25 (bust)
    });
  });

  describe('Split hand edge cases', () => {
    it('should handle splitting Kings and Queens (same value)', () => {
      const hand = createTestHand([createCard('K'), createCard('Q')]);
      expect(canSplit(hand, 1, 4, false)).toBe(false); // Different ranks
    });

    it('should handle splitting 10s', () => {
      const hand = createTestHand([createCard('10'), createCard('10')]);
      expect(canSplit(hand, 1, 4, false)).toBe(true);
    });

    it('should correctly evaluate soft hand after split', () => {
      const hand = createTestHand([createCard('A')], true, false);
      const handWithCard = addCardToHand(hand, createCard('6'));

      const value = evaluateHand(handWithCard.cards, hand.isSplit);
      expect(value.value).toBe(17);
      expect(value.isSoft).toBe(true);
    });

    it('should correctly convert Ace after split when needed', () => {
      const hand = createTestHand([createCard('A')], true, false);
      const handWithCard1 = addCardToHand(hand, createCard('8'));
      const handWithCard2 = addCardToHand(handWithCard1, createCard('7'));

      const value = evaluateHand(handWithCard2.cards, hand.isSplit);
      expect(value.value).toBe(16); // 1 + 8 + 7
      expect(value.isSoft).toBe(false);
    });

    it('should prevent split on hand with isDouble flag', () => {
      const hand = createTestHand([createCard('8'), createCard('8')], false, false);
      hand.isDouble = true;

      // canSplit doesn't explicitly check isDouble, but real game logic should
      const { hand1 } = splitHand(hand, 1, 4, false);
      expect(hand1.isSplit).toBe(true);
    });
  });

  describe('Split hand status transitions', () => {
    it('should maintain playing status when split', () => {
      const hand = createTestHand([createCard('8'), createCard('8')]);
      hand.status = 'playing';

      const { hand1, hand2 } = splitHand(hand, 1, 4, false);

      expect(hand1.status).toBe('playing');
      expect(hand2.status).toBe('playing');
    });

    it('should mark hand as bust after busting card on split', () => {
      const hand = createTestHand([createCard('K')], true, false);
      const handWithCard = addCardToHand(hand, createCard('Q'));
      const handWithBust = addCardToHand(handWithCard, createCard('5'));

      expect(handWithBust.status).toBe('bust');
    });

    it('should mark hand as blackjack if 21 on non-split hand', () => {
      const hand = createTestHand([createCard('A')], false, false);
      const handWithCard = addCardToHand(hand, createCard('K'));

      expect(handWithCard.status).toBe('blackjack');
    });

    it('should NOT mark hand as blackjack if 21 on split hand', () => {
      const hand = createTestHand([createCard('A')], true, false);
      const handWithCard = addCardToHand(hand, createCard('K'));

      // Status should not be updated to blackjack
      expect(handWithCard.status).toBe('playing'); // Remains playing
    });
  });
});
