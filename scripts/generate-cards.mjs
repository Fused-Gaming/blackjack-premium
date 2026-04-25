#!/usr/bin/env node
/**
 * Generates 52 playing card SVGs + card-back.svg into public/cards/
 *
 * Naming: {rank}{suit}.svg
 *   rank: 2-9, 10, j, q, k, a
 *   suit: c (clubs), d (diamonds), h (hearts), s (spades)
 *
 * Examples: 2c.svg, 10s.svg, ah.svg, kd.svg
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'cards');
mkdirSync(OUT, { recursive: true });

// ── Data ──────────────────────────────────────────────────────────────────────

const SUITS = ['c', 'd', 'h', 's'];
const RANKS = ['2','3','4','5','6','7','8','9','10','j','q','k','a'];

const SUIT_SYMBOLS = { c: '♣', d: '♦', h: '♥', s: '♠' };
const RANK_DISPLAY  = { j: 'J', q: 'Q', k: 'K', a: 'A' };

const RED  = '#DC2626';
const BLACK = '#111827';

function display(rank) {
  return RANK_DISPLAY[rank] ?? rank.toUpperCase();
}

// ── Pip layout helpers ────────────────────────────────────────────────────────

// Returns array of {cx, cy} as % of 100x140 card body
const PIP_LAYOUTS = {
  '2': [ [50,32],[50,68] ],
  '3': [ [50,25],[50,50],[50,75] ],
  '4': [ [30,32],[70,32],[30,68],[70,68] ],
  '5': [ [30,28],[70,28],[50,50],[30,72],[70,72] ],
  '6': [ [30,28],[70,28],[30,50],[70,50],[30,72],[70,72] ],
  '7': [ [30,28],[70,28],[50,40],[30,55],[70,55],[30,72],[70,72] ],
  '8': [ [30,26],[70,26],[30,43],[70,43],[50,50],[30,62],[70,62],[50,75] ],
  '9': [ [30,25],[70,25],[30,40],[70,40],[50,50],[30,60],[70,60],[30,75],[70,75] ],
  '10':[ [30,24],[70,24],[30,36],[70,36],[50,44],[50,56],[30,64],[70,64],[30,76],[70,76] ],
};

function pips(rank, color, symbol) {
  const layout = PIP_LAYOUTS[rank];
  if (!layout) return '';
  const size = rank === '10' ? 11 : 13;
  return layout.map(([cx, cy]) =>
    `<text x="${cx}" y="${cy}" font-family="Georgia,serif" font-size="${size}" fill="${color}" text-anchor="middle" dominant-baseline="central">${symbol}</text>`
  ).join('\n  ');
}

// ── Face card artwork (simple geometric) ─────────────────────────────────────

function faceArtwork(rank, color, symbol) {
  const letter = display(rank);
  return `
  <!-- face card artwork -->
  <rect x="18" y="22" width="64" height="96" rx="4" fill="none" stroke="${color}" stroke-width="0.75" opacity="0.18"/>
  <text x="50" y="72" font-family="Georgia,serif" font-size="38" fill="${color}" text-anchor="middle" dominant-baseline="central" opacity="0.88">${symbol}</text>
  <text x="50" y="100" font-family="Georgia,serif" font-size="15" font-weight="bold" fill="${color}" text-anchor="middle" dominant-baseline="central" opacity="0.28">${letter}</text>`;
}

// ── Ace artwork ───────────────────────────────────────────────────────────────

function aceArtwork(color, symbol) {
  return `
  <!-- ace artwork -->
  <text x="50" y="76" font-family="Georgia,serif" font-size="56" fill="${color}" text-anchor="middle" dominant-baseline="central">${symbol}</text>`;
}

// ── SVG card builder ──────────────────────────────────────────────────────────

function cardSVG(rank, suit) {
  const isRed   = suit === 'd' || suit === 'h';
  const color   = isRed ? RED : BLACK;
  const symbol  = SUIT_SYMBOLS[suit];
  const rankDisp = display(rank);
  const isFace  = ['j','q','k'].includes(rank);
  const isAce   = rank === 'a';

  // Corner font size adjusts for "10"
  const cornerRankSize = rank === '10' ? 12 : 14;

  const artwork = isAce  ? aceArtwork(color, symbol)
                : isFace ? faceArtwork(rank, color, symbol)
                : `\n  ${pips(rank, color, symbol)}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" width="100" height="140">
  <!-- card body -->
  <rect width="100" height="140" rx="6" fill="white"/>
  <rect x="0.5" y="0.5" width="99" height="139" rx="5.5" fill="none" stroke="#D1D5DB" stroke-width="1"/>

  <!-- top-left corner -->
  <text x="6.5" y="17" font-family="Georgia,serif" font-size="${cornerRankSize}" font-weight="bold" fill="${color}">${rankDisp}</text>
  <text x="6.5" y="29" font-family="Georgia,serif" font-size="11" fill="${color}">${symbol}</text>

  <!-- center artwork -->${artwork}

  <!-- bottom-right corner (rotated 180° around card center) -->
  <g transform="rotate(180,50,70)">
    <text x="6.5" y="17" font-family="Georgia,serif" font-size="${cornerRankSize}" font-weight="bold" fill="${color}">${rankDisp}</text>
    <text x="6.5" y="29" font-family="Georgia,serif" font-size="11" fill="${color}">${symbol}</text>
  </g>
</svg>`;
}

// ── Card back ─────────────────────────────────────────────────────────────────

const cardBackSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" width="100" height="140">
  <!-- body -->
  <rect width="100" height="140" rx="6" fill="#0D1B2A"/>
  <!-- gold rim -->
  <rect x="0.5" y="0.5" width="99" height="139" rx="5.5" fill="none" stroke="rgba(245,158,11,0.35)" stroke-width="1"/>
  <!-- inner border -->
  <rect x="6" y="6" width="88" height="128" rx="3.5" fill="none" stroke="rgba(245,158,11,0.14)" stroke-width="1"/>
  <!-- diagonal hatching (subtle) -->
  <line x1="10" y1="6"  x2="94" y2="134" stroke="rgba(245,158,11,0.04)" stroke-width="10"/>
  <line x1="6"  y1="34" x2="78" y2="134" stroke="rgba(245,158,11,0.04)" stroke-width="10"/>
  <line x1="22" y1="6"  x2="94" y2="116" stroke="rgba(245,158,11,0.04)" stroke-width="10"/>
  <!-- center mark -->
  <text x="50" y="62" font-family="Georgia,serif" font-size="30" fill="rgba(245,158,11,0.22)" text-anchor="middle" dominant-baseline="central">♠</text>
  <text x="50" y="88" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="rgba(245,158,11,0.18)" text-anchor="middle" letter-spacing="4">ACE</text>
  <!-- corner pips -->
  <text x="9"  y="17" font-family="Georgia,serif" font-size="9" fill="rgba(245,158,11,0.15)">♠</text>
  <text x="91" y="127" font-family="Georgia,serif" font-size="9" fill="rgba(245,158,11,0.15)" text-anchor="end">♠</text>
</svg>`;

// ── Generate ──────────────────────────────────────────────────────────────────

let count = 0;
for (const suit of SUITS) {
  for (const rank of RANKS) {
    writeFileSync(join(OUT, `${rank}${suit}.svg`), cardSVG(rank, suit));
    count++;
  }
}

writeFileSync(join(OUT, 'card-back.svg'), cardBackSVG);

console.log(`✓ Generated ${count} card SVGs + card-back.svg → public/cards/`);
