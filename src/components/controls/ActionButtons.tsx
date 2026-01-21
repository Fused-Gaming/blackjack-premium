import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { canSplit, canDouble } from '../../engine/hand';

export function ActionButtons() {
  const { phase, playerSeats, activeSeatId, hit, stand, double, split } = useGameStore();

  if (phase !== 'playing' || !activeSeatId) return null;

  const seat = playerSeats[activeSeatId];
  const currentHand = seat?.hands[seat.currentHandIndex];

  if (!currentHand || currentHand.status !== 'playing') return null;

  const canSplitHand = canSplit(currentHand);
  const canDoubleHand = canDouble(currentHand);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3 justify-center"
    >
      {/* HIT Button */}
      <motion.button
        onClick={hit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 md:px-12 py-4 bg-gradient-to-r from-win to-win-dark text-white font-bold text-lg md:text-xl rounded-xl transition-all shadow-button hover:shadow-glow-win"
      >
        HIT
      </motion.button>

      {/* STAND Button */}
      <motion.button
        onClick={stand}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 md:px-12 py-4 bg-gradient-to-r from-loss to-loss-dark text-white font-bold text-lg md:text-xl rounded-xl transition-all shadow-button hover:shadow-glow-loss"
      >
        STAND
      </motion.button>

      {/* DOUBLE Button */}
      {canDoubleHand && (
        <motion.button
          onClick={double}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 md:px-10 py-4 bg-gradient-to-r from-gold to-gold-dark text-gray-900 font-bold text-lg md:text-xl rounded-xl transition-all shadow-button hover:shadow-glow-gold"
        >
          DOUBLE
        </motion.button>
      )}

      {/* SPLIT Button */}
      {canSplitHand && (
        <motion.button
          onClick={split}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 md:px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg md:text-xl rounded-xl transition-all shadow-button"
        >
          SPLIT
        </motion.button>
      )}
    </motion.div>
  );
}
