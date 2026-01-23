import { create } from 'zustand';
import type { GameState, Card } from '../types';
import { createShoe, shuffleDeck, dealCard } from '../engine/deck';
import { createHand, addCardToHand, evaluateHand, compareHands, splitHand, doubleDownHand } from '../engine/hand';
import { calculatePayout } from '../engine/payouts';

interface GameStore extends GameState {
  // Public Actions
  placeBet: (seatId: string, amount: number) => void;
  startGame: () => void;
  hit: () => void;
  stand: () => void;
  double: () => void;
  split: () => void;
  placeInsurance: (seatId: string) => void;
  resetGame: () => void;
  setMessage: (message: string) => void;

  // Internal Helper Methods
  checkForBlackjacks: () => void;
  settleBets: () => void;
  moveToNextHand: () => void;
  playDealerTurn: () => void;
}

const INITIAL_BALANCE = 10000;

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  phase: 'idle',
  deck: [],
  dealerHand: [],
  playerSeats: {
    seat1: {
      id: 'seat1',
      hands: [createHand()],
      active: false,
      currentHandIndex: 0,
    },
  },
  activeSeatId: null,
  insuranceBets: {},
  balance: INITIAL_BALANCE,
  message: 'Place your bets',

  // Actions
  placeBet: (seatId: string, amount: number) => {
    const state = get();

    if (state.balance < amount) {
      set({ message: 'Insufficient balance' });
      return;
    }

    set(state => ({
      playerSeats: {
        ...state.playerSeats,
        [seatId]: {
          ...state.playerSeats[seatId],
          hands: [createHand(amount)],
          active: true,
        },
      },
      balance: state.balance - amount,
      phase: 'betting',
      message: 'Bet placed. Click Deal to start',
    }));
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

    // Deal initial cards - 2 to each active seat, 2 to dealer
    for (const seatId of Object.keys(updatedSeats)) {
      if (updatedSeats[seatId].active) {
        const result1 = dealCard(deck, true);
        const result2 = dealCard(result1.remainingDeck, true);

        updatedSeats[seatId].hands[0] = addCardToHand(
          addCardToHand(updatedSeats[seatId].hands[0], result1.card),
          result2.card
        );

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
      phase: shouldOfferInsurance ? 'insurance' : 'playing',
      activeSeatId: Object.keys(updatedSeats).find(id => updatedSeats[id].active) || null,
      message: shouldOfferInsurance ? 'Dealer showing Ace. Insurance?' : 'Your turn',
    });

    // Auto-proceed if no insurance offered
    if (!shouldOfferInsurance) {
      setTimeout(() => {
        get().checkForBlackjacks();
      }, 100);
    }
  },

  checkForBlackjacks: () => {
    const state = get();
    const dealerValue = evaluateHand(state.dealerHand);

    if (dealerValue.isBlackjack) {
      // Dealer has blackjack, end game
      set({ phase: 'complete', message: 'Dealer Blackjack!' });
      get().settleBets();
    }
  },

  hit: () => {
    const state = get();
    if (state.phase !== 'playing' || !state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];
    const currentHand = seat.hands[seat.currentHandIndex];

    if (currentHand.status !== 'playing') {
      get().moveToNextHand();
      return;
    }

    const result = dealCard(state.deck, true);
    const updatedHand = addCardToHand(currentHand, result.card);
    const handValue = evaluateHand(updatedHand.cards);

    const updatedSeats = {
      ...state.playerSeats,
      [state.activeSeatId]: {
        ...seat,
        hands: seat.hands.map((h, i) => i === seat.currentHandIndex ? updatedHand : h),
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
    if (state.phase !== 'playing' || !state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];
    const updatedHand = { ...seat.hands[seat.currentHandIndex], status: 'stand' as const };

    set({
      playerSeats: {
        ...state.playerSeats,
        [state.activeSeatId]: {
          ...seat,
          hands: seat.hands.map((h, i) => i === seat.currentHandIndex ? updatedHand : h),
        },
      },
      message: 'Standing',
    });

    get().moveToNextHand();
  },

  double: () => {
    const state = get();
    if (state.phase !== 'playing' || !state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];
    const currentHand = seat.hands[seat.currentHandIndex];

    if (state.balance < currentHand.bet) {
      set({ message: 'Insufficient balance to double' });
      return;
    }

    const doubledHand = doubleDownHand(currentHand);
    const result = dealCard(state.deck, true);
    const finalHand = addCardToHand(doubledHand, result.card);
    finalHand.status = 'stand';

    set({
      deck: result.remainingDeck,
      balance: state.balance - currentHand.bet,
      playerSeats: {
        ...state.playerSeats,
        [state.activeSeatId]: {
          ...seat,
          hands: seat.hands.map((h, i) => i === seat.currentHandIndex ? finalHand : h),
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
    if (state.phase !== 'playing' || !state.activeSeatId) return;

    const seat = state.playerSeats[state.activeSeatId];
    const currentHand = seat.hands[seat.currentHandIndex];

    if (state.balance < currentHand.bet) {
      set({ message: 'Insufficient balance to split' });
      return;
    }

    const { hand1, hand2 } = splitHand(currentHand);

    // Deal one card to each split hand
    const result1 = dealCard(state.deck, true);
    const result2 = dealCard(result1.remainingDeck, true);

    const newHand1 = addCardToHand(hand1, result1.card);
    const newHand2 = addCardToHand(hand2, result2.card);

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
      message: 'Hand split',
    });
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
      phase: 'playing',
      message: 'Insurance placed',
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

    // All hands complete, move to dealer turn
    get().playDealerTurn();
  },

  playDealerTurn: () => {
    set({ phase: 'dealerTurn', message: 'Dealer playing' });

    const playDealerCard = () => {
      const state = get();
      let dealerHand = [...state.dealerHand];

      // Flip hole card
      dealerHand = dealerHand.map(card => ({ ...card, faceUp: true }));

      let deck = state.deck;
      const dealerValue = evaluateHand(dealerHand);

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

    set({
      balance: state.balance + totalPayout,
      message: `Round complete. Payout: ${totalPayout}`,
    });
  },

  resetGame: () => {
    set({
      phase: 'idle',
      deck: [],
      dealerHand: [],
      playerSeats: {
        seat1: {
          id: 'seat1',
          hands: [createHand()],
          active: false,
          currentHandIndex: 0,
        },
      },
      activeSeatId: null,
      insuranceBets: {},
      message: 'Place your bets',
    });
  },

  setMessage: (message: string) => set({ message }),
}));
