/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = (s) => {
  var result = "";
  var len = 0;

  // Iterate through each character in the string
  for (var i = 0; i < s.length; i++) {
    // Odd-length palindrome
    var left = i, right = i; // i as a center!!
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if ((right - left + 1) > len) {
        result = s.substring(left, right + 1); // Update result
        len = right - left + 1; // Update max length
      }
      left--; // Expand outward
      right++;
    }

    // Even-length palindrome
    left = i; right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if ((right - left + 1) > len) {
        result = s.substring(left, right + 1); // Update result
        len = right - left + 1; // Update max length
      }
      left--; // Expand outward
      right++;
    }
  }

  return result; // Return the longest palindrome found
};
