/**
 * Tests for Configuration Files
 *
 * Validates that all configuration constants are properly defined
 * and have sensible default values.
 */

import { describe, it, expect } from 'vitest';

// Audio Config
import {
  AUDIO_CONFIG,
  SAMPLE_RATES,
  MICROPHONE_CONSTRAINTS,
  DISPLAY_MEDIA_CONSTRAINTS,
} from '../audio';

// Visualization Config
import {
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
} from '../visualization';

// Effects Config
import {
  PARTICLE_SCALE_EFFECT,
  PARTICLE_ROTATION_EFFECT,
  PARTICLE_MOVEMENT_EFFECT,
  CAMERA_SHAKE_EFFECT,
  PARTICLE_CONNECTIONS_EFFECT,
  POST_PROCESSING_EFFECTS,
  DEFAULT_EFFECT_SETTINGS,
  EFFECT_PERFORMANCE_IMPACT,
  EFFECT_PRESETS,
} from '../effects';

// Performance Config
import {
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
} from '../performance';

// Index exports
import {
  DEFAULT_CONFIG,
  DEV_CONFIG,
  PROD_CONFIG,
  getEnvironmentConfig,
} from '../index';

describe('Audio Configuration', () => {
  describe('AUDIO_CONFIG', () => {
    it('should have valid FFT configuration', () => {
      expect(AUDIO_CONFIG.FFT.SIZE).toBeGreaterThan(0);
      expect(AUDIO_CONFIG.FFT.SIZE).toBe(256);
      expect(AUDIO_CONFIG.FFT.SMOOTHING).toBeGreaterThanOrEqual(0);
      expect(AUDIO_CONFIG.FFT.SMOOTHING).toBeLessThanOrEqual(1);
      expect(AUDIO_CONFIG.FFT.MIN_DECIBELS).toBeLessThan(0);
      expect(AUDIO_CONFIG.FFT.MAX_DECIBELS).toBeGreaterThan(AUDIO_CONFIG.FFT.MIN_DECIBELS);
    });

    it('should have valid frequency bands', () => {
      const { BASS, MID, TREBLE } = AUDIO_CONFIG.FREQUENCY_BANDS;

      expect(BASS.MIN).toBe(20);
      expect(BASS.MAX).toBeGreaterThan(BASS.MIN);

      expect(MID.MIN).toBe(BASS.MAX);
      expect(MID.MAX).toBeGreaterThan(MID.MIN);

      expect(TREBLE.MIN).toBe(MID.MAX);
      expect(TREBLE.MAX).toBeGreaterThan(TREBLE.MIN);
      expect(TREBLE.MAX).toBe(20000);
    });

    it('should have valid beat detection config', () => {
      const beat = AUDIO_CONFIG.BEAT_DETECTION;
      expect(beat.HISTORY_LENGTH).toBe(20);
      expect(beat.THRESHOLD_MULTIPLIER).toBeGreaterThan(1);
      expect(beat.MIN_LEVEL).toBeGreaterThan(0);
      expect(beat.MIN_LEVEL).toBeLessThan(1);
    });

    it('should have valid volume config', () => {
      expect(AUDIO_CONFIG.VOLUME.SILENCE_TIMEOUT_MS).toBeGreaterThan(0);
      expect(AUDIO_CONFIG.VOLUME.MIN_ACTIVE_THRESHOLD).toBeGreaterThan(0);
    });

    it('should have DEBUG flag as boolean', () => {
      expect(typeof AUDIO_CONFIG.DEBUG).toBe('boolean');
    });
  });

  describe('SAMPLE_RATES', () => {
    it('should have standard sample rates', () => {
      expect(SAMPLE_RATES.CD_QUALITY).toBe(44100);
      expect(SAMPLE_RATES.PROFESSIONAL).toBe(48000);
      expect(SAMPLE_RATES.HIGH_RES).toBe(96000);
    });
  });

  describe('MICROPHONE_CONSTRAINTS', () => {
    it('should have default constraints', () => {
      expect(MICROPHONE_CONSTRAINTS.DEFAULT.audio).toBe(true);
    });

    it('should have high quality constraints', () => {
      const hq = MICROPHONE_CONSTRAINTS.HIGH_QUALITY.audio;
      expect(typeof hq).toBe('object');
    });
  });

  describe('DISPLAY_MEDIA_CONSTRAINTS', () => {
    it('should have tab audio constraints', () => {
      expect(DISPLAY_MEDIA_CONSTRAINTS.TAB_AUDIO.video).toBe(true);
      expect(DISPLAY_MEDIA_CONSTRAINTS.TAB_AUDIO.audio).toBe(true);
    });
  });
});

