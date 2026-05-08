import { create } from 'zustand';
import type { GameState, Card, PlayerSeat } from '../types';
import { createShoe, shuffleDeck, dealCard } from '../engine/deck';
import {
  createHand,
  addCardToHand,
  evaluateHand,
  compareHands,
  splitHand,
  doubleDownHand,
  canHit,
} from '../engine/hand';
import { calculatePayout } from '../engine/payouts';

const BLACKJACK_CHECK_DELAY = 100;

// 21+3 side bet evaluation (Flush, Straight, Three of a Kind, Pair)
const evaluateHandForTwentyOneThree = (cards: Card[]) => {
  if (cards.length !== 3) return { result: 'loss' as const, payout: 0 };

  const ranks = cards.map(c => c.rank);
  const suits = cards.map(c => c.suit);

  // Check for three of a kind (triple)
  if (ranks[0] === ranks[1] && ranks[1] === ranks[2]) {
    return { result: 'win' as const, payout: 100 };
  }

  // Check for straight (consecutive ranks)
  const rankOrder = {
    A: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13,
  } as const;
  const sortedRanks = ranks.map(r => rankOrder[r]).sort((a, b) => a - b);
  const isStraight = (sortedRanks[2] - sortedRanks[1] === 1 && sortedRanks[1] - sortedRanks[0] === 1) ||
                     (sortedRanks[0] === 1 && sortedRanks[1] === 12 && sortedRanks[2] === 13); // A-K-Q

  // Check for flush (all same suit)
  const isFlush = suits[0] === suits[1] && suits[1] === suits[2];

  if (isStraight && isFlush) {
    return { result: 'win' as const, payout: 40 }; // Straight flush
  }
  if (ranks[0] === ranks[1] || ranks[1] === ranks[2] || ranks[0] === ranks[2]) {
    return { result: 'win' as const, payout: 15 }; // Pair
  }
  if (isStraight) {
    return { result: 'win' as const, payout: 10 }; // Straight
  }
  if (isFlush) {
    return { result: 'win' as const, payout: 5 }; // Flush
  }

  return { result: 'loss' as const, payout: 0 };
};

interface GameStore extends GameState {
  // Public Actions
  setNumPlayers: (num: number) => void;
  initializeSeats: (num: number) => void;
  placeBet: (seatId: string, amount: number, sideBetAmount?: number) => void;
  lockBets: () => void;
  distributeCards: () => void;
  startGame: () => void;
  hit: () => void;
  stand: () => void;
  double: () => void;
  split: () => void;
  moveToNextTurn: () => void;
  placeInsurance: (seatId: string) => void;
  declineInsurance: () => void;
  resetGame: () => void;
  setMessage: (message: string) => void;

  // Internal Helper Methods
  evaluateSideBets: () => void;
  checkForBlackjacks: () => void;
  moveToNextHand: () => void;
  settleBets: () => void;
  playDealerTurn: () => void;
}

const INITIAL_BALANCE = 10000;

const SEAT_IDS = ['seat1', 'seat2', 'seat3', 'seat4', 'seat5'] as const;

