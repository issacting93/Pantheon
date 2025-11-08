# Pantheon Feature Overview

A snapshot of the current capabilities in the Pantheon // Modular Constellation experience.

## Visual Layers

- **Layer 2 · Trait Indicators**
  - Rotating ring of enlarged nodes conveying baseline trait markers
  - Animated scale pulse reflecting openness/conscientiousness/verbosity bias
  - Drei tooltip reveals node index on hover within the expression lattice

- **Layer 4 · Character Ring**
  - Parametric double-chain ring (deployable linkage) with configurable harmonics, arc length, kink angle, and tilt
  - Warm neutral palette to match the off-white stage
  - Personality tokens (value priorities, identity markers, purpose themes, coherence signature) editable in the console

- **Layer 5 · Cognitive Pulse**
  - Central Fresnel sphere with breathing scale/rotation, darkened warmth for contrast
  - Halo mesh adds atmospheric glow and mirrors regulation intensity

- **Layer 6 · Expression Lattice**
  - Particle cloud and linking lines with Perlin-driven motion and audio-reactive scaffold
  - Configurable particle count, radius, and link distance (10–100 range)
  - Tooltips for the lattice when hovering nodes to identify expression points

## Control Surfaces

- **Pantheon Console**
  - Panel sections mapped to each layer with personality token editors and sliders
  - Layer visibility toggles for character ring, cognitive pulse, traits, particles, and lattice
  - Preset camera distances for Acquaintance / Familiar / Intimate views

- **Overlay Legend**
  - Off-white card summarising Layers 2 → 6 with textual descriptions of visual metaphors
  - Updated ordering to foreground trait indicators

## Styling & Theming

- Context Weaver design system (muted tones, light typography, 14px base) applied globally
- Canvas and components styled for a warm off-white background (`#f7f3e8`)
- Harmonised palette across ring, sphere, lattice, and trait glyphs

## Runtime Enhancements

- Procedural animations across all layers (breathing, rotation, Perlin motion)
- Drei `Html` tooltips and DOM/HUD elements integrated with scene state
- Build & test scripts verified (`npm run build`, `npm test`) after each update
