function findChocPairs(sweetness) {
  sweetness.sort((a, b) => a - b);
  const ans = [];
  let left = 0, right = sweetness.length - 1;
  while ( left < right) {
    const sum = sweetness[left] + sweetness[right];
    if (sum === 0) {
      const abs = Math.abs(sweetness[left]);
      ans.push([abs, -abs]);
      left++;
      right--;
    }
    else if (sum < 0) {
      left++;
    } else  {
      right--;
    }
  }
  return ans.sort((a, b) => a[0] - b[0]) ;
}

// Example usage
let sweetness = [4, 3, -5, 5, -3, -4];
let result = findChocPairs(sweetness);
console.log(result); // Expected Output: [ [ 3, -3 ], [ 4, -4 ], [ 5, -5 ] ]

/*
You have n types of chocolates, where n ranges from 1 to 200000.
Each type has a sweetness level between -100000 and 100000. Using the two-pointer algorithm,
identify all pairs of chocolates whose sweetness levels sum to zero.

Each pair should be presented in decreasing order of sweetness levels,
and all pairs should be sorted in increasing order by the first element in the pair.

Write a function findChocPairs(sweetness) that takes an array of n integers (sweetness levels)
and returns an array of pairs whose sweetness levels sum up to zero, sorted as specified.

For example, given [4, 3, -5, 5, -3, -4], the function should return [[3, -3], [4, -4], [5, -5]].

If there are no pairs, return an empty array.
 */
