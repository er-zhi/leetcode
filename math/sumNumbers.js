function sumNumbers(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

function sumNumbers1(n) {
  return n * (n + 1) / 2;
}

const result = sumNumbers(1000000);
const result1 = sumNumbers1(1000000);
console.log("Sum: " + result1);

