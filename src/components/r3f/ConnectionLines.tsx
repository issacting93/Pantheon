import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConnectionLinesProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  maxLineDistance?: number;
}

export function ConnectionLines({ particleSystemRef, maxLineDistance = 2.5 }: ConnectionLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());

  // Initialize geometry on mount
  if (!geometryRef.current.attributes.position) {
    const maxLines = 3000;
    const linePositions = new Float32Array(maxLines * 6);
    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  }

  useFrame(() => {
    if (!particleSystemRef.current || !geometryRef.current) return;

    const particleGeometry = particleSystemRef.current.geometry;
    if (!particleGeometry.attributes.position) return;

    const positions = particleGeometry.attributes.position.array as Float32Array;
    const linePositions = geometryRef.current.attributes.position.array as Float32Array;

    let index = 0;
    const particleCount = positions.length / 3;
    let currentLines = 0;
    const maxLines = 1000;

    for (let i = 0; i < particleCount; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];

      for (let j = i + 1; j < particleCount && currentLines < maxLines; j++) {
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxLineDistance) {
          linePositions[index++] = x1;
          linePositions[index++] = y1;
          linePositions[index++] = z1;
          linePositions[index++] = x2;
          linePositions[index++] = y2;
          linePositions[index++] = z2;
          currentLines++;
        }
      }

      if (currentLines >= maxLines) break;
    }

    geometryRef.current.setDrawRange(0, index / 3);
    geometryRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometryRef.current}>
      <lineBasicMaterial color={0xFFFFFF} transparent={true} opacity={0.5} />
    </lineSegments>
  );
}
