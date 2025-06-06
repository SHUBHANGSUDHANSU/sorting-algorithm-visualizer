import { useState, useEffect, useRef } from 'react';
import SortingVisualizer from './components/SortingVisualizer';
import AlgorithmSelector from './components/AlgorithmSelector';
import Controls from './components/Controls';
import MetricsPanel from './components/MetricsPanel';
import { generateRandomArray } from './utils/helpers';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from './services/sortingAlgorithms';
import './styles/App.css';

const sortingAlgorithms = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort
};

function App() {
  const [rawArray, setRawArray] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [steps, setSteps] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0, elapsedMs: 0 });
  const [arraySize, setArraySize] = useState(50);
  const [theme, setTheme] = useState('light');
  const startTimeRef = useRef(null);

  const generateNewArray = (length) => {
    const newArray = generateRandomArray(length);
    setRawArray(newArray);
    setCurrentArray([...newArray]);
    setSteps([]);
    setIsSorting(false);
    setIsPaused(false);
    setMetrics({ comparisons: 0, swaps: 0, elapsedMs: 0 });
  };

  const startSorting = () => {
    if (isSorting || rawArray.length === 0) return;
    
    startTimeRef.current = performance.now();
    const arrayCopy = [...rawArray];
    const sortingSteps = sortingAlgorithms[algorithm](arrayCopy);
    
    setSteps(sortingSteps);
    setIsSorting(true);
    setIsPaused(false);
    setMetrics({ comparisons: 0, swaps: 0, elapsedMs: 0 });
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const handleReset = () => {
    setCurrentArray([...rawArray]);
    setSteps([]);
    setIsSorting(false);
    setIsPaused(false);
    setMetrics({ comparisons: 0, swaps: 0, elapsedMs: 0 });
  };

  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize);
    generateNewArray(newSize);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (!isSorting || isPaused || steps.length === 0) return;

    const step = steps[0];
    const delay = 1000 / speed;

    const timer = setTimeout(() => {
      setCurrentArray(step.arraySnapshot);
      setMetrics(prev => ({
        comparisons: prev.comparisons + (step.type === 'compare' ? 1 : 0),
        swaps: prev.swaps + (step.type === 'swap' ? 1 : 0),
        elapsedMs: performance.now() - startTimeRef.current
      }));
      setSteps(prev => prev.slice(1));

      if (steps.length === 1) {
        setIsSorting(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isSorting, isPaused, steps, speed]);

  // Generate initial array
  useEffect(() => {
    generateNewArray(arraySize);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <>
      <div className="app">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? (
            <svg viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
          )}
        </button>
        <h1>Sorting Algorithm Visualizer</h1>
        <div className="controls-container">
          <AlgorithmSelector
            selectedAlgorithm={algorithm}
            onSelectAlgorithm={setAlgorithm}
          />
          <Controls
            onGenerate={() => generateNewArray(arraySize)}
            onStart={startSorting}
            onPause={handlePauseResume}
            onSpeedChange={handleSpeedChange}
            onReset={handleReset}
            onArraySizeChange={handleArraySizeChange}
            isSorting={isSorting}
            isPaused={isPaused}
            speed={speed}
            arraySize={arraySize}
          />
        </div>
        <div className="visualization-container">
          <SortingVisualizer
            array={currentArray}
            steps={steps}
          />
          <MetricsPanel
            metrics={metrics}
            isSorting={isSorting}
          />
        </div>
      </div>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Sorting Algorithm Visualizer. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App; 