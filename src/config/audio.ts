/**
 * Audio Analysis Configuration
 *
 * Centralizes all audio-related parameters for the audio visualizer.
 * Adjust these values to tune the audio analysis behavior.
 */

export const AUDIO_CONFIG = {
  /**
   * FFT (Fast Fourier Transform) Configuration
   */
  FFT: {
    /** Size of the FFT - must be power of 2 (128, 256, 512, 1024, 2048, etc.) */
    SIZE: 256,
    /** Smoothing time constant (0-1). Higher = smoother but less responsive */
    SMOOTHING: 0.8,
    /** Minimum decibel value for frequency data */
    MIN_DECIBELS: -90,
    /** Maximum decibel value for frequency data */
    MAX_DECIBELS: -10,
  },

  /**
   * Frequency Band Definitions
   * Used for separating bass, mid, and treble frequencies
   */
  FREQUENCY_BANDS: {
    /** Bass frequencies (sub-bass and bass) */
    BASS: {
      MIN: 20,
      MAX: 250,
    },
    /** Mid frequencies (low-mid to high-mid) */
    MID: {
      MIN: 250,
      MAX: 4000,
    },
    /** Treble frequencies (high frequencies) */
    TREBLE: {
      MIN: 4000,
      MAX: 20000,
    },
  },

  /**
   * Beat Detection Configuration
   */
  BEAT_DETECTION: {
    /** Number of historical bass values to track */
    HISTORY_LENGTH: 20,
    /** Multiplier for average to determine beat threshold */
    THRESHOLD_MULTIPLIER: 1.5,
    /** Minimum bass level required to register a beat */
    MIN_LEVEL: 0.3,
  },

  /**
   * Volume and Silence Detection
   */
  VOLUME: {
    /** Timeout in milliseconds before considering audio silent */
    SILENCE_TIMEOUT_MS: 5000,
    /** Minimum volume threshold to consider audio active */
    MIN_ACTIVE_THRESHOLD: 0.01,
  },

  /**
   * Debug Mode
   * Set to true to enable audio analysis logging
   */
  DEBUG: false,
} as const;

/**
 * Audio Context Sample Rates
 * Most browsers use 44100 or 48000 Hz
 */
export const SAMPLE_RATES = {
  CD_QUALITY: 44100,
  PROFESSIONAL: 48000,
  HIGH_RES: 96000,
} as const;

/**
 * Common microphone constraints
 */
export const MICROPHONE_CONSTRAINTS = {
  DEFAULT: {
    audio: true,
  },
  HIGH_QUALITY: {
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
      sampleRate: SAMPLE_RATES.PROFESSIONAL,
    },
  },
} as const;

/**
 * Display media constraints (for tab/system audio capture)
 */
export const DISPLAY_MEDIA_CONSTRAINTS = {
  TAB_AUDIO: {
    video: true,
    audio: true,
  },
  SYSTEM_AUDIO: {
    video: {
      displaySurface: 'monitor' as const,
    },
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    },
    systemAudio: 'include' as const,
  },
} as const;

/** Type exports for configuration */
export type AudioConfig = typeof AUDIO_CONFIG;
export type FrequencyBands = typeof AUDIO_CONFIG.FREQUENCY_BANDS;
export type BeatDetectionConfig = typeof AUDIO_CONFIG.BEAT_DETECTION;
