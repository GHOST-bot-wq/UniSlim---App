import type { SoundType } from '../types';

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

function playNote(ctx: AudioContext, freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.3) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  gain.gain.setValueAtTime(0, ctx.currentTime + start);
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.01);
  gain.gain.linearRampToValueAtTime(vol * 0.6, ctx.currentTime + start + dur * 0.3);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + dur);
}

function playNoise(ctx: AudioContext, start: number, dur: number, vol = 0.1) {
  const bufferSize = ctx.sampleRate * dur;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol, ctx.currentTime + start);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);
  src.connect(gain);
  gain.connect(ctx.destination);
  src.start(ctx.currentTime + start);
}

export function playSound(type: SoundType): void {
  try {
    const ctx = getCtx();

    switch (type) {
      case 'app_open':
        // C4 → E4 → G4 arpeggio
        playNote(ctx, 261.6, 0, 0.3, 'sine', 0.2);
        playNote(ctx, 329.6, 0.1, 0.3, 'sine', 0.2);
        playNote(ctx, 392.0, 0.2, 0.4, 'sine', 0.25);
        break;

      case 'goal_achieved':
        // 4 ascending notes + bass
        playNote(ctx, 392, 0, 0.2, 'sine', 0.25);
        playNote(ctx, 494, 0.15, 0.2, 'sine', 0.25);
        playNote(ctx, 587, 0.3, 0.2, 'sine', 0.25);
        playNote(ctx, 784, 0.45, 0.4, 'sine', 0.3);
        playNote(ctx, 196, 0.45, 0.3, 'sine', 0.15);
        break;

      case 'streak':
        // Whoosh sweep
        {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.3);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.4);
        }
        break;

      case 'level_up':
        // Rich chord + sparkle
        playNote(ctx, 523, 0, 0.5, 'sine', 0.2);
        playNote(ctx, 659, 0, 0.5, 'sine', 0.2);
        playNote(ctx, 784, 0, 0.5, 'sine', 0.2);
        playNote(ctx, 1047, 0.2, 0.3, 'sine', 0.15);
        playNote(ctx, 1319, 0.3, 0.3, 'sine', 0.1);
        playNote(ctx, 1568, 0.4, 0.4, 'sine', 0.08);
        break;

      case 'fasting_start':
        // Single bell 528Hz
        playNote(ctx, 528, 0, 2, 'sine', 0.3);
        playNote(ctx, 528 * 2, 0, 1.5, 'sine', 0.08);
        break;

      case 'fasting_end':
        // 3 warm notes
        playNote(ctx, 523, 0, 0.4, 'triangle', 0.25);
        playNote(ctx, 659, 0.2, 0.4, 'triangle', 0.25);
        playNote(ctx, 784, 0.4, 0.6, 'triangle', 0.3);
        break;

      case 'scanner':
        // Phase 1: camera click
        playNoise(ctx, 0, 0.08, 0.2);
        // Phase 2: 3 processing beeps
        playNote(ctx, 800, 0.3, 0.12, 'square', 0.08);
        playNote(ctx, 800, 0.55, 0.12, 'square', 0.08);
        playNote(ctx, 800, 0.8, 0.12, 'square', 0.08);
        // Phase 3: success ding
        playNote(ctx, 1047, 1.1, 0.5, 'sine', 0.2);
        break;

      case 'water':
        // Crystal drop
        playNote(ctx, 2000, 0, 0.15, 'sine', 0.2);
        playNote(ctx, 1500, 0.05, 0.2, 'sine', 0.15);
        break;

      case 'meal_log':
        // Pop
        playNote(ctx, 600, 0, 0.15, 'sine', 0.2);
        playNote(ctx, 800, 0.05, 0.1, 'sine', 0.1);
        break;
    }
  } catch {
    // Silently fail if audio not supported
  }
}
