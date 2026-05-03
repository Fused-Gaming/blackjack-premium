// Interface Component Specifications
// Drawn from 1920x1080 blackjack table mockup

export const interfaceComponents = {
  hudCards: {
    description: 'Top HUD information panels (wallet, phase, network)',
    layout: {
      position: 'Top bar across full width',
      height: '82px',
      gridTemplate: '360px 1fr 360px',
      spacing: '42px sides',
    },
    variants: [
      {
        name: 'Wallet Balance',
        content: 'WALLET BALANCE / $1,250.00',
        icon: '💰',
        alignment: 'left',
      },
      {
        name: 'Game Phase',
        content: 'PLAYER TURNS · ROUND 18',
        styling: 'pill-shaped, green border, centered',
        alignment: 'center',
      },
      {
        name: 'Network Status',
        content: 'NETWORK / CONTRACT / Synced · 34ms',
        styling: 'gold border, technical font',
        alignment: 'right',
      },
    ],
  },

  dealerPanel: {
    description: 'Dealer hand display with cards and total',
    position: 'Top center, below HUD',
    content: {
      header: 'DEALER + "Dealer must hit soft 17"',
      cards: ['Card Back (hidden)', 'Card 6♥ (revealed)'],
      total: 'Total: ?',
    },
    states: [
      { state: 'Dealing', cards: 'All backs' },
      { state: 'Revealed', cards: 'One back, one visible' },
      { state: 'Complete', cards: 'All visible with total' },
    ],
  },

  messageRail: {
    description: 'Center message display for game state',
    position: 'Below dealer panel',
    content: 'ACTING NOW: SEAT 3 · YOUR TURN · NEXT: SEAT 4',
    styling: 'cyan border, black background, large font',
  },

  leftRail: {
    description: 'Left side information panels',
    position: 'Left edge, middle of screen',
    panels: [
      {
        name: 'Table Limits',
        content: '$5 / $500',
        icon: '💵',
      },
      {
        name: 'Shoe Status',
        content: '287 Cards',
        icon: '🃏',
      },
      {
        name: '21+3 Mode',
        content: 'Seat-local',
        icon: '🎲',
      },
    ],
  },

  actionDock: {
    description: 'Right side player action panel',
    position: 'Right edge, middle of screen',
    width: '250px',
    components: [
      {
        name: 'Timer',
        type: 'conic-gradient circle',
        size: '88px',
        content: '08 (seconds)',
        colors: 'green to transparent',
      },
      {
        name: 'Status Label',
        content: 'SEAT 3 ACTIVE',
        styling: 'green text, centered',
      },
      {
        name: 'Action Buttons',
        layout: '2x2 grid',
        buttons: [
          { label: 'HIT', color: 'gradient-blue-to-teal' },
          { label: 'STAND', color: 'gradient-gold' },
          { label: 'DOUBLE', color: 'gradient-red' },
          { label: 'SPLIT', color: 'gradient-purple' },
        ],
      },
    ],
  },

  seatPanels: {
    description: 'Bottom seat information cards (1-5 players)',
    position: 'Bottom, spanning full width',
    layout: '5-column grid with gaps',
    cardHeight: '172px minimum',
    variants: [
      {
        seat: '1-5',
        sections: [
          { name: 'Header', content: 'Seat # / Status Badge' },
          { name: 'Metrics', content: 'Bet amount / 21+3 outcome' },
          { name: 'Cards', content: 'Player hand with total (seat 3 only)' },
        ],
      },
      {
        state: 'Inactive',
        styling: 'dim, muted colors',
        badges: ['NEXT', 'WAIT', 'IN 2', 'IN 3'],
      },
      {
        state: 'Active',
        styling: 'bright green border, glow effect',
        badges: ['ACTIVE'],
        content: 'Your current hand displayed',
      },
    ],
  },

  tableVisualization: {
    description: 'Central SVG blackjack table',
    position: 'Center screen',
    elements: [
      {
        name: 'Felt',
        type: 'ellipse with radial gradient',
        colors: 'green felt gradient',
      },
      {
        name: 'Seat Indicators',
        count: 5,
        positions: 'Bottom (1), Left-bottom (2), Bottom-center (3), Right-bottom (4), Top (5)',
        states: ['Next', 'Active', 'Stood', 'Waiting'],
        indicators: ['Circles', 'Turn chip with arrow', 'Status labels'],
      },
      {
        name: 'Dealing Lanes',
        count: 5,
        style: 'dashed cyan paths from deck to seats',
      },
      {
        name: 'Hand Display',
        content: 'Cards and totals for active player (seat 3)',
        position: 'Center-bottom',
      },
    ],
  },

  badges: {
    description: 'Seat status indicators',
    variants: [
      { label: 'NEXT', color: 'info-blue', meaning: 'Next to act' },
      { label: 'ACTIVE', color: 'success-green', meaning: 'Currently acting' },
      { label: 'STOOD', color: 'muted', meaning: 'Finished action' },
      { label: 'IN 2', color: 'info', meaning: 'Will act in 2 turns' },
      { label: 'IN 3', color: 'info', meaning: 'Will act in 3 turns' },
      { label: 'WAIT', color: 'muted', meaning: 'Waiting for seat availability' },
    ],
  },

  animations: {
    description: 'Key animations in interface',
    effects: [
      {
        name: 'Active Halo',
        target: 'Active seat circle',
        animation: 'pulse with stroke width change',
        duration: '1.25s',
        easing: 'ease-in-out infinite',
      },
      {
        name: 'Turn Chip Bob',
        target: 'Turn indicator arrow',
        animation: 'vertical bob up/down',
        duration: '1.2s',
        easing: 'ease-in-out infinite',
      },
      {
        name: 'Timer Progress',
        target: 'Action timer',
        animation: 'conic gradient fill from 0% to complete',
        easing: 'linear',
      },
    ],
  },

  responsive: {
    description: 'Responsive scaling',
    viewport: '1920x1080 base',
    scaling: 'transform: scale(min(calc(100vw / 1920), calc(100vh / 1080)))',
    breakpoints: [
      { size: '< 1920px or < 1080px', action: 'Scale entire stage proportionally' },
      { size: '< 1280px', action: 'Stack layout, reduce typography' },
      { size: '< 768px', action: 'Single column, mobile optimized' },
    ],
  },
};
