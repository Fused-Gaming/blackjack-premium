export const notificationTokens = {
  outcomes: {
    win: { label: 'Win', color: '#10B981', icon: '✓', bgColor: 'bg-green-900/30', borderColor: 'border-green-500/50' },
    loss: { label: 'Loss', color: '#EF4444', icon: '✗', bgColor: 'bg-red-900/30', borderColor: 'border-red-500/50' },
    push: { label: 'Push', color: '#F59E0B', icon: '=', bgColor: 'bg-yellow-900/30', borderColor: 'border-yellow-500/50' },
    blackjack: { label: 'Blackjack!', color: '#34D399', icon: '★', bgColor: 'bg-emerald-900/30', borderColor: 'border-emerald-500/50' },
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
