import React from 'react';
import '../styles/AlgorithmSelector.css';

const algorithms = [
  { id: 'bubbleSort', name: 'Bubble Sort' },
  { id: 'selectionSort', name: 'Selection Sort' },
  { id: 'insertionSort', name: 'Insertion Sort' },
  { id: 'mergeSort', name: 'Merge Sort' },
  { id: 'quickSort', name: 'Quick Sort' }
];

const AlgorithmSelector = ({ selectedAlgorithm, onSelectAlgorithm }) => {
  return (
    <div className="algorithm-selector">
      <h3>Select Algorithm</h3>
      <div className="algorithm-buttons">
        {algorithms.map(algorithm => (
          <button
            key={algorithm.id}
            className={`algorithm-button ${selectedAlgorithm === algorithm.id ? 'selected' : ''}`}
            onClick={() => onSelectAlgorithm(algorithm.id)}
          >
            {algorithm.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector; 