import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { perlin3 } from '../../utils/perlinNoise';

interface ConnectionLinesProps {
  particleCount?: number;
  radius?: number;
  maxLineDistance?: number;
  dotSize?: number;
  dotColor?: THREE.ColorRepresentation;
  lineColor?: THREE.ColorRepresentation;
  lineOpacity?: number;
  dotOpacity?: number;
  // Audio reactivity
  bassLevel?: number;
  midLevel?: number;
  trebleLevel?: number;
  beatDetected?: boolean;
}

export function ConnectionLines({
  particleCount = 80,
  radius = 8,
  maxLineDistance = 2.5,
  dotSize = 5.5,
  dotColor = '#B89A7A',
  lineColor = '#8A6E45',
  lineOpacity = 0.2,
  dotOpacity = 0.9,
  bassLevel = 0,
  midLevel = 0,
  trebleLevel = 0,
  beatDetected = false,
}: ConnectionLinesProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<[number, number, number]>([0, 0, 0]);

  // Create particle and line geometries
  const { particleGeometry, lineGeometry, basePositions, animatedPositions, noiseSeeds } = useMemo(() => {
    const count = particleCount;

    // Base positions - distributed in a sphere
    const basePos: THREE.Vector3[] = [];
    const animatedPos: THREE.Vector3[] = [];
    const seeds: number[] = [];

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even spacing
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const base = new THREE.Vector3(x, y, z);
      basePos.push(base);
      animatedPos.push(base.clone());
      seeds.push(Math.random() * 256);
    }

    // Particle geometry
    const particlePositions = new Float32Array(count * 3);
    const pGeom = new THREE.BufferGeometry();
    const pAttr = new THREE.BufferAttribute(particlePositions, 3);
    pAttr.setUsage(THREE.DynamicDrawUsage);
    pGeom.setAttribute('position', pAttr);

    // Line geometry (pre-allocate for max possible lines)
    const maxLines = 2000;
    const linePositions = new Float32Array(maxLines * 6);
    const lGeom = new THREE.BufferGeometry();
    const lAttr = new THREE.BufferAttribute(linePositions, 3);
    lAttr.setUsage(THREE.DynamicDrawUsage);
    lGeom.setAttribute('position', lAttr);

    return {
      particleGeometry: pGeom,
      lineGeometry: lGeom,
      basePositions: basePos,
      animatedPositions: animatedPos,
      noiseSeeds: seeds,
    };
  }, [particleCount, radius]);

  // Memoized materials
  const particleMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: dotColor,
        size: dotSize,
        transparent: true,
        opacity: dotOpacity,
        sizeAttenuation: true,
      }),
    [dotColor, dotSize, dotOpacity]
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: lineOpacity,
      }),
    [lineColor, lineOpacity]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      particleGeometry.dispose();
      lineGeometry.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
    };
  }, [particleGeometry, lineGeometry, particleMaterial, lineMaterial]);

  // Animation constants
  const LOOP_DURATION = 20;
  const NOISE_FREQUENCY = 0.12;
  const ORBITAL_AMPLITUDE = 1.2;
  const VERTICAL_AMPLITUDE = 0.8;

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // Audio-reactive parameters
    const speedScale = 1 + midLevel * 0.4;
    const amplitudeScale = 1 + bassLevel * 0.6;
    const noiseScale = 1 + trebleLevel * 0.5;
    const beatImpulse = beatDetected ? 1.5 : 1;

    const adjustedElapsed = elapsed * speedScale;
    const loopT = (adjustedElapsed % LOOP_DURATION) / LOOP_DURATION;
    const baseAngle = loopT * Math.PI * 2;

    const particlePositions = particleGeometry.attributes.position.array as Float32Array;

    // Update particle positions with Perlin noise
    for (let i = 0; i < particleCount; i++) {
      const base = basePositions[i];
      const seed = noiseSeeds[i];

      // Perlin noise for organic movement
      const noiseFreq = NOISE_FREQUENCY * noiseScale;
      const noise = perlin3(
        base.x * noiseFreq + seed,
        base.y * noiseFreq + adjustedElapsed * 0.1,
        base.z * noiseFreq
      );

      // Calculate orbital offset
      const phase = baseAngle + noise * Math.PI;

      // Get direction from origin to base position
      const direction = base.clone().normalize();

      // Perpendicular direction for orbital motion
      const perpendicular = new THREE.Vector3(-base.z, 0, base.x).normalize();

      // Apply offsets
      const radialOffset = Math.sin(phase) * ORBITAL_AMPLITUDE * amplitudeScale * beatImpulse;
      const orbitalOffset = Math.cos(phase) * ORBITAL_AMPLITUDE * 0.7 * amplitudeScale;
      const verticalOffset = Math.sin(phase * 0.5 + noise) * VERTICAL_AMPLITUDE * amplitudeScale;

      animatedPositions[i].copy(base)
        .addScaledVector(direction, radialOffset)
        .addScaledVector(perpendicular, orbitalOffset);
      animatedPositions[i].y += verticalOffset;

      // Update particle geometry
      particlePositions[i * 3] = animatedPositions[i].x;
      particlePositions[i * 3 + 1] = animatedPositions[i].y;
      particlePositions[i * 3 + 2] = animatedPositions[i].z;
    }

    particleGeometry.attributes.position.needsUpdate = true;

    // Update connection lines
    const linePositions = lineGeometry.attributes.position.array as Float32Array;
    let lineIndex = 0;
    let lineCount = 0;
    const maxLines = 1000;

    for (let i = 0; i < particleCount; i++) {
      const p1 = animatedPositions[i];

      for (let j = i + 1; j < particleCount && lineCount < maxLines; j++) {
        const p2 = animatedPositions[j];
        const distance = p1.distanceTo(p2);

        if (distance < maxLineDistance) {
          linePositions[lineIndex++] = p1.x;
          linePositions[lineIndex++] = p1.y;
          linePositions[lineIndex++] = p1.z;
          linePositions[lineIndex++] = p2.x;
          linePositions[lineIndex++] = p2.y;
          linePositions[lineIndex++] = p2.z;
          lineCount++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIndex / 3);
    lineGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Particle dots */}
      <points
        ref={particlesRef}
        geometry={particleGeometry}
        material={particleMaterial}
        onPointerMove={(event) => {
          if (event.index !== undefined && event.index !== null) {
            const position = animatedPositions[event.index];
            setHoveredIndex(event.index);
            setHoverPosition([position.x, position.y, position.z]);
          }
        }}
        onPointerOut={() => setHoveredIndex(null)}
      />

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />

      {hoveredIndex !== null && (
        <Html position={hoverPosition} distanceFactor={10} transform>
          <div
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              background: 'rgba(26, 26, 26, 0.85)',
              color: '#f7f3e8',
              fontSize: '10px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            Expression Node #{hoveredIndex + 1}
          </div>
        </Html>
      )}
    </group>
  );
}
