# Blackjack Game - Testing Guide

## Quick Start

**Development Server**: http://localhost:5173/
**Starting Balance**: $10,000
**Min Bet**: $1
**Max Bet**: $1,000

## Test Scenarios

### 1. Basic Betting Flow

**Steps:**
1. Open http://localhost:5173/
2. Select chip value (e.g., $5)
3. Click "Add Chip" to add to bet
4. Click "Confirm Bet"
5. Click "DEAL"

**Expected Result:**
- Balance decreases by bet amount
- Two cards dealt to player (face up)
- Two cards dealt to dealer (1 up, 1 down)
- Action buttons appear (HIT, STAND)

### 2. Hit and Stand

**Test Hit:**
1. Place bet and deal
2. Click "HIT"
3. Observe new card added to hand
4. Hand value updates

**Test Stand:**
1. Place bet and deal
2. Click "STAND"
3. Dealer reveals hole card
4. Dealer plays to completion
5. Winner determined and payout applied

**Expected Results:**
- Hit adds card to hand
- Stand moves to dealer turn
- Dealer hits on 16 or less, stands on 17+

### 3. Blackjack (Natural 21)

**How to Test:**
- Keep dealing until you get Ace + 10-value card

**Expected Result:**
- "BLACKJACK" displayed under hand
- Pays 3:2 (e.g., $10 bet = $15 profit)
- Unless dealer also has blackjack (push)

### 4. Bust

**Steps:**
1. Place bet and deal
2. Hit until hand value > 21

**Expected Result:**
- Hand shows "BUST" in red
- Bet is lost immediately
- Game moves to next action

### 5. Double Down

**Steps:**
1. Place bet ($20) and deal
2. Click "DOUBLE" button (appears only on first 2 cards)

**Expected Result:**
- Bet doubles to $40
- Exactly one card dealt
- Hand automatically stands
- Payout based on doubled bet

### 6. Split Pairs

**Steps:**
1. Place bet ($10) and deal
2. Wait for matching pair (e.g., 8-8)
3. Click "SPLIT" button

**Expected Result:**
- Additional $10 deducted from balance
- Two separate hands created
- Each hand gets one additional card
- Play each hand separately
- Total bet is now $20

### 7. Insurance

**Steps:**
1. Place bet and deal
2. Wait for dealer to show Ace

**Expected Result:**
- "Dealer showing Ace. Insurance?" message
- Insurance costs half original bet
- If dealer has blackjack: insurance pays 2:1
- If dealer doesn't: insurance is lost

### 8. Push (Tie)

**Steps:**
1. Place bet and deal
2. Stand on 18
3. Wait for dealer to also get 18

**Expected Result:**
- "Push" or tie message
- Original bet returned
- No profit or loss

### 9. Dealer Bust

**Steps:**
1. Place bet and deal
2. Stand on any value
3. Wait for dealer to bust (>21)

**Expected Result:**
- All non-bust hands win
- Pays 1:1

### 10. Multiple Rounds

**Steps:**
1. Complete a round
2. Click "New Round"
3. Place new bet

**Expected Result:**
- Table clears
- Balance persists
- Can place new bet

## Edge Cases to Test

### Balance Management
- [ ] Can't bet more than balance
- [ ] Balance updates correctly on wins
- [ ] Balance updates correctly on losses
- [ ] Balance updates correctly on pushes

### Soft Hands (Aces)
- [ ] Ace counts as 11 when possible (soft hand)
- [ ] Ace counts as 1 to avoid bust
- [ ] Multiple aces handled correctly
- [ ] "Soft" indicator shows when applicable

### Action Availability
- [ ] DOUBLE only available on first 2 cards
- [ ] SPLIT only available on pairs
- [ ] SPLIT not available if already split once
- [ ] All buttons disabled during dealer turn

### Game Flow
- [ ] Can't deal without bet
- [ ] Dealer plays automatically after player stands
- [ ] Hole card revealed at correct time
- [ ] New round button appears when round complete

### Payout Verification
- [ ] Blackjack pays 3:2 (e.g., $10 bet = $25 total return)
- [ ] Regular win pays 1:1 (e.g., $10 bet = $20 total return)
- [ ] Insurance pays 2:1 (e.g., $5 insurance = $15 total return)
- [ ] Push returns original bet

## Visual Testing

### Animations
- [ ] Cards slide in from left when dealt
- [ ] Smooth transitions between phases
- [ ] Button hover effects work
- [ ] Chip selector highlights selected chip

### Responsiveness
- [ ] Layout works on different window sizes
- [ ] Cards remain readable
- [ ] Buttons accessible
- [ ] Text readable

### Card Display
- [ ] Red suits (♥ ♦) show in red
- [ ] Black suits (♠ ♣) show in black
- [ ] Face-down cards show card back
- [ ] Face-up cards show rank and suit clearly

## Performance Testing

### Speed
- [ ] Cards deal smoothly without lag
- [ ] Button clicks respond immediately
- [ ] No noticeable delays in game flow
- [ ] Animations run at 60fps

### Memory
- [ ] No memory leaks after multiple rounds
- [ ] Browser doesn't slow down over time

## Test Results Template

```
Date: ____________
Tester: ___________

Basic Functionality:
[ ] Betting works
[ ] Dealing works
[ ] Hit works
[ ] Stand works
[ ] Double works
[ ] Split works
[ ] Insurance works

Advanced Features:
[ ] Blackjack detection
[ ] Bust detection
[ ] Soft hand calculation
[ ] Dealer AI works correctly
[ ] Payouts calculated correctly

Edge Cases:
[ ] Balance validation
[ ] Action button availability
[ ] Multiple hands (split)
[ ] Push/tie handling

Visual/UX:
[ ] Animations smooth
[ ] Cards readable
[ ] Layout clean
[ ] Messages clear

Performance:
[ ] No lag
[ ] No errors in console
[ ] Responsive

Issues Found:
_______________________________
_______________________________
_______________________________

Overall Rating: ___/10
```

## Common Issues & Fixes

### Issue: Can't place bet
**Fix**: Check balance is sufficient

### Issue: Buttons don't appear
**Fix**: Ensure game phase is 'playing'

### Issue: Dealer doesn't play
**Fix**: Ensure all player hands are complete (bust or stand)

### Issue: Wrong payout
**Fix**: Check game logs in console for calculation

### Issue: Split doesn't work
**Fix**: Verify you have a pair and haven't split already

## Development Console

Open browser DevTools (F12) to see:
- Game state in React DevTools
- Any errors in Console
- Network activity

## Automated Tests

Run automated tests:
```bash
npm test
```

Current test coverage:
- ✅ 31 tests passing
- ✅ Deck creation and shuffling
- ✅ Hand evaluation
- ✅ Blackjack detection
- ✅ Bust detection
- ✅ Soft hand calculation
- ✅ Split validation
- ✅ Double validation

## Reporting Issues

When reporting issues, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser console errors (if any)
5. Screenshot (if visual issue)

---

**Happy Testing!** 🎰

Remember: This is a fun money game for testing. No real money is involved.
