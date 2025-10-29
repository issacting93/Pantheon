import React from 'react';
import * as THREE from 'three';
import ParticleScaleEffect from './ParticleScaleEffect';
import ParticleRotationEffect from './ParticleRotationEffect';
import ParticleMovementEffect from './ParticleMovementEffect';
import CameraShakeEffect from './CameraShakeEffect';
import ParticleConnectionsEffect from './ParticleConnectionsEffect';

export interface EffectSettings {
  particleScale: {
    enabled: boolean;
    intensity: number;
    smoothing: number;
  };
  particleRotation: {
    enabled: boolean;
    yAxisIntensity: number;
    zAxisIntensity: number;
    xAxisIntensity: number;
  };
  particleMovement: {
    enabled: boolean;
    intensity: number;
    frequency: number;
  };
  cameraShake: {
    enabled: boolean;
    intensity: number;
    threshold: number;
    smoothing: number;
  };
  particleConnections: {
    enabled: boolean;
    maxDistance: number;
    maxConnections: number;
    opacity: number;
  };
}

export const defaultEffectSettings: EffectSettings = {
  particleScale: {
    enabled: true,
    intensity: 0.4,
    smoothing: 0.1
  },
  particleRotation: {
    enabled: true,
    yAxisIntensity: 0.01,
    zAxisIntensity: 0.005,
    xAxisIntensity: 0.003
  },
  particleMovement: {
    enabled: false, // Disabled by default as it can be performance intensive
    intensity: 0.1,
    frequency: 1.0
  },
  cameraShake: {
    enabled: true,
    intensity: 0.5,
    threshold: 0.3,
    smoothing: 0.1
  },
  particleConnections: {
    enabled: false, // Disabled by default as it can be performance intensive
    maxDistance: 2.5,
    maxConnections: 100,
    opacity: 0.3
  }
};

interface EffectsManagerProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  audioData: {
    bassLevel: number;
    midLevel: number;
    trebleLevel: number;
    volume: number;
    beatDetected: boolean;
  };
  settings?: Partial<EffectSettings>;
}

export default function EffectsManager({
  particleSystemRef,
  audioData,
  settings = {}
}: EffectsManagerProps) {
  // Merge provided settings with defaults
  const effectSettings: EffectSettings = {
    particleScale: { ...defaultEffectSettings.particleScale, ...settings.particleScale },
    particleRotation: { ...defaultEffectSettings.particleRotation, ...settings.particleRotation },
    particleMovement: { ...defaultEffectSettings.particleMovement, ...settings.particleMovement },
    cameraShake: { ...defaultEffectSettings.cameraShake, ...settings.cameraShake },
    particleConnections: { ...defaultEffectSettings.particleConnections, ...settings.particleConnections }
  };

  return (
    <>
      <ParticleScaleEffect
        particleSystemRef={particleSystemRef}
        audioData={audioData}
        enabled={effectSettings.particleScale.enabled}
        intensity={effectSettings.particleScale.intensity}
        smoothing={effectSettings.particleScale.smoothing}
      />
      
      <ParticleRotationEffect
        particleSystemRef={particleSystemRef}
        audioData={audioData}
        enabled={effectSettings.particleRotation.enabled}
        yAxisIntensity={effectSettings.particleRotation.yAxisIntensity}
        zAxisIntensity={effectSettings.particleRotation.zAxisIntensity}
        xAxisIntensity={effectSettings.particleRotation.xAxisIntensity}
      />
      
      <ParticleMovementEffect
        particleSystemRef={particleSystemRef}
        audioData={audioData}
        enabled={effectSettings.particleMovement.enabled}
        intensity={effectSettings.particleMovement.intensity}
        frequency={effectSettings.particleMovement.frequency}
      />
      
      <CameraShakeEffect
        audioData={audioData}
        enabled={effectSettings.cameraShake.enabled}
        intensity={effectSettings.cameraShake.intensity}
        threshold={effectSettings.cameraShake.threshold}
        smoothing={effectSettings.cameraShake.smoothing}
      />
      
      <ParticleConnectionsEffect
        particleSystemRef={particleSystemRef}
        audioData={audioData}
        enabled={effectSettings.particleConnections.enabled}
        maxDistance={effectSettings.particleConnections.maxDistance}
        maxConnections={effectSettings.particleConnections.maxConnections}
        opacity={effectSettings.particleConnections.opacity}
      />
    </>
  );
}
