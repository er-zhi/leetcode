function longestSubstringWithKDistinctCharacters(s, K) {
  if (K === 0) return 0; // edge case: if K is 0, there's no valid substring

  const map = new Map();
  let max = 0;
  let slow = 0;

  for (let fast = 0; fast < s.length; fast++) {
    const char = s[fast];
    // Add or update the count of the character at 'fast'
    map.set(char, (map.get(char) || 0) + 1);

    // If we have more than K distinct characters, shrink the window
    while (map.size > K) {
      const leftChar = s[slow];
      map.set(leftChar, map.get(leftChar) - 1);
      if (map.get(leftChar) === 0) {
        map.delete(leftChar);
      }
      slow++;
    }

    // Update the maximum length of the substring with K distinct characters
    max = Math.max(max, fast - slow + 1);
  }

  return max;
}

// Example usage:
console.log(longestSubstringWithKDistinctCharacters("acaabcc", 2)); // Expected output: 4
console.log(longestSubstringWithKDistinctCharacters("abaccc", 2)); // Expected output: 4
console.log(longestSubstringWithKDistinctCharacters("aa", 1)); // Expected output: 2


/* You are tasked with an intriguing string manipulation problem.
You are provided with a string s and an integer K.
The string s contains at most 100000 alphanumeric (A-Za-z0-9) characters and has at least one character.
The integer K ranges from 1 to 100000, inclusive.

You need to write a JavaScript function that identifies
the length of the longest possible substring within s that contains at most K distinct characters.
If multiple substrings share the longest length, you should select the substring that appears first.

Your solution should have a time complexity of O(n),
where n is the length of the string s, to ensure efficiency given the constraints.

To offer more clarity, let's consider an example. Suppose s is "acaabcc" and K is 2.
The longest possible substring with at most 2 distinct characters is "acaa",
so your function should return 4, which is the length of "acaa".

Remember, the function should not return the actual substring but
the length of the longest possible substring that meets the specified criteria.

Note: Alphanumeric characters are case-sensitive, i.e., 'A' and 'a' are treated as different characters.
*/
