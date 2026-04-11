import { describe, it, expect } from 'vitest';
import { validateDoubleDown } from '../payouts';
import type { Hand } from '../../types';

describe('Betting Validation', () => {
  describe('validateDoubleDown', () => {
    it('should allow double down when balance is sufficient', () => {
      const hand: Hand = {
        cards: [],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 100);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should allow double down when balance exactly equals bet amount', () => {
      const hand: Hand = {
        cards: [],
        bet: 50,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 50);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject double down when balance is insufficient', () => {
      const hand: Hand = {
        cards: [],
        bet: 100,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 50);

      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Insufficient balance');
    });

    it('should reject double down when balance is zero', () => {
      const hand: Hand = {
        cards: [],
        bet: 10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 0);

      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle large bet amounts', () => {
      const hand: Hand = {
        cards: [],
        bet: 1000,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 5000);

      expect(result.valid).toBe(true);
    });

    it('should reject when bet amount is invalid (Infinity)', () => {
      const hand: Hand = {
        cards: [],
        bet: Infinity,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject when bet amount is NaN', () => {
      const hand: Hand = {
        cards: [],
        bet: NaN,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should reject when bet amount is negative', () => {
      const hand: Hand = {
        cards: [],
        bet: -10,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 1000);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid bet amount');
    });

    it('should handle fractional bet amounts', () => {
      const hand: Hand = {
        cards: [],
        bet: 7.5,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 10);

      expect(result.valid).toBe(true);
    });

    it('should provide descriptive error message with amounts', () => {
      const hand: Hand = {
        cards: [],
        bet: 100,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 75);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('100');
      expect(result.error).toContain('75');
    });

    it('should handle edge case of 1 cent bet', () => {
      const hand: Hand = {
        cards: [],
        bet: 0.01,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 0.01);

      expect(result.valid).toBe(true);
    });

    it('should validate balance one cent short', () => {
      const hand: Hand = {
        cards: [],
        bet: 100,
        status: 'playing',
        isDouble: false,
        isSplit: false,
        splitFromAces: false,
        canHit: true,
      };

      const result = validateDoubleDown(hand, 99.99);

      expect(result.valid).toBe(false);
    });
  });
});
