# Architecture Documentation

## Technology Stack

### Core
- **React 18**: UI framework with concurrent features
- **TypeScript 5**: Type-safe JavaScript
- **Vite 5**: Build tool and dev server

### Styling
- **Tailwind CSS 3**: Utility-first CSS framework
- **PostCSS**: CSS processing

### State Management
- **Zustand**: Lightweight state management
- **React hooks**: Local component state

### Animation
- **Framer Motion**: Declarative animations
- **CSS transitions**: Simple transitions

### Testing
- **Vitest**: Unit testing framework
- **React Testing Library**: Component testing
- **@testing-library/user-event**: User interaction simulation

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript ESLint**: TS-specific linting

## Project Structure

```
blackjack/
├── public/                  # Static assets
│   ├── cards/              # Card images (SVG)
│   ├── sounds/             # Sound effects (MP3/WAV)
│   └── favicon.ico
│
├── src/
│   ├── main.tsx            # Application entry point
│   ├── App.tsx             # Root component
│   ├── index.css           # Global styles
│   │
│   ├── components/         # React components
│   │   ├── game/          # Game-specific components
│   │   │   ├── Card.tsx
│   │   │   ├── Deck.tsx
│   │   │   ├── Hand.tsx
│   │   │   ├── Table.tsx
│   │   │   └── GameArea.tsx
│   │   │
│   │   ├── controls/      # Control components
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── BetControls.tsx
│   │   │   ├── ChipSelector.tsx
│   │   │   └── SeatSelector.tsx
│   │   │
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   │
│   │   └── layout/        # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   │
│   ├── engine/             # Game logic (pure functions)
│   │   ├── types.ts       # Core types and interfaces
│   │   ├── deck.ts        # Deck management
│   │   ├── hand.ts        # Hand evaluation
│   │   ├── dealer.ts      # Dealer AI
│   │   ├── betting.ts     # Betting logic
│   │   ├── payouts.ts     # Payout calculations
│   │   ├── rules.ts       # Game rules
│   │   └── shuffle.ts     # Shuffle algorithm (provably fair)
│   │
│   ├── store/              # State management
│   │   ├── gameStore.ts   # Main game state
│   │   ├── balanceStore.ts # Balance and betting
│   │   └── settingsStore.ts # User settings
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useGame.ts     # Game state hook
│   │   ├── useSound.ts    # Sound effects hook
│   │   ├── useAnimation.ts # Animation utilities
│   │   └── useBalance.ts  # Balance management
│   │
│   ├── utils/              # Utility functions
│   │   ├── formatters.ts  # Number/string formatting
│   │   ├── validators.ts  # Input validation
│   │   ├── constants.ts   # Game constants
│   │   └── helpers.ts     # General helpers
│   │
│   ├── types/              # TypeScript types
│   │   ├── game.ts        # Game-related types
│   │   ├── ui.ts          # UI-related types
│   │   └── index.ts       # Type exports
│   │
│   └── assets/             # Asset imports
│       ├── sounds.ts      # Sound file imports
│       └── images.ts      # Image imports
│
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   ├── components/        # Component tests
│   └── integration/       # Integration tests
│
├── docs/                   # Documentation
│   ├── milestones.json
│   ├── game-rules.md
│   ├── architecture.md
│   ├── commit-checklist.md
│   └── merge-checklist.md
│
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── CLAUDE.md
├── ROADMAP.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── SECURITY.md
```

## Core Modules

### Game Engine (`/src/engine/`)
Pure TypeScript functions with no React dependencies. Handles all game logic.

**Key Responsibilities:**
- Deck creation and shuffling
- Hand evaluation and scoring
- Dealer AI decision making
- Bet validation and payout calculation
- Game rule enforcement

**Design Principles:**
- Pure functions (no side effects)
- Fully testable
- No UI dependencies
- Deterministic outcomes from same inputs

### Components (`/src/components/`)
React components organized by feature and responsibility.

**Organization:**
- `game/`: Core game visualization (cards, table, hands)
- `controls/`: User interaction (buttons, bet controls)
- `ui/`: Reusable UI primitives
- `layout/`: App layout and structure

