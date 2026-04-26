# M2-T5: Betting System

## Summary
Implement betting system with validation, balance tracking, and chip management for the blackjack game.

## Tasks
- [ ] Validate bets (min/max limits)
- [ ] Track balance changes
- [ ] Handle edge cases (insufficient funds)
- [ ] Chip denomination support

## Implementation Requirements

### Betting Rules
- **Minimum bet**: Configurable (default: 1)
- **Maximum bet**: Configurable (default: 500)
- **Insufficient funds**: Prevent bet placement
- **Double down**: Validate sufficient funds

### Files to Create/Modify
- `src/engine/betting.ts` - Betting system implementation
- `src/engine/__tests__/betting.test.ts` - Test suite

### API Design
```typescript
interface BetConfig {
  minBet: number;
  maxBet: number;
  chipDenominations: number[];
}

interface BetValidation {
  isValid: boolean;
  error?: string;
}

function validateBet(amount: number, balance: number, config: BetConfig): BetValidation;
function placeBet(amount: number, balance: number): { success: boolean; newBalance: number };
function calculateChips(amount: number, denominations: number[]): ChipBreakdown;
```

## Test Plan
- [ ] Valid bet within limits
- [ ] Bet below minimum
- [ ] Bet above maximum
- [ ] Insufficient balance
- [ ] Double down with insufficient funds
- [ ] Chip breakdown calculation

## Related
- **Milestone**: Milestone 2: Game Engine
- **Priority**: High (P1)
- **Dependencies**: None

## Checklist
- [ ] TypeScript strict mode compliance
- [ ] JSDoc comments on all public APIs
- [ ] No console.log statements
- [ ] Test coverage >80%
- [ ] Input validation on all bet amounts
