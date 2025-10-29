/**
 * Configuration Module - Centralized Configuration for Audio Visualizer
 *
 * This module exports all configuration constants and types.
 * Import from this file to access any configuration:
 *
 * @example
 * import { AUDIO_CONFIG, PARTICLE_CONFIG, PERFORMANCE_PRESETS } from '@/config';
 */

// Audio Configuration
export {
  AUDIO_CONFIG,
  SAMPLE_RATES,
  MICROPHONE_CONSTRAINTS,
  DISPLAY_MEDIA_CONSTRAINTS,
} from './audio';

export type {
  AudioConfig,
  FrequencyBands,
  BeatDetectionConfig,
} from './audio';

// Visualization Configuration
export {
  CAMERA_CONFIG,
  CAMERA_PRESETS,
  PARTICLE_CONFIG,
  CONNECTION_LINES_CONFIG,
  CENTRAL_SPHERE_CONFIG,
  RING_OF_DOTS_CONFIG,
  LIGHTING_CONFIG,
  ORBIT_CONTROLS_CONFIG,
  RENDERER_CONFIG,
  SCENE_VISIBILITY_DEFAULTS,
  COLOR_PALETTE,
} from './visualization';

export type {
  CameraConfig,
  ParticleConfig,
  CameraPreset,
} from './visualization';

// Effects Configuration
export {
  PARTICLE_SCALE_EFFECT,
  PARTICLE_ROTATION_EFFECT,
  PARTICLE_MOVEMENT_EFFECT,
  CAMERA_SHAKE_EFFECT,
  PARTICLE_CONNECTIONS_EFFECT,
  POST_PROCESSING_EFFECTS,
  DEFAULT_EFFECT_SETTINGS,
  EFFECT_PERFORMANCE_IMPACT,
  EFFECT_PRESETS,
} from './effects';

export type {
  ParticleScaleEffectConfig,
  ParticleRotationEffectConfig,
  EffectPreset,
} from './effects';

// Performance Configuration
export {
  FRAME_RATE_CONFIG,
  MEMORY_CONFIG,
  RENDERING_CONFIG,
  BUNDLE_SIZE_BUDGETS,
  ANIMATION_CONFIG,
  PARTICLE_PERFORMANCE_LIMITS,
  AUDIO_PERFORMANCE_CONFIG,
  DEBUG_CONFIG,
  OPTIMIZATION_FLAGS,
  PERFORMANCE_PRESETS,
  MONITORING_THRESHOLDS,
} from './performance';

export type {
  PerformancePreset,
  FrameRateConfig,
  MemoryConfig,
} from './performance';

/**
 * Quick Access Helpers
 * Common configuration combinations for easy access
 */

/** Default configuration for new instances */
export const DEFAULT_CONFIG = {
  audio: AUDIO_CONFIG,
  camera: CAMERA_CONFIG,
  particles: PARTICLE_CONFIG,
  effects: DEFAULT_EFFECT_SETTINGS,
  performance: PERFORMANCE_PRESETS.MEDIUM,
} as const;

/** Development mode configuration */
export const DEV_CONFIG = {
  ...DEFAULT_CONFIG,
  debug: {
    enabled: true,
    showStats: true,
    enableLogging: true,
  },
} as const;

/** Production mode configuration */
export const PROD_CONFIG = {
  ...DEFAULT_CONFIG,
  debug: {
    enabled: false,
    showStats: false,
    enableLogging: false,
  },
} as const;

/** Get configuration based on environment */
export const getEnvironmentConfig = () => {
  return import.meta.env.DEV ? DEV_CONFIG : PROD_CONFIG;
};

// Re-export individual configs from their modules
import { AUDIO_CONFIG } from './audio';
import { CAMERA_CONFIG, PARTICLE_CONFIG } from './visualization';
import { DEFAULT_EFFECT_SETTINGS } from './effects';
import { PERFORMANCE_PRESETS } from './performance';
