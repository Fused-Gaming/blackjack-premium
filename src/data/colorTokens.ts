// ACE Blackjack Premium Color Palette
// Base: "Deep night sky over green felt, lit by amber gold"

export const colorTokens = {
  // Background & Surfaces
  background: {
    primary: { value: '#05080c', name: 'Deep Navy', use: 'Main background' },
    secondary: { value: '#0d131a', name: 'Panel Dark', use: 'UI panels and cards' },
    dark: { value: '#071813', name: 'Black Felt', use: 'Darkest backgrounds' },
  },

  // Felt Colors
  felt: {
    primary: { value: '#1f6d4e', name: 'Casino Green', use: 'Primary table felt' },
    secondary: { value: '#123e31', name: 'Deep Green', use: 'Felt gradients' },
    dark: { value: '#071813', name: 'Felt Shadow', use: 'Gradient stops' },
  },

  // Gold & Brass (Primary Accent)
  gold: {
    bright: { value: '#f5d77f', name: 'Bright Gold', use: 'Primary highlight, dealer panel' },
    muted: { value: '#bf9a4c', name: 'Gold Brass', use: 'Secondary accents' },
    stroke: { value: '#8a6e34', name: 'Gold Dim', use: 'Borders and dividers' },
  },

  // Status Colors
  status: {
    active: { value: '#25ff9a', name: 'Bright Green', use: 'Active state, turn indicator' },
    success: { value: '#55ffb8', name: 'Success Green', use: 'Win outcomes, positive actions' },
    warning: { value: '#f59e0b', name: 'Amber', use: 'Insurance, caution states' },
    danger: { value: '#ff4769', name: 'Bright Red', use: 'Loss, stand-off states' },
    info: { value: '#4ce8ff', name: 'Cyan', use: 'Information, next actions' },
    special: { value: '#c78bff', name: 'Purple', use: 'Special bets, side actions' },
  },

  // Text
  text: {
    primary: { value: '#fff7dc', name: 'Gold White', use: 'Primary text' },
    secondary: { value: '#c9d2cc', name: 'Light Gray', use: 'Secondary text' },
    muted: { value: '#9caaa5', name: 'Muted Gray', use: 'Disabled, tertiary text' },
    contrast: { value: '#06100c', name: 'Dark Contrast', use: 'Text on light backgrounds' },
  },

  // Gradients
  gradients: {
    felt: 'radial-gradient(circle at 50% 45%, #1f6d4e 0%, #123e31 56%, #071813 100%)',
    goldStroke: 'linear-gradient(90deg, #7d642f 0%, #f5d77f 50%, #7d642f 100%)',
    hitButton: 'linear-gradient(180deg, #55ffb8 0%, #18c77f 100%)',
    standButton: 'linear-gradient(180deg, #ffe89b 0%, #d0a941 100%)',
    doubleButton: 'linear-gradient(180deg, #ff8ea0 0%, #ff4d6d 100%)',
    splitButton: 'linear-gradient(180deg, #e2c3ff 0%, #a766f1 100%)',
  },

  // Semantic
  semantic: {
    'blackjack-win': { value: '#34d399', name: 'Emerald', use: 'Blackjack outcome' },
    'push': { value: '#f59e0b', name: 'Amber', use: 'Push/Tie outcome' },
    'loss': { value: '#ef4444', name: 'Red', use: 'Loss outcome' },
    'win': { value: '#10b981', name: 'Green', use: 'Standard win' },
  },
};
