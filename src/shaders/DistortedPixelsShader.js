export const DistortedPixelsShader = {
    uniforms: {
        tDiffuse: { value: null },
        time: { value: 0.0 },
        amplitude: { value: 0.2 },
        frequency: { value: 10.0 },
        speed: { value: 0.1 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform float amplitude;
        uniform float frequency;
        uniform float speed;

        varying vec2 vUv;

        void main() {
            vec2 uv = vUv;
            float distortion = sin(uv.y * frequency + time * speed) * amplitude;
            uv.x += distortion;
            gl_FragColor = texture2D(tDiffuse, uv);
        }
    `,
};
