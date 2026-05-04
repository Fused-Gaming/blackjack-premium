# Branch Strategy: Multiplayer Blackjack UI Implementation

## Current Status
- **Branch**: `claude/recover-ace-svg-editor-EOTxG`
- **Completed**: Multiplayer game store foundation, turn queue system, 21+3 side bet evaluation
- **In Progress**: UI implementation for 1-5 player tables with betting and side bet controls

## Implementation Phases

### Phase 1: Button Positioning & Layout (CURRENT)
**Objective**: Fix UI collision issues and button positioning

- [ ] Move "Back to game" button from top-left to bottom-left
- [ ] Verify button z-index and spacing doesn't collide with other UI
- [ ] Test responsive button positioning on mobile

**Files to Modify**:
- `src/App.tsx` - Reposition Back button to bottom-left

**Expected Outcome**: Clean button layout with no collisions

---

### Phase 2: Player Selection UI
**Objective**: Allow users to select 1-5 player mode before starting game

- [ ] Create `PlayerSelector` component
- [ ] Add player count selector to LandingPage or new game setup
- [ ] Initialize game with selected player count
- [ ] Create seat assignment logic for multiplayer

**Files to Create**:
- `src/components/game/PlayerSelector.tsx` - Player count selection
- `src/hooks/usePlayerSetup.ts` - Setup logic

**Files to Modify**:
- `src/App.tsx` - Add player selection flow
- `src/store/gameStore.ts` - Add setNumPlayers calls

**Expected Outcome**: Users can select 1-5 player mode before dealing

---

### Phase 3: Betting UI Enhancement
**Objective**: Implement parallel betting phase with all seats visible

- [ ] Create `BettingLane` component for per-seat betting
- [ ] Create `SideBetControl` component for 21+3 side bet UI
- [ ] Update `BetControls` to show all active seats
- [ ] Implement betting timer (30 second countdown)
- [ ] Show bet confirmation per seat

**Files to Create**:
- `src/components/game/BettingLane.tsx` - Per-seat betting UI
- `src/components/game/SideBetControl.tsx` - 21+3 side bet toggle
- `src/components/game/BettingPhase.tsx` - Full betting phase UI

**Files to Modify**:
- `src/components/game/Table.tsx` - Integrate betting phase
- `src/components/controls/BetControls.tsx` - Update for multiplayer

**Expected Outcome**: Parallel betting with side bet options for each seat

---

### Phase 4: Side Bet Result Display
**Objective**: Show 21+3 side bet results non-blocking during play

- [ ] Create `SideBetResult` component showing win/loss/payout
- [ ] Display results briefly before player turns begin
- [ ] Animate payout amounts
- [ ] Integrate with settlement phase

**Files to Create**:
- `src/components/game/SideBetResult.tsx` - Side bet result display
- `src/components/game/SideBetEvaluation.tsx` - Evaluation phase UI

**Expected Outcome**: Side bet results shown clearly during game flow

---

### Phase 5: Seat Turn Indicators
**Objective**: Show turn order and highlight active player

- [ ] Create turn queue display showing upcoming players
- [ ] Highlight active player with visual indicator (glow/ring)
- [ ] Show "waiting" state for inactive players
- [ ] Add turn timer countdown

**Files to Create**:
- `src/components/game/TurnIndicator.tsx` - Current turn display
- `src/components/game/TurnQueue.tsx` - Upcoming turns display

**Files to Modify**:
- `src/components/game/Table.tsx` - Integrate turn indicators

**Expected Outcome**: Clear turn indication with queue visibility

---

### Phase 6: Mobile Responsive Layouts
**Objective**: Ensure 1-5 player layouts work on mobile

- [ ] Test grid layouts at tablet/mobile breakpoints
- [ ] Implement ASCII compact mode for small screens (from issue #136)
- [ ] Add touch-friendly button sizing
- [ ] Optimize seat spacing for mobile

**Files to Modify**:
- `src/components/game/Table.tsx` - Add responsive breakpoints
- `src/components/controls/BetControls.tsx` - Touch optimization

**Expected Outcome**: Playable layouts on all device sizes

---

### Phase 7: Settlement & Reset Flow
**Objective**: Clean settlement with results summary and reset

- [ ] Show per-seat results with payout amounts
- [ ] Display hand outcomes (win/loss/push/blackjack)
- [ ] Show balance updates
- [ ] Reset to betting phase with new round button

**Files to Create**:
- `src/components/game/SettlementPhase.tsx` - Settlement UI

**Files to Modify**:
- `src/components/game/Table.tsx` - Integrate settlement phase

**Expected Outcome**: Clear settlement and ready for new round

---

## Implementation Schedule

### Week 1:
- Phase 1: Button Positioning
- Phase 2: Player Selection UI
- Phase 3: Betting UI Enhancement

### Week 2:
- Phase 4: Side Bet Result Display
- Phase 5: Seat Turn Indicators
- Phase 6: Mobile Responsive Layouts

### Week 3:
- Phase 7: Settlement & Reset Flow
- Testing across all player counts (1-5)
- Bug fixes and polish

---

## Testing Checklist

### Single Player (1P)
- [ ] Place bet and deal
- [ ] Place side bet (21+3)
- [ ] Hit/Stand/Double/Split actions
- [ ] Dealer plays correctly
- [ ] Settlement shows correct payout
- [ ] Can start new round

### Two Players (2P)
- [ ] Both players can place bets in parallel
- [ ] Side bets evaluated per player
- [ ] Turn order: P1 → P2 correct
- [ ] Each player resolves independently
- [ ] New round resets state

### Three Players (3P)
- [ ] All three place bets in parallel
- [ ] Grid layout displays correctly
- [ ] Turn order: P1 → P2 → P3 correct
- [ ] Side bets evaluated per player
- [ ] Settlement shows all three results

### Four Players (4P)
- [ ] 2x2 grid layout displays
- [ ] All four bets placed
- [ ] Turn sequence correct
- [ ] All results calculated

### Five Players (5P)
- [ ] 5-column layout (or 5-arc) displays
- [ ] All five bets placed in parallel
- [ ] Turn sequence: P1 → P2 → P3 → P4 → P5
- [ ] All results calculated
- [ ] Mobile responsiveness verified

### Cross-Cutting:
- [ ] Mobile layouts (tablet, phone)
- [ ] Button positioning (no collisions)
- [ ] Animation smoothness
- [ ] State transitions between phases
- [ ] Balance updates correctly
- [ ] Insurance logic (if applicable)

---

## Git Commit Strategy

Each phase will have atomic commits:

```
Phase 1: fix: Move "Back to game" button to bottom-left
Phase 2: feat: Add player selection UI for 1-5 players
Phase 3: feat: Implement parallel betting phase with side bets
Phase 4: feat: Add side bet result display for 21+3
Phase 5: feat: Add turn indicators and queue display
Phase 6: feat: Implement mobile responsive layouts
Phase 7: feat: Add settlement phase UI with results summary
```

All commits will be pushed to `claude/recover-ace-svg-editor-EOTxG` before final PR to main.

---

## Success Criteria

✅ All 7 phases completed
✅ 1-5 player tables render correctly
✅ Game flow matches issue #140 specifications
✅ Parallel betting implemented
✅ Sequential turns implemented
✅ 21+3 side bet system working
✅ Mobile responsive
✅ No button collisions
✅ All tests passing
✅ Zero type errors
