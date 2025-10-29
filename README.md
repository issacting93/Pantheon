# Three.js Audio Visualizer - React

A stunning audio-reactive 3D visualization built with React and Three.js. Features particle systems, dynamic camera controls, and real-time audio analysis.

## Features

- 🎵 **Audio-Reactive Visualization**: Real-time audio analysis with bass, mid, and treble frequency detection
- 🎨 **Post-Processing Effects**: Chromatic aberration and distortion shaders
- 🎥 **Dynamic Camera Controls**: Multiple camera states for different viewing experiences
- 🎧 **Multiple Audio Sources**: Support for audio files and microphone input
- 🔮 **3D Model Loading**: FBX and STL model support with texture mapping
- ⚡ **Performance Optimized**: Frame-rate limiting and efficient particle systems

## Key Components

### SceneManager
The core Three.js scene manager that handles:
- Particle sphere creation and animation
- Dynamic line connections between particles
- Post-processing effects
- Audio-reactive visual effects
- Camera controls

### AudioVisualizer
Handles audio input and frequency analysis:
- Media element audio source
- Microphone input
- FFT analysis for bass/mid/high frequencies

### ModelLoader
Loads and manages 3D models:
- FBX model loading
- STL model loading
- Texture mapping
- Material configuration

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

## Usage

### Audio Sources

1. **Load Audio File**: Click the "Load Audio File" button to select an audio file from your computer
2. **Use Microphone**: Click the "Use Microphone" button to visualize audio from your microphone
3. **Stop Audio**: Click the "Stop Audio" button to stop playback and disconnect audio

### Camera Controls

The visualizer includes three camera states:
- **Default (200u)**: Distant view showing the full particle system
- **State 1 (80u)**: Medium distance for detailed particle viewing
- **State 2 (50u)**: Close-up view for immersive experience

### Audio-Reactive Effects

The visualizer responds to different frequency ranges:
- **Bass**: Affects particle scale and movement intensity
- **Mid**: Controls central sphere pulsing
- **High**: Creates camera shake effects for dynamic viewing

## Project Structure

```
threejs-audio-visualizer-react/
├── src/
│   ├── components/
│   │   ├── audio-visualization/
│   │   │   ├── AudioVisualizer.ts       # Audio analysis
│   │   │   └── AudioReactiveEffects.ts  # Visual effects
│   │   ├── AudioVisualizerDemo.tsx      # Main demo component
│   │   └── AudioVisualizerDemo.css      # Component styles
│   ├── lib/
│   │   └── three/
│   │       ├── SceneManager.ts          # Three.js scene management
│   │       └── ModelLoader.ts           # 3D model loading
│   ├── shaders/
│   │   ├── fresnel.js                   # Fresnel shader
│   │   ├── ChromaticAberrationShader.js # Chromatic aberration
│   │   └── DistortedPixelsShader.js     # Pixel distortion
│   ├── App.tsx                          # Main app component
│   ├── App.css                          # App styles
│   ├── main.tsx                         # React entry point
│   └── index.css                        # Global styles
├── index.html                           # HTML template
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── vite.config.ts                       # Vite config
└── README.md                            # This file
```

## Technologies Used

- **React 18**: UI framework
- **Three.js**: 3D graphics library
- **TypeScript**: Type-safe development
- **Vite**: Build tool and dev server
- **Web Audio API**: Audio analysis and processing

## Browser Compatibility

- Modern browsers with WebGL support
- Audio visualization requires Web Audio API support
- Microphone input requires getUserMedia API support

## Performance Tips

- The visualizer is optimized for 60 FPS
- Particle count can be adjusted for performance (default: 170)
- Post-processing effects can be toggled for better performance

## License

MIT

## Credits

Adapted from the original SvelteKit portfolio project.
