import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleConnectionsEffectProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  enabled?: boolean;
  maxDistance?: number;
  maxConnections?: number;
  opacity?: number;
}

export default function ParticleConnectionsEffect({
  particleSystemRef,
  enabled = true,
  maxDistance = 2.5,
  maxConnections = 100,
  opacity = 0.3
}: ParticleConnectionsEffectProps) {
  const lineSegmentsRef = useRef<THREE.LineSegments>(null);
  const linesGeometry = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());
  const offsets = useRef({
    distance: Math.random() * Math.PI * 2,
    connection: Math.random() * Math.PI * 2
  });

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending
    });
  }, [opacity]);

  useEffect(() => {
    const positions = new Float32Array(maxConnections * 6);
    linesGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    linesGeometry.current.setDrawRange(0, 0);
  }, [maxConnections]);

  useFrame(({ clock }) => {
    if (!enabled || !particleSystemRef.current || !linesGeometry.current) return;

    const particleGeometry = particleSystemRef.current.geometry;
    if (!particleGeometry.attributes.position) return;

    const particlePositions = particleGeometry.attributes.position.array as Float32Array;
    const linePositions = linesGeometry.current.attributes.position.array as Float32Array;

    let lineIndex = 0;
    const particleCount = particlePositions.length / 3;
    const elapsed = clock.getElapsedTime();

    const distanceMod = 1 + Math.sin(elapsed * 0.4 + offsets.current.distance) * 0.25;
    const connectionMod = 0.6 + (Math.sin(elapsed * 0.6 + offsets.current.connection) + 1) * 0.2;
    const dynamicDistance = maxDistance * distanceMod;
    const dynamicConnections = Math.floor(maxConnections * connectionMod);

    for (let i = 0; i < particleCount && lineIndex < dynamicConnections * 2; i++) {
      const x1 = particlePositions[i * 3];
      const y1 = particlePositions[i * 3 + 1];
      const z1 = particlePositions[i * 3 + 2];

      for (let j = i + 1; j < particleCount && lineIndex < dynamicConnections * 2; j++) {
        const x2 = particlePositions[j * 3];
        const y2 = particlePositions[j * 3 + 1];
        const z2 = particlePositions[j * 3 + 2];

        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < dynamicDistance) {
          linePositions[lineIndex * 3] = x1;
          linePositions[lineIndex * 3 + 1] = y1;
          linePositions[lineIndex * 3 + 2] = z1;

          linePositions[(lineIndex + 1) * 3] = x2;
          linePositions[(lineIndex + 1) * 3 + 1] = y2;
          linePositions[(lineIndex + 1) * 3 + 2] = z2;

          lineIndex += 2;
        }
      }
    }

    linesGeometry.current.setDrawRange(0, lineIndex);
    linesGeometry.current.attributes.position.needsUpdate = true;

    if (lineMaterial) {
      const opacityPulse = 0.3 + (Math.sin(elapsed * 0.8) + 1) * 0.35;
      lineMaterial.opacity = Math.min(1, opacity * opacityPulse);
    }
  });

  if (!enabled) return null;

  return (
    <lineSegments ref={lineSegmentsRef} geometry={linesGeometry.current} material={lineMaterial} />
  );
}
