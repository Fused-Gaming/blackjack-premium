# M2-T3: Hand Evaluation Logic

## Summary
Implement comprehensive hand evaluation logic for blackjack, including value calculation, soft/hard hand detection, multiple aces handling, and player vs dealer comparison.

## Tasks
- [x] Calculate hand value (Ace = 1 or 11)
- [x] Detect soft/hard hands
- [x] Handle edge cases (multiple Aces)
- [x] Compare hands (player vs dealer)
- [x] Add comprehensive test coverage

## Changes

### Files Modified
- `src/engine/hand.ts` - Enhanced compareHands function signature
- `src/engine/__tests__/hand-evaluation.test.ts` - New comprehensive test suite

### Implementation Details

**Hand Value Calculation**
- Aces count as 11 initially, convert to 1 if hand would bust
- Face cards (J, Q, K) count as 10
- Number cards count as face value

**Soft/Hard Hand Detection**
- Soft hand: contains an Ace counted as 11
- Hard hand: no Aces, or all Aces counted as 1

**Multiple Aces Handling**
- 2 Aces: 12 (11 + 1)
- 3 Aces: 13 (11 + 1 + 1)
- 4 Aces: 14 (11 + 1 + 1 + 1)
- Automatic conversion when total exceeds 21

**Hand Comparison**
- Player bust: always loses
- Dealer bust: player wins
- Blackjack beats 21
- Higher value wins
- Equal values: push

## Test Plan
- [x] Unit tests for getCardValue
- [x] Unit tests for evaluateHand
- [x] Unit tests for compareHands
- [x] Edge case tests for multiple aces
- [x] Split and double down validation tests

## Related
- **Milestone**: Milestone 2: Game Engine
- **Priority**: Critical (P0)
- **Dependencies**: M2-T1 (Card and Deck Models)

## Checklist
- [x] TypeScript strict mode compliance
- [x] JSDoc comments on all public APIs
- [x] No console.log statements
- [x] Test coverage >80%
- [x] All edge cases handled
