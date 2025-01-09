function binarySearchIndex(arr, value) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < value) {
      left = mid + 1;
    } else if (arr[mid] > value) {
      right = mid - 1;
    } else {
      return mid; // Value found
    }
  }

  return left; // Appropriate insert position
}
function processQueries(queries) {
  const result = [];
  const sortedList = [];

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    const insertPosition = binarySearchIndex(sortedList, query);
    sortedList.splice(insertPosition, 0, query);

    if (sortedList.length < 2) {
      result.push(-1);
    } else {
      let minDiff = Infinity;
      for (let j = 1; j < sortedList.length; j++) {
        minDiff = Math.min(minDiff, sortedList[j] - sortedList[j - 1]);
      }
      result.push(minDiff);
    }
  }

  return result;
}
// Example usage
const queries = [3, 9, 5, 1, 8]; // -> [1, 3, 5, 8, 9];
console.log(processQueries(queries)); // [-1, 6, 2, 2, 1].
