/**
 * Test Setup File
 *
 * This file runs before all tests and sets up the test environment.
 * It includes mocks for Web Audio API, MediaDevices, and other browser APIs.
 */

import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Web Audio API
class MockAudioContext {
  state = 'running';
  sampleRate = 48000;
  baseLatency = 0.005;
  outputLatency = 0.01;
  destination = {};

  createAnalyser() {
    return new MockAnalyserNode();
  }

  createGain() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      gain: { value: 1 },
    };
  }

  createMediaStreamSource() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }

  createMediaElementSource() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }

  resume() {
    this.state = 'running';
    return Promise.resolve();
  }

  suspend() {
    this.state = 'suspended';
    return Promise.resolve();
  }

  close() {
    this.state = 'closed';
    return Promise.resolve();
  }
}

class MockAnalyserNode {
  fftSize = 256;
  frequencyBinCount = 128;
  smoothingTimeConstant = 0.8;
  minDecibels = -90;
  maxDecibels = -10;

  connect = vi.fn();
  disconnect = vi.fn();

  getByteFrequencyData(array: Uint8Array) {
    // Fill with mock data (simulating audio levels)
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 128);
    }
  }

  getFloatFrequencyData(array: Float32Array) {
    // Fill with mock data
    for (let i = 0; i < array.length; i++) {
      array[i] = -50 + Math.random() * 40;
    }
  }

  getByteTimeDomainData(array: Uint8Array) {
    // Fill with mock data
    for (let i = 0; i < array.length; i++) {
      array[i] = 128 + Math.floor(Math.random() * 64 - 32);
    }
  }

  getFloatTimeDomainData(array: Float32Array) {
    // Fill with mock data
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.random() * 2 - 1;
    }
  }
}

// Mock AudioContext constructor
global.AudioContext = MockAudioContext as any;
(global as any).webkitAudioContext = MockAudioContext;

// Mock MediaStream
class MockMediaStreamTrack {
  kind = 'audio';
  id = 'mock-track-id';
  label = 'Mock Audio Track';
  enabled = true;
  muted = false;
  readyState = 'live';

  stop = vi.fn();
  clone = vi.fn(() => new MockMediaStreamTrack());
  getCapabilities = vi.fn(() => ({}));
  getConstraints = vi.fn(() => ({}));
  getSettings = vi.fn(() => ({}));
  applyConstraints = vi.fn(() => Promise.resolve());
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dispatchEvent = vi.fn();
}

class MockMediaStream {
  id = 'mock-stream-id';
  active = true;
  private tracks: MockMediaStreamTrack[] = [new MockMediaStreamTrack()];

  getAudioTracks() {
    return this.tracks;
  }

  getVideoTracks() {
    return [];
  }

  getTracks() {
    return this.tracks;
  }

  addTrack = vi.fn();
  removeTrack = vi.fn();
  clone = vi.fn(() => new MockMediaStream());
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dispatchEvent = vi.fn();
}

global.MediaStream = MockMediaStream as any;

// Mock MediaDevices
const mockGetUserMedia = vi.fn(() => Promise.resolve(new MockMediaStream()));
const mockGetDisplayMedia = vi.fn(() => Promise.resolve(new MockMediaStream()));
const mockEnumerateDevices = vi.fn(() =>
  Promise.resolve([
    {
      deviceId: 'default',
      kind: 'audioinput' as MediaDeviceKind,
      label: 'Default Microphone',
      groupId: 'default-group',
      toJSON: () => ({}),
    },
    {
      deviceId: 'device-1',
      kind: 'audioinput' as MediaDeviceKind,
      label: 'Microphone 1',
      groupId: 'group-1',
      toJSON: () => ({}),
    },
  ])
);

Object.defineProperty(global.navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: mockGetUserMedia,
    getDisplayMedia: mockGetDisplayMedia,
    enumerateDevices: mockEnumerateDevices,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  },
});

// Mock requestAnimationFrame / cancelAnimationFrame
global.requestAnimationFrame = vi.fn((callback) => {
  return setTimeout(callback, 16) as unknown as number;
});

global.cancelAnimationFrame = vi.fn((id) => {
  clearTimeout(id);
});

// Mock HTMLMediaElement
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: vi.fn(() => Promise.resolve()),
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(HTMLMediaElement.prototype, 'load', {
  writable: true,
  value: vi.fn(),
});

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

// Export mock instances for use in tests
export const mockAudioContext = new MockAudioContext();
export const mockMediaStream = new MockMediaStream();
export const mockMediaStreamTrack = new MockMediaStreamTrack();

// Export mock functions for assertions
export {
  mockGetUserMedia,
  mockGetDisplayMedia,
  mockEnumerateDevices,
};
