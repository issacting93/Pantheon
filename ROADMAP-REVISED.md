# 🗺️ Development Roadmap - Audio Visualizer (REVISED)

> **Timeline Update**: Extended from 5 to 8 weeks for more realistic implementation
> **Key Changes**: Testing earlier, config before context, TypeScript strict mode added

---

## Phase 1: Foundation & Cleanup (Week 1)

### Day 1: Code Cleanup & Bundle Analysis
**Goal**: Remove dead code and understand current bundle composition

```bash
# Files to remove
rm src/hooks/useAudioManager.old.ts
rm -rf src/components/audio-visualization/
rm src/components/AudioVisualizerDemo.old.tsx
rm src/lib/three/SceneManager.ts  # Used by old demo
```

**Tasks**:
- [ ] Remove `useAudioManager.old.ts` (247 lines)
- [ ] Remove `audio-visualization/` folder (2 files, 320 lines)
- [ ] Remove `AudioVisualizerDemo.old.tsx` (182 lines)
- [ ] Remove `SceneManager.ts` (638 lines - used by old demo)
- [ ] Check if `ModelLoader.ts` is used, remove if not
- [ ] Update imports in any files that reference these
- [ ] Run bundle analyzer: `npm install --save-dev webpack-bundle-analyzer`
- [ ] Analyze bundle composition for optimization opportunities

**Expected Impact**:
- ✅ Reduced codebase by ~1,434 lines
- ✅ Bundle size reduction: ~40-50KB
- ✅ Clearer codebase structure
- ✅ Identified optimization targets

---

### Day 2-3: Error Handling & Recovery
**Goal**: Add robust error boundaries and prevent crashes

**Tasks**:
- [ ] Create `src/components/ErrorBoundary.tsx`
- [ ] Wrap Scene3D with error boundary
- [ ] Add WebGL context loss handling
- [ ] Add audio context error recovery
- [ ] Create user-friendly error recovery UI
- [ ] Add error logging utility

**New Files**:
```typescript
// src/components/ErrorBoundary.tsx
export class AudioVisualizerErrorBoundary extends React.Component {
  // Handle WebGL errors, audio context errors, etc.
  // Provide recovery actions (reload, change settings)
}

// src/utils/errorLogger.ts
export const logError = (error: Error, context: string) => {
  // Log errors for debugging
}
```

**Expected Impact**:
- ✅ App won't crash on WebGL/audio failures
- ✅ Better user experience with recovery options
- ✅ Easier debugging with proper error tracking

---

### Day 4: Configuration Management
**Goal**: Extract hardcoded values before context refactor

**Tasks**:
- [ ] Create `src/config/audio.ts`
- [ ] Create `src/config/visualization.ts`
- [ ] Create `src/config/effects.ts`
- [ ] Create `src/config/performance.ts` (FPS targets, memory limits)
- [ ] Create `src/config/index.ts` (barrel export)
- [ ] Add type safety to all config

**New Files**:
```typescript
// src/config/audio.ts
export const AUDIO_CONFIG = {
  FFT_SIZE: 2048,
  SMOOTHING: 0.8,
  FREQUENCY_BANDS: {
    bass: { min: 20, max: 250 },
    mid: { min: 250, max: 4000 },
    treble: { min: 4000, max: 20000 }
  },
  BEAT_DETECTION: {
    threshold: 1.3,
    decay: 0.98,
    minTimeBetweenBeats: 200
  }
} as const;

// src/config/visualization.ts
export const SCENE_CONFIG = {
  PARTICLE_COUNT: 1000,
  RING_DOTS_COUNT: 50,
  DEFAULT_CAMERA_POSITION: [0, 0, 10] as const,
  // ... more scene defaults
} as const;

// src/config/effects.ts
export const EFFECTS_CONFIG = {
  PARTICLE_SCALE: {
    min: 0.5,
    max: 2.0,
    default: 1.0
  },
  // ... effect defaults
} as const;

// src/config/performance.ts
export const PERFORMANCE_CONFIG = {
  TARGET_FPS: 60,
  MAX_MEMORY_MB: 150,
  ENABLE_STATS: import.meta.env.DEV
} as const;
```

