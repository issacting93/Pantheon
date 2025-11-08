import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleScaleEffectProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  enabled?: boolean;
  intensity?: number;
  smoothing?: number;
}

export default function ParticleScaleEffect({
  particleSystemRef,
  enabled = true,
  intensity = 0.4,
  smoothing = 0.1
}: ParticleScaleEffectProps) {
  const currentScale = useRef(1);
  const targetScale = useRef(1);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!enabled || !particleSystemRef.current) return;

    const elapsed = clock.getElapsedTime();
    const primaryWave = (Math.sin(elapsed * 1.5 + offset.current) + 1) * 0.5;
    const secondaryWave = (Math.sin(elapsed * 0.75) + 1) * 0.5 * 0.4;

    targetScale.current = 1 + (primaryWave + secondaryWave) * intensity;

    currentScale.current += (targetScale.current - currentScale.current) * smoothing;
    particleSystemRef.current.scale.setScalar(currentScale.current);
  });

  useEffect(() => {
    if (!enabled && particleSystemRef.current) {
      particleSystemRef.current.scale.setScalar(1);
      currentScale.current = 1;
      targetScale.current = 1;
    }
  }, [enabled, particleSystemRef]);

  return null;
}
