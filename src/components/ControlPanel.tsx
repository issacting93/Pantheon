import { useState } from 'react';
import { ChevronDown, ChevronRight, RotateCcw, Settings } from 'lucide-react';
import type { SceneSettings, SceneElementsVisibility } from './r3f/Scene3D';
import type { EffectSettings } from './effects/EffectsManager';
import { defaultEffectSettings } from './effects/EffectsManager';
import { AudioSourceSelector } from './AudioSourceSelector';
import { StatusIndicator } from './StatusIndicator';
import type { AudioSourceState, BrowserCapabilities } from '../types/audio';
import './ControlPanel.css';

interface ControlPanelProps {
  // Enhanced audio controls
  sourceState: AudioSourceState;
  capabilities: BrowserCapabilities;
  onSelectMicrophone: () => void;
  onSelectFile: (file: File) => void;
  onSelectBrowserTab: () => void;
  onSelectSystemAudio: () => void;
  onDisconnect: () => void;

  // Legacy audio controls (for backward compatibility)
  onLoadAudio?: (file: File) => void;
  onUseMic?: () => void;
  onStopAudio?: () => void;

  // Audio levels
  audioLevels: {
    bass: number;
    mid: number;
    treble: number;
    beatDetected: boolean;
  };

  // Scene settings
  sceneSettings: SceneSettings;
  onSceneSettingsChange: (settings: SceneSettings) => void;

  // Scene visibility
  sceneVisibility: SceneElementsVisibility;
  onSceneVisibilityChange: (visibility: SceneElementsVisibility) => void;

  // Effect settings
  effectSettings: EffectSettings;
  onEffectSettingsChange: (settings: EffectSettings) => void;

  // Camera presets
  cameraState: number;
  onCameraStateChange: (state: number) => void;
}

