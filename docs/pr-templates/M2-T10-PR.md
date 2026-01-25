# M2-T10: Unit Tests

## Summary
Implement comprehensive unit tests for all game engine components, achieving >80% code coverage with edge case testing and performance benchmarks.

## Tasks
- [ ] Achieve >80% coverage
- [ ] Test all edge cases
- [ ] Test error handling
- [ ] Performance benchmarks

## Implementation Requirements

### Coverage Targets
- **Overall**: >80%
- **Critical paths**: >90%
- **Edge cases**: 100% documented scenarios

### Test Categories
1. **Unit Tests**: Individual function testing
2. **Integration Tests**: Component interaction
3. **Edge Case Tests**: Boundary conditions
4. **Performance Tests**: Benchmarks for critical operations

### Files to Create/Modify
- `src/engine/__tests__/*.test.ts` - All test files
- `vitest.config.ts` - Coverage configuration
- `docs/TESTING_GUIDE.md` - Testing documentation

### Test Suites Required
```typescript
// Deck tests
describe('Deck', () => {
  // createDeck, createShoe, shuffle, deal
});

// Hand tests
describe('Hand Evaluation', () => {
  // evaluateHand, compareHands, soft/hard detection
});

// Dealer tests
describe('Dealer AI', () => {
  // shouldHit, playDealerHand
});

// Betting tests
describe('Betting System', () => {
  // validateBet, placeBet, calculateChips
});

// Payout tests
describe('Payouts', () => {
  // calculatePayout, insurance, blackjack bonus
});
```

## Test Plan
- [ ] All existing functions have tests
- [ ] Edge cases documented and tested
- [ ] Error conditions throw appropriate errors
- [ ] Performance benchmarks established
- [ ] Coverage report generated

## Related
- **Milestone**: Milestone 2: Game Engine
- **Priority**: Critical (P0)
- **Dependencies**: M2-T1 through M2-T9

## Checklist
- [ ] Coverage >80% achieved
- [ ] All edge cases tested
- [ ] Error handling verified
- [ ] Performance benchmarks documented
- [ ] CI/CD integration verified