**Design Principles:**
- Functional components with hooks
- Props for data, callbacks for actions
- Composition over inheritance
- Single responsibility

### State Management (`/src/store/`)
Zustand stores for global state management.

**Stores:**
- `gameStore`: Game state, hands, deck, phase
- `balanceStore`: Player balance, bets, history
- `settingsStore`: User preferences, sound, theme

**Design Principles:**
- Minimal state
- Derived values computed
- Actions for state updates
- Selectors for reading

## Data Flow

```
User Interaction
    ↓
Component Event Handler
    ↓
Store Action
    ↓
Game Engine Function
    ↓
State Update
    ↓
Component Re-render
    ↓
UI Update
```

## Component Hierarchy

```
App
├── Header
│   ├── Balance Display
│   └── Settings Button
│
├── GameArea
│   ├── Table
│   │   ├── DealerHand
│   │   │   └── Card[]
│   │   │
│   │   └── PlayerSeats[]
│   │       ├── Hand
│   │       │   └── Card[]
│   │       └── BetArea
│   │
│   ├── ActionButtons
│   │   ├── HitButton
│   │   ├── StandButton
│   │   ├── DoubleButton
│   │   └── SplitButton
│   │
│   └── BetControls
│       ├── ChipSelector
│       ├── BetAmount
│       └── SeatSelector
│
└── Footer
    ├── GameInfo
    └── Rules Link
```

## State Schema

### Game Store
```typescript
{
  phase: 'idle' | 'betting' | 'dealing' | 'playing' | 'dealerTurn' | 'complete',
  deck: Card[],
  dealerHand: Card[],
  playerSeats: {
    [seatId: string]: {
      hands: Hand[],
      bet: number,
      active: boolean
    }
  },
  currentSeat: string | null,
  currentHandIndex: number,
  insuranceBets: Map<string, number>
}
```

### Balance Store
```typescript
{
  balance: number,
  currentBets: Map<string, number>,
  history: GameResult[]
}
```

### Settings Store
```typescript
{
  soundEnabled: boolean,
  musicEnabled: boolean,
  animationSpeed: 'slow' | 'normal' | 'fast',
  theme: 'dark' | 'light'
}
```

## Key Algorithms

### Card Shuffling (Fisher-Yates)
```typescript
function shuffle(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

### Hand Evaluation
```typescript
function evaluateHand(cards: Card[]): { value: number, isSoft: boolean } {
  let value = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.rank === 'A') {
      aces++;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  }

  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return { value, isSoft: aces > 0 };
}
```

## Performance Considerations

### Optimization Strategies
1. **Memoization**: React.memo for expensive components
2. **Lazy Loading**: Code splitting for non-critical features
3. **Virtual DOM**: Let React handle efficient updates
4. **CSS Animations**: Use CSS/Framer Motion instead of JS
5. **Event Delegation**: Minimize event listeners

### Bundle Size
- Target: <500KB total
- Code splitting by route
- Tree shaking enabled
- Minification in production

## Security

### Random Number Generation
- Use `crypto.getRandomValues()` for shuffling
- Provably fair algorithm
- Client-side only (no server manipulation)

### Input Validation
- Validate all user inputs
- Sanitize bet amounts
- Prevent invalid game states

### XSS Prevention
- React's built-in escaping
- No `dangerouslySetInnerHTML`
- Validated props

## Testing Strategy

### Unit Tests
- Game engine functions
- Utility functions
- Pure logic

### Component Tests
- Render tests
- User interaction
- Props and state

### Integration Tests
- Full game flow
- Multi-hand scenarios
- Edge cases

### Test Coverage Goals
- Overall: >80%
- Game engine: >95%
- Components: >70%
- Utilities: >90%

## Build & Deployment

### Development
```bash
npm run dev        # Start dev server
npm run test       # Run tests
npm run lint       # Lint code
```

### Production
```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

### Environment Variables
- `VITE_APP_NAME`: App name
- `VITE_INITIAL_BALANCE`: Starting balance
- `VITE_MIN_BET`: Minimum bet
- `VITE_MAX_BET`: Maximum bet
- `VITE_DECK_COUNT`: Number of decks

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Modern browsers with ES2020+ support required.
