# ACE Blackjack Premium

A professional, secure, and engaging blackjack game with premium branding, smooth animations, and transparent gameplay mechanics.

## Features

### Gameplay
- **Classic Blackjack Gameplay**: Standard rules with dealer standing on 17
- **Multi-Seat Support**: Play up to 3 hands simultaneously
- **Insurance & Side Bets**: Full feature set for advanced players
- **Split & Double Down**: All standard blackjack actions supported
- **Provably Fair**: Transparent RNG for verifiable fairness

### User Experience
- **Premium Landing Page**: Branded entry point with interactive animations
  - Responsive fluid scaling for all screen sizes
  - Optimized logo glow (15% reduction for visual clarity)
  - No unwanted scrolling across all devices
- **Dark Theme**: Modern design system with 161 design tokens
- **Smooth Animations**: 8+ custom animations using design tokens
- **Responsive Design**: Works on desktop, tablet, and mobile devices
  - Fluid CSS clamp() for seamless scaling
  - Proper margins and bleed areas based on resolution
  - Typography perfectly sized for any viewport
- **Social Sharing**: Open Graph endpoint with rich media previews
  - Dedicated OG preview at `/public/og-preview.html`
  - Enhanced Twitter Card metadata
  - Standardized metadata across all platforms
- **Accessibility**: WCAG AA compliant with keyboard navigation and reduced motion support

## Tech Stack

- React 18 + TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd blackjack

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

## Game Rules

- Dealer stands on 17
- Blackjack pays 3:2
- Insurance pays 2:1
- Double down allowed on any two cards
- Split allowed on pairs (max 1 split per hand)
- No surrender option

## Design System

The project includes a comprehensive design system with 161 design tokens organized by category:

### Color Palette
- **Brand**: Amber/Gold (#F59E0B, #FBBF24, #D97706)
- **Surfaces**: Dark navy backgrounds (#050A0F, #0D1B2A, #162840)
- **Felt**: Casino green (#0A3D26) with variations
- **Outcomes**: Win (green), Loss (red), Push (gold)
- **Chips**: 7 denominations with unique colors

### Typography
- **Display**: Outfit font (600-900 weights)
- **Body**: Inter font (400-900 weights)
- **Mono**: JetBrains Mono for code and labels
- **Responsive scale**: clamp() for fluid sizing

### Key Features
- CSS custom properties in `src/index.css`
- Tailwind CSS integration
- Motion presets (fast: 150ms, base: 250ms, slow: 500ms)
- Shadow and elevation system
- Responsive spacing scale (4px base unit)

### Documentation
- **`src/DESIGN-TOKENS.md`**: Complete token reference
- **`DESIGN-INVENTORY.md`**: Design asset inventory
- **`LANDING-PAGE-IMPLEMENTATION.md`**: Landing page guide

## Social Preview Metadata

The root endpoint (`https://demo.vln.gg/`) is configured with standardized social metadata for Open Graph and Twitter/X previews.

- **OG image**: `/social/og-vln-demo.svg` (1200×630)
- **Shared title**: `VLN Demo | Provably Fair Engine`
- **Shared description**: `Security-grade live interactive demo for transparent RNG and provably fair gameplay.`

To update social preview branding, replace `public/social/og-vln-demo.svg` and keep the same dimensions.

## Development

```bash
# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/      # React components
├── engine/          # Game logic and rules
├── hooks/           # Custom React hooks
├── store/           # Zustand state management
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── assets/          # Images, sounds, icons
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

### Branching Strategy

This project follows a structured branching workflow:

- **`master`**: Production-ready code (protected)
- **`development`**: Integration branch for features (protected)
- **Feature branches**: `feature/*`, `fix/*`, `docs/*`, etc.

See [.github/BRANCHING.md](.github/BRANCHING.md) for detailed workflow and guidelines.

### Automated Workflows

The repository includes automated workflows to maintain code quality and organization:

- **Auto-Label**: Automatically labels PRs based on content and file changes
- **Milestone Assignment**: Auto-assigns PRs to appropriate project milestones
- **Milestone Validation**: Ensures all PRs have milestones before merging (required check)
- **Branch Protection**: Validates PR branch naming and merge targets
- **CodeQL Analysis**: Security and code quality scanning

## Security

Report security issues to the project maintainer. See [SECURITY.md](SECURITY.md) for details.

## License

MIT License - See LICENSE file for details

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## Contributing

We're looking for talented engineers to help build the future of provably fair gaming! If you're interested in contributing to this project, please reach out to **ace21@vln.gg** or see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
