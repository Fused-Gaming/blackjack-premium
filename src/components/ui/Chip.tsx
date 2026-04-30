import { motion } from 'framer-motion';

interface ChipProps {
  value: number;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const CHIP_COLORS: Record<number, { bg: string; border: string; text: string; var: string }> = {
  1: { bg: 'bg-[var(--chip-1)]', border: 'border-[color:var(--chip-1)]', text: 'text-white', var: '--chip-1' },
  5: { bg: 'bg-[var(--chip-5)]', border: 'border-[var(--loss-glow)]', text: 'text-white', var: '--chip-5' },
  10: { bg: 'bg-[var(--chip-10)]', border: 'border-[var(--primary-light)]', text: 'text-white', var: '--chip-10' },
  25: { bg: 'bg-[var(--chip-25)]', border: 'border-[var(--brand-light)]', text: 'text-gray-900', var: '--chip-25' },
  50: { bg: 'bg-[var(--chip-50)]', border: 'border-[var(--win-glow)]', text: 'text-white', var: '--chip-50' },
  100: { bg: 'bg-[var(--chip-100)]', border: 'border-gray-700', text: 'text-[var(--text-gold)]', var: '--chip-100' },
};

export function Chip({ value, selected = false, onClick, disabled = false, className = '' }: ChipProps) {
  const colors = CHIP_COLORS[value] || CHIP_COLORS[1];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`
        relative w-12 h-12 md:w-14 md:h-14 rounded-full
        flex items-center justify-center
        font-bold text-sm md:text-base
        border-3 shadow-chip
        transition-all duration-[var(--d-base)]
        ${colors.bg} ${colors.border} ${colors.text}
        ${selected ? 'ring-4 scale-110' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer hover:shadow-glow-gold'}
        ${className}
      `}
      style={selected ? { boxShadow: '0 0 0 4px var(--gold)' } : {}}
    >
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />

      {/* Value */}
      <span className="relative z-10 drop-shadow-lg">
        ${value}
      </span>

      {/* Outer ring for 3D effect */}
      <div className={`absolute inset-0 rounded-full border-2 ${colors.border} opacity-50`} style={{ transform: 'scale(1.05)' }} />
    </motion.button>
  );
}
