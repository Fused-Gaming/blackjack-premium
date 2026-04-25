import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import type { GameHistory } from '../../types';

function HistoryEntry({ entry, index }: { entry: GameHistory; index: number }) {
  const isWin = entry.totalPayout > 0;
  const isPush = entry.totalPayout === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
        isWin
          ? 'bg-win/10 border border-win/20'
          : isPush
            ? 'bg-background-elevated border border-border'
            : 'bg-loss/10 border border-loss/20'
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <span className="text-xs text-text-muted w-12">
          {new Date(entry.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold">${entry.totalBet}</span>
            <span className="text-text-muted">→</span>
            <span
              className={`font-mono font-bold ${
                isWin ? 'text-win' : isPush ? 'text-text-muted' : 'text-loss'
              }`}
            >
              {isWin ? '+' : ''}{isWin ? '$' : '-$'}{Math.abs(entry.totalPayout)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function GameHistoryPanel() {
  const { history, clearHistory } = useGameStore();

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <span className="text-2xl opacity-30">♠</span>
        <p className="text-sm text-text-muted">No game history yet</p>
      </div>
    );
  }

  const totalPayout = history.reduce((sum, g) => sum + g.totalPayout, 0);
  const wins = history.filter(g => g.totalPayout > 0).length;
  const losses = history.filter(g => g.totalPayout < 0).length;
  const pushes = history.filter(g => g.totalPayout === 0).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Stats summary */}
      <div className="grid grid-cols-4 gap-2">
        <div className="px-2 py-1.5 rounded-lg bg-background-elevated border border-border text-center">
          <div className="text-xs text-text-muted">Hands</div>
          <div className="text-sm font-bold text-text">{history.length}</div>
        </div>
        <div className="px-2 py-1.5 rounded-lg bg-win/10 border border-win/20 text-center">
          <div className="text-xs text-text-muted">Wins</div>
          <div className="text-sm font-bold text-win">{wins}</div>
        </div>
        <div className="px-2 py-1.5 rounded-lg bg-loss/10 border border-loss/20 text-center">
          <div className="text-xs text-text-muted">Losses</div>
          <div className="text-sm font-bold text-loss">{losses}</div>
        </div>
        <div className="px-2 py-1.5 rounded-lg bg-background-elevated border border-border text-center">
          <div className="text-xs text-text-muted">Pushes</div>
          <div className="text-sm font-bold text-text">{pushes}</div>
        </div>
      </div>

      {/* Overall result */}
      <div
        className={`px-4 py-3 rounded-xl text-center border ${
          totalPayout > 0
            ? 'bg-win/10 border-win/30 text-win'
            : totalPayout < 0
              ? 'bg-loss/10 border-loss/30 text-loss'
              : 'bg-background-elevated border-border text-text-muted'
        }`}
      >
        <div className="text-xs text-text-muted mb-1">Net Result</div>
        <div className="text-xl font-bold font-mono">
          {totalPayout >= 0 ? '+' : ''}{totalPayout >= 0 ? '$' : '-$'}{Math.abs(totalPayout)}
        </div>
      </div>

      {/* History list */}
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {[...history].reverse().map((entry, index) => (
            <HistoryEntry key={entry.id} entry={entry} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Clear button */}
      <motion.button
        onClick={clearHistory}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-background-elevated border border-border text-text-muted hover:text-text hover:border-border-bright transition-colors text-sm font-medium"
      >
        <span>🗑</span>
        Clear History
      </motion.button>
    </div>
  );
}
