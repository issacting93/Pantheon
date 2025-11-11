# Pantheon – Visualizing Human–AI Relational Dynamics

Pantheon is an interactive React + Three.js environment that visualizes emergent social roles and relationships in human–AI interaction. Building on human–human relational frameworks such as *Games People Play* (Berne, 1964), Interpersonal Circumplex Theory, and Relational Role Classification, Pantheon reimagines AI personality not as a static configuration but as a dynamic landscape of roles, affects, and power flows.

Through a combination of personality modeling and spatialized visual metaphors, Pantheon renders AI behavior as **living cartography**—each geometric form corresponds to a relational dimension (authority, reciprocity, affect, dependence), allowing designers and researchers to explore how roles shift across conversations and contexts in real time.

The system currently implements a sophisticated visualization engine that transforms personality parameters into procedural 3D geometry. Each layer of the constellation—from the pulsing cognitive core to the ambient expression field—represents a different temporal and conceptual stratum of personality, making abstract relational dynamics tangible and explorable.

## Vision: Relational Transparency in HAI

Traditional approaches to AI transparency focus on *technical* explainability: how does the model work? Pantheon proposes **relational transparency**: how does the AI *position itself socially*, and how do users perceive and negotiate that positioning?

Rather than asking "Can I trust this AI?", we ask:
- What social role is this AI performing? (expert, peer, assistant, mentor)
- How stable is its identity across contexts? (consistent vs. adaptive)
- What emotional register is it occupying? (formal, playful, empathetic)
- How does it balance authority and reciprocity in dialogue?

By visualizing these dimensions spatially, Pantheon serves as both a **research instrument** for analyzing human–AI role enactment and a **poetic visualization** of the politics embedded in conversational architectures.

**Situated within:** Human–AI Interaction (HAI), Explainable AI, Computational Social Science, Critical AI Studies

**Designed for:** ACM DIS 2026 submission – Interactive Systems and Experience

## Features

- 🌀 **Core Personalities** – Layered Fresnel sphere that breathes with cognitive tempo
- 🔷 **Parametric Ring** – Adjustable double-chain linkage encoding value stacks and identity tension
- 🧠 **Memory & Trait Rings** – Orbiting dot arrays that highlight trait signatures and stability
- ✨ **Expression Field** – Particle cloud with optional connection lattice for language richness
- 🛰️ **Observer Console** – Camera presets plus sliders for node density, radius, link distance, and visibility toggles
- 🎚️ **Behavioral Dynamics** – Controls for Core Pulse, Orbit Drift, Memory Flux, Observer Drift, and Event Lattice density
- 🌌 **Post Processing** – Optional screen-space effects (bloom, chromatic aberration) for cinematic presentation

## Conceptual Model: Four-Layer Personality Architecture

Pantheon implements a hierarchical personality model where each layer operates at a different temporal scale and represents distinct relational dimensions:

| Layer | Represents | Update Frequency | Relational Dimension | Visual Treatment |
| ----- | ---------- | ---------------- | -------------------- | ---------------- |
| **Layer 2: Trait Indicators** | Stable personality traits (openness, conscientiousness, curiosity bias) | Weeks–Months | **Authority posture** – How consistent/predictable is the AI? | Rotating ring of nodes with pulsing animation |
| **Layer 4: Character & Self-Concept** | Core values, identity markers, purpose themes | Months | **Identity coherence** – What does the AI stand for? | Parametric double-chain with adjustable kinematics and instanced joints |
| **Layer 5: Cognitive-Emotional** | Thinking style, communication tone, regulation profile | Days | **Affect & reciprocity** – What emotional register does it occupy? | Central sphere with breathing animation and Fresnel glow |
| **Layer 6: Expression & Social Identity** | Language markers, expertise domains, conversational rhythm | Hours | **Dependence dynamics** – How does it adapt to context? | Particle cloud with proximity-based connection lattice |

### Spatial Metaphors for Social Positioning

The visualization uses **spatial hierarchy** to represent **conceptual hierarchy**:
- **Center → Periphery**: Deep cognitive patterns → Surface linguistic style
- **Scale (size)**: Stability and influence of a personality dimension
- **Movement tempo**: Rate of adaptation (core breathes slowly, particles oscillate rapidly)
- **Connectivity**: Associations and cross-references between personality elements
- **Glow/opacity**: Salience and activation strength

This spatial grammar allows researchers to visually "read" the AI's relational posture: a large, stable core with minimal peripheral variation suggests authoritative consistency, while a dynamic periphery with high connectivity suggests collaborative adaptability.

## System Architecture & Current Scope

Pantheon's architecture consists of three major components:

```
Conversation Input → Personality Extraction → Spatial Visualization
  (Planned)            (Planned)                (✅ Implemented)
```

### What's Currently Implemented

**Spatial Visualization Engine** (production-ready):
- Four-layer 3D personality constellation with React Three Fiber
- Interactive control panel for manipulating personality parameters
- Procedural animation system with Perlin noise-driven organic motion
- Post-processing effects (bloom, chromatic aberration, Fresnel shaders)
- Type-safe personality token system (`TraitLayerTokens`, `CharacterLayerTokens`, etc.)
- Camera presets and effect controls for research demonstrations

**Purpose**: Demonstrate the *visual grammar* of personality representation and provide researchers with an interactive tool for exploring how different personality configurations might appear spatially.

### Roadmap: Conversation-to-Schema Pipeline

The complete vision includes an LLM-based classifier that extracts personality tokens from conversational transcripts:

1. **Conversation Parser**: Accepts human–AI dialogue (chat logs, transcripts)
2. **Parallel Layer Extractors**: Claude/GPT-4 APIs with specialized prompts for each layer
3. **Schema Validator**: Ensures extracted tokens match the defined vocabulary
4. **Temporal Tracking**: Visualize personality drift across multiple conversations

