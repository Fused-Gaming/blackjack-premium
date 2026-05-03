import { colorTokens } from './colorTokens';

export const notificationTokens = {
  outcomes: {
    win: {
      label: 'Win',
      color: colorTokens.semantic.win.value,
      icon: '✓',
      bgColor: 'bg-emerald-900/30',
      borderColor: 'border-emerald-500/50',
      gradient: 'from-emerald-900/30 to-teal-900/30'
    },
    loss: {
      label: 'Loss',
      color: colorTokens.semantic.loss.value,
      icon: '✗',
      bgColor: 'bg-red-900/30',
      borderColor: 'border-red-500/50',
      gradient: 'from-red-900/30 to-orange-900/30'
    },
    push: {
      label: 'Push',
      color: colorTokens.semantic.push.value,
      icon: '=',
      bgColor: 'bg-amber-900/30',
      borderColor: 'border-amber-500/50',
      gradient: 'from-amber-900/30 to-yellow-900/30'
    },
    blackjack: {
      label: 'Blackjack!',
      color: colorTokens.semantic['blackjack-win'].value,
      icon: '★',
      bgColor: 'bg-emerald-900/40',
      borderColor: 'border-emerald-400/60',
      gradient: 'from-emerald-900/40 to-green-900/40'
    },
  },
  phases: [
    { id: 'betting', label: 'Betting', description: 'Place your bets' },
    { id: 'insurance', label: 'Insurance', description: 'Dealer shows Ace' },
    { id: 'playing', label: 'Playing', description: 'Your turn to act' },
    { id: 'dealerTurn', label: 'Dealer Turn', description: 'Dealer is playing' },
    { id: 'complete', label: 'Complete', description: 'Round finished' },
  ],
  streakFormat: (count: number): string => (count > 10 ? '10+' : count.toString()),
};
