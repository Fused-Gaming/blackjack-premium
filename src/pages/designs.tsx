import { useState } from 'react';
import AnimationShowcase from '../components/kit/AnimationShowcase';
import NotificationGallery from '../components/kit/NotificationGallery';
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
  const [activeTab, setActiveTab] = useState('overview');
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
      name: 'Single Seat',
      description: 'Desktop view optimized for single player',
      className: 'single-seat',
    },
    {
      name: 'Multi-Seat',
      description: 'Up to 5 player positions around virtual table',
      className: 'multi-seat',
    },
    {
      name: 'Landscape',
      description: 'Wide displays with extended betting area',
      className: 'landscape',
    },
  ];

  const filteredTokens = designTokens.filter(
    token => token.category === selectedCategory
  );

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'animations', label: 'Animations' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'tokens', label: 'Design Tokens' },
    { id: 'colors', label: 'Colors' },
    { id: 'spacing', label: 'Spacing & Sizing' },
    { id: 'interface', label: 'Interface Components' },
    { id: 'components', label: 'Components' },
    { id: 'layouts', label: 'Layouts' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
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
                    Preview
                  </h3>
                  {layoutOptions.map(layout => (
                    <button
                      key={layout.className}
                      onClick={() => setSelectedLayout(layout.className)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedLayout === layout.className
                          ? 'bg-amber-400/20 text-amber-400'
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

                  {/* Playing Cards */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-2">Playing Cards</h3>
                    <p className="text-slate-300 mb-4">{components[3].description}</p>
                    <div className="bg-slate-900/50 rounded-lg p-6">
                      <div className="flex gap-4 justify-center flex-wrap">
                        {[
                          { rank: 'A', suit: '♠', color: 'text-black' },
                          { rank: 'K', suit: '♥', color: 'text-red-600' },
                          { rank: 'Q', suit: '♦', color: 'text-red-600' },
                          { rank: 'J', suit: '♣', color: 'text-black' },
                          { rank: '10', suit: '♠', color: 'text-black' },
                        ].map((card, idx) => (
                          <div
                            key={idx}
                            className="w-20 h-28 bg-white rounded-lg border-2 border-slate-300 flex flex-col items-center justify-center shadow-lg"
                          >
                            <div className={`text-lg font-bold ${card.color}`}>{card.rank}</div>
                            <div className={`text-2xl ${card.color}`}>{card.suit}</div>
                          </div>
                        ))}
                      </div>
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

            {/* Layouts Tab */}
            {activeTab === 'layouts' && (
              <section className="space-y-8 max-w-6xl">
                <h2 className="text-3xl font-bold text-amber-400">Layout Configurations</h2>

                <div className="space-y-6">
                  {layoutOptions.map(layout => (
                    <div
                      key={layout.className}
                      className={`border-2 rounded-lg p-6 transition-colors ${
                        selectedLayout === layout.className
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-slate-700 bg-slate-800/50'
                      }`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="w-full bg-slate-900/50 rounded border border-slate-600 overflow-hidden">
                          <img
                            src="/layouts/table.svg"
                            alt={`${layout.name} Layout Preview`}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        <div className="lg:col-span-2 space-y-3">
                          <h3 className="text-lg font-semibold text-amber-400">
                            {layout.name}
                          </h3>
                          <p className="text-slate-300">{layout.description}</p>
                          {selectedLayout === layout.className && (
                            <div className="mt-4 p-3 bg-amber-400/10 border border-amber-400/30 rounded text-sm text-amber-200">
                              ✓ Currently previewing this layout
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
