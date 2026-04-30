# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Landing Page Component** (`src/components/LandingPage.tsx`)
  - Premium ACE branding with interactive spade logo
  - Responsive design with mobile/tablet/desktop breakpoints
  - 8+ smooth animations using design tokens
  - Callback-based navigation to game interface
  
- **Landing Page Styling** (`src/components/LandingPage.module.css`)
  - Complete animation suite (page entrance, logo glow, brandmark fade, button interactions)
  - Full design token integration (colors, typography, spacing, shadows, motion)
  - Accessibility support (keyboard navigation, reduced motion)
  - WCAG AA color contrast compliance

- **App Navigation Integration**
  - Landing page as main entry point
  - State-based navigation between landing and game
  - "Back to Home" button on game interface

- **CSS Module Type Definitions** (`src/vite-env.d.ts`)
  - TypeScript declarations for CSS modules
  - Fixes build issues with module imports

- **Design Documentation**
  - `DESIGN-INVENTORY.md`: Complete catalog of design assets and tokens
  - `LANDING-PAGE-IMPLEMENTATION.md`: Comprehensive implementation guide

- Added a professionally designed Open Graph preview image for `https://demo.vln.gg/social/og-vln-demo.svg`.
- Standardized root endpoint social metadata across Open Graph and Twitter/X tags in `index.html`.

### Fixed

- TypeScript CSS module import errors
- Vercel deployment build configuration

### Planned

- Multi-seat gameplay (up to 3 seats)
- Side bet options
- Sound effects and music
- Additional animation polish
- Game statistics tracking
- Settings persistence
- Social sharing features

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
