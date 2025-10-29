import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  AudioSourceType,
  ConnectionStatus,
  AudioSourceState,
  AudioAnalysisData,
  AudioData
} from '../types/audio';
import {
  detectBrowserCapabilities,
  getErrorMessage,
  createAudioContext,
  resumeAudioContext,
  BeatDetector
} from '../utils/audioUtils';

const DEBUG = false;

export const useAudioAnalysis = (fftSize: number = 256) => {
  const [sourceState, setSourceState] = useState<AudioSourceState>({
    type: AudioSourceType.NONE,
    status: ConnectionStatus.DISCONNECTED,
    stream: null,
    audioElement: null,
    error: null,
    volume: 0
  });

  const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastVolumeTimeRef = useRef<number>(0);
  const isAnalyzingRef = useRef<boolean>(false);
  const objectUrlRef = useRef<string | null>(null);

  const capabilities = useMemo(() => detectBrowserCapabilities(), []);
  const [analysisData, setAnalysisData] = useState<AudioAnalysisData | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<AudioNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const displayStreamRef = useRef<MediaStream | null>(null);
  const beatDetectorRef = useRef<BeatDetector>(new BeatDetector());

  /**
   * Initialize audio context and analyser
   */
  const initializeAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = fftSize;
      analyserRef.current.smoothingTimeConstant = 0.8;
      analyserRef.current.minDecibels = -90;
      analyserRef.current.maxDecibels = -10;
    if (DEBUG) {
      console.log('📡 Analyser created with settings:', {
        fftSize: analyserRef.current.fftSize,
        frequencyBinCount: analyserRef.current.frequencyBinCount,
        smoothingTimeConstant: analyserRef.current.smoothingTimeConstant,
        minDecibels: analyserRef.current.minDecibels,
        maxDecibels: analyserRef.current.maxDecibels
      });
    }
    }
    return { audioContext: audioContextRef.current, analyser: analyserRef.current };
  }, [fftSize]);

  /**
   * Clean up existing audio connections
   */
  const cleanup = useCallback(() => {
    // Stop analysis
    isAnalyzingRef.current = false;
    
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Clear silence timeout
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }

    // Reset beat detector
    beatDetectorRef.current.reset();

    // Disconnect audio nodes
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.disconnect();
      } catch (e) {
        // Already disconnected
      }
      sourceNodeRef.current = null;
    }

    // Disconnect analyser output
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }

    // Stop media streams
    if (sourceState.stream) {
      sourceState.stream.getTracks().forEach(track => track.stop());
    }

    // Stop display stream (for tab/system audio)
    if (displayStreamRef.current) {
      displayStreamRef.current.getTracks().forEach(track => track.stop());
      displayStreamRef.current = null;
    }

    // Pause and clean audio element
    if (sourceState.audioElement) {
      sourceState.audioElement.pause();
      sourceState.audioElement.src = '';
    }

    // Revoke file URLs
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, [sourceState.stream, sourceState.audioElement]); // ✅ FIXED: Removed silenceTimeout dependency

  /**
   * Start audio analysis loop
   */
  const startAnalysis = useCallback(() => {
    if (!analyserRef.current) {
      if (DEBUG) console.error('❌ Cannot start analysis: analyser not available');
      return;
    }

    if (isAnalyzingRef.current) {
      if (DEBUG) console.warn('⚠️ Analysis already running, skipping...');
      return;
    }

    if (DEBUG) console.log('🎯 Starting audio analysis...');
    isAnalyzingRef.current = true;
    
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);
    const timeDomainData = new Uint8Array(bufferLength);

    if (DEBUG) {
      console.log('📊 Audio Analysis Setup:', {
        fftSize: analyser.fftSize,
        bufferLength,
        smoothingTimeConstant: analyser.smoothingTimeConstant,
        minDecibels: analyser.minDecibels,
        maxDecibels: analyser.maxDecibels
      });
    }

    const analyze = () => {
      if (!analyser) {
        if (DEBUG) console.warn('Analyser not available in analyze loop');
        return;
      }

      try {
        analyser.getByteFrequencyData(frequencyData);
        analyser.getByteTimeDomainData(timeDomainData);
      } catch (error) {
        if (DEBUG) console.error('❌ Error getting audio data:', error);
        return;
      }

      // Debug: Log raw frequency data occasionally
      if (DEBUG) {
        const now = Date.now();
        if (now % 1000 < 50) { // Log every ~1 second
          const totalEnergy = Array.from(frequencyData).reduce((sum, val) => sum + val, 0);
          console.log('🔊 Audio Debug:', {
            bufferLength,
            totalEnergy,
            firstFewValues: Array.from(frequencyData.slice(0, 10)),
            maxValue: Math.max(...Array.from(frequencyData))
          });
        }
      }

      // Calculate frequency bands (using same logic as existing threejs project)
      const bassStart = 0;
      const bassEnd = Math.floor(bufferLength * 0.1); // 0-10% of frequencies
      const midStart = bassEnd;
      const midEnd = Math.floor(bufferLength * 0.5); // 10-50% of frequencies
      const highStart = midEnd;
      const highEnd = bufferLength; // 50-100% of frequencies

      // Calculate band levels
      let bassSum = 0;
      let midSum = 0;
      let highSum = 0;

      for (let i = bassStart; i < bassEnd; i++) {
        bassSum += frequencyData[i];
      }
      for (let i = midStart; i < midEnd; i++) {
        midSum += frequencyData[i];
      }
      for (let i = highStart; i < highEnd; i++) {
        highSum += frequencyData[i];
      }

      // Normalize levels (0-1)
      const bassLevel = bassSum / (bassEnd - bassStart) / 255;
      const midLevel = midSum / (midEnd - midStart) / 255;
      const trebleLevel = highSum / (highEnd - highStart) / 255;

      // Calculate average volume
      const volume = (bassLevel + midLevel + trebleLevel) / 3;

      // Debug: Log calculated levels
      if (DEBUG) {
        const now = Date.now();
        if (now % 1000 < 50) {
          console.log('🎵 Calculated Levels:', {
            bassLevel: bassLevel.toFixed(3),
            midLevel: midLevel.toFixed(3),
            trebleLevel: trebleLevel.toFixed(3),
            volume: volume.toFixed(3),
            bassSum,
            midSum,
            highSum
          });
        }
      }

      // Beat detection
      const beatDetected = beatDetectorRef.current.detectBeat(bassLevel);

      // Track volume changes for silence detection
      const currentTime = Date.now();
      const VOLUME_THRESHOLD = 0.001; // Lower threshold for better detection
      if (volume > VOLUME_THRESHOLD) { // Threshold for "audible" sound
        lastVolumeTimeRef.current = currentTime;
        // Clear any existing silence timeout
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      } else if (currentTime - lastVolumeTimeRef.current > 5000) { // 5 seconds of silence
        // Set a timeout to warn about prolonged silence
        if (!silenceTimeoutRef.current) {
          silenceTimeoutRef.current = setTimeout(() => {
            if (DEBUG) console.warn('Prolonged silence detected - check audio source');
          }, 2000);
        }
      }

      setAnalysisData({
        frequencyData: new Uint8Array(frequencyData),
        timeDomainData: new Uint8Array(timeDomainData),
        averageVolume: volume,
        bassLevel,
        midLevel,
        trebleLevel,
        volume,
        beatDetected
      });

      setSourceState(prev => ({ ...prev, volume }));

      // Continue the animation loop
      if (analyser && isAnalyzingRef.current) {
        animationFrameRef.current = requestAnimationFrame(analyze);
      } else {
        if (DEBUG) console.warn('⚠️ Stopping analysis loop - analyser lost or stopped');
        isAnalyzingRef.current = false;
      }
    };

    // Start the first analysis
    lastVolumeTimeRef.current = Date.now(); // Silence baseline
    if (DEBUG) console.log('🚀 Starting first analyze() call...');
    analyze();
  }, []); // ✅ FIXED: No dependencies to prevent recreation!

  /**
   * Connect microphone
   */
  const connectMicrophone = useCallback(async () => {
    if (!capabilities.hasGetUserMedia) {
      setSourceState(prev => ({
        ...prev,
        status: ConnectionStatus.ERROR,
        error: 'Microphone access not supported in this browser.'
      }));
      return;
    }

    setSourceState(prev => ({
      ...prev,
      type: AudioSourceType.MICROPHONE,
      status: ConnectionStatus.CONNECTING,
      error: null
    }));

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      const { audioContext, analyser } = initializeAudioContext();
      await resumeAudioContext(audioContext);

      cleanup();

      console.log('🎤 Connecting microphone stream...');
      const source = audioContext.createMediaStreamSource(stream);
      if (analyser) {
        source.connect(analyser);
        if (DEBUG) console.log('✅ Microphone connected to analyser');
      } else {
        if (DEBUG) console.error('❌ Analyser not available for microphone');
      }
      sourceNodeRef.current = source;

      setSourceState({
        type: AudioSourceType.MICROPHONE,
        status: ConnectionStatus.CONNECTED,
        stream,
        audioElement: null,
        error: null,
        volume: 0
      });

      startAnalysis();
    } catch (error) {
      setSourceState(prev => ({
        ...prev,
        status: ConnectionStatus.ERROR,
        error: getErrorMessage(error)
      }));
    }
  }, [capabilities.hasGetUserMedia, initializeAudioContext, cleanup, startAnalysis]);

  /**
   * Connect audio file
   */
  const connectAudioFile = useCallback(async (file: File) => {
    setSourceState(prev => ({
      ...prev,
      type: AudioSourceType.FILE,
      status: ConnectionStatus.CONNECTING,
      error: null
    }));

    try {
      const { audioContext, analyser } = initializeAudioContext();
      await resumeAudioContext(audioContext);

      cleanup();

      const audio = new Audio();
      const url = URL.createObjectURL(file);
      objectUrlRef.current = url;
      audio.src = url;
      audio.crossOrigin = 'anonymous';

      const source = audioContext.createMediaElementSource(audio);
      if (analyser) {
        source.connect(analyser);
        analyser.connect(audioContext.destination); // Connect to speakers
      }
      sourceNodeRef.current = source;

      await audio.play();

      setSourceState({
        type: AudioSourceType.FILE,
        status: ConnectionStatus.CONNECTED,
        stream: null,
        audioElement: audio,
        error: null,
        volume: 0
      });

      startAnalysis();
    } catch (error) {
      setSourceState(prev => ({
        ...prev,
        status: ConnectionStatus.ERROR,
        error: getErrorMessage(error)
      }));
    }
  }, [initializeAudioContext, cleanup, startAnalysis]);

  /**
   * Connect audio from existing HTMLAudioElement (for backward compatibility)
   */
  const connectAudioFromMediaElement = useCallback(async (audioElement: HTMLAudioElement) => {
    setSourceState(prev => ({
      ...prev,
      type: AudioSourceType.FILE,
      status: ConnectionStatus.CONNECTING,
      error: null
    }));

    try {
      const { audioContext, analyser } = initializeAudioContext();
      await resumeAudioContext(audioContext);

      cleanup();

      const source = audioContext.createMediaElementSource(audioElement);
      if (analyser) {
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      }
      sourceNodeRef.current = source;

      setSourceState({
        type: AudioSourceType.FILE,
        status: ConnectionStatus.CONNECTED,
        stream: null,
        audioElement,
        error: null,
        volume: 0
      });

      startAnalysis();
    } catch (error) {
      setSourceState(prev => ({
        ...prev,
        status: ConnectionStatus.ERROR,
        error: getErrorMessage(error)
      }));
    }
  }, [initializeAudioContext, cleanup, startAnalysis]);

  /**
   * Connect browser tab or system audio
   */
  const connectDisplayAudio = useCallback(async (type: 'tab' | 'system') => {
    const sourceType = type === 'tab' 
      ? AudioSourceType.BROWSER_TAB 
      : AudioSourceType.SYSTEM_AUDIO;

    if (!capabilities.hasGetDisplayMedia) {
      setSourceState(prev => ({
        ...prev,
        status: ConnectionStatus.ERROR,
        error: 'Screen/tab sharing not supported in this browser.'
      }));
      return;
    }

    if (type === 'system' && !capabilities.canCaptureSystemAudio) {
      setSourceState(prev => ({
        ...prev,
        status: ConnectionStatus.ERROR,
        error: 'System audio capture is only supported in Chrome and Edge browsers.'
      }));
      return;
    }

    setSourceState(prev => ({
      ...prev,
      type: sourceType,
      status: ConnectionStatus.CONNECTING,
      error: null
    }));

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true, // Required even though we only want audio
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          suppressLocalAudioPlayback: false
        } as any
      });

      const audioTracks = displayStream.getAudioTracks();
      const videoTracks = displayStream.getVideoTracks();
      
      if (DEBUG) {
        console.log('🎥 Display Media Stream:', {
          audioTracks: audioTracks.length,
          videoTracks: videoTracks.length,
          audioTrackSettings: audioTracks.map(t => ({
            kind: t.kind,
            enabled: t.enabled,
            muted: t.muted,
            readyState: t.readyState,
            label: t.label
          }))
        });
      }

      if (audioTracks.length === 0) {
        displayStream.getTracks().forEach(track => track.stop());
        throw new Error(
          'No audio track found. Please make sure to check the "Share audio" checkbox when selecting your tab/screen.'
        );
      }

      const { audioContext, analyser } = initializeAudioContext();
      await resumeAudioContext(audioContext);

      cleanup();

      // Create audio-only stream
      const audioStream = new MediaStream(audioTracks);
      displayStreamRef.current = displayStream;

      console.log('🔊 Connecting audio stream to analyser...');
      const source = audioContext.createMediaStreamSource(audioStream);
      if (analyser) {
        source.connect(analyser);
        if (DEBUG) console.log('✅ Audio stream connected to analyser');
      } else {
        if (DEBUG) console.error('❌ Analyser not available for audio stream');
      }
      sourceNodeRef.current = source;

      // Handle stream ending (user stops sharing)
      displayStream.getVideoTracks()[0]?.addEventListener('ended', () => {
        disconnect();
      });

      setSourceState({
        type: sourceType,
        status: ConnectionStatus.CONNECTED,
        stream: audioStream,
        audioElement: null,
        error: null,
        volume: 0
      });

      startAnalysis();
    } catch (error) {
      cleanup();
      setSourceState(prev => ({
        ...prev,
        status: ConnectionStatus.ERROR,
        error: getErrorMessage(error)
      }));
    }
  }, [capabilities, initializeAudioContext, cleanup, startAnalysis]);

  /**
   * Connect browser tab audio
   */
  const connectBrowserTab = useCallback(() => {
    return connectDisplayAudio('tab');
  }, [connectDisplayAudio]);

  /**
   * Connect system audio
   */
  const connectSystemAudio = useCallback(() => {
    return connectDisplayAudio('system');
  }, [connectDisplayAudio]);

  /**
   * Legacy method for backward compatibility with existing threejs code
   */
  const connectMic = useCallback(() => {
    return connectMicrophone();
  }, [connectMicrophone]);

  /**
   * Disconnect current audio source
   */
  const disconnect = useCallback(() => {
    cleanup();
    setSourceState({
      type: AudioSourceType.NONE,
      status: ConnectionStatus.DISCONNECTED,
      stream: null,
      audioElement: null,
      error: null,
      volume: 0
    });
    setAnalysisData(null);
  }, [cleanup]);

  /**
   * Legacy method for backward compatibility
   */
  const disconnectAudio = useCallback(() => {
    disconnect();
  }, [disconnect]);

  /**
   * Clean up on unmount
   */
  useEffect(() => {
    return () => {
      cleanup();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [cleanup]);

  // Create legacy audioData object for backward compatibility with existing threejs components
  const audioData: AudioData = analysisData ? {
    bassLevel: analysisData.bassLevel,
    midLevel: analysisData.midLevel,
    trebleLevel: analysisData.trebleLevel,
    volume: analysisData.volume,
    beatDetected: analysisData.beatDetected
  } : {
    bassLevel: 0,
    midLevel: 0,
    trebleLevel: 0,
    volume: 0,
    beatDetected: false
  };

  return {
    // New comprehensive interface
    sourceState,
    analysisData,
    capabilities,
    audioContext: audioContextRef.current,
    connectMicrophone,
    connectAudioFile,
    connectBrowserTab,
    connectSystemAudio,
    disconnect,

    // Legacy interface for backward compatibility with existing threejs code
    audioData,
    isConnected: sourceState.status === ConnectionStatus.CONNECTED,
    connectAudioFromMediaElement,
    connectMic,
    disconnectAudio
  };
};
