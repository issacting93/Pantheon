import { useState } from 'react';
import { EffectSettings, defaultEffectSettings } from './EffectsManager';
import { ChevronDown, ChevronRight, RotateCcw } from 'lucide-react';

interface EffectsControlPanelProps {
  settings: EffectSettings;
  onSettingsChange: (settings: EffectSettings) => void;
}

export default function EffectsControlPanel({
  settings,
  onSettingsChange
}: EffectsControlPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    particleScale: false,
    particleRotation: false,
    particleMovement: false,
    cameraShake: false,
    particleConnections: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  function updateSetting<Category extends keyof EffectSettings, Key extends keyof EffectSettings[Category]>(
    category: Category,
    key: Key,
    value: EffectSettings[Category][Key]
  ) {
    const updatedCategory = {
      ...settings[category],
      [key]: value
    } as EffectSettings[Category];

    onSettingsChange({
      ...settings,
      [category]: updatedCategory
    });
  }

  const resetToDefaults = () => {
    onSettingsChange(defaultEffectSettings);
  };

  const EffectToggle = ({ 
    category, 
    title, 
    description 
  }: { 
    category: keyof EffectSettings; 
    title: string; 
    description: string;
  }) => (
    <div className="border border-white/10 rounded-lg p-3 mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSection(category)}
            className="text-white hover:text-cyan-400"
          >
            {expandedSections[category] ? 
              <ChevronDown className="w-4 h-4" /> : 
              <ChevronRight className="w-4 h-4" />
            }
          </button>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings[category].enabled}
              onChange={(e) => updateSetting(category, 'enabled', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-white">{title}</span>
          </label>
        </div>
      </div>
      
      <p className="text-xs text-gray-400 mb-2">{description}</p>
      
      {expandedSections[category] && (
        <div className="space-y-2 mt-3 pl-6 border-l border-white/10">
          {category === 'particleScale' && (
            <>
              <div>
                <label className="text-xs text-gray-300">Intensity: {settings.particleScale.intensity}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.particleScale.intensity}
                  onChange={(e) => updateSetting('particleScale', 'intensity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-300">Smoothing: {settings.particleScale.smoothing}</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={settings.particleScale.smoothing}
                  onChange={(e) => updateSetting('particleScale', 'smoothing', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}
          
          {category === 'particleRotation' && (
            <>
              <div>
                <label className="text-xs text-gray-300">Y-Axis: {settings.particleRotation.yAxisIntensity}</label>
                <input
                  type="range"
                  min="0"
                  max="0.05"
                  step="0.001"
                  value={settings.particleRotation.yAxisIntensity}
                  onChange={(e) => updateSetting('particleRotation', 'yAxisIntensity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-300">Z-Axis: {settings.particleRotation.zAxisIntensity}</label>
                <input
                  type="range"
                  min="0"
                  max="0.02"
                  step="0.001"
                  value={settings.particleRotation.zAxisIntensity}
                  onChange={(e) => updateSetting('particleRotation', 'zAxisIntensity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}
          
          {category === 'particleMovement' && (
            <>
              <div>
                <label className="text-xs text-gray-300">Intensity: {settings.particleMovement.intensity}</label>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={settings.particleMovement.intensity}
                  onChange={(e) => updateSetting('particleMovement', 'intensity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-300">Frequency: {settings.particleMovement.frequency}</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={settings.particleMovement.frequency}
                  onChange={(e) => updateSetting('particleMovement', 'frequency', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}
          
          {category === 'cameraShake' && (
            <>
              <div>
                <label className="text-xs text-gray-300">Intensity: {settings.cameraShake.intensity}</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.cameraShake.intensity}
                  onChange={(e) => updateSetting('cameraShake', 'intensity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-300">Threshold: {settings.cameraShake.threshold}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.cameraShake.threshold}
                  onChange={(e) => updateSetting('cameraShake', 'threshold', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}
          
          {category === 'particleConnections' && (
            <>
              <div>
                <label className="text-xs text-gray-300">Max Distance: {settings.particleConnections.maxDistance}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={settings.particleConnections.maxDistance}
                  onChange={(e) => updateSetting('particleConnections', 'maxDistance', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-300">Max Connections: {settings.particleConnections.maxConnections}</label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={settings.particleConnections.maxConnections}
                  onChange={(e) => updateSetting('particleConnections', 'maxConnections', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-300">Opacity: {settings.particleConnections.opacity}</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={settings.particleConnections.opacity}
                  onChange={(e) => updateSetting('particleConnections', 'opacity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed top-60 right-4 bg-black/80 text-white px-4 py-3 rounded-lg backdrop-blur-sm border border-white/10 z-50 max-w-xs max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-cyan-400">Audio Effects</div>
        <button
          onClick={resetToDefaults}
          className="p-1 hover:bg-white/10 rounded"
          title="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-1">
        <EffectToggle
          category="particleScale"
          title="Particle Scaling"
          description="Bass-driven particle system scaling"
        />
        
        <EffectToggle
          category="particleRotation"
          title="Particle Rotation"
          description="Audio-reactive particle system rotation"
        />
        
        <EffectToggle
          category="particleMovement"
          title="Particle Movement"
          description="Individual particle oscillation (performance intensive)"
        />
        
        <EffectToggle
          category="cameraShake"
          title="Camera Shake"
          description="High-frequency camera shake effects"
        />
        
        <EffectToggle
          category="particleConnections"
          title="Particle Connections"
          description="Lines between nearby particles (performance intensive)"
        />
      </div>
    </div>
  );
}
