import PantheonDemo from './components/PantheonDemo';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <PantheonDemo />
      </div>
    </ErrorBoundary>
  );
}

export default App;
