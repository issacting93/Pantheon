import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleRotationEffectProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  audioData: {
    bassLevel: number;
    midLevel: number;
    trebleLevel: number;
    volume: number;
    beatDetected: boolean;
  };
  enabled?: boolean;
  yAxisIntensity?: number;
  zAxisIntensity?: number;
  xAxisIntensity?: number;
}

export default function ParticleRotationEffect({
  particleSystemRef,
  audioData,
  enabled = true,
  yAxisIntensity = 0.01,
  zAxisIntensity = 0.005,
  xAxisIntensity = 0.003
}: ParticleRotationEffectProps) {
  const rotationVelocity = useRef({ x: 0, y: 0, z: 0 });

  useFrame((_state, delta) => {
    if (!enabled || !particleSystemRef.current) return;

    // Calculate rotation velocities based on audio
    rotationVelocity.current.y = audioData.midLevel * yAxisIntensity;
    rotationVelocity.current.z = audioData.trebleLevel * zAxisIntensity;
    rotationVelocity.current.x = audioData.bassLevel * xAxisIntensity;

    // Beat detection adds spin burst
    if (audioData.beatDetected) {
      rotationVelocity.current.y *= 2;
      rotationVelocity.current.z *= 1.5;
    }

    // Apply rotation
    particleSystemRef.current.rotation.x += rotationVelocity.current.x * delta;
    particleSystemRef.current.rotation.y += rotationVelocity.current.y * delta;
    particleSystemRef.current.rotation.z += rotationVelocity.current.z * delta;
  });

  return null;
}
