import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { Chip } from '../ui/Chip';

const CHIP_VALUES = [1, 5, 10, 25, 50, 100];

export function BetControls() {
  const { phase, balance, placeBet, startGame } = useGameStore();
  const [selectedChip, setSelectedChip] = useState(5);
  const [currentBet, setCurrentBet] = useState(0);

  if (phase === 'playing' || phase === 'dealerTurn' || phase === 'complete') {
    return null;
  }

  const handleAddChip = () => {
    if (balance >= selectedChip && currentBet + selectedChip <= balance) {
      setCurrentBet(prev => prev + selectedChip);
    }
  };

  const handleClearBet = () => {
    setCurrentBet(0);
  };

  const handlePlaceBet = () => {
    if (currentBet > 0 && currentBet <= balance) {
      placeBet('seat1', currentBet);
      setCurrentBet(0);
    }
  };

  const handleDeal = () => {
    startGame();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 bg-background-card/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-background shadow-2xl"
    >
      {/* Current Bet Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBet}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-text-muted text-sm uppercase tracking-wide mb-1">Current Bet</div>
          <div className="text-4xl font-display font-bold text-gold">
            ${currentBet}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Chip Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
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

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center w-full">
        <motion.button
          onClick={handleAddChip}
          disabled={balance < selectedChip || currentBet + selectedChip > balance}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-button"
        >
          Add ${selectedChip}
        </motion.button>

        {currentBet > 0 && (
          <motion.button
            onClick={handleClearBet}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-text font-semibold rounded-xl transition-all shadow-button"
          >
            Clear
          </motion.button>
        )}
      </div>

      {/* Primary Actions */}
      <AnimatePresence mode="wait">
        {currentBet > 0 && phase === 'idle' && (
          <motion.button
            key="confirm"
            onClick={handlePlaceBet}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-12 py-4 bg-gradient-to-r from-win to-win-dark text-white font-bold text-lg rounded-xl transition-all shadow-glow-win"
          >
            Confirm Bet
          </motion.button>
        )}

        {phase === 'betting' && (
          <motion.button
            key="deal"
            onClick={handleDeal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-16 py-5 bg-gradient-to-r from-gold via-gold-light to-gold text-gray-900 font-display font-bold text-2xl rounded-xl transition-all shadow-glow-gold animate-glow-pulse"
          >
            DEAL
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
