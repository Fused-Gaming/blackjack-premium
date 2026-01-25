# M2-T7: Split Hand Logic

## Summary
Implement split hand logic allowing players to split pairs, with proper handling of split Aces and multiple hand management.

## Tasks
- [ ] Allow splits on pairs
- [ ] Handle split Aces rules
- [ ] Manage multiple hands
- [ ] Track split hand state

## Implementation Requirements

### Split Rules
- **Eligible**: Pairs (same rank)
- **Split Aces**: Receive one card only
- **Re-splitting**: Configurable (default: not allowed)
- **Bet**: Equal to original bet

### Files to Create/Modify
- `src/engine/split.ts` - Split logic implementation
- `src/engine/__tests__/split.test.ts` - Test suite

### API Design
```typescript
interface SplitConfig {
  allowResplit: boolean;
  maxSplits: number;
  splitAcesGetOneCard: boolean;
}

function canSplitHand(hand: Hand, config: SplitConfig): boolean;
function splitHand(hand: Hand): { hand1: Hand; hand2: Hand };
function isSplitAce(hand: Hand): boolean;
function getActiveSplitHand(hands: Hand[]): Hand | null;
```

## Test Plan
- [ ] Split pair of 8s
- [ ] Split Aces (one card rule)
- [ ] Cannot split non-pairs
- [ ] Split creates two hands with equal bets
- [ ] Re-split disabled by default
- [ ] Multiple hand navigation

## Related
- **Milestone**: Milestone 2: Game Engine
- **Priority**: High (P1)
- **Dependencies**: M2-T1, M2-T3, M2-T5

## Checklist
- [ ] TypeScript strict mode compliance
- [ ] JSDoc comments on all public APIs
- [ ] No console.log statements
- [ ] Test coverage >80%
- [ ] State management for multiple hands
