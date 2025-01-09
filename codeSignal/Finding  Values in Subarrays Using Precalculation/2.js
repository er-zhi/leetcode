// maximum cumulative sum of integers between the indices l and r
function solution(arr, queries) {
  const n = arr.length;
  const precalc = Array.from({length: n}, () => Array(n).fill(0));

  for(let l = 0; l < n; ++l) {
    let maxVal = -Infinity;
    let sum = 0;
    for (let r = l; r < n; ++r) {
      sum += arr[r];
      maxVal = Math.max(maxVal, sum);
      precalc[l][r] = maxVal;
    }
  }

  const res = [];

  for (const [l, r] of queries) {
    res.push(precalc[l][r]);
  }
  return res;
}

// Example usage
const arr = [3, 1, -4, 2, -5, 1, 3, 6];
const queries = [[0, 4], [2, 6], [2, 7]];
console.log(solution(arr, queries)); // [ 4, -2, 3 ]

