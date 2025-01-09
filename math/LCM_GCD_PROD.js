/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function(nums) {
  function gcd(a, b) {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  function arrGCD(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
      result = gcd(result, arr[i]);
    }
    return result;
  }

  function arrLCM(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
      result = lcm(result, arr[i]);
    }
    return result;
  }

  function arrProd(arr) {
    let product = 1;
    for (const num of arr) {
      product *= num;
    }
    return product;
  }

  let maxLen = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const subarray = nums.slice(i, j + 1);
      if (subarray.length > 0) {
        const prod = arrProd(subarray);
        const gcdVal = arrGCD(subarray);
        const lcmVal = arrLCM(subarray);

        if (prod === lcmVal * gcdVal) {
          maxLen = Math.max(maxLen, subarray.length);
        }
      }
    }
  }
  return maxLen;
};

/* You are given an array of positive integers nums.

An array arr is called product equivalent if prod(arr) == lcm(arr) * gcd(arr), where:

prod(arr) is the product of all elements of arr.
gcd(arr) is the GCD of all elements of arr.
lcm(arr) is the LCM of all elements of arr.
Return the length of the longest product equivalent subarray of nums.

A subarray is a contiguous non-empty sequence of elements within an array.

The term gcd(a, b) denotes the greatest common divisor of a and b.

The term lcm(a, b) denotes the least common multiple of a and b.

 

Example 1:

Input: nums = [1,2,1,2,1,1,1]

Output: 5

Explanation: 

The longest product equivalent subarray is [1, 2, 1, 1, 1], where prod([1, 2, 1, 1, 1]) = 2, gcd([1, 2, 1, 1, 1]) = 1, and lcm([1, 2, 1, 1, 1]) = 2.

Example 2:

Input: nums = [2,3,4,5,6]

Output: 3

Explanation:

The longest product equivalent subarray is [3, 4, 5].

Example 3:

Input: nums = [1,2,3,1,4,5,1]

Output: 5

Constraints:

2 <= nums.length <= 100
1 <= nums[i] <= 10
 */