**Expected Impact**:
- ✅ Centralized configuration
- ✅ Easier parameter tuning
- ✅ Context providers can reference config
- ✅ Better maintainability

---

### Day 5: TypeScript Strict Mode
**Goal**: Enable strict mode to catch type errors before refactoring

**Tasks**:
- [ ] Enable `strict: true` in `tsconfig.json`
- [ ] Enable `noUncheckedIndexedAccess: true`
- [ ] Enable `noImplicitOverride: true`
- [ ] Fix all type errors that appear
- [ ] Add missing type annotations
- [ ] Remove any `any` types

**Expected Impact**:
- ✅ Fewer runtime bugs
- ✅ Better IDE autocomplete
- ✅ Safer refactoring in Phase 3
- ✅ Explicit type contracts

---

## Phase 2: Testing Foundation (Week 2)

### Day 1-2: Test Infrastructure Setup
**Goal**: Set up testing before refactoring

**Tasks**:
- [ ] Install Jest and React Testing Library
- [ ] Install @testing-library/react-hooks
- [ ] Configure Jest for TypeScript
- [ ] Set up mock for Web Audio API
- [ ] Set up mock for MediaDevices API
- [ ] Set up mock for Three.js
- [ ] Create test utilities file

**New Files**:
```typescript
// src/test/setup.ts
// Mock AudioContext, MediaDevices, etc.

// src/test/testUtils.tsx
// Custom render with providers
```

**Expected Impact**:
- ✅ Ready to write tests
- ✅ Proper mocks for audio/WebGL APIs
- ✅ Fast test execution

---

### Day 3-5: Test Critical Business Logic
**Goal**: Test existing code before refactoring

**Priority 1: Audio System**
- [ ] Test `useAudioAnalysis` hook
  - [ ] Microphone connection
  - [ ] File upload handling
  - [ ] Frequency analysis
  - [ ] Beat detection
  - [ ] Cleanup on unmount
- [ ] Test `audioUtils.ts`
  - [ ] Capability detection
  - [ ] BeatDetector class
  - [ ] Frequency band calculations

**Priority 2: Utilities**
- [ ] Test configuration loading
- [ ] Test error logging utility

**New Files**:
```
src/hooks/__tests__/useAudioAnalysis.test.ts
src/utils/__tests__/audioUtils.test.ts
src/utils/__tests__/BeatDetector.test.ts
src/config/__tests__/config.test.ts
```

**Test Coverage Goals**:
- `useAudioAnalysis`: 70%+ (audio APIs are hard to test)
- `audioUtils`: 90%+
- `BeatDetector`: 100%
- `config`: 100%

**Expected Impact**:
- ✅ Safety net before refactoring
- ✅ Document expected behavior
- ✅ Catch regressions early
- ✅ 40-50% test coverage baseline

---

## Phase 3: Architecture Refactor (Week 3-4)

### Day 1-2: Create Context Providers
**Goal**: Build context infrastructure without breaking existing code

**Tasks**:
- [ ] Create `src/contexts/AudioVisualizerContext.tsx`
- [ ] Create audio state context (source, levels, beat)
- [ ] Create scene settings context (camera, particles, etc.)
- [ ] Create effects settings context
- [ ] Create custom hooks for each context
- [ ] Add context to App.tsx (wrap existing components)

**New Files**:
```typescript
// src/contexts/AudioVisualizerContext.tsx
export const AudioVisualizerProvider = ({ children }) => {
  // Provides audio state, scene settings, effects settings
  return (
    <AudioStateContext.Provider value={audioState}>
      <SceneSettingsContext.Provider value={sceneSettings}>
        <EffectsSettingsContext.Provider value={effectsSettings}>
          {children}
        </EffectsSettingsContext.Provider>
      </SceneSettingsContext.Provider>
    </AudioStateContext.Provider>
  );
};

// src/contexts/hooks/useAudioState.ts
export const useAudioState = () => {
  const context = useContext(AudioStateContext);
  if (!context) throw new Error('useAudioState must be used within AudioVisualizerProvider');
  return context;
};

// src/contexts/hooks/useSceneSettings.ts
// src/contexts/hooks/useEffectsSettings.ts
```

