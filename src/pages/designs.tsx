import { useState } from 'react';
import AnimationShowcase from '../components/kit/AnimationShowcase';
import NotificationGallery from '../components/kit/NotificationGallery';
import { DESIGN_KIT_VERSION } from '../data/designKitVersion';

/**
 * Design System Explorer
 * Dynamic design kit for ACE Blackjack Premium
 * Extensible for future feature additions
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

export default function DesignsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('colors');

  const designTokens: DesignToken[] = [
    // Brand Colors
    { name: 'Primary Gold', value: '#D4AF37', category: 'colors' },
    { name: 'Navy Dark', value: '#050A0F', category: 'colors' },
    { name: 'Casino Green', value: '#165B33', category: 'colors' },
    { name: 'Success Green', value: '#10B981', category: 'colors' },
    { name: 'Alert Red', value: '#EF4444', category: 'colors' },
    { name: 'Warning Yellow', value: '#FBBF24', category: 'colors' },

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

  const layouts = [
    {
      name: 'Single Seat',
      description: 'Desktop view optimized for single player',
    },
    {
      name: 'Multi-Seat',
      description: 'Up to 5 player positions around virtual table',
    },
    {
      name: 'Landscape',
      description: 'Wide displays with extended betting area',
    },
  ];

  const filteredTokens = designTokens.filter(
    token => token.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 sticky top-0 z-50 bg-slate-900/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold text-amber-400 font-display">
            ACE Blackjack Premium
          </h1>
          <p className="text-slate-400 mt-2">Design System Explorer</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-slate-700 bg-slate-800/50 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {['overview', 'animations', 'notifications', 'tokens', 'components', 'layouts'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'tokens') setSelectedCategory('colors');
                }}
                className={`py-4 px-2 border-b-2 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-amber-400 mb-8">Animations & State Machine</h2>
            <AnimationShowcase />
          </section>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-amber-400 mb-8">Notifications & Outcome Indicators</h2>
            <NotificationGallery />
          </section>
        )}

        {/* Design Tokens Tab */}
        {activeTab === 'tokens' && (
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-amber-400 mb-8">Design Tokens</h2>

              {/* Category Filter */}
              <div className="flex gap-3 mb-8 flex-wrap">
                {['colors', 'typography', 'spacing'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                      selectedCategory === category
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

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
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-amber-400">Component Library</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {components.map(component => (
                <div
                  key={component.name}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-400/50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">
                    {component.name}
                  </h3>
                  <p className="text-slate-300">{component.description}</p>
                  {component.code && (
                    <pre className="mt-4 text-xs bg-slate-900/50 p-3 rounded border border-slate-700 overflow-x-auto">
                      <code>{component.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Layouts Tab */}
        {activeTab === 'layouts' && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-amber-400">Layout Configurations</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {layouts.map(layout => (
                <div
                  key={layout.name}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-400/50 transition-colors"
                >
                  <div className="w-full h-32 bg-slate-700 rounded mb-4 border border-slate-600"></div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">
                    {layout.name}
                  </h3>
                  <p className="text-slate-300">{layout.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20 py-12 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>ACE Blackjack Premium Design System v{DESIGN_KIT_VERSION}</p>
          <p className="text-sm mt-2">Dynamic design kit • Extensible architecture • Ready for feature development</p>
        </div>
      </footer>
    </div>
  );
}
