import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { WalletButton } from '../wallet/WalletButton';

export function Header() {
  const { balance, message } = useGameStore();

  const outcomeColor = (() => {
    if (message.includes('WIN') || message.includes('Blackjack') || message.includes('win')) return 'text-win';
    if (message.includes('BUST') || message.includes('lose') || message.includes('Lose')) return 'text-loss';
    return 'text-text-muted';
  })();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 glass">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span
              className="font-display font-black text-2xl leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 60%, #D97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ♠ ACE
            </span>
            <span className="hidden sm:block text-2xs font-mono text-text-muted tracking-widest uppercase border border-border px-1.5 py-0.5 rounded">
              Beta
            </span>
          </div>

          {/* ── Center status message ── */}
          <div className="flex-1 flex justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={message}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className={`hidden md:block text-sm font-medium ${outcomeColor} text-center max-w-xs truncate`}
              >
                {message}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* ── Right: Balance + Wallet ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Balance pill */}
            <motion.div
              key={balance}
              initial={{ scale: 0.92, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="hidden sm:flex flex-col items-end"
            >
              <span className="text-2xs font-mono text-text-muted uppercase tracking-widest leading-none">Balance</span>
              <span className="font-display font-bold text-lg text-text-bright leading-tight tabular-nums">
                ${balance.toLocaleString()}
              </span>
            </motion.div>

            <div className="w-px h-8 bg-border hidden sm:block" />

            <WalletButton />
          </div>
        </div>

        {/* Mobile status */}
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`md:hidden text-xs font-medium text-center pb-2 ${outcomeColor}`}
          >
            {message}
          </motion.div>
        </AnimatePresence>
      </div>
    </header>
  );
}
