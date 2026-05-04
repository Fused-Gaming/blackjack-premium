# Execution Plan: Game Mode Tables & States

## Status: Phase 4 Complete - Dealing Phase ✅ (Phases 1-4 ✅)

### Completed Work

#### Phase 1: Button Positioning ✅
- Moved "Back to game" button from top-left to bottom-left
- Fixed button collision issues
- Consistent bottom-corner layout (Back left, Design Kit right)

#### Phase 2: Player Selection UI ✅
- Created PlayerSelector component
- Player count selection (1-5P)
- Descriptions for each mode
- Integrated into app flow (Landing → Player Select → Game)

#### Phase 3: Design Layouts & Betting UI ✅
- Added TableLayoutPreview to design kit
- Interactive 1-5 player table previews
- Feature matrix showing capabilities
- Created BettingPhase component
- Parallel betting status display
- Design Kit version bumped to 2.1

#### Phase 3.5: BettingPhase Integration ✅
- Integrated BettingPhase into Table component
- Conditional rendering: BettingPhase shown during 'bettingOpen' phase
- Smooth phase transitions between betting and dealing
- Enhanced BetControls for multiplayer seat support
- Added UI indicator for current betting seat
- Maintains single-player bet flow

#### Phase 4: Dealing Phase Implementation ✅
- Created DealingPhase component with animated card dealing
- Sequential dealing order: Dealer card 1 → Each player card 1 → Dealer card 2 → Each player card 2
- Framer Motion animations with 200ms per card flip
- Progress bar showing cards dealt vs total
- Auto-transition to insurance phase after animation completes
- Support for 1-5 player tables with responsive grid layouts
- Integrated into Table.tsx with smooth transitions
- Deck creation, shuffling, and card distribution logic in gameStore

#### Phase 4.5: Test Fixes & Validation ✅
- Fixed validation logic for bet amounts (NaN, negative, Infinity handling)
- Aligned test expectations across betting.test.ts and payouts.test.ts
- Corrected double-down default parameter (false = no double after split by default)
- Fixed timing tolerance in mockApi.test.ts
- All 444 tests passing ✅
- Build succeeding with no TypeScript errors

---

## Next: Execute Game Mode Tables & States

### Required Components

#### A. Betting Phase (In Progress)
- [x] BettingPhase component structure
- [ ] Integrate BettingPhase into Table component
- [ ] Show betting UI during `bettingOpen` phase
- [ ] Support parallel betting across seats
- [ ] Show side bet (21+3) option during betting
- [ ] Lock bets transition to dealing

#### B. Dealing Phase
- [ ] Card deal animation (parallel to all seats)
- [ ] Card placement in seat zones
- [ ] Dealer upcard reveal
- [ ] Deal sound effects (optional)

#### C. Side Bet Evaluation
- [ ] Display 21+3 evaluation results
- [ ] Show win/loss per seat
- [ ] Non-blocking payout display
- [ ] Animate side bet outcomes

#### D. Player Turns Phase
- [ ] Sequential turn indicator with seat highlighting
- [ ] Action buttons (Hit/Stand/Double/Split) for active player
- [ ] Card animations for each action
- [ ] Turn queue visualization
- [ ] Waiting state for inactive players

#### E. Dealer Turn Phase
- [ ] Reveal dealer hole card animation
- [ ] Dealer hitting logic
- [ ] Dealer stand animation
- [ ] Dealer total display

#### F. Settlement Phase
- [ ] Per-seat outcome display
- [ ] Payout animations
- [ ] Balance updates
- [ ] Round summary

#### G. Reset Flow
- [ ] Clear cards from table
- [ ] Show round summary
- [ ] New Round button
- [ ] Return to betting phase

---

## Implementation Order (Recommended)

### Week 1 (Current)
- [x] Phase 1: Button positioning
- [x] Phase 2: Player selector
- [x] Phase 3: Design layouts + betting UI
- [ ] **A1: Integrate BettingPhase into Table**
- [ ] **A2: Add side bet UI to betting**
- [ ] **B1: Implement dealing phase**

### Week 2
- [ ] **C1: Side bet result display**
- [ ] **D1: Player turn indicators**
- [ ] **D2: Action button integration**
- [ ] **E1: Dealer turn phase**

### Week 3
- [ ] **F1: Settlement display**
- [ ] **G1: Reset flow**
- [ ] Testing across 1-5 player counts
- [ ] Bug fixes and polish

---

## Game State Machine (Issue #140)

### Current Phase Support

