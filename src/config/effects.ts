/**
 * Audio-Reactive Effects Configuration
 *
 * Centralizes all audio-reactive effect parameters.
 * These effects respond to audio analysis data (bass, mid, treble, beats).
 */

/**
 * Particle Scale Effect Configuration
 * Scales particles based on audio levels
 */
export const PARTICLE_SCALE_EFFECT = {
  /** Enable effect by default */
  ENABLED: true,
  /** Intensity multiplier (0-1) */
  INTENSITY: 0.4,
  /** Smoothing factor for scale transitions (0-1) */
  SMOOTHING: 0.1,
  /** Minimum scale value */
  MIN_SCALE: 0.5,
  /** Maximum scale value */
  MAX_SCALE: 2.0,
} as const;

/**
 * Particle Rotation Effect Configuration
 * Rotates particle system based on audio levels
 */
export const PARTICLE_ROTATION_EFFECT = {
  /** Enable effect by default */
  ENABLED: true,
  /** Y-axis rotation intensity */
  Y_AXIS_INTENSITY: 0.01,
  /** Z-axis rotation intensity */
  Z_AXIS_INTENSITY: 0.005,
  /** X-axis rotation intensity */
  X_AXIS_INTENSITY: 0.003,
  /** Base rotation speed (when no audio) */
  BASE_ROTATION_SPEED: 0.001,
} as const;

/**
 * Particle Movement Effect Configuration
 * Moves particles outward/inward based on audio
 * Note: Can be performance intensive with many particles
 */
export const PARTICLE_MOVEMENT_EFFECT = {
  /** Disabled by default (performance) */
  ENABLED: false,
  /** Movement intensity multiplier */
  INTENSITY: 0.1,
  /** Frequency of movement oscillation */
  FREQUENCY: 1.0,
  /** Maximum distance particles can move */
  MAX_DISTANCE: 2.0,
} as const;

/**
 * Camera Shake Effect Configuration
 * Shakes camera on bass beats
 */
export const CAMERA_SHAKE_EFFECT = {
  /** Enable effect by default */
  ENABLED: true,
  /** Shake intensity multiplier */
  INTENSITY: 0.5,
  /** Bass level threshold to trigger shake */
  THRESHOLD: 0.3,
  /** Smoothing factor for shake decay */
  SMOOTHING: 0.1,
  /** Maximum shake offset */
  MAX_OFFSET: 0.5,
  /** Shake decay rate */
  DECAY_RATE: 0.95,
} as const;

/**
 * Particle Connections Effect Configuration
 * Draws lines between nearby particles
 * Note: Can be very performance intensive
 */
export const PARTICLE_CONNECTIONS_EFFECT = {
  /** Disabled by default (performance) */
  ENABLED: false,
  /** Maximum distance to draw connections */
  MAX_DISTANCE: 2.5,
  /** Maximum number of connections to draw */
  MAX_CONNECTIONS: 100,
  /** Connection line opacity */
  OPACITY: 0.3,
  /** Connection line color */
  COLOR: 0x6324f8,
  /** Update frequency (frames to skip between updates) */
  UPDATE_INTERVAL: 2,
} as const;

/**
 * Post-Processing Effects Configuration
 */
export const POST_PROCESSING_EFFECTS = {
  /** Chromatic aberration settings */
  CHROMATIC_ABERRATION: {
    /** Enable effect */
    ENABLED: true,
    /** Base offset */
    OFFSET: 0.001,
    /** Audio-reactive multiplier */
    AUDIO_MULTIPLIER: 0.002,
  },
  /** Bloom effect settings */
  BLOOM: {
    /** Enable effect */
    ENABLED: false,
    /** Bloom intensity */
    INTENSITY: 0.5,
    /** Bloom radius */
    RADIUS: 0.4,
    /** Bloom threshold */
    THRESHOLD: 0.9,
  },
  /** Distortion effect settings */
  DISTORTION: {
    /** Enable effect */
    ENABLED: false,
    /** Distortion scale */
    SCALE: 0.5,
    /** Audio-reactive multiplier */
    AUDIO_MULTIPLIER: 1.0,
  },
} as const;

