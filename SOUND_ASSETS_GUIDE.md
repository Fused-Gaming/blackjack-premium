# 🔊 Sound Assets Guide

## Overview

The Blackjack game includes a complete audio system. This guide explains how to add sound effects.

## Sound Effects Required

| Sound | Filename | Description | Trigger |
|-------|----------|-------------|---------|
| **Deal** | `deal.mp3` | Card dealing sound | When cards are dealt |
| **Hit** | `hit.mp3` | Card draw sound | When player hits |
| **Stand** | `stand.mp3` | Stand action sound | When player stands |
| **Win** | `win.mp3` | Victory fanfare | When player wins hand |
| **Loss** | `loss.mp3` | Lose sound | When player loses hand |
| **Bust** | `bust.mp3` | Bust/failure sound | When hand exceeds 21 |
| **Shuffle** | `shuffle.mp3` | Deck shuffle sound | When deck is shuffled |
| **Chip Place** | `chip-place.mp3` | Chip placement sound | When chip is selected |

## Audio File Specifications

- **Format:** MP3 (recommended), WAV, OGG, or M4A
- **Sample Rate:** 44.1 kHz
- **Bit Rate:** 128 kbps (MP3) or higher
- **Duration:** 0.3–2 seconds (keep short for game responsiveness)
- **Volume:** Normalized to -6dB to prevent clipping

## Adding Sound Files

### Option 1: Add Files Locally (Recommended)

1. **Create sound files** using your preferred audio editor:
   - Audacity (free)
   - GarageBand (macOS)
   - Adobe Audition
   - Online tools (bfxr for retro sounds)

2. **Place files** in:
   ```
   public/sounds/
   ├── deal.mp3
   ├── hit.mp3
   ├── stand.mp3
   ├── win.mp3
   ├── loss.mp3
   ├── bust.mp3
   ├── shuffle.mp3
   └── chip-place.mp3
   ```

3. **Test locally:**
   ```bash
   npm run dev
   # Play a round and verify audio plays
   ```

### Option 2: Use Free Sound Libraries

Download sounds from:
- **Freesound.org** - Community sounds (CC licensed)
- **Zapsplat** - Free sound effects
- **BBC Sound Effects** - Public domain UK sounds
- **Pixabay Music** - Royalty-free music

### Option 3: Generate Sounds Programmatically

Use the Web Audio API to generate simple beep/tone sounds:

```typescript
// Example: Generate a simple beep
function generateBeep(frequency = 440, duration = 200) {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
}
```

## Audio System Architecture

### AudioManager (`src/utils/audioManager.ts`)

The `audioManager` singleton handles all audio playback:

```typescript
import { audioManager } from '@/utils/audioManager';

// Play a sound
await audioManager.play('deal');

// Control volume
audioManager.setVolume(0.7); // 0-1 scale

// Toggle sound
audioManager.setEnabled(false);
```

### Sound Toggle Component

Located in `src/components/ui/SoundToggle.tsx`

- Displays in header
- Toggles sound on/off
- Shows speaker icon (on/off state)
- Settings persisted to localStorage

### Game Store Integration

Sounds can be triggered from game store:

```typescript
// In gameStore.ts action
play('deal');
play('win');
play('bust');
```

## Testing Sound System

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Check browser console:**
   - Open DevTools (F12)
   - Look for any audio loading errors
   - Check if audioManager is initialized

3. **Test sound triggers:**
   - Play a game round
   - Listen for sound playback
   - Toggle sound button
   - Check browser volume settings

## Troubleshooting

### Sounds Not Playing

1. **Check file paths:**
   ```bash
   # Verify files exist
   ls public/sounds/
   ```

2. **Check browser autoplay policy:**
   - Some browsers require user interaction before audio plays
   - Verify user has interacted with page (clicked, typed, etc.)

3. **Check console for errors:**
   - DevTools → Console tab
   - Look for CORS or loading errors

4. **Check browser permissions:**
   - Settings → Privacy & Security → Permissions → Microphone/Audio

### Audio Lag or Timing Issues

1. **Preload sounds:**
   - AudioManager preloads on first play
   - Consider preloading on app start for better performance

2. **Reduce file size:**
   - Lower bitrate (128 kbps is good)
   - Trim silence
   - Use MP3 format

## Future Enhancements

- [ ] Background music loop
- [ ] Volume slider in settings
- [ ] Sound preset packs
- [ ] Audio effect synthesis (retro/modern styles)
- [ ] Accessibility: haptic feedback as audio alternative

---

**Last Updated:** 2026-04-25  
**System:** Blackjack Premium v0.2.0  
**Audio API:** Web Audio API + HTMLAudioElement
