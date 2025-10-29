export const DistortedPixelsShader: {
  uniforms: {
    tDiffuse: { value: any };
    time: { value: number };
    amplitude: { value: number };
    frequency: { value: number };
    speed: { value: number };
  };
  vertexShader: string;
  fragmentShader: string;
};
