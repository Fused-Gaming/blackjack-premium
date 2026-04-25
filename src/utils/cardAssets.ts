import type { Card, Suit, Rank } from '../types';

// ── Decode layer (filename ↔ domain type) ─────────────────────────────────────

const suitMap: Record<string, string> = {
  c: 'clubs',
  d: 'diamonds',
  h: 'hearts',
  s: 'spades',
};

const rankMap: Record<string, string> = {
  '2': '2', '3': '3', '4': '4', '5': '5',
  '6': '6', '7': '7', '8': '8', '9': '9',
  '10': '10',
  j: 'jack', q: 'queen', k: 'king', a: 'ace',
};

export interface ParsedCard {
  rank: string;
  suit: string;
  code: string;
}

export function parseCard(filename: string): ParsedCard | null {
  const match = filename.match(/^([0-9]+|[jqka])([cdhs])\.svg$/i);
  if (!match) return null;
  const [, rank, suit] = match;
  return {
    rank: rankMap[rank.toLowerCase()],
    suit: suitMap[suit.toLowerCase()],
    code: `${rank.toLowerCase()}${suit.toLowerCase()}`,
  };
}

// ── Code derivation (Card type → filename code) ───────────────────────────────

const SUIT_TO_CODE: Record<Suit, string> = {
  '♠': 's',
  '♥': 'h',
  '♦': 'd',
  '♣': 'c',
};

const RANK_TO_CODE: Partial<Record<Rank, string>> = {
  A: 'a',
  J: 'j',
  Q: 'q',
  K: 'k',
};

export function getCardCode(card: Card): string {
  const rankCode = RANK_TO_CODE[card.rank] ?? card.rank.toLowerCase();
  const suitCode = SUIT_TO_CODE[card.suit];
  return `${rankCode}${suitCode}`;
}

// ── Asset lookup (code → URL, never mixed with tokens) ────────────────────────

export function getCardAsset(code: string): string {
  return `/cards/${code}.svg`;
}

export function getCardBackAsset(): string {
  return '/cards/card-back.svg';
}

// ── Perception layer: timing jitter ──────────────────────────────────────────
// Prevents players from correlating animation timing with card identity.
// All cards flip/deal with identical base timing + small random offset.

export function dealJitter(index: number): number {
  const base   = index * 0.12;      // 120 ms stagger per card
  const jitter = Math.random() * 0.05; // 0–50 ms random offset
  return base + jitter;
}
