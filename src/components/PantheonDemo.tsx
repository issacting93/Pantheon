import { useCallback, useMemo, useState } from 'react';
import { Scene3D, type SceneSettings, type SceneElementsVisibility } from './r3f/Scene3D';
import { ControlPanel } from './ControlPanel';
import type { EffectSettings } from './effects/EffectsManager';
import { defaultEffectSettings } from './effects/EffectsManager';
import type { ParametricRingSettings } from './r3f/ParametricRing';
import './PantheonDemo.css';
import {
  CharacterLayerTokens,
  CognitiveLayerTokens,
  ExpressionLayerTokens,
  TraitLayerTokens
} from '../types/personality';

const scenePresets: SceneSettings[] = [
  { maxLineDistance: 55, particleCount: 10, particleRadius: 37, cameraDistance: 200, label: 'Acquaintance' },
  { maxLineDistance: 75, particleCount: 40, particleRadius: 42, cameraDistance: 170, label: 'Familiar' },
  { maxLineDistance: 95, particleCount: 80, particleRadius: 48, cameraDistance: 140, label: 'Intimate' }
];

const defaultVisibility: SceneElementsVisibility = {
  centralSphere: true,
  ringOfDots: true,
  traitIndicators: true,
  particles: true,
  connectionLines: true,
  parametricRing: true
};

const defaultParametricRingSettings: ParametricRingSettings = {
  segments: 6,
  pivotAngle: 29,
  rodLength: 9.5,
  kinkAngle: 79,
  innerRadius: 8.5,
  rotation: [-Math.PI / 2, 0, 0]
};

const defaultCharacterTokens: CharacterLayerTokens = {
  valuePriorities: ['autonomy>harmony', 'precision>speed'],
  identityMarkers: ['educator', 'systems_thinker', 'privacy_advocate'],
  purposeThemes: ['knowledge_sharing', 'innovation', 'authenticity'],
  coherenceSignature: 'double_chain_linkage'
};

const defaultCognitiveTokens: CognitiveLayerTokens = {
  thinkingStyle: ['systematic', 'first_principles', 'metaphorical'],
  communicationTone: ['professional_casual', 'encouraging', 'precise'],
  interactionPreference: ['socratic_dialogue', 'collaborative_exploration'],
  regulationProfile: 'measured_expression'
};

const defaultExpressionTokens: ExpressionLayerTokens = {
  languageMarkers: ['technical_precision', 'minimal_jargon', 'oxford_comma'],
  expertiseDomains: ['distributed_systems', 'philosophy', 'education'],
  interactionStyle: ['thorough_explanations', 'numbered_lists', 'examples'],
  rhythmSignature: 'measured_cadence'
};

const defaultTraitTokens: TraitLayerTokens = {
  traitMarkers: ['high_openness', 'moderate_conscientiousness', 'low_verbosity'],
  curiosityBias: 'exploratory_synthesis',
  structureBias: 'precise_but_flexible'
};

const cloneEffectSettings = (): EffectSettings => ({
  particleScale: { ...defaultEffectSettings.particleScale },
  particleRotation: { ...defaultEffectSettings.particleRotation },
  particleMovement: { ...defaultEffectSettings.particleMovement },
  cameraShake: { ...defaultEffectSettings.cameraShake },
  particleConnections: { ...defaultEffectSettings.particleConnections }
});