export function ControlPanel({
  sourceState,
  capabilities,
  onSelectMicrophone,
  onSelectFile,
  onSelectBrowserTab,
  onSelectSystemAudio,
  onDisconnect,
  audioLevels,
  sceneSettings,
  onSceneSettingsChange,
  sceneVisibility,
  onSceneVisibilityChange,
  effectSettings,
  onEffectSettingsChange,
  cameraState,
  onCameraStateChange
}: ControlPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    audio: true,
    scene: true,
    effects: true,
    advanced: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const resetAll = () => {
    onEffectSettingsChange(defaultEffectSettings);
    onSceneVisibilityChange({
      centralSphere: true,
      ringOfDots: true,
      particles: true,
      connectionLines: true
    });
    onCameraStateChange(0);
  };

  const updateEffectSetting = (category: keyof EffectSettings, key: string, value: any) => {
    onEffectSettingsChange({
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
        <h2>Controls</h2>
        <button onClick={resetAll} className="reset-btn" title="Reset All">
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Enhanced Audio Sources */}
      <Section
        title="Audio Source"
        expanded={expandedSections.audio}
        onToggle={() => toggleSection('audio')}
      >
        {/* Multi-Source Audio Selector */}
        <AudioSourceSelector
          currentSource={sourceState.type}
          status={sourceState.status}
          capabilities={capabilities}
          onSelectMicrophone={onSelectMicrophone}
          onSelectFile={onSelectFile}
          onSelectBrowserTab={onSelectBrowserTab}
          onSelectSystemAudio={onSelectSystemAudio}
          onDisconnect={onDisconnect}
        />

        {/* Status Indicator */}
        <StatusIndicator
          sourceType={sourceState.type}
          status={sourceState.status}
          error={sourceState.error}
          volume={sourceState.volume}
        />

        {/* Audio Levels */}
        <div className="audio-levels">
          <LevelMeter label="Bass" level={audioLevels.bass} color="#DA4167" />
          <LevelMeter label="Mid" level={audioLevels.mid} color="#6324F8" />
          <LevelMeter label="Treble" level={audioLevels.treble} color="#00D9FF" />
          {audioLevels.beatDetected && (
            <div className="beat-indicator">🎵 BEAT</div>
          )}
        </div>
      </Section>

      {/* Scene Configuration */}
      <Section
        title="Scene Configuration"
        expanded={expandedSections.scene}
        onToggle={() => toggleSection('scene')}
      >
        {/* Camera Presets */}
        <div className="control-subsection">
          <label className="control-label">Camera Distance</label>
          <div className="button-row">
            <button
              className={`preset-btn ${cameraState === 0 ? 'active' : ''}`}
              onClick={() => onCameraStateChange(0)}
            >
              Far (200u)
            </button>
            <button
              className={`preset-btn ${cameraState === 1 ? 'active' : ''}`}
              onClick={() => onCameraStateChange(1)}
            >
              Mid (80u)
            </button>
            <button
              className={`preset-btn ${cameraState === 2 ? 'active' : ''}`}
              onClick={() => onCameraStateChange(2)}
            >
              Close (50u)
            </button>
          </div>
        </div>

        {/* Scene Parameters */}
        <div className="control-subsection">
          <Slider
            label="Particle Count"
            value={sceneSettings.particleCount}
            min={10}
            max={500}
            step={10}
            onChange={(value) => onSceneSettingsChange({ ...sceneSettings, particleCount: value })}
          />
          <Slider
            label="Particle Radius"
            value={sceneSettings.particleRadius}
            min={3}
            max={15}
            step={0.5}
            onChange={(value) => onSceneSettingsChange({ ...sceneSettings, particleRadius: value })}
          />
          <Slider
            label="Connection Distance"
            value={sceneSettings.maxLineDistance}
            min={0.5}
            max={8}
            step={0.5}
            onChange={(value) => onSceneSettingsChange({ ...sceneSettings, maxLineDistance: value })}
          />
        </div>

        {/* Scene Elements Visibility */}
        <div className="control-subsection">
          <label className="control-label">Visible Elements</label>
          <Toggle
            label="Central Sphere"
            checked={sceneVisibility.centralSphere}
            onChange={(checked) => onSceneVisibilityChange({ ...sceneVisibility, centralSphere: checked })}
          />
          <Toggle
            label="Ring of Dots"
            checked={sceneVisibility.ringOfDots}
            onChange={(checked) => onSceneVisibilityChange({ ...sceneVisibility, ringOfDots: checked })}
          />
          <Toggle
            label="Particles"
            checked={sceneVisibility.particles}
            onChange={(checked) => onSceneVisibilityChange({ ...sceneVisibility, particles: checked })}
          />
          <Toggle
            label="Connection Lines"
            checked={sceneVisibility.connectionLines}
            onChange={(checked) => onSceneVisibilityChange({ ...sceneVisibility, connectionLines: checked })}
          />
        </div>
      </Section>

      {/* Audio Effects */}
      <Section
        title="Audio-Reactive Effects"
        expanded={expandedSections.effects}
        onToggle={() => toggleSection('effects')}
      >
        {/* Particle Scale Effect */}
        <EffectControl
          title="Particle Scale"
          description="Bass-driven particle system scaling"
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

        {/* Particle Rotation Effect */}
        <EffectControl
          title="Particle Rotation"
          description="Audio-reactive particle rotation"
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
        </EffectControl>

        {/* Particle Movement Effect */}
        <EffectControl
          title="Particle Movement"
          description="Individual particle oscillation (⚠️ performance intensive)"
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

        {/* Camera Shake Effect */}
        <EffectControl
          title="Camera Shake"
          description="High-frequency camera shake"
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
        </EffectControl>

        {/* Particle Connections Effect */}
        <EffectControl
          title="Particle Connections"
          description="Lines between nearby particles (⚠️ performance intensive)"
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
    </div>
  );
}

// Helper Components

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

function LevelMeter({
  label,
  level,
  color
}: {
  label: string;
  level: number;
  color: string;
}) {
  return (
    <div className="level-meter">
      <span className="level-label">{label}</span>
      <div className="level-bar">
        <div
          className="level-fill"
          style={{
            width: `${level * 100}%`,
            background: color
          }}
        />
      </div>
      <span className="level-value">{Math.round(level * 100)}%</span>
    </div>
  );
}
