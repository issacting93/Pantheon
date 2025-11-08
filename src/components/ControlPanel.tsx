import { useState, Dispatch, SetStateAction } from 'react';
import { ChevronDown, ChevronRight, RotateCcw, Settings } from 'lucide-react';
import type { SceneSettings, SceneElementsVisibility } from './r3f/Scene3D';
import type { EffectSettings } from './effects/EffectsManager';
import type { ParametricRingSettings } from './r3f/ParametricRing';
import './ControlPanel.css';
import type {
  CharacterLayerTokens,
  CognitiveLayerTokens,
  ExpressionLayerTokens,
  TraitLayerTokens
} from '../types/personality';

interface ControlPanelProps {
  currentSettings: SceneSettings;
  setCurrentSettings: (settings: SceneSettings) => void;
  sceneVisibility: SceneElementsVisibility;
  setSceneVisibility: (visibility: SceneElementsVisibility) => void;
  effectSettings: EffectSettings;
  setEffectSettings: (settings: EffectSettings) => void;
  cameraState: number;
  setCameraState: (state: number) => void;
  resetToDefaults: () => void;
  parametricRingSettings: ParametricRingSettings;
  setParametricRingSettings: (settings: ParametricRingSettings) => void;
  characterLayerTokens: CharacterLayerTokens;
  setCharacterLayerTokens: Dispatch<SetStateAction<CharacterLayerTokens>>;
  cognitiveLayerTokens: CognitiveLayerTokens;
  setCognitiveLayerTokens: Dispatch<SetStateAction<CognitiveLayerTokens>>;
  expressionLayerTokens: ExpressionLayerTokens;
  setExpressionLayerTokens: Dispatch<SetStateAction<ExpressionLayerTokens>>;
  traitLayerTokens: TraitLayerTokens;
  setTraitLayerTokens: Dispatch<SetStateAction<TraitLayerTokens>>;
}

