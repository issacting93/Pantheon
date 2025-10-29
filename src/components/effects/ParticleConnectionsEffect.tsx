import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleConnectionsEffectProps {
  particleSystemRef: React.RefObject<THREE.Points>;
  audioData: {
    bassLevel: number;
    midLevel: number;
    trebleLevel: number;
    volume: number;
    beatDetected: boolean;
  };
  enabled?: boolean;
  maxDistance?: number;
  maxConnections?: number;
  opacity?: number;
}

export default function ParticleConnectionsEffect({
  particleSystemRef,
  audioData,
  enabled = true,
  maxDistance = 2.5,
  maxConnections = 100,
  opacity = 0.3
}: ParticleConnectionsEffectProps) {
  const lineSegmentsRef = useRef<THREE.LineSegments>(null);
  const linesGeometry = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());
  
  // Create line material
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending
    });
  }, [opacity]);

  // Initialize empty geometry
  useEffect(() => {
    const positions = new Float32Array(maxConnections * 6); // 2 points per line, 3 coords per point
    linesGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    linesGeometry.current.setDrawRange(0, 0); // Start with no lines drawn
  }, [maxConnections]);

  useFrame(() => {
    if (!enabled || !particleSystemRef.current || !linesGeometry.current) return;

    const particleGeometry = particleSystemRef.current.geometry;
    if (!particleGeometry.attributes.position) return;

    const particlePositions = particleGeometry.attributes.position.array as Float32Array;
    const linePositions = linesGeometry.current.attributes.position.array as Float32Array;
    
    let lineIndex = 0;
    const particleCount = particlePositions.length / 3;
    
    // Audio-reactive distance and connection count
    const audioDistance = maxDistance * (1 + audioData.volume * 0.5);
    const audioConnections = Math.floor(maxConnections * (0.5 + audioData.midLevel * 0.5));
    
    // Find connections between nearby particles
    for (let i = 0; i < particleCount && lineIndex < audioConnections * 2; i++) {
      const x1 = particlePositions[i * 3];
      const y1 = particlePositions[i * 3 + 1];
      const z1 = particlePositions[i * 3 + 2];
      
      for (let j = i + 1; j < particleCount && lineIndex < audioConnections * 2; j++) {
        const x2 = particlePositions[j * 3];
        const y2 = particlePositions[j * 3 + 1];
        const z2 = particlePositions[j * 3 + 2];
        
        // Calculate distance
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        // Create connection if within range
        if (distance < audioDistance) {
          // First point
          linePositions[lineIndex * 3] = x1;
          linePositions[lineIndex * 3 + 1] = y1;
          linePositions[lineIndex * 3 + 2] = z1;
          
          // Second point
          linePositions[(lineIndex + 1) * 3] = x2;
          linePositions[(lineIndex + 1) * 3 + 1] = y2;
          linePositions[(lineIndex + 1) * 3 + 2] = z2;
          
          lineIndex += 2;
        }
      }
    }
    
    // Update geometry
    linesGeometry.current.setDrawRange(0, lineIndex);
    linesGeometry.current.attributes.position.needsUpdate = true;
    
    // Update material opacity based on audio
    if (lineMaterial) {
      lineMaterial.opacity = opacity * (0.3 + audioData.volume * 0.7);
      
      // Beat detection makes lines brighter
      if (audioData.beatDetected) {
        lineMaterial.opacity = Math.min(1, lineMaterial.opacity * 1.5);
      }
    }
  });

  if (!enabled) return null;

  return (
    <lineSegments ref={lineSegmentsRef} geometry={linesGeometry.current} material={lineMaterial} />
  );
}
