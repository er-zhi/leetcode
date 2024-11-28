const memo = [0, 0, 1, 1];

// 5 -> 4
// 7 -> 13
const tribonacci = (n) => {
  if (n < 4) return memo[n]; // Return precomputed values for n < 5
  if (memo[n]) return memo[n]; // Return cached result if available

  const result = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3); // Recursive calculation
  memo[n] = result; // Cache the result

  return result;
};

const n = 2;
console.log(`tribonacci(${n}): ${tribonacci(n)}`);