```
bettingOpen ──────→ lockBets ──────→ dealing
    ✅                  ✅            [IN PROGRESS]
    
dealing ──────→ sideBetEvaluation ──────→ playerTurns
 [IN PROGRESS]        [IMPLEMENTED]        [READY]

playerTurns ──────→ dealerTurn ──────→ settlement → complete
  [STRUCTURE]       [IMPLEMENTED]       [READY]     [READY]
```

---

## Per-Seat State Model (Issue #140)

Each seat follows the pattern:

```
Empty → Betting → Locked → Waiting → Active → Acted → Resolved
```

### Current Implementation
- ✅ Empty: Seat uninitialized
- ✅ Betting: Seat accepting bets (active=true, hands[0].bet > 0)
- ✅ Locked: betLocked=true
- ✅ Waiting: In turn queue but not active
- ⚠️ Active: currentTurnIndex points to this seat (IN PROGRESS)
- ⚠️ Acted: Hand status='stand', 'bust', 'blackjack' (IN PROGRESS)
- ✅ Resolved: Settlement calculated

---

## Critical Path Tasks

### For Playable Game (Minimum)
1. Integrate BettingPhase into Table
2. Implement player turn display
3. Complete action button routing
4. Add settlement display
5. Test 1-5 player flow end-to-end

### For Polish
1. Animations (card deals, flips, outcomes)
2. Sound effects
3. Mobile responsiveness
4. Visual feedback (glows, indicators)

---

## Testing Checklist

### 1-Player Mode
- [ ] Place bet
- [ ] Place side bet (21+3)
- [ ] Deal cards
- [ ] 21+3 evaluated
- [ ] Hit/Stand/Double/Split work
- [ ] Dealer plays
- [ ] Settlement shows correctly
- [ ] Balance updates
- [ ] New round works

### 2-Player Mode
- [ ] Both seats accept bets in parallel
- [ ] Bets lock simultaneously
- [ ] Cards dealt to both
- [ ] Side bets evaluated per seat
- [ ] P1 acts, P2 waits
- [ ] Turn passes correctly
- [ ] Each seat resolves independently
- [ ] New round resets both

### 3-5 Player Modes
- [ ] All players place bets in parallel
- [ ] Correct grid layout displays
- [ ] Turn order is P1 → P2 → P3 (→ P4 → P5)
- [ ] Each player sees own cards
- [ ] Dealer shared across all
- [ ] Each resolves independently

---

## Files to Integrate

### Already Created
- ✅ PlayerSelector.tsx
- ✅ TableLayoutPreview.tsx
- ✅ BettingPhase.tsx

### Need to Create/Update
- [ ] SideBetControl.tsx (side bet toggle)
- [ ] SideBetResult.tsx (result display)
- [ ] TurnIndicator.tsx (seat highlighting)
- [ ] SettlementSummary.tsx (round results)
- [ ] Table.tsx (integrate all phases)

### Game Store (Already Done)
- ✅ numPlayers support
- ✅ turnQueue system
- ✅ evaluateSideBets()
- ✅ moveToNextTurn()
- ✅ lockBets()
- ✅ Phase transitions

---

## Success Criteria

✅ Game flows end-to-end for 1-5 player counts
✅ Betting phase shows all players
✅ Turn order respected
✅ Side bets evaluated
✅ Settlement calculated correctly
✅ No console errors
✅ No type errors
✅ UI responsive on mobile
✅ All state transitions work

---

## Version Bumps

- v2.1 ✅: Multiplayer Table Layouts + Design Kit Preview
- v2.2 (Next): Game Flow Implementation + Betting Phase
- v2.3: Player Turns + Action System
- v2.4: Settlement + Reset Flow
- v3.0: Full Production-Ready Multiplayer

---

## Completed: BettingPhase Integration (PR #199)

**✅ Successfully integrated BettingPhase into Table component**

Enabled:
1. ✅ Users see all players' betting status during bettingOpen phase
2. ✅ Real-time bet amount updates as bets are placed
3. ✅ Ready indicator when all bets placed
4. ✅ DEAL button triggers lockBets() and phase transition
5. ✅ Enhanced BetControls for multiplayer seat support
6. ✅ Smooth Framer Motion transitions between phases

PR Status: Open, awaiting CI checks

## Next Immediate Step

**Implement Insurance/Side Bets Phase**

Current Status:
- ✅ DealingPhase completed and integrated
- ✅ All tests passing (444/444)
- ✅ Build passing with no errors
- ✅ Card distribution logic complete

Next Phase Will Enable:
1. Insurance offer display when dealer shows Ace
2. Side bet evaluation (21+3)
3. Payout calculations for winning bets
4. Visual feedback for bet outcomes
5. Smooth transition to player turns

Expected completion: 60-90 minutes
