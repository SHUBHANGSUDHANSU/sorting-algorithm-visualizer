/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export const bubbleSort = (array) => {
  const steps = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        arraySnapshot: [...arr]
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          arraySnapshot: [...arr]
        });
      }
    }
  }

  return steps;
};

/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export const selectionSort = (array) => {
  const steps = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: 'compare',
        indices: [minIdx, j],
        arraySnapshot: [...arr]
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        type: 'swap',
        indices: [i, minIdx],
        arraySnapshot: [...arr]
      });
    }
  }

  return steps;
};

/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export const insertionSort = (array) => {
  const steps = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      steps.push({
        type: 'compare',
        indices: [j, i],
        arraySnapshot: [...arr]
      });

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        steps.push({
          type: 'overwrite',
          indices: [j + 1, j],
          arraySnapshot: [...arr]
        });
        j--;
      } else {
        break;
      }
    }
    arr[j + 1] = key;
    steps.push({
      type: 'overwrite',
      indices: [j + 1, i],
      arraySnapshot: [...arr]
    });
  }

  return steps;
};

/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export const mergeSort = (array) => {
  const steps = [];
  const arr = [...array];

  const merge = (left, right, startIdx) => {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      steps.push({
        type: 'compare',
        indices: [startIdx + i, startIdx + left.length + j],
        arraySnapshot: [...arr]
      });

      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    while (i < left.length) {
      result.push(left[i]);
      i++;
    }

    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    for (let k = 0; k < result.length; k++) {
      arr[startIdx + k] = result[k];
      steps.push({
        type: 'overwrite',
        indices: [startIdx + k],
        arraySnapshot: [...arr]
      });
    }
  };

  const sort = (start, end) => {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);
    sort(start, mid);
    sort(mid, end);
    merge(arr.slice(start, mid), arr.slice(mid, end), start);
  };

  sort(0, arr.length);
  return steps;
};

/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst
 * Space Complexity: O(log n)
 */
export const quickSort = (array) => {
  const steps = [];
  const arr = [...array];

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        type: 'compare',
        indices: [j, high],
        arraySnapshot: [...arr]
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          type: 'swap',
          indices: [i, j],
          arraySnapshot: [...arr]
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      type: 'swap',
      indices: [i + 1, high],
      arraySnapshot: [...arr]
    });

    return i + 1;
  };

  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  sort(0, arr.length - 1);
  return steps;
}; 