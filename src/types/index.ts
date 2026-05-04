// Core game types

export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

export interface SideBet {
  type: 'twentyOneThree'; // 21+3
  amount: number;
  result?: 'win' | 'loss' | 'push';
  payout?: number;
}

export interface Hand {
  cards: Card[];
  bet: number;
  status: 'playing' | 'stand' | 'bust' | 'blackjack' | 'complete';
  isDouble: boolean;
  isSplit: boolean;
  splitFromAces?: boolean; // True if this hand was created from splitting Aces
  canHit?: boolean; // False for split Aces (can only receive one card)
  sideBets?: SideBet[];
}

export interface PlayerSeat {
  id: string;
  hands: Hand[];
  active: boolean;
  currentHandIndex: number;
  betLocked?: boolean;
  balance: number;
}

export type TurnQueueEntry = {
  seatId: string;
  handIndex: number;
};

export type GamePhase =
  | 'idle'
  | 'bettingOpen' // All players can place bets in parallel
  | 'bettingLocked' // Bets are locked, about to deal
  | 'dealing'
  | 'sideBetEvaluation' // Evaluating side bets (non-blocking)
  | 'insurance'
  | 'playerTurns' // Sequential turn phase for players
  | 'dealerTurn'
  | 'settlement'
  | 'complete';

export interface GameState {
  phase: GamePhase;
  deck: Card[];
  dealerHand: Card[];
  playerSeats: Record<string, PlayerSeat>;
  activeSeatId: string | null;
  insuranceBets: Record<string, number>;
  balance: number;
  message: string;
  numPlayers: number; // 1-5 players
  turnQueue: TurnQueueEntry[]; // Sequential order for player turns
  currentTurnIndex: number; // Index into turnQueue
  bettingTimer?: number; // Countdown for betting phase (in ms)
}

export interface HandValue {
  value: number;
  isSoft: boolean;
  isBlackjack: boolean;
  isBust: boolean;
}

export interface GameResult {
  seatId: string;
  handIndex: number;
  bet: number;
  payout: number;
  outcome: 'win' | 'loss' | 'push' | 'blackjack';
  timestamp: number;
}

export interface BetAmount {
  seatId: string;
  amount: number;
}

export interface GameAction {
  type: 'hit' | 'stand' | 'double' | 'split' | 'insurance';
  seatId: string;
  handIndex?: number;
}

export interface Settings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  theme: 'dark' | 'light';
}