describe('Visualization Configuration', () => {
  describe('CAMERA_CONFIG', () => {
    it('should have valid camera settings', () => {
      expect(CAMERA_CONFIG.FOV).toBeGreaterThan(0);
      expect(CAMERA_CONFIG.NEAR).toBeGreaterThan(0);
      expect(CAMERA_CONFIG.FAR).toBeGreaterThan(CAMERA_CONFIG.NEAR);
      expect(CAMERA_CONFIG.DEFAULT_DISTANCE).toBeGreaterThan(0);
    });
  });

  describe('CAMERA_PRESETS', () => {
    it('should have three preset levels', () => {
      expect(CAMERA_PRESETS.CLOSE).toBeDefined();
      expect(CAMERA_PRESETS.MEDIUM).toBeDefined();
      expect(CAMERA_PRESETS.FAR).toBeDefined();
    });

    it('should have ascending distances', () => {
      expect(CAMERA_PRESETS.CLOSE.distance).toBeLessThan(CAMERA_PRESETS.MEDIUM.distance);
      expect(CAMERA_PRESETS.MEDIUM.distance).toBeLessThan(CAMERA_PRESETS.FAR.distance);
    });

    it('should have labels', () => {
      expect(CAMERA_PRESETS.CLOSE.label).toBe('Close');
      expect(CAMERA_PRESETS.MEDIUM.label).toBe('Medium');
      expect(CAMERA_PRESETS.FAR.label).toBe('Far');
    });
  });

  describe('PARTICLE_CONFIG', () => {
    it('should have valid particle settings', () => {
      expect(PARTICLE_CONFIG.DEFAULT_COUNT).toBeGreaterThan(0);
      expect(PARTICLE_CONFIG.DEFAULT_RADIUS).toBeGreaterThan(0);
      expect(PARTICLE_CONFIG.SIZE).toBeGreaterThan(0);
      expect(PARTICLE_CONFIG.OPACITY).toBeGreaterThanOrEqual(0);
      expect(PARTICLE_CONFIG.OPACITY).toBeLessThanOrEqual(1);
    });

    it('should have valid color', () => {
      expect(typeof PARTICLE_CONFIG.COLOR).toBe('number');
      expect(PARTICLE_CONFIG.COLOR).toBe(0x6324f8);
    });
  });

  describe('CONNECTION_LINES_CONFIG', () => {
    it('should have valid line settings', () => {
      expect(CONNECTION_LINES_CONFIG.DEFAULT_MAX_DISTANCE).toBeGreaterThan(0);
      expect(CONNECTION_LINES_CONFIG.OPACITY).toBeGreaterThanOrEqual(0);
      expect(CONNECTION_LINES_CONFIG.OPACITY).toBeLessThanOrEqual(1);
    });
  });

  describe('COLOR_PALETTE', () => {
    it('should have consistent color scheme', () => {
      expect(COLOR_PALETTE.PRIMARY).toBe(0x6324f8);
      expect(typeof COLOR_PALETTE.TEXT).toBe('string');
      expect(typeof COLOR_PALETTE.ACCENT).toBe('string');
    });
  });
});

