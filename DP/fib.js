const memo = [0, 1, 1];

const fib = n => {
  if(n < 3) return memo[n];
  if(memo[n]) return memo[n];

  const result = fib(n-1) + fib(n-2);
  memo[n] = result;

  return result;
};

const fib2 = (n) => {
  const memo = [0, 1, 1]; // Base cases for memoization

  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
};
// Measure time for fib
let start = performance.now();
const result1 = fib(200);
let end = performance.now();
console.log(`fib(200): ${result1}, Time taken: ${(end - start).toFixed(4)} ms`);

// Measure time for fib2
start = performance.now();
const result2 = fib2(200);
end = performance.now();
console.log(`fib2(200): ${result2}, Time taken: ${(end - start).toFixed(4)} ms`);
