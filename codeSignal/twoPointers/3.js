function getLongestSubarray(array, k) {
  let maxLen = 0, maxStart = 0;  // Variables to store the result (length and start index)
  let slow = 0, fast = 0;        // Slow and fast pointers for the sliding window
  let currSum = 0;               // Current sum of the window

  while (fast < array.length) {
    // Expand the window by moving 'fast' pointer and adding its value to currSum
    currSum += array[fast++];

    // Shrink the window from the left if currSum exceeds k
    while (slow < fast && currSum > k) {
      currSum -= array[slow++];
    }

    // If currSum equals k, check if it's the longest subarray found so far
    if (currSum === k) {
      if (maxLen < fast - slow) {
        maxLen = fast - slow;
        maxStart = slow;
      }
    }
  }

  // Return the longest subarray found
  return array.slice(maxStart, maxStart + maxLen);
}

// Example usage:
let array = [1, 2, 3, 4, 5];
let k = 5;
let result = getLongestSubarray(array, k);
console.log(result); // Expected output: [2, 3]


/*
You are given an array of n positive integers, where n ranges from 1 to 500000,
inclusive, and each number in the array is between 1 and 1000.
Your task is to find the longest subarray such that the sum of its elements equals a predetermined number, k.

You have to write a JavaScript function getLongestSubarray that will receive the array of integers,
array, and the predetermined number, k, as inputs, and will return an array representing
the longest subarray whose sum of elements equals k. The length of the LongestSubarray should be maximized.

If no such subarray is found, the function should return an empty array.
If there are multiple longest subarrays with a sum equal to k, return the one that occurs earlier.

For example, if the given array is [1, 2, 3, 4, 5] and k is 5,
the function should return [2, 3] because this subarray is the longest that sums up to the k value.

When solving this task, you can use a two-pointer technique
where both pointers move towards the right. This approach will help to solve
the task using linear time complexity, achieving the expected time complexity of O(n).
Try to construct your solution keeping these key points in mind; your solution should be both efficient and effective.
 */
