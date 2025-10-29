/**
 * Visualization Configuration
 *
 * Centralizes all scene, camera, and visual element parameters.
 * Adjust these values to change the look and feel of the visualizer.
 */

/**
 * Camera Configuration
 */
export const CAMERA_CONFIG = {
  /** Field of view in degrees */
  FOV: 18,
  /** Near clipping plane */
  NEAR: 0.1,
  /** Far clipping plane */
  FAR: 1000,
  /** Default camera distance from origin */
  DEFAULT_DISTANCE: 10,
} as const;

/**
 * Camera Presets
 * Predefined camera positions for different viewing angles
 */
export const CAMERA_PRESETS = {
  CLOSE: {
    distance: 8,
    label: 'Close',
  },
  MEDIUM: {
    distance: 10,
    label: 'Medium',
  },
  FAR: {
    distance: 14,
    label: 'Far',
  },
} as const;

/**
 * Particle System Configuration
 */
export const PARTICLE_CONFIG = {
  /** Default number of particles in the system */
  DEFAULT_COUNT: 170,
  /** Default radius of the particle sphere */
  DEFAULT_RADIUS: 6.5,
  /** Particle color (purple accent) */
  COLOR: 0x6324f8,
  /** Size of individual particles */
  SIZE: 0.2,
  /** Particle opacity (0-1) */
  OPACITY: 0.8,
  /** Particle rendering mode */
  TRANSPARENT: true,
} as const;

/**
 * Connection Lines Configuration
 */
export const CONNECTION_LINES_CONFIG = {
  /** Default maximum distance for drawing connection lines */
  DEFAULT_MAX_DISTANCE: 2.5,
  /** Line color */
  COLOR: 0x6324f8,
  /** Line opacity (0-1) */
  OPACITY: 0.3,
  /** Line width */
  LINE_WIDTH: 1,
  /** Whether lines are transparent */
  TRANSPARENT: true,
} as const;

/**
 * Central Sphere Configuration
 */
export const CENTRAL_SPHERE_CONFIG = {
  /** Sphere radius */
  RADIUS: 1,
  /** Sphere segments (higher = smoother) */
  SEGMENTS: 32,
  /** Sphere color */
  COLOR: 0x6324f8,
  /** Wireframe mode */
  WIREFRAME: true,
  /** Default scale multiplier */
  DEFAULT_SCALE: 1,
  /** Audio reactivity scale range */
  SCALE_RANGE: {
    MIN: 1,
    MAX: 1.5,
  },
} as const;

/**
 * Ring of Dots Configuration
 */
export const RING_OF_DOTS_CONFIG = {
  /** Number of dots in the ring */
  COUNT: 50,
  /** Radius of the ring */
  RADIUS: 4,
  /** Size of individual dots */
  DOT_SIZE: 0.1,
  /** Dot color */
  COLOR: 0x6324f8,
  /** Dot opacity */
  OPACITY: 0.8,
  /** Rotation speed */
  ROTATION_SPEED: 0.005,
  /** Audio reactivity scale range */
  SCALE_RANGE: {
    MIN: 0.5,
    MAX: 2,
  },
} as const;

/**
 * Lighting Configuration
 */
export const LIGHTING_CONFIG = {
  /** Ambient light intensity */
  AMBIENT_INTENSITY: 0.25,
  /** Ambient light color */
  AMBIENT_COLOR: 0xffffff,
} as const;

/**
 * Orbit Controls Configuration
 */
export const ORBIT_CONTROLS_CONFIG = {
  /** Enable damping (inertia) */
  ENABLE_DAMPING: true,
  /** Damping factor (lower = more inertia) */
  DAMPING_FACTOR: 0.05,
  /** Camera target position */
  TARGET: [0, 0, 0] as const,
  /** Enable zoom */
  ENABLE_ZOOM: true,
  /** Enable rotation */
  ENABLE_ROTATE: true,
  /** Enable panning */
  ENABLE_PAN: true,
} as const;

/**
 * WebGL Renderer Configuration
 */
export const RENDERER_CONFIG = {
  /** Enable antialiasing */
  ANTIALIAS: true,
  /** Enable alpha channel (transparency) */
  ALPHA: true,
  /** Power preference */
  POWER_PREFERENCE: 'high-performance' as const,
  /** Precision (lowp, mediump, highp) */
  PRECISION: 'mediump' as const,
  /** Background color */
  BACKGROUND_COLOR: '#000000',
} as const;

/**
 * Scene Element Default Visibility
 */
export const SCENE_VISIBILITY_DEFAULTS = {
  CENTRAL_SPHERE: true,
  RING_OF_DOTS: true,
  PARTICLES: true,
  CONNECTION_LINES: true,
} as const;

/**
 * Color Palette
 * Common colors used throughout the visualizer
 */
export const COLOR_PALETTE = {
  /** Primary purple accent */
  PRIMARY: 0x6324f8,
  /** Secondary color */
  SECONDARY: 0x9d4edd,
  /** Background color */
  BACKGROUND: 0x000000,
  /** Text color (for UI) */
  TEXT: '#ffffff',
  /** Accent color */
  ACCENT: '#6324f8',
} as const;

/** Type exports for configuration */
export type CameraConfig = typeof CAMERA_CONFIG;
export type ParticleConfig = typeof PARTICLE_CONFIG;
export type CameraPreset = (typeof CAMERA_PRESETS)[keyof typeof CAMERA_PRESETS];
