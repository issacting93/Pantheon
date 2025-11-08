import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { fresnel } from '../../shaders/fresnel';

export function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const elapsed = clock.getElapsedTime();
    const breathing = 0.08 * Math.sin(elapsed * 0.8);
    const resonance = 0.12 * Math.sin(elapsed * 1.6 + Math.PI / 4);
    const sphereScale = 1.35 + breathing + resonance;
    meshRef.current.scale.setScalar(sphereScale);

    if (haloRef.current) {
      haloRef.current.scale.setScalar(1.5 + breathing * 0.35);
    }

    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x = Math.sin(elapsed * 0.35) * 0.2;
    meshRef.current.rotation.z = Math.sin(elapsed * 0.25 + Math.PI / 6) * 0.12;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[4, 64, 64]} />
        <shaderMaterial
          vertexShader={fresnel.vertexShader}
          fragmentShader={fresnel.fragmentShader}
          uniforms={{
            u_color: { value: new THREE.Color('#B99C7E') },
            u_fresnelPower: { value: 3.6 },
            u_opacity: { value: 0.85 }
          }}
          transparent
        />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[4.5, 48, 48]} />
        <meshBasicMaterial color={'#8C705A'} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
