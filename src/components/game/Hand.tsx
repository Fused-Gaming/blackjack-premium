import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import type { Hand as HandType } from '../../types';
import { evaluateHand } from '../../engine/hand';

interface HandProps {
  hand: HandType;
  label: string;
  showValue?: boolean;
  isActive?: boolean;
  compact?: boolean;
}

export function Hand({ hand, label, showValue = true, isActive = false, compact = false }: HandProps) {
  const value = evaluateHand(hand.cards);
  const isEmpty = hand.cards.length === 0;

  const valueLabel = () => {
    if (isEmpty) return null;
    if (value.isBlackjack) return 'BJ';
    if (value.isBust) return 'BUST';
    return String(value.value);
  };

  const valueBadgeColor = () => {
    if (value.isBlackjack) return 'bg-brand text-background font-black';
    if (value.isBust) return 'bg-loss text-white font-bold';
    if (value.value === 21) return 'bg-win text-white font-bold';
    return 'bg-background-elevated text-text border border-border';
  };

  const vLabel = valueLabel();

  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-1.5' : 'gap-2'}`}>
      {/* Label + value row */}
      <div className="flex items-center gap-2.5">
        <span className={`text-xs font-mono font-medium tracking-widest uppercase ${
          isActive ? 'text-brand' : 'text-text-muted'
        }`}>
          {label}
        </span>
        {isActive && (
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="w-1.5 h-1.5 rounded-full bg-brand"
          />
        )}
        <AnimatePresence mode="wait">
          {vLabel && showValue && (
            <motion.span
              key={vLabel}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className={`text-xs px-2 py-0.5 rounded-full ${valueBadgeColor()}`}
            >
              {vLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Cards row */}
      {isEmpty ? (
        <div className={`flex items-center justify-center rounded-xl border-2 border-dashed border-border/40 text-border/40 ${
          compact ? 'w-16 h-[90px]' : 'w-20 h-28 md:w-24 md:h-32'
        }`}>
          <span className="text-2xl opacity-30">·</span>
        </div>
      ) : (
        <div className="flex items-center" style={{ paddingLeft: hand.cards.length > 1 ? (compact ? 28 : 44) : 0 }}>
          {hand.cards.map((card, i) => (
            <Card
              key={`${card.suit}-${card.rank}-${i}`}
              card={card}
              index={i}
              delay={i * 0.12}
              compact={compact}
            />
          ))}
        </div>
      )}

      {/* Bet + status indicators */}
      {hand.bet > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-muted">Bet</span>
          <span className="text-sm font-bold font-mono text-brand">${hand.bet}</span>
          {hand.isDouble && (
            <span className="text-2xs bg-brand/15 text-brand px-1.5 py-0.5 rounded font-bold tracking-wide">2×</span>
          )}
          {hand.isSplit && (
            <span className="text-2xs bg-primary/15 text-primary-light px-1.5 py-0.5 rounded font-bold tracking-wide">SPLIT</span>
          )}
        </div>
      )}
    </div>
  );
}