describe('Effects Configuration', () => {
  describe('PARTICLE_SCALE_EFFECT', () => {
    it('should have valid scale settings', () => {
      expect(typeof PARTICLE_SCALE_EFFECT.ENABLED).toBe('boolean');
      expect(PARTICLE_SCALE_EFFECT.INTENSITY).toBeGreaterThanOrEqual(0);
      expect(PARTICLE_SCALE_EFFECT.INTENSITY).toBeLessThanOrEqual(1);
      expect(PARTICLE_SCALE_EFFECT.MIN_SCALE).toBeLessThan(PARTICLE_SCALE_EFFECT.MAX_SCALE);
    });
  });

  describe('DEFAULT_EFFECT_SETTINGS', () => {
    it('should have all effect categories', () => {
      expect(DEFAULT_EFFECT_SETTINGS.particleScale).toBeDefined();
      expect(DEFAULT_EFFECT_SETTINGS.particleRotation).toBeDefined();
      expect(DEFAULT_EFFECT_SETTINGS.particleMovement).toBeDefined();
      expect(DEFAULT_EFFECT_SETTINGS.cameraShake).toBeDefined();
      expect(DEFAULT_EFFECT_SETTINGS.particleConnections).toBeDefined();
    });

    it('should have performance-intensive effects disabled by default', () => {
      expect(DEFAULT_EFFECT_SETTINGS.particleMovement.enabled).toBe(false);
      expect(DEFAULT_EFFECT_SETTINGS.particleConnections.enabled).toBe(false);
    });
  });

  describe('EFFECT_PERFORMANCE_IMPACT', () => {
    it('should categorize effects by performance impact', () => {
      expect(EFFECT_PERFORMANCE_IMPACT.LOW).toBeInstanceOf(Array);
      expect(EFFECT_PERFORMANCE_IMPACT.MEDIUM).toBeInstanceOf(Array);
      expect(EFFECT_PERFORMANCE_IMPACT.HIGH).toBeInstanceOf(Array);
    });

    it('should include particle connections in high impact', () => {
      expect(EFFECT_PERFORMANCE_IMPACT.HIGH).toContain('particleConnections');
    });
  });

  describe('EFFECT_PRESETS', () => {
    it('should have three preset levels', () => {
      expect(EFFECT_PRESETS.PERFORMANCE).toBeDefined();
      expect(EFFECT_PRESETS.BALANCED).toBeDefined();
      expect(EFFECT_PRESETS.QUALITY).toBeDefined();
    });

    it('should have balanced preset match defaults', () => {
      expect(EFFECT_PRESETS.BALANCED).toEqual(DEFAULT_EFFECT_SETTINGS);
    });
  });
});

