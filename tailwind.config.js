/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ACE Brand — Deep Navy / Amber Gold
        brand: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
          glow: '#FCD34D',
        },

        // Surface layers
        background: {
          DEFAULT: '#050A0F',
          dark: '#02050A',
          card: '#0D1B2A',
          panel: '#111F30',
          elevated: '#162840',
        },

        // Border
        border: {
          DEFAULT: '#1E3A5F',
          subtle: '#132538',
          bright: '#2A4F80',
        },

        // Felt table
        felt: {
          DEFAULT: '#0A3D26',
          light: '#0F5132',
          dark: '#073520',
          glow: '#1A6B54',
          rim: '#0C4530',
        },

        // Outcome colors
        win: {
          DEFAULT: '#10B981',
          glow: '#34D399',
          dark: '#059669',
          muted: '#064E3B',
        },
        loss: {
          DEFAULT: '#EF4444',
          glow: '#F87171',
          dark: '#DC2626',
          muted: '#450A0A',
        },
        push: {
          DEFAULT: '#F59E0B',
          muted: '#451A03',
        },

        // Actions (kept compatible with existing components)
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
        },

        // Gold accent
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFED4E',
          dark: '#DAA520',
          amber: '#F59E0B',
        },

        // Chip colors
        chip: {
          '1':   '#6B7280',
          '5':   '#EF4444',
          '10':  '#3B82F6',
          '25':  '#F59E0B',
          '50':  '#10B981',
          '100': '#1a1a1a',
          '500': '#7C3AED',
        },

        // Text scale
        text: {
          DEFAULT: '#E2E8F0',
          muted: '#64748B',
          subtle: '#475569',
          bright: '#F8FAFC',
          gold: '#F59E0B',
          mono: '#94A3B8',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },

      animation: {
        // Card animations
        'deal': 'deal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'flip': 'flip 0.6s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fadeIn 0.25s ease-in',
        'fade-in-slow': 'fadeIn 0.5s ease-in',
        // Chip animations
        'chip-stack': 'chipStack 0.3s ease-out',
        'chip-fly': 'chipFly 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        // Outcome animations
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'glow-pulse-gold': 'glowPulseGold 2s ease-in-out infinite',
        'win-celebration': 'winCelebration 0.6s ease-out',
        'bust-shake': 'bustShake 0.5s ease-out',
        'count-up': 'countUp 0.8s ease-out',
        'bounce-subtle': 'bounceSubtle 1.2s ease-in-out infinite',
        // UI
        'scale-in': 'scaleIn 0.2s ease-out',
        'modal-in': 'modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spin-slow': 'spin 3s linear infinite',
      },

      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-12px)', opacity: '0' },
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
        scaleIn: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        modalIn: {
          '0%': { transform: 'scale(0.88) translateY(16px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        deal: {
          '0%': {
            transform: 'translateX(-220px) translateY(-110px) rotate(-28deg) scale(0.75)',
            opacity: '0',
          },
          '65%': {
            transform: 'translateX(8px) translateY(4px) rotate(1.5deg) scale(1.04)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)',
            opacity: '1',
          },
        },
        chipStack: {
          '0%': { transform: 'translateY(20px) scale(0.8)', opacity: '0' },
          '60%': { transform: 'translateY(-5px) scale(1.08)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        chipFly: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '50%': { transform: 'translate(var(--chip-fly-x, -100px), var(--chip-fly-y, -150px)) scale(0.5) rotate(360deg)', opacity: '0.8' },
          '100%': { transform: 'translate(var(--chip-fly-x, -150px), var(--chip-fly-y, -200px)) scale(0.2)', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(16, 185, 129, 0.35)' },
          '50%': { boxShadow: '0 0 36px rgba(16, 185, 129, 0.7), 0 0 60px rgba(16, 185, 129, 0.3)' },
        },
        glowPulseGold: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.8), 0 0 70px rgba(245, 158, 11, 0.35)' },
        },
        winCelebration: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '30%': { transform: 'scale(1.14) rotate(-2.5deg)', opacity: '1' },
          '65%': { transform: 'scale(1.09) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        bustShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-6px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(6px)' },
        },
        countUp: {
          '0%': { transform: 'scale(0.88)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },

      boxShadow: {
        'felt': 'inset 0 0 60px rgba(0, 0, 0, 0.5)',
        'felt-rim': '0 0 0 3px rgba(255, 215, 0, 0.12), inset 0 0 80px rgba(0,0,0,0.4)',
        'glow-win': '0 0 24px rgba(16, 185, 129, 0.5), 0 0 50px rgba(16, 185, 129, 0.2)',
        'glow-loss': '0 0 24px rgba(239, 68, 68, 0.5), 0 0 50px rgba(239, 68, 68, 0.2)',
        'glow-gold': '0 0 24px rgba(245, 158, 11, 0.6), 0 0 50px rgba(245, 158, 11, 0.3)',
        'glow-brand': '0 0 20px rgba(245, 158, 11, 0.45)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.45), 0 1px 4px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.5)',
        'chip': '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
        'button': '0 4px 14px rgba(0, 0, 0, 0.3)',
        'panel': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'modal': '0 24px 64px rgba(0, 0, 0, 0.7)',
        'inner-glow': 'inset 0 0 24px rgba(255, 255, 255, 0.06)',
      },

      backdropBlur: {
        xs: '2px',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
