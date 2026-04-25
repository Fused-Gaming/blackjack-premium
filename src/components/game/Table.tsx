import { motion, AnimatePresence } from 'framer-motion';
import type { GameState } from '../../types';
import { Hand } from './Hand';
import { useGameStore } from '../../store/gameStore';
import { ActionButtons } from '../controls/ActionButtons';
import { BetControls } from '../controls/BetControls';
import { InsurancePrompt } from '../controls/InsurancePrompt';
import { evaluateHand, compareHands } from '../../engine/hand';
import { calculatePayout } from '../../engine/payouts';

// ── Outcome banner shown when round completes ─────────────────────────────────
function OutcomeBanner({
  seats,
  dealerHand,
}: {
  seats: GameState['playerSeats'];
  dealerHand: GameState['dealerHand'];
}) {
  const seat = seats.seat1;
  if (!seat.active) return null;

  let totalPayout = 0;
  let outcome: 'win' | 'loss' | 'push' = 'push';

  for (const hand of seat.hands) {
    const result = compareHands(hand, dealerHand);
    const payout = calculatePayout(hand, result);
    totalPayout += payout;
    if (result === 'win' || result === 'blackjack') outcome = 'win';
    else if (result === 'loss' && outcome !== 'win') outcome = 'loss';
  }

  const isBlackjack = totalPayout >= (seat.hands[0]?.bet ?? 0) * 2.5;

  const config = {
    win: {
      label: isBlackjack ? '♠ Blackjack!' : '✦ You Win!',
      amount: `+$${totalPayout}`,
      cls: 'border-win/40 bg-win/10 text-win',
    },
    loss: {
      label: '✕ Dealer Wins',
      amount: `-$${seat.hands.reduce((s, h) => s + h.bet, 0)}`,
      cls: 'border-loss/40 bg-loss/10 text-loss',
    },
    push: {
      label: '⇌ Push',
      amount: `$${seat.hands.reduce((s, h) => s + h.bet, 0)} returned`,
      cls: 'border-border bg-background-elevated text-text-muted',
    },
  }[outcome];

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
  const { dealerHand, playerSeats, phase } = useGameStore();
  const seat = playerSeats.seat1;
  const showDealerValue = phase === 'dealerTurn' || phase === 'complete';
  const dealerFaceCard = dealerHand.length > 0 ? dealerHand[0] : null;

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Insurance prompt overlay */}
      <InsurancePrompt />

      {/* ── Main felt area ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-2xl xl:max-w-3xl">

          {/* ─── Felt Table ─── */}
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
            <div className="p-6 md:p-10 lg:p-12">

              {/* ── Dealer Zone ── */}
              <div className="mb-6 md:mb-10">
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
              <div className="relative flex items-center justify-center mb-6 md:mb-10">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                <div
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    border: '1.5px dashed rgba(255,215,0,0.28)',
                    boxShadow: '0 0 20px rgba(255,215,0,0.05)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {seat.active && (seat.hands[0]?.bet ?? 0) > 0 ? (
                      <motion.div
                        key="bet"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-xs font-bold font-mono text-brand leading-none">
                          ${seat.hands[0]?.bet ?? 0}
                        </span>
                        <span className="text-[10px] text-text-muted/50 leading-none mt-0.5">bet</span>
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
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ── Player Zone ── */}
              <div className="flex flex-col items-center gap-6">
                <AnimatePresence>
                  {seat.active && seat.hands.map((hand, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      className={`flex flex-col items-center gap-3 ${
                        seat.hands.length > 1
                          ? 'px-4 py-4 rounded-2xl border-2 border-dashed'
                          : ''
                      }`}
                      style={
                        seat.hands.length > 1
                          ? {
                              borderColor: seat.currentHandIndex === index ? 'rgba(251, 191, 36, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                              backgroundColor:
                                seat.currentHandIndex === index ? 'rgba(251, 191, 36, 0.05)' : 'transparent',
                            }
                          : undefined
                      }
                    >
                      <Hand
                        hand={hand}
                        label={seat.hands.length > 1 ? `Hand ${index + 1}` : 'You'}
                        showValue={true}
                        isActive={seat.currentHandIndex === index && phase === 'playing'}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {!seat.active && (
                  <div className="py-10 text-sm font-mono tracking-widest text-center uppercase"
                    style={{ color: 'rgba(26, 107, 84, 0.5)' }}>
                    Place your bet to begin
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Outcome banner ── */}
          <AnimatePresence>
            {phase === 'complete' && (
              <OutcomeBanner seats={playerSeats} dealerHand={dealerHand} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Controls tray ── */}
      <div className="border-t border-border/50 glass">
        <div className="max-w-2xl xl:max-w-3xl mx-auto px-4 py-4 md:py-5 flex flex-col gap-3">
          <ActionButtons />
          <BetControls />

          <AnimatePresence>
            {phase === 'complete' && (
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
