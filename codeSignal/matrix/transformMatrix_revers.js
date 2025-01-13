function transformMatrix(matrix) {
  let rows = matrix.length;
  let cols = rows > 0 ? matrix[0].length : 0;
  let result = [];

  // Transpose the matrix in reverse order
  for (let i = 0; i < cols; i++) {
    result[i] = [];
    for (let j = 0; j < rows; j++) {
      result[i][j] = matrix[rows - j - 1][cols - i - 1];
    }
  }

  return result;
}

let matrix = [
  [101, 102, 103, 104],
  [201, 202, 203, 204],
  [301, 302, 303, 304]
];

/*
304 204 104
303 203 103
302 202 102
301 201 101
 */

// Store the result of transformMatrix in transposedMatrix and print it
let transposedMatrix = transformMatrix(matrix);

// Print the result
for (let row of transposedMatrix) {
  console.log(row.join(' '));
}