**Expected Impact**:
- ✅ Context infrastructure ready
- ✅ Existing components still work (gradual migration)

---

### Day 3-7: Incremental Component Migration
**Goal**: Migrate components one by one, testing after each

**Migration Order** (from leaf to root):
1. Day 3: StatusIndicator (209 lines)
2. Day 4: AudioSourceSelector (135 lines)
3. Day 5: EffectsControlPanel (287 lines)
4. Day 6: ControlPanel (512 lines)
5. Day 7: Scene3D and effect components

**Process for Each Component**:
```typescript
// BEFORE (with props)
const ControlPanel = ({
  sourceState,
  capabilities,
  onSelectMicrophone,
  // ... 21 more props
}) => { ... }

// AFTER (with context)
const ControlPanel = () => {
  const { sourceState, capabilities } = useAudioState();
  const { sceneSettings, updateSceneSettings } = useSceneSettings();
  const { effectsSettings, updateEffectsSettings } = useEffectsSettings();
  // ... use context values
}
```

**Tasks for Each Component**:
- [ ] Replace props with context hooks
- [ ] Update component implementation
- [ ] Remove props from parent component
- [ ] Run tests to verify no breakage
- [ ] Manual test in browser

**Expected Impact**:
- ✅ Props reduced from 24 to 0 in ControlPanel
- ✅ 80% reduction in prop drilling
- ✅ Easier to add new features
- ✅ Tests still passing

---

### Day 8-10: Cleanup & Documentation
**Goal**: Remove old prop interfaces and document new architecture

**Tasks**:
- [ ] Remove unused prop interfaces
- [ ] Update AudioVisualizerDemo to use context
- [ ] Add JSDoc comments to all context providers
- [ ] Create architecture diagram (optional)
- [ ] Update README with new architecture
- [ ] Run full test suite
- [ ] Manual regression testing

**Expected Impact**:
- ✅ Clean, modern architecture
- ✅ Self-documenting code
- ✅ All tests passing
- ✅ No regressions

---

## Phase 4: Polish & Accessibility (Week 5)

### Day 1-3: Accessibility Implementation
**Goal**: Make the app accessible to all users

**Tasks**:
- [ ] Add ARIA labels to all buttons and controls
- [ ] Implement keyboard navigation for all controls
- [ ] Add visible focus indicators
- [ ] Add screen reader announcements for state changes
- [ ] Test with keyboard-only navigation
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Add skip-to-content link
- [ ] Ensure color contrast meets WCAG AA

**Files to Modify**:
- All component files in `src/components/`
- Add `src/utils/accessibility.ts` (screen reader utilities)

**Keyboard Shortcuts to Add**:
- `Space` - Play/Pause
- `M` - Toggle microphone
- `1/2/3` - Camera presets
- `D` - Toggle debug panel
- `?` - Show keyboard shortcuts help

**Expected Impact**:
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Better for all users

---

### Day 4-5: Loading States & UX Improvements
**Goal**: Better user feedback during async operations

**Tasks**:
- [ ] Add loading spinners to AudioSourceSelector
- [ ] Add connection progress indicator
- [ ] Add audio device selection dropdown
- [ ] Improve error messages with actionable solutions
- [ ] Add tooltips to complex controls
- [ ] Add smooth transitions between states

**New Components**:
```typescript
// src/components/LoadingSpinner.tsx
export const LoadingSpinner = ({ message }: { message?: string }) => {
  // Accessible loading spinner
}

// src/components/ConnectionProgress.tsx
export const ConnectionProgress = ({ status, progress }: Props) => {
  // Shows connection progress (0-100%)
}

// src/components/AudioDeviceSelector.tsx
export const AudioDeviceSelector = () => {
  // Lists available audio input devices
}
```

