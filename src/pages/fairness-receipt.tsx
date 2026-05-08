import { useState } from 'react';

const GitHubIcon = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.003 12.003 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { id: 'overview', label: 'ACE Protocol', icon: '⚡' },
  { id: 'fairness', label: 'Fairness Receipt', icon: '✓' },
  { id: 'architecture', label: 'Architecture', icon: '🏗️' },
  { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
];

export default function FairnessReceiptPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'fairness':
        return <FairnessTab />;
      case 'architecture':
        return <ArchitectureTab />;
      case 'roadmap':
        return <RoadmapTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Grid background effect - Monad aesthetic */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-transparent to-blue-500" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-500/20 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500">
                ACE Protocol
              </div>
              <span className="text-purple-400/60 text-sm">Powered by Monad</span>
            </div>
            <a
              href="https://github.com/Fused-Gaming/blackjack-premium"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400/60 hover:text-purple-300 transition-colors"
            >
              <GitHubIcon size={32} />
            </a>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'text-purple-300/70 hover:text-purple-300 hover:bg-purple-500/10'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">{renderContent()}</div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 bg-black/30 backdrop-blur-md mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-purple-400/60 text-sm">
          <p>ACE Protocol — Real-Time Proof-of-Play Infrastructure for Multiplayer Gaming</p>
          <p className="mt-2">Monad Momentum Proposal 2026</p>
        </div>
      </footer>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-12 backdrop-blur-sm">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 mb-4">
            ACE Protocol
          </h1>
          <p className="text-xl text-purple-200/80 mb-6 leading-relaxed">
            Real-Time Proof-of-Play Infrastructure for Multiplayer Gaming on Monad
          </p>
          <div className="inline-block px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/50">
            <p className="text-purple-300 font-medium">
              Deterministic Financial Settlement System Using Proof-of-Play
            </p>
          </div>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">The Problem</h2>
          <ul className="space-y-3 text-purple-200/70">
            <li className="flex gap-3">
              <span className="text-red-400">✗</span>
              <span>Transactions too slow for real-time gaming</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400">✗</span>
              <span>Wallet interactions interrupt gameplay</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400">✗</span>
              <span>Multiplayer synchronization breaks immersion</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400">✗</span>
              <span>Settlement delays destroy retention</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">Our Solution</h2>
          <ul className="space-y-3 text-purple-200/70">
            <li className="flex gap-3">
              <span className="text-green-400">✓</span>
              <span>Deterministic state proofs for instant settlement</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400">✓</span>
              <span>Seamless real-time multiplayer synchronization</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400">✓</span>
              <span>Replay-verifiable game outcomes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400">✓</span>
              <span>Provably fair RNG with on-chain verification</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Why Monad */}
      <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">Why Monad</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { requirement: 'Real-time multiplayer', monad: '✓' },
            { requirement: 'Parallel player actions', monad: '✓' },
            { requirement: 'High-frequency settlement', monad: '✓' },
            { requirement: 'Instant treasury routing', monad: '✓' },
            { requirement: 'Sub-second confirmation', monad: '✓' },
            { requirement: 'Consumer-grade UX', monad: '✓' },
          ].map((item) => (
            <div key={item.requirement} className="flex justify-between items-center p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
              <span className="text-purple-300">{item.requirement}</span>
              <span className="text-green-400 text-lg font-bold">{item.monad}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">Core Capabilities</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Multiplayer Seat Engine',
              description: 'Synchronized 1–5 player table architecture with deterministic turn sequencing',
            },
            {
              title: 'Proof-of-Play Validator',
              description: 'Generates replayable game proofs and deterministic action hashes',
            },
            {
              title: 'Settlement Router',
              description: 'Instant payouts with side-bet reconciliation and vault routing',
            },
            {
              title: 'Treasury Infrastructure',
              description: 'Table liquidity, payout balancing, and jackpot systems',
            },
            {
              title: 'Real-Time UX',
              description: 'Instant interactions with wallet abstraction and mobile-first design',
            },
            {
              title: 'Verifiable RNG',
              description: 'Commitment-based randomness with on-chain verification',
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-6 hover:border-purple-500/50 transition-all">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">{feature.title}</h3>
              <p className="text-sm text-purple-200/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FairnessTab() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
          Fairness Receipt
        </h2>
        <p className="text-purple-200/70 text-lg mb-8 leading-relaxed">
          Every game round in ACE Protocol generates a deterministic fairness receipt that proves:
        </p>

        <div className="grid gap-6">
          {[
            {
              icon: '🎲',
              title: 'RNG Commitment',
              description: 'Cryptographic commitment to randomness source established before deal',
            },
            {
              icon: '♠️',
              title: 'Card Distribution Proof',
              description: 'Verifiable proof of exact cards dealt from shuffled deck',
            },
            {
              icon: '⚡',
              title: 'Action Signatures',
              description: 'Timestamped player actions (hit/stand/double/split)',
            },
            {
              icon: '💰',
              title: 'Payout Verification',
              description: 'Deterministic payout calculation with all intermediate values',
            },
            {
              icon: '🔄',
              title: 'Replayability',
              description: 'Complete game state can be reconstructed and verified independently',
            },
            {
              icon: '📊',
              title: 'Treasury Settlement',
              description: 'Instant on-chain settlement with proof bundle',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <div className="text-3xl flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-purple-300">{item.title}</h3>
                <p className="text-sm text-purple-200/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-lg bg-green-500/5 border border-green-500/20">
          <h3 className="font-semibold text-green-300 mb-2">✓ Cryptographic Verification</h3>
          <p className="text-sm text-green-200/70">
            All fairness receipts include cryptographic signatures that can be verified by any third party without trusting our infrastructure. Each receipt is immutable and timestamped on-chain.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">Receipt Data Structure</h2>
        <div className="bg-slate-950 rounded-lg p-6 overflow-x-auto font-mono text-sm">
          <pre className="text-purple-300/80">
{`{
  "roundId": "0x7f3a9b2c...",
  "timestamp": 1715255100,
  "players": [
    { "address": "0x123...", "seat": 0, "bet": 1000 },
    { "address": "0x456...", "seat": 1, "bet": 2000 }
  ],
  "rngCommitment": "0xabcd1234...",
  "deck": {
    "seed": "0xdef5678...",
    "dealt": ["AS", "KH", "QD", "JC", "2S"],
    "proof": "0x9876fedc..."
  },
  "gameState": [
    { "player": 0, "action": "HIT", "timestamp": 1715255101 },
    { "player": 0, "action": "STAND", "timestamp": 1715255105 }
  ],
  "settlement": {
    "winnings": { "0": 2000, "1": -1000 },
    "treasury": 1000,
    "txHash": "0xaabbccdd..."
  },
  "signature": "0x..."
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function ArchitectureTab() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
          System Architecture
        </h2>

        <div className="space-y-6">
          {/* Execution Layer */}
          <div className="rounded-lg border border-purple-500/30 p-6 bg-purple-500/5">
            <h3 className="text-xl font-semibold text-purple-300 mb-4">Gameplay Execution Layer</h3>
            <div className="space-y-2 text-purple-200/70 font-mono text-sm">
              <div>Player Inputs ↓</div>
              <div>Deterministic State Engine ↓</div>
              <div>Proof-of-Play Generation ↓</div>
              <div>Monad Settlement Contracts ↓</div>
              <div>Treasury Reconciliation ↓</div>
              <div>Instant Wallet Settlement</div>
            </div>
          </div>

          {/* Components Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: '1. Multiplayer Seat Engine',
                items: ['Seat synchronization', 'Turn routing', 'Multiplayer state transitions', 'Latency masking', 'Dealer authority'],
              },
              {
                title: '2. Proof-of-Play Validator',
                items: ['Replayable game proofs', 'Deterministic action hashes', 'Payout verification', 'Settlement bundles'],
              },
              {
                title: '3. Settlement Router',
                items: ['Treasury accounting', 'Instant payouts', 'Side-bet reconciliation', 'Vault routing'],
              },
              {
                title: '4. Treasury Infrastructure',
                items: ['Table liquidity', 'Payout balancing', 'Tournament pools', 'Jackpot systems'],
              },
            ].map((component) => (
              <div key={component.title} className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-4">
                <h4 className="font-semibold text-purple-300 mb-3">{component.title}</h4>
                <ul className="space-y-1 text-sm text-purple-200/60">
                  {component.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-purple-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">Deterministic State Machine</h2>
        <div className="space-y-3">
          {['Idle', 'Betting', 'Dealing', 'PlayerTurn', 'DealerTurn', 'Settlement'].map((state, idx) => (
            <div key={state} className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium min-w-[120px]">
                {state}
              </div>
              {idx < 5 && <div className="text-purple-400">→</div>}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-purple-200/60">
          These states directly map to transaction batching, proof generation, settlement validation, and replay systems on Monad.
        </p>
      </div>
    </div>
  );
}

function RoadmapTab() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-purple-500/20 bg-black/30 p-8 backdrop-blur">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-8">
          Development Roadmap
        </h2>

        <div className="space-y-6">
          {[
            {
              phase: 'Phase 1',
              title: 'Monad Testnet Integration',
              status: 'Current Focus',
              items: [
                'Wallet integration',
                'Testnet settlements',
                'Proof-of-Play generation',
                'Single-player validation',
                'Deterministic replay systems',
              ],
              deliverables: ['Playable Monad testnet prototype', 'Wallet-connected gameplay', 'Settlement contract deployment', 'Proof-of-Play receipts'],
              color: 'from-blue-500 to-purple-500',
            },
            {
              phase: 'Phase 2',
              title: 'Multiplayer Synchronization',
              status: 'Planned Q3 2026',
              items: [
                'Synchronized 5-player tables',
                'Real-time seat routing',
                'Latency masking',
                'Multiplayer treasury routing',
                'Tournament architecture',
              ],
              deliverables: ['25,000+ simulated rounds', '<1s settlement confirmation', 'Stable synchronized multiplayer sessions'],
              color: 'from-purple-500 to-pink-500',
            },
            {
              phase: 'Phase 3',
              title: 'Treasury & Creator Systems',
              status: 'Planned Q4 2026',
              items: [
                'Creator-hosted tables',
                'Tournament pools',
                'Streaming integrations',
                'Programmable reward systems',
                'Treasury optimization',
              ],
              deliverables: [],
              color: 'from-pink-500 to-orange-500',
            },
            {
              phase: 'Phase 4',
              title: 'Proof-of-Play SDK',
              status: 'Long-term Vision',
              items: [
                'External game integrations',
                'PoP middleware APIs',
                'Tournament verification SDKs',
                'Replay validation systems',
                'Third-party settlement tooling',
              ],
              deliverables: [],
              color: 'from-orange-500 to-red-500',
            },
          ].map((phase) => (
            <div key={phase.phase} className="rounded-xl border border-purple-500/20 bg-black/30 p-8 hover:border-purple-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${phase.color} mb-1`}>
                    {phase.phase} — {phase.title}
                  </h3>
                  <p className="text-sm text-purple-400">{phase.status}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-300 font-semibold mb-2">Focus Areas:</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-purple-200/70">
                        <span className="text-purple-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {phase.deliverables.length > 0 && (
                  <div>
                    <h4 className="text-green-300 font-semibold mb-2">Key Deliverables:</h4>
                    <ul className="space-y-1">
                      {phase.deliverables.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-green-200/70">
                          <span className="text-green-400">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-green-500/20 bg-black/30 p-8 backdrop-blur">
        <h2 className="text-2xl font-bold text-green-300 mb-4">Monad Support Requested</h2>
        <ul className="space-y-2 text-green-200/70">
          <li className="flex gap-3">
            <span className="text-green-400">✓</span>
            <span>Smart contract development and optimization</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400">✓</span>
            <span>Proof-of-Play infrastructure design</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400">✓</span>
            <span>Treasury architecture review</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400">✓</span>
            <span>Multiplayer synchronization systems</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400">✓</span>
            <span>Testnet deployment support</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400">✓</span>
            <span>Ecosystem integrations and partnerships</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-400">✓</span>
            <span>Security review and audit assistance</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
