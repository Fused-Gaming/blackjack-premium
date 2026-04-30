import styles from './LandingPage.module.css';

interface LandingPageProps {
  onEnter?: () => void;
}

export const LandingPage = ({ onEnter }: LandingPageProps) => {
  const handleEnter = () => {
    onEnter?.();
  };

  return (
    <div className={styles.container}>
      {/* Main Content Group - Grouped elements with controlled sizing */}
      <div className={styles.contentGroup}>
        {/* Logo Section */}
        <div className={styles.logoWrapper} onClick={handleEnter}>
          <svg
            className={styles.logoSvg}
            width="300"
            height="320"
            viewBox="0 0 100 160"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Card back pattern gradient - dark black with subtle mystery */}
              <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d0d0d" stopOpacity="1" />
                <stop offset="50%" stopColor="#0a0a0a" stopOpacity="1" />
                <stop offset="100%" stopColor="#1a1520" stopOpacity="1" />
              </linearGradient>

              {/* Very subtle card outer glow */}
              <filter id="cardOuterGlow">
                <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Card background with rounded corners (like a playing card) */}
            <rect x="5" y="5" width="90" height="150" rx="8" ry="8" fill="url(#cardGradient)" />

            {/* Card border - elegant outline with subtle glow */}
            <rect
              x="5"
              y="5"
              width="90"
              height="150"
              rx="8"
              ry="8"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.2"
              opacity="0.6"
              filter="url(#cardOuterGlow)"
            />

            {/* Inner card edge highlight (like real playing cards) */}
            <rect
              x="6.5"
              y="6.5"
              width="87"
              height="147"
              rx="7"
              ry="7"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="0.4"
              opacity="0.3"
            />

            {/* Card back pattern - subtle horizontal lines */}
            <g opacity="0.08" stroke="var(--brand)" strokeWidth="0.3">
              <line x1="10" y1="10" x2="90" y2="10" />
              <line x1="10" y1="20" x2="90" y2="20" />
              <line x1="10" y1="30" x2="90" y2="30" />
              <line x1="10" y1="40" x2="90" y2="40" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="10" y1="60" x2="90" y2="60" />
              <line x1="10" y1="70" x2="90" y2="70" />
              <line x1="10" y1="80" x2="90" y2="80" />
              <line x1="10" y1="90" x2="90" y2="90" />
              <line x1="10" y1="100" x2="90" y2="100" />
              <line x1="10" y1="110" x2="90" y2="110" />
              <line x1="10" y1="120" x2="90" y2="120" />
              <line x1="10" y1="130" x2="90" y2="130" />
              <line x1="10" y1="140" x2="90" y2="140" />
              <line x1="10" y1="150" x2="90" y2="150" />
            </g>

            {/* Spade symbol - centered on card */}
            <text
              x="50"
              y="75"
              fontFamily="Georgia, serif"
              fontSize="48"
              fill="var(--brand)"
              textAnchor="middle"
              fontWeight="bold"
            >
              ♠
            </text>

            {/* ACE wordmark below spade */}
            <text
              x="50"
              y="115"
              fontFamily="var(--font-display), Outfit, sans-serif"
              fontSize="14"
              fill="var(--brand)"
              textAnchor="middle"
              fontWeight="bold"
              letterSpacing="2"
            >
              ACE
            </text>

            {/* Subtle corner decorations (like on playing cards) */}
            <g opacity="0.4" fill="var(--brand)">
              {/* Top-left corner */}
              <circle cx="10" cy="12" r="1.2" />
              {/* Top-right corner */}
              <circle cx="90" cy="12" r="1.2" />
              {/* Bottom-left corner */}
              <circle cx="10" cy="148" r="1.2" />
              {/* Bottom-right corner */}
              <circle cx="90" cy="148" r="1.2" />
            </g>
          </svg>
        </div>

        {/* Brandmark */}
        <div className={styles.brandmark}>ACE Blackjack Premium</div>

        {/* Call to Action Button */}
        <div className={styles.ctaWrapper}>
          <button className={styles.ctaButton} onClick={handleEnter}>
            <span className={styles.buttonText}>Click Here to Enter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