describe('Performance Configuration', () => {
  describe('FRAME_RATE_CONFIG', () => {
    it('should target 60 FPS', () => {
      expect(FRAME_RATE_CONFIG.TARGET_FPS).toBe(60);
    });

    it('should have sensible thresholds', () => {
      expect(FRAME_RATE_CONFIG.WARNING_THRESHOLD).toBeLessThan(FRAME_RATE_CONFIG.TARGET_FPS);
      expect(FRAME_RATE_CONFIG.CRITICAL_THRESHOLD).toBeLessThan(FRAME_RATE_CONFIG.WARNING_THRESHOLD);
    });
  });

  describe('MEMORY_CONFIG', () => {
    it('should have memory limit', () => {
      expect(MEMORY_CONFIG.MAX_MEMORY_MB).toBe(150);
      expect(MEMORY_CONFIG.CHECK_INTERVAL_MS).toBeGreaterThan(0);
    });
  });

  describe('BUNDLE_SIZE_BUDGETS', () => {
    it('should have size budgets defined', () => {
      expect(BUNDLE_SIZE_BUDGETS.MAX_TOTAL_GZIP_KB).toBeGreaterThan(0);
      expect(BUNDLE_SIZE_BUDGETS.MAX_JS_GZIP_KB).toBeGreaterThan(0);
      expect(BUNDLE_SIZE_BUDGETS.MAX_CSS_GZIP_KB).toBeGreaterThan(0);
    });

    it('should have JS budget larger than CSS budget', () => {
      expect(BUNDLE_SIZE_BUDGETS.MAX_JS_GZIP_KB).toBeGreaterThan(BUNDLE_SIZE_BUDGETS.MAX_CSS_GZIP_KB);
    });
  });

  describe('PARTICLE_PERFORMANCE_LIMITS', () => {
    it('should have ascending limits', () => {
      expect(PARTICLE_PERFORMANCE_LIMITS.OPTIMAL_COUNT).toBeLessThan(
        PARTICLE_PERFORMANCE_LIMITS.WARNING_COUNT
      );
      expect(PARTICLE_PERFORMANCE_LIMITS.WARNING_COUNT).toBeLessThan(
        PARTICLE_PERFORMANCE_LIMITS.MAX_COUNT
      );
    });
  });

  describe('PERFORMANCE_PRESETS', () => {
    it('should have five preset levels', () => {
      expect(PERFORMANCE_PRESETS.ULTRA_LOW).toBeDefined();
      expect(PERFORMANCE_PRESETS.LOW).toBeDefined();
      expect(PERFORMANCE_PRESETS.MEDIUM).toBeDefined();
      expect(PERFORMANCE_PRESETS.HIGH).toBeDefined();
      expect(PERFORMANCE_PRESETS.ULTRA).toBeDefined();
    });

    it('should have ascending particle counts', () => {
      expect(PERFORMANCE_PRESETS.ULTRA_LOW.particleCount).toBeLessThan(
        PERFORMANCE_PRESETS.LOW.particleCount
      );
      expect(PERFORMANCE_PRESETS.LOW.particleCount).toBeLessThan(
        PERFORMANCE_PRESETS.MEDIUM.particleCount
      );
      expect(PERFORMANCE_PRESETS.MEDIUM.particleCount).toBeLessThan(
        PERFORMANCE_PRESETS.HIGH.particleCount
      );
    });
  });

  describe('MONITORING_THRESHOLDS', () => {
    it('should have frame time thresholds', () => {
      const ft = MONITORING_THRESHOLDS.FRAME_TIME;
      expect(ft.GOOD).toBeLessThan(ft.WARNING);
      expect(ft.WARNING).toBeLessThan(ft.CRITICAL);
    });
  });
});

describe('Config Index (Barrel Export)', () => {
  describe('DEFAULT_CONFIG', () => {
    it('should combine all configurations', () => {
      expect(DEFAULT_CONFIG.audio).toBeDefined();
      expect(DEFAULT_CONFIG.camera).toBeDefined();
      expect(DEFAULT_CONFIG.particles).toBeDefined();
      expect(DEFAULT_CONFIG.effects).toBeDefined();
      expect(DEFAULT_CONFIG.performance).toBeDefined();
    });

    it('should use medium performance preset', () => {
      expect(DEFAULT_CONFIG.performance).toEqual(PERFORMANCE_PRESETS.MEDIUM);
    });
  });

  describe('DEV_CONFIG', () => {
    it('should enable debug features', () => {
      expect(DEV_CONFIG.debug.enabled).toBe(true);
      expect(DEV_CONFIG.debug.showStats).toBe(true);
      expect(DEV_CONFIG.debug.enableLogging).toBe(true);
    });
  });

  describe('PROD_CONFIG', () => {
    it('should disable debug features', () => {
      expect(PROD_CONFIG.debug.enabled).toBe(false);
      expect(PROD_CONFIG.debug.showStats).toBe(false);
      expect(PROD_CONFIG.debug.enableLogging).toBe(false);
    });
  });

  describe('getEnvironmentConfig', () => {
    it('should return a config object', () => {
      const config = getEnvironmentConfig();
      expect(config).toBeDefined();
      expect(config.audio).toBeDefined();
      expect(config.debug).toBeDefined();
    });
  });
});
