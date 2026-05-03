import { useState } from 'react';
import AnimationShowcase from '../components/kit/AnimationShowcase';
import NotificationGallery from '../components/kit/NotificationGallery';
import { DESIGN_KIT_VERSION } from '../data/designKitVersion';

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
    { id: 'tokens', label: 'Tokens' },
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
