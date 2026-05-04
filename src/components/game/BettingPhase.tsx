import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { BetControls } from '../controls/BetControls';

export function BettingPhase() {
  const { playerSeats, numPlayers } = useGameStore();

  const activeSeatIds = Object.keys(playerSeats)
    .filter(id => playerSeats[id].active)
    .slice(0, numPlayers);

  const allBetsPlaced = activeSeatIds.every(id => playerSeats[id].hands[0]?.bet > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-brand mb-2">Place Your Bets</h2>
        <p className="text-sm text-text-muted">
          All players must place bets to start the round
        </p>
      </div>

      {/* Betting Status Grid */}
      {numPlayers > 1 && (
        <div className={`grid ${
          numPlayers === 2 ? 'grid-cols-2' :
          numPlayers === 3 ? 'grid-cols-3' :
          'grid-cols-3'
        } gap-4 w-full max-w-2xl`}>
          <AnimatePresence>
            {activeSeatIds.map(seatId => {
              const seat = playerSeats[seatId];
              const hasBet = seat.hands[0]?.bet > 0;

              return (
                <motion.div
                  key={seatId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    hasBet
                      ? 'border-win/50 bg-win/10'
                      : 'border-border bg-background-elevated'
                  }`}
                >
                  <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
                    {seatId}
                  </div>
                  <div className="text-2xl font-bold text-brand">
                    ${seat.hands[0]?.bet ?? 0}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {hasBet ? '✓ Ready' : 'Waiting...'}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Bet Controls */}
      <div className="w-full max-w-md">
        <BetControls />
      </div>

      {/* Ready Status */}
      {allBetsPlaced && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 rounded-lg border border-win/40 bg-win/10"
        >
          <p className="text-sm text-win font-semibold">✓ All players ready - Click DEAL to start</p>
        </motion.div>
      )}

      {/* Player Balance Info */}
      <div className="text-xs text-text-muted">
        <p>Place main bet to begin</p>
      </div>
    </motion.div>
  );
}