const PantheonDemo = () => {
  const [cameraState, setCameraStateValue] = useState(0);
  const [currentSettings, setCurrentSettings] = useState<SceneSettings>(scenePresets[0]);
  const [sceneVisibility, setSceneVisibility] = useState<SceneElementsVisibility>({
    ...defaultVisibility
  });
  const [effectSettings, setEffectSettings] = useState<EffectSettings>(() => cloneEffectSettings());
  const [parametricRingSettings, setParametricRingSettings] = useState<ParametricRingSettings>(() => ({
    ...defaultParametricRingSettings
  }));
  const [characterLayerTokens, setCharacterLayerTokens] = useState<CharacterLayerTokens>({
    ...defaultCharacterTokens
  });
  const [cognitiveLayerTokens, setCognitiveLayerTokens] = useState<CognitiveLayerTokens>({
    ...defaultCognitiveTokens
  });
  const [expressionLayerTokens, setExpressionLayerTokens] = useState<ExpressionLayerTokens>({
    ...defaultExpressionTokens
  });
  const [traitLayerTokens, setTraitLayerTokens] = useState<TraitLayerTokens>({
    ...defaultTraitTokens
  });

  const setCameraState = useCallback((state: number) => {
    const preset = scenePresets[state] ?? scenePresets[0];
    setCameraStateValue(state);
    setCurrentSettings(preset);
  }, []);

  const resetToDefaults = useCallback(() => {
    setEffectSettings(cloneEffectSettings());
    setSceneVisibility({ ...defaultVisibility });
    setParametricRingSettings({ ...defaultParametricRingSettings });
    setCharacterLayerTokens({ ...defaultCharacterTokens });
    setCognitiveLayerTokens({ ...defaultCognitiveTokens });
    setExpressionLayerTokens({ ...defaultExpressionTokens });
    setTraitLayerTokens({ ...defaultTraitTokens });
    setCameraState(0);
  }, [setCameraState]);

  const panelProps = useMemo(() => ({
    currentSettings,
    setCurrentSettings,
    sceneVisibility,
    setSceneVisibility,
    effectSettings,
    setEffectSettings,
    cameraState,
    setCameraState,
    resetToDefaults,
    parametricRingSettings,
    setParametricRingSettings,
    characterLayerTokens,
    setCharacterLayerTokens,
    cognitiveLayerTokens,
    setCognitiveLayerTokens,
    expressionLayerTokens,
    setExpressionLayerTokens,
    traitLayerTokens,
    setTraitLayerTokens
  }), [
    currentSettings,
    sceneVisibility,
    effectSettings,
    cameraState,
    setCameraState,
    resetToDefaults,
    setCurrentSettings,
    setSceneVisibility,
    setEffectSettings,
    parametricRingSettings,
    setParametricRingSettings,
    characterLayerTokens,
    setCharacterLayerTokens,
    cognitiveLayerTokens,
    setCognitiveLayerTokens,
    expressionLayerTokens,
    setExpressionLayerTokens,
    traitLayerTokens,
    setTraitLayerTokens
  ]);

  return (
    <div className="visualizer-container">
      <Scene3D
        settings={currentSettings}
        sceneVisibility={sceneVisibility}
        effectSettings={effectSettings}
        parametricRingSettings={parametricRingSettings}
      />

      <div className="title-overlay">
        <h1>Pantheon // Modular Systemic AI</h1>
        <div className="layer-legend">
          <div className="layer-line layer-traits">
            <strong>Layer 2 · Trait Indicators</strong>
            <span>
              Markers: {traitLayerTokens.traitMarkers.join(' · ')}
            </span>
            <p className="layer-description">
              Represented by the rotating ring of large nodes—their spacing and pulse encapsulate baseline personality traits.
            </p>
          </div>
          <div className="layer-line layer-character">
            <strong>Layer 4 · Character Ring</strong>
            <span>
              Values: {characterLayerTokens.valuePriorities.join(' · ')} | Identity: {characterLayerTokens.identityMarkers.join(' · ')}
            </span>
            <p className="layer-description">
              Visualized as the parametric double-chain ring—each harmonic represents a value axis, with tension and tilt reflecting identity coherence.
            </p>
          </div>
          <div className="layer-line layer-cognitive">
            <strong>Layer 5 · Cognitive Pulse</strong>
            <span>
              Thinking: {cognitiveLayerTokens.thinkingStyle.join(' · ')} | Tone: {cognitiveLayerTokens.communicationTone.join(' · ')}
            </span>
            <p className="layer-description">
              Manifested by the central luminous sphere whose breathing and rotation communicate reasoning tempo and emotional regulation.
            </p>
          </div>
          <div className="layer-line layer-expression">
            <strong>Layer 6 · Expression Lattice</strong>
            <span>
              Language: {expressionLayerTokens.languageMarkers.join(' · ')} | Rhythm: {expressionLayerTokens.rhythmSignature}
            </span>
            <p className="layer-description">
              Rendered via the particle cloud and linking lattice—the density and reach of connections mirror communicative richness.
            </p>
          </div>
        </div>
      </div>

      <ControlPanel {...panelProps} />
    </div>
  );
};

export default PantheonDemo;
