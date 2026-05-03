// Spacing, Sizing & Layout Tokens

export const spacingTokens = {
  // Spacing Scale (4px base)
  spacing: {
    xs: { value: '4px', use: 'Minimal gaps' },
    sm: { value: '8px', use: 'Small spacing' },
    md: { value: '16px', use: 'Standard padding' },
    lg: { value: '24px', use: 'Large padding' },
    xl: { value: '32px', use: 'Extra large spacing' },
    xxl: { value: '42px', use: 'Page margins' },
  },

  // Border Radius
  radius: {
    sm: { value: '12px', use: 'Card borders' },
    md: { value: '16px', use: 'Medium components' },
    lg: { value: '22px', use: 'Large panels' },
    xl: { value: '28px', use: 'Extra large cards' },
    full: { value: '999px', use: 'Pill shapes' },
    circle: { value: '50%', use: 'Circles' },
  },

  // Component Sizing
  components: {
    hudCard: {
      height: '74px',
      padding: '14px 18px',
      radius: '22px',
      use: 'Top HUD cards (wallet, phase, network)',
    },
    dealerPanel: {
      height: '152px',
      width: '600px',
      padding: '22px 26px',
      radius: '32px',
      use: 'Dealer hand display panel',
    },
    seatCard: {
      minHeight: '172px',
      padding: '16px',
      radius: '28px',
      use: 'Bottom seat information cards',
    },
    actionDock: {
      width: '250px',
      padding: '18px',
      radius: '30px',
      use: 'Right side action buttons and timer',
    },
    messageRail: {
      height: '64px',
      radius: '24px',
      use: 'Center message display',
    },
    card: {
      width: '64px',
      height: '88px',
      radius: '12px',
      use: 'Playing cards in dealer panel',
    },
    timer: {
      width: '88px',
      height: '88px',
      radius: '50%',
      use: 'Action timer display',
    },
    seatCircle: {
      radius: '64px',
      use: 'Seat indicator circles',
    },
  },

  // Shadows
  shadows: {
    sm: '0 4px 12px rgba(0,0,0,.2)',
    md: '0 14px 24px rgba(0,0,0,.38)',
    lg: '0 20px 44px rgba(0,0,0,.38)',
    xl: '0 28px 60px rgba(0,0,0,.46)',
    glow: '0 0 44px rgba(76,232,255,.1)',
    goldGlow: '0 0 45px rgba(245,215,127,.09)',
    greenGlow: '0 0 32px rgba(37,255,154,.22)',
  },

  // Stroke Widths
  stroke: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
    bold: '7px',
    halo: '8px',
    activHalo: '14px',
  },
};
