import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { AudioData } from '../../types/audio';

interface RingOfDotsProps {
  audioData: AudioData;
}

export function RingOfDots({ audioData }: RingOfDotsProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const ringGeometry = useMemo(() => {
    const ringRadius = 8; // Slightly larger than the central sphere (radius 5)
    const dotCount = 60; // Number of dots in the ring
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dotCount * 3);

    // Create dots in a circular formation
    for (let i = 0; i < dotCount; i++) {
      const angle = (i / dotCount) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * ringRadius;     // x
      positions[i * 3 + 1] = 0;                            // y (keep on horizontal plane)
      positions[i * 3 + 2] = Math.sin(angle) * ringRadius; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Ring reacts to bass with rotation speed and mid frequencies with scale
  useFrame(() => {
    if (!pointsRef.current) return;

    const ringScale = 1 + (audioData.midLevel * 0.15);
    pointsRef.current.scale.setScalar(ringScale);

    // Increase rotation speed based on bass
    const baseRotation = 0.005;
    const audioRotation = audioData.bassLevel * 0.02;
    pointsRef.current.rotation.y += baseRotation + audioRotation;
  });

  return (
    <points ref={pointsRef} geometry={ringGeometry}>
      <pointsMaterial
        color={0x00D9FF} // Cyan accent color
        size={0.3}
        transparent={true}
        opacity={0.9}
        sizeAttenuation={true}
      />
    </points>
  );
}
