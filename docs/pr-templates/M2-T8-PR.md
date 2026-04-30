# M2-T8: Double Down Logic

## Summary
Implement double down logic allowing players to double their bet and receive exactly one more card.

## Tasks
- [ ] Allow on first two cards
- [ ] Double bet, receive one card
- [ ] Restrict actions after double
- [ ] Handle double on split hands

## Implementation Requirements

### Double Down Rules
- **Eligible**: First two cards only
- **Action**: Double bet, receive one card, stand
- **After split**: Configurable (default: allowed)
- **On certain totals**: Configurable (default: any)

### Files to Create/Modify
- `src/engine/double.ts` - Double down implementation
- `src/engine/__tests__/double.test.ts` - Test suite

### API Design
```typescript
interface DoubleConfig {
  allowAfterSplit: boolean;
  allowedTotals: number[] | 'any';
  insufficientFundsPolicy: 'reject' | 'double-for-less';
}

function canDouble(hand: Hand, balance: number, config: DoubleConfig): boolean;
function doubleDown(hand: Hand): Hand;
function processDoubleHit(hand: Hand, card: Card): Hand;
```

## Test Plan
- [ ] Double on first two cards
- [ ] Cannot double after hit
- [ ] Double doubles the bet
- [ ] Receive exactly one card
- [ ] Auto-stand after double
- [ ] Insufficient funds handling

## Related
- **Milestone**: Milestone 2: Game Engine
- **Priority**: High (P1)
- **Dependencies**: M2-T1, M2-T3, M2-T5

## Checklist
- [ ] TypeScript strict mode compliance
- [ ] JSDoc comments on all public APIs
- [ ] No console.log statements
- [ ] Test coverage >80%
- [ ] Balance validation
