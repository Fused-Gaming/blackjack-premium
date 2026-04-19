import { motion } from 'framer-motion';
import type { Card as CardType } from '../../types';
import { getCardCode, getCardAsset, getCardBackAsset, dealJitter } from '../../utils/cardAssets';

interface CardProps {
  card: CardType;
  index?: number;
  /** Override deal-in delay (seconds). Defaults to stagger + jitter. */
  delay?: number;
  compact?: boolean;
}

// Card dimensions
const SIZE = {
  normal:  { width: 80,  height: 112 },
  compact: { width: 64,  height: 90  },
} as const;

export function Card({ card, index = 0, delay, compact = false }: CardProps) {
  const code    = getCardCode(card);
  const state   = card.faceUp ? 'faceUp' : 'faceDown';
  const { width, height } = compact ? SIZE.compact : SIZE.normal;

  // Stagger each card's deal-in, with perception-safe random jitter so no
  // card identity can be inferred from animation timing.
  const dealDelay = delay ?? dealJitter(index);

  // Negative left margin to fan/overlap cards
  const marginLeft = index > 0 ? (compact ? -28 : -44) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -220, y: -110, rotate: -28, scale: 0.75 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: dealDelay,
        type: 'spring',
        stiffness: 110,
        damping: 14,
      }}
      style={{ marginLeft, width, height, flexShrink: 0 }}
    >
      {/*
       * .card    — perspective container
       * .faceUp  — class toggle drives the CSS flip (no outcome logic here)
       * .card-inner — 3D-transformed layer
       * .card-front — face image (starts rotated 180°, revealed on flip)
       * .card-back  — back image (visible by default)
       */}
      <div
        className={`card ${state}`}
        style={{ width, height, borderRadius: 6 }}
      >
        <div className="card-inner">
          <img
            className="card-front"
            src={getCardAsset(code)}
            alt={`${card.rank} of ${code.slice(-1)}`}
            draggable={false}
            loading="eager"
          />
          <img
            className="card-back"
            src={getCardBackAsset()}
            alt="card back"
            draggable={false}
            loading="eager"
          />
        </div>
      </div>
    </motion.div>
  );
}
