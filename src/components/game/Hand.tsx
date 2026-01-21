import { Card } from './Card';
import { evaluateHand } from '../../engine/hand';
import type { Hand as HandType } from '../../types';

interface HandProps {
  hand: HandType;
  label?: string;
  showValue?: boolean;
}

export function Hand({ hand, label, showValue = true }: HandProps) {
  const handValue = evaluateHand(hand.cards);

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <div className="text-white text-sm font-medium">{label}</div>
      )}

      <div className="flex items-center" style={{ paddingLeft: hand.cards.length > 0 ? 50 : 0 }}>
        {hand.cards.map((card, index) => (
          <Card key={index} card={card} index={index} delay={index * 0.15} />
        ))}
      </div>

      {showValue && hand.cards.length > 0 && (
        <div className="flex flex-col items-center gap-1">
          <div className={`text-lg font-bold ${handValue.isBust ? 'text-red-500' : 'text-white'}`}>
            {handValue.isBust ? 'BUST' : handValue.isBlackjack ? 'BLACKJACK' : handValue.value}
          </div>
          {handValue.isSoft && !handValue.isBlackjack && (
            <div className="text-xs text-gray-400">Soft</div>
          )}
        </div>
      )}
    </div>
  );
}
