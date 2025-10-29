// fresnel.js

export const fresnel = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // Transform normal to world space
      vNormal = normalize(normalMatrix * normal);
      // View position is the negative of the model view position
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,

  fragmentShader: `
    uniform vec3 u_color;         // Base color of the object
    uniform float u_fresnelPower; // Power of the Fresnel effect
    uniform float u_opacity;      // Opacity of the material

    varying vec3 vNormal;         // Interpolated normal
    varying vec3 vViewPosition;  // View direction

    void main() {
      // Fresnel effect calculation
      float fresnel = pow(1.0 - dot(normalize(vViewPosition), vNormal), u_fresnelPower);
      
      // Mix base color with white based on Fresnel effect
      vec3 color = mix(u_color, vec3(1.0), fresnel);

      // Final color output
      gl_FragColor = vec4(color, u_opacity);
    }
  `
};
