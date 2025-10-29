import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { fresnel } from '../../shaders/fresnel';
import type { AudioData } from '../../types/audio';

interface CentralSphereProps {
  audioData: AudioData;
}

export function CentralSphere({ audioData }: CentralSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Apply mid-frequency pulsing effect
  useFrame(() => {
    if (!meshRef.current) return;

    const sphereScale = 1 + (audioData.midLevel * 0.24);
    meshRef.current.scale.setScalar(sphereScale);

    // Base rotation
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <shaderMaterial
        vertexShader={fresnel.vertexShader}
        fragmentShader={fresnel.fragmentShader}
        uniforms={{
          u_color: { value: new THREE.Color(0xDA4167) }, // Rose accent color
          u_fresnelPower: { value: 5.0 },
          u_opacity: { value: 0.8 }
        }}
        transparent={true}
      />
    </mesh>
  );
}
