function numDivisors(n) {
  let count = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      count += (i * i === n) ? 1 : 2;
    }
  }
  return count;
}

function closestPerfectSquareDivisors(arr) {
  const maxVal = 10_000; // Maximum value of arr[i]
  const perfectSquares = [];
  const divisorCounts = new Map();

  // Precompute perfect squares and their divisor counts
  for (let i = 1; i * i <= maxVal; i++) {
    const square = i * i;
    perfectSquares.push(square);
    divisorCounts.set(square, numDivisors(square));
  }

  const result = [];

  // Map each number to the closest perfect square and fetch the divisor count
  for (const num of arr) {
    let closestSquare = perfectSquares[0];
    let minDiff = Math.abs(num - closestSquare);

    for (const square of perfectSquares) {
      const diff = Math.abs(num - square);
      if (diff < minDiff) {
        closestSquare = square;
        minDiff = diff;
      } else if (diff === minDiff && square < closestSquare) {
        closestSquare = square;
      }
    }

    result.push(divisorCounts.get(closestSquare));
  }

  return result;
}

// Example usage:
const arr = [7, 17, 20, 7, 3];
console.log(closestPerfectSquareDivisors(arr)); // [3, 5, 5, 3, 3].

/*
You are given an array of n integers. Your task is to return an array in which
the i-th element of the array is the number of divisors of the closest perfect square
to the i-th integer in the input array. The "closest" perfect square to a number x is
defined as the perfect square that is nearest to x in terms of the smallest absolute distance.

Please note that you are expected to solve this problem within 100 milliseconds.

Constraints:

1≤ n ≤100000
1≤arr[i]≤10000
The program should have a time complexity of O(n * sqrt(m)), where n is the number
of integers in the input and m is the maximum value in the array.
Example: For arr = [7, 17, 20, 7, 3], the output should be [3, 5, 5, 3, 3].

For arr[0] = 7, the closest perfect square is 9, which has 3 divisors - [1, 3, 9].
For arr[1] = 17, the closest perfect square is 16, which has 5 divisors - [1, 2, 4, 8, 16].
For arr[2] = 20, the closest perfect square is 16, which has 5 divisors.
For arr[3] = 7, the closest perfect square is 9, which has 3 divisors.
For arr[4] = 3, the closest perfect square is 4, which has 3 divisors - [1, 2, 4].
*/
