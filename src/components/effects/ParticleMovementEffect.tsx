import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleMovementEffectProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  audioData: {
    bassLevel: number;
    midLevel: number;
    trebleLevel: number;
    volume: number;
    beatDetected: boolean;
  };
  enabled?: boolean;
  intensity?: number;
  frequency?: number;
}

export default function ParticleMovementEffect({
  particleSystemRef,
  audioData,
  enabled = true,
  intensity = 0.1,
  frequency = 1.0
}: ParticleMovementEffectProps) {
  const originalPositions = useRef<Float32Array | null>(null);
  const isInitialized = useRef(false);

  // Store original positions when component mounts
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
    
    // Apply movement based on audio
    for (let i = 0; i < positions.length; i += 3) {
      const originalX = originalPositions.current[i];
      const originalY = originalPositions.current[i + 1];
      const originalZ = originalPositions.current[i + 2];
      
      // Create movement offsets based on audio and time
      const bassOffset = audioData.bassLevel * intensity;
      const midOffset = audioData.midLevel * intensity * 0.5;
      const trebleOffset = audioData.trebleLevel * intensity * 0.3;
      
      // Apply sine/cosine wave movement
      positions[i] = originalX + Math.sin(time + i * 0.01) * bassOffset;
      positions[i + 1] = originalY + Math.cos(time + i * 0.01) * midOffset;
      positions[i + 2] = originalZ + Math.sin(time + i * 0.005) * trebleOffset;
      
      // Beat detection adds extra movement
      if (audioData.beatDetected) {
        positions[i] += Math.sin(time * 5 + i) * 0.05;
        positions[i + 1] += Math.cos(time * 5 + i) * 0.05;
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
  });

  // Reset positions when disabled
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
