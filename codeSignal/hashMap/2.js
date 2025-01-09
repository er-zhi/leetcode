function findIndices(arrA, arrB) {
  const diffMap = new Map();

  for (let i = 0; i < arrA.length; i++) {
    const diff = arrA[i] - arrB[i];
    if (diffMap.has(diff)) {
      const j = diffMap.get(diff);
      return [j, i]; // Found a match!
    } else {
      diffMap.set(-diff, i); // Store the negative difference and its index
    }
  }

  return []; // No matching pairs found
}

// Example usage:
console.log(findIndices([2, 5, 1, 4], [3, 6, 3, 2])); // Output: [2, 3]
