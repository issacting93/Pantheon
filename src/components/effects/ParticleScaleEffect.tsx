import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleScaleEffectProps {
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
  smoothing?: number;
}

export default function ParticleScaleEffect({
  particleSystemRef,
  audioData,
  enabled = true,
  intensity = 0.4,
  smoothing = 0.1
}: ParticleScaleEffectProps) {
  const currentScale = useRef(1);
  const targetScale = useRef(1);

  useFrame(() => {
    if (!enabled || !particleSystemRef.current) return;

    // Calculate target scale based on bass level
    targetScale.current = 1 + (audioData.bassLevel * intensity);
    
    // Beat detection adds extra burst
    if (audioData.beatDetected) {
      targetScale.current += 0.2;
    }

    // Smooth interpolation to target scale
    currentScale.current += (targetScale.current - currentScale.current) * smoothing;
    
    // Apply scale to particle system
    particleSystemRef.current.scale.setScalar(currentScale.current);
  });

  // Reset scale when disabled
  useEffect(() => {
    if (!enabled && particleSystemRef.current) {
      particleSystemRef.current.scale.setScalar(1);
      currentScale.current = 1;
      targetScale.current = 1;
    }
  }, [enabled, particleSystemRef]);

  return null; // This is a logic-only component
}
