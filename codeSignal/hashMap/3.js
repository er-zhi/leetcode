function solution(s) {
  const lastOccurest = new Map();
  // const uniqueLeters = new Set();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    lastOccurest.set(char, i);
    // uniqueLeters.add(char);
  }
  const res = [];
  let start = end = 0;
  while (end < s.length) {
    end = lastOccurest.get(s[start]);
    // check all chars
    let index = start + 1;
    while(index < end) {
      end = Math.max(end, lastOccurest.get(s[index]));
      index++;
    }
    res.push(end - start + 1);

    end++;
    start = end;
  }

  return res;
}

console.log(solution("abacdcd"));  // Should print [3, 4]


/*
You are given a string s consisting of lowercase English letters. Your task is to partition this string
into as many substrings as possible such that each letter appears in only one substring.
The substrings should retain their order from the original string. Return an array of integers indicating
the lengths of these substrings.

For example, given the string "abacdcd", one way to partition it is "aba" and "cdcd", resulting in [3, 4].

Constraints:

The length of the input string n will be in the range of 1 ≤ n ≤ 1000000.
All characters in the string will be lowercase English alphabets ('a' to 'z').
The time complexity of the solution should be
O(n).

 */
