function processQueries(queries) {
  const sortedSet = [];
  const results = [];

  for (const query of queries) {
    const operation = query[0];
    const value = query[1];

    if (operation === 0) {
      const index = binarySearchIndex(sortedSet, value);
      sortedSet.splice(index, 0, value);
      results.push(sortedSet.length);
    } else if (operation === 1) {
      const index = binarySearchIndex(sortedSet, value);
      if (index !== sortedSet.length && sortedSet[index] === value) {
        sortedSet.splice(index, 1);
      }
      results.push(sortedSet.length);
    } else if (operation === 2) {
      let left = 0;
      let right = sortedSet.length - 1;
      let result = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedSet[mid] >= value) {
          result = sortedSet[mid];
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }

      results.push(result);
    }
  }
  return results;
}

// Example usage
const queries = [
  [0, 10],
  [2, 10],
  [0, 20],
  [1, 10],
  [2, 10]
];

console.log(processQueries(queries)); // Output: [1, 10, 2, 1, 20]
