import { motion, AnimatePresence } from 'framer-motion';
import type { GameState } from '../../types';
import { Hand } from './Hand';
import { useGameStore } from '../../store/gameStore';
import { ActionButtons } from '../controls/ActionButtons';
import { BetControls } from '../controls/BetControls';
import { InsurancePrompt } from '../controls/InsurancePrompt';
import { BettingPhase } from './BettingPhase';
import { DealingPhase } from './DealingPhase';
import { evaluateHand, compareHands } from '../../engine/hand';
import { calculatePayout } from '../../engine/payouts';

// Layout grid classes for different player counts
const LAYOUT_GRIDS = {
  1: 'grid-cols-1 place-items-center',
  2: 'grid-cols-2 gap-6',
  3: 'grid-cols-3 gap-4',
  4: 'grid-cols-2 gap-6',
  5: 'grid-cols-5 gap-3',
} as const;

// ── Outcome banner shown when round completes ─────────────────────────────────
function OutcomeBanner({
  activeSeatIds,
  seats,
  dealerHand,
}: {
  activeSeatIds: string[];
  seats: GameState['playerSeats'];
  dealerHand: GameState['dealerHand'];
}) {
  if (activeSeatIds.length === 0) return null;

  // For multiplayer, show summary of all seats
  let totalPayout = 0;
  let outcomeCount = { win: 0, loss: 0, push: 0 };

  for (const seatId of activeSeatIds) {
    const seat = seats[seatId];
    if (!seat.active) continue;

    for (const hand of seat.hands) {
      const result = compareHands(hand, dealerHand);
      const payout = calculatePayout(hand, result);
      totalPayout += payout;

      if (result === 'win' || result === 'blackjack') outcomeCount.win++;
      else if (result === 'loss') outcomeCount.loss++;
      else outcomeCount.push++;
    }
  }

  const primaryOutcome = outcomeCount.win > 0 ? 'win' : outcomeCount.loss > 0 ? 'loss' : 'push';
  const config = {
    win: {
      label: '✦ Round Won!',
      amount: `+$${totalPayout}`,
      cls: 'border-win/40 bg-win/10 text-win',
    },
    loss: {
      label: '✕ Dealer Wins',
      amount: `-$${totalPayout}`,
      cls: 'border-loss/40 bg-loss/10 text-loss',
    },
    push: {
      label: '⇌ Push',
      amount: `$${totalPayout} returned`,
      cls: 'border-border bg-background-elevated text-text-muted',
    },
  }[primaryOutcome];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -8 }}
      className={`mt-4 flex items-center justify-between px-5 py-3.5 rounded-2xl border ${config.cls}`}
    >
      <span className="font-display font-bold text-lg">{config.label}</span>
      <span className="font-mono font-bold text-lg">{config.amount}</span>
    </motion.div>
  );
}

