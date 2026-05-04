import React from 'react';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onEnter?: () => void;
}

const GREETINGS = [
  {
    title: 'Welcome Back, Player!',
    message: 'Good Fortune & Business Loyalty',
  },
  {
    title: 'Welcome to ACE',
    message: 'Your Luck is Calling',
  },
  {
    title: 'Ready to Play?',
    message: 'Fortune Favors the Bold',
  },
  {
    title: 'Welcome to the Table',
    message: 'Expect the Extraordinary',
  },
  {
    title: 'ACE Awaits You',
    message: 'Where Skill Meets Chance',
  },
  {
    title: 'Step Into Luxury',
    message: 'Premium Blackjack Experience',
  },
  {
    title: 'High Stakes Welcome',
    message: 'Provably Fair Gaming',
  },
  {
    title: 'Welcome Aboard',
    message: 'Let the Games Begin',
  },
];

const GitHubIcon = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.003 12.003 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const LandingPage = ({ onEnter }: LandingPageProps) => {
  const [isInteracting, setIsInteracting] = React.useState(false);
  const [isEntering, setIsEntering] = React.useState(false);
  const [showGreeting, setShowGreeting] = React.useState(false);
  const [currentGreeting, setCurrentGreeting] = React.useState(GREETINGS[0]);

  const getRandomGreeting = () => {
    const randomIndex = Math.floor(Math.random() * GREETINGS.length);
    return GREETINGS[randomIndex];
  };

  const handleEnter = () => {
    setCurrentGreeting(getRandomGreeting());
    setIsEntering(true);
    setShowGreeting(true);

    setTimeout(() => {
      onEnter?.();
    }, 2000);
  };

  const handleLogoInteraction = React.useCallback(() => {
    if (!isEntering) {
      setIsInteracting(true);
      setTimeout(() => setIsInteracting(false), 600);
    }
  }, [isEntering]);

  React.useEffect(() => {
    const handleMouseMove = () => {
      handleLogoInteraction();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleLogoInteraction]);

  return (
    <div className={`${styles.container} ${isEntering ? styles.entering : ''}`}>
      {/* Left GitHub Icon */}
      <div className="absolute left-6 top-6 text-amber-400/30 hover:text-amber-400/70 transition-colors duration-300 cursor-pointer z-10">
        <a href="https://github.com/Fused-Gaming/blackjack-premium" target="_blank" rel="noopener noreferrer" className="block hover:scale-110 transition-transform duration-300">
          <GitHubIcon size={40} />
        </a>
      </div>

      {/* Main Content Group - Grouped elements with controlled sizing */}
      <div className={styles.contentGroup}>
        {/* Logo Section */}
        <div className={`${styles.logoWrapper} ${isInteracting ? styles.interacting : ''}`} onClick={handleEnter}>
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

            {/* Card group - all elements properly layered */}
            <g className={styles.cardGroup}>
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
              fill="#FFA500"
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
            </g>
          </svg>
        </div>

        {/* Brandmark */}
        <div className={styles.brandmark}>ACE Blackjack Premium</div>

        {/* Call to Action Button */}
        <div className={styles.ctaWrapper}>
          <button
            className={styles.ctaButton}
            onClick={handleEnter}
            disabled={isEntering}
          >
            <span className={styles.buttonText}>Click Here to Enter</span>
          </button>
        </div>
      </div>

      {/* Smoke Particles Background */}
      {isEntering && (
        <div className={styles.smokeContainer}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={styles.smokeParticle}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Right GitHub Icon */}
      <div className="absolute right-6 top-6 text-amber-400/30 hover:text-amber-400/70 transition-colors duration-300 cursor-pointer z-10">
        <a href="https://github.com/Fused-Gaming/blackjack-premium" target="_blank" rel="noopener noreferrer" className="block hover:scale-110 transition-transform duration-300">
          <GitHubIcon size={40} />
        </a>
      </div>

      {/* Welcome Greeting Overlay */}
      {showGreeting && (
        <div className={styles.greetingOverlay}>
          <div className={styles.greetingContent}>
            <h1 className={styles.greetingTitle}>{currentGreeting.title}</h1>
            <p className={styles.greetingMessage}>{currentGreeting.message}</p>
            <div className={styles.greetingDivider} />
            <p className={styles.greetingSubtext}>Enter the Casino</p>
          </div>
        </div>
      )}
    </div>
  );
};
