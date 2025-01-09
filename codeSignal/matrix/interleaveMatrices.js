/*
Your task is to write a function, interleaveMatrices, that takes two matrices (2D arrays)
and a start and end range for rows and columns for each matrix as inputs.
Instead of concatenating submatrices together, this task requires interleaving
the columns from the submatrices within the final matrix.

If A and B are your two matrices, and the respective submatrices selected
from them based on the given ranges are sub_A and sub_B, then the task is to
form a new matrix C by interleaving columns from sub_A and sub_B.
Starting with the first column of sub_A, alternately include a column from sub_A and a column
from sub_B until all columns from both submatrices are included.

All matrices are filled with integers. The size of each matrix, A and B,
ranges between 1x1 and 10x10, inclusive, and each element in the matrix is from
the range of -100 to 100, inclusive. The start and end ranges for rows
and columns for each matrix are provided as an array {start_row, end_row, start_column, end_column},
and these are 1-based indices.

For example, if A is:
[
  [1, 2,  3,  4],
  [5, 6,  7,  8],
  [9, 10, 11, 12]
]
and B is:
[
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19]
]
If we select 2x2 submatrices from each (comprising the 2nd to the 3rd rows and the 2nd to the 3rd columns from A, and the 1st to the 2nd rows and the 1st to the 2nd columns from B), their interleaved combination would look like this:

Plain text
Copy to clipboard
[
  [6,   11, 7,  12],
  [10,  14, 11, 15]
]
Note that in the output, columns from sub_A and sub_B are interwoven.

It is guaranteed that the given submatrices have pairwise equal dimensions.

*/


function interleaveMatrices(matrixA, matrixB, submatrixCoords) {
  const [subA, subB] = submatrixCoords;

  // Extract ranges for matrix A
  const [startRowA, endRowA, startColA, endColA] = subA.map(x => x - 1);
  // Extract ranges for matrix B
  const [startRowB, endRowB, startColB, endColB] = subB.map(x => x - 1);

  // Extract submatrices
  const subMatrixA = matrixA.slice(startRowA, endRowA + 1).map(row => row.slice(startColA, endColA + 1));
  const subMatrixB = matrixB.slice(startRowB, endRowB + 1).map(row => row.slice(startColB, endColB + 1));

  const result = [];
  for (let i = 0; i < subMatrixA.length; i++) {
    const row = [];
    for (let j = 0; j < subMatrixA[0].length; j++) {
      row.push(subMatrixA[i][j]);
      row.push(subMatrixB[i][j]);
    }
    result.push(row);
  }

  return result;
}

// Example usage
const A = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];

const B = [
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19]
];

const submatrixCoords = [ [2, 3, 2, 3], [1, 2, 1, 2] ];

console.log(interleaveMatrices(A, B, submatrixCoords));
// Output:
// [
//    [6, 11, 7, 12],
//    [10, 14, 11, 15]
// ]
