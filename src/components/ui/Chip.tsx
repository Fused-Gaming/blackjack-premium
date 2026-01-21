import { motion } from 'framer-motion';

interface ChipProps {
  value: number;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const CHIP_COLORS: Record<number, { bg: string; border: string; text: string }> = {
  1: { bg: 'bg-gray-600', border: 'border-gray-400', text: 'text-white' },
  5: { bg: 'bg-loss', border: 'border-loss-glow', text: 'text-white' },
  10: { bg: 'bg-primary', border: 'border-primary-light', text: 'text-white' },
  25: { bg: 'bg-gold', border: 'border-gold-light', text: 'text-gray-900' },
  50: { bg: 'bg-emerald-600', border: 'border-emerald-400', text: 'text-white' },
  100: { bg: 'bg-black', border: 'border-gray-700', text: 'text-gold' },
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
        transition-all duration-200
        ${colors.bg} ${colors.border} ${colors.text}
        ${selected ? 'ring-4 ring-gold scale-110' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer hover:shadow-glow-gold'}
        ${className}
      `}
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
