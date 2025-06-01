import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Controls.css';

const Controls = ({
  onGenerate,
  onStart,
  onPause,
  onSpeedChange,
  onReset,
  onArraySizeChange,
  isSorting,
  isPaused,
  speed,
  arraySize
}) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { scale: 1, opacity: 0.5 }
  };

  return (
    <motion.div 
      className="controls"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="control-group">
        <motion.div 
          className="size-control"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="size">Array Size:</label>
          <input
            type="range"
            id="size"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            disabled={isSorting}
          />
          <span>{arraySize}</span>
        </motion.div>
        <motion.button
          className="control-button"
          onClick={onGenerate}
          disabled={isSorting}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate={isSorting ? "disabled" : "initial"}
        >
          Generate Array
        </motion.button>
        <motion.button
          className="control-button"
          onClick={onStart}
          disabled={isSorting || arraySize === 0}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate={(isSorting || arraySize === 0) ? "disabled" : "initial"}
        >
          Start Sorting
        </motion.button>
        {isSorting && (
          <motion.button
            className="control-button"
            onClick={onPause}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </motion.button>
        )}
        <motion.button
          className="control-button"
          onClick={onReset}
          disabled={!isSorting}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate={!isSorting ? "disabled" : "initial"}
        >
          Reset
        </motion.button>
      </div>
      <motion.div 
        className="speed-control"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="speed">Speed:</label>
        <input
          type="range"
          id="speed"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          disabled={isSorting && !isPaused}
        />
        <span>{speed}x</span>
      </motion.div>
    </motion.div>
  );
};

export default Controls; 