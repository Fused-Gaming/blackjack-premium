// Audio context for managing sounds
let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    // Support both standard and webkit prefix for older browsers
    const AudioContextClass = window.AudioContext || (window as unknown as Record<string, unknown>).webkitAudioContext as typeof AudioContext;
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

// Simple beep generator using Web Audio API
function playTone(
  frequency: number,
  duration: number,
  volume: number = 0.3,
  fadeOut: boolean = true
) {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    if (fadeOut) {
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    } else {
      gainNode.gain.setValueAtTime(0, ctx.currentTime + duration);
    }

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.error('Sound playback error:', error);
  }
}

export const soundEffects = {
  // Deal card - high note
  dealCard: () => {
    playTone(800, 0.1, 0.25);
  },

  // Hit - medium-high note
  hit: () => {
    playTone(600, 0.15, 0.2);
  },

  // Stand - steady tone
  stand: () => {
    playTone(500, 0.2, 0.25);
  },

  // Double/Split - ascending notes
  double: () => {
    playTone(600, 0.1, 0.2);
    setTimeout(() => playTone(750, 0.1, 0.2), 100);
  },

  split: () => {
    playTone(500, 0.1, 0.2);
    setTimeout(() => playTone(650, 0.1, 0.2), 100);
  },

  // Win - ascending celebratory notes
  win: () => {
    playTone(523, 0.1, 0.3); // C
    setTimeout(() => playTone(659, 0.1, 0.3), 100); // E
    setTimeout(() => playTone(784, 0.15, 0.3), 200); // G
  },

  // Loss - descending sad notes
  loss: () => {
    playTone(400, 0.1, 0.25);
    setTimeout(() => playTone(300, 0.15, 0.25), 100);
  },

  // Bust - error buzz
  bust: () => {
    playTone(200, 0.2, 0.3);
    setTimeout(() => playTone(150, 0.2, 0.3), 100);
  },

  // Push - neutral tone
  push: () => {
    playTone(440, 0.25, 0.2);
  },

  // Blackjack - special celebratory
  blackjack: () => {
    playTone(523, 0.1, 0.3);
    setTimeout(() => playTone(659, 0.1, 0.3), 80);
    setTimeout(() => playTone(784, 0.1, 0.3), 160);
    setTimeout(() => playTone(1047, 0.2, 0.3), 240);
  },

  // Insurance - question mark tone
  insurance: () => {
    playTone(550, 0.08, 0.2);
    setTimeout(() => playTone(650, 0.08, 0.2), 80);
  },

  // Chip click - light click
  chipClick: () => {
    playTone(1200, 0.05, 0.15);
  },
};

export const enableSound = (enabled: boolean) => {
  if (enabled && audioContext?.state === 'suspended') {
    audioContext?.resume();
  }
};
