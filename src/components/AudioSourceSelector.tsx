import React from 'react';
import { AudioSourceType, ConnectionStatus, BrowserCapabilities } from '../types/audio';
import './AudioSourceSelector.css';

interface AudioSourceSelectorProps {
  currentSource: AudioSourceType;
  status: ConnectionStatus;
  capabilities: BrowserCapabilities;
  onSelectMicrophone: () => void;
  onSelectFile: (file: File) => void;
  onSelectBrowserTab: () => void;
  onSelectSystemAudio: () => void;
  onDisconnect: () => void;
}

export const AudioSourceSelector: React.FC<AudioSourceSelectorProps> = ({
  currentSource,
  status,
  capabilities,
  onSelectMicrophone,
  onSelectFile,
  onSelectBrowserTab,
  onSelectSystemAudio,
  onDisconnect
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelectFile(file);
    }
  };

  const isConnecting = status === ConnectionStatus.CONNECTING;
  const isConnected = status === ConnectionStatus.CONNECTED;
  const isDisabled = isConnecting;

  const getButtonClass = (sourceType: AudioSourceType) => {
    const baseClass = 'control-btn';
    
    if (currentSource === sourceType && isConnected) {
      return `${baseClass} active`;
    }
    
    if (currentSource === sourceType && isConnecting) {
      return `${baseClass} connecting`;
    }
    
    return baseClass;
  };

  return (
    <div className="audio-source-selector">
      <div className="source-grid">
        {/* Microphone Button */}
        <button
          onClick={onSelectMicrophone}
          disabled={isDisabled || !capabilities.hasGetUserMedia}
          className={getButtonClass(AudioSourceType.MICROPHONE)}
          title={!capabilities.hasGetUserMedia ? 'Microphone not supported' : 'Capture microphone input'}
        >
          <span className="source-icon">🎤</span>
          <span className="source-label">Microphone</span>
        </button>

        {/* File Upload Button */}
        <label
          className={`${getButtonClass(AudioSourceType.FILE)} ${isDisabled ? 'disabled' : ''}`}
          title="Play audio file"
        >
          <span className="source-icon">📁</span>
          <span className="source-label">Audio File</span>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            disabled={isDisabled}
            style={{ display: 'none' }}
          />
        </label>

        {/* Browser Tab Button */}
        <button
          onClick={onSelectBrowserTab}
          disabled={isDisabled || !capabilities.canCaptureTabAudio}
          className={getButtonClass(AudioSourceType.BROWSER_TAB)}
          title={!capabilities.canCaptureTabAudio ? 'Tab audio not supported' : 'Capture browser tab audio'}
        >
          <span className="source-icon">🌐</span>
          <span className="source-label">Browser Tab</span>
        </button>

        {/* System Audio Button */}
        <button
          onClick={onSelectSystemAudio}
          disabled={isDisabled || !capabilities.canCaptureSystemAudio}
          className={getButtonClass(AudioSourceType.SYSTEM_AUDIO)}
          title={!capabilities.canCaptureSystemAudio ? 'System audio only supported in Chrome/Edge' : 'Capture system audio'}
        >
          <span className="source-icon">🖥️</span>
          <span className="source-label">System Audio</span>
        </button>
      </div>

      {/* Disconnect Button */}
      {isConnected && (
        <button
          onClick={onDisconnect}
          className="control-btn disconnect-btn"
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          Disconnect
        </button>
      )}

      {/* Browser Compatibility Notice */}
      {(!capabilities.canCaptureSystemAudio || !capabilities.canCaptureTabAudio) && (
        <div className="compatibility-notice">
          {!capabilities.canCaptureTabAudio && (
            <p>⚠️ Screen sharing not available in this browser</p>
          )}
          {!capabilities.canCaptureSystemAudio && capabilities.canCaptureTabAudio && (
            <p>💡 System audio only available in Chrome/Edge</p>
          )}
        </div>
      )}

      {/* Instructions */}
      {isConnecting && (currentSource === AudioSourceType.BROWSER_TAB || currentSource === AudioSourceType.SYSTEM_AUDIO) && (
        <div className="connection-help">
          <p>💡 Make sure to check the "Share audio" checkbox in the browser dialog</p>
        </div>
      )}
    </div>
  );
};
