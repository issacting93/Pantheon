import { Html } from '@react-three/drei';
import { TraitIndicator } from '../TraitIndicator';

interface TraitIndicator3DProps {
  position?: [number, number, number];
  scale?: number;
}

export function TraitIndicator3D({ position = [-35, 15, 0], scale = 0.85 }: TraitIndicator3DProps) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <Html transform occlude distanceFactor={6}>
        <TraitIndicator />
      </Html>
    </group>
  );
}

