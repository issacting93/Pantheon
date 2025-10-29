import { BrowserCapabilities } from '../types/audio';

/**
 * Detects browser capabilities for audio capture
 */
export const detectBrowserCapabilities = (): BrowserCapabilities => {
  const hasGetUserMedia = !!(
    navigator.mediaDevices && 
    navigator.mediaDevices.getUserMedia
  );

  const hasGetDisplayMedia = !!(
    navigator.mediaDevices && 
    navigator.mediaDevices.getDisplayMedia
  );

  // System audio is primarily supported in Chromium-based browsers
  const isChromium = /Chrome|Chromium|Edg/.test(navigator.userAgent);
  const canCaptureSystemAudio = hasGetDisplayMedia && isChromium;

  // Tab audio is more widely supported
  const canCaptureTabAudio = hasGetDisplayMedia;

  return {
    hasGetUserMedia,
    hasGetDisplayMedia,
    canCaptureSystemAudio,
    canCaptureTabAudio
  };
};

/**
 * Gets a user-friendly error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    switch (error.name) {
      case 'NotAllowedError':
        return 'Permission denied. Please allow access to continue.';
      case 'NotFoundError':
        return 'No audio source found. Please check your device.';
      case 'NotReadableError':
        return 'Audio device is in use by another application.';
      case 'OverconstrainedError':
        return 'Audio constraints could not be satisfied.';
      case 'TypeError':
        return 'Browser does not support this audio source.';
      default:
        return error.message || 'An unknown error occurred.';
    }
  }
  return 'An unknown error occurred.';
};

/**
 * Creates audio context with proper handling for browser differences
 */
export const createAudioContext = (): AudioContext => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  return new AudioContextClass();
};

/**
 * Checks if audio context needs to be resumed (for autoplay policies)
 */
export const resumeAudioContext = async (audioContext: AudioContext): Promise<void> => {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
};

/**
 * Beat detection utility - enhanced version from existing code
 */
export class BeatDetector {
  private bassHistory: number[] = [];
  private readonly BEAT_HISTORY_LENGTH = 20;
  private readonly BEAT_THRESHOLD_MULTIPLIER = 1.5;
  private readonly BEAT_MIN_LEVEL = 0.3;

  detectBeat(currentBass: number): boolean {
    this.bassHistory.push(currentBass);

    if (this.bassHistory.length > this.BEAT_HISTORY_LENGTH) {
      this.bassHistory.shift();
    }

    if (this.bassHistory.length < this.BEAT_HISTORY_LENGTH) {
      return false;
    }

    const avgBass = this.bassHistory.reduce((a, b) => a + b, 0) / this.bassHistory.length;
    return currentBass > avgBass * this.BEAT_THRESHOLD_MULTIPLIER && currentBass > this.BEAT_MIN_LEVEL;
  }

  reset() {
    this.bassHistory = [];
  }
}

/**
 * Debug utility to check audio context state
 */
export const debugAudioContext = (audioContext: AudioContext): void => {
  console.log('Audio Context Debug Info:');
  console.log('- State:', audioContext.state);
  console.log('- Sample Rate:', audioContext.sampleRate);
  console.log('- Base Latency:', audioContext.baseLatency);
  console.log('- Output Latency:', audioContext.outputLatency);
};

/**
 * Debug utility to check media devices
 */
export const debugMediaDevices = async (): Promise<void> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log('Available Media Devices:');
    devices.forEach((device, index) => {
      console.log(`${index + 1}. ${device.kind}: ${device.label || 'Unknown'} (${device.deviceId})`);
    });
  } catch (error) {
    console.error('Error enumerating devices:', error);
  }
};

/**
 * Debug utility to test microphone access
 */
export const testMicrophoneAccess = async (): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log('Microphone access granted');
    console.log('Audio tracks:', stream.getAudioTracks().length);
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('Microphone access denied:', error);
    return false;
  }
};

/**
 * Debug utility to test display media access
 */
export const testDisplayMediaAccess = async (): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ 
      video: true, 
      audio: true 
    });
    console.log('Display media access granted');
    console.log('Audio tracks:', stream.getAudioTracks().length);
    console.log('Video tracks:', stream.getVideoTracks().length);
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('Display media access denied:', error);
    return false;
  }
};
