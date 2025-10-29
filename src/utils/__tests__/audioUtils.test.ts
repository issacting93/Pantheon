/**
 * Tests for Audio Utilities
 *
 * Tests browser capability detection, error handling, audio context utilities,
 * and the beat detection algorithm.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  detectBrowserCapabilities,
  getErrorMessage,
  createAudioContext,
  resumeAudioContext,
  BeatDetector,
} from '../audioUtils';

describe('detectBrowserCapabilities', () => {
  it('should detect getUserMedia capability', () => {
    const capabilities = detectBrowserCapabilities();
    expect(capabilities.hasGetUserMedia).toBe(true);
  });

  it('should detect getDisplayMedia capability', () => {
    const capabilities = detectBrowserCapabilities();
    expect(capabilities.hasGetDisplayMedia).toBe(true);
  });

  it('should detect tab audio capture capability', () => {
    const capabilities = detectBrowserCapabilities();
    expect(capabilities.canCaptureTabAudio).toBe(true);
  });

  it('should handle missing mediaDevices', () => {
    const originalMediaDevices = navigator.mediaDevices;
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: undefined,
    });

    const capabilities = detectBrowserCapabilities();
    expect(capabilities.hasGetUserMedia).toBe(false);
    expect(capabilities.hasGetDisplayMedia).toBe(false);

    // Restore
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: originalMediaDevices,
    });
  });
});

describe('getErrorMessage', () => {
  it('should return user-friendly message for NotAllowedError', () => {
    const error = new Error('Permission denied');
    error.name = 'NotAllowedError';
    const message = getErrorMessage(error);
    expect(message).toBe('Permission denied. Please allow access to continue.');
  });

  it('should return user-friendly message for NotFoundError', () => {
    const error = new Error('Device not found');
    error.name = 'NotFoundError';
    const message = getErrorMessage(error);
    expect(message).toBe('No audio source found. Please check your device.');
  });

  it('should return user-friendly message for NotReadableError', () => {
    const error = new Error('Device in use');
    error.name = 'NotReadableError';
    const message = getErrorMessage(error);
    expect(message).toBe('Audio device is in use by another application.');
  });

  it('should return user-friendly message for OverconstrainedError', () => {
    const error = new Error('Constraints not satisfied');
    error.name = 'OverconstrainedError';
    const message = getErrorMessage(error);
    expect(message).toBe('Audio constraints could not be satisfied.');
  });

  it('should return user-friendly message for TypeError', () => {
    const error = new TypeError('Not supported');
    const message = getErrorMessage(error);
    expect(message).toBe('Browser does not support this audio source.');
  });

  it('should return custom error message if provided', () => {
    const error = new Error('Custom error message');
    const message = getErrorMessage(error);
    expect(message).toBe('Custom error message');
  });

  it('should handle unknown error types', () => {
    const error = new Error();
    error.name = 'UnknownError';
    const message = getErrorMessage(error);
    expect(message).toBe('An unknown error occurred.');
  });

  it('should handle non-Error objects', () => {
    const message = getErrorMessage('string error');
    expect(message).toBe('An unknown error occurred.');
  });

  it('should handle null/undefined', () => {
    expect(getErrorMessage(null)).toBe('An unknown error occurred.');
    expect(getErrorMessage(undefined)).toBe('An unknown error occurred.');
  });
});

describe('createAudioContext', () => {
  it('should create an AudioContext instance', () => {
    const audioContext = createAudioContext();
    expect(audioContext).toBeInstanceOf(AudioContext);
  });

  it('should have default sample rate', () => {
    const audioContext = createAudioContext();
    expect(audioContext.sampleRate).toBeGreaterThan(0);
  });

  it('should be in running state by default', () => {
    const audioContext = createAudioContext();
    expect(audioContext.state).toBe('running');
  });
});

describe('resumeAudioContext', () => {
  it('should resume suspended audio context', async () => {
    const audioContext = createAudioContext();
    (audioContext as any).state = 'suspended';

    await resumeAudioContext(audioContext);
    expect(audioContext.state).toBe('running');
  });

  it('should not throw if already running', async () => {
    const audioContext = createAudioContext();
    await expect(resumeAudioContext(audioContext)).resolves.not.toThrow();
  });

  it('should handle context in closed state', async () => {
    const audioContext = createAudioContext();
    (audioContext as any).state = 'closed';
    // Should not attempt to resume closed context
    await expect(resumeAudioContext(audioContext)).resolves.not.toThrow();
  });
});

describe('BeatDetector', () => {
  let beatDetector: BeatDetector;

  beforeEach(() => {
    beatDetector = new BeatDetector();
  });

  describe('constructor', () => {
    it('should initialize with empty history', () => {
      expect(beatDetector['bassHistory']).toEqual([]);
    });
  });

  describe('detectBeat', () => {
    it('should return false with insufficient history', () => {
      // Add only 10 samples (need 20 for detection)
      for (let i = 0; i < 10; i++) {
        expect(beatDetector.detectBeat(0.5)).toBe(false);
      }
    });

    it('should return false when bass level is below threshold', () => {
      // Fill history with consistent low bass
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(0.2);
      }
      // Current bass is not significantly higher than average
      expect(beatDetector.detectBeat(0.25)).toBe(false);
    });

    it('should return true when bass level spikes above threshold', () => {
      // Fill history with low bass
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(0.2);
      }
      // Spike in bass level (avg = 0.2, threshold = 0.2 * 1.5 = 0.3, spike = 0.8)
      expect(beatDetector.detectBeat(0.8)).toBe(true);
    });

    it('should maintain history length of 20', () => {
      // Add 30 samples
      for (let i = 0; i < 30; i++) {
        beatDetector.detectBeat(0.5);
      }
      expect(beatDetector['bassHistory'].length).toBe(20);
    });

    it('should calculate moving average correctly', () => {
      // Add consistent values
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(0.5);
      }
      // Note: The new value is added to history before calculation
      // So avg = (19*0.5 + 0.8)/20 = (9.5 + 0.8)/20 = 10.3/20 = 0.515
      // threshold = 0.515 * 1.5 = 0.7725
      // 0.8 > 0.7725 and 0.8 > 0.3 (min level) → should trigger beat
      expect(beatDetector.detectBeat(0.8)).toBe(true);
    });

    it('should require minimum bass level for beat detection', () => {
      // Fill history with very low bass
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(0.1);
      }
      // Even though 0.2 is higher than threshold (0.1 * 1.5 = 0.15),
      // it's below minimum level (0.3)
      expect(beatDetector.detectBeat(0.2)).toBe(false);
    });

    it('should detect beats in realistic pattern', () => {
      // Simulate bass pattern: quiet-quiet-quiet-beat
      const quietLevel = 0.2;
      const beatLevel = 0.8;

      // Fill initial history
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(quietLevel);
      }

      // Pattern: 3 quiet, 1 beat
      expect(beatDetector.detectBeat(quietLevel)).toBe(false);
      expect(beatDetector.detectBeat(quietLevel)).toBe(false);
      expect(beatDetector.detectBeat(quietLevel)).toBe(false);
      expect(beatDetector.detectBeat(beatLevel)).toBe(true); // Beat!
    });

    it('should adapt to changing bass levels', () => {
      // Start with low bass
      for (let i = 0; i < 10; i++) {
        beatDetector.detectBeat(0.3);
      }

      // Increase average bass level
      for (let i = 0; i < 10; i++) {
        beatDetector.detectBeat(0.6);
      }

      // Now history has [0.3, 0.3, ..., 0.6, 0.6, ...] avg = 0.45
      // When we add 0.75: avg = (19*0.45 + 0.75)/20 = 9.3/20 = 0.465
      // threshold = 0.465 * 1.5 = 0.6975
      // 0.75 > 0.6975 and 0.75 > 0.3 (min level) → should trigger beat
      expect(beatDetector.detectBeat(0.75)).toBe(true);
      // But 0.68 shouldn't (below threshold)
      expect(beatDetector.detectBeat(0.68)).toBe(false);
    });
  });

  describe('reset', () => {
    it('should clear history', () => {
      // Add some history
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(0.5);
      }

      beatDetector.reset();
      expect(beatDetector['bassHistory']).toEqual([]);
    });

    it('should allow fresh beat detection after reset', () => {
      // Fill history and detect beat
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(0.2);
      }
      expect(beatDetector.detectBeat(0.8)).toBe(true);

      // Reset
      beatDetector.reset();

      // Should return false due to insufficient history
      expect(beatDetector.detectBeat(0.8)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle zero bass level', () => {
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(0);
      }
      expect(beatDetector.detectBeat(0)).toBe(false);
    });

    it('should handle maximum bass level', () => {
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(0.5);
      }
      expect(beatDetector.detectBeat(1.0)).toBe(true);
    });

    it('should handle negative bass levels gracefully', () => {
      for (let i = 0; i < 20; i++) {
        beatDetector.detectBeat(-0.1);
      }
      // Negative values shouldn't cause errors
      expect(beatDetector.detectBeat(0.5)).toBe(true);
    });

    it('should handle NaN values', () => {
      expect(() => beatDetector.detectBeat(NaN)).not.toThrow();
    });

    it('should handle very large numbers', () => {
      expect(() => beatDetector.detectBeat(1000000)).not.toThrow();
    });
  });

  describe('performance', () => {
    it('should handle rapid successive calls efficiently', () => {
      const startTime = Date.now();

      // Simulate 1000 calls
      for (let i = 0; i < 1000; i++) {
        beatDetector.detectBeat(Math.random());
      }

      const duration = Date.now() - startTime;
      // Should complete in under 100ms
      expect(duration).toBeLessThan(100);
    });
  });
});
