/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Casino Color System
        background: {
          DEFAULT: '#0B1220',
          dark: '#070A12',
          card: '#1a2332',
        },
        felt: {
          DEFAULT: '#0E4D3C',
          light: '#145A4A',
          dark: '#0C3B31',
          glow: '#1A6B54',
        },
        win: {
          DEFAULT: '#1ED760',
          glow: '#2EE770',
          dark: '#16A34A',
        },
        loss: {
          DEFAULT: '#E63946',
          glow: '#F04955',
          dark: '#DC2626',
        },
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFED4E',
          dark: '#DAA520',
        },
        chip: {
          '1': '#6B7280',    // Gray
          '5': '#E63946',    // Red
          '10': '#3B82F6',   // Blue
          '25': '#FFD700',   // Gold
          '50': '#10B981',   // Green
          '100': '#000000',  // Black
        },
        text: {
          DEFAULT: '#E5E7EB',
          muted: '#9CA3AF',
          bright: '#F9FAFB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fadeIn 0.2s ease-in',
        'flip': 'flip 0.6s ease-in-out',
        'deal': 'deal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'chip-stack': 'chipStack 0.3s ease-out',
        'chip-fly': 'chipFly 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'glow-pulse': 'glowPulse 1.5s ease-in-out infinite',
        'win-celebration': 'winCelebration 0.6s ease-out',
        'bust-shake': 'bustShake 0.5s ease-out',
        'count-up': 'countUp 0.8s ease-out',
        'bounce-subtle': 'bounceSubtle 0.5s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        deal: {
          '0%': {
            transform: 'translateX(-200px) translateY(-100px) rotate(-25deg) scale(0.8)',
            opacity: '0'
          },
          '60%': {
            transform: 'translateX(10px) translateY(5px) rotate(2deg) scale(1.05)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)',
            opacity: '1'
          },
        },
        chipStack: {
          '0%': { transform: 'translateY(20px) scale(0.8)', opacity: '0' },
          '60%': { transform: 'translateY(-5px) scale(1.1)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        chipFly: {
          '0%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'translate(var(--chip-fly-x, -100px), var(--chip-fly-y, -150px)) scale(0.5) rotate(360deg)',
            opacity: '0.8'
          },
          '100%': {
            transform: 'translate(var(--chip-fly-x, -150px), var(--chip-fly-y, -200px)) scale(0.2)',
            opacity: '0'
          },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(30, 215, 96, 0.4)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(30, 215, 96, 0.8), 0 0 60px rgba(30, 215, 96, 0.4)'
          },
        },
        winCelebration: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '30%': { transform: 'scale(1.15) rotate(-3deg)', opacity: '1' },
          '60%': { transform: 'scale(1.1) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        bustShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        countUp: {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'felt': 'inset 0 0 40px rgba(0, 0, 0, 0.4)',
        'glow-win': '0 0 30px rgba(30, 215, 96, 0.5), 0 0 60px rgba(30, 215, 96, 0.2)',
        'glow-loss': '0 0 30px rgba(230, 57, 70, 0.5), 0 0 60px rgba(230, 57, 70, 0.2)',
        'glow-gold': '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'chip': '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'button': '0 4px 14px rgba(0, 0, 0, 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
