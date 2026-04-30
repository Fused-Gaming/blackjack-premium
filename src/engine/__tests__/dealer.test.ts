import { describe, it, expect } from 'vitest';
import { shouldDealerHit, playDealerHand } from '../dealer';
import type { Card, Rank, Suit } from '../../types';
import type { DealerRules } from '../dealer';

const createCard = (rank: string, suit: string = '♠'): Card => ({
  rank: rank as Rank,
  suit: suit as Suit,
  faceUp: true,
});

describe('Dealer AI Logic', () => {
  describe('shouldDealerHit', () => {
    const standardRules: DealerRules = { hitOnSoft17: false };
    const casinoRules: DealerRules = { hitOnSoft17: true };

    describe('with standard rules (stand on soft 17)', () => {
      it('should hit on 16 or less', () => {
        expect(shouldDealerHit([createCard('K'), createCard('6')], standardRules)).toBe(true);
        expect(shouldDealerHit([createCard('9'), createCard('7')], standardRules)).toBe(true);
        expect(shouldDealerHit([createCard('5'), createCard('5'), createCard('5')], standardRules)).toBe(true);
      });

      it('should stand on hard 17 or more', () => {
        expect(shouldDealerHit([createCard('K'), createCard('7')], standardRules)).toBe(false);
        expect(shouldDealerHit([createCard('10'), createCard('10')], standardRules)).toBe(false);
        expect(shouldDealerHit([createCard('9'), createCard('9')], standardRules)).toBe(false);
      });

      it('should stand on soft 17 (A-6)', () => {
        expect(shouldDealerHit([createCard('A'), createCard('6')], standardRules)).toBe(false);
      });

      it('should stand on soft 18 or higher', () => {
        expect(shouldDealerHit([createCard('A'), createCard('7')], standardRules)).toBe(false);
        expect(shouldDealerHit([createCard('A'), createCard('8')], standardRules)).toBe(false);
      });

      it('should hit on soft hands less than 17', () => {
        expect(shouldDealerHit([createCard('A'), createCard('5')], standardRules)).toBe(true);
        expect(shouldDealerHit([createCard('A'), createCard('4')], standardRules)).toBe(true);
      });

      it('should stand when bust', () => {
        expect(shouldDealerHit([createCard('K'), createCard('Q'), createCard('5')], standardRules)).toBe(false);
      });
    });

    describe('with casino rules (hit on soft 17)', () => {
      it('should hit on 16 or less', () => {
        expect(shouldDealerHit([createCard('K'), createCard('6')], casinoRules)).toBe(true);
        expect(shouldDealerHit([createCard('9'), createCard('7')], casinoRules)).toBe(true);
      });

      it('should stand on hard 17 or more', () => {
        expect(shouldDealerHit([createCard('K'), createCard('7')], casinoRules)).toBe(false);
        expect(shouldDealerHit([createCard('10'), createCard('10')], casinoRules)).toBe(false);
      });

      it('should HIT on soft 17 (A-6)', () => {
        expect(shouldDealerHit([createCard('A'), createCard('6')], casinoRules)).toBe(true);
      });

      it('should stand on soft 18 or higher', () => {
        expect(shouldDealerHit([createCard('A'), createCard('7')], casinoRules)).toBe(false);
        expect(shouldDealerHit([createCard('A'), createCard('8')], casinoRules)).toBe(false);
      });

      it('should stand when bust', () => {
        expect(shouldDealerHit([createCard('K'), createCard('Q'), createCard('5')], casinoRules)).toBe(false);
      });
    });

    describe('edge cases', () => {
      it('should handle empty hand', () => {
        expect(shouldDealerHit([], standardRules)).toBe(true);
      });

      it('should handle single card', () => {
        expect(shouldDealerHit([createCard('5')], standardRules)).toBe(true);
        expect(shouldDealerHit([createCard('K')], standardRules)).toBe(true);
      });

      it('should handle multiple aces', () => {
        // A-A-5 = 17 (soft)
        expect(shouldDealerHit([createCard('A'), createCard('A'), createCard('5')], standardRules)).toBe(false);
        // A-A-5 = 17 (soft) with hit on soft 17
        expect(shouldDealerHit([createCard('A'), createCard('A'), createCard('5')], casinoRules)).toBe(true);
      });

      it('should handle blackjack (should stand)', () => {
        expect(shouldDealerHit([createCard('A'), createCard('K')], standardRules)).toBe(false);
        expect(shouldDealerHit([createCard('A'), createCard('K')], casinoRules)).toBe(false);
      });
    });
  });

  describe('playDealerHand', () => {
    const standardRules: DealerRules = { hitOnSoft17: false };
    const casinoRules: DealerRules = { hitOnSoft17: true };

    describe('automated play sequence', () => {
      it('should play out dealer hand until stand', () => {
        const initialCards = [createCard('K'), createCard('6')]; // 16
        const availableCards = [
          createCard('5'), // will make 21
        ];

        const result = playDealerHand(initialCards, availableCards, standardRules);

        expect(result.finalCards).toHaveLength(3);
        expect(result.finalCards[2].rank).toBe('5');
        expect(result.decisions).toHaveLength(2); // hit decision, then stand decision
        expect(result.decisions[0].action).toBe('hit');
        expect(result.decisions[1].action).toBe('stand');
      });

      it('should stand on 17 immediately', () => {
        const initialCards = [createCard('K'), createCard('7')]; // 17
        const availableCards = [createCard('5')];

        const result = playDealerHand(initialCards, availableCards, standardRules);

        expect(result.finalCards).toHaveLength(2);
        expect(result.decisions).toHaveLength(1);
        expect(result.decisions[0].action).toBe('stand');
      });

      it('should hit until bust', () => {
        const initialCards = [createCard('K'), createCard('6')]; // 16
        const availableCards = [
          createCard('K'), // 26 - bust
        ];

        const result = playDealerHand(initialCards, availableCards, standardRules);

        expect(result.finalCards).toHaveLength(3);
        expect(result.decisions).toHaveLength(2);
        expect(result.decisions[0].action).toBe('hit');
        expect(result.decisions[1].action).toBe('stand');
        expect(result.decisions[1].reason).toContain('bust');
      });

      it('should handle multiple hits', () => {
        const initialCards = [createCard('2'), createCard('3')]; // 5
        const availableCards = [
          createCard('4'), // 9
          createCard('5'), // 14
          createCard('6'), // 20
        ];

        const result = playDealerHand(initialCards, availableCards, standardRules);

        expect(result.finalCards).toHaveLength(5);
        expect(result.decisions).toHaveLength(4); // 3 hits + 1 stand
        expect(result.decisions.filter(d => d.action === 'hit')).toHaveLength(3);
        expect(result.decisions[3].action).toBe('stand');
      });
    });

    describe('soft 17 rule variations', () => {
      it('should stand on soft 17 with standard rules', () => {
        const initialCards = [createCard('A'), createCard('6')]; // soft 17
        const availableCards = [createCard('5')];

        const result = playDealerHand(initialCards, availableCards, standardRules);

        expect(result.finalCards).toHaveLength(2);
        expect(result.decisions).toHaveLength(1);
        expect(result.decisions[0].action).toBe('stand');
        expect(result.decisions[0].isSoft).toBe(true);
      });

      it('should hit on soft 17 with casino rules', () => {
        const initialCards = [createCard('A'), createCard('6')]; // soft 17
        const availableCards = [createCard('3')]; // makes 20

        const result = playDealerHand(initialCards, availableCards, casinoRules);

        expect(result.finalCards).toHaveLength(3);
        expect(result.decisions).toHaveLength(2);
        expect(result.decisions[0].action).toBe('hit');
        expect(result.decisions[0].isSoft).toBe(true);
        expect(result.decisions[1].action).toBe('stand');
      });
    });

    describe('decision logging', () => {
      it('should log all decisions with correct metadata', () => {
        const initialCards = [createCard('K'), createCard('6')]; // 16
        const availableCards = [createCard('5')]; // makes 21

        const result = playDealerHand(initialCards, availableCards, standardRules);

        // First decision: hit on 16
        expect(result.decisions[0]).toMatchObject({
          action: 'hit',
          handValue: 16,
          isSoft: false,
        });
        expect(result.decisions[0].reason).toBeTruthy();

        // Second decision: stand on 21
        expect(result.decisions[1]).toMatchObject({
          action: 'stand',
          handValue: 21,
          isSoft: false,
        });
        expect(result.decisions[1].reason).toBeTruthy();
      });

      it('should indicate soft hands in decision log', () => {
        const initialCards = [createCard('A'), createCard('5')]; // soft 16
        const availableCards = [
          createCard('K'), // makes hard 16
          createCard('5'), // makes 21
        ];

        const result = playDealerHand(initialCards, availableCards, standardRules);

        expect(result.decisions[0].isSoft).toBe(true);
        expect(result.decisions[0].handValue).toBe(16);
      });

      it('should log reason for standing', () => {
        const initialCards = [createCard('K'), createCard('8')]; // 18

        const result = playDealerHand(initialCards, [], standardRules);

        expect(result.decisions[0].reason).toContain('17');
      });
    });

    describe('edge cases', () => {
      it('should handle blackjack (immediate stand)', () => {
        const initialCards = [createCard('A'), createCard('K')]; // 21

        const result = playDealerHand(initialCards, [], standardRules);

        expect(result.finalCards).toHaveLength(2);
        expect(result.decisions).toHaveLength(1);
        expect(result.decisions[0].action).toBe('stand');
      });

      it('should throw error if not enough cards to complete hand', () => {
        const initialCards = [createCard('2'), createCard('3')]; // 5
        const availableCards: Card[] = []; // no cards to draw

        expect(() => playDealerHand(initialCards, availableCards, standardRules)).toThrow();
      });

      it('should handle complex soft/hard transitions', () => {
        const initialCards = [createCard('A'), createCard('5')]; // soft 16
        const availableCards = [
          createCard('A'), // soft 17 - will stand with standard rules
        ];

        const result = playDealerHand(initialCards, availableCards, standardRules);

        // With standard rules (stand on soft 17), dealer should:
        // 1. Hit on soft 16
        // 2. Stand on soft 17
        expect(result.finalCards).toHaveLength(3);
        expect(result.decisions).toHaveLength(2);
        expect(result.decisions[0].isSoft).toBe(true);
        expect(result.decisions[0].action).toBe('hit');
        expect(result.decisions[1].isSoft).toBe(true);
        expect(result.decisions[1].action).toBe('stand');
      });
    });
  });
});
