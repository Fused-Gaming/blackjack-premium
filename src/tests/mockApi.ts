/**
 * Mock API for Blackjack Game
 *
 * Simulates backend API calls for testing purposes.
 * Useful for:
 * - Integration testing
 * - Performance testing with network delays
 * - Testing error scenarios
 * - Simulating multiplayer scenarios
 */

import type { Card, GameResult, Hand } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface GameSession {
  sessionId: string;
  playerId: string;
  balance: number;
  currentBet: number;
  startTime: number;
}

export interface GameStats {
  totalHands: number;
  handsWon: number;
  handsLost: number;
  handsPushed: number;
  blackjacks: number;
  totalWagered: number;
  totalWon: number;
  biggestWin: number;
  biggestLoss: number;
  currentStreak: number;
  longestWinStreak: number;
}

export class MockBlackjackAPI {
  private sessions: Map<string, GameSession> = new Map();
  private stats: Map<string, GameStats> = new Map();
  private history: Map<string, GameResult[]> = new Map();
  private networkDelay: number = 0;

  constructor(networkDelay: number = 0) {
    this.networkDelay = networkDelay;
  }

  /**
   * Simulate network delay
   */
  private async delay(): Promise<void> {
    if (this.networkDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.networkDelay));
    }
  }

  /**
   * Create a new game session
   */
  async createSession(playerId: string, initialBalance: number = 10000): Promise<ApiResponse<GameSession>> {
    await this.delay();

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: GameSession = {
      sessionId,
      playerId,
      balance: initialBalance,
      currentBet: 0,
      startTime: Date.now(),
    };

    this.sessions.set(sessionId, session);
    this.stats.set(sessionId, this.createEmptyStats());
    this.history.set(sessionId, []);

    return {
      success: true,
      data: session,
      timestamp: Date.now(),
    };
  }

  /**
   * Get session details
   */
  async getSession(sessionId: string): Promise<ApiResponse<GameSession>> {
    await this.delay();

    const session = this.sessions.get(sessionId);

    if (!session) {
      return {
        success: false,
        error: 'Session not found',
        timestamp: Date.now(),
      };
    }

    return {
      success: true,
      data: session,
      timestamp: Date.now(),
    };
  }

  /**
   * Place a bet
   */
  async placeBet(sessionId: string, amount: number): Promise<ApiResponse<{ newBalance: number }>> {
    await this.delay();

    const session = this.sessions.get(sessionId);

    if (!session) {
      return {
        success: false,
        error: 'Session not found',
        timestamp: Date.now(),
      };
    }

    if (amount > session.balance) {
      return {
        success: false,
        error: 'Insufficient balance',
        timestamp: Date.now(),
      };
    }

    if (amount <= 0) {
      return {
        success: false,
        error: 'Invalid bet amount',
        timestamp: Date.now(),
      };
    }

    session.balance -= amount;
    session.currentBet = amount;

    return {
      success: true,
      data: { newBalance: session.balance },
      timestamp: Date.now(),
    };
  }

  /**
   * Record game result and update balance
   */
  async recordResult(
    sessionId: string,
    result: Omit<GameResult, 'timestamp'>
  ): Promise<ApiResponse<{ newBalance: number; stats: GameStats }>> {
    await this.delay();

    const session = this.sessions.get(sessionId);
    const stats = this.stats.get(sessionId);
    const history = this.history.get(sessionId);

    if (!session || !stats || !history) {
      return {
        success: false,
        error: 'Session not found',
        timestamp: Date.now(),
      };
    }

    // Record result in history
    const gameResult: GameResult = {
      ...result,
      timestamp: Date.now(),
    };
    history.push(gameResult);

    // Update balance
    session.balance += result.payout;

    // Update stats
    stats.totalHands++;
    stats.totalWagered += result.bet;
    stats.totalWon += result.payout;

    if (result.outcome === 'win' || result.outcome === 'blackjack') {
      stats.handsWon++;
      stats.currentStreak = stats.currentStreak >= 0 ? stats.currentStreak + 1 : 1;
      if (stats.currentStreak > stats.longestWinStreak) {
        stats.longestWinStreak = stats.currentStreak;
      }
    } else if (result.outcome === 'loss') {
      stats.handsLost++;
      stats.currentStreak = stats.currentStreak <= 0 ? stats.currentStreak - 1 : -1;
    } else {
      stats.handsPushed++;
    }

    if (result.outcome === 'blackjack') {
      stats.blackjacks++;
    }

    const profit = result.payout - result.bet;
    if (profit > stats.biggestWin) {
      stats.biggestWin = profit;
    }
    if (profit < stats.biggestLoss) {
      stats.biggestLoss = profit;
    }

    return {
      success: true,
      data: {
        newBalance: session.balance,
        stats: { ...stats },
      },
      timestamp: Date.now(),
    };
  }

  /**
   * Get player statistics
   */
  async getStats(sessionId: string): Promise<ApiResponse<GameStats>> {
    await this.delay();

    const stats = this.stats.get(sessionId);

    if (!stats) {
      return {
        success: false,
        error: 'Session not found',
        timestamp: Date.now(),
      };
    }

    return {
      success: true,
      data: { ...stats },
      timestamp: Date.now(),
    };
  }

  /**
   * Get game history
   */
  async getHistory(sessionId: string, limit: number = 50): Promise<ApiResponse<GameResult[]>> {
    await this.delay();

    const history = this.history.get(sessionId);

    if (!history) {
      return {
        success: false,
        error: 'Session not found',
        timestamp: Date.now(),
      };
    }

    const recentHistory = history.slice(-limit).reverse();

    return {
      success: true,
      data: recentHistory,
      timestamp: Date.now(),
    };
  }

  /**
   * Validate deck shuffle (provably fair)
   */
  async validateShuffle(seed: string, deckOrder: Card[]): Promise<ApiResponse<{ valid: boolean }>> {
    await this.delay();

    // In a real implementation, this would verify the shuffle was fair
    // using the seed and cryptographic verification

    return {
      success: true,
      data: { valid: true },
      timestamp: Date.now(),
    };
  }

  /**
   * Get leaderboard (mock data)
   */
  async getLeaderboard(limit: number = 10): Promise<ApiResponse<Array<{ playerId: string; balance: number; handsPlayed: number }>>> {
    await this.delay();

    const leaderboard = Array.from(this.stats.entries())
      .map(([sessionId, stats]) => {
        const session = this.sessions.get(sessionId);
        return {
          playerId: session?.playerId || 'unknown',
          balance: session?.balance || 0,
          handsPlayed: stats.totalHands,
        };
      })
      .sort((a, b) => b.balance - a.balance)
      .slice(0, limit);

    return {
      success: true,
      data: leaderboard,
      timestamp: Date.now(),
    };
  }

  /**
   * Simulate network error
   */
  async simulateError(): Promise<ApiResponse<never>> {
    await this.delay();

    return {
      success: false,
      error: 'Network error: Connection timeout',
      timestamp: Date.now(),
    };
  }

  /**
   * Helper: Create empty stats object
   */
  private createEmptyStats(): GameStats {
    return {
      totalHands: 0,
      handsWon: 0,
      handsLost: 0,
      handsPushed: 0,
      blackjacks: 0,
      totalWagered: 0,
      totalWon: 0,
      biggestWin: 0,
      biggestLoss: 0,
      currentStreak: 0,
      longestWinStreak: 0,
    };
  }

  /**
   * Reset all data (for testing)
   */
  reset(): void {
    this.sessions.clear();
    this.stats.clear();
    this.history.clear();
  }

  /**
   * Set network delay (for performance testing)
   */
  setNetworkDelay(ms: number): void {
    this.networkDelay = ms;
  }
}

// Export singleton instance
export const mockAPI = new MockBlackjackAPI();

// Export factory for testing with custom delays
export const createMockAPI = (networkDelay: number = 0) => new MockBlackjackAPI(networkDelay);
