/**
 * Audio Manager - Centralized sound effect playback
 * Handles preloading, playback, and volume control for game sounds
 */

export type SoundEffect = 'deal' | 'hit' | 'stand' | 'win' | 'loss' | 'bust' | 'shuffle' | 'chip-place';

interface AudioCache {
  deal: HTMLAudioElement;
  hit: HTMLAudioElement;
  stand: HTMLAudioElement;
  win: HTMLAudioElement;
  loss: HTMLAudioElement;
  bust: HTMLAudioElement;
  shuffle: HTMLAudioElement;
  'chip-place': HTMLAudioElement;
}

class AudioManager {
  private cache: Partial<AudioCache> = {};
  private enabled = true;
  private volume = 0.5;
  private preloadedSounds: Set<SoundEffect> = new Set();

  constructor() {
    // Initialize audio elements
    this.initializeAudioElements();
  }

  private initializeAudioElements(): void {
    const soundPaths: Record<SoundEffect, string> = {
      deal: '/sounds/deal.mp3',
      hit: '/sounds/hit.mp3',
      stand: '/sounds/stand.mp3',
      win: '/sounds/win.mp3',
      loss: '/sounds/loss.mp3',
      bust: '/sounds/bust.mp3',
      shuffle: '/sounds/shuffle.mp3',
      'chip-place': '/sounds/chip-place.mp3',
    };

    Object.entries(soundPaths).forEach(([sound, path]) => {
      const audio = new Audio(path);
      audio.volume = this.volume;
      audio.preload = 'auto';
      this.cache[sound as SoundEffect] = audio;
    });
  }

  /**
   * Preload a sound effect to ensure it plays smoothly
   */
  preload(sound: SoundEffect): Promise<void> {
    if (this.preloadedSounds.has(sound)) {
      return Promise.resolve();
    }

    const audio = this.cache[sound];
    if (!audio) return Promise.reject(new Error(`Sound not found: ${sound}`));

    return new Promise((resolve, reject) => {
      const handleCanPlay = () => {
        audio.removeEventListener('canplay', handleCanPlay);
        this.preloadedSounds.add(sound);
        resolve();
      };

      const handleError = () => {
        audio.removeEventListener('error', handleError);
        reject(new Error(`Failed to load sound: ${sound}`));
      };

      audio.addEventListener('canplay', handleCanPlay, { once: true });
      audio.addEventListener('error', handleError, { once: true });

      // Trigger loading
      audio.load();
    });
  }

  /**
   * Play a sound effect
   */
  async play(sound: SoundEffect): Promise<void> {
    if (!this.enabled) return;

    const audio = this.cache[sound];
    if (!audio) {
      console.warn(`Sound not found: ${sound}`);
      return;
    }

    try {
      // Reset to start
      audio.currentTime = 0;
      // Play (may fail if browser blocks autoplay, but that's ok)
      const playPromise = audio.play();
      if (playPromise) {
        await playPromise.catch(() => {
          // Autoplay policy prevented playback - this is expected in some cases
        });
      }
    } catch (error) {
      console.warn(`Failed to play sound: ${sound}`, error);
    }
  }

  /**
   * Stop a sound effect
   */
  stop(sound: SoundEffect): void {
    const audio = this.cache[sound];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  /**
   * Stop all sounds
   */
  stopAll(): void {
    Object.values(this.cache).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

  /**
   * Enable/disable sound
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.stopAll();
    }
  }

  /**
   * Get enabled state
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Set master volume (0-1)
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    Object.values(this.cache).forEach((audio) => {
      if (audio) {
        audio.volume = this.volume;
      }
    });
  }

  /**
   * Get master volume
   */
  getVolume(): number {
    return this.volume;
  }
}

// Singleton instance
export const audioManager = new AudioManager();
