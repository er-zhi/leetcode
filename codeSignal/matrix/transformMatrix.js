/*
  [
    [10, 11, 12],
    [20, 21, 22],
  ]
    convert to
  [
    [10 20],
    [11 21],
    [12 22],
  ]
 */

function transposeSeating(seating) {
  let rows = seating.length;
  let cols = rows > 0 ? seating[0].length : 0;
  let transposed = [];

  for (let i = 0; i < cols; ++i) {
    transposed[i] = [];
    for (let j = 0; j < rows; ++j) {
      transposed[i][j] = seating[j][i];
    }
  }

  return transposed;
}

// Sample restaurant seating arrangement represented as a 2D array
let restaurantSeating = [
  [10, 11, 12],
  [20, 21, 22]
];

// Trying to transpose the seating arrangement
let transposedSeating = transposeSeating(restaurantSeating);

for (let row of transposedSeating) {
  console.log(row.join(' '));
}
// Output isn't as expected. Can you identify the fix?