**Expected Impact**:
- ✅ Professional user experience
- ✅ Clear feedback during operations
- ✅ Reduced user confusion
- ✅ Better perceived performance

---

## Phase 5: Testing & Quality (Week 6-7)

### Day 1-3: Integration Tests
**Goal**: Test component interactions and data flow

**Tasks**:
- [ ] Test audio source switching flow
- [ ] Test error handling flows (WebGL loss, audio failure)
- [ ] Test cleanup on unmount
- [ ] Test context providers
- [ ] Test effect parameter changes propagate to Three.js
- [ ] Test beat detection triggers visual effects

**New Test Files**:
```
src/components/__tests__/AudioVisualizerDemo.integration.test.tsx
src/contexts/__tests__/AudioVisualizerContext.integration.test.tsx
src/components/__tests__/ControlPanel.integration.test.tsx
```

**Expected Impact**:
- ✅ Catch integration bugs
- ✅ Ensure components work together
- ✅ 60-70% test coverage

---

### Day 4-7: Component Tests & E2E Tests
**Goal**: Increase test coverage and add end-to-end tests

**Tasks**:
- [ ] Test all major components
  - [ ] ControlPanel
  - [ ] AudioSourceSelector
  - [ ] StatusIndicator
  - [ ] DebugPanel
  - [ ] EffectsControlPanel
- [ ] Set up Playwright for E2E tests
- [ ] Write E2E tests for critical flows
  - [ ] Load app → select microphone → see visualization
  - [ ] Load app → upload file → see visualization
  - [ ] Change camera preset → verify camera moves
  - [ ] Toggle effects → verify visual changes
- [ ] Aim for 80%+ test coverage

**New Test Files**:
```
e2e/audio-visualizer.spec.ts
e2e/effects.spec.ts
e2e/accessibility.spec.ts
```

**Expected Impact**:
- ✅ 80%+ test coverage
- ✅ Confidence in deployments
- ✅ Automated regression testing
- ✅ Better code quality

---

## Phase 6: Performance & Optimization (Week 8)

### Day 1-2: Bundle Optimization
**Goal**: Reduce initial load time

**Tasks**:
- [ ] Review bundle analyzer results from Week 1
- [ ] Split Three.js into separate chunk
- [ ] Lazy load shaders (import dynamically)
- [ ] Lazy load debug components (import.meta.env.DEV)
- [ ] Optimize images/assets (if any)
- [ ] Enable gzip/brotli compression
- [ ] Test bundle size improvement

**Expected Impact**:
- ✅ 40-60% reduction in initial bundle
- ✅ Faster load time
- ✅ Better caching strategy
- ✅ Improved Time to Interactive

---

### Day 3: Performance Monitoring
**Goal**: Track runtime performance

**Tasks**:
- [ ] Add FPS counter (dev mode only)
- [ ] Add memory usage tracking
- [ ] Add performance metrics dashboard
- [ ] Set performance budgets (60 FPS, <150MB memory)
- [ ] Add warnings when budgets exceeded
- [ ] Test with long-running sessions (30+ minutes)

**New Components**:
```typescript
// src/components/PerformanceMonitor.tsx
export const PerformanceMonitor = () => {
  // Shows FPS, memory, frame time
  // Only renders in dev mode
}
```

**Expected Impact**:
- ✅ Identify performance bottlenecks
- ✅ Monitor production performance
- ✅ Prevent performance regressions

---

### Day 4-5: Memory Management & Final Optimization
**Goal**: Ensure no memory leaks and optimize hot paths

**Tasks**:
- [ ] Audit all useRef usage for proper cleanup
- [ ] Audit all useEffect for proper cleanup
- [ ] Test long-running sessions (1 hour+)
- [ ] Profile memory usage with Chrome DevTools
- [ ] Fix any memory leaks found
- [ ] Optimize hot code paths (RAF loop, audio analysis)
- [ ] Add memoization where beneficial
- [ ] Final performance testing

