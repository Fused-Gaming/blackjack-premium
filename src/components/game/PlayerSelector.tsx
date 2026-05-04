import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

interface PlayerSelectorProps {
  onConfirm: () => void;
}

export function PlayerSelector({ onConfirm }: PlayerSelectorProps) {
  const { numPlayers, setNumPlayers } = useGameStore();

  const handleSelectPlayers = (count: number) => {
    setNumPlayers(count);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center gap-6"
    >
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-brand mb-2">Select Players</h2>
        <p className="text-sm text-text-muted">Choose how many players at the table</p>
      </div>

      {/* Player Count Selector */}
      <div className="flex gap-3 justify-center flex-wrap">
        {[1, 2, 3, 4, 5].map((count) => (
          <motion.button
            key={count}
            onClick={() => handleSelectPlayers(count)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-xl font-display font-bold text-xl transition-all duration-250 border-2 ${
              numPlayers === count
                ? 'bg-brand/20 border-brand text-brand shadow-glow-brand'
                : 'bg-bg-elevated border-border text-text-muted hover:border-brand/50 hover:text-text'
            }`}
          >
            {count}P
          </motion.button>
        ))}
      </div>

      {/* Description */}
      <div className="text-center max-w-md">
        <p className="text-xs text-text-subtle mb-2">
          {numPlayers === 1 && '🎮 Single player: You vs Dealer. Linear flow, fast gameplay.'}
          {numPlayers === 2 && '🧑‍🤝‍🧑 Two players: Parallel betting, sequential turns.'}
          {numPlayers === 3 && '👥 Three players: Expanded table, shared dealer.'}
          {numPlayers === 4 && '👨‍👩‍👧 Four players: Full quad layout, organized turns.'}
          {numPlayers === 5 && '🧑‍🤝‍🧑 Five players: Complete table, maximum action.'}
        </p>
      </div>

      {/* Confirm Button */}
      <motion.button
        onClick={onConfirm}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="px-8 py-3.5 rounded-xl font-display font-bold text-lg text-background transition-all shadow-glow-brand"
        style={{
          background: 'linear-gradient(135deg, var(--brand-light) 0%, var(--brand) 60%, var(--brand-dark) 100%)',
        }}
      >
        Start Game
      </motion.button>
    </motion.div>
  );
}
