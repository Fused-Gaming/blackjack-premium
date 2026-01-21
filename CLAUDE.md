# CLAUDE.md - AI Development Guide

## Project Overview
**Blackjack Game Clone** - A professional, secure, and engaging blackjack game replicating the Thrill Casino blackjack interface.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

## Project Structure
```
blackjack/
├── src/
│   ├── components/      # React components
│   ├── engine/          # Game logic and rules
│   ├── hooks/           # Custom React hooks
│   ├── store/           # State management
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── assets/          # Images, sounds, etc.
├── docs/                # Documentation
├── public/              # Static assets
└── tests/               # Test files
```

## Key Features to Implement
1. **Core Blackjack Engine**
   - Standard blackjack rules (dealer stands on 17)
   - Card deck management with shuffle
   - Hand evaluation and scoring
   - Insurance and side bets
   - Split and double down logic

2. **User Interface**
   - Dark theme matching original
   - Animated card dealing
   - Responsive design
   - Multi-seat support (up to 3 seats)
   - Bet amount controls with presets

3. **Game Flow**
   - Place bet phase
   - Deal cards phase
   - Player decision phase (Hit/Stand/Double/Split)
   - Dealer play phase
   - Payout calculation phase

4. **Security & Fair Play**
   - Provably fair RNG
   - No server-side manipulation
   - Transparent game outcomes

## Development Approach
This project follows the **CODER methodology**:
- **C**onfigure: Set up project structure, docs, version control
- **O**utline: Create detailed plans and milestones
- **D**eploy: Build in parallel with modular components
- **E**xtend: Add automation and testing
- **R**eview: Verify functionality and security

## Code Standards
- Use TypeScript strict mode
- Follow React best practices (hooks, functional components)
- Write self-documenting code with clear naming
- Add comments only for complex logic
- Keep functions small and focused
- Use composition over inheritance

## Testing Strategy
- Unit tests for game engine logic
- Component tests for UI elements
- Integration tests for game flow
- Manual testing for UX and animations

## Current Status
Version: 0.1.0 (Initial Setup)
Last Updated: 2026-01-20

## Next Steps
1. Initialize React + TypeScript project
2. Set up Tailwind CSS and dependencies
3. Create card components and deck logic
4. Implement game engine
5. Build UI components
6. Add animations and polish
7. Local testing and iteration
