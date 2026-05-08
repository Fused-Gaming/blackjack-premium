# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased - 0.4.0]

### Planned

- Wallet integration for betting
- Social metadata optimization
- Game assets implementation
- Audio implementation and sound effects
- Multi-seat gameplay polish
- Game statistics tracking
- Settings persistence
- Social sharing features

## [0.3.0] - 2026-05-08

### Added

- **Landing Page Component** (`src/components/LandingPage.tsx`)
  - Premium ACE branding with interactive spade logo
  - Responsive design with mobile/tablet/desktop breakpoints
  - 8+ smooth animations using design tokens
  - Callback-based navigation to game interface
  
- **Landing Page Styling Enhancements** (`src/components/LandingPage.module.css`)
  - Complete animation suite (page entrance, logo glow, brandmark fade, button interactions)
  - Full design token integration (colors, typography, spacing, shadows, motion)
  - Responsive fluid scaling using CSS clamp() for all viewport sizes
  - Logo glow reduced by 15% for improved visual clarity (40px→34px, 60px→51px)
  - Proper margins and bleed areas based on screen resolution
  - Accessibility support (keyboard navigation, reduced motion)
  - WCAG AA color contrast compliance

- **App Navigation Integration**
  - Landing page as main entry point
  - State-based navigation between landing and game
  - Back button repositioned to top-right to prevent overlap with logo
  - Fixed viewport constraints to eliminate unwanted scrolling

- **Design Kit Tab System**
  - Fairness Receipt moved from separate `/fairness-receipt` page to Design Kit tab
  - Consolidated design documentation under `/designs` route
  - Improved information architecture

- **Open Graph Endpoint** 
  - `/public/og-preview.html`: Dedicated OG preview endpoint for rich social media sharing
  - Updated index.html with enhanced Open Graph and Twitter Card metadata
  - Added `/public/robots.txt` for proper search engine crawling

- **CSS Module Type Definitions** (`src/vite-env.d.ts`)
  - TypeScript declarations for CSS modules
  - Fixes build issues with module imports

- **Design Documentation**
  - `DESIGN-INVENTORY.md`: Complete catalog of design assets and tokens
  - `LANDING-PAGE-IMPLEMENTATION.md`: Comprehensive implementation guide

- Professionally designed Open Graph preview image at `public/social/og-vln-demo.svg` (1200×630).
- Standardized social metadata across Open Graph and Twitter/X tags in `index.html`.

### Fixed

- TypeScript CSS module import errors
- Vercel deployment build configuration
- ESLint violations (prefer-const, no-explicit-any)
- IP-address transitive dependency vulnerability (ip-address@10.1.0 → 10.2.0)
- pnpm-lock.yaml synchronization with package.json
- Security audit failures in CI/CD pipeline

## [0.2.0] - 2026-01-25

### Added

- Automatic milestone assignment for PRs based on labels and content
- Milestone validation check workflow (required for merging)
- Automated PR labeling system with content and file-based detection
- Branch protection check workflow
- Comprehensive branching strategy documentation (.github/BRANCHING.md)

### Fixed

- CodeQL workflow Node Package Verify Action configuration (npm vs pnpm)
- Node version parameter in CodeQL workflow (numeric version required)

### Changed

- Updated CONTRIBUTING.md to reference branching strategy
- Enhanced README.md with workflow automation documentation
- Completed all Milestone 1 (Foundation) tasks

## [0.1.0] - 2026-01-20

### Added (Initial Release)

- Initial project setup
- Project documentation (CLAUDE.md, README.md, CONTRIBUTING.md, SECURITY.md)
- Development roadmap and milestones
- CODER methodology structure
- Environment configuration

### Development Phase
- Core blackjack engine in progress
- UI components in progress
- Game state management in progress
