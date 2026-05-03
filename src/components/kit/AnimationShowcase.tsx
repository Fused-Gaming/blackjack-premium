import { useState } from 'react';
import { motion } from 'framer-motion';
import { animationTokens } from '../../data/animationTokens';

export default function AnimationShowcase() {
  const [animatingCardIndex, setAnimatingCardIndex] = useState<number | null>(null);
  const [selectedEasing, setSelectedEasing] = useState<'spring' | 'out' | 'flip'>('spring');
  const [selectedTiming, setSelectedTiming] = useState<'fast' | 'base' | 'slow'>('base');

  const easingMap = {
    spring: [0.34, 1.56, 0.64, 1],
    out: [0.33, 0.66, 0.66, 1],
    flip: [0.68, -0.55, 0.27, 1.55],
  };

  const timingMs = {
    fast: 150,
    base: 250,
    slow: 500,
  };

  return (
    <div className="space-y-12">
      {/* State Machine Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Game Phase State Machine</h3>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {animationTokens.phases.map((phase, index) => (
              <div key={phase} className="flex items-center gap-4">
                <div className="bg-amber-400/20 border border-amber-400/50 rounded-lg px-4 py-3 text-center min-w-24">
                  <p className="font-semibold text-amber-400">{phase}</p>
                </div>
                {index < animationTokens.phases.length - 1 && (
                  <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm mt-6">
            The game progresses through distinct phases, each with specific animation timing and transitions.
          </p>
        </div>
      </section>

      {/* Timing Showcase Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Timing Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(animationTokens.timing).map(([key, token]) => (
            <div
              key={key}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4"
            >
              <div>
                <p className="font-semibold text-white capitalize">{key}</p>
                <p className="text-sm text-slate-400">{token.value}</p>
              </div>
              <p className="text-sm text-slate-300">{token.use}</p>
              <div className="flex gap-2 items-end h-16">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-amber-400/30 border border-amber-400 rounded"
                    animate={{ height: ['20%', '100%', '20%'] }}
                    transition={{
                      duration: parseInt(token.value) / 1000,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Easing Curves Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Easing Curves</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(animationTokens.easing).map(([key, easing]) => (
            <button
              key={key}
              onClick={() => setSelectedEasing(key as 'spring' | 'out' | 'flip')}
              className={`bg-slate-800/50 border rounded-lg p-6 space-y-4 text-left transition-colors ${
                selectedEasing === key
                  ? 'border-amber-400 bg-amber-400/10'
                  : 'border-slate-700 hover:border-amber-400/50'
              }`}
            >
              <p className="font-semibold text-amber-400 capitalize">{easing.label}</p>
              <p className="text-xs text-slate-400 font-mono">{easing.value}</p>
              <div className="h-20 bg-slate-900/50 border border-slate-600 rounded flex items-end p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                  <path
                    d={`M 0 100 Q 25 ${100 - easingMap[key as keyof typeof easingMap][1] * 15}, 50 50 Q 75 ${100 - easingMap[key as keyof typeof easingMap][3] * 15}, 100 0`}
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="100" r="2" fill="#FBBF24" />
                  <circle cx="100" cy="0" r="2" fill="#FBBF24" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Live Animation Preview */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Animation Preview</h3>
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300">Easing Style</label>
              <div className="flex gap-2">
                {(['spring', 'out', 'flip'] as const).map(easing => (
                  <button
                    key={easing}
                    onClick={() => setSelectedEasing(easing)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      selectedEasing === easing
                        ? 'bg-amber-400 text-black'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {easing}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300">Duration</label>
              <div className="flex gap-2">
                {(['fast', 'base', 'slow'] as const).map(timing => (
                  <button
                    key={timing}
                    onClick={() => setSelectedTiming(timing)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      selectedTiming === timing
                        ? 'bg-amber-400 text-black'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {timing}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card Flip Animation */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-4">
            <p className="font-semibold text-white">Card Flip</p>
            <div className="flex justify-center py-12">
              <motion.div
                className="w-24 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-3xl font-bold text-black cursor-pointer shadow-lg"
                onClick={() => setAnimatingCardIndex(0)}
                animate={animatingCardIndex === 0 ? { rotateY: 360 } : { rotateY: 0 }}
                transition={{
                  duration: timingMs[selectedTiming] / 1000,
                  ease: selectedEasing,
                }}
              >
                ♠
              </motion.div>
            </div>
            <p className="text-sm text-slate-400 text-center">
              Click card to animate • Duration: {animationTokens.timing[selectedTiming].value}
            </p>
          </div>

          {/* Chip Placement Animation */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-4">
            <p className="font-semibold text-white">Chip Placement</p>
            <div className="grid grid-cols-3 gap-6 py-8">
              {[0, 1, 2].map(i => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="h-24 bg-slate-900/50 rounded border border-slate-600 flex items-end justify-center">
                    <motion.div
                      className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      onClick={() => setAnimatingCardIndex(i + 1)}
                      animate={animatingCardIndex === i + 1 ? { y: -60 } : { y: 0 }}
                      transition={{
                        duration: timingMs[selectedTiming] / 1000,
                        ease: selectedEasing,
                      }}
                    >
                      ${[1, 5, 10][i]}
                    </motion.div>
                  </div>
                  <p className="text-xs text-slate-400">Chip ${[1, 5, 10][i]}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 text-center">
              Click chips to animate • Duration: {animationTokens.timing[selectedTiming].value}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
