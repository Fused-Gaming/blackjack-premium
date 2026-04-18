import { motion } from 'framer-motion';
import type { Card as CardType } from '../../types';

interface CardProps {
  card: CardType;
  index?: number;
  delay?: number;
  compact?: boolean;
}

const RED_SUITS = new Set(['♥', '♦']);

function isRed(suit: string) {
  return RED_SUITS.has(suit);
}

function CardBack({ compact }: { compact?: boolean }) {
  const size = compact ? 'w-16 h-22' : 'w-20 h-28 md:w-24 md:h-32';
  return (
    <div className={`${size} rounded-xl shadow-card relative overflow-hidden`}
      style={{
        background: 'linear-gradient(135deg, #0D1B2A 0%, #122032 50%, #0D1B2A 100%)',
        border: '2px solid rgba(245,158,11,0.25)',
      }}
    >
      {/* Inner border */}
      <div className="absolute inset-[5px] rounded-lg"
        style={{ border: '1px solid rgba(245,158,11,0.12)' }} />
      {/* Center logo mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display font-black select-none"
          style={{
            fontSize: compact ? '1.25rem' : '1.75rem',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.35) 0%, rgba(245,158,11,0.15) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ♠
        </span>
      </div>
      {/* Corner pips */}
      {!compact && (
        <>
          <span className="absolute top-1.5 left-2 text-xs font-bold"
            style={{ color: 'rgba(245,158,11,0.2)' }}>A</span>
          <span className="absolute bottom-1.5 right-2 text-xs font-bold rotate-180"
            style={{ color: 'rgba(245,158,11,0.2)' }}>A</span>
        </>
      )}
    </div>
  );
}

export function Card({ card, index = 0, delay = 0, compact = false }: CardProps) {
  const red = isRed(card.suit);
  const suitColor = red ? '#DC2626' : '#111827';
  const w = compact ? 64 : undefined;
  const h = compact ? 90 : undefined;

  const variants = {
    initial: {
      opacity: 0,
      x: -220,
      y: -110,
      rotate: -28,
      scale: 0.75,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    },
  };

  const offset = compact ? index * -28 : index * -44;

  if (!card.faceUp) {
    return (
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay, type: 'spring', stiffness: 110, damping: 14 }}
        style={{ marginLeft: index > 0 ? offset : 0 }}
      >
        <CardBack compact={compact} />
      </motion.div>
    );
  }

  const cardW = compact ? 'w-16' : 'w-20 md:w-24';
  const cardH = compact ? 'h-[90px]' : 'h-28 md:h-32';
  const rankSize = compact ? 'text-sm' : 'text-base md:text-lg';
  const suitCorner = compact ? 'text-sm' : 'text-lg md:text-xl';
  const centerSize = compact ? 'text-3xl' : 'text-4xl md:text-5xl';

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 110, damping: 14 }}
      style={{ marginLeft: index > 0 ? offset : 0, width: w, height: h }}
      className={`relative ${cardW} ${cardH} rounded-xl bg-white shadow-card flex flex-col justify-between p-1.5 md:p-2 shrink-0`}
    >
      {/* Top-left corner */}
      <div className={`font-bold leading-none ${rankSize}`} style={{ color: suitColor }}>
        <div>{card.rank}</div>
        <div className={suitCorner} style={{ marginTop: '-0.1em' }}>{card.suit}</div>
      </div>

      {/* Center suit */}
      <div
        className={`${centerSize} text-center leading-none select-none`}
        style={{ color: suitColor }}
      >
        {card.suit}
      </div>

      {/* Bottom-right corner (rotated) */}
      <div
        className={`font-bold leading-none rotate-180 text-right ${rankSize}`}
        style={{ color: suitColor }}
      >
        <div className={suitCorner}>{card.suit}</div>
        <div>{card.rank}</div>
      </div>

      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.06)' }} />
    </motion.div>
  );
}
