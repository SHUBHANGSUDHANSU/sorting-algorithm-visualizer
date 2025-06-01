# Sorting Algorithm Visualizer

A React.js application that visualizes and analyzes common sorting algorithms in real-time. Watch as different sorting algorithms work their magic on randomly generated arrays, with detailed metrics and beautiful animations.

## Features

- Visualize 5 different sorting algorithms:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
- Real-time metrics tracking:
  - Number of comparisons
  - Number of swaps
  - Elapsed time
- Interactive controls:
  - Generate new random arrays
  - Adjust animation speed
  - Pause/Resume sorting
  - Reset visualization
- Responsive design that works on desktop and mobile devices

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sorting-analyzer.git
cd sorting-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Select a sorting algorithm from the available options
2. Click "Generate Array" to create a new random array
3. Click "Start Sorting" to begin the visualization
4. Use the speed slider to adjust the animation speed
5. Click "Pause" to pause the visualization at any time
6. Click "Reset" to stop and reset the visualization

## Project Structure

```
src/
  ├── components/          # React components
  │   ├── AlgorithmSelector.jsx
  │   ├── Controls.jsx
  │   ├── MetricsPanel.jsx
  │   └── SortingVisualizer.jsx
  ├── services/           # Business logic
  │   └── sortingAlgorithms.js
  ├── styles/            # CSS files
  │   ├── App.css
  │   ├── AlgorithmSelector.css
  │   ├── Controls.css
  │   ├── MetricsPanel.css
  │   └── SortingVisualizer.css
  ├── utils/             # Helper functions
  │   └── helpers.js
  ├── App.jsx           # Main application component
  └── main.jsx         # Application entry point
```

## Technologies Used

- React.js
- Vite
- CSS3 with CSS Variables
- Modern JavaScript (ES6+)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 