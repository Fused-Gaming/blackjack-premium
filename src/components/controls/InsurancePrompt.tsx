import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function InsurancePrompt() {
  const { phase, activeSeatId, placeInsurance } = useGameStore();

  if (phase !== 'insurance' || !activeSeatId) return null;

  const handleInsuranceYes = () => {
    placeInsurance(activeSeatId);
  };

  const handleInsuranceNo = () => {
    // Skip insurance and move to playing phase
    const { declineInsurance } = useGameStore.getState();
    declineInsurance();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gold rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Insurance?
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8">
          Dealer is showing an Ace. Take insurance at half your bet?
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          {/* YES Button */}
          <motion.button
            onClick={handleInsuranceYes}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-win to-win-dark text-white font-bold text-lg rounded-xl transition-all shadow-button hover:shadow-glow-win"
          >
            YES, INSURE
          </motion.button>

          {/* NO Button */}
          <motion.button
            onClick={handleInsuranceNo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-loss to-loss-dark text-white font-bold text-lg rounded-xl transition-all shadow-button hover:shadow-glow-loss"
          >
            NO, SKIP
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
