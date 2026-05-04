# M2-T9: Payout Calculations

## Summary
Implement comprehensive payout calculations for all blackjack outcomes including blackjack bonus, regular wins, insurance, and edge cases.

## Tasks
- [ ] Blackjack: 3:2 payout
- [ ] Regular win: 1:1 payout
- [ ] Insurance: 2:1 payout
- [ ] Handle edge cases (push, surrender)

## Implementation Requirements

### Payout Rules
- **Blackjack**: 3:2 (1.5x bet + original)
- **Regular win**: 1:1 (1x bet + original)
- **Push**: Return original bet
- **Loss**: Lose bet
- **Insurance win**: 2:1 (2x insurance + insurance back)
- **Surrender**: Return half of bet (if enabled)

### Files to Create/Modify
- `src/engine/payouts.ts` - Enhanced payout calculations
- `src/engine/__tests__/payouts.test.ts` - Test suite

### API Design
```typescript
interface PayoutConfig {
  blackjackPayout: number; // Default: 1.5
  insurancePayout: number; // Default: 2
  surrenderReturn: number; // Default: 0.5
}

function calculatePayout(
  bet: number,
  outcome: GameOutcome,
  config: PayoutConfig
): number;

function calculateTotalPayout(
  hands: Hand[],
  outcomes: GameOutcome[],
  insuranceBet: number,
  dealerHasBlackjack: boolean
): TotalPayout;
```

## Test Plan
- [ ] Blackjack pays 3:2
- [ ] Regular win pays 1:1
- [ ] Push returns original bet
- [ ] Loss returns nothing
- [ ] Insurance win pays 2:1
- [ ] Multiple hands calculation
- [ ] Edge case: 6:5 blackjack variant

## Related
- **Milestone**: Milestone 2: Game Engine
- **Priority**: Critical (P0)
- **Dependencies**: M2-T3, M2-T5, M2-T6

## Checklist
- [ ] TypeScript strict mode compliance
- [ ] JSDoc comments on all public APIs
- [ ] No console.log statements
- [ ] Test coverage >80%
- [ ] Accurate decimal handling
