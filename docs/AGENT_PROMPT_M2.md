# Universal Agent Prompt: Milestone 2 - Game Engine Development

## Project Context

You are working on the **Blackjack Premium** project, a professional, secure, and engaging blackjack game that replicates the Thrill Casino experience with modern web technologies.

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Testing**: Vitest + React Testing Library
- **Provably Fair**: ProbablyFair Verifiability Layer (PF-VL-1.0)

### Repository Structure
```
blackjack-premium/
├── src/
│   ├── engine/          # Game logic (deck, hand, payouts, etc.)
│   ├── components/      # React components
│   │   ├── game/       # Game-specific components (Card, Hand, Table)
│   │   ├── controls/   # Control components (ActionButtons, BetControls)
│   │   └── ui/         # Reusable UI components (Chip, etc.)
│   ├── types/          # TypeScript type definitions
│   ├── tests/          # Test utilities and mocks
│   └── main.tsx        # Application entry point
├── docs/               # Documentation
├── .github/workflows/  # CI/CD workflows
└── [config files]
```

## Milestone 2 Goals

**Objective**: Implement core blackjack game logic with cryptographically verifiable fairness.

### Key Requirements
1. **Provably Fair**: All RNG operations must use ProbablyFair Verifiability Layer (PF-VL-1.0)
2. **Type Safety**: Full TypeScript coverage with proper type definitions
3. **Test Coverage**: Minimum 80% coverage for all game logic
4. **Documentation**: Clear JSDoc comments for all public APIs
5. **Performance**: Optimized algorithms (O(n) or better where possible)
6. **Security**: No exploits, proper validation of all inputs

## Task-Specific Instructions

### General Development Workflow
1. **Branch**: Work on `feat/M2-T{N}-{Task-Name}` (already created)
2. **Commit**: Make atomic commits with clear messages
3. **Test**: Write tests FIRST (TDD approach preferred)
4. **Document**: Add JSDoc comments to all functions/interfaces
5. **PR**: Create pull request to `development` branch when ready
6. **Review**: Ensure CI/CD passes before merging

### Code Standards

#### TypeScript
- Use strict mode (already configured)
- No `any` types unless absolutely necessary
- Prefer interfaces over types for object shapes
- Use type guards for runtime type checking

#### Testing
```typescript
// Example test structure
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
  it('should handle expected case', () => {
    // Arrange
    const input = setupInput();

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe(expectedValue);
  });

  it('should handle edge case', () => {
    // Test edge cases
  });
});
```

#### File Organization
- One feature per file
- Export only what's needed
- Keep files under 300 lines
- Co-locate tests (`__tests__` directory or `.test.ts` suffix)

### ProbablyFair Integration Guidelines

When implementing RNG-based features (shuffling, card dealing), follow these steps:

1. **Install Dependencies**
   ```bash
   npm install @probablyfair/sdk
   # or appropriate pf-bindings package
   ```

2. **Import and Initialize**
   ```typescript
   import { ProbablyFair } from '@probablyfair/sdk';

   const pf = new ProbablyFair({
     // Configuration
   });
   ```

3. **Generate Verifiable Random**
   ```typescript
   const { value, proof } = await pf.generateRandom({
     min: 0,
     max: 51,
     seed: userSeed,
   });
   ```

4. **Provide Verification**
   - Store proof data
   - Expose verification endpoint/function
   - Document verification process

### Task-Specific Guidelines

#### M2-T1: Card and Deck Models
- Define `Card` interface: `{ suit: Suit, rank: Rank, faceUp: boolean }`
- Define `Deck` as `Card[]`
- Create `createDeck()`, `createShoe(deckCount)` utilities
- Keep it simple - no shuffling logic here

#### M2-T2: ProbablyFair Shuffle Algorithm
- Research ProbablyFair SDK documentation
- Implement Fisher-Yates shuffle with PF-VL-1.0
- Create seed generation utilities
- Provide verification functions
- **Critical**: Ensure cryptographic security

#### M2-T3: Hand Evaluation Logic
- Calculate hand value (Ace = 1 or 11)
- Detect soft/hard hands
- Handle edge cases (multiple Aces)
- Compare hands (player vs dealer)

#### M2-T4: Dealer AI Logic
- Stand on 17+ (configurable for soft 17 rule)
- Automated play sequence
- Decision logging for debugging

#### M2-T5: Betting System
- Validate bets (min/max limits)
- Track balance changes
- Handle edge cases (insufficient funds)

#### M2-T6: Insurance Logic
- Offer when dealer shows Ace
- Validate insurance bet (≤ half of original bet)
- Calculate insurance payouts

#### M2-T7: Split Hand Logic
- Allow splits on pairs
- Handle split Aces rules
- Manage multiple hands

#### M2-T8: Double Down Logic
- Allow on first two cards
- Double bet, receive one card
- Restrict actions after double

#### M2-T9: Payout Calculations
- Blackjack: 3:2 payout
- Regular win: 1:1 payout
- Insurance: 2:1 payout
- Handle edge cases

#### M2-T10: Unit Tests
- Achieve >80% coverage
- Test all edge cases
- Test error handling
- Performance benchmarks

## Design Asset Requirements

### Perchance AI Image Generation

For any design assets needed (card designs, table felts, chip designs, etc.):

1. **Automated Generation** (if API available):
   - Use Perchance API for batch generation
   - Save prompts in `docs/design-prompts.md`
   - Store generated assets in `public/assets/`

2. **Manual Generation** (human-in-the-middle):
   - Create detailed prompts for each asset type
   - Document in `docs/design-prompts.md`
   - Include style guide references
   - Specify dimensions and format

### Asset Prompt Template
```markdown
## [Asset Name]
**Type**: [Card/Chip/Background/etc.]
**Dimensions**: [Width x Height]
**Style**: [Realistic/Stylized/Minimalist/etc.]
**Color Palette**: [Primary colors]
**Prompt**:
[Detailed prompt for Perchance AI]
```

## Quality Checklist

Before submitting PR, ensure:
- [ ] All tests pass (`npm test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Code coverage ≥80% for new code
- [ ] JSDoc comments on all public APIs
- [ ] No console.log statements (use proper logging)
- [ ] No TODO comments (convert to GitHub issues)
- [ ] Performance benchmarks documented (if applicable)
- [ ] Security considerations addressed

## Common Pitfalls to Avoid

1. **Don't** use `Math.random()` - use ProbablyFair SDK
2. **Don't** mutate state directly - use immutable patterns
3. **Don't** ignore edge cases - test thoroughly
4. **Don't** skip type definitions - maintain type safety
5. **Don't** hardcode values - use constants/config
6. **Don't** write untested code - TDD approach preferred

## Resources

- [ROADMAP.md](../ROADMAP.md) - Project roadmap
- [docs/architecture.md](./architecture.md) - Architecture overview
- [docs/milestones.json](./milestones.json) - Milestone tracking
- [ProbablyFair GitHub](https://github.com/probablyfair) - PF-VL-1.0 specs
- [Blackjack Rules](https://en.wikipedia.org/wiki/Blackjack) - Game rules reference

## Success Criteria

Your task is complete when:
1. ✅ All acceptance criteria met
2. ✅ Tests pass with >80% coverage
3. ✅ Code review approved
4. ✅ CI/CD pipeline passes
5. ✅ Documentation updated
6. ✅ PR merged to development branch

---

**Remember**: Quality over speed. We're building a professional, secure game that users can trust. Every line of code should reflect that commitment.
