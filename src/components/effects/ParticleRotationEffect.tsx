import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleRotationEffectProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  enabled?: boolean;
  yAxisIntensity?: number;
  zAxisIntensity?: number;
  xAxisIntensity?: number;
}

export default function ParticleRotationEffect({
  particleSystemRef,
  enabled = true,
  yAxisIntensity = 0.01,
  zAxisIntensity = 0.005,
  xAxisIntensity = 0.003
}: ParticleRotationEffectProps) {
  const offsets = useRef({
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2
  });

  useFrame(({ clock }, delta) => {
    if (!enabled || !particleSystemRef.current) return;

    const elapsed = clock.getElapsedTime();

    const rotX = Math.sin(elapsed * 0.6 + offsets.current.x) * xAxisIntensity;
    const rotY = Math.sin(elapsed * 0.9 + offsets.current.y) * yAxisIntensity + 0.005;
    const rotZ = Math.cos(elapsed * 0.7 + offsets.current.z) * zAxisIntensity;

    particleSystemRef.current.rotation.x += rotX * delta * 60;
    particleSystemRef.current.rotation.y += rotY * delta * 60;
    particleSystemRef.current.rotation.z += rotZ * delta * 60;
  });

  return null;
}
