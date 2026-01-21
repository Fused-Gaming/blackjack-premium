# Blackjack Game Rules

## Objective
Get a hand value closer to 21 than the dealer without going over 21.

## Card Values
- **Number cards (2-10)**: Face value
- **Face cards (J, Q, K)**: 10 points
- **Ace**: 1 or 11 points (whichever is better for the hand)

## Game Flow

### 1. Betting Phase
- Select bet amount using chip controls
- Minimum bet: Configurable (default: 1)
- Maximum bet: Configurable (default: 1000)
- Can play multiple seats (up to 3)

### 2. Initial Deal
- Each active seat receives 2 cards face up
- Dealer receives 2 cards (1 face up, 1 face down)
- If dealer shows Ace, insurance option is offered

### 3. Player Actions

#### Hit
- Take another card
- Can hit multiple times
- Bust if total exceeds 21

#### Stand
- Keep current hand
- End your turn

#### Double Down
- Double your bet
- Receive exactly 1 more card
- Turn ends automatically
- Available only on first 2 cards

#### Split
- Available when dealt a pair
- Split into 2 separate hands
- Place additional bet equal to original
- Play each hand separately
- Can only split once per hand
- Aces receive only 1 additional card when split

#### Insurance
- Offered when dealer shows Ace
- Costs half of original bet
- Pays 2:1 if dealer has blackjack
- Lost if dealer doesn't have blackjack

### 4. Dealer Play
- Dealer reveals face-down card
- Must hit on 16 or less
- Must stand on 17 or more
- Dealer does not have choice

### 5. Payouts
- **Blackjack (21 with first 2 cards)**: 3:2 (1.5x bet)
- **Regular win**: 1:1 (even money)
- **Insurance win**: 2:1
- **Push (tie)**: Bet returned
- **Loss**: Bet lost

## Special Rules

### Blackjack
- Ace + 10-value card on first 2 cards
- Beats any hand totaling 21
- Pays 3:2 unless dealer also has blackjack (push)

### Bust
- Hand total exceeds 21
- Immediate loss, bet forfeited
- Happens before dealer plays

### Push
- Player and dealer have same total
- Original bet returned
- No win or loss

### Soft vs Hard Hands
- **Soft hand**: Contains an Ace counted as 11
- **Hard hand**: No Ace, or Ace counted as 1
- Example: A-6 is "soft 17" (can't bust with one hit)

## Strategy Tips

### Basic Strategy
- Always split Aces and 8s
- Never split 5s or 10s
- Double on 11 (unless dealer shows Ace)
- Hit on 12-16 if dealer shows 7 or higher
- Stand on 17 or higher

### Insurance
- Statistically unfavorable bet
- House edge: ~7.4%
- Only worth it if counting cards (not applicable here)

## House Rules (This Implementation)

1. **Deck**: 6 decks (312 cards)
2. **Shuffle**: After each hand
3. **Dealer**: Stands on all 17s (soft and hard)
4. **Blackjack payout**: 3:2
5. **Insurance payout**: 2:1
6. **Double down**: Any first 2 cards
7. **Split**: Once per hand, pairs only
8. **Split Aces**: Receive only 1 card each
9. **Surrender**: Not available
10. **Side bets**: Available (optional feature)

## Win/Loss Scenarios

| Scenario | Result |
|----------|--------|
| Player blackjack, dealer no blackjack | Win 1.5x bet |
| Player blackjack, dealer blackjack | Push (bet returned) |
| Player 21 (3+ cards), dealer < 21 | Win 1x bet |
| Player < 21, dealer bust | Win 1x bet |
| Player < 21, dealer < 21, player higher | Win 1x bet |
| Player = dealer (no blackjack) | Push (bet returned) |
| Player < dealer (both < 21) | Lose bet |
| Player bust | Lose bet |
| Dealer blackjack, player no blackjack | Lose bet |
| Insurance bet, dealer blackjack | Win 2x insurance |
| Insurance bet, dealer no blackjack | Lose insurance |

## Probability & Odds

### Blackjack Probability
- Probability of blackjack: ~4.8%
- Probability of bust (hitting on 12-16): varies by hand

### Expected Outcomes
- Player bust: ~28%
- Dealer bust: ~28%
- Push: ~8%
- House edge (perfect play): ~0.5%

## Game Phases

1. **Idle**: Waiting for bets
2. **Betting**: Players placing bets
3. **Dealing**: Cards being dealt
4. **Insurance**: Dealer shows Ace, offer insurance
5. **Player Turn**: Player making decisions
6. **Dealer Turn**: Dealer playing out hand
7. **Showdown**: Comparing hands and payouts
8. **Complete**: Round finished, prepare for next

## Side Bets (Optional Feature)

### 21+3
- Three-card poker hand (player's 2 cards + dealer upcard)
- Payouts vary by hand strength

### Perfect Pairs
- Bet that first 2 cards will be a pair
- Different payouts for mixed/colored/perfect pairs

*Note: Side bets increase house edge significantly*
