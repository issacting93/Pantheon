/**
 * Configuration for ParametricRing component
 *
 * Centralized constants for animation timing, amplitudes, and visual properties.
 * Adjust these values to tune the overall behavior of parametric rings.
 */

export type PersonalityLayerType =
  | 'character_self_concept'
  | 'collective_identity'
  | 'legacy_profile';

export const PARAMETRIC_RING_CONFIG = {
  animation: {
    loopDuration: 18,
    noiseFrequency: 0.18,
  },
  amplitude: {
    innerRadial: 0.6,
    outerRadial: 0.9,
    pivotRadial: 0.75,
    vertical: 0.25,
    verticalScale: {
      inner: 0.5,
      outer: 1,
      pivot: 0.75,
    },
  },
  audioReactivity: {
    bass: {
      amplitudeMultiplier: 1.4,
    },
    mid: {
      speedMultiplier: 0.45,
    },
    treble: {
      noiseMultiplier: 0.55,
    },
    beat: {
      impulseStrength: 1.35,
    },
  },
  visual: {
    defaultJointRadius: 0.18,
    jointSphereDetail: 14,
    opacity: {
      struts: 0.85,
      loops: 0.9,
    },
    emissiveIntensity: {
      inner: 0.25,
      outer: 0.2,
      pivot: 0.3,
    },
  },
  personalityLayers: {
    character_self_concept: {
      animationSpeed: 0.85,
      noiseAmount: 0.65,
      audioReactivity: 0.75,
    },
    collective_identity: {
      animationSpeed: 1,
      noiseAmount: 0.85,
      audioReactivity: 1.1,
    },
    legacy_profile: {
      animationSpeed: 0.6,
      noiseAmount: 0.4,
      audioReactivity: 0.5,
    },
  },
} as const;

export const DEFAULT_RING_COLORS = {
  innerLoop: '#E5D7C3',
  outerLoop: '#B99C7E',
  strutA: '#8C705A',
  strutB: '#6B4B32',
} as const;

/**
 * Preset configurations for different visual styles
 */
export const RING_PRESETS = {
  minimal: {
    amplitude: {
      innerRadial: 0.3,
      outerRadial: 0.4,
      pivotRadial: 0.35,
      vertical: 0.1,
    },
    visual: {
      jointSphereDetail: 8,
      opacity: {
        struts: 0.6,
        loops: 0.7,
      },
    },
  },

  dynamic: {
    amplitude: {
      innerRadial: 1.2,
      outerRadial: 1.5,
      pivotRadial: 1.3,
      vertical: 0.5,
    },
    visual: {
      jointSphereDetail: 16,
      opacity: {
        struts: 0.95,
        loops: 1.0,
      },
    },
  },

  organic: {
    animation: {
      loopDuration: 24,
      noiseFrequency: 0.3,
    },
    amplitude: {
      innerRadial: 0.8,
      outerRadial: 1.0,
      pivotRadial: 0.9,
      vertical: 0.4,
    },
  },
} as const;
