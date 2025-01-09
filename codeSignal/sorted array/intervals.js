function solution(intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];

  // Helper function for checking intersection
  const checkIntersection = (min, max) => {
    let left = 0, right = intervals.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const [start, end] = intervals[mid];
      if (start <= max && end >= min) return true;
      if (end < min) left = mid + 1;
      else right = mid - 1;
    }
    return false;
  };

  // Process each query
  for (const [type, min, max] of queries) {
    if (type === 0) {
      // Query type 0: Check for intersection
      result.push(checkIntersection(min, max) ? 1 : 0);
    } else if (type === 1) {
      // Query type 1: Remove the interval
      const index = intervals.findIndex(([start, end]) => start === min && end === max);
      if (index !== -1) {
        intervals.splice(index, 1); // Remove the interval
      }
      result.push(intervals.length); // Return the current number of intervals
    }
  }

  return result;
}

// Example usage
const intervals = [[1, 3], [5, 7], [9, 11]];
const queries = [[0, 2, 6], [1, 5, 7], [0, 4, 6]];
console.log(solution(intervals, queries)); // [1, 2, 0]
