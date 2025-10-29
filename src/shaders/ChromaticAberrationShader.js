export const ChromaticAberrationShader = {
    uniforms: {
        tDiffuse: { value: null },
        offset: { value: 0.005 },
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
        uniform float offset;
        varying vec2 vUv;
        void main() {
            vec2 uv = vUv;
            vec4 color = vec4(
                texture2D(tDiffuse, uv + vec2(-offset, 0.0)).r,
                texture2D(tDiffuse, uv).g,
                texture2D(tDiffuse, uv + vec2(offset, 0.0)).b,
                1.0
            );
            gl_FragColor = color;
        }
    `
};
