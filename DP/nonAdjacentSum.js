const memo = [];

const helper = (nums, i) => {
  if(i >= nums.length) return 0;

  if (memo[i] !== undefined) return memo[i];

  const result = Math.max(
    nums[i] + helper(nums, i+2),
    helper(nums, i+1)
  );

  memo[i] = result;
  return result;
};

const nonAdjacentSum = nums => helper(nums, 0);


const nums= [2, 4, 5, 12, 7];

// The maximum non-adjacent sum is 16, because 4 + 12.
// 4 and 12 are not adjacent in the array.
nonAdjacentSum(nums); // 16

/*
Example: nums = [7, 5, 5, 12]
1. Initial call: nonAdjacentSum(nums)
   - Clears the memo and starts helper(nums, 0).

2. Call Stack Breakdown:
   - helper(nums, 0):
     - Includes 7 -> helper(nums, 2)
     - Skips 7 -> helper(nums, 1)

   - helper(nums, 2):
     - Includes 5 -> helper(nums, 4) -> Base case (returns 0)
     - Skips 5 -> helper(nums, 3)

   - helper(nums, 1):
     - Includes 5 -> helper(nums, 3)
     - Skips 5 -> helper(nums, 2) -> Uses memoized result.

   - helper(nums, 3):
     - Includes 12 -> helper(nums, 5) -> Base case (returns 0)
     - Skips 12 -> helper(nums, 4) -> Base case (returns 0)

3. Memoization State:
   - After all recursive calls:
     memo = [19, 17, 12, 12]

4. Final Result:
   - nonAdjacentSum(nums) = 19 (7 + 12)

Call Stack at Different Stages:
- helper(nums, 0): Calls helper(nums, 2) and helper(nums, 1)
- helper(nums, 2): Calls helper(nums, 4) and helper(nums, 3)
- helper(nums, 3): Calls helper(nums, 5) and helper(nums, 4)

Memoization minimizes redundant calculations, ensuring efficiency.
*/
