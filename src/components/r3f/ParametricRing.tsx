import { useMemo, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { perlin3 } from '../../utils/perlinNoise';
import {
  PARAMETRIC_RING_CONFIG,
  DEFAULT_RING_COLORS,
  type PersonalityLayerType
} from '../../config/parametricRing';

/**
 * Audio reactivity properties
 */
export interface AudioReactiveProps {
  /** Bass level (0-1), affects displacement amplitude */
  bassLevel?: number;
  /** Mid-range level (0-1), affects animation speed */
  midLevel?: number;
  /** Treble level (0-1), affects noise frequency */
  trebleLevel?: number;
  /** Beat detected flag, triggers impulse effects */
  beatDetected?: boolean;
}

/**
 * Personality layer properties (for AI personality visualization)
 */
export interface PersonalityLayerProps {
  /** Type of personality layer this ring represents */
  layerType?: PersonalityLayerType;
  /** Trait stability (0-1), affects animation consistency */
  traitStability?: number;
  /** Trait consistency (0-1), affects noise amount */
  traitConsistency?: number;
  /** Expressiveness (0-1), affects amplitude */
  expressiveness?: number;
  /** Adaptability (0-1), affects audio reactivity strength */
  adaptability?: number;
}

export interface ParametricRingSettings {
  segments: number;
  pivotAngle: number; // degrees
  rodLength: number;
  kinkAngle: number; // degrees
  innerRadius: number;
  rotation: [number, number, number];
  innerLoopColor?: THREE.ColorRepresentation;
  outerLoopColor?: THREE.ColorRepresentation;
  strutColorA?: THREE.ColorRepresentation;
  strutColorB?: THREE.ColorRepresentation;
  jointRadius?: number;
}

interface ParametricRingProps extends ParametricRingSettings, AudioReactiveProps, PersonalityLayerProps {}

export function ParametricRing({
  segments,
  pivotAngle,
  rodLength,
  kinkAngle,
  innerRadius,
  rotation,
  innerLoopColor = DEFAULT_RING_COLORS.innerLoop,
  outerLoopColor = DEFAULT_RING_COLORS.outerLoop,
  strutColorA = DEFAULT_RING_COLORS.strutA,
  strutColorB = DEFAULT_RING_COLORS.strutB,
  jointRadius = PARAMETRIC_RING_CONFIG.visual.defaultJointRadius,
  // Audio reactivity props
  bassLevel = 0,
  midLevel = 0,
  trebleLevel = 0,
  beatDetected = false,
  // Personality layer props
  layerType,
  traitStability = 1,
  traitConsistency = 1,
  expressiveness = 1,
  adaptability = 1,
}: ParametricRingProps) {
  // Refs for InstancedMesh
  const innerJointsRef = useRef<THREE.InstancedMesh>(null);
  const outerJointsRef = useRef<THREE.InstancedMesh>(null);
  const pivotJointsRef = useRef<THREE.InstancedMesh>(null);

  // Apply personality layer config if specified
  const personalityConfig = layerType ? PARAMETRIC_RING_CONFIG.personalityLayers[layerType] : null;

  // Calculate effective parameters based on personality layer
  const effectiveParams = useMemo(() => {
    const base = {
      animationSpeed: 1,
      noiseAmount: 1,
      audioReactivity: 1,
    };

    if (personalityConfig) {
      base.animationSpeed = personalityConfig.animationSpeed * traitStability;
      base.noiseAmount = personalityConfig.noiseAmount * (2 - traitConsistency); // Inverse relationship
      base.audioReactivity = personalityConfig.audioReactivity * adaptability;
    }

    return base;
  }, [personalityConfig, traitStability, traitConsistency, adaptability]);

  // Memoized materials for performance
  const innerJointMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: innerLoopColor,
        emissive: innerLoopColor,
        emissiveIntensity: PARAMETRIC_RING_CONFIG.visual.emissiveIntensity.inner,
      }),
    [innerLoopColor]
  );

  const outerJointMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: outerLoopColor,
        emissive: outerLoopColor,
        emissiveIntensity: PARAMETRIC_RING_CONFIG.visual.emissiveIntensity.outer,
      }),
    [outerLoopColor]
  );

  const pivotJointMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: strutColorB,
        emissive: strutColorB,
        emissiveIntensity: PARAMETRIC_RING_CONFIG.visual.emissiveIntensity.pivot,
      }),
    [strutColorB]
  );

  const data = useMemo(() => {
    const theta = THREE.MathUtils.degToRad(pivotAngle);
    const n = Math.max(3, Math.floor(segments));
    const alpha = (Math.PI * 2) / n;
    const kinkRad = THREE.MathUtils.degToRad(kinkAngle);

    const baseInnerVectors: THREE.Vector3[] = [];
    const animatedInnerVectors: THREE.Vector3[] = [];
    const baseOuterVectors: THREE.Vector3[] = [];
    const animatedOuterVectors: THREE.Vector3[] = [];
    const basePivotVectors: THREE.Vector3[] = [];
    const animatedPivotVectors: THREE.Vector3[] = [];

    const computedInnerRadius = innerRadius;
    const computedOuterRadius = computedInnerRadius + rodLength * Math.cos(kinkRad / 2) * Math.sin(theta / 2);

    for (let i = 0; i < n; i++) {
      const angle = i * alpha;
      const innerBase = new THREE.Vector3(
        computedInnerRadius * Math.cos(angle),
        0,
        computedInnerRadius * Math.sin(angle)
      );
      const outerBase = new THREE.Vector3(
        computedOuterRadius * Math.cos(angle),
        0,
        computedOuterRadius * Math.sin(angle)
      );
      const pivotRadius = (computedInnerRadius + computedOuterRadius) / 2;
      const pivotBase = new THREE.Vector3(
        pivotRadius * Math.cos(angle + alpha / 2),
        0,
        pivotRadius * Math.sin(angle + alpha / 2)
      );

      baseInnerVectors.push(innerBase);
      baseOuterVectors.push(outerBase);
      basePivotVectors.push(pivotBase);
      animatedInnerVectors.push(innerBase.clone());
      animatedOuterVectors.push(outerBase.clone());
      animatedPivotVectors.push(pivotBase.clone());
    }

    const strutSegments: Array<[THREE.Vector3, THREE.Vector3]> = [];

    for (let i = 0; i < n; i++) {
      const next = (i + 1) % n;

      strutSegments.push([animatedInnerVectors[i], animatedPivotVectors[i]]);
      strutSegments.push([animatedPivotVectors[i], animatedOuterVectors[i]]);
      strutSegments.push([animatedInnerVectors[next], animatedPivotVectors[i]]);
      strutSegments.push([animatedPivotVectors[i], animatedOuterVectors[next]]);
    }

    const strutPositions = new Float32Array(strutSegments.length * 6);

    for (let i = 0; i < strutSegments.length; i++) {
      const [start, end] = strutSegments[i];
      const idx = i * 6;
      strutPositions[idx] = start.x;
      strutPositions[idx + 1] = start.y;
      strutPositions[idx + 2] = start.z;
      strutPositions[idx + 3] = end.x;
      strutPositions[idx + 4] = end.y;
      strutPositions[idx + 5] = end.z;
    }

    const strutGeometry = new THREE.BufferGeometry();
    const strutAttribute = new THREE.BufferAttribute(strutPositions, 3);
    strutAttribute.setUsage(THREE.DynamicDrawUsage);
    strutGeometry.setAttribute('position', strutAttribute);

    const innerPositions = new Float32Array((n + 1) * 3);
    const outerPositions = new Float32Array((n + 1) * 3);

    for (let i = 0; i < n; i++) {
      const inner = animatedInnerVectors[i];
      const outer = animatedOuterVectors[i];

      innerPositions[i * 3] = inner.x;
      innerPositions[i * 3 + 1] = inner.y;
      innerPositions[i * 3 + 2] = inner.z;

      outerPositions[i * 3] = outer.x;
      outerPositions[i * 3 + 1] = outer.y;
      outerPositions[i * 3 + 2] = outer.z;
    }

    innerPositions[n * 3] = animatedInnerVectors[0].x;
    innerPositions[n * 3 + 1] = animatedInnerVectors[0].y;
    innerPositions[n * 3 + 2] = animatedInnerVectors[0].z;
    outerPositions[n * 3] = animatedOuterVectors[0].x;
    outerPositions[n * 3 + 1] = animatedOuterVectors[0].y;
    outerPositions[n * 3 + 2] = animatedOuterVectors[0].z;

    const innerLoopGeometry = new THREE.BufferGeometry();
    const innerAttribute = new THREE.BufferAttribute(innerPositions, 3);
    innerAttribute.setUsage(THREE.DynamicDrawUsage);
    innerLoopGeometry.setAttribute('position', innerAttribute);

    const outerLoopGeometry = new THREE.BufferGeometry();
    const outerAttribute = new THREE.BufferAttribute(outerPositions, 3);
    outerAttribute.setUsage(THREE.DynamicDrawUsage);
    outerLoopGeometry.setAttribute('position', outerAttribute);

    return {
      n,
      strutGeometry,
      innerLoopGeometry,
      outerLoopGeometry,
      strutAttribute,
      innerAttribute,
      outerAttribute,
      strutSegments,
      baseInnerVectors,
      baseOuterVectors,
      basePivotVectors,
      animatedInnerVectors,
      animatedOuterVectors,
      animatedPivotVectors,
    };
  }, [segments, pivotAngle, rodLength, kinkAngle, innerRadius]);

  const {
    n,
    strutGeometry,
    innerLoopGeometry,
    outerLoopGeometry,
    strutAttribute,
    innerAttribute,
    outerAttribute,
    strutSegments,
    baseInnerVectors,
    baseOuterVectors,
    basePivotVectors,
    animatedInnerVectors,
    animatedOuterVectors,
    animatedPivotVectors,
  } = data;

  const jointGeometry = useMemo(
    () =>
      new THREE.SphereGeometry(
        jointRadius,
        PARAMETRIC_RING_CONFIG.visual.jointSphereDetail,
        PARAMETRIC_RING_CONFIG.visual.jointSphereDetail
      ),
    [jointRadius]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Dispose geometries
      strutGeometry.dispose();
      innerLoopGeometry.dispose();
      outerLoopGeometry.dispose();
      jointGeometry.dispose();

      // Dispose materials
      innerJointMaterial.dispose();
      outerJointMaterial.dispose();
      pivotJointMaterial.dispose();
    };
  }, [
    strutGeometry,
    innerLoopGeometry,
    outerLoopGeometry,
    jointGeometry,
    innerJointMaterial,
    outerJointMaterial,
    pivotJointMaterial,
  ]);

  const noiseSeeds = useMemo(() => (
    {
      inner: Math.random() * 256,
      outer: Math.random() * 256,
      pivot: Math.random() * 256,
    }
  ), []);

  const radialDirection = new THREE.Vector3();
  const tempMatrix = new THREE.Matrix4();

  const applyLoopingOffset = (
    base: THREE.Vector3,
    target: THREE.Vector3,
    angle: number,
    radialScale: number,
    verticalScale: number,
    noiseSeed: number,
    noiseFrequencyScale: number = 1
  ) => {
    radialDirection.set(base.x, 0, base.z);
    const radialLength = radialDirection.length();

    if (radialLength > 1e-5) {
      radialDirection.multiplyScalar(1 / radialLength);
    } else {
      radialDirection.set(0, 1, 0);
    }

    const effectiveNoiseFreq = PARAMETRIC_RING_CONFIG.animation.noiseFrequency * noiseFrequencyScale;

    const noise = perlin3(
      base.x * effectiveNoiseFreq + noiseSeed,
      base.y * effectiveNoiseFreq,
      base.z * effectiveNoiseFreq
    );

    const phase = angle + noise * Math.PI;
    const radialOffset = Math.sin(phase) * radialScale;
    const verticalOffset = Math.sin(phase * 0.5 + noise) * verticalScale;

    target.copy(base).addScaledVector(radialDirection, radialOffset);
    target.y += verticalOffset;
  };

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // Apply personality-based animation speed
    const speedScale = effectiveParams.animationSpeed * (1 + midLevel * PARAMETRIC_RING_CONFIG.audioReactivity.mid.speedMultiplier * effectiveParams.audioReactivity);
    const adjustedElapsed = elapsed * speedScale;

    const loopT = (adjustedElapsed % PARAMETRIC_RING_CONFIG.animation.loopDuration) / PARAMETRIC_RING_CONFIG.animation.loopDuration;
    const baseAngle = loopT * Math.PI * 2;

    // Calculate audio-reactive amplitude scaling
    const amplitudeScale =
      1 +
      bassLevel * PARAMETRIC_RING_CONFIG.audioReactivity.bass.amplitudeMultiplier * effectiveParams.audioReactivity * expressiveness;

    // Beat impulse effect
    const beatImpulse = beatDetected ? PARAMETRIC_RING_CONFIG.audioReactivity.beat.impulseStrength : 1;

    // Apply noise frequency modulation from treble
    const noiseFrequencyScale =
      1 + trebleLevel * PARAMETRIC_RING_CONFIG.audioReactivity.treble.noiseMultiplier * effectiveParams.audioReactivity;

    for (let i = 0; i < n; i++) {
      applyLoopingOffset(
        baseInnerVectors[i],
        animatedInnerVectors[i],
        baseAngle,
        PARAMETRIC_RING_CONFIG.amplitude.innerRadial * amplitudeScale * beatImpulse * effectiveParams.noiseAmount,
        PARAMETRIC_RING_CONFIG.amplitude.vertical * PARAMETRIC_RING_CONFIG.amplitude.verticalScale.inner * amplitudeScale,
        noiseSeeds.inner,
        noiseFrequencyScale
      );

      applyLoopingOffset(
        baseOuterVectors[i],
        animatedOuterVectors[i],
        baseAngle,
        PARAMETRIC_RING_CONFIG.amplitude.outerRadial * amplitudeScale * beatImpulse * effectiveParams.noiseAmount,
        PARAMETRIC_RING_CONFIG.amplitude.vertical * PARAMETRIC_RING_CONFIG.amplitude.verticalScale.outer * amplitudeScale,
        noiseSeeds.outer,
        noiseFrequencyScale
      );

      applyLoopingOffset(
        basePivotVectors[i],
        animatedPivotVectors[i],
        baseAngle,
        PARAMETRIC_RING_CONFIG.amplitude.pivotRadial * amplitudeScale * beatImpulse * effectiveParams.noiseAmount,
        PARAMETRIC_RING_CONFIG.amplitude.vertical * PARAMETRIC_RING_CONFIG.amplitude.verticalScale.pivot * amplitudeScale,
        noiseSeeds.pivot,
        noiseFrequencyScale
      );
    }

    for (let i = 0; i < n; i++) {
      const inner = animatedInnerVectors[i];
      const outer = animatedOuterVectors[i];

      innerAttribute.array[i * 3] = inner.x;
      innerAttribute.array[i * 3 + 1] = inner.y;
      innerAttribute.array[i * 3 + 2] = inner.z;

      outerAttribute.array[i * 3] = outer.x;
      outerAttribute.array[i * 3 + 1] = outer.y;
      outerAttribute.array[i * 3 + 2] = outer.z;
    }

    innerAttribute.array[n * 3] = animatedInnerVectors[0].x;
    innerAttribute.array[n * 3 + 1] = animatedInnerVectors[0].y;
    innerAttribute.array[n * 3 + 2] = animatedInnerVectors[0].z;
    outerAttribute.array[n * 3] = animatedOuterVectors[0].x;
    outerAttribute.array[n * 3 + 1] = animatedOuterVectors[0].y;
    outerAttribute.array[n * 3 + 2] = animatedOuterVectors[0].z;

    for (let i = 0; i < strutSegments.length; i++) {
      const [start, end] = strutSegments[i];
      const idx = i * 6;
      strutAttribute.array[idx] = start.x;
      strutAttribute.array[idx + 1] = start.y;
      strutAttribute.array[idx + 2] = start.z;
      strutAttribute.array[idx + 3] = end.x;
      strutAttribute.array[idx + 4] = end.y;
      strutAttribute.array[idx + 5] = end.z;
    }

    innerAttribute.needsUpdate = true;
    outerAttribute.needsUpdate = true;
    strutAttribute.needsUpdate = true;

    // Update InstancedMesh matrices for joints
    if (innerJointsRef.current && outerJointsRef.current && pivotJointsRef.current) {
      for (let i = 0; i < n; i++) {
        // Inner joints
        tempMatrix.setPosition(animatedInnerVectors[i]);
        innerJointsRef.current.setMatrixAt(i, tempMatrix);

        // Outer joints
        tempMatrix.setPosition(animatedOuterVectors[i]);
        outerJointsRef.current.setMatrixAt(i, tempMatrix);

        // Pivot joints
        tempMatrix.setPosition(animatedPivotVectors[i]);
        pivotJointsRef.current.setMatrixAt(i, tempMatrix);
      }

      innerJointsRef.current.instanceMatrix.needsUpdate = true;
      outerJointsRef.current.instanceMatrix.needsUpdate = true;
      pivotJointsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group rotation={rotation}>
      <lineSegments geometry={strutGeometry}>
        <lineBasicMaterial
          color={strutColorA}
          transparent
          opacity={PARAMETRIC_RING_CONFIG.visual.opacity.struts}
        />
      </lineSegments>

      <lineLoop geometry={innerLoopGeometry}>
        <lineBasicMaterial
          color={innerLoopColor}
          transparent
          opacity={PARAMETRIC_RING_CONFIG.visual.opacity.loops}
        />
      </lineLoop>

      <lineLoop geometry={outerLoopGeometry}>
        <lineBasicMaterial
          color={outerLoopColor}
          transparent
          opacity={PARAMETRIC_RING_CONFIG.visual.opacity.loops}
        />
      </lineLoop>

      {/* InstancedMesh for inner joints - single draw call for all */}
      <instancedMesh
        ref={innerJointsRef}
        args={[jointGeometry, innerJointMaterial, n]}
        frustumCulled={false}
      />

      {/* InstancedMesh for outer joints - single draw call for all */}
      <instancedMesh
        ref={outerJointsRef}
        args={[jointGeometry, outerJointMaterial, n]}
        frustumCulled={false}
      />

      {/* InstancedMesh for pivot joints - single draw call for all */}
      <instancedMesh
        ref={pivotJointsRef}
        args={[jointGeometry, pivotJointMaterial, n]}
        frustumCulled={false}
      />
    </group>
  );
}