export function ControlPanel({
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
}: ControlPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    observer: true,
    layer6: true,
    layer5: true,
    layer4: true,
    layer2: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  function updateParametricSetting<K extends keyof ParametricRingSettings>(
    key: K,
    value: ParametricRingSettings[K]
  ) {
    setParametricRingSettings({
      ...parametricRingSettings,
      [key]: value
    });
  }

  const updateEffectSetting = (category: keyof EffectSettings, key: string, value: any) => {
    setEffectSettings({
      ...effectSettings,
      [category]: {
        ...effectSettings[category],
        [key]: value
      }
    });
  };

  return (
    <div className="control-panel">
      <div className="panel-header">
        <Settings className="panel-icon" />
        <h2>Pantheon Console</h2>
        <button onClick={resetToDefaults} className="reset-btn" title="Reset All">
          <RotateCcw size={16} />
        </button>
      </div>

      <Section
        title="Memory / Personality Profiles"
        expanded={expandedSections.observer}
        onToggle={() => toggleSection('observer')}
      >
        <div className="control-subsection">
          <label className="control-label">Relational Depth</label>
          <div className="button-row">
            <button
              className={`preset-btn ${cameraState === 0 ? 'active' : ''}`}
              onClick={() => setCameraState(0)}
            >
              Acquaintance
            </button>
            <button
              className={`preset-btn ${cameraState === 1 ? 'active' : ''}`}
              onClick={() => setCameraState(1)}
            >
              Familiar
            </button>
            <button
              className={`preset-btn ${cameraState === 2 ? 'active' : ''}`}
              onClick={() => setCameraState(2)}
            >
              Intimate
            </button>
          </div>
        </div>
      </Section>

      <Section
        title="Layer 6 · Expression & Social Identity"
        expanded={expandedSections.layer6}
        onToggle={() => toggleSection('layer6')}
      >
        <div className="control-subsection">
          <TokenListEditor
            label="Language Markers"
            tokens={expressionLayerTokens.languageMarkers}
            onChange={(tokens) => setExpressionLayerTokens(prev => ({ ...prev, languageMarkers: tokens }))}
            placeholder="technical_precision, minimal_jargon, ..."
          />
          <TokenListEditor
            label="Expertise Domains"
            tokens={expressionLayerTokens.expertiseDomains}
            onChange={(tokens) => setExpressionLayerTokens(prev => ({ ...prev, expertiseDomains: tokens }))}
            placeholder="distributed_systems, philosophy, ..."
          />
          <TokenListEditor
            label="Interaction Style"
            tokens={expressionLayerTokens.interactionStyle}
            onChange={(tokens) => setExpressionLayerTokens(prev => ({ ...prev, interactionStyle: tokens }))}
            placeholder="thorough_explanations, numbered_lists, ..."
          />
          <TextField
            label="Rhythm Signature"
            value={expressionLayerTokens.rhythmSignature}
            onChange={(value) => setExpressionLayerTokens(prev => ({ ...prev, rhythmSignature: value }))}
            placeholder="measured_cadence"
          />
        </div>

        <div className="control-subsection">
          <Slider
            label="Node Count"
            value={currentSettings.particleCount}
            min={10}
            max={500}
            step={10}
            onChange={(value) => setCurrentSettings({ ...currentSettings, particleCount: value })}
          />
          <Slider
            label="Node Radius"
            value={currentSettings.particleRadius}
            min={10}
            max={60}
            step={1}
            onChange={(value) => setCurrentSettings({ ...currentSettings, particleRadius: value })}
          />
          <Slider
            label="Link Distance"
            value={currentSettings.maxLineDistance}
            min={10}
            max={100}
            step={5}
            onChange={(value) => setCurrentSettings({ ...currentSettings, maxLineDistance: value })}
          />
        </div>

        <div className="control-subsection">
          <Toggle
            label="Signal Particles"
            checked={sceneVisibility.particles}
            onChange={(checked) => setSceneVisibility({ ...sceneVisibility, particles: checked })}
          />
          <Toggle
            label="Layer 6 · Expression Lattice"
            checked={sceneVisibility.connectionLines}
            onChange={(checked) => setSceneVisibility({ ...sceneVisibility, connectionLines: checked })}
          />
        </div>
      </Section>

      <Section
        title="Layer 5 · Cognitive-Emotional Patterns"
        expanded={expandedSections.layer5}
        onToggle={() => toggleSection('layer5')}
      >
        <div className="control-subsection">
          <TokenListEditor
            label="Thinking Style"
            tokens={cognitiveLayerTokens.thinkingStyle}
            onChange={(tokens) => setCognitiveLayerTokens(prev => ({ ...prev, thinkingStyle: tokens }))}
            placeholder="systematic, first_principles, ..."
          />
          <TokenListEditor
            label="Communication Tone"
            tokens={cognitiveLayerTokens.communicationTone}
            onChange={(tokens) => setCognitiveLayerTokens(prev => ({ ...prev, communicationTone: tokens }))}
            placeholder="professional_casual, precise, ..."
          />
          <TokenListEditor
            label="Interaction Preference"
            tokens={cognitiveLayerTokens.interactionPreference}
            onChange={(tokens) => setCognitiveLayerTokens(prev => ({ ...prev, interactionPreference: tokens }))}
            placeholder="socratic_dialogue, collaborative_exploration, ..."
          />
          <TextField
            label="Regulation Profile"
            value={cognitiveLayerTokens.regulationProfile}
            onChange={(value) => setCognitiveLayerTokens(prev => ({ ...prev, regulationProfile: value }))}
            placeholder="measured_expression"
          />
        </div>

        <div className="control-subsection">
          <Toggle
            label="Layer 5 · Cognitive Pulse (Ring of Dots)"
            checked={sceneVisibility.ringOfDots}
            onChange={(checked) => setSceneVisibility({ ...sceneVisibility, ringOfDots: checked })}
          />
        </div>

        <EffectControl
          title="Core Pulse"
          description="Breathing amplitude of the personality nexus"
          enabled={effectSettings.particleScale.enabled}
          onToggle={(enabled) => updateEffectSetting('particleScale', 'enabled', enabled)}
        >
          <Slider
            label="Intensity"
            value={effectSettings.particleScale.intensity}
            min={0}
            max={1}
            step={0.1}
            onChange={(value) => updateEffectSetting('particleScale', 'intensity', value)}
          />
          <Slider
            label="Smoothing"
            value={effectSettings.particleScale.smoothing}
            min={0.01}
            max={0.5}
            step={0.01}
            onChange={(value) => updateEffectSetting('particleScale', 'smoothing', value)}
          />
        </EffectControl>

        <EffectControl
          title="Orbit Drift"
          description="Multi-axis rotation defining narrative cadence"
          enabled={effectSettings.particleRotation.enabled}
          onToggle={(enabled) => updateEffectSetting('particleRotation', 'enabled', enabled)}
        >
          <Slider
            label="Y-Axis"
            value={effectSettings.particleRotation.yAxisIntensity}
            min={0}
            max={0.05}
            step={0.001}
            onChange={(value) => updateEffectSetting('particleRotation', 'yAxisIntensity', value)}
          />
          <Slider
            label="Z-Axis"
            value={effectSettings.particleRotation.zAxisIntensity}
            min={0}
            max={0.02}
            step={0.001}
            onChange={(value) => updateEffectSetting('particleRotation', 'zAxisIntensity', value)}
          />
          <Slider
            label="X-Axis"
            value={effectSettings.particleRotation.xAxisIntensity}
            min={0}
            max={0.02}
            step={0.001}
            onChange={(value) => updateEffectSetting('particleRotation', 'xAxisIntensity', value)}
          />
        </EffectControl>

        <EffectControl
          title="Memory Flux"
          description="Micro-oscillations to simulate recollection ripples"
          enabled={effectSettings.particleMovement.enabled}
          onToggle={(enabled) => updateEffectSetting('particleMovement', 'enabled', enabled)}
        >
          <Slider
            label="Intensity"
            value={effectSettings.particleMovement.intensity}
            min={0}
            max={0.5}
            step={0.01}
            onChange={(value) => updateEffectSetting('particleMovement', 'intensity', value)}
          />
          <Slider
            label="Frequency"
            value={effectSettings.particleMovement.frequency}
            min={0.1}
            max={3}
            step={0.1}
            onChange={(value) => updateEffectSetting('particleMovement', 'frequency', value)}
          />
        </EffectControl>

        <EffectControl
          title="Observer Drift"
          description="Camera sway reflecting attention shifts"
          enabled={effectSettings.cameraShake.enabled}
          onToggle={(enabled) => updateEffectSetting('cameraShake', 'enabled', enabled)}
        >
          <Slider
            label="Intensity"
            value={effectSettings.cameraShake.intensity}
            min={0}
            max={2}
            step={0.1}
            onChange={(value) => updateEffectSetting('cameraShake', 'intensity', value)}
          />
          <Slider
            label="Threshold"
            value={effectSettings.cameraShake.threshold}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectSetting('cameraShake', 'threshold', value)}
          />
          <Slider
            label="Smoothing"
            value={effectSettings.cameraShake.smoothing}
            min={0.01}
            max={0.5}
            step={0.01}
            onChange={(value) => updateEffectSetting('cameraShake', 'smoothing', value)}
          />
        </EffectControl>

        <EffectControl
          title="Event Lattice"
          description="Interlinking threads for cross-memory events"
          enabled={effectSettings.particleConnections.enabled}
          onToggle={(enabled) => updateEffectSetting('particleConnections', 'enabled', enabled)}
        >
          <Slider
            label="Max Distance"
            value={effectSettings.particleConnections.maxDistance}
            min={1}
            max={5}
            step={0.1}
            onChange={(value) => updateEffectSetting('particleConnections', 'maxDistance', value)}
          />
          <Slider
            label="Max Connections"
            value={effectSettings.particleConnections.maxConnections}
            min={10}
            max={500}
            step={10}
            onChange={(value) => updateEffectSetting('particleConnections', 'maxConnections', value)}
          />
          <Slider
            label="Opacity"
            value={effectSettings.particleConnections.opacity}
            min={0.1}
            max={1}
            step={0.1}
            onChange={(value) => updateEffectSetting('particleConnections', 'opacity', value)}
          />
        </EffectControl>
      </Section>

      <Section
        title="Layer 4 · Character & Self-Concept"
        expanded={expandedSections.layer4}
        onToggle={() => toggleSection('layer4')}
      >
        <div className="control-subsection">
          <TokenListEditor
            label="Value Priorities"
            tokens={characterLayerTokens.valuePriorities}
            onChange={(tokens) => setCharacterLayerTokens(prev => ({ ...prev, valuePriorities: tokens }))}
            placeholder="autonomy>harmony, precision>speed, ..."
          />
          <TokenListEditor
            label="Identity Markers"
            tokens={characterLayerTokens.identityMarkers}
            onChange={(tokens) => setCharacterLayerTokens(prev => ({ ...prev, identityMarkers: tokens }))}
            placeholder="educator, systems_thinker, ..."
          />
          <TokenListEditor
            label="Purpose Themes"
            tokens={characterLayerTokens.purposeThemes}
            onChange={(tokens) => setCharacterLayerTokens(prev => ({ ...prev, purposeThemes: tokens }))}
            placeholder="knowledge_sharing, innovation, ..."
          />
          <TextField
            label="Coherence Signature"
            value={characterLayerTokens.coherenceSignature}
            onChange={(value) => setCharacterLayerTokens(prev => ({ ...prev, coherenceSignature: value }))}
            placeholder="double_chain_linkage"
          />
        </div>

        <div className="control-subsection">
          <Toggle
            label="Layer 4 · Character Ring"
            checked={sceneVisibility.parametricRing}
            onChange={(checked) => setSceneVisibility({ ...sceneVisibility, parametricRing: checked })}
          />
        </div>

        <div className="control-subsection">
          <Slider
            label="Identity Harmonics (Segments)"
            value={parametricRingSettings.segments}
            min={3}
            max={32}
            step={1}
            onChange={(value) => updateParametricSetting('segments', value)}
          />
          <Slider
            label="Self-Alignment θ"
            value={parametricRingSettings.pivotAngle}
            min={10}
            max={170}
            step={1}
            onChange={(value) => updateParametricSetting('pivotAngle', value)}
          />
          <Slider
            label="Value Arc Length"
            value={parametricRingSettings.rodLength}
            min={2}
            max={20}
            step={0.5}
            onChange={(value) => updateParametricSetting('rodLength', value)}
          />
          <Slider
            label="Purpose Kink γ"
            value={parametricRingSettings.kinkAngle}
            min={60}
            max={150}
            step={1}
            onChange={(value) => updateParametricSetting('kinkAngle', value)}
          />
          <Slider
            label="Identity Radius"
            value={parametricRingSettings.innerRadius}
            min={2}
            max={20}
            step={0.5}
            onChange={(value) => updateParametricSetting('innerRadius', value)}
          />
          <Slider
            label="Perspective Tilt (X°)"
            value={(parametricRingSettings.rotation[0] * 180) / Math.PI}
            min={-90}
            max={90}
            step={1}
            onChange={(value) =>
              updateParametricSetting('rotation', [
                (value * Math.PI) / 180,
                parametricRingSettings.rotation[1],
                parametricRingSettings.rotation[2]
              ] as ParametricRingSettings['rotation'])
            }
          />
        </div>
      </Section>

      <Section
        title="Layer 2 · Trait Indicators"
        expanded={expandedSections.layer2}
        onToggle={() => toggleSection('layer2')}
      >
        <div className="control-subsection">
          <TokenListEditor
            label="Trait Markers"
            tokens={traitLayerTokens.traitMarkers}
            onChange={(tokens) => setTraitLayerTokens(prev => ({ ...prev, traitMarkers: tokens }))}
            placeholder="high_openness, moderate_conscientiousness, ..."
          />
          <TextField
            label="Curiosity Bias"
            value={traitLayerTokens.curiosityBias}
            onChange={(value) => setTraitLayerTokens(prev => ({ ...prev, curiosityBias: value }))}
            placeholder="exploratory_synthesis"
          />
          <TextField
            label="Structure Bias"
            value={traitLayerTokens.structureBias}
            onChange={(value) => setTraitLayerTokens(prev => ({ ...prev, structureBias: value }))}
            placeholder="precise_but_flexible"
          />
        </div>

        <div className="control-subsection">
          <Toggle
            label="Layer 2 · Central Sphere"
            checked={sceneVisibility.traitIndicators}
            onChange={(checked) => setSceneVisibility({ ...sceneVisibility, traitIndicators: checked })}
          />
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  expanded,
  onToggle,
  children
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="panel-section">
      <button className="section-header" onClick={onToggle}>
        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>{title}</span>
      </button>
      {expanded && <div className="section-content">{children}</div>}
    </div>
  );
}

function EffectControl({
  title,
  description,
  enabled,
  onToggle,
  children
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`effect-control ${enabled ? 'enabled' : 'disabled'}`}>
      <div className="effect-header">
        <Toggle label={title} checked={enabled} onChange={onToggle} />
        <button
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
          disabled={!enabled}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
      <p className="effect-description">{description}</p>
      {expanded && enabled && <div className="effect-controls">{children}</div>}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-label">{label}</span>
    </label>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="slider-control">
      <div className="slider-header">
        <label>{label}</label>
        <span className="slider-value">{value.toFixed(step < 1 ? 2 : 0)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider"
      />
    </div>
  );
}

function TokenListEditor({
  label,
  tokens,
  onChange,
  placeholder
}: {
  label: string;
  tokens: string[];
  onChange: (tokens: string[]) => void;
  placeholder?: string;
}) {
  const value = tokens.join(', ');

  const handleChange = (input: string) => {
    const nextTokens = input
      .split(',')
      .map(token => token.trim())
      .filter(Boolean);
    onChange(nextTokens);
  };

  return (
    <div className="token-editor">
      <label>{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => handleChange(event.target.value)}
      />
      <small>Comma-separated list; entries become context tokens.</small>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="text-editor">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
