import { Hand } from './Hand';
import { useGameStore } from '../../store/gameStore';
import { ActionButtons } from '../controls/ActionButtons';
import { BetControls } from '../controls/BetControls';
import { StatusBar } from '../layout/StatusBar';
import { evaluateHand } from '../../engine/hand';

export function Table() {
  const { dealerHand, playerSeats, phase } = useGameStore();

  const seat = playerSeats.seat1;
  const showDealerValue = phase === 'dealerTurn' || phase === 'complete';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Premium Status Bar */}
      <StatusBar />

      {/* Main Game Area */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          {/* Premium Felt Table */}
          <div
            className="rounded-3xl p-6 md:p-12 shadow-2xl mb-6"
            style={{
              background: 'radial-gradient(ellipse at top, #145A4A 0%, #0E4D3C 50%, #0C3B31 100%)',
              boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Dealer Zone */}
            <div className="mb-12 md:mb-20">
              <Hand
                hand={{ cards: dealerHand, bet: 0, status: 'playing', isDouble: false, isSplit: false }}
                label="DEALER"
                showValue={showDealerValue}
              />
              {!showDealerValue && dealerHand.length > 0 && (
                <div className="text-center text-text-muted mt-3 text-sm">
                  Showing: {evaluateHand([dealerHand[0]]).value}
                </div>
              )}
            </div>

            {/* Player Zone */}
            <div className="flex flex-col items-center gap-8">
              {seat.active && seat.hands.map((hand, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <Hand
                    hand={hand}
                    label={seat.hands.length > 1 ? `HAND ${index + 1}` : 'YOU'}
                    showValue={true}
                  />
                  {hand.bet > 0 && (
                    <div className="flex items-center gap-2 text-gold font-bold text-sm md:text-base">
                      <span className="opacity-75">Bet:</span>
                      <span className="text-lg">${hand.bet}</span>
                      {hand.isDouble && <span className="text-xs bg-gold/20 px-2 py-1 rounded">DOUBLED</span>}
                    </div>
                  )}
                  {seat.currentHandIndex === index && phase === 'playing' && (
                    <div className="flex items-center gap-2 text-primary text-sm font-semibold animate-bounce-subtle">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      Active Hand
                    </div>
                  )}
                </div>
              ))}

              {!seat.active && phase === 'idle' && (
                <div className="text-text-muted text-lg py-8">
                  Place your bet to begin
                </div>
              )}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-col gap-4">
            <ActionButtons />
            <BetControls />

            {phase === 'complete' && (
              <button
                onClick={() => useGameStore.getState().resetGame()}
                className="w-full md:w-auto mx-auto px-12 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-button"
              >
                New Round
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
