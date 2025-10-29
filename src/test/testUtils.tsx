/**
 * Test Utilities
 *
 * Common utilities and helpers for testing React components and hooks.
 */

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

/**
 * Custom render function that wraps components with providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  // For now, no providers needed. When we add Context in Phase 3,
  // this function will wrap components with AudioVisualizerProvider
  return render(ui, options);
}

/**
 * Wait for a condition to be true
 */
export function waitFor(
  condition: () => boolean,
  timeout = 1000,
  interval = 50
): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(checkCondition, interval);
      }
    };

    checkCondition();
  });
}

/**
 * Generate mock audio frequency data
 */
export function generateMockFrequencyData(
  size: number,
  bassLevel = 0.5,
  midLevel = 0.5,
  trebleLevel = 0.5
): Uint8Array {
  const data = new Uint8Array(size);
  const bassEnd = Math.floor(size * 0.2);
  const midEnd = Math.floor(size * 0.6);

  for (let i = 0; i < size; i++) {
    if (i < bassEnd) {
      data[i] = Math.floor(bassLevel * 255);
    } else if (i < midEnd) {
      data[i] = Math.floor(midLevel * 255);
    } else {
      data[i] = Math.floor(trebleLevel * 255);
    }
  }

  return data;
}

/**
 * Generate mock beat pattern data
 */
export function generateBeatPattern(size: number, beatEvery = 4): number[] {
  const pattern: number[] = [];
  for (let i = 0; i < size; i++) {
    if (i % beatEvery === 0) {
      pattern.push(0.8); // Beat
    } else {
      pattern.push(0.2); // No beat
    }
  }
  return pattern;
}

/**
 * Create a mock MediaStream with audio tracks
 */
export function createMockMediaStream(trackCount = 1): MediaStream {
  const stream = new MediaStream();
  for (let i = 0; i < trackCount; i++) {
    // Tracks will be added by the MockMediaStream class
  }
  return stream;
}

/**
 * Advance timers by a specific amount
 * Useful for testing setTimeout/setInterval
 */
export function advanceTimers(ms: number) {
  vi.advanceTimersByTime(ms);
}

// Re-export commonly used testing library functions
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Import vi from vitest for mocking
import { vi } from 'vitest';
