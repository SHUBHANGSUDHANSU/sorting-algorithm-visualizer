import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatTime } from '../utils/helpers';
import '../styles/MetricsPanel.css';

const MetricsPanel = ({ metrics, isSorting }) => {
  const { comparisons, swaps, elapsedMs } = metrics;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="metrics-panel"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 variants={itemVariants}>Metrics</motion.h3>
      <motion.div className="metrics" variants={containerVariants}>
        <motion.div className="metric" variants={itemVariants}>
          <span className="metric-label">Comparisons:</span>
          <motion.span 
            className="metric-value"
            key={comparisons}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {comparisons}
          </motion.span>
        </motion.div>
        <motion.div className="metric" variants={itemVariants}>
          <span className="metric-label">Swaps:</span>
          <motion.span 
            className="metric-value"
            key={swaps}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {swaps}
          </motion.span>
        </motion.div>
        <motion.div className="metric" variants={itemVariants}>
          <span className="metric-label">Time:</span>
          <motion.span 
            className="metric-value"
            key={elapsedMs}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {formatTime(elapsedMs)}
          </motion.span>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {!isSorting && comparisons > 0 && (
          <motion.div 
            className="sorting-complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            Sorting complete!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MetricsPanel; 