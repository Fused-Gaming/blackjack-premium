import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../utils/audioManager';

export function SoundToggle() {
  const { soundEnabled, setSoundEnabled } = useGameStore();

  const handleToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    audioManager.setEnabled(newState);
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center justify-center
        w-10 h-10 rounded-lg
        transition-all duration-200
        ${soundEnabled
          ? 'bg-brand hover:bg-brand-light shadow-glow-brand'
          : 'bg-background-elevated hover:bg-background-panel border border-border'
        }
      `}
      title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
    >
      {soundEnabled ? (
        // Speaker ON icon
        <svg className="w-5 h-5 text-background" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      ) : (
        // Speaker OFF icon
        <svg className="w-5 h-5 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.6915026,12.4744748 L21.0151496,16.7981218 C21.8039154,17.5868875 21.8039154,18.8060723 21.0151496,19.5948381 C20.2263838,20.3836039 19.0067266,20.3836039 18.2179608,19.5948381 L13.8943138,15.2711911 L9.57061275,19.5948381 C8.78185096,20.3836039 7.56219375,20.3836039 6.77343196,19.5948381 C5.98467017,18.8060723 5.98467017,17.5868875 6.77343196,16.7981218 L11.0971225,12.4744748 L6.77343196,8.15077273 C5.98467017,7.36201094 5.98467017,6.14235373 6.77343196,5.35359194 C7.56219375,4.56483015 8.78185096,4.56483015 9.57061275,5.35359194 L13.8943138,9.67729926 L18.2179608,5.35359194 C19.0067266,4.56483015 20.2263838,4.56483015 21.0151496,5.35359194 C21.8039154,6.14235373 21.8039154,7.36201094 21.0151496,8.15077273 L16.6915026,12.4744748 Z" />
        </svg>
      )}
    </motion.button>
  );
}
