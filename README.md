# Blackjack Game

A professional, secure, and engaging blackjack game inspired by modern crypto casino interfaces.

## Features

- **Classic Blackjack Gameplay**: Standard rules with dealer standing on 17
- **Multi-Seat Support**: Play up to 3 hands simultaneously
- **Insurance & Side Bets**: Full feature set for advanced players
- **Split & Double Down**: All standard blackjack actions supported
- **Provably Fair**: Transparent RNG for verifiable fairness
- **Modern UI**: Dark theme with smooth animations
- **Responsive Design**: Works on desktop and mobile devices

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

## Security

Report security issues to the project maintainer. See [SECURITY.md](SECURITY.md) for details.

## License

MIT License - See LICENSE file for details

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.
