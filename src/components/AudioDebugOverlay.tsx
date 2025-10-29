import React from 'react';
import { AudioData, AudioSourceState } from '../types/audio';

interface AudioDebugOverlayProps {
  audioData: AudioData;
  sourceState: AudioSourceState;
}

export const AudioDebugOverlay: React.FC<AudioDebugOverlayProps> = ({
  audioData,
  sourceState
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 1000,
      minWidth: '250px',
      backdropFilter: 'blur(8px)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#00ff88' }}>🔍 Audio Debug</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Source:</strong> {sourceState.type}<br/>
        <strong>Status:</strong> <span style={{ color: 
          sourceState.status === 'connected' ? '#00ff88' : 
          sourceState.status === 'connecting' ? '#ffaa00' : 
          sourceState.status === 'error' ? '#ff4444' : '#888'
        }}>{sourceState.status}</span>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Volume:</strong> {(audioData.volume * 100).toFixed(1)}%<br/>
        <div style={{
          width: '200px',
          height: '6px',
          background: '#333',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${audioData.volume * 100}%`,
            height: '100%',
            background: audioData.volume > 0.01 ? '#00ff88' : '#ff4444',
            transition: 'width 0.1s'
          }}/>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div>
          <strong>Bass:</strong><br/>
          {(audioData.bassLevel * 100).toFixed(1)}%<br/>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#333',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${audioData.bassLevel * 100}%`,
              height: '100%',
              background: '#ff6b6b'
            }}/>
          </div>
        </div>
        
        <div>
          <strong>Mid:</strong><br/>
          {(audioData.midLevel * 100).toFixed(1)}%<br/>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#333',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${audioData.midLevel * 100}%`,
              height: '100%',
              background: '#4ecdc4'
            }}/>
          </div>
        </div>
        
        <div>
          <strong>Treble:</strong><br/>
          {(audioData.trebleLevel * 100).toFixed(1)}%<br/>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#333',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${audioData.trebleLevel * 100}%`,
              height: '100%',
              background: '#45b7d1'
            }}/>
          </div>
        </div>
      </div>

      <div>
        <strong>Beat:</strong> {audioData.beatDetected ? 
          <span style={{ color: '#ff6b6b' }}>🥁 DETECTED</span> : 
          <span style={{ color: '#666' }}>---</span>
        }
      </div>

      {sourceState.error && (
        <div style={{ marginTop: '10px', color: '#ff4444', fontSize: '11px' }}>
          <strong>Error:</strong> {sourceState.error}
        </div>
      )}
    </div>
  );
};
