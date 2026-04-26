import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function InsurancePrompt() {
  const { phase, activeSeatId, playerSeats, balance, placeInsurance, declineInsurance } = useGameStore();

  if (phase !== 'insurance' || !activeSeatId) return null;

  const handBet = playerSeats[activeSeatId]?.hands[0]?.bet ?? 0;
  const insuranceCost = Math.floor(handBet / 2);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="glass rounded-3xl shadow-modal p-8 max-w-sm w-full text-center"
        >
          {/* Ace indicator */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <span className="text-2xl font-bold text-brand">A</span>
          </div>

          <h2 className="font-display font-bold text-2xl text-text-bright mb-2">Insurance?</h2>
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Dealer is showing an Ace. Take insurance for{' '}
            <span className="text-brand font-semibold">${insuranceCost}</span>
            {' '}— pays <span className="text-text font-semibold">2:1</span> if dealer has Blackjack.
          </p>

          <div className="flex flex-col gap-3">
            <motion.button
              onClick={() => placeInsurance(activeSeatId)}
              disabled={balance < insuranceCost}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-xl font-display font-bold text-lg text-background shadow-glow-brand disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{ background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 60%, #D97706 100%)' }}
            >
              Insure — ${insuranceCost}
            </motion.button>
            <motion.button
              onClick={declineInsurance}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-xl font-semibold text-text-muted border border-border hover:border-border-bright hover:text-text transition-all"
            >
              No Thanks, Skip
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
