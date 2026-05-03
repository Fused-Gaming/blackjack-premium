export const animationTokens = {
  timing: {
    fast: { value: '150ms', use: 'Quick UI feedback' },
    base: { value: '250ms', use: 'Standard transitions' },
    slow: { value: '500ms', use: 'Entrance animations' },
    cardFlip: { value: '600ms', use: 'Card reveal' },
    cardDeal: { value: '500ms', use: 'Card deal from deck' },
  },
  easing: {
    spring: { value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', label: 'Spring' },
    out: { value: 'cubic-bezier(0.33, 0.66, 0.66, 1)', label: 'Out' },
    flip: { value: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', label: 'Flip' },
  },
  phases: ['Idle', 'Betting', 'Dealing', 'Insurance', 'Playing', 'DealerTurn', 'Complete'],
};
