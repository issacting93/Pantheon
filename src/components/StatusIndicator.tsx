import React from 'react';
import { AudioSourceType, ConnectionStatus } from '../types/audio';

interface StatusIndicatorProps {
  sourceType: AudioSourceType;
  status: ConnectionStatus;
  error: string | null;
  volume: number;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  sourceType,
  status,
  error,
  volume
}) => {
  const getSourceLabel = () => {
    switch (sourceType) {
      case AudioSourceType.MICROPHONE:
        return 'Microphone';
      case AudioSourceType.FILE:
        return 'Audio File';
      case AudioSourceType.BROWSER_TAB:
        return 'Browser Tab';
      case AudioSourceType.SYSTEM_AUDIO:
        return 'System Audio';
      default:
        return 'No Source';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return '#4ade80'; // green
      case ConnectionStatus.CONNECTING:
        return '#60a5fa'; // blue
      case ConnectionStatus.ERROR:
        return '#f87171'; // red
      default:
        return '#9ca3af'; // gray
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return '✓';
      case ConnectionStatus.CONNECTING:
        return '⟳';
      case ConnectionStatus.ERROR:
        return '⚠';
      default:
        return '○';
    }
  };

  const getHelpText = () => {
    if (status === ConnectionStatus.CONNECTING && 
        (sourceType === AudioSourceType.BROWSER_TAB || sourceType === AudioSourceType.SYSTEM_AUDIO)) {
      return '💡 Make sure to check the "Share audio" checkbox in the browser dialog';
    }
    if (status === ConnectionStatus.CONNECTED && volume === 0) {
      return getNoAudioDetectedMessage();
    }
    return null;
  };

  const getNoAudioDetectedMessage = () => {
    switch (sourceType) {
      case AudioSourceType.MICROPHONE:
        return '🔇 No audio detected from microphone - try speaking louder or check microphone settings';
      case AudioSourceType.FILE:
        return '🔇 No audio detected from file - ensure the file is playing and has audio content';
      case AudioSourceType.BROWSER_TAB:
        return '🔇 No audio detected from browser tab - check if audio is playing and tab is not muted';
      case AudioSourceType.SYSTEM_AUDIO:
        return '🔇 No audio detected from system - ensure audio is playing and system volume is up';
      default:
        return '🔇 No audio detected - check your volume and audio source';
    }
  };

  if (sourceType === AudioSourceType.NONE && status === ConnectionStatus.DISCONNECTED) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '1rem', 
        color: '#9ca3af',
        fontSize: '0.875rem'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>Select an audio source to begin</p>
        <p style={{ fontSize: '0.75rem' }}>Choose from microphone, file, browser tab, or system audio</p>
      </div>
    );
  }

  const helpText = getHelpText();

  return (
    <div className="status-indicator">
      {/* Main Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '0.5rem',
        marginBottom: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            fontSize: '1.25rem',
            color: getStatusColor()
          }}>
            {getStatusIcon()}
          </span>
          <div>
            <p style={{ 
              fontWeight: '500',
              color: 'white',
              margin: '0',
              fontSize: '0.875rem'
            }}>
              {getSourceLabel()}
            </p>
            <p style={{ 
              fontSize: '0.75rem',
              color: getStatusColor(),
              margin: '0'
            }}>
              {status === ConnectionStatus.CONNECTED && 'Connected'}
              {status === ConnectionStatus.CONNECTING && 'Connecting...'}
              {status === ConnectionStatus.ERROR && 'Error'}
              {status === ConnectionStatus.DISCONNECTED && 'Disconnected'}
            </p>
          </div>
        </div>

        {/* Volume Indicator */}
        {status === ConnectionStatus.CONNECTED && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '80px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(to right, #10b981, #3b82f6)',
                  width: `${volume * 100}%`,
                  transition: 'width 0.1s ease'
                }}
              />
            </div>
            <span style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              minWidth: '24px'
            }}>
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#fca5a5',
            margin: '0'
          }}>
            <span style={{ fontWeight: '500' }}>Error:</span> {error}
          </p>
        </div>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '0.5rem'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#93c5fd',
            margin: '0'
          }}>
            {helpText}
          </p>
        </div>
      )}
    </div>
  );
};
