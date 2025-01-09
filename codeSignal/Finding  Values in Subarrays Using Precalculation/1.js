function queryMin(arr, Ls, Rs) {
  const n = arr.length;
  const precalc = Array.from({ length: n }, () => Array(n).fill(0));
  for (let l = 0; l < n; ++l) {
    let minVal = arr[l];
    for (let r = l; r < n; ++r) {
      minVal = Math.min(minVal, arr[r]);
      precalc[l][r] = minVal;
    }
  }
  const res = [];

  for (let i = 0; i < Ls.length; ++i) {
    const l = Ls[i];
    const r = Rs[i];
    res.push(precalc[l][r]);
  }

  return res;
}

const arr = [2, 1, 3, 7, 5];
const Ls = [0, 2, 4];
const Rs = [1, 3, 4];

const result = queryMin(arr, Ls, Rs);

console.log(result); // Output: [ 1, 3, 5 ]