**Expected Impact**:
- ✅ No memory leaks
- ✅ Stable long-running sessions
- ✅ Consistent 60 FPS
- ✅ Production-ready performance

---

## Phase 7: Advanced Features (Week 9+)

**Note**: Only start this phase after achieving:
- ✅ 80%+ test coverage
- ✅ No critical bugs
- ✅ Performance targets met
- ✅ Stable architecture

### Feature 1: Preset Management
**Goal**: Save and load visual configurations

**Tasks**:
- [ ] Create preset data structure
- [ ] Add localStorage persistence
- [ ] Add save/load preset UI
- [ ] Add preset import/export (JSON)
- [ ] Add URL-based preset sharing
- [ ] Add preset library with defaults

**New Files**:
```typescript
// src/stores/presets.ts
export const savePreset = (name: string, settings: Settings) => { ... }
export const loadPreset = (id: string) => { ... }

// src/components/PresetManager.tsx
export const PresetManager = () => { ... }
```

**Estimated Time**: 1 week

---

### Feature 2: Recording Capability
**Goal**: Record and export visualizations

**Tasks**:
- [ ] Add MediaRecorder API integration
- [ ] Add canvas capture at 60fps
- [ ] Add video export (WebM format)
- [ ] Add recording UI (start/stop/download)
- [ ] Add recording settings (resolution, quality)
- [ ] Add audio+video sync

**New Files**:
```typescript
// src/hooks/useRecording.ts
export const useRecording = () => {
  // Handles canvas recording
}

// src/components/RecordingControls.tsx
export const RecordingControls = () => { ... }
```

**Estimated Time**: 1-2 weeks

---

### Feature 3: Advanced Audio Features
**Goal**: Enhanced audio processing and effects

**Tasks**:
- [ ] Add equalizer with adjustable bands
- [ ] Add audio effects (reverb, delay, distortion)
- [ ] Add multi-source audio mixing
- [ ] Add audio presets (bass boost, etc.)
- [ ] Add spectrum analyzer display

**Estimated Time**: 2-3 weeks

---

## 📊 Progress Tracking

### Week 1 Checklist ✅
- [ ] Dead code removed (~1,434 lines)
- [ ] Bundle analyzed
- [ ] Error boundaries added
- [ ] Configuration files created
- [ ] TypeScript strict mode enabled

### Week 2 Checklist ✅
- [ ] Test infrastructure set up
- [ ] Audio system tests written
- [ ] Utilities tests written
- [ ] 40-50% test coverage achieved

### Week 3-4 Checklist ✅
- [ ] Context providers created
- [ ] All components migrated to context
- [ ] Props reduced from 24 to 0
- [ ] All tests still passing
- [ ] No regressions

### Week 5 Checklist ✅
- [ ] WCAG AA accessibility achieved
- [ ] Keyboard navigation implemented
- [ ] Loading states added
- [ ] UX polish complete

### Week 6-7 Checklist ✅
- [ ] Integration tests written
- [ ] E2E tests written
- [ ] 80%+ test coverage achieved
- [ ] All tests passing

### Week 8 Checklist ✅
- [ ] Bundle optimized (40-60% reduction)
- [ ] Performance monitoring added
- [ ] Memory leaks fixed
- [ ] 60 FPS achieved

---

## 🎯 Success Metrics

### Before (Current State)
- Bundle size: ~1MB
- Props in ControlPanel: 24
- Test coverage: 0%
- Accessibility: 3/10
- Performance: 7/10 (60 FPS but memory leaks)
- TypeScript strict mode: ❌

### After (Target)
- Bundle size: **<600KB** (40% reduction)
- Props in ControlPanel: **0** (100% reduction via context)
- Test coverage: **>80%**
- Accessibility: **9/10** (WCAG AA compliant)
- Performance: **9/10** (60 FPS, no memory leaks)
- TypeScript strict mode: ✅