/**
 * Default Effect Settings
 * Complete settings object with all effect parameters
 */
export const DEFAULT_EFFECT_SETTINGS = {
  particleScale: {
    enabled: PARTICLE_SCALE_EFFECT.ENABLED,
    intensity: PARTICLE_SCALE_EFFECT.INTENSITY,
    smoothing: PARTICLE_SCALE_EFFECT.SMOOTHING,
  },
  particleRotation: {
    enabled: PARTICLE_ROTATION_EFFECT.ENABLED,
    yAxisIntensity: PARTICLE_ROTATION_EFFECT.Y_AXIS_INTENSITY,
    zAxisIntensity: PARTICLE_ROTATION_EFFECT.Z_AXIS_INTENSITY,
    xAxisIntensity: PARTICLE_ROTATION_EFFECT.X_AXIS_INTENSITY,
  },
  particleMovement: {
    enabled: PARTICLE_MOVEMENT_EFFECT.ENABLED,
    intensity: PARTICLE_MOVEMENT_EFFECT.INTENSITY,
    frequency: PARTICLE_MOVEMENT_EFFECT.FREQUENCY,
  },
  cameraShake: {
    enabled: CAMERA_SHAKE_EFFECT.ENABLED,
    intensity: CAMERA_SHAKE_EFFECT.INTENSITY,
    threshold: CAMERA_SHAKE_EFFECT.THRESHOLD,
    smoothing: CAMERA_SHAKE_EFFECT.SMOOTHING,
  },
  particleConnections: {
    enabled: PARTICLE_CONNECTIONS_EFFECT.ENABLED,
    maxDistance: PARTICLE_CONNECTIONS_EFFECT.MAX_DISTANCE,
    maxConnections: PARTICLE_CONNECTIONS_EFFECT.MAX_CONNECTIONS,
    opacity: PARTICLE_CONNECTIONS_EFFECT.OPACITY,
  },
} as const;

/**
 * Performance Impact Guidelines
 * Guide for which effects are most performance-intensive
 */
export const EFFECT_PERFORMANCE_IMPACT = {
  LOW: ['particleScale', 'particleRotation', 'cameraShake'],
  MEDIUM: ['postProcessing'],
  HIGH: ['particleMovement', 'particleConnections'],
} as const;

/**
 * Recommended Effect Presets
 */
export const EFFECT_PRESETS = {
  /** Low-end devices */
  PERFORMANCE: {
    particleScale: { enabled: true, intensity: 0.3, smoothing: 0.15 },
    particleRotation: { enabled: true, yAxisIntensity: 0.005, zAxisIntensity: 0.003, xAxisIntensity: 0.002 },
    particleMovement: { enabled: false, intensity: 0, frequency: 1.0 },
    cameraShake: { enabled: true, intensity: 0.3, threshold: 0.4, smoothing: 0.15 },
    particleConnections: { enabled: false, maxDistance: 2.5, maxConnections: 50, opacity: 0.2 },
  },
  /** Balanced quality and performance */
  BALANCED: DEFAULT_EFFECT_SETTINGS,
  /** High-end devices */
  QUALITY: {
    particleScale: { enabled: true, intensity: 0.5, smoothing: 0.05 },
    particleRotation: { enabled: true, yAxisIntensity: 0.015, zAxisIntensity: 0.008, xAxisIntensity: 0.005 },
    particleMovement: { enabled: true, intensity: 0.15, frequency: 1.5 },
    cameraShake: { enabled: true, intensity: 0.7, threshold: 0.2, smoothing: 0.08 },
    particleConnections: { enabled: true, maxDistance: 3.0, maxConnections: 150, opacity: 0.4 },
  },
} as const;

/** Type exports for configuration */
export type ParticleScaleEffectConfig = typeof PARTICLE_SCALE_EFFECT;
export type ParticleRotationEffectConfig = typeof PARTICLE_ROTATION_EFFECT;
export type EffectPreset = keyof typeof EFFECT_PRESETS;
