import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function StatusBar() {
  const { balance, message, phase } = useGameStore();

  const getOutcomeStyle = () => {
    if (message.includes('WIN') || message.includes('Blackjack')) {
      return 'text-win glow-win';
    }
    if (message.includes('BUST') || message.includes('lose')) {
      return 'text-loss';
    }
    return 'text-text';
  };

  return (
    <header className="bg-background-card border-b border-background py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top row: Title and Balance */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl md:text-2xl font-display font-bold text-text-bright">
            Blackjack
          </h1>

          <motion.div
            key={balance}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-right"
          >
            <div className="text-xs text-text-muted uppercase tracking-wide">Balance</div>
            <div className="text-2xl md:text-3xl font-bold text-text-bright font-display">
              ${balance.toLocaleString()}
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Status/Outcome Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-center text-sm md:text-base font-semibold ${getOutcomeStyle()}`}
          >
            {message}
          </motion.div>
        </AnimatePresence>
      </div>
    </header>
  );
}
