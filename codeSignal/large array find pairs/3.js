function solution(s) {
  const freq = new Map();

  // Step 1: Calculate frequency of each character in O(n)
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  let totalCombinations = 0;

  // Step 2: Iterate through all pairs of characters to calculate combinations
  const keys = Array.from(freq.keys());
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (i !== j) {
        const char1 = keys[i];
        const char2 = keys[j];
        const freq1 = freq.get(char1);
        const freq2 = freq.get(char2);

        // Case: char1 appears twice, char2 appears once
        if (freq1 >= 2) {
          totalCombinations += (freq1 * (freq1 - 1) / 2) * freq2;
        }

        // Case: char2 appears twice, char1 appears once
        if (freq2 >= 2) {
          totalCombinations += (freq2 * (freq2 - 1) / 2) * freq1;
        }
      }
    }
  }

  return totalCombinations;
}
// Example usage
console.log(solution("abcabc")); // 24
console.log(solution("aabbcc")); // 24

/*
You are given a string s composed of n lowercase alphabetic characters.
Your task is to discover the number of ways to delete all characters except
for three to obtain a 3-letter string, two characters of which are identical, and the other is different.

Write a JavaScript function named solution that takes the string s as an argument
and returns an integer indicating the total number of different 3-letter combinations that can be formed with
two identical characters and one distinct character from the string.

Constraints:

The string s must contain at least three characters and at most
  characters, i.e.,
3≤n≤10^5
All characters in s must be lowercase alphabetic characters.
Make sure both the frequency calculation and the combination formula are correct.
The solution should have a time complexity of O(n).
Example:

For s = "abcabc", the output should be solution(s) = 12. The possible combinations
include: "aba", "abb", "aca", "acc", "aab", "aac", "bcb", "bcc", "bab", "bbc", "cac", "cbc".
Each combination consists of three characters, two of which are identical, and the third one is distinct.

Similarly, for s = "aabbcc", the output should be solution(s) = 24.
 */
