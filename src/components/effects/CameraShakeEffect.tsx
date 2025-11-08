import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraShakeEffectProps {
  enabled?: boolean;
  intensity?: number;
  threshold?: number;
  smoothing?: number;
}

export default function CameraShakeEffect({
  enabled = true,
  intensity = 0.5,
  threshold = 0.3,
  smoothing = 0.1
}: CameraShakeEffectProps) {
  const { camera } = useThree();
  const originalPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const currentShake = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetShake = useRef<THREE.Vector3>(new THREE.Vector3());
  const isInitialized = useRef(false);
  const offsets = useRef({
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2
  });

  useEffect(() => {
    if (!isInitialized.current) {
      originalPosition.current.copy(camera.position);
      isInitialized.current = true;
    }
  }, [camera]);

  useFrame(({ clock }) => {
    if (!enabled) {
      camera.position.copy(originalPosition.current);
      currentShake.current.set(0, 0, 0);
      targetShake.current.set(0, 0, 0);
      return;
    }

    const elapsed = clock.getElapsedTime();
    const baseIntensity = intensity * 0.2;
    const modulation = (Math.sin(elapsed * 0.5 + offsets.current.x) + 1) * 0.5;
    const movementThreshold = Math.max(threshold, 0.05);

    targetShake.current.set(
      Math.sin(elapsed * (0.7 + movementThreshold) + offsets.current.x) * baseIntensity * modulation,
      Math.cos(elapsed * (0.9 + movementThreshold * 1.5) + offsets.current.y) * baseIntensity * 0.7 * modulation,
      Math.sin(elapsed * (0.5 + movementThreshold * 0.5) + offsets.current.z) * baseIntensity * 0.4 * modulation
    );

    currentShake.current.lerp(targetShake.current, smoothing);
    camera.position.copy(originalPosition.current).add(currentShake.current);
  });

  return null;
}