This pipeline is **extensively documented** in `CLASSIFIER_IMPLEMENTATION_PLAN.md` but not yet implemented. Current demonstrations use manually configured personality profiles.

**Why document the visualization first?** The spatial grammar and visual metaphors form the *theoretical contribution* to HAI research. The conversation parser, while valuable, is an engineering extension that enables empirical applications.

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

## Explore the Personality Mapping

For a deeper walkthrough of how each rendered layer connects to promptable personality tokens, see `AI_PERSONALITY_LAYERS.md`. It documents the shared vocabulary between the scene, the control panel, and the context objects we feed into AI agents.

## Tech Stack

- **React 18**
- **Three.js** with **@react-three/fiber** and **@react-three/drei**
- **TypeScript** for static typing
- **Vite** for rapid development and builds

## Folder Highlights

```
Pantheon/
├── src/
│   ├── components/
│   │   ├── PantheonDemo.tsx            # Main entry component & state orchestration
│   │   ├── ControlPanel.tsx            # Interactive control panel UI (698 lines)
│   │   ├── r3f/                        # React Three Fiber 3D components
│   │   │   ├── Scene3D.tsx             # Canvas setup & camera configuration
│   │   │   ├── CentralSphere.tsx       # Layer 5: Cognitive-emotional core
│   │   │   ├── ParametricRing.tsx      # Layer 4: Character scaffolding (516 lines)
│   │   │   ├── RingOfDots.tsx          # Layer 2: Trait ring
│   │   │   ├── ParticleSystem.tsx      # Layer 6: Expression field
│   │   │   └── ConnectionLines.tsx     # Layer 6: Relational lattice
│   │   └── effects/                    # Procedural effect controllers
│   │       ├── EffectsManager.tsx      # Effect orchestration
│   │       ├── ParticleScaleEffect.tsx # Emotional intensity
│   │       ├── ParticleRotationEffect.tsx # Recursive thinking patterns
│   │       ├── ParticleMovementEffect.tsx # Cognitive fluidity
│   │       └── CameraShakeEffect.tsx   # Engagement & reactivity
│   ├── types/
│   │   └── personality.ts              # TypeScript type definitions
│   ├── config/                         # Centralized configuration
│   ├── shaders/                        # GLSL shaders (Fresnel, chromatic aberration)
│   └── utils/
│       └── perlinNoise.ts              # Organic motion generator
└── Design Documents/
    ├── AI_PERSONALITY_LAYERS.md        # Complete layer-to-token mapping (456 lines)
    ├── CLASSIFIER_IMPLEMENTATION_PLAN.md # LLM-based extraction architecture (1,193 lines)
    ├── DIS_INTERACTIVITY_DESIGN.md     # Exhibition design for ACM DIS 2026
    └── design-doc.md                   # Alternative installation framing
```

## Documentation Map

For deeper exploration:

1. **[AI_PERSONALITY_LAYERS.md](./AI_PERSONALITY_LAYERS.md)** – Comprehensive mapping between visual components and personality tokens, including token vocabularies and update frequencies
2. **[CLASSIFIER_IMPLEMENTATION_PLAN.md](./CLASSIFIER_IMPLEMENTATION_PLAN.md)** – Detailed architecture for conversation-to-schema extraction (planned feature)
3. **[DIS_INTERACTIVITY_DESIGN.md](./DIS_INTERACTIVITY_DESIGN.md)** – Exhibition design for tangible interaction and witness ledger
4. **[THEORY.md](./docs/THEORY.md)** *(coming soon)* – Relational frameworks and HAI research positioning
5. **[VISUALIZATION.md](./docs/VISUALIZATION.md)** *(coming soon)* – Deep dive on visual metaphors and spatial grammar
6. **[API.md](./docs/API.md)** *(coming soon)* – Component interfaces and extension guide for developers

## Research Applications

Pantheon enables several research and design applications:

**For HAI Researchers:**
- Visualize and compare personality configurations across different AI agents
- Explore how relational dimensions (authority, reciprocity, affect) manifest spatially
- Study the perception of AI social roles through visual metaphor
- Generate discussion around "relational transparency" vs. technical explainability

**For Interaction Designers:**
- Rapid prototyping of AI personality configurations
- Visual communication tool for stakeholder discussions about AI behavior
- Exploration of personality-as-space metaphors for interface design

**For Computational Social Scientists:**
- Visual analysis framework for conversational role dynamics
- Comparative visualization of personality archetypes
- Temporal tracking of personality drift (when classifier is implemented)

**For Critical AI Studies:**
- Reveal the politics embedded in conversational architectures
- Question what "consistency" and "adaptability" mean for AI agents
- Examine how users project social scripts onto AI systems

## Citation

If you use Pantheon in your research, please cite:

```bibtex
@inproceedings{pantheon2026,
  title={Pantheon: Visualizing Human–AI Roles Through Interactive Relational Cartographies},
  author={[Your Name]},
  booktitle={Proceedings of the 2026 ACM Designing Interactive Systems Conference},
  series={DIS '26},
  year={2026},
  publisher={ACM},
  note={Interactive demonstration}
}
```

## Contributing

Pantheon is an active research prototype. Contributions are welcome, especially:
- Conversation parser implementation (see `CLASSIFIER_IMPLEMENTATION_PLAN.md`)
- Alternative visual metaphors for personality layers
- Case studies with real conversational data
- Extensions to the personality token vocabulary

See **CONTRIBUTING.md** *(coming soon)* for development setup and guidelines.

## License

MIT

---

**Contact:** [Your email/institution]
**Project Status:** Research prototype (visualization complete, classifier planned)
**Designed for:** ACM DIS 2026 submission
