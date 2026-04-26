# M2-T4: Dealer AI Logic

## Summary
Implement dealer AI logic for automated play sequence, following standard blackjack dealer rules with configurable soft 17 behavior.

## Tasks
- [ ] Stand on 17+ (configurable for soft 17 rule)
- [ ] Automated play sequence
- [ ] Decision logging for debugging
- [ ] Handle all dealer scenarios

## Implementation Requirements

### Dealer Rules
- **Hard 17+**: Always stand
- **Soft 17**: Configurable (stand or hit)
- **16 or less**: Always hit
- **Bust**: Stop and resolve

### Files to Create/Modify
- `src/engine/dealer.ts` - Dealer AI implementation
- `src/engine/__tests__/dealer.test.ts` - Test suite

### API Design
```typescript
interface DealerConfig {
  hitOnSoft17: boolean;
  revealHoleCardDelay: number;
}

function dealerShouldHit(cards: Card[], config: DealerConfig): boolean;
function playDealerHand(cards: Card[], deck: Card[], config: DealerConfig): DealerResult;
```

## Test Plan
- [ ] Stand on hard 17
- [ ] Hit on 16
- [ ] Soft 17 with hitOnSoft17=true
- [ ] Soft 17 with hitOnSoft17=false
- [ ] Dealer bust scenario
- [ ] Dealer blackjack scenario

## Related
- **Milestone**: Milestone 2: Game Engine
- **Priority**: Critical (P0)
- **Dependencies**: M2-T1, M2-T3

## Checklist
- [ ] TypeScript strict mode compliance
- [ ] JSDoc comments on all public APIs
- [ ] No console.log statements
- [ ] Test coverage >80%
- [ ] Decision logging implemented
