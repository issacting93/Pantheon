# Pantheon – Modular AI Constellation

Pantheon visualises a modular, AI-driven collective rendered with React and Three.js. The central sphere embodies core personalities, concentric rings archive memories, and a halo of particles captures events and emergent signals. Everything runs procedurally—no audio input required.

## Features

- 🌀 **Core Personalities** – Pulsing inner sphere with layered Fresnel shading
- 🧠 **Memory Rings** – Orbiting dot arrays that breathe and rotate in evolving patterns
- ✨ **Signal Particles** – Configurable particle field with optional connection lattice
- 🔷 **Parametric Ring** – Deployable linkage inspired by angulated scissor elements with adjustable geometry
- 🛰️ **Observer Controls** – Switch between orbital camera presets and tune node density, scale, and link distance
- 🎛️ **Behavioral Dynamics** – Fine-grained control over pulsing, drift, memory flux, and observer drift
- 🌌 **Post Processing** – Optional screen-space effects for cinematic presentation

## Conceptual Model

| Layer | Represents | Visual Treatment |
| ----- | ---------- | ---------------- |
| Core Sphere | Primary AI personalities | Layered scale modulation + Fresnel glow |
| Memory Rings | Long-term knowledge bases | Rotational drift, breathing scale variations |
| Parametric Ring | Structured reasoning scaffolds | Double-chain linkage with adjustable angles |
| Particle Field | Events, signals, transient fragments | Oscillating particles w/ optional per-node motion |
| Event Lattice | Cross-memory relationships | Dynamic line segments with animated opacity |

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore Pantheon in development. Build a production bundle with `npm run build`.

## Tuning the Experience

Use the Pantheon Console (top-right panel) to:

- Select orbit presets for the observer camera
- Adjust node counts, radii, and link distance for the constellation
- Toggle key layers (core, memory rings, particles, parametric linkage, event lattice)
- Dial in behavioral dynamics such as Core Pulse, Orbit Drift, Memory Flux, Observer Drift, the Event Lattice opacity, and the parametric ring geometry

## Tech Stack

- **React 18**
- **Three.js** with **@react-three/fiber** and **@react-three/drei**
- **TypeScript** for static typing
- **Vite** for rapid development and builds

## Folder Highlights

```
src/
├── components/
│   ├── PantheonDemo.tsx            # Pantheon entry component & state
│   ├── ControlPanel.tsx            # Pantheon Console UI
│   ├── PantheonDemo.css            # Pantheon scene styling
│   ├── r3f/                        # Three.js scene primitives (central sphere, parametric ring, etc.)
│   └── effects/                    # Procedural effect controllers
└── shaders/                        # Custom shader modules
```

## License

MIT
