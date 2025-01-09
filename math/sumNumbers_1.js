function sumNumbers(queries) {
  const ans = [];
  for (let [a, b] of queries) {
    if (a > b) [a, b] = [b, a]; // swap
    const sumB = b * (b + 1) / 2; // the sum from 1 to b.
    const sumA = (a - 1) * (a - 1 + 1) / 2; // the sum from 1 to a-1.
    ans.push(sumB - sumA);
  }
  return ans;
}

// Example usage:
const queries = [
  [1, 5],
  [5, 1],
  [1, 1],
  [500, 500],
  [1, 500],
  [123, 321]
];

console.log(sumNumbers(queries));
// Output should be: [15, 15, 1, 500, 125250, 44178]
