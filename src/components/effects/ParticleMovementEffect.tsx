import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleMovementEffectProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  enabled?: boolean;
  intensity?: number;
  frequency?: number;
}

export default function ParticleMovementEffect({
  particleSystemRef,
  enabled = true,
  intensity = 0.1,
  frequency = 1.0
}: ParticleMovementEffectProps) {
  const originalPositions = useRef<Float32Array | null>(null);
  const isInitialized = useRef(false);
  const noiseSeed = useRef(Math.random() * 1000);

  useEffect(() => {
    if (!particleSystemRef.current || isInitialized.current) return;

    const geometry = particleSystemRef.current.geometry;
    if (geometry.attributes.position) {
      const positions = geometry.attributes.position.array as Float32Array;
      originalPositions.current = new Float32Array(positions);
      isInitialized.current = true;
    }
  }, [particleSystemRef]);

  useFrame((state) => {
    if (!enabled || !particleSystemRef.current || !originalPositions.current) return;

    const geometry = particleSystemRef.current.geometry;
    if (!geometry.attributes.position) return;

    const positions = geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime * frequency;
    const modulation = (Math.sin(time * 0.3 + noiseSeed.current) + 1) * 0.5 + 0.5;

    for (let i = 0; i < positions.length; i += 3) {
      const originalX = originalPositions.current[i];
      const originalY = originalPositions.current[i + 1];
      const originalZ = originalPositions.current[i + 2];

      const offset = i * 0.01 + noiseSeed.current;
      const waveX = Math.sin(time + offset) * intensity * modulation;
      const waveY = Math.cos(time * 1.2 + offset * 0.8) * intensity * 0.6 * modulation;
      const waveZ = Math.sin(time * 0.7 + offset * 1.5) * intensity * 0.4 * modulation;

      positions[i] = originalX + waveX;
      positions[i + 1] = originalY + waveY;
      positions[i + 2] = originalZ + waveZ;
    }

    geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    if (!enabled && particleSystemRef.current && originalPositions.current) {
      const geometry = particleSystemRef.current.geometry;
      if (geometry.attributes.position) {
        const positions = geometry.attributes.position.array as Float32Array;
        positions.set(originalPositions.current);
        geometry.attributes.position.needsUpdate = true;
      }
    }
  }, [enabled, particleSystemRef]);

  return null;
}
