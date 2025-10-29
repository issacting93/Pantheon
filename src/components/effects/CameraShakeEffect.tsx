import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraShakeEffectProps {
  audioData: {
    bassLevel: number;
    midLevel: number;
    trebleLevel: number;
    volume: number;
    beatDetected: boolean;
  };
  enabled?: boolean;
  intensity?: number;
  threshold?: number;
  smoothing?: number;
}

export default function CameraShakeEffect({
  audioData,
  enabled = true,
  intensity = 0.5,
  threshold = 0.3,
  smoothing = 0.1
}: CameraShakeEffectProps) {
  const { camera } = useThree();
  const originalPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const currentShake = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetShake = useRef<THREE.Vector3>(new THREE.Vector3());
  const isInitialized = useRef(false);

  // Store original camera position
  useEffect(() => {
    if (!isInitialized.current) {
      originalPosition.current.copy(camera.position);
      isInitialized.current = true;
    }
  }, [camera]);

  useFrame(() => {
    if (!enabled) {
      // Reset camera to original position when disabled
      camera.position.copy(originalPosition.current);
      currentShake.current.set(0, 0, 0);
      targetShake.current.set(0, 0, 0);
      return;
    }

    // Calculate shake intensity based on audio
    const totalIntensity = (audioData.bassLevel + audioData.midLevel + audioData.trebleLevel) / 3;
    
    if (totalIntensity > threshold || audioData.beatDetected) {
      const shakeAmount = totalIntensity * intensity;
      
      // Different frequencies affect different axes
      targetShake.current.x = (Math.random() - 0.5) * audioData.trebleLevel * shakeAmount;
      targetShake.current.y = (Math.random() - 0.5) * audioData.midLevel * shakeAmount;
      targetShake.current.z = (Math.random() - 0.5) * audioData.bassLevel * shakeAmount * 0.5;
      
      // Beat detection adds extra shake
      if (audioData.beatDetected) {
        targetShake.current.multiplyScalar(2);
      }
    } else {
      // Gradually reduce shake when audio is quiet
      targetShake.current.multiplyScalar(0.9);
    }

    // Smooth interpolation to target shake
    currentShake.current.lerp(targetShake.current, smoothing);
    
    // Apply shake to camera position
    camera.position.copy(originalPosition.current).add(currentShake.current);
  });

  return null;
}
