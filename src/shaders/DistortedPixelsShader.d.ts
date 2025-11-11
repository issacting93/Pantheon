import type { Texture } from 'three';

export const DistortedPixelsShader: {
  uniforms: {
    tDiffuse: { value: Texture | null };
    time: { value: number };
    amplitude: { value: number };
    frequency: { value: number };
    speed: { value: number };
  };
  vertexShader: string;
  fragmentShader: string;
};