const createInitialSeats = (numPlayers: number) => {
  const seats: Record<string, PlayerSeat> = {};
  for (let i = 0; i < numPlayers; i++) {
    const seatId = SEAT_IDS[i];
    seats[seatId] = {
      id: seatId,
      hands: [createHand()],
      active: false,
      currentHandIndex: 0,
      betLocked: false,
      balance: INITIAL_BALANCE,
    };
  }
  return seats;
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  phase: 'idle',
  deck: [],
  dealerHand: [],
  playerSeats: createInitialSeats(1),
  numPlayers: 1,
  activeSeatId: null,
  insuranceBets: {},
  balance: INITIAL_BALANCE,
  message: 'Place your bets',
  turnQueue: [],
  currentTurnIndex: 0,

  // Actions
  placeBet: (seatId: string, amount: number, sideBetAmount?: number) => {
    const state = get();
    const seat = state.playerSeats[seatId];

    if (!seat) {
      set({ message: 'Invalid seat' });
      return;
    }

    const totalCost = amount + (sideBetAmount || 0);
    const availableBalance = seat.balance + state.balance; // Total available

    if (availableBalance < totalCost) {
      set({ message: 'Insufficient balance' });
      return;
    }

    const hand = createHand(amount);
    if (sideBetAmount && sideBetAmount > 0) {
      hand.sideBets = [{ type: 'twentyOneThree', amount: sideBetAmount }];
    }

    set(state => {
      const seatBalance = state.playerSeats[seatId].balance;
      const deductFromSeat = Math.min(totalCost, seatBalance);
      const deductFromGlobal = totalCost - deductFromSeat;

      return {
        playerSeats: {
          ...state.playerSeats,
          [seatId]: {
            ...state.playerSeats[seatId],
            hands: [hand],
            active: true,
            balance: seatBalance - deductFromSeat,
          },
        },
        balance: state.balance - deductFromGlobal,
        phase: 'bettingOpen',
        message: 'Bet placed',
      };
    });
  },

  startGame: () => {
    const state = get();

    // Check if any bets placed
    const hasActiveBets = Object.values(state.playerSeats).some(seat => seat.active && seat.hands[0].bet > 0);

    if (!hasActiveBets) {
      set({ message: 'Please place a bet first' });
      return;
    }

    // Create and shuffle new deck
    let deck = shuffleDeck(createShoe(6));
    let dealerHand: Card[] = [];
    const updatedSeats = { ...state.playerSeats };
    const turnQueue: Array<{ seatId: string; handIndex: number }> = [];

    // Deal initial cards - 2 to each active seat, 2 to dealer
    for (const seatId of Object.keys(updatedSeats)) {
      if (updatedSeats[seatId].active) {
        const result1 = dealCard(deck, true);
        const result2 = dealCard(result1.remainingDeck, true);

        updatedSeats[seatId].hands[0] = addCardToHand(
          addCardToHand(updatedSeats[seatId].hands[0], result1.card),
          result2.card
        );

        // Add to turn queue for sequential play
        turnQueue.push({ seatId, handIndex: 0 });

        deck = result2.remainingDeck;
      }
    }

    // Deal dealer cards (1 up, 1 down)
    const dealerCard1 = dealCard(deck, true);
    const dealerCard2 = dealCard(dealerCard1.remainingDeck, false);
    dealerHand = [dealerCard1.card, dealerCard2.card];
    deck = dealerCard2.remainingDeck;

    // Check for dealer ace (insurance opportunity)
    const shouldOfferInsurance = dealerHand[0].rank === 'A';

    set({
      deck,
      dealerHand,
      playerSeats: updatedSeats,
      turnQueue,
      currentTurnIndex: -1, // Will be incremented before first turn
      phase: shouldOfferInsurance ? 'insurance' : 'sideBetEvaluation',
      message: shouldOfferInsurance ? 'Dealer showing Ace. Insurance?' : 'Evaluating side bets...',
    });

    // Auto-proceed to side bet evaluation
    if (!shouldOfferInsurance) {
      setTimeout(() => {
        get().evaluateSideBets();
      }, BLACKJACK_CHECK_DELAY);
    }
  },

  checkForBlackjacks: () => {
    const state = get();
    const dealerValue = evaluateHand(state.dealerHand, false); // Dealer never splits
    const dealerHasBlackjack = dealerValue.isBlackjack;

    const updatedSeats = { ...state.playerSeats };
    let hasAnyPlayerBlackjack = false;
    let hasAnyPlayableHand = false;
    let blackjackPayoutTotal = 0;

    Object.values(updatedSeats).forEach(seat => {
      if (!seat.active) return;

      seat.hands = seat.hands.map(hand => {
        const handValue = evaluateHand(hand.cards);
        const isNaturalBlackjack = hand.cards.length === 2 && handValue.isBlackjack;

        if (!isNaturalBlackjack) {
          if (hand.status === 'playing') hasAnyPlayableHand = true;
          return hand;
        }

        hasAnyPlayerBlackjack = true;

        if (dealerHasBlackjack) {
          // Push on player blackjack vs dealer blackjack
          return { ...hand, status: 'stand' as typeof hand.status };
        }

        // Player natural blackjack pays 3:2
        blackjackPayoutTotal += calculatePayout(hand, 'blackjack');
        return { ...hand, status: 'stand' as typeof hand.status };
      });
    });

    if (dealerHasBlackjack) {
      set({
        playerSeats: updatedSeats,
        phase: 'settlement',
        message: hasAnyPlayerBlackjack ? 'Blackjack push on matching hands' : 'Dealer Blackjack!',
      });
      get().settleBets();
      return;
    }

    if (hasAnyPlayerBlackjack) {
      set({
        playerSeats: updatedSeats,
        balance: state.balance + blackjackPayoutTotal,
        phase: hasAnyPlayableHand ? 'playerTurns' : 'settlement',
        message: hasAnyPlayableHand ? 'Blackjack paid (3:2). Continue playing.' : 'Blackjack paid (3:2)!',
      });

      if (!hasAnyPlayableHand) {
        get().settleBets();
        return;
      }
    } else {
      set({ phase: 'playerTurns' });
    }

    // Start turn sequence
    setTimeout(() => {
      get().moveToNextTurn();
    }, 500);
  },

  hit: () => {
    const state = get();
    if (state.phase !== 'playerTurns' || !state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];
    const currentHand = seat.hands[seat.currentHandIndex];

    // Check if hand can hit (prevents hitting on split Aces or completed hands)
    if (!canHit(currentHand)) {
      set({ message: currentHand.splitFromAces ? 'Split Aces receive only one card' : 'Cannot hit this hand' });
      get().moveToNextHand();
      return;
    }

    const result = dealCard(state.deck, true);
    const updatedHand = addCardToHand(currentHand, result.card);
    const handValue = evaluateHand(updatedHand.cards, updatedHand.isSplit);

    const updatedSeats = {
      ...state.playerSeats,
      [state.activeSeatId]: {
        ...seat,
        hands: seat.hands.map((h, i) => (i === seat.currentHandIndex ? updatedHand : h)),
      },
    };

    set({
      deck: result.remainingDeck,
      playerSeats: updatedSeats,
      message: handValue.isBust ? 'Bust!' : `Hand value: ${handValue.value}`,
    });

    // Auto-proceed if hand is complete
    if (handValue.isBust || handValue.value === 21) {
      setTimeout(() => {
        get().moveToNextHand();
      }, 1000);
    }
  },

  stand: () => {
    const state = get();
    if (state.phase !== 'playerTurns' || !state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];
    const updatedHand = { ...seat.hands[seat.currentHandIndex], status: 'stand' as const };

    set({
      playerSeats: {
        ...state.playerSeats,
        [state.activeSeatId]: {
          ...seat,
          hands: seat.hands.map((h, i) => (i === seat.currentHandIndex ? updatedHand : h)),
        },
      },
      message: 'Standing',
    });

    get().moveToNextHand();
  },

  double: () => {
    const state = get();
    if (state.phase !== 'playerTurns' || !state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];
    const currentHand = seat.hands[seat.currentHandIndex];

    if (state.balance < currentHand.bet) {
      set({ message: 'Insufficient balance to double' });
      return;
    }

    const doubledHand = doubleDownHand(currentHand, true); // Allow double after split
    const result = dealCard(state.deck, true);
    const finalHand = { ...addCardToHand(doubledHand, result.card), status: 'stand' as const };

    set({
      deck: result.remainingDeck,
      balance: state.balance - currentHand.bet,
      playerSeats: {
        ...state.playerSeats,
        [state.activeSeatId]: {
          ...seat,
          hands: seat.hands.map((h, i) => (i === seat.currentHandIndex ? finalHand : h)),
        },
      },
      message: 'Doubled down',
    });

    setTimeout(() => {
      get().moveToNextHand();
    }, 1000);
  },

  split: () => {
    const state = get();
    if (state.phase !== 'playerTurns' || !state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];
    const currentHand = seat.hands[seat.currentHandIndex];
    const currentHandCount = seat.hands.length;

    // Check balance
    if (state.balance < currentHand.bet) {
      set({ message: 'Insufficient balance to split' });
      return;
    }

    // Split the hand (with max hands limit of 4, no re-split Aces)
    let hand1, hand2;
    try {
      const result = splitHand(currentHand, currentHandCount, 4, false);
      hand1 = result.hand1;
      hand2 = result.hand2;
    } catch (error) {
      set({ message: error instanceof Error ? error.message : 'Cannot split' });
      return;
    }

    const isSplittingAces = currentHand.cards[0].rank === 'A';

    // Deal one card to each split hand
    const result1 = dealCard(state.deck, true);
    const result2 = dealCard(result1.remainingDeck, true);

    let newHand1 = addCardToHand(hand1, result1.card);
    let newHand2 = addCardToHand(hand2, result2.card);

    // Auto-stand split Aces (they can only receive one card)
    if (isSplittingAces) {
      newHand1 = { ...newHand1, status: 'stand' as const };
      newHand2 = { ...newHand2, status: 'stand' as const };
    }

    const newHands = [...seat.hands];
    newHands[seat.currentHandIndex] = newHand1;
    newHands.splice(seat.currentHandIndex + 1, 0, newHand2);

    set({
      deck: result2.remainingDeck,
      balance: state.balance - currentHand.bet,
      playerSeats: {
        ...state.playerSeats,
        [state.activeSeatId]: {
          ...seat,
          hands: newHands,
        },
      },
      message: isSplittingAces ? 'Aces split (one card each)' : 'Hand split',
    });

    // If split Aces, auto-proceed to next hand since they cannot hit
    if (isSplittingAces) {
      setTimeout(() => {
        get().moveToNextHand();
      }, 1000);
    }
  },

  placeInsurance: (seatId: string) => {
    const state = get();
    const seat = state.playerSeats[seatId];
    const insuranceAmount = seat.hands[0].bet / 2;

    if (state.balance < insuranceAmount) {
      set({ message: 'Insufficient balance for insurance' });
      return;
    }

    set({
      insuranceBets: { ...state.insuranceBets, [seatId]: insuranceAmount },
      balance: state.balance - insuranceAmount,
      phase: 'sideBetEvaluation',
      message: 'Insurance placed',
    });

    get().evaluateSideBets();
  },

  declineInsurance: () => {
    set({
      phase: 'sideBetEvaluation',
      message: 'Insurance declined',
    });

    get().checkForBlackjacks();
  },

  moveToNextHand: () => {
    const state = get();
    if (!state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];

    // Check if there are more hands for this seat
    if (seat.currentHandIndex < seat.hands.length - 1) {
      set({
        playerSeats: {
          ...state.playerSeats,
          [state.activeSeatId]: {
            ...seat,
            currentHandIndex: seat.currentHandIndex + 1,
          },
        },
        message: 'Next hand',
      });
      return;
    }

    // All hands for this seat complete, move to next player turn
    get().moveToNextTurn();
  },

  playDealerTurn: () => {
    set({ phase: 'dealerTurn', message: 'Dealer playing' });

    const playDealerCard = () => {
      const state = get();
      let dealerHand = [...state.dealerHand];

      // Flip hole card
      dealerHand = dealerHand.map(card => ({ ...card, faceUp: true }));

      let deck = state.deck;
      const dealerValue = evaluateHand(dealerHand, false); // Dealer never splits

      if (dealerValue.value < 17) {
        const result = dealCard(deck, true);
        dealerHand = [...dealerHand, result.card];
        deck = result.remainingDeck;

        set({ dealerHand, deck });

        setTimeout(playDealerCard, 1000);
      } else {
        set({ dealerHand, phase: 'complete' });
        setTimeout(() => {
          get().settleBets();
        }, 1000);
      }
    };

    setTimeout(playDealerCard, 1000);
  },

  settleBets: () => {
    const state = get();
    let totalPayout = 0;

    for (const seat of Object.values(state.playerSeats)) {
      if (!seat.active) continue;

      for (const hand of seat.hands) {
        const outcome = compareHands(hand, state.dealerHand);
        const payout = calculatePayout(hand, outcome);
        totalPayout += payout;
      }
    }

    const dealerResult = evaluateHand(state.dealerHand);
    const dealerHasBlackjack = dealerResult.isBlackjack;
    let insuranceNet = 0;

    for (const amount of Object.values(state.insuranceBets)) {
      if (dealerHasBlackjack) {
        // Insurance pays 2:1 when dealer has blackjack
        insuranceNet += amount * 2;
      }
    }

    const roundTotal = totalPayout + insuranceNet;

    set({
      balance: state.balance + roundTotal,
      insuranceBets: {},
      message: `Round complete. Payout: ${totalPayout}${insuranceNet !== 0 ? `, Insurance: ${insuranceNet}` : ''}`,
    });
  },

  resetGame: () => {
    const state = get();
    set({
      phase: 'bettingOpen',
      deck: [],
      dealerHand: [],
      playerSeats: createInitialSeats(state.numPlayers),
      activeSeatId: null,
      insuranceBets: {},
      turnQueue: [],
      currentTurnIndex: 0,
      message: 'Place your bets',
    });
  },

  setMessage: (message: string) => set({ message }),

  setNumPlayers: (num: number) => {
    const validNum = Math.max(1, Math.min(5, num));
    set({
      numPlayers: validNum,
      playerSeats: createInitialSeats(validNum),
      phase: 'idle',
      message: 'Select player seats and place bets',
    });
  },

  initializeSeats: (num: number) => {
    const validNum = Math.max(1, Math.min(5, num));
    const seats = createInitialSeats(validNum);
    set({
      numPlayers: validNum,
      playerSeats: seats,
    });
  },

  lockBets: () => {
    const state = get();
    const hasActiveBets = Object.values(state.playerSeats).some(
      seat => seat.active && seat.hands[0].bet > 0
    );

    if (!hasActiveBets) {
      set({ message: 'Please place at least one bet' });
      return;
    }

    const updatedSeats = { ...state.playerSeats };
    Object.keys(updatedSeats).forEach(seatId => {
      if (updatedSeats[seatId].active) {
        updatedSeats[seatId].betLocked = true;
      }
    });

    set({
      playerSeats: updatedSeats,
      phase: 'dealing',
      message: 'Dealing cards...',
    });

    // Wait for dealing animation to complete, then distribute cards
    const animationDuration = (state.numPlayers * 4 + 2) * 200 + 500; // Time for all cards + final delay
    setTimeout(() => {
      get().distributeCards();
    }, animationDuration);
  },

  distributeCards: () => {
    const state = get();

    // Check if any bets placed
    const hasActiveBets = Object.values(state.playerSeats).some(seat => seat.active && seat.hands[0].bet > 0);

    if (!hasActiveBets) {
      set({ message: 'Please place a bet first' });
      return;
    }

    // Create and shuffle new deck
    let deck = shuffleDeck(createShoe(6));
    let dealerHand: Card[] = [];
    const updatedSeats = { ...state.playerSeats };
    const turnQueue: Array<{ seatId: string; handIndex: number }> = [];

    // Deal initial cards - 2 to each active seat, 2 to dealer
    for (const seatId of Object.keys(updatedSeats)) {
      if (updatedSeats[seatId].active) {
        const result1 = dealCard(deck, true);
        const result2 = dealCard(result1.remainingDeck, true);

        updatedSeats[seatId].hands[0] = addCardToHand(
          addCardToHand(updatedSeats[seatId].hands[0], result1.card),
          result2.card
        );

        // Add to turn queue for sequential play
        turnQueue.push({ seatId, handIndex: 0 });

        deck = result2.remainingDeck;
      }
    }

    // Deal dealer cards (1 up, 1 down)
    const dealerCard1 = dealCard(deck, true);
    const dealerCard2 = dealCard(dealerCard1.remainingDeck, false);
    dealerHand = [dealerCard1.card, dealerCard2.card];
    deck = dealerCard2.remainingDeck;

    // Check for dealer ace (insurance opportunity)
    const shouldOfferInsurance = dealerHand[0].rank === 'A';

    set({
      deck,
      dealerHand,
      playerSeats: updatedSeats,
      turnQueue,
      currentTurnIndex: -1, // Will be incremented before first turn
      phase: shouldOfferInsurance ? 'insurance' : 'sideBetEvaluation',
      message: shouldOfferInsurance ? 'Dealer showing Ace. Insurance?' : 'Evaluating side bets...',
    });

    // Auto-proceed to side bet evaluation
    if (!shouldOfferInsurance) {
      setTimeout(() => {
        get().checkForBlackjacks();
      }, BLACKJACK_CHECK_DELAY);
    }
  },

  evaluateSideBets: () => {
    const state = get();
    const dealerCards = state.dealerHand.slice(0, 1); // Just upcard for evaluation

    const updatedSeats = { ...state.playerSeats };

    Object.keys(updatedSeats).forEach(seatId => {
      const seat = updatedSeats[seatId];
      if (!seat.active) return;

      seat.hands = seat.hands.map(hand => {
        if (!hand.sideBets || hand.sideBets.length === 0) return hand;

        const updatedSideBets = hand.sideBets.map(bet => {
          if (bet.type === 'twentyOneThree') {
            // 21+3 uses player's 2 cards + dealer's upcard
            const threeCards = [...hand.cards.slice(0, 2), ...dealerCards];
            if (threeCards.length === 3) {
              const result = evaluateHandForTwentyOneThree(threeCards);
              return {
                ...bet,
                result: result.result,
                payout: result.payout * bet.amount,
              };
            }
          }
          return bet;
        });

        return { ...hand, sideBets: updatedSideBets };
      });
    });

    set({ playerSeats: updatedSeats, phase: 'sideBetEvaluation' });

    setTimeout(() => {
      get().checkForBlackjacks();
    }, 500);
  },

  moveToNextTurn: () => {
    const state = get();
    const nextIndex = state.currentTurnIndex + 1;

    if (nextIndex >= state.turnQueue.length) {
      // All turns complete, move to dealer
      get().playDealerTurn();
      return;
    }

    const nextEntry = state.turnQueue[nextIndex];
    set({
      currentTurnIndex: nextIndex,
      activeSeatId: nextEntry.seatId,
      playerSeats: {
        ...state.playerSeats,
        [nextEntry.seatId]: {
          ...state.playerSeats[nextEntry.seatId],
          currentHandIndex: nextEntry.handIndex,
        },
      },
      message: `${nextEntry.seatId}'s turn`,
    });
  },
}));
