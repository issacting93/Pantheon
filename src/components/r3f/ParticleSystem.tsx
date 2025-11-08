import { useMemo, forwardRef } from 'react';
import * as THREE from 'three';

interface ParticleSystemProps {
  particleCount?: number;
  particleRadius?: number;
}

export const ParticleSystem = forwardRef<THREE.Points, ParticleSystemProps>(
  ({ particleCount = 170, particleRadius = 6.5 }, ref) => {
    const particleGeometry = useMemo(() => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.acos(2 * Math.random() - 1);
        const phi = 2 * Math.PI * Math.random();

        const x = particleRadius * Math.sin(theta) * Math.cos(phi);
        const y = particleRadius * Math.sin(theta) * Math.sin(phi);
        const z = particleRadius * Math.cos(theta);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      return geometry;
    }, [particleCount, particleRadius]);

    return (
      <points ref={ref} geometry={particleGeometry}>
        <pointsMaterial
          color={0xA18F7C}
          size={0.22}
          transparent={true}
          opacity={0.85}
        />
      </points>
    );
  }
);

ParticleSystem.displayName = 'ParticleSystem';
