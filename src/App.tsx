import AudioVisualizerDemo from './components/AudioVisualizerDemo';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <AudioVisualizerDemo />
      </div>
    </ErrorBoundary>
  );
}

export default App;
