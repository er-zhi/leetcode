function solution(arr) {
  const freqMap = new Map();
  arr.forEach(num => freqMap.set(num, (freqMap.get(num) || 0) + 1));
  let pairs = 0;
  for (const num of freqMap.keys()) {
    const count = freqMap.get(num);
    pairs += count * (count - 1) / 2;
  }
  return pairs;
}

// Example usage
const arr = [1, 1, 2, 2, 1, 3];
console.log(solution(arr)); // 4
/*
Write a JavaScript function named solution that calculates the number of pairs of elements in an array that have
the same value. The function takes one parameter — an array of integers arr and should return
an integer representing the number of pairs with equal values. An array can contain
up to 100 elements, each being an integer ranging from -100 to 100, inclusive.

Constraints:

The solution should execute within 200 milliseconds for all inputs within the problem constraints.
To achieve this, avoid using a brute force approach with a nested for-loop.
The program should have a time complexity of O(n).
Example: For arr = [1, 1, 2, 2, 1, 3], you should make sure the function returns 4.
The reason being that there are three pairs of equal values (1, 1) and one pair (2, 2).
 */