// ── Main Table component ──────────────────────────────────────────────────────
export function Table() {
  const { dealerHand, playerSeats, phase, numPlayers, currentTurnIndex, turnQueue } = useGameStore();
  const showDealerValue = phase === 'dealerTurn' || phase === 'settlement' || phase === 'complete';
  const dealerFaceCard = dealerHand.length > 0 ? dealerHand[0] : null;

  // Get active seats (excluding empty ones)
  const activeSeatIds = Object.keys(playerSeats)
    .filter(id => playerSeats[id].active)
    .slice(0, numPlayers);

  const seatCount = activeSeatIds.length;

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Insurance prompt overlay */}
      <InsurancePrompt />

      {/* ── Main felt area ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 md:py-4 overflow-y-auto min-h-0">
        <div className="w-full max-w-2xl xl:max-w-3xl flex flex-col flex-shrink-0">

          {/* ─── Betting Phase (Parallel betting) ─── */}
          <AnimatePresence mode="wait">
            {phase === 'bettingOpen' && (
              <motion.div
                key="betting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <BettingPhase />
              </motion.div>
            )}

            {/* ─── Dealing Phase (Card deal animations) ─── */}
            {phase === 'dealing' && (
              <motion.div
                key="dealing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <DealingPhase />
              </motion.div>
            )}

            {/* ─── Felt Table ─── */}
            {phase !== 'bettingOpen' && phase !== 'dealing' && (
              <motion.div
                key="felt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div
                  className="relative rounded-[2.5rem]"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 35%, #0F5132 0%, #0A3D26 45%, #073520 100%)',
                    boxShadow: [
                      'inset 0 0 80px rgba(0,0,0,0.5)',
                      '0 0 0 3px rgba(255,215,0,0.12)',
                      '0 0 0 5px rgba(0,0,0,0.4)',
                      '0 24px 64px rgba(0,0,0,0.5)',
                    ].join(', '),
                  }}
                >
                  <div className="p-4 md:p-6 lg:p-8">

                    {/* ── Dealer Zone ── */}
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-col items-center gap-2">
                        <Hand
                          hand={{ cards: dealerHand, bet: 0, status: 'playing', isDouble: false, isSplit: false }}
                          label="Dealer"
                          showValue={showDealerValue}
                        />
                        {!showDealerValue && dealerFaceCard && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-mono text-felt-glow/60"
                          >
                            Showing: {evaluateHand([dealerFaceCard]).value}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* ── Center divider with betting ring ── */}
                    <div className="relative flex items-center justify-center mb-4 md:mb-6">
                      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                      <div
                        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          border: '1.5px dashed rgba(255,215,0,0.28)',
                          boxShadow: '0 0 20px rgba(255,215,0,0.05)',
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {(() => {
                            const totalBets = activeSeatIds.reduce((sum, id) => sum + (playerSeats[id].hands[0]?.bet ?? 0), 0);
                            return totalBets > 0 ? (
                              <motion.div
                                key="bet"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="flex flex-col items-center"
                              >
                                <span className="text-xs font-bold font-mono text-brand leading-none">
                                  ${totalBets}
                                </span>
                                <span className="text-[10px] text-text-muted/50 leading-none mt-0.5">total</span>
                              </motion.div>
                            ) : (
                              <motion.span
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-lg"
                                style={{ color: 'rgba(255,215,0,0.15)' }}
                              >
                                ◈
                              </motion.span>
                            );
                          })()}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* ── Player Zone ── */}
                    <div className={`grid ${LAYOUT_GRIDS[seatCount as keyof typeof LAYOUT_GRIDS] || LAYOUT_GRIDS[1]} w-full`}>
                      <AnimatePresence>
                        {activeSeatIds.map((seatId) => {
                          const playerSeat = playerSeats[seatId];
                          const isCurrentTurn = turnQueue[currentTurnIndex]?.seatId === seatId;

                          return (
                            <motion.div
                              key={seatId}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="flex flex-col items-center gap-3"
                            >
                              {/* Seat label and turn indicator */}
                              <div className="text-xs font-mono text-felt-glow/60 uppercase tracking-widest">
                                {seatId}
                                {isCurrentTurn && <span className="ml-2 text-brand">●</span>}
                              </div>

                              {/* Player hands */}
                              {playerSeat.hands.map((hand, handIndex) => (
                                <motion.div
                                  key={handIndex}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  className={`rounded-lg p-3 ${isCurrentTurn ? 'ring-2 ring-brand/40' : ''}`}
                                  style={{
                                    background: isCurrentTurn ? 'rgba(251, 191, 36, 0.05)' : 'rgba(255,255,255,0.02)',
                                  }}
                                >
                                  <Hand
                                    hand={hand}
                                    label={playerSeat.hands.length > 1 ? `Hand ${handIndex + 1}` : seatId}
                                    showValue={true}
                                    isActive={isCurrentTurn && playerSeat.currentHandIndex === handIndex && phase === 'playerTurns'}
                                  />
                                </motion.div>
                              ))}

                              {/* Side bet indicators */}
                              {playerSeat.hands[0].sideBets && playerSeat.hands[0].sideBets.length > 0 && (
                                <div className="text-xs font-mono text-felt-glow/50">
                                  21+3: ${playerSeat.hands[0].sideBets[0].amount}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    {/* Empty state */}
                    {seatCount === 0 && (
                      <div className="py-10 text-sm font-mono tracking-widest text-center uppercase"
                        style={{ color: 'rgba(26, 107, 84, 0.5)' }}>
                        Place your bet to begin
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Outcome banner ── */}
                <AnimatePresence>
                  {(phase === 'settlement' || phase === 'complete') && (
                    <OutcomeBanner activeSeatIds={activeSeatIds} seats={playerSeats} dealerHand={dealerHand} />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Controls tray ── */}
      <div className="border-t border-border/50 glass flex-shrink-0">
        <div className="max-w-2xl xl:max-w-3xl mx-auto px-4 py-3 md:py-4 flex flex-col gap-2">
          <ActionButtons />
          <BetControls />

          <AnimatePresence>
            {(phase === 'settlement' || phase === 'complete') && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={() => useGameStore.getState().resetGame()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl font-display font-bold text-lg text-background transition-all shadow-glow-brand"
                style={{
                  background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 60%, #D97706 100%)',
                }}
              >
                New Round
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
