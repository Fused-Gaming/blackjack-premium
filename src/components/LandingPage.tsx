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
      {/* Logo Section */}
      <div className={styles.logoWrapper}>
        <svg
          className={styles.logoSvg}
          width="300"
          height="300"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--bg-panel)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--bg)" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main background */}
          <rect width="32" height="32" rx="6" fill="url(#aceGradient)" />

          {/* Border accent */}
          <rect
            width="32"
            height="32"
            rx="6"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="0.5"
            opacity="0.5"
          />

          {/* Spade symbol with glow */}
          <g filter="url(#glow)">
            <text
              x="16"
              y="24"
              fontFamily="Georgia, serif"
              fontSize="22"
              fill="var(--brand)"
              textAnchor="middle"
              fontWeight="bold"
            >
              ♠
            </text>
          </g>

          {/* Accent dots */}
          <circle cx="5" cy="5" r="1.5" fill="var(--brand)" opacity="0.6" />
          <circle cx="27" cy="27" r="1.5" fill="var(--brand)" opacity="0.6" />
        </svg>
      </div>

      {/* Brandmark */}
      <div className={styles.brandmark}>ACE Blackjack Premium</div>

      {/* Spacer */}
      <div className={styles.spacer} />

      {/* Call to Action Button */}
      <div className={styles.ctaWrapper}>
        <button className={styles.ctaButton} onClick={handleEnter}>
          <span className={styles.buttonText}>Click Here to Enter</span>
        </button>
      </div>
    </div>
  );
};
