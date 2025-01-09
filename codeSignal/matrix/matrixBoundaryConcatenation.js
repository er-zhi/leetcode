/*
Welcome, JavaScript enthusiast! You're about to embark on an exciting journey of extracting
and merging matrix boundary layers. Your mission is to create a JavaScript function named
matrixBoundaryConcatenation(). This function will receive two square 2D arrays, matrixA
and matrixB, along with an integer, n, representing the number of boundary layers to extract from each matrix.

Each boundary layer is composed of the elements forming the outer contour of the matrix.
For example, in the 4x4 matrix below, the first boundary layer consists of the
elements 1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, and 5:

1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16
Your function should extract the first n boundary layers from both matrixA and matrixB.
These layers from matrixA should be concatenated to those from matrixB in a single array.

Below is an example to guide you:

Consider the following input:
let matrixA = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

let matrixB = [
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [25, 26, 27, 28],
    [29, 30, 31, 32]
];

let n = 2;
Calling matrixBoundaryConcatenation(matrixA, matrixB, n) should return:

JavaScript
Copy to clipboard
[
    1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10,
    17, 18, 19, 20, 24, 28, 32, 31, 30, 29, 25, 21, 22, 23, 27, 26
]
This outcome is derived by extracting and concatenating the first n boundary layers from both matrices.

Good luck and happy coding!
*/

function matrixBoundaryConcatenation(matrixA, matrixB, n) {
  const extractBoundaryLayers = (matrix, layers) => {
    const boundaries = [];
    const size = matrix.length;

    for (let layer = 0; layer < layers; layer++) {
      const layerElements = [];
      let minR = layer, maxR = size - 1 - layer;
      let minC = layer, maxC = size - 1 - layer;

      // Traverse top row
      for (let c = minC; c <= maxC; c++) layerElements.push(matrix[minR][c]);

      // Traverse right column
      for (let r = minR + 1; r <= maxR; r++) layerElements.push(matrix[r][maxC]);

      // Traverse bottom row (if it's not the same as the top row)
      if (minR !== maxR) {
        for (let c = maxC - 1; c >= minC; c--) layerElements.push(matrix[maxR][c]);
      }

      // Traverse left column (if it's not the same as the right column)
      if (minC !== maxC) {
        for (let r = maxR - 1; r > minR; r--) layerElements.push(matrix[r][minC]);
      }

      boundaries.push(...layerElements);
    }

    return boundaries;
  };

  // Extract n boundary layers from each matrix
  const boundariesA = extractBoundaryLayers(matrixA, n);
  const boundariesB = extractBoundaryLayers(matrixB, n);

  // Concatenate and return
  return [...boundariesA, ...boundariesB];
}

// Example function calls
let matrixA = [
  [1,  2,  3,  4 ],
  [5,  6,  7,  8 ],
  [9,  10, 11, 12],
  [13, 14, 15, 16]
];

let matrixB = [
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [25, 26, 27, 28],
  [29, 30, 31, 32]
];

let n = 2;
console.log(matrixBoundaryConcatenation(matrixA, matrixB, n));
// Expected output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10, 17, 18, 19, 20, 24, 28, 32, 31, 30, 29, 25, 21, 22, 23, 27, 26]
