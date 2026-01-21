import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAPI } from './mockApi';
import type { GameResult } from '../types';

describe('Mock API Integration Tests', () => {
  let api: ReturnType<typeof createMockAPI>;

  beforeEach(() => {
    api = createMockAPI(0); // No network delay for tests
  });

  describe('Session Management', () => {
    it('should create a new session', async () => {
      const response = await api.createSession('player1', 5000);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data?.playerId).toBe('player1');
      expect(response.data?.balance).toBe(5000);
      expect(response.data?.sessionId).toMatch(/^session_/);
    });

    it('should retrieve existing session', async () => {
      const createResponse = await api.createSession('player1');
      const sessionId = createResponse.data!.sessionId;

      const getResponse = await api.getSession(sessionId);

      expect(getResponse.success).toBe(true);
      expect(getResponse.data?.sessionId).toBe(sessionId);
    });

    it('should return error for non-existent session', async () => {
      const response = await api.getSession('invalid_session');

      expect(response.success).toBe(false);
      expect(response.error).toBe('Session not found');
    });
  });

  describe('Betting Operations', () => {
    it('should place valid bet', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      const betResponse = await api.placeBet(sessionId, 100);

      expect(betResponse.success).toBe(true);
      expect(betResponse.data?.newBalance).toBe(900);
    });

    it('should reject bet exceeding balance', async () => {
      const createResponse = await api.createSession('player1', 100);
      const sessionId = createResponse.data!.sessionId;

      const betResponse = await api.placeBet(sessionId, 200);

      expect(betResponse.success).toBe(false);
      expect(betResponse.error).toBe('Insufficient balance');
    });

    it('should reject invalid bet amount', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      const betResponse = await api.placeBet(sessionId, 0);

      expect(betResponse.success).toBe(false);
      expect(betResponse.error).toBe('Invalid bet amount');
    });
  });

  describe('Game Results', () => {
    it('should record win and update balance', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      await api.placeBet(sessionId, 100);

      const result: Omit<GameResult, 'timestamp'> = {
        seatId: 'seat1',
        handIndex: 0,
        bet: 100,
        payout: 200,
        outcome: 'win',
      };

      const recordResponse = await api.recordResult(sessionId, result);

      expect(recordResponse.success).toBe(true);
      expect(recordResponse.data?.newBalance).toBe(1100); // 900 + 200
      expect(recordResponse.data?.stats.handsWon).toBe(1);
      expect(recordResponse.data?.stats.totalHands).toBe(1);
    });

    it('should record loss and update balance', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      await api.placeBet(sessionId, 100);

      const result: Omit<GameResult, 'timestamp'> = {
        seatId: 'seat1',
        handIndex: 0,
        bet: 100,
        payout: 0,
        outcome: 'loss',
      };

      const recordResponse = await api.recordResult(sessionId, result);

      expect(recordResponse.success).toBe(true);
      expect(recordResponse.data?.newBalance).toBe(900); // Lost the bet
      expect(recordResponse.data?.stats.handsLost).toBe(1);
    });

    it('should record blackjack with correct payout', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      await api.placeBet(sessionId, 100);

      const result: Omit<GameResult, 'timestamp'> = {
        seatId: 'seat1',
        handIndex: 0,
        bet: 100,
        payout: 250, // 100 + 150 (3:2 payout)
        outcome: 'blackjack',
      };

      const recordResponse = await api.recordResult(sessionId, result);

      expect(recordResponse.success).toBe(true);
      expect(recordResponse.data?.newBalance).toBe(1150);
      expect(recordResponse.data?.stats.blackjacks).toBe(1);
      expect(recordResponse.data?.stats.handsWon).toBe(1);
    });

    it('should record push and return bet', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      await api.placeBet(sessionId, 100);

      const result: Omit<GameResult, 'timestamp'> = {
        seatId: 'seat1',
        handIndex: 0,
        bet: 100,
        payout: 100,
        outcome: 'push',
      };

      const recordResponse = await api.recordResult(sessionId, result);

      expect(recordResponse.success).toBe(true);
      expect(recordResponse.data?.newBalance).toBe(1000); // Back to original
      expect(recordResponse.data?.stats.handsPushed).toBe(1);
    });
  });

  describe('Statistics', () => {
    it('should track win streaks', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      // Win 3 times in a row
      for (let i = 0; i < 3; i++) {
        await api.placeBet(sessionId, 100);
        await api.recordResult(sessionId, {
          seatId: 'seat1',
          handIndex: 0,
          bet: 100,
          payout: 200,
          outcome: 'win',
        });
      }

      const statsResponse = await api.getStats(sessionId);

      expect(statsResponse.data?.currentStreak).toBe(3);
      expect(statsResponse.data?.longestWinStreak).toBe(3);
    });

    it('should track biggest win and loss', async () => {
      const createResponse = await api.createSession('player1', 10000);
      const sessionId = createResponse.data!.sessionId;

      // Big win
      await api.placeBet(sessionId, 1000);
      await api.recordResult(sessionId, {
        seatId: 'seat1',
        handIndex: 0,
        bet: 1000,
        payout: 2500, // Blackjack
        outcome: 'blackjack',
      });

      // Big loss
      await api.placeBet(sessionId, 500);
      await api.recordResult(sessionId, {
        seatId: 'seat1',
        handIndex: 0,
        bet: 500,
        payout: 0,
        outcome: 'loss',
      });

      const statsResponse = await api.getStats(sessionId);

      expect(statsResponse.data?.biggestWin).toBe(1500); // 2500 - 1000
      expect(statsResponse.data?.biggestLoss).toBe(-500); // 0 - 500
    });

    it('should calculate total wagered and won', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      await api.placeBet(sessionId, 100);
      await api.recordResult(sessionId, {
        seatId: 'seat1',
        handIndex: 0,
        bet: 100,
        payout: 200,
        outcome: 'win',
      });

      await api.placeBet(sessionId, 50);
      await api.recordResult(sessionId, {
        seatId: 'seat1',
        handIndex: 0,
        bet: 50,
        payout: 0,
        outcome: 'loss',
      });

      const statsResponse = await api.getStats(sessionId);

      expect(statsResponse.data?.totalWagered).toBe(150);
      expect(statsResponse.data?.totalWon).toBe(200);
    });
  });

  describe('Game History', () => {
    it('should retrieve game history', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      // Play 3 hands
      for (let i = 0; i < 3; i++) {
        await api.placeBet(sessionId, 100);
        await api.recordResult(sessionId, {
          seatId: 'seat1',
          handIndex: 0,
          bet: 100,
          payout: 200,
          outcome: 'win',
        });
      }

      const historyResponse = await api.getHistory(sessionId);

      expect(historyResponse.success).toBe(true);
      expect(historyResponse.data).toHaveLength(3);
    });

    it('should limit history results', async () => {
      const createResponse = await api.createSession('player1', 10000);
      const sessionId = createResponse.data!.sessionId;

      // Play 10 hands
      for (let i = 0; i < 10; i++) {
        await api.placeBet(sessionId, 100);
        await api.recordResult(sessionId, {
          seatId: 'seat1',
          handIndex: 0,
          bet: 100,
          payout: 200,
          outcome: 'win',
        });
      }

      const historyResponse = await api.getHistory(sessionId, 5);

      expect(historyResponse.data).toHaveLength(5);
    });

    it('should return most recent results first', async () => {
      const createResponse = await api.createSession('player1', 1000);
      const sessionId = createResponse.data!.sessionId;

      // First hand: win
      await api.placeBet(sessionId, 100);
      await api.recordResult(sessionId, {
        seatId: 'seat1',
        handIndex: 0,
        bet: 100,
        payout: 200,
        outcome: 'win',
      });

      // Second hand: loss
      await api.placeBet(sessionId, 100);
      await api.recordResult(sessionId, {
        seatId: 'seat1',
        handIndex: 0,
        bet: 100,
        payout: 0,
        outcome: 'loss',
      });

      const historyResponse = await api.getHistory(sessionId);

      expect(historyResponse.data?.[0].outcome).toBe('loss'); // Most recent
      expect(historyResponse.data?.[1].outcome).toBe('win'); // Older
    });
  });

  describe('Network Performance', () => {
    it('should respect network delay setting', async () => {
      const slowAPI = createMockAPI(100); // 100ms delay

      const start = performance.now();
      await slowAPI.createSession('player1');
      const end = performance.now();

      const duration = end - start;
      expect(duration).toBeGreaterThanOrEqual(100);
    });

    it('should handle concurrent requests', async () => {
      const promises = [];

      for (let i = 0; i < 10; i++) {
        promises.push(api.createSession(`player${i}`));
      }

      const results = await Promise.all(promises);

      expect(results).toHaveLength(10);
      expect(results.every(r => r.success)).toBe(true);
    });
  });

  describe('Leaderboard', () => {
    it('should generate leaderboard', async () => {
      // Create multiple sessions with different balances
      const session1 = await api.createSession('player1', 1000);
      const session2 = await api.createSession('player2', 1000);
      const session3 = await api.createSession('player3', 1000);

      // Player 1 wins big
      await api.placeBet(session1.data!.sessionId, 100);
      await api.recordResult(session1.data!.sessionId, {
        seatId: 'seat1',
        handIndex: 0,
        bet: 100,
        payout: 1000,
        outcome: 'blackjack',
      });

      // Player 2 loses
      await api.placeBet(session2.data!.sessionId, 500);
      await api.recordResult(session2.data!.sessionId, {
        seatId: 'seat1',
        handIndex: 0,
        bet: 500,
        payout: 0,
        outcome: 'loss',
      });

      const leaderboard = await api.getLeaderboard();

      expect(leaderboard.success).toBe(true);
      expect(leaderboard.data).toHaveLength(3);
      expect(leaderboard.data?.[0].playerId).toBe('player1'); // Highest balance
    });
  });
});
