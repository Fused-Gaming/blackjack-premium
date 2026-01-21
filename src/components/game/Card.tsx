import { motion } from 'framer-motion';
import type { Card as CardType } from '../../types';

interface CardProps {
  card: CardType;
  index?: number;
  delay?: number;
}

export function Card({ card, index = 0, delay = 0 }: CardProps) {
  const isRed = card.suit === '♥' || card.suit === '♦';

  if (!card.faceUp) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -200, y: -100, rotate: -25, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          delay,
          type: 'spring',
          stiffness: 100,
        }}
        className="relative w-20 h-28 md:w-24 md:h-32 rounded-lg shadow-card"
        style={{ marginLeft: index * -40 }}
      >
        {/* Card back design */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary via-primary-dark to-blue-900 border-2 border-primary-light overflow-hidden">
          {/* Pattern */}
          <div className="absolute inset-2 border-2 border-primary-light/30 rounded" />
          <div className="absolute inset-4 border-2 border-primary-light/20 rounded" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-10 md:w-10 md:h-12 border-4 border-white/20 rounded opacity-40" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -200, y: -100, rotate: -25, scale: 0.8 }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      className="relative w-20 h-28 md:w-24 md:h-32 rounded-lg bg-white shadow-card flex flex-col justify-between p-1.5 md:p-2"
      style={{ marginLeft: index * -40 }}
    >
      {/* Top corner */}
      <div className={`text-base md:text-lg font-bold leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
        <div>{card.rank}</div>
        <div className="text-xl md:text-2xl">{card.suit}</div>
      </div>

      {/* Center suit */}
      <div className={`text-3xl md:text-5xl text-center leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.suit}
      </div>

      {/* Bottom corner (rotated) */}
      <div className={`text-base md:text-lg font-bold text-right leading-none transform rotate-180 ${isRed ? 'text-red-600' : 'text-black'}`}>
        <div className="text-xl md:text-2xl">{card.suit}</div>
        <div>{card.rank}</div>
      </div>
    </motion.div>
  );
}
