/**
 * Audio source types supported by the visualizer
 */
export enum AudioSourceType {
  MICROPHONE = 'microphone',
  FILE = 'file',
  BROWSER_TAB = 'browser_tab',
  SYSTEM_AUDIO = 'system_audio',
  NONE = 'none'
}

/**
 * Connection status for audio sources
 */
export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
}

/**
 * Audio source state interface
 */
export interface AudioSourceState {
  type: AudioSourceType;
  status: ConnectionStatus;
  stream: MediaStream | null;
  audioElement: HTMLAudioElement | null;
  error: string | null;
  volume: number;
}

/**
 * Browser capabilities for audio capture
 */
export interface BrowserCapabilities {
  hasGetUserMedia: boolean;
  hasGetDisplayMedia: boolean;
  canCaptureSystemAudio: boolean;
  canCaptureTabAudio: boolean;
}

/**
 * Enhanced audio analysis data with more frequency bands
 */
export interface AudioAnalysisData {
  frequencyData: Uint8Array;
  timeDomainData: Uint8Array;
  averageVolume: number;
  // Frequency bands for threejs compatibility
  bassLevel: number;
  midLevel: number;
  trebleLevel: number;
  volume: number;
  beatDetected: boolean;
}

/**
 * Legacy audio data interface for backward compatibility with existing threejs components
 */
export interface AudioData {
  bassLevel: number;
  midLevel: number;
  trebleLevel: number;
  volume: number;
  beatDetected: boolean;
}

/**
 * Audio levels interface for backward compatibility
 */
export interface AudioLevels {
  bass: number;
  mid: number;
  high: number;
}
