import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CentralSphere } from './CentralSphere';
import { RingOfDots } from './RingOfDots';
import { ParticleSystem } from './ParticleSystem';
import { ConnectionLines } from './ConnectionLines';
import { PostProcessingEffects } from './PostProcessingEffects';
import EffectsManager, { type EffectSettings } from '../effects/EffectsManager';
import { TraitIndicator3D } from './TraitIndicator3D';
import { ParametricRing, type ParametricRingSettings } from './ParametricRing';
import type { PersonalityLayerType } from '../../config/parametricRing';

export interface SceneSettings {
  maxLineDistance: number;
  particleCount: number;
  particleRadius: number;
  cameraDistance: number;
  label: string;
}

export interface SceneElementsVisibility {
  centralSphere: boolean;
  ringOfDots: boolean;
  traitIndicators: boolean;
  particles: boolean;
  connectionLines: boolean;
  parametricRing: boolean;
}

interface ParametricRingPersonalityProps {
  layerType?: PersonalityLayerType;
  traitStability?: number;
  traitConsistency?: number;
  expressiveness?: number;
  adaptability?: number;
}

interface ParametricRingAudioProps {
  bassLevel?: number;
  midLevel?: number;
  trebleLevel?: number;
  beatDetected?: boolean;
}

interface Scene3DProps {
  settings: SceneSettings;
  sceneVisibility?: SceneElementsVisibility;
  effectSettings: EffectSettings;
  parametricRingSettings?: ParametricRingSettings;
  parametricRingPersonality?: ParametricRingPersonalityProps;
  parametricRingAudio?: ParametricRingAudioProps;
}

export function Scene3D({
  settings,
  sceneVisibility = { centralSphere: true, ringOfDots: true, traitIndicators: true, particles: true, connectionLines: true, parametricRing: false },
  effectSettings,
  parametricRingSettings,
  parametricRingPersonality,
  parametricRingAudio
}: Scene3DProps) {
  const particleSystemRef = useRef<THREE.Points>(null);

  const ringPersonality: ParametricRingPersonalityProps = {
    layerType: 'character_self_concept',
    traitStability: 0.9,
    traitConsistency: 0.85,
    expressiveness: 0.7,
    adaptability: 0.8,
    ...parametricRingPersonality
  };

  const ringAudio: ParametricRingAudioProps = {
    bassLevel: 0,
    midLevel: 0.15,
    trebleLevel: 0.1,
    beatDetected: false,
    ...parametricRingAudio
  };

  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, settings.cameraDistance],
          fov: 18,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          precision: 'mediump'
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#f7f3e8'
        }}
      >
        <color attach="background" args={['#f7f3e8']} />
        <ambientLight intensity={0.25} />

        {sceneVisibility.centralSphere && <CentralSphere />}
        {sceneVisibility.ringOfDots && <RingOfDots />}
        {sceneVisibility.particles && (
          <ParticleSystem
            ref={particleSystemRef}
            particleCount={settings.particleCount}
            particleRadius={settings.particleRadius}
          />
        )}
        {sceneVisibility.connectionLines && (
          <ConnectionLines
            particleCount={settings.particleCount}
            radius={settings.particleRadius}
            maxLineDistance={settings.maxLineDistance}
          />
        )}

        {sceneVisibility.traitIndicators && <TraitIndicator3D />}

        {sceneVisibility.parametricRing && parametricRingSettings && (
          <ParametricRing
            {...parametricRingSettings}
            {...ringPersonality}
            {...ringAudio}
          />
        )}

        <EffectsManager
          particleSystemRef={particleSystemRef}
          settings={effectSettings}
        />

        <PostProcessingEffects />
      </Canvas>
    </>
  );
}
