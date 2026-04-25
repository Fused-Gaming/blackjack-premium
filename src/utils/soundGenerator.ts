/**
 * Sound Generator - Create placeholder audio for development
 * Generates simple beep sounds using Web Audio API
 * Replace with actual MP3 files for production
 */

export function generateBeep(frequency = 440, duration = 200, volume = 0.3): Promise<void> {
  return new Promise((resolve) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        // Web Audio not supported
        resolve();
        return;
      }

      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      const startTime = audioContext.currentTime;
      const endTime = startTime + duration / 1000;

      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);

      oscillator.start(startTime);
      oscillator.stop(endTime);

      setTimeout(resolve, duration);
    } catch {
      resolve();
    }
  });
}

/**
 * Generate different sound types
 */
export const soundPatterns = {
  deal: () => generateBeep(440, 150, 0.2),
  hit: () => generateBeep(523, 100, 0.25),
  stand: () => generateBeep(349, 200, 0.2),
  win: async () => {
    await generateBeep(523, 150, 0.3);
    await generateBeep(659, 150, 0.3);
    await generateBeep(784, 200, 0.3);
  },
  loss: async () => {
    await generateBeep(349, 150, 0.2);
    await generateBeep(294, 150, 0.2);
    await generateBeep(262, 300, 0.2);
  },
  bust: async () => {
    await generateBeep(262, 100, 0.2);
    await generateBeep(262, 100, 0.2);
    await generateBeep(262, 400, 0.2);
  },
  shuffle: async () => {
    for (let i = 0; i < 3; i++) {
      await generateBeep(440 + i * 100, 100, 0.15);
    }
  },
  'chip-place': () => generateBeep(659, 150, 0.25),
};
