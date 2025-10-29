import React, { useState } from 'react';
import { 
  debugAudioContext, 
  debugMediaDevices, 
  testMicrophoneAccess, 
  testDisplayMediaAccess 
} from '../utils/audioUtils';

interface DebugPanelProps {
  audioContext: AudioContext | null;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ audioContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [debugResults, setDebugResults] = useState<string[]>([]);

  const addDebugResult = (message: string) => {
    setDebugResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runAudioContextDebug = () => {
    if (audioContext) {
      debugAudioContext(audioContext);
      addDebugResult('Audio context debug info logged to console');
    } else {
      addDebugResult('No audio context available');
    }
  };

  const runMediaDevicesDebug = async () => {
    addDebugResult('Enumerating media devices...');
    await debugMediaDevices();
    addDebugResult('Media devices debug info logged to console');
  };

  const runMicrophoneTest = async () => {
    addDebugResult('Testing microphone access...');
    const hasAccess = await testMicrophoneAccess();
    addDebugResult(`Microphone access: ${hasAccess ? 'GRANTED' : 'DENIED'}`);
  };

  const runDisplayMediaTest = async () => {
    addDebugResult('Testing display media access...');
    const hasAccess = await testDisplayMediaAccess();
    addDebugResult(`Display media access: ${hasAccess ? 'GRANTED' : 'DENIED'}`);
  };

  const clearResults = () => {
    setDebugResults([]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(55, 65, 81, 0.9)',
          color: 'white',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.9)';
        }}
        title="Open debug panel"
      >
        🐛 Debug
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      backgroundColor: 'rgba(31, 41, 55, 0.95)',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      borderRadius: '0.5rem',
      padding: '1rem',
      width: '320px',
      maxHeight: '400px',
      overflow: 'hidden',
      zIndex: 1000,
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem'
      }}>
        <h3 style={{ 
          color: 'white', 
          fontWeight: '600',
          margin: '0',
          fontSize: '1rem'
        }}>Debug Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            color: '#9ca3af',
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.5rem', 
        marginBottom: '0.75rem' 
      }}>
        <button
          onClick={runAudioContextDebug}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Audio Context Info
        </button>
        <button
          onClick={runMediaDevicesDebug}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#059669',
            color: 'white',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Media Devices
        </button>
        <button
          onClick={runMicrophoneTest}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#7c3aed',
            color: 'white',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Test Microphone
        </button>
        <button
          onClick={runDisplayMediaTest}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#ea580c',
            color: 'white',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Test Display Media
        </button>
        <button
          onClick={clearResults}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#4b5563',
            color: 'white',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Clear Results
        </button>
      </div>

      <div style={{
        backgroundColor: '#111827',
        borderRadius: '0.25rem',
        padding: '0.5rem',
        maxHeight: '128px',
        overflowY: 'auto'
      }}>
        <div style={{
          fontSize: '0.75rem',
          color: '#d1d5db',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          {debugResults.length === 0 ? (
            <p style={{ color: '#6b7280', margin: '0' }}>No debug results yet</p>
          ) : (
            debugResults.map((result, index) => (
              <div key={index} style={{ 
                fontFamily: 'monospace', 
                fontSize: '0.75rem',
                margin: '0'
              }}>
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ 
        marginTop: '0.5rem', 
        fontSize: '0.75rem', 
        color: '#9ca3af',
        lineHeight: '1.4'
      }}>
        <p style={{ margin: '0.25rem 0' }}>💡 Check browser console for detailed logs</p>
      </div>
    </div>
  );
};
