# M2-T6: Insurance Logic

## Summary
Implement insurance betting logic for when dealer shows an Ace, including validation and payout calculations.

## Tasks
- [ ] Offer when dealer shows Ace
- [ ] Validate insurance bet (≤ half of original bet)
- [ ] Calculate insurance payouts
- [ ] Handle insurance with blackjack scenarios

## Implementation Requirements

### Insurance Rules
- **Offered**: When dealer's up-card is Ace
- **Max bet**: Half of original bet
- **Payout**: 2:1 if dealer has blackjack
- **Loss**: If dealer doesn't have blackjack

### Files to Create/Modify
- `src/engine/insurance.ts` - Insurance logic implementation
- `src/engine/__tests__/insurance.test.ts` - Test suite

### API Design
```typescript
function shouldOfferInsurance(dealerUpCard: Card): boolean;
function validateInsuranceBet(insuranceAmount: number, originalBet: number): BetValidation;
function calculateInsurancePayout(
  insuranceAmount: number,
  dealerHasBlackjack: boolean
): number;
function resolveInsurance(
  insuranceBet: number,
  dealerCards: Card[]
): InsuranceResult;
```

## Test Plan
- [ ] Offer insurance on dealer Ace
- [ ] Don't offer on non-Ace
- [ ] Valid insurance bet (≤ half)
- [ ] Invalid insurance bet (> half)
- [ ] Dealer has blackjack payout
- [ ] Dealer doesn't have blackjack

## Related
- **Milestone**: Milestone 2: Game Engine
- **Priority**: Medium (P2)
- **Dependencies**: M2-T3, M2-T9

## Checklist
- [ ] TypeScript strict mode compliance
- [ ] JSDoc comments on all public APIs
- [ ] No console.log statements
- [ ] Test coverage >80%
