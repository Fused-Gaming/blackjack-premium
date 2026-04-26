import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '../../store/walletStore';
import type { WalletProvider } from '../../types/wallet';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WALLETS: { id: WalletProvider; label: string; description: string; icon: string; available: boolean }[] = [
  {
    id: 'metamask',
    label: 'MetaMask',
    description: 'Connect via browser extension',
    icon: '🦊',
    available: typeof window !== 'undefined' && !!window.ethereum?.isMetaMask,
  },
  {
    id: 'coinbase',
    label: 'Coinbase Wallet',
    description: 'Connect via Coinbase Wallet',
    icon: '🔵',
    available: typeof window !== 'undefined' && !!window.ethereum?.isCoinbaseWallet,
  },
  {
    id: 'demo',
    label: 'Demo Mode',
    description: 'Play instantly with a virtual wallet',
    icon: '⚡',
    available: true,
  },
];

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, isConnecting, error, clearError } = useWalletStore();

  const handleConnect = async (provider: WalletProvider) => {
    clearError();
    await connect(provider);
    if (useWalletStore.getState().isConnected) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-sm">
              <div className="glass rounded-3xl shadow-modal overflow-hidden">
                {/* Header */}
                <div className="relative px-6 pt-6 pb-4 border-b border-border">
                  <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:text-text hover:bg-background-elevated transition-all"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">♠</span>
                    <h2 className="font-display font-bold text-xl text-text-bright">Connect Wallet</h2>
                  </div>
                  <p className="text-text-muted text-sm">
                    Link your wallet to track your balance and verify provably fair gameplay.
                  </p>
                </div>

                {/* Wallet Options */}
                <div className="p-5 flex flex-col gap-3">
                  {WALLETS.map((wallet) => (
                    <motion.button
                      key={wallet.id}
                      onClick={() => handleConnect(wallet.id)}
                      disabled={isConnecting}
                      whileHover={wallet.available ? { scale: 1.02, x: 4 } : {}}
                      whileTap={wallet.available ? { scale: 0.98 } : {}}
                      className={[
                        'flex items-center gap-4 w-full p-4 rounded-2xl border text-left transition-all',
                        wallet.id === 'demo'
                          ? 'border-brand/40 bg-brand/8 hover:bg-brand/12 hover:border-brand/60'
                          : wallet.available
                            ? 'border-border hover:border-border-bright bg-background-elevated hover:bg-background-panel'
                            : 'border-border/30 bg-background-card/40 opacity-50 cursor-not-allowed',
                        isConnecting ? 'opacity-60 cursor-wait' : '',
                      ].join(' ')}
                    >
                      <span className="text-3xl shrink-0">{wallet.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-sm ${wallet.id === 'demo' ? 'text-brand' : 'text-text-bright'}`}>
                            {wallet.label}
                          </span>
                          {!wallet.available && wallet.id !== 'demo' && (
                            <span className="text-2xs bg-background px-1.5 py-0.5 rounded text-text-muted font-mono">
                              Not detected
                            </span>
                          )}
                        </div>
                        <p className="text-text-muted text-xs mt-0.5 truncate">{wallet.description}</p>
                      </div>
                      {wallet.id === 'demo' && (
                        <span className="shrink-0 text-xs font-bold text-brand bg-brand/15 px-2 py-1 rounded-full">
                          Instant
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-4"
                    >
                      <div className="bg-loss-muted border border-loss/30 rounded-xl p-3 text-sm text-loss">
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Loading overlay */}
                {isConnecting && (
                  <div className="px-5 pb-5">
                    <div className="flex items-center gap-3 text-text-muted text-sm">
                      <div className="w-4 h-4 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                      Connecting wallet...
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="px-5 pb-5 pt-1">
                  <p className="text-text-muted text-xs text-center leading-relaxed">
                    By connecting, you agree to our terms. Wallet connection is read-only — no funds are required.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
