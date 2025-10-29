import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CentralSphere } from './CentralSphere';
import { RingOfDots } from './RingOfDots';
import { ParticleSystem } from './ParticleSystem';
import { ConnectionLines } from './ConnectionLines';
import { PostProcessingEffects } from './PostProcessingEffects';
import EffectsManager, { type EffectSettings } from '../effects/EffectsManager';
import type { AudioData } from '../../types/audio';

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
  particles: boolean;
  connectionLines: boolean;
}

interface Scene3DProps {
  audioData: AudioData;
  settings: SceneSettings;
  sceneVisibility?: SceneElementsVisibility;
  effectSettings: EffectSettings;
  onEffectSettingsChange?: (settings: EffectSettings) => void;
  onSettingsChange?: (settings: SceneSettings) => void;
}

export function Scene3D({
  audioData,
  settings,
  sceneVisibility = { centralSphere: true, ringOfDots: true, particles: true, connectionLines: true },
  effectSettings
}: Scene3DProps) {
  const particleSystemRef = useRef<THREE.Points>(null);

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
          background: '#000000'
        }}
      >
        {/* Scene setup */}
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.25} />

        {/* Orbit controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          target={[0, 0, 0]}
        />

        {/* Main scene objects */}
        {sceneVisibility.centralSphere && <CentralSphere audioData={audioData} />}
        {sceneVisibility.ringOfDots && <RingOfDots audioData={audioData} />}
        {sceneVisibility.particles && (
          <ParticleSystem
            ref={particleSystemRef}
            particleCount={settings.particleCount}
            particleRadius={settings.particleRadius}
          />
        )}
        {sceneVisibility.connectionLines && (
          <ConnectionLines
            particleSystemRef={particleSystemRef}
            maxLineDistance={settings.maxLineDistance}
          />
        )}

        {/* Audio-reactive effects */}
        <EffectsManager
          particleSystemRef={particleSystemRef}
          audioData={audioData}
          settings={effectSettings}
        />

        {/* Post-processing effects */}
        <PostProcessingEffects />
      </Canvas>
    </>
  );
}
