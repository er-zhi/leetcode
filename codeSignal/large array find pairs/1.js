function solution(arr) {
  arr.sort((a, b) => a - b);
  let pairs = 0;
  let left = 0, right = 1;
  while (left < arr.length) {
    while(right < arr.length && arr[right] - arr[left] <= 10) right++;
    pairs += arr.length - right; // it mean y can use all prev ell as pair
    left++; // traverse left
    if (left >= right) right = left + 1; // fix if left reach right
  }

  return pairs;
}
/*
You are provided with an array of n integers, which are guaranteed to be distinct. The task requires you to craft
a function solution that returns the count of pairs of numbers whose absolute difference is more than 10.
The solution should find the answer within 3 seconds, so pay attention to write a time-efficient one.

Constraints:

1≤n≤100000
−100000≤arr[i]≤100000
The array consists of distinct integers.
The program should have a time complexity of O(n).
Example: For arr = [-20, -10, 0, 10, 20], you should make sure the output equals 6. The 6 pairs with
a difference of more than 10 include (-20, 0), (-20, 10), (-20, 20), (-10, 10), (-10, 20), and (0, 20).
*/

// Example usage
const arr = [-20, -10, 0, 10, 20];
// (-20, 0), (-20, 10), (-20, 20), (-10, 10), (-10, 20), (0, 20).
console.log(solution(arr));
