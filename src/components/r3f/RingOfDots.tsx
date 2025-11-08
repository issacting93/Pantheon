import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STATIC_ROTATION_X = -Math.PI / 2;

export interface RingOfDotsProps {
  ringRadius?: number;
  dotCount?: number;
  dotSize?: number;
  color?: THREE.ColorRepresentation;
  opacity?: number;
  pulseEnabled?: boolean;
  pulseIntensity?: number;
}

export function RingOfDots({
  ringRadius = 18,
  dotCount = 18,
  dotSize = 2.6,
  color = 0xD9C6A3,
  opacity = 0.9,
  pulseEnabled = true,
  pulseIntensity = 0.02
}: RingOfDotsProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const ringGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      const angle = (i / dotCount) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * ringRadius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle) * ringRadius;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.rotateX(STATIC_ROTATION_X);
    return geometry;
  }, [ringRadius, dotCount]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const elapsed = clock.getElapsedTime();

    if (pulseEnabled) {
      const scalePulse = 1 + Math.sin(elapsed * 0.9) * pulseIntensity + Math.sin(elapsed * 0.07) * (pulseIntensity * 0.25);
      pointsRef.current.scale.setScalar(scalePulse);
    }

    pointsRef.current.rotation.z = STATIC_ROTATION_X + elapsed * 0.25;
  });

  return (
    <points ref={pointsRef} geometry={ringGeometry}>
      <pointsMaterial
        color={color}
        size={dotSize}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}
