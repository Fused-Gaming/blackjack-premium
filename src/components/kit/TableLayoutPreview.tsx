import { useState } from 'react';

interface TablePreviewProps {
  playerCount: number;
  previewName: string;
}

const LAYOUT_GRIDS = {
  1: 'grid-cols-1 place-items-center',
  2: 'grid-cols-2 gap-6',
  3: 'grid-cols-3 gap-4',
  4: 'grid-cols-2 gap-6',
  5: 'grid-cols-5 gap-3',
} as const;

const PLAYER_DESCRIPTIONS = {
  1: '🎮 Single player: You vs Dealer. Linear flow, fast gameplay.',
  2: '🧑‍🤝‍🧑 Two players: Parallel betting, sequential turns.',
  3: '👥 Three players: Expanded table, shared dealer.',
  4: '👨‍👩‍👧 Four players: Full quad layout, organized turns.',
  5: '🧑‍🤝‍🧑 Five players: Complete table, maximum action.',
};

function SeatPreview({ seatId, isActive }: { seatId: string; isActive: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
        isActive
          ? 'border-amber-400/60 bg-amber-400/10'
          : 'border-slate-600 bg-slate-700/30'
      }`}
    >
      <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
        {seatId}
      </div>

      {/* Card placeholder */}
      <div className="flex gap-1">
        <div className="w-8 h-12 rounded border border-slate-500 bg-slate-800 flex items-center justify-center text-xs">
          🂡
        </div>
        <div className="w-8 h-12 rounded border border-slate-500 bg-slate-800 flex items-center justify-center text-xs">
          🂬
        </div>
      </div>

      {/* Value display */}
      <div className="text-xs font-mono text-slate-300">Total: 20</div>

      {/* Status */}
      <div className="text-xs text-slate-400">
        {isActive ? '● ACTIVE' : '○ WAITING'}
      </div>
    </div>
  );
}

function DealerZone() {
  return (
    <div className="flex flex-col items-center gap-3 mb-8 p-6 rounded-lg border-2 border-amber-400/40 bg-amber-400/5">
      <div className="text-sm font-mono text-amber-400 uppercase tracking-widest">Dealer</div>
      <div className="flex gap-2">
        <div className="w-10 h-14 rounded border border-amber-400/60 bg-slate-900 flex items-center justify-center">
          🂠
        </div>
        <div className="w-10 h-14 rounded border border-slate-500 bg-slate-800 flex items-center justify-center text-xs opacity-50">
          🂠
        </div>
      </div>
      <div className="text-xs font-mono text-amber-300">Showing: 10</div>
    </div>
  );
}

function TableLayout({ playerCount }: TablePreviewProps) {
  const gridClass = LAYOUT_GRIDS[playerCount as keyof typeof LAYOUT_GRIDS] || LAYOUT_GRIDS[1];
  const seatIds = ['seat1', 'seat2', 'seat3', 'seat4', 'seat5'];

  return (
    <div className="w-full bg-gradient-to-b from-slate-900/50 to-slate-800/50 rounded-lg p-8 border border-slate-700">
      {/* Table Header */}
      <div className="text-center mb-8">
        <h4 className="text-lg font-semibold text-amber-400 mb-2">{playerCount} Player Table</h4>
        <p className="text-sm text-slate-400">{PLAYER_DESCRIPTIONS[playerCount as keyof typeof PLAYER_DESCRIPTIONS]}</p>
      </div>

      {/* Felt area */}
      <div
        className="rounded-3xl p-6 flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, #0F5132 0%, #0A3D26 45%, #073520 100%)',
          boxShadow: '0 0 0 3px rgba(255,215,0,0.12), 0 0 0 5px rgba(0,0,0,0.4), inset 0 0 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Dealer Zone */}
        <DealerZone />

        {/* Player Seats Grid */}
        <div className={`grid ${gridClass} w-full max-w-2xl`}>
          {seatIds.slice(0, playerCount).map((seatId, idx) => (
            <SeatPreview key={seatId} seatId={seatId} isActive={idx === 0} />
          ))}
        </div>
      </div>

      {/* Game Flow Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-800/50 border border-slate-700 rounded p-3">
          <p className="text-amber-400 font-semibold mb-1">Betting</p>
          <p className="text-slate-300">Parallel - All players bet simultaneously</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded p-3">
          <p className="text-amber-400 font-semibold mb-1">Turns</p>
          <p className="text-slate-300">Sequential - Players act in order</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded p-3">
          <p className="text-amber-400 font-semibold mb-1">Settlement</p>
          <p className="text-slate-300">Independent - Each player resolves</p>
        </div>
      </div>
    </div>
  );
}

export default function TableLayoutPreview() {
  const [selectedPlayers, setSelectedPlayers] = useState(1);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h2 className="text-3xl font-bold text-amber-400 mb-4">Game Tables (1–5 Players)</h2>
        <p className="text-slate-300">
          ACE Blackjack Premium supports 1–5 player tables with adaptive layouts. Each configuration is optimized
          for parallel betting, sequential turns, and independent settlement.
        </p>
      </div>

      {/* Player Count Selector */}
      <div className="flex gap-3 justify-center flex-wrap">
        {[1, 2, 3, 4, 5].map((count) => (
          <button
            key={count}
            onClick={() => setSelectedPlayers(count)}
            className={`w-16 h-16 rounded-xl font-display font-bold text-xl transition-all duration-250 border-2 ${
              selectedPlayers === count
                ? 'bg-amber-400/20 border-amber-400 text-amber-400 shadow-lg shadow-amber-400/20'
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-amber-400/50'
            }`}
          >
            {count}P
          </button>
        ))}
      </div>

      {/* Table Preview */}
      <TableLayout playerCount={selectedPlayers} previewName={`${selectedPlayers}-player`} />

      {/* Feature Matrix */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-amber-400">Feature Matrix</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-amber-400">Feature</th>
                <th className="text-center px-4 py-3 font-semibold text-amber-400">1P</th>
                <th className="text-center px-4 py-3 font-semibold text-amber-400">2P</th>
                <th className="text-center px-4 py-3 font-semibold text-amber-400">3P</th>
                <th className="text-center px-4 py-3 font-semibold text-amber-400">4P</th>
                <th className="text-center px-4 py-3 font-semibold text-amber-400">5P</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                { feature: 'Parallel Betting', values: [true, true, true, true, true] },
                { feature: 'Sequential Turns', values: [false, true, true, true, true] },
                { feature: 'Side Bet (21+3)', values: [true, true, true, true, true] },
                { feature: 'Insurance', values: [true, true, true, true, true] },
                { feature: 'Split Hands', values: [true, true, true, true, true] },
                { feature: 'Double Down', values: [true, true, true, true, true] },
                { feature: 'Responsive Layout', values: [true, true, true, true, true] },
              ].map((row) => (
                <tr key={row.feature} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-300">{row.feature}</td>
                  {row.values.map((val, idx) => (
                    <td key={idx} className="text-center px-4 py-3">
                      {val ? (
                        <span className="text-green-400 font-bold">✓</span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
