import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '../../store/walletStore';
import { WalletModal } from './WalletModal';

export function WalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { isConnected, displayAddress, disconnect, provider } = useWalletStore();

  if (isConnected && displayAddress) {
    return (
      <>
        <div className="relative">
          <motion.button
            onClick={() => setShowMenu(v => !v)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-border hover:border-border-bright bg-background-elevated hover:bg-background-panel transition-all"
          >
            {/* Status dot */}
            <div className="w-2 h-2 rounded-full bg-win animate-pulse shrink-0" />

            {/* Address */}
            <span className="font-mono text-sm text-text-bright tracking-wide">
              {displayAddress}
            </span>

            {/* Provider badge */}
            <span className="text-xs text-text-muted bg-background px-1.5 py-0.5 rounded-full capitalize">
              {provider === 'demo' ? '⚡ demo' : provider}
            </span>

            {/* Chevron */}
            <svg className="w-3 h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>

          {/* Dropdown */}
          <AnimatePresence>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 z-40 glass rounded-xl shadow-modal py-1 min-w-[180px]"
                >
                  <div className="px-4 py-2.5 border-b border-border">
                    <div className="text-xs text-text-muted mb-0.5">Connected as</div>
                    <div className="font-mono text-sm text-text-bright">{displayAddress}</div>
                  </div>
                  <button
                    onClick={() => { disconnect(); setShowMenu(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-loss hover:bg-loss-muted transition-colors"
                  >
                    Disconnect wallet
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-brand text-background hover:bg-brand-light transition-all shadow-glow-brand"
      >
        {/* Wallet icon */}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Connect Wallet
      </motion.button>

      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
