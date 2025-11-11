# Contributing to Pantheon

Thank you for your interest in contributing to Pantheon! This guide will help you get started with development, understand the project structure, and contribute effectively.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Project Architecture](#project-architecture)
4. [Code Style & Conventions](#code-style--conventions)
5. [Testing Guidelines](#testing-guidelines)
6. [Contribution Areas](#contribution-areas)
7. [Roadmap & Priorities](#roadmap--priorities)
8. [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **npm**: v9+ (comes with Node.js)
- **Git**: For version control
- **Code editor**: VS Code recommended (with ESLint and Prettier extensions)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/[your-repo]/pantheon.git
   cd pantheon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` (or port shown in terminal)

### Verify Installation

You should see the Pantheon visualization with:
- A central glowing sphere (Layer 5: Cognitive-Emotional)
- A parametric ring (Layer 4: Character)
- Rotating trait nodes (Layer 2: Trait Indicators)
- Particle cloud (Layer 6: Expression)
- Control panel on the right

If you see errors, check:
- Node version: `node --version` (should be 18+)
- npm version: `npm --version` (should be 9+)
- Browser console for WebGL support errors

---

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server with hot reload
npm run build            # Build for production (TypeScript compile + bundle)
npm run preview          # Preview production build locally

# Testing
npm run test             # Run Vitest in watch mode
npm run test:ui          # Run Vitest with UI (browser-based test runner)
npm run test:coverage    # Generate test coverage report

# Linting
npm run lint             # Run ESLint on .ts and .tsx files
```

### Development Tips

**Hot Module Replacement (HMR):**
- Changes to React components will hot-reload without full page refresh
- Changes to shaders require manual refresh (limitation of Three.js)

**Performance profiling:**
- Open React DevTools Profiler to measure component render times
- Use Chrome DevTools Performance tab for GPU/rendering analysis
- Press `Shift+Ctrl+F` in-browser to show FPS counter

**Debugging Three.js:**
- Install [Three.js DevTools](https://chrome.google.com/webstore/detail/threejs-developer-tools) Chrome extension
- Use `console.log(scene)` to inspect scene graph
- Add `<axesHelper />` to Scene3D for coordinate reference

---

## Project Architecture

### Directory Structure

```
pantheon/
├── src/
│   ├── components/
│   │   ├── PantheonDemo.tsx           # Main entry point & state management
│   │   ├── ControlPanel.tsx           # UI controls (698 lines - refactor priority)
│   │   ├── ErrorBoundary.tsx          # Error handling wrapper
│   │   ├── r3f/                       # React Three Fiber components
│   │   │   ├── Scene3D.tsx            # Canvas setup & camera
│   │   │   ├── CentralSphere.tsx      # Layer 5 visualization
│   │   │   ├── ParametricRing.tsx     # Layer 4 visualization (516 lines)
│   │   │   ├── RingOfDots.tsx         # Layer 2 ring
│   │   │   ├── TraitIndicator3D.tsx   # Layer 2 individual nodes
│   │   │   ├── ParticleSystem.tsx     # Layer 6 particle cloud
│   │   │   ├── ConnectionLines.tsx    # Layer 6 connection lattice
│   │   │   └── PostProcessingEffects.tsx # Bloom, chromatic aberration
│   │   └── effects/                   # Procedural effect controllers
│   │       ├── EffectsManager.tsx     # Effect orchestration
│   │       ├── ParticleScaleEffect.tsx
│   │       ├── ParticleRotationEffect.tsx
│   │       ├── ParticleMovementEffect.tsx
│   │       ├── CameraShakeEffect.tsx
│   │       └── ParticleConnectionsEffect.tsx
│   ├── types/
│   │   └── personality.ts             # TypeScript type definitions
│   ├── config/
│   │   ├── visualization.ts           # Default visualization settings
│   │   ├── effects.ts                 # Default effect settings
│   │   ├── audio.ts                   # Audio reactivity config
│   │   ├── performance.ts             # Performance optimization settings
│   │   └── parametricRing.ts          # Ring geometry settings
│   ├── shaders/
│   │   ├── fresnel.js                 # Fresnel edge glow (central sphere)
│   │   ├── ChromaticAberrationShader.js
│   │   └── DistortedPixelsShader.js
│   └── utils/
│       └── perlinNoise.ts             # Organic motion generator
├── core/                              # Backend infrastructure (planned)
│   ├── profile-loader.ts              # JSON profile loading
│   ├── confidence-calculator.ts       # Confidence scoring
│   └── token-compressor.ts            # Token optimization
├── docs/                              # Documentation
│   ├── THEORY.md                      # Theoretical foundations
│   ├── VISUALIZATION.md               # Visual design system
│   ├── API.md                         # Component interfaces
│   └── RESEARCH.md                    # Research methodology
├── Design Documents/
│   ├── AI_PERSONALITY_LAYERS.md       # Layer-to-token mapping
│   ├── CLASSIFIER_IMPLEMENTATION_PLAN.md # Conversation parser architecture
│   ├── DIS_INTERACTIVITY_DESIGN.md    # Exhibition design
│   └── design-doc.md                  # Alternative installation framing
└── tests/                             # Test files (mirror src/ structure)
```

### Key Architectural Patterns

#### 1. State Management (Current: Props Drilling)

**Pattern:**
```
PantheonDemo (state) → Scene3D → Individual Components
```

**Issue:** 24+ props passed to ControlPanel
**Planned refactor:** Context provider (see [Roadmap](#roadmap--priorities))

#### 2. Animation with useFrame

All animations use React Three Fiber's `useFrame` hook:

```typescript
useFrame((state, delta) => {
  const time = state.clock.getElapsedTime();
  meshRef.current.rotation.y += delta * rotationSpeed;
});
```

**Best practice:** Use refs for high-frequency updates (avoid state re-renders)

#### 3. Memoization for Performance

Expensive calculations are memoized:

```typescript
const particlePositions = useMemo(() => {
  return generateFibonacciSphere(particleCount, radius);
}, [particleCount, radius]);
```

**Best practice:** Memoize geometry, materials, and derived data

#### 4. Instanced Rendering

ParametricRing uses instanced meshes for performance:

```typescript
<instancedMesh ref={instancedRef} args={[geometry, material, count]} />
```

**When to use:** Repeated geometry (joints, particles, nodes)

---

## Code Style & Conventions

### TypeScript

**Type safety:**
- Use explicit types for function parameters and returns
- Avoid `any` (use `unknown` if type is truly dynamic)
- Define interfaces for all props and state

**Example:**
```typescript
// Good
interface MyComponentProps {
  tokens: CognitiveLayerTokens;
  scale: number;
}

function MyComponent({ tokens, scale }: MyComponentProps): JSX.Element {
  // ...
}

// Bad
function MyComponent(props: any) {
  // ...
}
```

### React

**Component structure:**
1. Imports
2. Type definitions
3. Component function
4. Hooks (useState, useRef, useMemo, useEffect)
5. Helper functions
6. useFrame animation
7. JSX return

**Example:**
```typescript
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MyComponentProps {
  // ...
}

export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // 1. State & refs
  const meshRef = useRef<THREE.Mesh>(null);

  // 2. Memoized values
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);

  // 3. Effects
  useEffect(() => {
    // Cleanup if needed
    return () => geometry.dispose();
  }, [geometry]);

  // 4. Animation
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta;
  });

  // 5. Render
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
```

### Naming Conventions

| Type | Convention | Example |
| ---- | ---------- | ------- |
| Components | PascalCase | `CentralSphere.tsx` |
| Hooks | camelCase, prefix `use` | `usePerlinNoise.ts` |
| Utils | camelCase | `generateFibonacciSphere` |
| Types/Interfaces | PascalCase | `CognitiveLayerTokens` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_PARTICLE_COUNT` |
| Config objects | UPPER_SNAKE_CASE | `VISUALIZATION_CONFIG` |

### File Organization

- **One component per file** (exception: small helper components)
- **Co-locate related files** (e.g., `CentralSphere.tsx` + `CentralSphere.test.tsx`)
- **Index files** for re-exports (e.g., `r3f/index.ts`)

---

## Testing Guidelines

### Current Test Coverage

**Status:** ~20% coverage (needs improvement)

**Priority areas:**
1. Utility functions (`perlinNoise.ts`, Fibonacci sphere generation)
2. Type definitions (validate token vocabularies)
3. Configuration (ensure defaults are valid)

### Testing Stack

- **Vitest**: Test runner (Jest-compatible)
- **React Testing Library**: Component testing
- **jsdom**: Browser environment simulation

### Writing Tests

**Utility function example:**

```typescript
// src/utils/__tests__/perlinNoise.test.ts
import { describe, it, expect } from 'vitest';
import { perlinNoise } from '../perlinNoise';

describe('perlinNoise', () => {
  it('returns values between -1 and 1', () => {
    const value = perlinNoise(0.5, 0.5, 0);
    expect(value).toBeGreaterThanOrEqual(-1);
    expect(value).toBeLessThanOrEqual(1);
  });

  it('is deterministic for same inputs', () => {
    const value1 = perlinNoise(0.5, 0.5, 0);
    const value2 = perlinNoise(0.5, 0.5, 0);
    expect(value1).toBe(value2);
  });
});
```

**React component example:**

```typescript
// src/components/__tests__/ErrorBoundary.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child throws', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
```

**Running tests:**

```bash
npm run test              # Watch mode (re-runs on file changes)
npm run test:ui           # Browser UI for debugging
npm run test:coverage     # Generate coverage report (see coverage/index.html)
```

### Testing Best Practices

1. **Test behavior, not implementation**
2. **Use descriptive test names** ("it should X when Y")
3. **Avoid snapshot tests** for Three.js components (too brittle)
4. **Mock heavy dependencies** (e.g., Three.js scene graph)
5. **Test edge cases** (empty arrays, undefined values, extreme numbers)

---

## Contribution Areas

### High Priority

#### 1. **Conversation-to-Schema Classifier** ⭐⭐⭐

**Why:** This is the missing piece that enables automated personality extraction

**What to do:**
- Implement LLM-based extraction system (see `CLASSIFIER_IMPLEMENTATION_PLAN.md`)
- Create UI components for conversation input (`ConversationInput.tsx`)
- Build schema preview and validation (`SchemaPreview.tsx`)

**Skills needed:** TypeScript, LLM API integration (Claude/OpenAI), prompt engineering

**Estimated effort:** 2-3 weeks

---

#### 2. **Context Provider Refactor** ⭐⭐

**Why:** Reduce props drilling (24+ props to ControlPanel), improve maintainability

**What to do:**
- Create `PantheonContext.tsx` with state management
- Migrate components to use `useContext` instead of props
- Ensure performance remains optimal (avoid unnecessary re-renders)

**Skills needed:** React, TypeScript, performance optimization

**Estimated effort:** 1 week

---

#### 3. **Test Coverage Improvement** ⭐⭐

**Why:** Current coverage is ~20%, target is 70%+

**What to do:**
- Write tests for utility functions (Perlin noise, Fibonacci sphere)
- Add component tests for ControlPanel, EffectsManager
- Test configuration defaults and validation

**Skills needed:** Vitest, React Testing Library

**Estimated effort:** 1-2 weeks

---

### Medium Priority

#### 4. **Multi-Agent Visualization**

**Why:** Enable comparative studies (show multiple AI personalities simultaneously)

**What to do:**
- Support loading multiple personality profiles
- Implement side-by-side view or overlaid visualization
- Add comparison metrics (spatial distance, trait differences)

**Skills needed:** React, Three.js, spatial algorithms

**Estimated effort:** 2 weeks

---

#### 5. **Temporal Tracking & Animation**

**Why:** Visualize personality drift over time

**What to do:**
- Time-series data structure for personality snapshots
- Animation system to interpolate between states
- Timeline scrubber UI for exploring temporal evolution

**Skills needed:** React, Three.js, animation, data structures

**Estimated effort:** 2-3 weeks

---

#### 6. **Accessibility Improvements**

**Why:** Make Pantheon usable for people with disabilities

**What to do:**
- Keyboard navigation for 3D scene (arrow keys for camera)
- Screen reader support (ARIA labels, semantic HTML)
- High-contrast mode for visualizations
- Text descriptions of spatial configurations

**Skills needed:** Web accessibility (WCAG 2.1), React

**Estimated effort:** 1-2 weeks

---

### Community Contributions

#### 7. **Alternative Visual Metaphors**

Explore different visualization approaches:
- Network graph (nodes = tokens, edges = relationships)
- Topographic map (height = stability, color = warmth)
- Anatomical metaphor (organs = layers)

**Skills needed:** Three.js, creative coding, design

---

#### 8. **Token Vocabulary Extensions**

Add domain-specific or culturally-adapted token vocabularies:
- Medical AI personality tokens
- Educational AI personality tokens
- Non-Western relational frameworks

**Skills needed:** Domain expertise, cultural consultation

---

#### 9. **Example Profiles & Case Studies**

Create validated personality profiles for:
- Major AI assistants (ChatGPT, Claude, Gemini, Alexa)
- AI archetypes (mentor, peer, expert, companion)
- Domain-specific agents (medical, legal, creative)

**Skills needed:** Conversation analysis, manual annotation

---

## Roadmap & Priorities

### Phase 1: Foundation Strengthening (Current)

**Goals:**
- ✅ Complete documentation (README, THEORY, VISUALIZATION, API, RESEARCH)
- 🔲 Improve test coverage to 70%+
- 🔲 Refactor state management (Context provider)
- 🔲 Remove dead code (~1,500 lines)

**Timeline:** 2-3 weeks

---

### Phase 2: Conversation Classifier (Next)

**Goals:**
- 🔲 Implement LLM-based extraction pipeline
- 🔲 Create conversation input UI
- 🔲 Build schema validation system
- 🔲 Test with real conversation transcripts

**Timeline:** 4-6 weeks

**Blocker:** Requires API keys (Claude/OpenAI) and budget for LLM calls

---

### Phase 3: Advanced Features

**Goals:**
- 🔲 Multi-agent visualization
- 🔲 Temporal tracking & animation
- 🔲 Profile persistence (database/storage)
- 🔲 Export/import system

**Timeline:** 6-8 weeks

---

### Phase 4: DIS 2026 Submission

**Goals:**
- 🔲 Interactive demonstration
- 🔲 Tangible controls (MIDI, sensors)
- 🔲 Witness ledger system
- 🔲 Conference paper writeup

**Timeline:** 3-4 months (deadline: January 2026)

---

## Pull Request Process

### Before Submitting

1. **Create an issue first** (unless it's a trivial fix)
   - Describe the problem/feature
   - Discuss approach with maintainers
   - Get feedback before coding

2. **Fork the repository** (if you're not a collaborator)

3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

4. **Make your changes:**
   - Follow code style conventions
   - Write tests for new functionality
   - Update documentation if needed

5. **Run checks locally:**
   ```bash
   npm run lint        # Fix linting errors
   npm run test        # Ensure tests pass
   npm run build       # Verify production build succeeds
   ```

### Commit Messages

Use conventional commits format:

```
type(scope): short description

Longer description if needed (optional)

Fixes #123 (if resolving an issue)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting (no logic changes)
- `refactor`: Code restructuring (no behavior changes)
- `test`: Adding/updating tests
- `chore`: Maintenance tasks (dependencies, build config)

**Examples:**
```
feat(classifier): add LLM-based conversation parser

Implements OpenAI GPT-4 integration for extracting personality tokens
from conversation transcripts. Includes schema validation and error handling.

Fixes #42
```

```
fix(parametric-ring): prevent NaN in kink angle calculation

Edge case when rodLength is 0 caused division by zero. Added guard clause
to default to 0 angle when rodLength is invalid.
```

### Submitting the PR

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a pull request** on GitHub

3. **Fill out the PR template:**
   - **Description:** What does this PR do?
   - **Motivation:** Why is this change needed?
   - **Testing:** How did you test this?
   - **Screenshots/Videos:** For UI changes
   - **Related issues:** Links to issues this resolves

4. **Wait for review:**
   - Maintainers will review within 3-5 days
   - Address feedback in new commits
   - Avoid force-pushing after review starts (makes it hard to track changes)

5. **Merge:**
   - Once approved, maintainers will merge
   - Delete your feature branch after merge

---

## Code of Conduct

**Be respectful:**
- Assume good intentions
- Provide constructive feedback
- Welcome newcomers

**Be collaborative:**
- Discuss before implementing major changes
- Ask for help when stuck
- Share knowledge and insights

**Be responsible:**
- Test your changes thoroughly
- Document complex logic
- Don't break existing functionality

**Reporting issues:**
- If you experience harassment or unethical behavior, contact [your email]

---

## Getting Help

**Questions about code:**
- GitHub Discussions: [Link]
- Discord: [Link] (if available)

**Bug reports:**
- GitHub Issues: [Link]
- Include: OS, browser, error messages, steps to reproduce

**Feature requests:**
- GitHub Issues with `[Feature Request]` tag
- Describe use case and proposed solution

**Research collaboration:**
- Email: [your email]

---

## License

By contributing to Pantheon, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Pantheon! Together, we're building new ways to understand and visualize human–AI relationships. 🌌
