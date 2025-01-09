/*
A innovator in mathematical problems challenges you to a fascinating task involving
matrix manipulation. You'll be working with a 2D array, M, with dimensions ranging
from 1x1 to 500x500. Each element in the matrix can range from -100 to 100.

Your task is to write a JavaScript function, submatrixSwap(),
which takes a matrix M and coordinates describing two sub-matrices,
S1 and S2. The function needs to swap the positions of these sub-matrices within M and return the newly formed matrix.

Here's what you need to take care of:

The sub-matrices should not overlap.
S1 and S2 must have the same dimensions.
Each sub-matrix is defined by four coordinates: {row_l, row_r, col_l, col_r}.
Example

Consider the matrix M:

JavaScript
Copy to clipboard
let M = [
    [ 1,  2,  3,  4,  5],
    [ 6,  7,  8,  9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
];
Given S1 coordinates [0, 2, 2, 4] and S2 coordinates [2, 4, 0, 2],
your function submatrixSwap(M, [0, 2, 2, 4], [2, 4, 0, 2]) should return:

JavaScript
Copy to clipboard
let expected = [
    [1,  2,  11, 12,  5],
    [6,  7,  16, 17, 10],
    [3,  4,  13, 14, 15],
    [8,  9,  18, 19, 20],
    [21, 22, 23, 24, 25]
];*/


function submatrixSwap(matrix, coord_S1, coord_S2) {
  const [r1_start, r1_end, c1_start, c1_end] = coord_S1;
  const [r2_start, r2_end, c2_start, c2_end] = coord_S2;

  // Validate that the submatrices have the same dimensions
  if ((r1_end - r1_start !== r2_end - r2_start) || (c1_end - c1_start !== c2_end - c2_start)) {
    throw new Error("Submatrices must have the same dimensions");
  }

  // Clone the matrix to avoid modifying the original
  const result = matrix.map(row => [...row]);

  // Calculate the dimensions of the submatrices
  const rows = r1_end - r1_start + 1;
  const cols = c1_end - c1_start + 1;

  // Perform the swap
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const temp = result[r1_start + i][c1_start + j];
      result[r1_start + i][c1_start + j] = result[r2_start + i][c2_start + j];
      result[r2_start + i][c2_start + j] = temp;
    }
  }

  return result;
}

let M = [
  [ 1,  2,  3,  4,  5],
  [ 6,  7,  8,  9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25]
];

let coordS1 = [0, 2, 2, 4];
let coordS2 = [2, 4, 0, 2];

let result = submatrixSwap(M, coordS1, coordS2);
console.log(result);
