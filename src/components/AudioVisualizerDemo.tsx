import { useRef, useState } from 'react';
import { Scene3D, type SceneSettings, type SceneElementsVisibility } from './r3f/Scene3D';
import { useAudioAnalysis } from '../hooks/useAudioAnalysis';
import { defaultEffectSettings, type EffectSettings } from './effects/EffectsManager';
import { ControlPanel } from './ControlPanel';
import { DebugPanel } from './DebugPanel';
import { AudioDebugOverlay } from './AudioDebugOverlay';
import './AudioVisualizerDemo.css';

const AudioVisualizerDemo = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [cameraState, setCameraStateValue] = useState(0);

  const settings: SceneSettings[] = [
    { maxLineDistance: 2.5, particleCount: 170, particleRadius: 6.5, cameraDistance: 200, label: "Default" },
    { maxLineDistance: 5.0, particleCount: 100, particleRadius: 8.0, cameraDistance: 80, label: "State 1" },
    { maxLineDistance: 2.0, particleCount: 200, particleRadius: 5.0, cameraDistance: 50, label: "State 2" }
  ];

  const [currentSettings, setCurrentSettings] = useState<SceneSettings>(settings[0]);
  const [sceneVisibility, setSceneVisibility] = useState<SceneElementsVisibility>({
    centralSphere: true,
    ringOfDots: true,
    particles: true,
    connectionLines: true
  });
  const [effectSettings, setEffectSettings] = useState<EffectSettings>(defaultEffectSettings);

  const {
    sourceState,
    capabilities,
    audioContext,
    audioData,
    connectAudioFile,
    connectMicrophone,
    connectBrowserTab,
    connectSystemAudio,
    disconnect
  } = useAudioAnalysis();

  const handleAudioFile = async (file: File | undefined) => {
    if (!file) return;

    try {
      // Use new direct file connection
      await connectAudioFile(file);
    } catch (error) {
      console.error('Error loading audio file:', error);
    }
  };

  // Legacy method - now just redirects to new method
  const handleAudioFileViaElement = async (file: File | undefined) => {
    if (!file) return;
    await handleAudioFile(file);
  };

  const useMic = async () => {
    try {
      await connectMicrophone();
    } catch (error) {
      console.error('Error connecting microphone:', error);
    }
  };

  // New enhanced audio source handlers
  const handleMicrophone = async () => {
    try {
      await connectMicrophone();
    } catch (error) {
      console.error('Error connecting microphone:', error);
    }
  };

  const handleBrowserTab = async () => {
    try {
      await connectBrowserTab();
    } catch (error) {
      console.error('Error connecting browser tab:', error);
    }
  };

  const handleSystemAudio = async () => {
    try {
      await connectSystemAudio();
    } catch (error) {
      console.error('Error connecting system audio:', error);
    }
  };

  const stopAudio = () => {
    disconnect();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
    }
  };

  const setCameraState = (state: number) => {
    if (state === cameraState) return;

    setCameraStateValue(state);
    const selectedSetting = settings[state] || settings[0];
    setCurrentSettings(selectedSetting);
  };

  return (
    <div className="visualizer-container">
      <audio ref={audioRef} preload="auto" crossOrigin="anonymous"></audio>

      {/* R3F Scene with all effects */}
      <Scene3D
        audioData={audioData}
        settings={currentSettings}
        sceneVisibility={sceneVisibility}
        effectSettings={effectSettings}
        onEffectSettingsChange={setEffectSettings}
      />

      {/* Title overlay */}
      <div className="title-overlay">
        <h1>Audio-Reactive Visualization</h1>
        <p>Experience your music through dynamic 3D visuals</p>
      </div>

      {/* Enhanced control panel with multi-source audio */}
      <ControlPanel
        sourceState={sourceState}
        capabilities={capabilities}
        onSelectMicrophone={handleMicrophone}
        onSelectFile={handleAudioFile}
        onSelectBrowserTab={handleBrowserTab}
        onSelectSystemAudio={handleSystemAudio}
        onDisconnect={stopAudio}
        onLoadAudio={handleAudioFileViaElement}
        onUseMic={useMic}
        onStopAudio={stopAudio}
        audioLevels={{
          bass: audioData.bassLevel,
          mid: audioData.midLevel,
          treble: audioData.trebleLevel,
          beatDetected: audioData.beatDetected
        }}
        sceneSettings={currentSettings}
        onSceneSettingsChange={setCurrentSettings}
        sceneVisibility={sceneVisibility}
        onSceneVisibilityChange={setSceneVisibility}
        effectSettings={effectSettings}
        onEffectSettingsChange={setEffectSettings}
        cameraState={cameraState}
        onCameraStateChange={setCameraState}
      />

      {/* Debug Panel */}
      <DebugPanel audioContext={audioContext} />
      
      {/* Audio Debug Overlay */}
      <AudioDebugOverlay audioData={audioData} sourceState={sourceState} />
    </div>
  );
};

export default AudioVisualizerDemo;
