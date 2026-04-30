import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { Chip } from '../ui/Chip';

const CHIP_VALUES = [1, 5, 10, 25, 50, 100] as const;

export function BetControls() {
  const { phase, balance, placeBet, startGame } = useGameStore();
  const [selectedChip, setSelectedChip] = useState<number>(25);
  const [currentBet, setCurrentBet] = useState(0);

  if (phase === 'playing' || phase === 'dealerTurn' || phase === 'complete') {
    return null;
  }

  const canAdd = balance >= selectedChip && currentBet + selectedChip <= balance;

  const handleAddChip = () => {
    if (canAdd) setCurrentBet(prev => prev + selectedChip);
  };

  const handleDouble = () => {
    const doubled = currentBet * 2;
    if (doubled <= balance) setCurrentBet(doubled);
  };

  const handleClear = () => setCurrentBet(0);

  const handlePlaceBet = () => {
    if (currentBet > 0 && currentBet <= balance) {
      placeBet('seat1', currentBet);
      setCurrentBet(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4"
    >
      {/* ── Chip selector ── */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CHIP_VALUES.map(value => (
          <Chip
            key={value}
            value={value}
            selected={selectedChip === value}
            onClick={() => setSelectedChip(value)}
            disabled={balance < value}
          />
        ))}
      </div>

      {/* ── Bet display + quick actions ── */}
      <div className="flex items-center gap-3 w-full justify-center">
        <AnimatePresence>
          {currentBet > 0 && (
            <>
              <motion.button
                key="clear"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClear}
                whileTap={{ scale: 0.93 }}
                className="px-4 py-2 rounded-[var(--r-lg)] text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)] hover:border-[var(--border-bright)] transition-all duration-[var(--d-base)]"
              >
                Clear
              </motion.button>

              <motion.button
                key="double"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleDouble}
                disabled={currentBet * 2 > balance}
                whileTap={{ scale: 0.93 }}
                className="px-4 py-2 rounded-[var(--r-lg)] text-sm font-semibold text-[var(--brand)] border border-[color:var(--brand)] hover:bg-[color:var(--brand)] hover:bg-opacity-8 transition-all duration-[var(--d-base)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                2×
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Current bet badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBet}
            initial={{ scale: 0.88, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center min-w-[80px]"
          >
            <span className="text-2xs font-mono text-[var(--text-muted)] uppercase tracking-widest leading-none">Bet</span>
            <span className={`font-display font-bold text-2xl leading-tight tabular-nums ${
              currentBet > 0 ? 'text-[var(--brand)]' : 'text-[var(--text-muted)]'
            }`}
            style={{ opacity: currentBet > 0 ? 1 : 0.4 }}>
              ${currentBet}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Add chip button */}
        <motion.button
          onClick={handleAddChip}
          disabled={!canAdd}
          whileHover={canAdd ? { scale: 1.04 } : {}}
          whileTap={canAdd ? { scale: 0.95 } : {}}
          className="px-5 py-2.5 rounded-[var(--r-lg)] text-sm font-bold bg-[var(--bg-elevated)] hover:bg-[var(--bg-panel)] border border-[var(--border)] hover:border-[var(--border-bright)] text-[var(--text)] transition-all duration-[var(--d-base)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          +${selectedChip}
        </motion.button>
      </div>

      {/* ── Primary CTA ── */}
      <AnimatePresence mode="wait">
        {currentBet > 0 && phase === 'idle' && (
          <motion.button
            key="confirm"
            onClick={handlePlaceBet}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-[var(--r-lg)] font-display font-bold text-lg text-white transition-all duration-[var(--d-base)] shadow-glow-win"
            style={{ background: 'linear-gradient(135deg, var(--win) 0%, var(--win-dark) 100%)' }}
          >
            Confirm Bet — ${currentBet}
          </motion.button>
        )}

        {phase === 'betting' && (
          <motion.button
            key="deal"
            onClick={startGame}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-[var(--r-lg)] font-display font-black text-2xl tracking-widest text-[var(--bg)] transition-all duration-[var(--d-base)] animate-glow-pulse-gold"
            style={{ background: 'linear-gradient(135deg, var(--brand-light) 0%, var(--brand) 60%, var(--brand-dark) 100%)' }}
          >
            DEAL
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
