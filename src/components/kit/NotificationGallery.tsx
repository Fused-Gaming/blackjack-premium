import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationTokens } from '../../data/notificationTokens';

export default function NotificationGallery() {
  const [selectedOutcome, setSelectedOutcome] = useState<keyof typeof notificationTokens.outcomes>('win');
  const [selectedPhase, setSelectedPhase] = useState<string>('betting');
  const [streakCount, setStreakCount] = useState(5);
  const [showOutcome, setShowOutcome] = useState(true);
  const [showPhase, setShowPhase] = useState(true);
  const [showStreak, setShowStreak] = useState(true);

  const currentOutcome = notificationTokens.outcomes[selectedOutcome];
  const currentPhase = notificationTokens.phases.find(p => p.id === selectedPhase);

  return (
    <div className="space-y-12">
      {/* Outcome Indicators Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Outcome Indicators</h3>
        <p className="text-slate-300 text-sm">Game result states shown to the player</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(notificationTokens.outcomes).map(([key, outcome]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedOutcome(key as keyof typeof notificationTokens.outcomes);
                setShowOutcome(false);
                setTimeout(() => setShowOutcome(true), 100);
              }}
              className={`bg-slate-800/50 border rounded-lg p-4 text-center transition-all ${
                selectedOutcome === key
                  ? 'border-amber-400 bg-amber-400/10'
                  : 'border-slate-700 hover:border-amber-400/50'
              }`}
            >
              <div className="text-2xl mb-2">{outcome.icon}</div>
              <p className="font-semibold text-white text-sm">{outcome.label}</p>
              <p className="text-xs text-slate-400 mt-1"style={{ color: outcome.color }}>
                {outcome.color}
              </p>
            </button>
          ))}
        </div>

        {/* Outcome Preview */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <p className="text-sm text-slate-400 mb-4">Live Preview</p>
          <AnimatePresence mode="wait">
            {showOutcome && (
              <motion.div
                key={selectedOutcome}
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`${currentOutcome.bgColor} ${currentOutcome.borderColor} border rounded-lg p-8 text-center`}
              >
                <div className="text-4xl mb-3" style={{ color: currentOutcome.color }}>
                  {currentOutcome.icon}
                </div>
                <p className="text-2xl font-bold" style={{ color: currentOutcome.color }}>
                  {currentOutcome.label}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Phase Indicators Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Phase Indicators</h3>
        <p className="text-slate-300 text-sm">Game phase badges shown during play</p>

        <div className="flex flex-wrap gap-2">
          {notificationTokens.phases.map(phase => (
            <button
              key={phase.id}
              onClick={() => {
                setSelectedPhase(phase.id);
                setShowPhase(false);
                setTimeout(() => setShowPhase(true), 100);
              }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedPhase === phase.id
                  ? 'bg-amber-400 text-black'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {phase.label}
            </button>
          ))}
        </div>

        {/* Phase Preview */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <p className="text-sm text-slate-400 mb-4">Current Phase</p>
          <AnimatePresence mode="wait">
            {showPhase && currentPhase && (
              <motion.div
                key={currentPhase.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: `${notificationTokens.outcomes.win.color}20`,
                  borderColor: `${notificationTokens.outcomes.win.color}50`
                }}
                className="border rounded-lg p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${notificationTokens.outcomes.win.color}30`, borderColor: notificationTokens.outcomes.win.color, borderWidth: '1px' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: notificationTokens.outcomes.win.color }}></div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold" style={{ color: notificationTokens.outcomes.win.color }}>{currentPhase.label}</p>
                    <p className="text-sm" style={{ color: `${notificationTokens.outcomes.win.color}cc` }}>{currentPhase.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Streak Counter Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Streak Counters</h3>
        <p className="text-slate-300 text-sm">Win/loss streak tracking with visual feedback</p>

        {/* Streak Input */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <label className="text-sm font-semibold text-slate-300 mb-3 block">
            Set Streak Count: {notificationTokens.streakFormat(streakCount)}
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={streakCount}
            onChange={e => {
              const newCount = parseInt(e.target.value);
              setStreakCount(newCount);
              setShowStreak(false);
              setTimeout(() => setShowStreak(true), 100);
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>25+</span>
          </div>
        </div>

        {/* Streak Displays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Win Streak */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-sm text-slate-400 mb-4">Win Streak</p>
            <AnimatePresence mode="wait">
              {showStreak && (
                <motion.div
                  key={streakCount}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-r ${notificationTokens.outcomes.win.gradient} border border-emerald-500/50 rounded-lg p-8 text-center`}
                >
                  <p className="text-5xl font-bold text-green-400 mb-2">
                    {notificationTokens.streakFormat(streakCount)}
                  </p>
                  <p className="text-green-300 font-semibold">
                    {streakCount === 1 ? 'Win' : 'Wins'} in a row
                  </p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(Math.min(streakCount, 10))].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="w-3 h-3 bg-green-400 rounded-full"
                      />
                    ))}
                    {streakCount > 10 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-400 text-xs font-bold">
                        +{streakCount - 10}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Loss Streak */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-sm text-slate-400 mb-4">Loss Streak</p>
            <AnimatePresence mode="wait">
              {showStreak && (
                <motion.div
                  key={`loss-${streakCount}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-r ${notificationTokens.outcomes.loss.gradient} border border-red-500/50 rounded-lg p-8 text-center`}
                >
                  <p className="text-5xl font-bold text-red-400 mb-2">
                    {notificationTokens.streakFormat(streakCount)}
                  </p>
                  <p className="text-red-300 font-semibold">
                    {streakCount === 1 ? 'Loss' : 'Losses'} in a row
                  </p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(Math.min(streakCount, 10))].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="w-3 h-3 bg-red-400 rounded-full"
                      />
                    ))}
                    {streakCount > 10 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-xs font-bold">
                        +{streakCount - 10}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Combined Example */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Combined Notification</h3>
        <p className="text-slate-300 text-sm">How outcome and streak appear together in game</p>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <div className="space-y-4">
            <motion.div
              className={`${currentOutcome.bgColor} ${currentOutcome.borderColor} border rounded-lg p-6`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-300 mb-1">Hand Result</p>
                  <p className="text-3xl font-bold" style={{ color: currentOutcome.color }}>
                    {currentOutcome.icon} {currentOutcome.label}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-300 mb-1">Current Streak</p>
                  <p className="text-2xl font-bold text-amber-400">
                    {notificationTokens.streakFormat(streakCount)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
