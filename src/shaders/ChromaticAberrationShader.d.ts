import type { Texture } from 'three';

export const ChromaticAberrationShader: {
  uniforms: {
    tDiffuse: { value: Texture | null };
    offset: { value: number };
  };
  vertexShader: string;
  fragmentShader: string;
};
