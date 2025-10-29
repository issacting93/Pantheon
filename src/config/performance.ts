/**
 * Performance Configuration
 *
 * Defines performance targets, budgets, and monitoring settings.
 * Helps maintain smooth 60 FPS operation and prevent memory leaks.
 */

/**
 * Frame Rate Configuration
 */
export const FRAME_RATE_CONFIG = {
  /** Target frames per second */
  TARGET_FPS: 60,
  /** Warning threshold (FPS below this triggers warning) */
  WARNING_THRESHOLD: 45,
  /** Critical threshold (FPS below this triggers critical warning) */
  CRITICAL_THRESHOLD: 30,
  /** Number of frames to average for FPS calculation */
  SAMPLE_SIZE: 60,
} as const;

/**
 * Memory Configuration
 */
export const MEMORY_CONFIG = {
  /** Maximum memory usage in MB (warning threshold) */
  MAX_MEMORY_MB: 150,
  /** Memory check interval in milliseconds */
  CHECK_INTERVAL_MS: 5000,
  /** Enable memory monitoring */
  ENABLE_MONITORING: import.meta.env.DEV,
} as const;

/**
 * Rendering Configuration
 */
export const RENDERING_CONFIG = {
  /** Enable pixel ratio adaptation for high-DPI displays */
  ADAPT_PIXEL_RATIO: true,
  /** Maximum pixel ratio (prevents excessive rendering on 4K+ displays) */
  MAX_PIXEL_RATIO: 2,
  /** Enable automatic quality adjustment based on FPS */
  AUTO_QUALITY_ADJUSTMENT: false,
} as const;

/**
 * Bundle Size Budgets (in KB)
 */
export const BUNDLE_SIZE_BUDGETS = {
  /** Maximum total bundle size (gzipped) */
  MAX_TOTAL_GZIP_KB: 300,
  /** Maximum JS bundle size (gzipped) */
  MAX_JS_GZIP_KB: 280,
  /** Maximum CSS bundle size (gzipped) */
  MAX_CSS_GZIP_KB: 10,
  /** Maximum individual chunk size */
  MAX_CHUNK_KB: 500,
} as const;

/**
 * Animation Frame Configuration
 */
export const ANIMATION_CONFIG = {
  /** Skip frames during high load (frame throttling) */
  ENABLE_FRAME_SKIP: false,
  /** Maximum consecutive frames to skip */
  MAX_FRAME_SKIP: 2,
  /** Delta time cap (prevents large jumps) */
  MAX_DELTA_TIME_MS: 100,
} as const;

/**
 * Particle System Performance Limits
 */
export const PARTICLE_PERFORMANCE_LIMITS = {
  /** Maximum number of particles for optimal performance */
  OPTIMAL_COUNT: 170,
  /** Maximum particle count before warning */
  WARNING_COUNT: 500,
  /** Absolute maximum particle count */
  MAX_COUNT: 1000,
  /** Maximum connection lines to render */
  MAX_CONNECTION_LINES: 100,
} as const;

/**
 * Audio Analysis Performance
 */
export const AUDIO_PERFORMANCE_CONFIG = {
  /** Update frequency for audio analysis (ms) */
  UPDATE_INTERVAL_MS: 16, // ~60 FPS
  /** FFT size impact on performance */
  FFT_SIZE_PERFORMANCE: {
    128: 'low',
    256: 'medium',
    512: 'medium',
    1024: 'high',
    2048: 'high',
  },
} as const;

/**
 * Debug and Stats Configuration
 */
export const DEBUG_CONFIG = {
  /** Enable stats panel (FPS, memory) in development */
  ENABLE_STATS: import.meta.env.DEV,
  /** Enable performance warnings in console */
  ENABLE_WARNINGS: import.meta.env.DEV,
  /** Enable detailed logging */
  ENABLE_LOGGING: false,
  /** Log performance metrics interval (ms) */
  LOG_INTERVAL_MS: 10000,
} as const;

/**
 * Optimization Flags
 */
export const OPTIMIZATION_FLAGS = {
  /** Enable Web Workers for audio processing (future feature) */
  USE_WEB_WORKERS: false,
  /** Enable OffscreenCanvas for rendering (future feature) */
  USE_OFFSCREEN_CANVAS: false,
  /** Enable geometry instancing for particles */
  USE_INSTANCING: false,
  /** Enable frustum culling for particles */
  ENABLE_FRUSTUM_CULLING: true,
} as const;

/**
 * Performance Presets
 */
export const PERFORMANCE_PRESETS = {
  /** Ultra-low settings for very weak devices */
  ULTRA_LOW: {
    particleCount: 50,
    fftSize: 128,
    enableEffects: false,
    pixelRatio: 1,
  },
  /** Low settings for weak devices */
  LOW: {
    particleCount: 100,
    fftSize: 256,
    enableEffects: true,
    pixelRatio: 1,
  },
  /** Medium settings for average devices */
  MEDIUM: {
    particleCount: 170,
    fftSize: 256,
    enableEffects: true,
    pixelRatio: Math.min(window.devicePixelRatio, 1.5),
  },
  /** High settings for powerful devices */
  HIGH: {
    particleCount: 300,
    fftSize: 512,
    enableEffects: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  },
  /** Ultra settings for very powerful devices */
  ULTRA: {
    particleCount: 500,
    fftSize: 1024,
    enableEffects: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  },
} as const;

/**
 * Performance Monitoring Thresholds
 */
export const MONITORING_THRESHOLDS = {
  /** Frame time threshold in ms (16.67ms = 60 FPS) */
  FRAME_TIME: {
    GOOD: 16.67, // 60 FPS
    WARNING: 22.22, // 45 FPS
    CRITICAL: 33.33, // 30 FPS
  },
  /** Memory growth rate threshold (MB per minute) */
  MEMORY_GROWTH_RATE: {
    WARNING: 5, // 5 MB/min
    CRITICAL: 10, // 10 MB/min
  },
  /** GPU utilization threshold (0-1) */
  GPU_UTILIZATION: {
    WARNING: 0.8, // 80%
    CRITICAL: 0.95, // 95%
  },
} as const;

/** Type exports for configuration */
export type PerformancePreset = keyof typeof PERFORMANCE_PRESETS;
export type FrameRateConfig = typeof FRAME_RATE_CONFIG;
export type MemoryConfig = typeof MEMORY_CONFIG;
