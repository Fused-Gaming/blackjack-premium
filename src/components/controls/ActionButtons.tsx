import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { canSplit, canDouble } from '../../engine/hand';

const btnBase =
  'px-7 md:px-10 py-3.5 rounded-xl font-display font-bold text-base md:text-lg tracking-wide transition-all shadow-button active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed';

export function ActionButtons() {
  const { phase, playerSeats, activeSeatId, balance, hit, stand, double, split, placeInsurance, declineInsurance } =
    useGameStore();

  // ── Insurance phase ──────────────────────────────────────────────────────
  if (phase === 'insurance' && activeSeatId) {
    const handBet = playerSeats[activeSeatId]?.hands[0]?.bet ?? 0;
    const insuranceCost = Math.floor(handBet / 2);

    return (
      <AnimatePresence>
        <motion.div
          key="insurance"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="text-center">
            <p className="text-sm font-mono text-text-muted mb-0.5 uppercase tracking-widest">Dealer shows Ace</p>
            <p className="text-xs text-text-subtle">Insurance costs ${insuranceCost} · pays 2:1</p>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              onClick={() => placeInsurance(activeSeatId)}
              disabled={balance < insuranceCost}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`${btnBase} text-background shadow-glow-brand`}
              style={{ background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 60%, #D97706 100%)' }}
            >
              Insure — ${insuranceCost}
            </motion.button>
            <motion.button
              onClick={declineInsurance}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`${btnBase} border border-border text-text-muted hover:text-text hover:border-border-bright bg-background-elevated`}
            >
              No Thanks
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (phase !== 'playing' || !activeSeatId) return null;

  const seat = playerSeats[activeSeatId];
  const currentHand = seat?.hands[seat.currentHandIndex];
  if (!currentHand || currentHand.status !== 'playing') return null;

  const canSplitHand = canSplit(currentHand);
  const canDoubleHand = canDouble(currentHand);
  const canDoubleBalance = balance >= currentHand.bet;
  const canSplitBalance = balance >= currentHand.bet;

  return (
    <AnimatePresence>
      <motion.div
        key="actions"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className="flex flex-wrap gap-2.5 justify-center"
      >
        {/* HIT */}
        <motion.button
          onClick={hit}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={`${btnBase} text-white shadow-glow-win`}
          style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
        >
          Hit
        </motion.button>

        {/* STAND */}
        <motion.button
          onClick={stand}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={`${btnBase} text-white`}
          style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}
        >
          Stand
        </motion.button>

        {/* DOUBLE */}
        {canDoubleHand && (
          <motion.button
            onClick={double}
            disabled={!canDoubleBalance}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`${btnBase} text-background shadow-glow-brand`}
            style={{ background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 60%, #D97706 100%)' }}
          >
            Double
          </motion.button>
        )}

        {/* SPLIT */}
        {canSplitHand && (
          <motion.button
            onClick={split}
            disabled={!canSplitBalance}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`${btnBase} text-white`}
            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
          >
            Split
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
