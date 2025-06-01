/**
 * Generates a random array of integers
 * @param {number} length - The length of the array to generate
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number[]} Array of random integers
 */
export const generateRandomArray = (length, min = 1, max = 100) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

/**
 * Creates a deep copy of an array
 * @param {Array} array - The array to copy
 * @returns {Array} Deep copy of the input array
 */
export const deepCopy = (array) => {
  return JSON.parse(JSON.stringify(array));
};

/**
 * Formats milliseconds into a human-readable time string
 * @param {number} ms - Time in milliseconds
 * @returns {string} Formatted time string
 */
export const formatTime = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}; 