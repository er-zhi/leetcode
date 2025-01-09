/*
Welcome to this exciting challenge! Your mission involves traversing a matrix in a unique zigzag pattern
and detecting prime numbers. Let's break it down:

You are given a n x n matrix (ranging from 1 x 1 to 10 x 10) filled with integers between
1 and 100. Your task is to:

Start from the top-left corner and move right until you hit the top-right corner.
Move down one cell and start moving left until you hit the left boundary.
Move down one cell and start moving right again.
Continue this zigzag pattern until every cell is traversed.
Once you've traversed the matrix, gather the list of cell values collected
during your traversal. Next, identify which of these values are prime numbers
and determine their 1-indexed positions in the list.

Your function, zigzagTraverseAndPrimes(matrix), should return an object with
indices as keys and the corresponding prime numbers as values.
*/


function zigzagTraverseAndPrimes(matrix) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  let traversal = {};
  let index = 1;
  let row = 0, col = 0, moveRight = true;

  function isPrime(n) {
    if (n <= 1) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    let sqrt = Math.floor(Math.sqrt(n)) + 1;
    for (let i = 3; i < sqrt; i += 2) {
      if (n % i == 0) return false;
    }
    return true;
  }

  while (index < rows * cols) {
    // right [0,0] -> [0, n-1]
    for (; col < cols; col++) {
      if (isPrime(matrix[row][col]))
        traversal[index] = matrix[row][col];
      index++;
    }
    // step down
    row++;
    col--; // fix out bond

    // left
    for (; col >= 0; col--) {
      if (isPrime(matrix[row][col]))
        traversal[index] = matrix[row][col];
      index++;
    }
    // step down
    row++;
    col++; // fix out bond

  }
  return traversal;
}

const matrix = [
  [10, 11,  4,  3],
  [ 6,  7, 15, 13],
  [ 8, 14,  1,  2],
  [ 5,  9, 12, 19]
];

console.log(zigzagTraverseAndPrimes(matrix));
// Expected output: {2: 11, 4: 3, 5: 13, 7: 7, 12: 2, 13: 19, 16: 5}
