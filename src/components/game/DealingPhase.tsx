import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

interface CardDealAnimation {
  seatId: string;
  cardIndex: number;
  isDealer: boolean;
}

const CARD_DEAL_DELAY = 200;

export function DealingPhase() {
  const { playerSeats, numPlayers, dealerHand, phase } = useGameStore();
  const [dealtCards, setDealtCards] = useState<Set<string>>(new Set());

  const activeSeatIds = Object.keys(playerSeats)
    .filter(id => playerSeats[id].active)
    .slice(0, numPlayers);

  const totalCardsToDeal = activeSeatIds.length * 2 + 2; // 2 per seat + 2 for dealer
  const cardsDealt = dealtCards.size;
  const progress = (cardsDealt / totalCardsToDeal) * 100;

  useEffect(() => {
    if (phase !== 'dealing') return;

    const cardQueue: CardDealAnimation[] = [];

    // Build deal sequence: dealer card 1, then each player card 1, then dealer card 2, then each player card 2
    cardQueue.push({ seatId: 'dealer', cardIndex: 0, isDealer: true });

    activeSeatIds.forEach(seatId => {
      cardQueue.push({ seatId, cardIndex: 0, isDealer: false });
    });

    cardQueue.push({ seatId: 'dealer', cardIndex: 1, isDealer: true });

    activeSeatIds.forEach(seatId => {
      cardQueue.push({ seatId, cardIndex: 1, isDealer: false });
    });

    // Animate each card deal sequentially
    cardQueue.forEach((item, index) => {
      setTimeout(() => {
        setDealtCards(prev => new Set(prev).add(`${item.seatId}-${item.cardIndex}`));

        // On final card, parent will handle phase transition via distributeCards()
        // which is called after animation completes
      }, index * CARD_DEAL_DELAY);
    });
  }, [phase, activeSeatIds]);

  // Layout grid based on player count
  const gridClass = {
    1: 'grid-cols-1 place-items-center',
    2: 'grid-cols-2 gap-6',
    3: 'grid-cols-3 gap-4',
    4: 'grid-cols-2 gap-6',
    5: 'grid-cols-5 gap-3',
  }[numPlayers] || 'grid-cols-1 place-items-center';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl xl:max-w-3xl flex flex-col gap-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-brand mb-2">Dealing Cards</h2>
        <p className="text-sm text-text-muted">Round in progress...</p>
      </div>

      {/* Felt Table */}
      <div
        className="relative rounded-[2.5rem] p-6 md:p-8"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, #0F5132 0%, #0A3D26 45%, #073520 100%)',
          boxShadow: [
            'inset 0 0 80px rgba(0,0,0,0.5)',
            '0 0 0 3px rgba(255,215,0,0.12)',
            '0 0 0 5px rgba(0,0,0,0.4)',
          ].join(', '),
        }}
      >
        {/* Dealer Zone */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="text-xs font-mono text-felt-glow/60 uppercase tracking-widest">Dealer</div>
          <div className="flex gap-3 h-24 items-center">
            <AnimatePresence>
              {dealtCards.has('dealer-0') && (
                <motion.div
                  key="dealer-0"
                  initial={{ opacity: 0, y: -40, rotateY: 90 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-14 h-20 rounded border-2 border-amber-400/60 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-2xl shadow-lg"
                >
                  {dealerHand[0]?.rank === 'J' ? '👤' : dealerHand[0]?.rank === 'Q' ? '👑' : dealerHand[0]?.rank === 'K' ? '♚' : dealerHand[0]?.rank === 'A' ? '🅰' : dealerHand[0]?.rank}
                </motion.div>
              )}
              {dealtCards.has('dealer-1') && (
                <motion.div
                  key="dealer-1"
                  initial={{ opacity: 0, y: -40, rotateY: 90 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-14 h-20 rounded border-2 border-slate-500 bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center shadow-lg"
                  style={{ opacity: 0.5 }}
                >
                  🂠
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>

        {/* Player Seats */}
        <div className={`grid ${gridClass} w-full`}>
          <AnimatePresence>
            {activeSeatIds.map((seatId) => {
              const seat = playerSeats[seatId];
              const hasCard1 = dealtCards.has(`${seatId}-0`);
              const hasCard2 = dealtCards.has(`${seatId}-1`);

              return (
                <motion.div
                  key={seatId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="text-xs font-mono text-felt-glow/60 uppercase tracking-widest">{seatId}</div>
                  <div className="flex gap-2">
                    {hasCard1 && (
                      <motion.div
                        initial={{ opacity: 0, y: -40, rotateY: 90 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-12 h-18 rounded border-2 border-amber-400/60 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-lg shadow-lg"
                      >
                        {seat.hands[0]?.cards[0]?.rank === 'J' ? '👤' : seat.hands[0]?.cards[0]?.rank === 'Q' ? '👑' : seat.hands[0]?.cards[0]?.rank === 'K' ? '♚' : seat.hands[0]?.cards[0]?.rank === 'A' ? '🅰' : seat.hands[0]?.cards[0]?.rank}
                      </motion.div>
                    )}
                    {hasCard2 && (
                      <motion.div
                        initial={{ opacity: 0, y: -40, rotateY: 90 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-12 h-18 rounded border-2 border-amber-400/60 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-lg shadow-lg"
                      >
                        {seat.hands[0]?.cards[1]?.rank === 'J' ? '👤' : seat.hands[0]?.cards[1]?.rank === 'Q' ? '👑' : seat.hands[0]?.cards[1]?.rank === 'K' ? '♚' : seat.hands[0]?.cards[1]?.rank === 'A' ? '🅰' : seat.hands[0]?.cards[1]?.rank}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-text-muted">Dealing</span>
          <span className="font-mono text-text-muted">{cardsDealt} / {totalCardsToDeal}</span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-2 rounded-full bg-gradient-to-r from-brand to-brand-dark"
          style={{ backgroundColor: 'rgba(251, 191, 36, 0.6)' }}
        />
      </div>
    </motion.div>
  );
}
