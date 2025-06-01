import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SortingVisualizer.css';

const SortingVisualizer = ({ array, steps }) => {
  const getBarColor = (index) => {
    if (!array.length || !steps.length) return 'var(--bar-default)';
    
    const currentStep = steps[0];
    if (currentStep.indices.includes(index)) {
      switch (currentStep.type) {
        case 'compare':
          return 'var(--bar-comparing)';
        case 'swap':
        case 'overwrite':
          return 'var(--bar-swapping)';
        default:
          return 'var(--bar-default)';
      }
    }
    return 'var(--bar-default)';
  };

  if (!array.length) {
    return (
      <motion.div 
        className="sorting-visualizer empty"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p>Generate an array to start visualizing</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="sorting-visualizer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {array.map((value, index) => (
          <motion.div
            key={index}
            className="bar"
            style={{
              height: `${(value / 100) * 100}%`,
              backgroundColor: getBarColor(index)
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.01
            }}
            whileHover={{
              scaleY: 1.02,
              transition: { duration: 0.2 }
            }}
            title={`Value: ${value}`}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default SortingVisualizer; 