---

## 🎖️ Key Improvements Over Original Roadmap

1. **Realistic Timeline**: 8 weeks vs. 5 weeks
2. **Testing Earlier**: Week 2 instead of Week 4
3. **Config Before Context**: Easier context implementation
4. **TypeScript Strict Mode**: Catch bugs before refactoring
5. **Incremental Migration**: Lower risk during context refactor
6. **Performance Budgets**: Clear targets (60 FPS, <150MB)
7. **E2E Testing**: Automated regression testing
8. **Phase 7 Gating**: Only start features after quality is high

---

## 🚀 Getting Started

### Phase Priority
1. **Phase 1** - CRITICAL (foundation)
2. **Phase 2** - CRITICAL (safety net)
3. **Phase 3** - CRITICAL (architecture)
4. **Phase 4** - HIGH (polish)
5. **Phase 5** - HIGH (quality)
6. **Phase 6** - MEDIUM (performance)
7. **Phase 7** - LOW (features)

### First Steps
```bash
# 1. Create feature branch
git checkout -b refactor/phase-1-foundation

# 2. Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# 3. Start with cleanup
rm src/hooks/useAudioManager.old.ts
rm -rf src/components/audio-visualization/
rm src/components/AudioVisualizerDemo.old.tsx
rm src/lib/three/SceneManager.ts

# 4. Verify app still works
npm run dev
```

---

## 🛠️ Tools Needed

### Development (Week 1)
- [x] webpack-bundle-analyzer
- [ ] ESLint strict config

### Testing (Week 2)
- [ ] Jest
- [ ] React Testing Library
- [ ] @testing-library/react-hooks
- [ ] @testing-library/user-event

### E2E Testing (Week 6)
- [ ] Playwright

### Performance (Week 8)
- [ ] Lighthouse CI
- [ ] Chrome DevTools Performance profiling

### Monitoring (Week 8+)
- [ ] Sentry (error tracking) - optional
- [ ] Web Vitals - optional

---

## ⚠️ Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking changes during refactor | High | Write tests first (Phase 2) |
| Timeline slip | Medium | Weekly checkpoints, adjust scope |
| Performance regression | High | Add monitoring early, set budgets |
| Context migration bugs | High | Incremental migration, test each step |
| Audio/WebGL testing complexity | Medium | Use mocks, focus on critical paths |

---

## 📝 Notes

### Why This Timeline is Better

**Original**: 5 weeks, testing after refactor (risky)
**Revised**: 8 weeks, testing before refactor (safe)

The extra 3 weeks provide:
- Safety net with tests before refactoring
- Time to properly migrate to context incrementally
- Proper E2E testing coverage
- Buffer for unexpected issues

### Weekly Time Commitment

Assuming **20 hours/week**:
- Week 1: 20 hours (cleanup, config)
- Week 2: 20 hours (tests)
- Week 3-4: 40 hours (context refactor)
- Week 5: 20 hours (accessibility)
- Week 6-7: 40 hours (testing)
- Week 8: 20 hours (performance)

**Total**: 180 hours over 8 weeks

### When to Skip Phases

If timeline pressure:
- Phase 5 (UX) can be reduced (keep accessibility)
- Phase 6 can be postponed
- Phase 7 is entirely optional

**Minimum viable refactor**: Phases 1-3 + basic Phase 5 = 5 weeks

---

## 🎉 Celebration Milestones

- ✅ **Week 1 complete**: Clean, typed, error-safe codebase
- ✅ **Week 2 complete**: Safety net established
- ✅ **Week 4 complete**: Modern architecture, no prop drilling
- ✅ **Week 5 complete**: Accessible, polished UX
- ✅ **Week 7 complete**: Production-ready quality
- ✅ **Week 8 complete**: Optimized performance
- ✅ **All phases complete**: World-class audio visualizer

---

Ready to start Phase 1? Let's begin with code cleanup and bundle analysis!
