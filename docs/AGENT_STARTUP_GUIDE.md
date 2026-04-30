# 🚀 Milestone 2 Agent Startup Guide

**Status**: Ready for Development
**Created**: 2026-01-25
**Target**: All 10 tasks completed by end of Week 2

---

## 📌 Quick Start (5 Minutes)

### For Each Agent

1. **Read This First** (2 min)
   - Understand your task scope
   - Know the dependencies
   - Review the execution order

2. **Setup Your Environment** (2 min)
   ```bash
   git checkout feat/M2-T{N}-{Task-Name}
   git pull origin feat/M2-T{N}-{Task-Name}
   npm install  # if needed
   ```

3. **Read Your Task Prompt** (1 min)
   - Open: [docs/AGENT_PROMPT_M2.md](./AGENT_PROMPT_M2.md)
   - Find your task-specific section
   - Review acceptance criteria

---

## 🎯 Your Assignment

### M2-T1: Card and Deck Models
**Status**: ✅ COMPLETED
**Agent**: Claude Sonnet (reference implementation)
**PR**: [#93](https://github.com/Fused-Gaming/blackjack-premium/pull/93)
**Completed**: Enhanced Card/Deck models with utilities, >95% test coverage

---

### M2-T2: ProbablyFair Shuffle Algorithm
**Priority**: 🚨 CRITICAL
**Status**: 🔄 IN PROGRESS
**Assigned To**: [Assign an agent]
**PR**: [#94](https://github.com/Fused-Gaming/blackjack-premium/pull/94)
**Branch**: `feat/M2-T2-ProbablyFair-Shuffle-Algorithm`

**Key Tasks**:
- [ ] Research ProbablyFair SDK (pf-sdk or pf-bindings)
- [ ] Integrate PF-VL-1.0 protocol
- [ ] Implement cryptographic seed generation
- [ ] Create verification functions
- [ ] Write >80% test coverage
- [ ] Document verification process

**Dependencies**: M2-T1 ✅

**Resources**:
- [ProbablyFair GitHub](https://github.com/probablyfair)
- [ProbablyFair Specs](https://github.com/probablyfair/pf-specs)
- Prompt Section: M2-T2 in AGENT_PROMPT_M2.md

---

### M2-T3: Hand Evaluation Logic
**Priority**: 🚨 CRITICAL
**Status**: ⏳ PENDING
**Assigned To**: [Assign an agent]
**PR**: [#96](https://github.com/Fused-Gaming/blackjack-premium/pull/96)
**Branch**: `feat/M2-T3-Hand-Evaluation-Logic`

**Key Tasks**:
- [ ] Implement hand value calculation (Ace handling)
- [ ] Detect soft/hard hands
- [ ] Implement bust detection
- [ ] Detect natural blackjack (21)
- [ ] Create comparison logic
- [ ] Handle edge cases (multiple Aces)
- [ ] Write >90% test coverage

**Dependencies**: M2-T1 ✅

**Resources**:
- Prompt Section: M2-T3 in AGENT_PROMPT_M2.md
- Reference: [Blackjack Hand Valuation](https://en.wikipedia.org/wiki/Blackjack)
- Code Reference: [src/engine/hand.ts](../src/engine/hand.ts)

---

### M2-T4: Dealer AI Logic
**Priority**: 🚨 CRITICAL
**Status**: ⏳ PENDING
**Assigned To**: [Assign an agent]
**PR**: [#97](https://github.com/Fused-Gaming/blackjack-premium/pull/97)
**Branch**: `feat/M2-T4-Dealer-AI-Logic`

**Key Tasks**:
- [ ] Implement hit/stand logic (stand on 17+)
- [ ] Add soft 17 rule handling
- [ ] Deterministic play automation
- [ ] Decision logging
- [ ] Handle edge cases
- [ ] Write >85% test coverage

**Dependencies**: M2-T1 ✅, M2-T3 (parallel ok)

**Resources**:
- Prompt Section: M2-T4 in AGENT_PROMPT_M2.md
- Blackjack Rules: [Dealer Rules](https://en.wikipedia.org/wiki/Blackjack#Rules_of_play_at_casinos)

---

### M2-T5: Betting System
**Priority**: 🔴 HIGH
**Status**: ⏳ PENDING
**Assigned To**: [Assign an agent]
**PR**: [#98](https://github.com/Fused-Gaming/blackjack-premium/pull/98)
**Branch**: `feat/M2-T5-Betting-System`

**Key Tasks**:
- [ ] Implement bet placement with validation
- [ ] Enforce min/max limits
- [ ] Create balance tracking
- [ ] Handle insufficient funds
- [ ] Manage betting rounds
- [ ] Write >85% test coverage

**Dependencies**: M2-T1 ✅

**Resources**:
- Prompt Section: M2-T5 in AGENT_PROMPT_M2.md

---

### M2-T6: Insurance Logic
**Priority**: 🟠 MEDIUM
**Status**: ⏳ PENDING
**Assigned To**: [Assign an agent]
**PR**: [#99](https://github.com/Fused-Gaming/blackjack-premium/pull/99)
**Branch**: `feat/M2-T6-Insurance-Logic`

**Key Tasks**:
- [ ] Detect when insurance is offered
- [ ] Validate insurance bet (≤50% original)
- [ ] Calculate insurance payouts (2:1)
- [ ] Handle blackjack with insurance
- [ ] Write >80% test coverage

**Dependencies**: M2-T1 ✅, M2-T3 (parallel), M2-T5 (parallel)

**Resources**:
- Prompt Section: M2-T6 in AGENT_PROMPT_M2.md
- Insurance Rules: [Wikipedia Blackjack Insurance](https://en.wikipedia.org/wiki/Blackjack#Insurance)

---

### M2-T7: Split Hand Logic
**Priority**: 🔴 HIGH
**Status**: ⏳ PENDING
**Assigned To**: [Assign an agent]
**PR**: [#100](https://github.com/Fused-Gaming/blackjack-premium/pull/100)
**Branch**: `feat/M2-T7-Split-Hand-Logic`

**Key Tasks**:
- [ ] Detect splittable hands (pairs)
- [ ] Create split hand objects
- [ ] Handle split Ace rules
- [ ] Manage multiple hands in sequence
- [ ] Track active hand index
- [ ] Write >80% test coverage

**Dependencies**: M2-T1 ✅, M2-T3 (parallel), M2-T5 (parallel)

**Resources**:
- Prompt Section: M2-T7 in AGENT_PROMPT_M2.md

---

### M2-T8: Double Down Logic
**Priority**: 🔴 HIGH
**Status**: ⏳ PENDING
**Assigned To**: [Assign an agent]
**PR**: [#101](https://github.com/Fused-Gaming/blackjack-premium/pull/101)
**Branch**: `feat/M2-T8-Double-Down-Logic`

**Key Tasks**:
- [ ] Validate double down eligibility (first two cards)
- [ ] Double bet with balance validation
- [ ] Deal one additional card
- [ ] Restrict further actions
- [ ] Write >85% test coverage

**Dependencies**: M2-T1 ✅, M2-T3 (parallel), M2-T5 (parallel)

**Resources**:
- Prompt Section: M2-T8 in AGENT_PROMPT_M2.md

---

### M2-T9: Payout Calculations
**Priority**: 🔴 HIGH
**Status**: ⏳ PENDING
**Assigned To**: [Assign an agent]
**PR**: [#102](https://github.com/Fused-Gaming/blackjack-premium/pull/102)
**Branch**: `feat/M2-T9-Payout-Calculations`

**Key Tasks**:
- [ ] Calculate blackjack payouts (3:2)
- [ ] Calculate win payouts (1:1)
- [ ] Handle push outcomes
- [ ] Calculate insurance payouts (2:1)
- [ ] Handle split payouts
- [ ] Write >90% test coverage

**Dependencies**: M2-T1 ✅, M2-T3 (parallel), M2-T5 (parallel)

**Resources**:
- Prompt Section: M2-T9 in AGENT_PROMPT_M2.md

---

### M2-T10: Comprehensive Unit Tests
**Priority**: 🔴 HIGH
**Status**: ⏳ PENDING (Continuous)
**Assigned To**: [Assign an agent]
**PR**: [#103](https://github.com/Fused-Gaming/blackjack-premium/pull/103)
**Branch**: `feat/M2-T10-Unit-Tests`

**Key Tasks**:
- [ ] Complete unit tests for all M2 components
- [ ] Achieve >80% overall coverage
- [ ] Test all edge cases
- [ ] Test error conditions
- [ ] Performance benchmarks
- [ ] Generate coverage report

**Dependencies**: All other M2 tasks (runs continuously)

**Resources**:
- Prompt Section: M2-T10 in AGENT_PROMPT_M2.md
- Test Examples: [src/engine/__tests__/](../src/engine/__tests__/)

---

## 📊 Execution Order & Parallelization

```
PHASE 1: Foundation (Must Complete First)
└─ M2-T1: Card & Deck Models ✅

PHASE 2: Core Logic (Can Run in Parallel)
├─ M2-T2: ProbablyFair Shuffle (CRITICAL)
├─ M2-T3: Hand Evaluation (CRITICAL)
├─ M2-T4: Dealer AI (CRITICAL)
└─ M2-T5: Betting System (HIGH)

PHASE 3: Advanced Features (Can Run in Parallel)
├─ M2-T6: Insurance Logic
├─ M2-T7: Split Hand Logic
├─ M2-T8: Double Down Logic
└─ M2-T9: Payout Calculations

PHASE 4: Testing & Validation (Continuous)
└─ M2-T10: Comprehensive Unit Tests

TIMELINE:
- Phase 1: Already Complete ✅
- Phase 2: ~2-3 days (parallel)
- Phase 3: ~2-3 days (parallel)
- Phase 4: Throughout (especially after Phase 3)
```

---

## 🔍 Development Workflow

### Step 1: Setup Branch
```bash
git checkout feat/M2-T{N}-{Task-Name}
git pull origin feat/M2-T{N}-{Task-Name}
```

### Step 2: Read Requirements
- Read [docs/AGENT_PROMPT_M2.md](./AGENT_PROMPT_M2.md) (entire document)
- Find your task-specific section
- Review acceptance criteria in your PR

### Step 3: Write Tests First (TDD)
```bash
# Create test file: src/engine/__tests__/{module}.test.ts
# Write comprehensive tests covering:
# - Happy path scenarios
# - Edge cases
# - Error conditions
# - Type safety
```

### Step 4: Implement Functionality
```bash
# Create/modify: src/engine/{module}.ts
# Implement functions to pass all tests
# Follow TypeScript strict mode
# Add JSDoc to all public functions
```

### Step 5: Validate & Test
```bash
npm run type-check    # TypeScript type checking
npm run lint          # ESLint verification
npm test              # Run all tests
npm run build         # Build the project
npm run lint:fix      # Auto-fix linting issues
```

### Step 6: Commit & Push
```bash
git add src/
git commit -m "feat(M2-T{N}): [task description]

- Detailed change description
- Key functionality added
- Test coverage info

Relates to: https://github.com/Fused-Gaming/blackjack-premium/pull/{PR_NUMBER}"

git push origin feat/M2-T{N}-{Task-Name}
```

Your commit will automatically appear in your PR!

### Step 7: Monitor PR Status
- Commits auto-appear in your PR
- CI/CD pipelines run automatically
- Labels auto-applied by workflows
- Milestone tracking active

---

## ✅ Quality Checklist

Before pushing, ensure:
- [ ] All tests pass (`npm test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] >80% test coverage (minimum)
- [ ] JSDoc on all public functions
- [ ] No console.log statements
- [ ] No TODO comments (create GitHub issues instead)
- [ ] No `any` types (strict TypeScript)
- [ ] Pure functions (no mutations)
- [ ] Error handling for edge cases

---

## 🚨 Common Pitfalls to Avoid

1. **❌ Using Math.random()** → Use ProbablyFair SDK instead
2. **❌ Skipping tests** → TDD approach required
3. **❌ Hardcoding values** → Use constants/config
4. **❌ Mutating inputs** → Functions should return new objects
5. **❌ Adding extra features** → Stick to task scope
6. **❌ Skipping edge cases** → Test thoroughly
7. **❌ Using `any` types** → Maintain type safety
8. **❌ Missing documentation** → JSDoc all public APIs

---

## 📚 Essential Resources

### Documentation
- [Universal Agent Prompt](./AGENT_PROMPT_M2.md) - **READ THIS FIRST**
- [PR Tracking Dashboard](./MILESTONE2_PR_TRACKING.md) - Task dependencies
- [Design Assets Guide](./design-prompts.md) - Design automation
- [Label Documentation](../.github/LABELS.md) - Label system

### Code References
- [Type Definitions](../src/types/index.ts) - Type system
- [Card & Deck Models](../src/engine/deck.ts) - Reference implementation
- [Test Examples](../src/engine/__tests__/) - Testing patterns
- [Project Architecture](./architecture.md) - System design

### External References
- [ProbablyFair SDK](https://github.com/probablyfair) - Cryptographic RNG
- [Blackjack Rules](https://en.wikipedia.org/wiki/Blackjack) - Game rules
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TS reference
- [Vitest Documentation](https://vitest.dev/) - Testing framework

---

## 🎓 Key Principles

### 1. Provably Fair (Critical for Security)
- **Never** use `Math.random()`
- **Always** use ProbablyFair SDK
- Seed generation must be cryptographic
- Verification must be reproducible
- Document the verification process

### 2. Type Safety (Strict Mode)
- No `any` types
- Full TypeScript coverage
- All functions typed
- Error types defined
- Compile with `--strict`

### 3. Test-Driven Development
- Write tests first
- Tests drive design
- >80% coverage minimum
- Test edge cases
- Test error conditions

### 4. Code Quality
- Pure functions (no mutations)
- Immutable data structures
- Clear variable names
- Comprehensive JSDoc
- No console.log in production code

### 5. Blackjack Rules
- Understand full rules
- Implement correctly
- Test edge cases
- Validate dealer logic
- Verify payouts

---

## 🔗 PR Information

### All 10 PRs Status

| PR# | Task | Branch | Status | Milestone |
|-----|------|--------|--------|-----------|
| #93 | M2-T1 | Card & Deck | ✅ DONE | M2 |
| #94 | M2-T2 | ProbablyFair | 🔄 IN PROGRESS | M2 |
| #96 | M2-T3 | Hand Eval | ⏳ PENDING | M2 |
| #97 | M2-T4 | Dealer AI | ⏳ PENDING | M2 |
| #98 | M2-T5 | Betting | ⏳ PENDING | M2 |
| #99 | M2-T6 | Insurance | ⏳ PENDING | M2 |
| #100 | M2-T7 | Split | ⏳ PENDING | M2 |
| #101 | M2-T8 | Double | ⏳ PENDING | M2 |
| #102 | M2-T9 | Payouts | ⏳ PENDING | M2 |
| #103 | M2-T10 | Tests | ⏳ PENDING | M2 |

---

## 💡 Pro Tips

1. **Leverage Parallelization**
   - Phase 2 tasks can run simultaneously
   - Phase 3 tasks can run simultaneously
   - Coordinate with other agents

2. **Auto-Labeling Works**
   - Use proper keywords in commit messages
   - Labels auto-applied by workflows
   - See `.github/LABELS.md` for patterns

3. **Test Coverage is Tracked**
   - Every PR shows coverage
   - Aim for >90% per module
   - 80% minimum is the floor

4. **CI/CD Validates Everything**
   - Type checking
   - Linting
   - Testing
   - Build verification
   - All automatic on push

5. **Review Process**
   - Your PR shows auto-labels
   - Milestone auto-assigned
   - Ready for code review
   - Comments enable collaboration

---

## 🎯 Success Metrics

### For Individual Tasks
- ✅ All acceptance criteria met
- ✅ >80% test coverage (minimum)
- ✅ Type checking passes
- ✅ Linting passes
- ✅ Build succeeds
- ✅ PR code review approved
- ✅ Documentation complete

### For Milestone 2
- ✅ All 10 tasks completed
- ✅ All 10 PRs merged
- ✅ >80% overall coverage
- ✅ Development branch stable
- ✅ No critical bugs
- ✅ Ready for M3 (UI Components)

---

## 📞 Support & Help

### Need Clarification?
- Check task-specific section in [AGENT_PROMPT_M2.md](./AGENT_PROMPT_M2.md)
- Review PR description in [MILESTONE2_PR_TRACKING.md](./MILESTONE2_PR_TRACKING.md)
- Check referenced code examples

### Found a Bug?
- Create a GitHub issue
- Reference the task/PR
- Include error details

### Need Dependencies?
- Check PR description
- Check task dependencies in this guide
- Coordinate with other agents

---

## 🚀 Ready to Start?

1. **Pick your task** from assignments above
2. **Read AGENT_PROMPT_M2.md** (entire document)
3. **Checkout your branch** (`git checkout feat/M2-T...`)
4. **Follow the workflow** (5 steps above)
5. **Commit & push** to auto-update your PR

**Your work is tracked automatically!**
- Commits appear in PR
- Tests run on each push
- Labels auto-apply
- Milestone assigned
- Progress visible

**Questions?** Check AGENT_PROMPT_M2.md - it has everything you need!

---

**Status**: All systems ready ✅
**Last Updated**: 2026-01-25
**Generated with**: [Claude Code](https://claude.com/claude-code)
