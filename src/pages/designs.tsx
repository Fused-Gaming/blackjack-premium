import { useState } from 'react';
import AnimationShowcase from '../components/kit/AnimationShowcase';
import NotificationGallery from '../components/kit/NotificationGallery';
import TableLayoutPreview from '../components/kit/TableLayoutPreview';
import Footer from '../components/Footer';
import { DESIGN_KIT_VERSION } from '../data/designKitVersion';
import { colorTokens } from '../data/colorTokens';
import { spacingTokens } from '../data/spacingTokens';
import { interfaceComponents } from '../data/interfaceComponents';

/**
 * Design System Explorer
 * Dynamic design kit for ACE Blackjack Premium with flexible navigation
 */


interface DesignToken {
  name: string;
  value: string;
  category: string;
}

interface ComponentPreview {
  name: string;
  description: string;
  code?: string;
}

interface LayoutOption {
  name: string;
  description: string;
  className: string;
}

export default function DesignsPage() {
  const [activeTab, setActiveTab] = useState('fairness-receipt');
  const [selectedCategory, setSelectedCategory] = useState('colors');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedLayout, setSelectedLayout] = useState('single-seat');

  const designTokens: DesignToken[] = [
    // Colors from mockup
    { name: 'Deep Navy', value: '#05080c', category: 'colors' },
    { name: 'Panel Dark', value: '#0d131a', category: 'colors' },
    { name: 'Casino Green', value: '#1f6d4e', category: 'colors' },
    { name: 'Deep Green', value: '#123e31', category: 'colors' },
    { name: 'Bright Gold', value: '#f5d77f', category: 'colors' },
    { name: 'Gold Brass', value: '#bf9a4c', category: 'colors' },
    { name: 'Bright Green', value: '#25ff9a', category: 'colors' },
    { name: 'Cyan', value: '#4ce8ff', category: 'colors' },
    { name: 'Bright Red', value: '#ff4769', category: 'colors' },
    { name: 'Purple', value: '#c78bff', category: 'colors' },
    { name: 'Gold White', value: '#fff7dc', category: 'colors' },
    { name: 'Muted Gray', value: '#9caaa5', category: 'colors' },

    // Typography
    { name: 'Display Font', value: 'Outfit', category: 'typography' },
    { name: 'Body Font', value: 'Inter', category: 'typography' },
    { name: 'Mono Font', value: 'JetBrains Mono', category: 'typography' },

    // Spacing
    { name: 'xs', value: '4px', category: 'spacing' },
    { name: 'sm', value: '8px', category: 'spacing' },
    { name: 'md', value: '16px', category: 'spacing' },
    { name: 'lg', value: '24px', category: 'spacing' },
    { name: 'xl', value: '32px', category: 'spacing' },
  ];

  const components: ComponentPreview[] = [
    {
      name: 'Chip Selector',
      description: 'Denominations: $1, $5, $10, $25, $50, $100, $500',
    },
    {
      name: 'Action Buttons',
      description: 'Hit, Stand, Double Down, Split, Insurance',
    },
    {
      name: 'Outcome States',
      description: 'Win, Loss, Push, Blackjack indicators',
    },
    {
      name: 'Playing Cards',
      description: '52 SVG playing cards with suit symbols',
    },
    {
      name: 'Multi-Seat Table',
      description: 'Support for up to 5 players on single table',
    },
  ];

  const layoutOptions: LayoutOption[] = [
    {
      name: '1 Player',
      description: 'Single player vs dealer. Linear flow, fast gameplay.',
      className: '1p-table',
    },
    {
      name: '2 Players',
      description: 'Two seats with parallel betting and sequential turns.',
      className: '2p-table',
    },
    {
      name: '3 Players',
      description: 'Three seats arranged horizontally with shared dealer.',
      className: '3p-table',
    },
    {
      name: '4 Players',
      description: 'Four seats in 2x2 grid with turn queue system.',
      className: '4p-table',
    },
    {
      name: '5 Players',
      description: 'Full table with five players and complete seat coverage.',
      className: '5p-table',
    },
  ];

  const filteredTokens = designTokens.filter(
    token => token.category === selectedCategory
  );

  const tabItems = [
    { id: 'fairness-receipt', label: 'Fairness Receipt' },
    { id: 'overview', label: 'Overview' },
    { id: 'brand-guidelines', label: 'Brand Guidelines' },
    { id: 'animations', label: 'Animations' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'socials', label: 'Socials' },
    { id: 'tokens', label: 'Design Tokens' },
    { id: 'colors', label: 'Colors' },
    { id: 'spacing', label: 'Spacing & Sizing' },
    { id: 'interface', label: 'Interface Components' },
    { id: 'components', label: 'Components' },
    { id: 'game-rules', label: 'Game Rules' },
    { id: 'game-tables', label: 'Game Tables' },
    { id: 'layouts', label: 'Layouts' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Header with Toggle */}
      <header className="border-b border-slate-700 bg-slate-900/95 backdrop-blur px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <div>
            <h1 className="text-2xl font-bold text-amber-400 font-display">
              ACE Blackjack Premium
            </h1>
            <p className="text-slate-400 text-sm">Design System Explorer</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-slate-800/50 border-r border-slate-700 overflow-y-auto transition-all duration-300 flex-shrink-0`}
        >
          {sidebarOpen && (
            <nav className="p-6 space-y-8">
              {/* Navigation Tabs */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase text-slate-400 px-2">
                  Sections
                </h3>
                {tabItems.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id === 'tokens') setSelectedCategory('colors');
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors capitalize ${
                      activeTab === tab.id
                        ? 'bg-amber-400/20 text-amber-400 border border-amber-400/50'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Category Filter for Tokens */}
              {activeTab === 'tokens' && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase text-slate-400 px-2">
                    Categories
                  </h3>
                  {['colors', 'typography', 'spacing'].map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                        selectedCategory === category
                          ? 'bg-amber-400/20 text-amber-400'
                          : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Filter for Colors Tab */}
              {activeTab === 'colors' && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase text-slate-400 px-2">
                    Categories
                  </h3>
                  {Object.keys(colorTokens).map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                        selectedCategory === category
                          ? 'bg-amber-400/20 text-amber-400'
                          : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Layout Selection */}
              {activeTab === 'layouts' && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase text-slate-400 px-2">
                    Player Count
                  </h3>
                  {layoutOptions.map(layout => (
                    <button
                      key={layout.className}
                      onClick={() => setSelectedLayout(layout.className)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedLayout === layout.className
                          ? 'bg-amber-400/20 text-amber-400 border border-amber-400/50'
                          : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {layout.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Design Info */}
              <div className="space-y-2 border-t border-slate-700 pt-6">
                <h3 className="text-xs font-semibold uppercase text-slate-400 px-2">
                  Info
                </h3>
                <div className="text-xs text-slate-400 px-4 py-3 bg-slate-900/50 rounded-lg">
                  <p className="font-semibold text-amber-400 mb-1">Design System v{DESIGN_KIT_VERSION}</p>
                  <p>Dynamic, extensible design kit ready for feature development</p>
                </div>
              </div>
            </nav>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-12 w-full">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <section className="space-y-12 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-amber-400">Core Design Philosophy</h2>
                    <p className="text-slate-300 leading-relaxed">
                      ACE Blackjack Premium combines "deep night sky over green felt, lit by amber gold."
                      The aesthetic achieves a sophisticated casino experience with carefully chosen colors,
                      typography, and component design.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-4">
                    <h3 className="text-xl font-semibold text-amber-400">Color Palette</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="w-full h-16 rounded bg-amber-400 mb-2"></div>
                        <p className="text-sm text-slate-400">Accent Gold #D4AF37</p>
                      </div>
                      <div>
                        <div className="w-full h-16 rounded bg-[#050A0F] border border-slate-700 mb-2"></div>
                        <p className="text-sm text-slate-400">Navy Dark #050A0F</p>
                      </div>
                      <div>
                        <div className="w-full h-16 rounded bg-[#165B33] mb-2"></div>
                        <p className="text-sm text-slate-400">Casino Green #165B33</p>
                      </div>
                      <div>
                        <div className="w-full h-16 rounded bg-green-500 mb-2"></div>
                        <p className="text-sm text-slate-400">Success #10B981</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-amber-400">Guiding Principles</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <span className="text-amber-400 font-semibold">Glyphs over Emoji</span>
                      <p className="text-slate-400 text-sm mt-1">Use ♠ ♥ ♦ ♣ for card suits</p>
                    </li>
                    <li className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <span className="text-amber-400 font-semibold">Tabular Numerals</span>
                      <p className="text-slate-400 text-sm mt-1">Display amounts as "$1,250" with consistent width</p>
                    </li>
                    <li className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <span className="text-amber-400 font-semibold">You Language</span>
                      <p className="text-slate-400 text-sm mt-1">Player-centric messaging throughout UI</p>
                    </li>
                    <li className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <span className="text-amber-400 font-semibold">Casino Floor Tone</span>
                      <p className="text-slate-400 text-sm mt-1">Confident, terse, professional voice</p>
                    </li>
                  </ul>
                </div>
              </section>
            )}

            {/* Fairness Receipt Tab - Sales Pitch */}
            {activeTab === 'fairness-receipt' && (
              <section className="space-y-12 max-w-6xl">
                {/* Hero Section */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-amber-400 font-semibold text-lg tracking-widest uppercase">
                      Proof-of-Play
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                      The house always proves.
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                      ACE turns every round into evidence. Transparent, auditable, verifiable blackjack where you never have to trust—you can always verify.
                    </p>
                  </div>

                  {/* Fairness Receipt Mockup */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-emerald-500/50 rounded-xl p-8 space-y-8">
                    {/* Receipt Header */}
                    <div className="space-y-2 border-b border-slate-700 pb-6">
                      <p className="text-sm text-slate-400 uppercase tracking-widest">Receipt ID</p>
                      <p className="text-4xl font-bold text-emerald-400">Hand #A9F2</p>
                      <p className="text-sm text-slate-400">Verification passed</p>
                    </div>

                    {/* Verification Checkpoints */}
                    <div className="space-y-4">
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Verification Checkpoints</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl text-emerald-400">✓</span>
                            <span className="text-slate-200 font-semibold">Shoe commitment locked</span>
                          </div>
                          <p className="text-xs text-slate-500 ml-7">Initial deck state hashed</p>
                        </div>
                        <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl text-emerald-400">✓</span>
                            <span className="text-slate-200 font-semibold">CSPRNG source recorded</span>
                          </div>
                          <p className="text-xs text-slate-500 ml-7">Cryptographic randomness seed</p>
                        </div>
                        <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl text-emerald-400">✓</span>
                            <span className="text-slate-200 font-semibold">Fisher–Yates shuffle path captured</span>
                          </div>
                          <p className="text-xs text-slate-500 ml-7">Complete algorithmic trace</p>
                        </div>
                        <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl text-emerald-400">✓</span>
                            <span className="text-slate-200 font-semibold">Player actions logged</span>
                          </div>
                          <p className="text-xs text-slate-500 ml-7">Every decision recorded</p>
                        </div>
                        <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl text-emerald-400">✓</span>
                            <span className="text-slate-200 font-semibold">Dealer rule execution replayable</span>
                          </div>
                          <p className="text-xs text-slate-500 ml-7">Deterministic game logic</p>
                        </div>
                        <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl text-emerald-400">✓</span>
                            <span className="text-slate-200 font-semibold">Payout math verified</span>
                          </div>
                          <p className="text-xs text-slate-500 ml-7">Transparent calculation</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-slate-700 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors text-sm">
                        Replay hand
                      </button>
                      <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors text-sm">
                        Open the ACE kit
                      </button>
                      <button className="border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm">
                        Inspect proof receipt
                      </button>
                      <button className="border border-emerald-500 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 font-bold py-3 px-4 rounded-lg transition-colors text-sm">
                        Play verified hand
                      </button>
                    </div>
                  </div>
                </div>

                {/* Why This Matters */}
                <div className="space-y-8 border-t border-slate-700 pt-12">
                  <h2 className="text-3xl font-bold text-amber-400">Why This Matters</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                      <h3 className="text-xl font-bold text-emerald-400">No Server Manipulation</h3>
                      <p className="text-slate-300 leading-relaxed">
                        Every shuffle is recorded. Every card drawn is logged. No way for outcomes to be altered after the fact.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                      <h3 className="text-xl font-bold text-emerald-400">Verifiable Fairness</h3>
                      <p className="text-slate-300 leading-relaxed">
                        Access your hand receipt anytime. Replay the entire deal. Verify the math. Check the shuffle. It's all yours.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                      <h3 className="text-xl font-bold text-emerald-400">Regulatory Compliance</h3>
                      <p className="text-slate-300 leading-relaxed">
                        Meet gaming authority requirements with auditable, verifiable game outcomes that stand up to scrutiny.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Foundation */}
                <div className="space-y-8 border-t border-slate-700 pt-12">
                  <h2 className="text-3xl font-bold text-amber-400">Technical Foundation</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
                      <p className="text-sm text-amber-400 font-semibold uppercase tracking-widest">Shuffle Algorithm</p>
                      <p className="text-2xl font-bold text-white">Fisher–Yates</p>
                      <p className="text-slate-300 text-sm">Cryptographically secure Fisher–Yates shuffle with CSPRNG entropy source ensures uniform distribution of card permutations.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
                      <p className="text-sm text-amber-400 font-semibold uppercase tracking-widest">Randomness Source</p>
                      <p className="text-2xl font-bold text-white">CSPRNG</p>
                      <p className="text-slate-300 text-sm">Cryptographically Secure Pseudo-Random Number Generator provides unpredictable entropy that cannot be replayed or predicted.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
                      <p className="text-sm text-amber-400 font-semibold uppercase tracking-widest">Audit Trail</p>
                      <p className="text-2xl font-bold text-white">Proof Log</p>
                      <p className="text-slate-300 text-sm">Complete game state at each decision point. Full card state visible to player. Deterministic replay with any CSPRNG seed.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
                      <p className="text-sm text-amber-400 font-semibold uppercase tracking-widest">Game Rules</p>
                      <p className="text-2xl font-bold text-white">Blackjack</p>
                      <p className="text-slate-300 text-sm">Standard Las Vegas rules. Dealer stands on 17. Push on 21. Transparent payout logic with no hidden modifiers.</p>
                    </div>
                  </div>
                </div>

                {/* Funding Opportunities - ACE Protocol */}
                <div className="space-y-8 border-t border-slate-700 pt-12">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-amber-400">Funding Opportunities</h2>
                    <p className="text-slate-300">ACE Protocol: Blockchain-Integrated Proof-of-Play Settlement Framework</p>
                  </div>

                  {/* Funding Request Overview */}
                  <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border-2 border-emerald-500/50 rounded-lg p-8 space-y-6">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="text-sm text-emerald-400 font-semibold uppercase tracking-widest mb-2">Total Funding Request</p>
                        <p className="text-5xl font-bold text-emerald-400">$350,000 USD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-2">Target Network</p>
                        <p className="text-2xl font-bold text-blue-400">Monad</p>
                      </div>
                    </div>

                    {/* Funding Allocation */}
                    <div className="space-y-3 border-t border-emerald-500/30 pt-6">
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Allocation by Category</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded">
                          <span className="text-slate-300">Smart Contract Engineering</span>
                          <span className="font-bold text-emerald-400">$110,000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded">
                          <span className="text-slate-300">Multiplayer Infrastructure</span>
                          <span className="font-bold text-blue-400">$65,000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded">
                          <span className="text-slate-300">Proof-of-Payout Verification</span>
                          <span className="font-bold text-purple-400">$55,000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded">
                          <span className="text-slate-300">Security Audits & Testing</span>
                          <span className="font-bold text-red-400">$45,000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded">
                          <span className="text-slate-300">UX & Wallet Integration</span>
                          <span className="font-bold text-cyan-400">$35,000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded">
                          <span className="text-slate-300">Testnet Incentives</span>
                          <span className="font-bold text-amber-400">$25,000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded">
                          <span className="text-slate-300">Infrastructure / DevOps</span>
                          <span className="font-bold text-slate-300">$15,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Protocol Objectives */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 border border-emerald-500/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-bold text-emerald-400">Deterministic Settlement</h3>
                      <p className="text-sm text-slate-300">Every outcome independently reproducible from public transaction hash, block metadata, and signed player actions.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-emerald-500/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-bold text-blue-400">Cryptographic Fairness</h3>
                      <p className="text-sm text-slate-300">No centralized authority may alter card sequencing, side-bet results, or payout calculations after execution commitment.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-emerald-500/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-bold text-purple-400">Replay Resistance</h3>
                      <p className="text-sm text-slate-300">Settlement derivation prevents duplicate execution, transaction replay, and manipulated entropy reuse.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-emerald-500/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-bold text-cyan-400">Low-Latency Multiplayer</h3>
                      <p className="text-sm text-slate-300">Casino-grade responsiveness with &lt;100ms local feedback and &lt;1s multiplayer synchronization.</p>
                    </div>
                  </div>

                  {/* Core Components */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-amber-400">Smart Contract Architecture</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 space-y-2">
                        <p className="font-bold text-emerald-400">Round Commitment</p>
                        <p className="text-xs text-slate-400">Commit player states, lock wagers, anchor entropy source</p>
                      </div>
                      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 space-y-2">
                        <p className="font-bold text-blue-400">Settlement Engine</p>
                        <p className="text-xs text-slate-400">Derive outcomes, validate bets, compute payouts</p>
                      </div>
                      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 space-y-2">
                        <p className="font-bold text-purple-400">Treasury Router</p>
                        <p className="text-xs text-slate-400">Distribute payouts, protect liquidity, handle jackpots</p>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-bold text-amber-400">Next Steps</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">✓</span>
                        <span>Review ACE Protocol specification (GitHub Issue #206)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">✓</span>
                        <span>Engage with funding partners (Monad, Game3 Foundation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">✓</span>
                        <span>Finalize smart contract specifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">✓</span>
                        <span>Begin testnet implementation and audits</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Brand Guidelines Tab */}
            {activeTab === 'brand-guidelines' && (
              <section className="space-y-12 max-w-6xl">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-amber-400">Brand Guidelines</h2>
                  <p className="text-slate-300 text-lg">The ACE card is the cornerstone of our brand identity — a premium, sophisticated playing card that represents excellence and prestige in blackjack gaming.</p>
                </div>

                {/* Primary Brand Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-8">
                    <h3 className="text-2xl font-semibold text-amber-400 mb-6">Primary Brand Card (1200×630)</h3>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-8 flex items-center justify-center min-h-96">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1200 630" className="max-w-full h-auto" style={{ maxWidth: '600px' }}>
                        <defs>
                          <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#1A1410"/>
                            <stop offset="50%" stopColor="#050A0F"/>
                            <stop offset="100%" stopColor="#000000"/>
                          </radialGradient>
                          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#FFF6CC"/>
                            <stop offset="20%" stopColor="#FBBF24"/>
                            <stop offset="45%" stopColor="#D79210"/>
                            <stop offset="75%" stopColor="#FFE08A"/>
                            <stop offset="100%" stopColor="#A96500"/>
                          </linearGradient>
                          <radialGradient id="goldInner" cx="50%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#FFF2B8" stopOpacity="0.9"/>
                            <stop offset="100%" stopColor="#D79210" stopOpacity="0.2"/>
                          </radialGradient>
                          <filter id="goldGlow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="8" result="blur"/>
                            <feMerge>
                              <feMergeNode in="blur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                          <filter id="noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
                            <feColorMatrix type="saturate" values="0"/>
                            <feComponentTransfer>
                              <feFuncA type="table" tableValues="0 0 0.04"/>
                            </feComponentTransfer>
                          </filter>
                        </defs>
                        <rect width="1200" height="630" fill="url(#bgGlow)"/>
                        <g transform="translate(600 315)">
                          <ellipse cx="0" cy="210" rx="260" ry="36" fill="#000" opacity="0.45"/>
                          <rect x="-160" y="-240" width="320" height="460" rx="28" fill="#0B0F14" stroke="url(#gold)" strokeWidth="3"/>
                          <rect x="-148" y="-228" width="296" height="436" rx="22" fill="none" stroke="url(#goldInner)" strokeWidth="1.2" opacity="0.6"/>
                          <g stroke="url(#gold)" strokeWidth="1.8" fill="none" opacity="0.9">
                            <path d="M-140 -210 h30 M-140 -210 v30"/>
                            <path d="M140 -210 h-30 M140 -210 v30"/>
                            <path d="M-140 190 h30 M-140 190 v-30"/>
                            <path d="M140 190 h-30 M140 190 v-30"/>
                          </g>
                          <g filter="url(#goldGlow)">
                            <text x="0" y="-40" textAnchor="middle" fontFamily="Georgia, serif" fontSize="140" fontWeight="700" fill="url(#gold)">♠</text>
                          </g>
                          <text x="0" y="70" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="64" fontWeight="900" letterSpacing="12" fill="url(#gold)">ACE</text>
                          <text x="0" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="700" letterSpacing="10" fill="#F8D981">BLACKJACK</text>
                          <g>
                            <line x1="-90" y1="150" x2="-30" y2="150" stroke="url(#gold)" strokeWidth="1.5"/>
                            <text x="0" y="155" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="800" letterSpacing="6" fill="#FBBF24">PREMIUM</text>
                            <line x1="30" y1="150" x2="90" y2="150" stroke="url(#gold)" strokeWidth="1.5"/>
                          </g>
                        </g>
                        <rect width="1200" height="630" filter="url(#noise)" opacity="0.15"/>
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-400 mb-2">Dimensions</h4>
                      <p className="text-sm text-slate-300">1200 × 630 px</p>
                      <p className="text-xs text-slate-400 mt-1">Open Graph standard for social media</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-400 mb-2">Primary Colors</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-amber-400 border border-slate-600"></div>
                          <span className="text-sm text-slate-300">#FBBF24 Premium Gold</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-[#050A0F] border border-slate-600"></div>
                          <span className="text-sm text-slate-300">#050A0F Deep Navy</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-400 mb-2">Usage</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>✓ Social media cards</li>
                        <li>✓ Marketing materials</li>
                        <li>✓ Open Graph tags</li>
                        <li>✓ Brand documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Brand Principles */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
                  <h3 className="text-2xl font-semibold text-amber-400">Card Brand Principles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-300">♠ Suit Symbol</h4>
                      <p className="text-sm text-slate-300">Spade suit with premium gold gradient glow. Always rendered with geometric precision and premium typography.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-300">ACE Typography</h4>
                      <p className="text-sm text-slate-300">Bold, uppercase, letter-spaced. Conveys strength, confidence, and casino expertise. Font: Outfit/Inter.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-300">BLACKJACK Subtitle</h4>
                      <p className="text-sm text-slate-300">Complementary text in bright gold. Identifies the game and reinforces the premium positioning.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-300">PREMIUM Badge</h4>
                      <p className="text-sm text-slate-300">Premium badge with decorative lines. Signals luxury, quality, and exclusivity in the offering.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-300">Dark Background</h4>
                      <p className="text-sm text-slate-300">Deep navy with radial glow creates depth and luxury. Ensures gold text stands out with maximum contrast.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-300">Grain Overlay</h4>
                      <p className="text-sm text-slate-300">Subtle noise texture adds sophistication and texture. Creates a premium, artisanal feel at any scale.</p>
                    </div>
                  </div>
                </div>

                {/* Export & Download */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-4">
                  <h3 className="text-2xl font-semibold text-amber-400">Download & Customization</h3>
                  <p className="text-slate-300">Edit the card design in the ACE SVG Editor with live preview, export as SVG or high-quality PNG, and customize colors, text, and styling.</p>
                  <a
                    href="/ace-svg-editor.html"
                    className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors"
                  >
                    Open ACE SVG Editor →
                  </a>
                </div>
              </section>
            )}

            {/* Animations Tab */}
            {activeTab === 'animations' && (
              <section className="space-y-8 max-w-6xl">
                <h2 className="text-3xl font-bold text-amber-400 mb-8">Animations & State Machine</h2>
                <AnimationShowcase />
              </section>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <section className="space-y-8 max-w-6xl">
                <h2 className="text-3xl font-bold text-amber-400 mb-8">Notifications & Outcome Indicators</h2>
                <NotificationGallery />
              </section>
            )}

            {/* Socials Tab */}
            {activeTab === 'socials' && (
              <section className="space-y-8 max-w-6xl">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-amber-400 mb-4">Official Socials</h2>
                    <p className="text-slate-300 mb-8">Connect with us on your favorite platforms. We're active on all major social media channels.</p>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
                    <h3 className="text-xl font-semibold text-amber-400 mb-6">Community Links</h3>
                    <Footer />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
                      <h4 className="text-lg font-semibold text-purple-300">Stay Updated</h4>
                      <p className="text-sm text-slate-300">Follow our social channels for the latest updates, announcements, and community news about ACE Blackjack Premium.</p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
                      <h4 className="text-lg font-semibold text-cyan-300">Join the Community</h4>
                      <p className="text-sm text-slate-300">Connect with other players and developers in our Discord server. Share strategies, report bugs, and collaborate on improvements.</p>
                    </div>
                  </div>
                </div>

                {/* Open Graph Standards Section */}
                <div className="border-t border-slate-700 pt-12 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-amber-400">Open Graph Standards</h2>
                    <p className="text-slate-300">Dynamic social media preview generation using ACE Card branding and design tokens.</p>
                  </div>

                  {/* OG Image Preview */}
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-amber-300">ACE Card Design Reference</h3>
                      <p className="text-slate-400 text-sm">Production OG image showing proper ACE branding with design tokens (1200×630)</p>
                    </div>

                    <div className="bg-slate-950 rounded-lg p-6 flex items-center justify-center min-h-96 border border-slate-700">
                      <img
                        src="/og-image.svg"
                        alt="ACE Premium Blackjack Open Graph Card"
                        className="max-w-full h-auto rounded"
                        style={{ maxHeight: '400px' }}
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">Width</p>
                        <p className="text-lg font-bold text-amber-300">1200px</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">Height</p>
                        <p className="text-lg font-bold text-amber-300">630px</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">Format</p>
                        <p className="text-lg font-bold text-amber-300">SVG</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">File Size</p>
                        <p className="text-lg font-bold text-amber-300">~5.3KB</p>
                      </div>
                    </div>

                    <div className="bg-slate-800/30 border border-amber-600/30 rounded-lg p-4">
                      <p className="text-sm text-slate-300">
                        <span className="text-amber-400 font-semibold">File Location:</span> <code className="bg-slate-900 px-2 py-1 rounded text-amber-200 font-mono text-xs ml-2">/public/og-image.svg</code>
                      </p>
                      <p className="text-sm text-slate-300 mt-2">
                        <span className="text-amber-400 font-semibold">Live URL:</span> <code className="bg-slate-900 px-2 py-1 rounded text-amber-200 font-mono text-xs ml-2">https://demo.vln.gg/og-image.svg</code>
                      </p>
                    </div>
                  </div>

                  {/* OG Image Specifications */}
                  <div className="bg-gradient-to-br from-amber-900/20 to-slate-900/20 border border-amber-600/40 rounded-lg p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-300 mb-4">OG Image Specifications</h3>
                      <div className="space-y-3 text-slate-300">
                        <p><span className="text-amber-400 font-semibold">Dimensions:</span> 1200×630 pixels (16:9 aspect ratio)</p>
                        <p><span className="text-amber-400 font-semibold">Format:</span> SVG (scalable, lightweight) or PNG (3x compression)</p>
                        <p><span className="text-amber-400 font-semibold">File Size:</span> SVG &lt;10KB optimal, PNG &lt;50KB</p>
                        <p><span className="text-amber-400 font-semibold">Color Space:</span> sRGB (web standard)</p>
                        <p><span className="text-amber-400 font-semibold">Safe Area:</span> Content within 60-1140px horizontal, 30-600px vertical</p>
                      </div>
                    </div>
                  </div>

                  {/* Design Token Framework */}
                  <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900/20 border border-cyan-600/40 rounded-lg p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-300 mb-4">Design Token Framework</h3>
                      <p className="text-slate-300 mb-4">Reference design located at <code className="bg-slate-900/50 px-2 py-1 rounded text-cyan-200 font-mono text-sm">/public/og-image.svg</code></p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold text-amber-300">Primary Colors</p>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p>• Background: #050A0F (slate-950)</p>
                            <p>• Accent: #FFC107 to #FFA500 (gold gradient)</p>
                            <p>• Text: #FFFFFF (white)</p>
                            <p>• Secondary: #E5E7EB (light gray)</p>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold text-amber-300">Typography</p>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p>• Display: Outfit (900 weight)</p>
                            <p>• Headlines: Outfit (700 weight)</p>
                            <p>• Body: Inter (500 weight)</p>
                            <p>• Letter spacing: -1.5px to 6px</p>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold text-amber-300">Card Elements</p>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p>• Shape: Rounded corners (40px radius)</p>
                            <p>• Border: 5px gold stroke with glow</p>
                            <p>• Center: Large spade symbol (♠)</p>
                            <p>• Branding: ACE BLACKJACK PREMIUM</p>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold text-amber-300">Effects</p>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p>• Glow: Gaussian blur 4px</p>
                            <p>• Shadow: Drop shadow 20px offset</p>
                            <p>• Pattern: Subtle horizontal lines</p>
                            <p>• Depth: Bottom gradient overlay</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Generation Guidelines */}
                  <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900/20 border border-emerald-600/40 rounded-lg p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-300 mb-4">Dynamic Generation Guidelines</h3>

                      <div className="space-y-6">
                        <div className="bg-slate-900/50 rounded-lg p-4">
                          <p className="font-semibold text-emerald-300 mb-3">SVG-Based Generation (Recommended)</p>
                          <p className="text-slate-300 text-sm mb-3">Generate OG images dynamically using SVG templates with design tokens:</p>
                          <ul className="space-y-2 text-sm text-slate-400 ml-4">
                            <li>✓ Use <code className="bg-slate-800 px-1 rounded text-emerald-200 font-mono">og-image.svg</code> as the base template</li>
                            <li>✓ Replace gradients with design token colors</li>
                            <li>✓ Inject dynamic text (title, description) into SVG</li>
                            <li>✓ Maintain consistent card layout and spade symbol</li>
                            <li>✓ Apply filters and effects from design system</li>
                          </ul>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4">
                          <p className="font-semibold text-emerald-300 mb-3">Image Generation Tools</p>
                          <p className="text-slate-300 text-sm mb-3">For server-side generation:</p>
                          <ul className="space-y-2 text-sm text-slate-400 ml-4">
                            <li>• Node.js: <code className="bg-slate-800 px-1 rounded text-emerald-200 font-mono">node-canvas</code> + <code className="bg-slate-800 px-1 rounded text-emerald-200 font-mono">svg2png</code></li>
                            <li>• Playwright: Headless browser for rendering</li>
                            <li>• Sharp: High-performance image processing</li>
                            <li>• API: Serverless functions (Vercel Edge Functions)</li>
                          </ul>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4">
                          <p className="font-semibold text-emerald-300 mb-3">Metadata Structure</p>
                          <p className="text-slate-300 text-sm mb-3">Standard Open Graph tags for all platforms:</p>
                          <div className="bg-slate-950 rounded p-3 font-mono text-xs text-slate-300 overflow-auto">
{`<meta property="og:type" content="website" />
<meta property="og:title" content="ACE — Premium Blackjack" />
<meta property="og:description" content="Provably fair blackjack..." />
<meta property="og:image" content="https://demo.vln.gg/og/image.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://demo.vln.gg/" />`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform-Specific Adjustments */}
                  <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/20 border border-purple-600/40 rounded-lg p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-300 mb-4">Platform-Specific Adjustments</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold text-purple-300">Twitter/X</p>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p>Use <code className="bg-slate-800 px-1 rounded font-mono">twitter:card</code> = "summary_large_image"</p>
                            <p>Dimensions: 1200×630 (same as OG)</p>
                            <p>Include <code className="bg-slate-800 px-1 rounded font-mono">twitter:creator</code> tag</p>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold text-purple-300">Facebook</p>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p>Include <code className="bg-slate-800 px-1 rounded font-mono">og:site_name</code></p>
                            <p>Set <code className="bg-slate-800 px-1 rounded font-mono">og:type</code> = "website"</p>
                            <p>Image alt text recommended</p>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold text-purple-300">Telegram</p>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p>Use <code className="bg-slate-800 px-1 rounded font-mono">telegram:</code> prefixed tags</p>
                            <p>Same 1200×630 image format</p>
                            <p>Optimized for mobile viewing</p>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold text-purple-300">Discord</p>
                          <div className="space-y-2 text-sm text-slate-300">
                            <p>Reads standard OG tags</p>
                            <p>Favors PNG over SVG for embeds</p>
                            <p>Max 1:1 to 16:9 aspect ratios</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Telegram Meta Tags Section */}
                  <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900/20 border border-cyan-600/40 rounded-lg p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-300 mb-4">Telegram Meta Tags for Link Endpoints</h3>
                      <p className="text-slate-300 mb-6">Telegram uses Open Graph tags to generate rich preview cards when links are shared. Proper configuration ensures your OG image displays correctly in Telegram chats.</p>

                      <div className="space-y-6">
                        {/* Tag Structure */}
                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                          <p className="font-semibold text-cyan-300 mb-3">Standard Telegram OG Tags</p>
                          <div className="bg-slate-950 rounded p-3 font-mono text-xs text-slate-300 overflow-auto">
{`<!-- Telegram uses standard OG tags -->
<meta property="og:title" content="ACE — Premium Blackjack" />
<meta property="og:description" content="Provably fair blackjack..." />
<meta property="og:image" content="https://demo.vln.gg/og-image.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://demo.vln.gg/" />
<meta property="og:type" content="website" />`}
                          </div>
                        </div>

                        {/* Telegram-Specific Tags */}
                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                          <p className="font-semibold text-cyan-300 mb-3">Optional Telegram-Specific Tags</p>
                          <div className="bg-slate-950 rounded p-3 font-mono text-xs text-slate-300 overflow-auto">
{`<!-- Optional: Telegram-specific tags for enhanced control -->
<meta property="telegram:title" content="ACE — Premium Blackjack" />
<meta property="telegram:description" content="Premium provably-fair blackjack..." />
<meta property="telegram:image" content="https://demo.vln.gg/og-image.svg" />
<meta property="telegram:url" content="https://demo.vln.gg/" />`}
                          </div>
                        </div>

                        {/* Implementation Notes */}
                        <div className="space-y-3">
                          <p className="font-semibold text-cyan-300">Implementation Notes</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                              <p className="font-semibold text-emerald-300">Image Format Support</p>
                              <ul className="space-y-1 text-sm text-slate-300">
                                <li>✓ SVG (recommended, scalable)</li>
                                <li>✓ PNG (best compatibility)</li>
                                <li>✓ JPEG (avoid, lower quality)</li>
                                <li>✓ WebP (newer Telegram clients)</li>
                              </ul>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                              <p className="font-semibold text-emerald-300">Telegram Preview Behavior</p>
                              <ul className="space-y-1 text-sm text-slate-300">
                                <li>• Fetches OG tags on link share</li>
                                <li>• Caches preview for 24 hours</li>
                                <li>• Respects 1200×630 dimensions</li>
                                <li>• Mobile-optimized display</li>
                              </ul>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                              <p className="font-semibold text-emerald-300">Title & Description</p>
                              <ul className="space-y-1 text-sm text-slate-300">
                                <li>• Title: max 200 characters</li>
                                <li>• Description: max 300 characters</li>
                                <li>• Keep text concise and engaging</li>
                                <li>• Include call-to-action hints</li>
                              </ul>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                              <p className="font-semibold text-emerald-300">Testing & Debugging</p>
                              <ul className="space-y-1 text-sm text-slate-300">
                                <li>• Telegram doesn't cache-bust easily</li>
                                <li>• Use different URL params for testing</li>
                                <li>• Clear Telegram app cache if needed</li>
                                <li>• Test in both groups and private chats</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Current Implementation */}
                        <div className="bg-slate-800/30 border border-cyan-600/30 rounded-lg p-4">
                          <p className="text-sm text-slate-300 mb-2">
                            <span className="text-cyan-400 font-semibold">Current Implementation:</span> Using standard OG tags with optional Telegram-specific tags for enhanced compatibility.
                          </p>
                          <p className="text-sm text-slate-300">
                            <span className="text-cyan-400 font-semibold">Image Location:</span> <code className="bg-slate-900 px-2 py-1 rounded text-cyan-200 font-mono text-xs ml-2">/public/og-image.svg</code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/20 border border-blue-600/40 rounded-lg p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">Best Practices</h3>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>Keep text hierarchy clear: Title → Subtitle → Body (max 3 text layers)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>Maintain 20px padding on all sides to avoid platform crop</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>Use SVG for branding consistency, PNG for compatibility</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>Test on all platforms using debuggers (Facebook, Twitter)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>Cache-bust dynamic images with URL parameters or timestamps</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>Always include descriptive <code className="bg-slate-800 px-1 rounded font-mono text-sm">og:image:alt</code> text</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>Ensure ACE branding (card, spade symbol, gold gradient) visible in all designs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Design Tokens Tab */}
            {activeTab === 'tokens' && (
              <section className="space-y-8 max-w-6xl">
                <div>
                  <h2 className="text-3xl font-bold text-amber-400 mb-8">Design Tokens</h2>

                  {/* Token Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTokens.map(token => (
                      <div
                        key={token.name}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-amber-400/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {token.category === 'colors' && (
                            <div
                              className="w-8 h-8 rounded border border-slate-600"
                              style={{ backgroundColor: token.value }}
                            ></div>
                          )}
                          <div>
                            <p className="font-semibold text-white">{token.name}</p>
                            <p className="text-sm text-slate-400">{token.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Components Tab */}
            {activeTab === 'components' && (
              <section className="space-y-8 max-w-6xl">
                <h2 className="text-3xl font-bold text-amber-400">Component Library</h2>

                <div className="space-y-6">
                  {/* Chip Selector */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-2">Chip Selector</h3>
                    <p className="text-slate-300 mb-4">{components[0].description}</p>
                    <div className="bg-slate-900/50 rounded-lg p-6">
                      <div className="flex flex-wrap gap-3 justify-center">
                        {['$1', '$5', '$10', '$25', '$50', '$100', '$500'].map((chip, idx) => (
                          <div
                            key={chip}
                            className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white cursor-pointer transition-transform hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#D4AF37'][idx]} 0%, ${['#DC2626', '#1E40AF', '#059669', '#D97706', '#6D28D9', '#BE185D', '#B8860B'][idx]} 100%)`,
                            }}
                          >
                            {chip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-2">Action Buttons</h3>
                    <p className="text-slate-300 mb-4">{components[1].description}</p>
                    <div className="bg-slate-900/50 rounded-lg p-6">
                      <div className="flex flex-wrap gap-3 justify-center">
                        {['Hit', 'Stand', 'Double', 'Split', 'Insurance'].map((action, idx) => (
                          <button
                            key={action}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                              idx === 0
                                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                : idx === 1
                                ? 'bg-red-600 hover:bg-red-500 text-white'
                                : idx === 2
                                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                                : idx === 3
                                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                                : 'bg-orange-600 hover:bg-orange-500 text-white'
                            }`}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Outcome States */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-2">Outcome States</h3>
                    <p className="text-slate-300 mb-4">{components[2].description}</p>
                    <div className="bg-slate-900/50 rounded-lg p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Win', icon: '✓', color: 'bg-green-900/30 border-green-500' },
                          { label: 'Loss', icon: '✗', color: 'bg-red-900/30 border-red-500' },
                          { label: 'Push', icon: '=', color: 'bg-yellow-900/30 border-yellow-500' },
                          { label: 'Blackjack', icon: '★', color: 'bg-emerald-900/30 border-emerald-500' },
                        ].map((outcome) => (
                          <div key={outcome.label} className={`${outcome.color} border rounded-lg p-4 text-center`}>
                            <div className="text-2xl mb-2">{outcome.icon}</div>
                            <p className="font-semibold text-white text-sm">{outcome.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Playing Cards - 52 Card Standard Deck */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-amber-400 mb-2">Standard 52-Card Deck</h3>
                      <p className="text-slate-300 mb-4">{components[3].description}</p>
                      <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 mb-6">
                        <p className="text-sm font-semibold text-emerald-300 mb-2">🎰 Provably Fair 8-Deck Shoe</p>
                        <p className="text-sm text-slate-300">Fresh shoe for each hand (416 cards) with cryptographically secure shuffle. Every outcome is verifiable—zero server manipulation, 100% transparent fairness.</p>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-6">
                      <div className="flex gap-2 justify-center flex-wrap">
                        {(() => {
                          const suits = [
                            { symbol: '♠', name: 'Spades', color: 'text-black' },
                            { symbol: '♥', name: 'Hearts', color: 'text-red-600' },
                            { symbol: '♦', name: 'Diamonds', color: 'text-red-600' },
                            { symbol: '♣', name: 'Clubs', color: 'text-black' }
                          ];
                          const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
                          const cards = [];

                          for (const suit of suits) {
                            for (const rank of ranks) {
                              cards.push({ rank, suit: suit.symbol, color: suit.color, suitName: suit.name });
                            }
                          }

                          return cards.map((card, idx) => (
                            <div
                              key={idx}
                              className="w-16 h-24 bg-white rounded-lg border-2 border-slate-300 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                              title={`${card.rank}${card.suitName}`}
                            >
                              <div className={`text-sm font-bold ${card.color}`}>{card.rank}</div>
                              <div className={`text-xl ${card.color}`}>{card.suit}</div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-400 flex justify-between">
                      <span>Total: 52 cards (4 suits × 13 ranks)</span>
                      <span>8-Deck Shoe: 416 cards</span>
                    </div>
                  </div>

                  {/* Multi-Seat Table */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-2">Multi-Seat Table</h3>
                    <p className="text-slate-300 mb-4">{components[4].description}</p>
                    <div className="bg-slate-900/50 rounded-lg p-6">
                      <div className="flex items-center justify-center gap-8 flex-wrap">
                        {['Seat 1', 'Seat 2', 'Seat 3', 'Seat 4', 'Seat 5'].map((seat, idx) => (
                          <div key={seat} className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-sm font-semibold text-amber-400">
                              {idx + 1}
                            </div>
                            <p className="text-xs text-slate-400">{seat}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Game Rules Tab */}
            {activeTab === 'game-rules' && (
              <section className="space-y-8 max-w-6xl">
                <h2 className="text-3xl font-bold text-amber-400">Blackjack Game Rules</h2>

                <div className="space-y-8">
                  {/* Objective */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-4">🎯 Objective</h3>
                    <p className="text-slate-300 mb-3">Beat the dealer's hand by getting as close to 21 as possible without going over. A hand that exceeds 21 is called a "bust" and you lose immediately.</p>
                  </div>

                  {/* Card Values */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-4">💳 Card Values</h3>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex justify-between">
                        <span><span className="text-amber-300 font-semibold">Number Cards (2-10)</span></span>
                        <span>Face value (2 = 2 points, 10 = 10 points)</span>
                      </li>
                      <li className="flex justify-between">
                        <span><span className="text-amber-300 font-semibold">Face Cards (J, Q, K)</span></span>
                        <span>10 points each</span>
                      </li>
                      <li className="flex justify-between">
                        <span><span className="text-amber-300 font-semibold">Ace (A)</span></span>
                        <span>1 or 11 points (player's choice)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Gameplay Flow */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-4">🎲 Gameplay Flow</h3>
                    <div className="space-y-4">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-amber-300 mb-2">1. Place Bet</p>
                        <p className="text-slate-300">Select your wager using the betting chips before the deal begins.</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-amber-300 mb-2">2. Deal Cards</p>
                        <p className="text-slate-300">Both player and dealer receive two cards each. Player cards are face-up; dealer shows one card face-up, one face-down.</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-amber-300 mb-2">3. Player Decision</p>
                        <p className="text-slate-300">Choose to Hit (draw another card), Stand (keep current hand), Double Down (double bet and draw one card), or Split (if you have two cards of the same value).</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-amber-300 mb-2">4. Dealer Play</p>
                        <p className="text-slate-300">Dealer reveals their hidden card and must hit on 16 or less, stand on 17 or more (hard) or 18+ (soft).</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-amber-300 mb-2">5. Outcome</p>
                        <p className="text-slate-300">Compare hands. Win if your total is higher than dealer's without busting. Push (tie) if totals match.</p>
                      </div>
                    </div>
                  </div>

                  {/* Player Actions */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-4">🎮 Player Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-blue-400 mb-2">Hit</p>
                        <p className="text-sm text-slate-300">Draw another card to increase your hand total.</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-red-400 mb-2">Stand</p>
                        <p className="text-sm text-slate-300">Keep your current hand and end your turn.</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-amber-400 mb-2">Double Down</p>
                        <p className="text-sm text-slate-300">Double your bet and receive exactly one more card.</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="font-semibold text-purple-400 mb-2">Split</p>
                        <p className="text-sm text-slate-300">Separate two identical-value cards into two separate hands.</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4 md:col-span-2">
                        <p className="font-semibold text-orange-400 mb-2">Insurance</p>
                        <p className="text-sm text-slate-300">Optional side bet (up to half your original bet) offered when dealer shows an Ace. Pays 2:1 if dealer has blackjack.</p>
                      </div>
                    </div>
                  </div>

                  {/* Winning Conditions */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-4">✓ Winning Conditions</h3>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 text-xl">✓</span>
                        <span><span className="text-amber-300 font-semibold">Natural Blackjack:</span> First two cards totaling 21 (Ace + 10-value card). Pays 3:2</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 text-xl">✓</span>
                        <span><span className="text-amber-300 font-semibold">Higher Hand:</span> Your total beats dealer's without busting. Pays 1:1</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 text-xl">✓</span>
                        <span><span className="text-amber-300 font-semibold">Dealer Bust:</span> Dealer exceeds 21 while your hand stands. You win automatically</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 text-xl">✓</span>
                        <span><span className="text-amber-300 font-semibold">Push (Tie):</span> Your hand equals dealer's hand. Bet is returned</span>
                      </li>
                    </ul>
                  </div>

                  {/* Deck Shoe */}
                  <div className="bg-emerald-900/20 border border-emerald-500/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">🎰 Provably Fair Shuffle System</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex justify-between"><span>Standard Deck Size:</span> <span className="text-amber-300">52 cards</span></li>
                      <li className="flex justify-between"><span>Shoe Configuration:</span> <span className="text-amber-300">8 decks (416 cards)</span></li>
                      <li className="flex justify-between"><span>Shuffle Timing:</span> <span className="text-amber-300">New shoe for each hand</span></li>
                      <li className="flex justify-between"><span>Shuffle Algorithm:</span> <span className="text-amber-300">Cryptographically secure randomization</span></li>
                      <li className="flex justify-between"><span>Fairness Verification:</span> <span className="text-amber-300">Player-verifiable game outcomes</span></li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-emerald-500/30">
                      <p className="text-xs text-emerald-200 leading-relaxed">Each hand begins with a fresh 8-deck shoe using provably fair shuffle mechanics. All randomization is cryptographically secure and independently verifiable, ensuring complete transparency and fairness with zero server-side manipulation.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Layouts Tab */}
            {activeTab === 'game-tables' && (
              <section>
                <TableLayoutPreview />
              </section>
            )}

            {activeTab === 'layouts' && (
              <section className="space-y-8 max-w-6xl">
                <div>
                  <h2 className="text-3xl font-bold text-amber-400 mb-2">Layout Configurations</h2>
                  <p className="text-slate-300">Interactive previews of ACE Blackjack tables for 1–5 players</p>
                </div>

                {/* Layout Selection */}
                <div className="flex gap-2 flex-wrap">
                  {layoutOptions.map(layout => (
                    <button
                      key={layout.className}
                      onClick={() => setSelectedLayout(layout.className)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        selectedLayout === layout.className
                          ? 'bg-amber-400 text-slate-900 font-semibold'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {layout.name}
                    </button>
                  ))}
                </div>

                {/* Active Layout Preview */}
                {layoutOptions.find(l => l.className === selectedLayout) && (
                  <div className="space-y-6">
                    {layoutOptions.map(layout =>
                      selectedLayout === layout.className && (
                        <div key={layout.className} className="space-y-6">
                          {/* Info Card */}
                          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                            <div>
                              <h3 className="text-2xl font-bold text-amber-400">{layout.name}</h3>
                              <p className="text-slate-300 mt-2">{layout.description}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                              <div>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Betting</p>
                                <p className="text-sm text-slate-200">Parallel across all seats</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Turns</p>
                                <p className="text-sm text-slate-200">{layout.className === '1p-table' ? 'N/A - Single player' : 'Sequential turn order'}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Settlement</p>
                                <p className="text-sm text-slate-200">Independent per seat</p>
                              </div>
                            </div>
                          </div>

                          {/* Table Preview */}
                          <div className="bg-gradient-to-b from-slate-900/50 to-slate-800/50 rounded-lg p-8 border border-slate-700">
                            <div
                              className="rounded-3xl p-8 flex flex-col items-center justify-center max-w-2xl mx-auto"
                              style={{
                                background: 'radial-gradient(ellipse at 50% 35%, #0F5132 0%, #0A3D26 45%, #073520 100%)',
                                boxShadow: '0 0 0 3px rgba(255,215,0,0.12), 0 0 0 5px rgba(0,0,0,0.4), inset 0 0 80px rgba(0,0,0,0.5)',
                              }}
                            >
                              {/* Dealer Zone */}
                              <div className="flex flex-col items-center gap-3 mb-8 p-6 rounded-lg border-2 border-amber-400/40 bg-amber-400/5">
                                <div className="text-sm font-mono text-amber-400 uppercase tracking-widest">Dealer</div>
                                <div className="flex gap-2">
                                  <div className="w-10 h-14 rounded border border-amber-400/60 bg-slate-900 flex items-center justify-center text-sm">🂠</div>
                                  <div className="w-10 h-14 rounded border border-slate-500 bg-slate-800 flex items-center justify-center text-xs opacity-50">🂠</div>
                                </div>
                                <div className="text-xs font-mono text-amber-300">Showing: 10</div>
                              </div>

                              {/* Player Seats Grid */}
                              <div className={`grid ${
                                layout.className === '1p-table' ? 'grid-cols-1' :
                                layout.className === '2p-table' ? 'grid-cols-2 gap-6' :
                                layout.className === '3p-table' ? 'grid-cols-3 gap-4' :
                                layout.className === '4p-table' ? 'grid-cols-2 gap-6' :
                                'grid-cols-5 gap-3'
                              } w-full`}>
                                {Array.from({ length: parseInt(layout.className[0]) }).map((_, idx) => (
                                  <div
                                    key={idx}
                                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-slate-600 bg-slate-700/30"
                                  >
                                    <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">seat{idx + 1}</div>
                                    <div className="flex gap-1">
                                      <div className="w-8 h-12 rounded border border-slate-500 bg-slate-800 flex items-center justify-center text-xs">🂡</div>
                                      <div className="w-8 h-12 rounded border border-slate-500 bg-slate-800 flex items-center justify-center text-xs">🂬</div>
                                    </div>
                                    <div className="text-xs font-mono text-slate-300">Total: 20</div>
                                    <div className="text-xs text-slate-400">{idx === 0 ? '● ACTIVE' : '○ WAITING'}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Feature Comparison */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-amber-400">Features by Layout</h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-700">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-800/50 border-b border-slate-700">
                        <tr>
                          <th className="text-left px-4 py-2 text-amber-400">Feature</th>
                          <th className="text-center px-2 py-2 text-amber-400">1P</th>
                          <th className="text-center px-2 py-2 text-amber-400">2P</th>
                          <th className="text-center px-2 py-2 text-amber-400">3P</th>
                          <th className="text-center px-2 py-2 text-amber-400">4P</th>
                          <th className="text-center px-2 py-2 text-amber-400">5P</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {['Parallel Betting', 'Sequential Turns', 'Side Bets', 'Split Hands', 'Responsive'].map(feature => (
                          <tr key={feature} className="bg-slate-900/30 hover:bg-slate-800/50">
                            <td className="px-4 py-2 text-slate-300">{feature}</td>
                            {[1, 2, 3, 4, 5].map(count => (
                              <td key={count} className="text-center px-2 py-2">
                                {(feature === 'Sequential Turns' && count === 1) ?
                                  <span className="text-slate-500">—</span> :
                                  <span className="text-green-400">✓</span>
                                }
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* Colors Tab */}
            {activeTab === 'colors' && (
              <section className="space-y-8 max-w-6xl">
                <h2 className="text-3xl font-bold text-amber-400">Color Palette</h2>
                <p className="text-slate-300">All color tokens from the 1920x1080 blackjack interface mockup</p>

                <div className="space-y-12">
                  {Object.entries(colorTokens).map(([category, colors]) => (
                    <div key={category}>
                      <h3 className="text-xl font-semibold text-amber-400 mb-6 capitalize">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {typeof colors === 'object' && Object.entries(colors).map(([key, colorData]: [string, { value: string; name?: string; use?: string }]) => (
                          <div key={key} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className="w-12 h-12 rounded border border-slate-600"
                                style={{ backgroundColor: colorData.value }}
                              ></div>
                              <div>
                                <p className="font-semibold text-white">{colorData.name || key}</p>
                                <p className="text-sm text-slate-400">{colorData.value}</p>
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">{colorData.use}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Spacing & Sizing Tab */}
            {activeTab === 'spacing' && (
              <section className="space-y-8 max-w-6xl">
                <h2 className="text-3xl font-bold text-amber-400">Spacing & Sizing Scale</h2>

                <div className="space-y-12">
                  {/* Spacing Scale */}
                  <div>
                    <h3 className="text-xl font-semibold text-amber-400 mb-6">Spacing Scale (4px base)</h3>
                    <div className="space-y-4">
                      {Object.entries(spacingTokens.spacing || {}).map(([key, data]: [string, { value: string; use: string }]) => (
                        <div key={key} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                          <div className="flex items-center gap-4">
                            <div
                              className="bg-amber-400"
                              style={{ width: data.value, height: '40px' }}
                            ></div>
                            <div>
                              <p className="font-semibold text-white capitalize">{key}</p>
                              <p className="text-sm text-slate-400">{data.value} - {data.use}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Border Radius */}
                  <div>
                    <h3 className="text-xl font-semibold text-amber-400 mb-6">Border Radius</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(spacingTokens.radius || {}).map(([key, data]: [string, { value: string; use: string }]) => (
                        <div key={key} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                          <div className="mb-3">
                            <div
                              className="w-full h-16 bg-gradient-to-br from-amber-400 to-amber-600"
                              style={{ borderRadius: data.value }}
                            ></div>
                          </div>
                          <p className="font-semibold text-white capitalize">{key}</p>
                          <p className="text-sm text-slate-400">{data.value} - {data.use}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Interface Components Tab */}
            {activeTab === 'interface' && (
              <section className="space-y-8 max-w-6xl">
                <h2 className="text-3xl font-bold text-amber-400">Interface Components</h2>
                <p className="text-slate-300">From 1920x1080 Blackjack Table Mockup</p>

                <div className="space-y-8">
                  {Object.entries(interfaceComponents).map(([key, componentData]) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const component = componentData as any;
                    return (
                    <div key={key} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-amber-400 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-slate-300 mb-4">{component.description}</p>

                      {component.position && (
                        <p className="text-sm text-slate-400 mb-2"><strong>Position:</strong> {component.position}</p>
                      )}

                      {component.content && typeof component.content === 'string' && (
                        <p className="text-sm text-slate-400 mb-2"><strong>Content:</strong> {component.content}</p>
                      )}

                      {(component.variants || component.panels || component.buttons) && (
                        <div className="mt-4 space-y-3">
                          {(component.variants || component.panels || component.buttons || []).map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (item: any, idx: number) => (
                            <div key={idx} className="bg-slate-900/50 rounded p-3 text-sm">
                              <p className="font-semibold text-amber-300">{item.name || item.label || `Item ${idx + 1}`}</p>
                              {item.content && <p className="text-slate-400 mt-1">{item.content}</p>}
                              {item.description && <p className="text-slate-400 mt-1">{item.description}</p>}
                              {item.color && <p className="text-slate-400 mt-1">Color: {item.color}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Footer */}
          <footer className="border-t border-slate-700 mt-20 py-12 bg-slate-900/50 text-center text-slate-400 flex-shrink-0">
            <p>ACE Blackjack Premium Design System v{DESIGN_KIT_VERSION}</p>
            <p className="text-sm mt-2">Dynamic design kit • Extensible architecture • Responsive layout</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
