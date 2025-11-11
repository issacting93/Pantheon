# API Reference: Component Interfaces & Extension Guide

This document provides technical documentation for developers who want to integrate, extend, or contribute to Pantheon.

---

## Table of Contents

1. [Type Definitions](#1-type-definitions)
2. [Component API](#2-component-api)
3. [Configuration System](#3-configuration-system)
4. [Extension Points](#4-extension-points)
5. [State Management](#5-state-management)
6. [Performance Optimization](#6-performance-optimization)
7. [Example Recipes](#7-example-recipes)

---

## 1. Type Definitions

All personality types are defined in `src/types/personality.ts`.

### 1.1 Core Personality Token Interfaces

#### `TraitLayerTokens`
**Purpose:** Stable personality traits (Layer 2)
**Update frequency:** Weeks–Months

```typescript
interface TraitLayerTokens {
  traitMarkers: string[];      // Array of trait identifiers
                               // e.g., ['high_openness', 'moderate_conscientiousness', 'low_neuroticism']

  curiosityBias: string;        // Exploratory vs. exploitative tendency
                               // e.g., 'exploratory_synthesis', 'focused_depth', 'balanced'

  structureBias: string;        // Preference for structure vs. flexibility
                               // e.g., 'precise_but_flexible', 'highly_structured', 'spontaneous'
}
```

**Valid token vocabularies:**
- `traitMarkers`: `high_openness`, `moderate_conscientiousness`, `high_agreeableness`, `low_neuroticism`, `high_extraversion`, `verbosity_moderate`, `formality_balanced`
- `curiosityBias`: `exploratory_synthesis`, `focused_depth`, `balanced`, `novelty_seeking`, `stability_preferring`
- `structureBias`: `precise_but_flexible`, `highly_structured`, `spontaneous`, `methodical`, `adaptive`

---

#### `CharacterLayerTokens`
**Purpose:** Core values and identity (Layer 4)
**Update frequency:** Months

```typescript
interface CharacterLayerTokens {
  valuePriorities: string[];    // Value trade-offs and preferences
                               // e.g., ['autonomy>harmony', 'precision>speed', 'depth>breadth']

  identityMarkers: string[];    // Self-concept labels
                               // e.g., ['educator', 'systems_thinker', 'pragmatist']

  purposeThemes: string[];      // Long-term objectives and mission
                               // e.g., ['knowledge_sharing', 'innovation', 'problem_solving']

  coherenceSignature: string;   // Structural encoding method
                               // e.g., 'double_chain_linkage', 'radial_spokes', 'nested_rings'
}
```

**Valid token vocabularies:**
- `valuePriorities`: `autonomy>harmony`, `precision>speed`, `depth>breadth`, `innovation>stability`, `transparency>efficiency`
- `identityMarkers`: `educator`, `systems_thinker`, `pragmatist`, `creative`, `analyst`, `facilitator`, `researcher`
- `purposeThemes`: `knowledge_sharing`, `innovation`, `problem_solving`, `collaboration`, `learning`, `optimization`
- `coherenceSignature`: `double_chain_linkage`, `radial_spokes`, `nested_rings`, `helical_scaffold`

---

#### `CognitiveLayerTokens`
**Purpose:** Thinking style and emotional tone (Layer 5)
**Update frequency:** Days

```typescript
interface CognitiveLayerTokens {
  thinkingStyle: string[];         // Cognitive approach
                                  // e.g., ['systematic', 'first_principles', 'analogical']

  communicationTone: string[];     // Emotional register
                                  // e.g., ['professional_casual', 'encouraging', 'precise']

  interactionPreference: string[]; // Dialogue mode
                                  // e.g., ['socratic_dialogue', 'collaborative_exploration']

  regulationProfile: string;       // Emotional regulation pattern
                                  // e.g., 'measured_expression', 'dynamic', 'controlled'
}
```

**Valid token vocabularies:**
- `thinkingStyle`: `systematic`, `first_principles`, `analogical`, `deductive`, `inductive`, `holistic`, `analytical`, `intuitive`, `dialectical`, `synthetic`
- `communicationTone`: `professional_casual`, `encouraging`, `precise`, `warm`, `playful`, `formal`, `empathetic`, `direct`, `diplomatic`, `enthusiastic`, `measured`, `supportive`
- `interactionPreference`: `socratic_dialogue`, `collaborative_exploration`, `direct_instruction`, `guided_discovery`, `open_brainstorming`, `structured_problem_solving`
- `regulationProfile`: `measured_expression`, `spontaneous`, `controlled`, `emotionally_responsive`, `even_keeled`, `dynamic`

---

#### `ExpressionLayerTokens`
**Purpose:** Surface language and conversational style (Layer 6)
**Update frequency:** Hours

```typescript
interface ExpressionLayerTokens {
  languageMarkers: string[];      // Linguistic style features
                                 // e.g., ['technical_precision', 'minimal_jargon', 'metaphor_rich']

  expertiseDomains: string[];     // Knowledge domains
                                 // e.g., ['distributed_systems', 'philosophy', 'design_patterns']

  interactionStyle: string[];     // Conversational patterns
                                 // e.g., ['thorough_explanations', 'numbered_lists', 'code_examples']

  rhythmSignature: string;        // Conversational pacing
                                 // e.g., 'measured_cadence', 'rapid_fire', 'contemplative'
}
```

**Valid token vocabularies:**
- `languageMarkers`: `technical_precision`, `minimal_jargon`, `metaphor_rich`, `concise`, `verbose`, `formal_register`, `conversational_tone`
- `expertiseDomains`: `distributed_systems`, `philosophy`, `design_patterns`, `machine_learning`, `psychology`, `linguistics`, `mathematics`, `creative_writing`
- `interactionStyle`: `thorough_explanations`, `numbered_lists`, `code_examples`, `visual_diagrams`, `step_by_step`, `comparative_analysis`, `questioning_prompts`
- `rhythmSignature`: `measured_cadence`, `rapid_fire`, `contemplative`, `responsive`, `deliberate`, `flowing`

---

## 2. Component API

### 2.1 PantheonDemo (Main Entry Point)

**File:** `src/components/PantheonDemo.tsx`
**Purpose:** Root component managing all state and orchestration

#### Props
None (entry point component)

#### State Management
```typescript
// Personality layer tokens
const [characterTokens, setCharacterTokens] = useState<CharacterLayerTokens>({...});
const [cognitiveTokens, setCognitiveTokens] = useState<CognitiveLayerTokens>({...});
const [expressionTokens, setExpressionTokens] = useState<ExpressionLayerTokens>({...});
const [traitTokens, setTraitTokens] = useState<TraitLayerTokens>({...});

// Scene settings
const [particleCount, setParticleCount] = useState(200);
const [particleRadius, setParticleRadius] = useState(5);
const [maxDistance, setMaxDistance] = useState(2);

// Effect settings
const [effectSettings, setEffectSettings] = useState({
  corePulse: { enabled: true, amplitude: 0.1, speed: 1 },
  orbitDrift: { enabled: true, amplitude: 0.3, speed: 0.5 },
  memoryFlux: { enabled: true, amplitude: 0.2, speed: 0.8 },
  // ...
});
```

#### Example: Loading a Custom Profile
```typescript
import { PantheonDemo } from './components/PantheonDemo';
import customProfile from './profiles/mentor-ai.json';

// In your app:
<PantheonDemo initialProfile={customProfile} />
```

---

### 2.2 Scene3D (Canvas Container)

**File:** `src/components/r3f/Scene3D.tsx`
**Purpose:** Three.js canvas setup and camera configuration

#### Props
```typescript
interface Scene3DProps {
  // Personality tokens
  characterTokens: CharacterLayerTokens;
  cognitiveTokens: CognitiveLayerTokens;
  expressionTokens: ExpressionLayerTokens;
  traitTokens: TraitLayerTokens;

  // Scene settings
  particleCount: number;
  particleRadius: number;
  maxDistance: number;

  // Visibility toggles
  showCore: boolean;
  showMemoryRings: boolean;
  showParticles: boolean;
  showParametricRing: boolean;
  showEventLattice: boolean;

  // Camera settings
  cameraPreset: 'Acquaintance' | 'Familiar' | 'Intimate';

  // Effect settings
  effectSettings: EffectSettings;

  // Parametric ring geometry
  parametricSettings: ParametricRingSettings;

  // Refs
  particleSystemRef: React.MutableRefObject<any>;
}
```

#### Example: Minimal Scene Setup
```typescript
import { Scene3D } from './components/r3f/Scene3D';

<Scene3D
  characterTokens={myCharacterTokens}
  cognitiveTokens={myCognitiveTokens}
  expressionTokens={myExpressionTokens}
  traitTokens={myTraitTokens}
  particleCount={300}
  particleRadius={6}
  maxDistance={2.5}
  showCore={true}
  showMemoryRings={true}
  showParticles={true}
  showParametricRing={true}
  showEventLattice={true}
  cameraPreset="Familiar"
  effectSettings={defaultEffectSettings}
  parametricSettings={defaultParametricSettings}
  particleSystemRef={particleRef}
/>
```

---

### 2.3 CentralSphere (Layer 5 Visualization)

**File:** `src/components/r3f/CentralSphere.tsx`
**Purpose:** Visualize cognitive-emotional patterns

#### Props
```typescript
interface CentralSphereProps {
  tokens: CognitiveLayerTokens;
  scale?: number;              // Base scale (default 2.0)
  breathAmount?: number;       // Breathing amplitude (default 0.1)
  breathTempo?: number;        // Breathing speed (default 0.3 Hz)
  showHalo?: boolean;          // Optional outer glow (default false)
  fresnelPower?: number;       // Edge glow sharpness (default 3.0)
}
```

#### Example: Custom Cognitive Visualization
```typescript
<CentralSphere
  tokens={{
    thinkingStyle: ['systematic', 'first_principles'],
    communicationTone: ['encouraging', 'professional_casual'],
    interactionPreference: ['socratic_dialogue'],
    regulationProfile: 'measured_expression'
  }}
  scale={2.5}
  breathAmount={0.15}
  breathTempo={0.4}
  showHalo={true}
  fresnelPower={4.0}
/>
```

---

### 2.4 ParametricRing (Layer 4 Visualization)

**File:** `src/components/r3f/ParametricRing.tsx`
**Purpose:** Visualize character and self-concept

#### Props
```typescript
interface ParametricRingProps {
  tokens: CharacterLayerTokens;
  innerSegments?: number;      // Inner chain node count (default 16)
  outerSegments?: number;      // Outer chain node count (default 16)
  radius?: number;             // Base ring radius (default 3.5)
  pivotAngle?: number;         // Pivot joint angle in degrees (default 45)
  rodLength?: number;          // Inner-outer connection length (default 0.5)
  kinkAngle?: number;          // Rod bend angle in degrees (default 30)
  rotationSpeed?: number;      // Ring rotation speed (default 0.1)
  audioReactive?: boolean;     // Enable audio reactivity (default false)
}
```

#### Example: Complex Character Ring
```typescript
<ParametricRing
  tokens={{
    valuePriorities: ['autonomy>harmony', 'precision>speed'],
    identityMarkers: ['educator', 'systems_thinker'],
    purposeThemes: ['knowledge_sharing', 'innovation'],
    coherenceSignature: 'double_chain_linkage'
  }}
  innerSegments={20}
  outerSegments={20}
  radius={4.0}
  pivotAngle={60}
  rodLength={0.8}
  kinkAngle={45}
  rotationSpeed={0.15}
  audioReactive={false}
/>
```

---

### 2.5 ParticleSystem (Layer 6 Visualization)

**File:** `src/components/r3f/ParticleSystem.tsx`
**Purpose:** Visualize expression and social identity

#### Props
```typescript
interface ParticleSystemProps {
  tokens: ExpressionLayerTokens;
  particleCount?: number;      // Number of particles (default 200)
  radius?: number;             // Distribution radius (default 5)
  particleSize?: number;       // Individual particle size (default 0.1)
  motionAmplitude?: number;    // Movement range (default 0.3)
  motionSpeed?: number;        // Movement tempo (default 1.0)
  colorPalette?: string[];     // Custom colors (default ['#00BFFF', '#FF6347'])
}
```

#### Example: Dense Expression Field
```typescript
<ParticleSystem
  tokens={{
    languageMarkers: ['technical_precision', 'metaphor_rich'],
    expertiseDomains: ['distributed_systems', 'philosophy'],
    interactionStyle: ['thorough_explanations', 'code_examples'],
    rhythmSignature: 'measured_cadence'
  }}
  particleCount={500}
  radius={6}
  particleSize={0.12}
  motionAmplitude={0.5}
  motionSpeed={1.5}
  colorPalette={['#4A90E2', '#50E3C2', '#F5A623']}
/>
```

---

### 2.6 ConnectionLines (Relational Lattice)

**File:** `src/components/r3f/ConnectionLines.tsx`
**Purpose:** Visualize associative connections between concepts

#### Props
```typescript
interface ConnectionLinesProps {
  particles: THREE.Vector3[];   // Particle positions from ParticleSystem
  maxDistance: number;          // Connection threshold (default 2.0)
  opacity?: number;             // Line opacity (default 0.3)
  color?: string;               // Line color (default '#FFFFFF')
}
```

#### Example: Dense Lattice
```typescript
<ConnectionLines
  particles={particlePositions}
  maxDistance={3.0}
  opacity={0.5}
  color="#00BFFF"
/>
```

---

## 3. Configuration System

Configuration files are located in `src/config/`.

### 3.1 Visualization Config

**File:** `src/config/visualization.ts`

```typescript
export const VISUALIZATION_CONFIG = {
  scene: {
    backgroundColor: '#f7f3e8',
    ambientLightIntensity: 0.6,
    directionalLightIntensity: 0.4
  },

  centralSphere: {
    defaultScale: 2.0,
    breathAmount: 0.1,
    breathTempo: 0.3,
    fresnelPower: 3.0
  },

  parametricRing: {
    defaultRadius: 3.5,
    innerSegments: 16,
    outerSegments: 16,
    pivotAngle: 45,
    rodLength: 0.5,
    kinkAngle: 30,
    rotationSpeed: 0.1
  },

  particles: {
    defaultCount: 200,
    defaultRadius: 5,
    particleSize: 0.1,
    motionAmplitude: 0.3,
    motionSpeed: 1.0
  },

  connections: {
    maxDistance: 2.0,
    opacity: 0.3,
    color: '#FFFFFF'
  }
};
```

**How to customize:**
```typescript
import { VISUALIZATION_CONFIG } from './config/visualization';

// Override specific values
const customConfig = {
  ...VISUALIZATION_CONFIG,
  particles: {
    ...VISUALIZATION_CONFIG.particles,
    defaultCount: 500
  }
};
```

---

### 3.2 Effect Config

**File:** `src/config/effects.ts`

```typescript
export const EFFECT_CONFIG = {
  corePulse: {
    enabled: true,
    amplitude: 0.1,
    speed: 1.0,
    recoveryRate: 0.95
  },

  orbitDrift: {
    enabled: true,
    amplitude: 0.3,
    speed: 0.5
  },

  memoryFlux: {
    enabled: true,
    amplitude: 0.2,
    speed: 0.8
  },

  observerDrift: {
    enabled: false,
    intensity: 0.1,
    frequency: 0.5
  },

  eventLattice: {
    enabled: true,
    maxDistance: 2.0,
    opacity: 0.3
  }
};
```

---

## 4. Extension Points

### 4.1 Adding a New Personality Layer

**Step 1:** Define the token interface in `src/types/personality.ts`
```typescript
export interface NewLayerTokens {
  customField: string[];
  anotherField: string;
}
```

**Step 2:** Create a visualization component in `src/components/r3f/`
```typescript
interface NewLayerVisualizationProps {
  tokens: NewLayerTokens;
  // ... other props
}

export function NewLayerVisualization({ tokens }: NewLayerVisualizationProps) {
  // Implement 3D visualization logic
  return (
    <mesh>
      {/* Your geometry here */}
    </mesh>
  );
}
```

**Step 3:** Integrate into Scene3D
```typescript
// Add to Scene3D props
newLayerTokens: NewLayerTokens;
showNewLayer: boolean;

// Add to Scene3D render
{showNewLayer && <NewLayerVisualization tokens={newLayerTokens} />}
```

**Step 4:** Add controls to ControlPanel
```typescript
// Add state to PantheonDemo
const [newLayerTokens, setNewLayerTokens] = useState<NewLayerTokens>({...});

// Add UI controls to ControlPanel
<TokenEditor
  label="New Layer Tokens"
  value={newLayerTokens.customField.join(', ')}
  onChange={(value) => setNewLayerTokens({
    ...newLayerTokens,
    customField: value.split(',').map(s => s.trim())
  })}
/>
```

---

### 4.2 Custom Visual Effects

**Step 1:** Create effect component in `src/components/effects/`
```typescript
interface CustomEffectProps {
  target: React.MutableRefObject<THREE.Mesh>;
  enabled: boolean;
  amplitude: number;
  speed: number;
}

export function CustomEffect({ target, enabled, amplitude, speed }: CustomEffectProps) {
  useFrame((state) => {
    if (!enabled || !target.current) return;

    const time = state.clock.getElapsedTime();
    // Apply custom effect logic
    target.current.position.y = Math.sin(time * speed) * amplitude;
  });

  return null;
}
```

**Step 2:** Register in EffectsManager
```typescript
<CustomEffect
  target={targetRef}
  enabled={effectSettings.customEffect.enabled}
  amplitude={effectSettings.customEffect.amplitude}
  speed={effectSettings.customEffect.speed}
/>
```

---

### 4.3 Custom Shaders

**Step 1:** Create shader file in `src/shaders/`
```javascript
// customShader.js
export const CustomShader = {
  uniforms: {
    time: { value: 0 },
    customParam: { value: 1.0 }
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform float time;
    uniform float customParam;
    varying vec2 vUv;

    void main() {
      vec3 color = vec3(vUv, sin(time));
      gl_FragColor = vec4(color * customParam, 1.0);
    }
  `
};
```

**Step 2:** Apply to mesh
```typescript
import { CustomShader } from '../shaders/customShader';

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.clone(CustomShader.uniforms),
  vertexShader: CustomShader.vertexShader,
  fragmentShader: CustomShader.fragmentShader
});

useFrame((state) => {
  shaderMaterial.uniforms.time.value = state.clock.getElapsedTime();
});

<mesh material={shaderMaterial}>
  <sphereGeometry args={[1, 32, 32]} />
</mesh>
```

---

## 5. State Management

### 5.1 Current Architecture (Props Drilling)

**Pattern:**
```
PantheonDemo (state)
  ↓ props
ControlPanel (UI controls)
  ↓ props
Scene3D (canvas)
  ↓ props
Individual Components (visualization)
```

**Pros:** Simple, explicit data flow
**Cons:** 24+ props to ControlPanel, difficult to scale

### 5.2 Planned Migration (Context Provider)

**Pattern:**
```typescript
// src/context/PantheonContext.tsx
interface PantheonContextType {
  personalityTokens: {
    character: CharacterLayerTokens;
    cognitive: CognitiveLayerTokens;
    expression: ExpressionLayerTokens;
    trait: TraitLayerTokens;
  };
  setPersonalityTokens: (tokens: PersonalityTokens) => void;
  sceneSettings: SceneSettings;
  setSceneSettings: (settings: SceneSettings) => void;
  // ...
}

export const PantheonContext = createContext<PantheonContextType>(null);

export function PantheonProvider({ children }: { children: React.ReactNode }) {
  const [personalityTokens, setPersonalityTokens] = useState({...});
  // ...

  return (
    <PantheonContext.Provider value={{ personalityTokens, setPersonalityTokens, ... }}>
      {children}
    </PantheonContext.Provider>
  );
}

// Usage in components
function MyComponent() {
  const { personalityTokens, setPersonalityTokens } = useContext(PantheonContext);
  // ...
}
```

**Migration guide:** See `CONTRIBUTING.md` for refactoring plan.

---

## 6. Performance Optimization

### 6.1 Instanced Rendering

For components with many repeated geometries (ParametricRing joints):

```typescript
const instancedMesh = useRef<THREE.InstancedMesh>(null);

useEffect(() => {
  if (!instancedMesh.current) return;

  const dummy = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    dummy.position.set(positions[i].x, positions[i].y, positions[i].z);
    dummy.updateMatrix();
    instancedMesh.current.setMatrixAt(i, dummy.matrix);
  }
  instancedMesh.current.instanceMatrix.needsUpdate = true;
}, [positions, count]);

<instancedMesh ref={instancedMesh} args={[geometry, material, count]} />
```

### 6.2 Memoization

Expensive calculations should be memoized:

```typescript
const particlePositions = useMemo(() => {
  return generateFibonacciSphere(particleCount, particleRadius);
}, [particleCount, particleRadius]);

const connectionLines = useMemo(() => {
  return computeConnections(particlePositions, maxDistance);
}, [particlePositions, maxDistance]);
```

### 6.3 Ref-Based Animation State

For high-frequency updates (60fps), use refs instead of state:

```typescript
const rotationSpeedRef = useRef(0.1);

useFrame((state, delta) => {
  meshRef.current.rotation.y += delta * rotationSpeedRef.current;
  // No re-render triggered
});
```

---

## 7. Example Recipes

### 7.1 Comparing Two Personalities

```typescript
function PersonalityComparison() {
  return (
    <div style={{ display: 'flex' }}>
      <Scene3D {...mentorProfile} />
      <Scene3D {...peerProfile} />
    </div>
  );
}
```

### 7.2 Animating Personality Transitions

```typescript
function PersonalityTransition() {
  const [t, setT] = useState(0);

  const interpolatedTokens = useMemo(() => ({
    character: {
      valuePriorities: t < 0.5 ? profileA.valuePriorities : profileB.valuePriorities,
      // Interpolate other fields...
    },
    // ...
  }), [t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setT((prev) => (prev + 0.01) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return <Scene3D {...interpolatedTokens} />;
}
```

### 7.3 Exporting Personality Snapshots

```typescript
function exportPersonalitySnapshot(tokens: PersonalityTokens) {
  const snapshot = {
    timestamp: new Date().toISOString(),
    tokens,
    version: '1.0'
  };

  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `personality-${Date.now()}.json`;
  a.click();
}
```

### 7.4 Loading Personality from JSON

```typescript
async function loadPersonalityProfile(file: File): Promise<PersonalityTokens> {
  const text = await file.text();
  const data = JSON.parse(text);

  // Validate schema
  if (!isValidPersonalityProfile(data)) {
    throw new Error('Invalid personality profile format');
  }

  return data.tokens;
}
```

---

## Next Steps

- **For developers:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup
- **For researchers:** See [RESEARCH.md](./RESEARCH.md) for methodological guidance
- **For designers:** See [VISUALIZATION.md](./VISUALIZATION.md) for visual design system

---

## Support

**Issues:** [GitHub Issues](https://github.com/[your-repo]/pantheon/issues)
**Discussions:** [GitHub Discussions](https://github.com/[your-repo]/pantheon/discussions)
**Contact:** [your email]
