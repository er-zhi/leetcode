function solution(wordList) {
  const occurenseIdxs = new Map();
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    if (!occurenseIdxs.has(word)) {
      occurenseIdxs.set(word, []);
    }

    occurenseIdxs.get(word).push(i);
  }

  const result = new Map();

  for (const [word, indxs] of occurenseIdxs.entries()) {
    if (indxs.length === 1) {
      result.set(word, undefined);
    } else {
      let min = wordList.length;
      for (let i = 1; i <indxs.length; i++) {
        min = Math.min(min, indxs[i] - indxs[i-1]);
      }
      result.set(word, min);
    }
  }

  return result;
}

// Example usage:
const exampleInput = ["dog", "cat", "bird", "cat", "dog", "elephant", "dog"];
console.log(solution(exampleInput)); // Output should be Map { 'dog' => 2, 'cat' => 2 }

/*
Your job requires you to construct a JavaScript function named solution(). This function should receive
an array of n words, with n ranging from 1 to 100,000, inclusive.
The task mandates that your function return a map,
where each key is a unique word from the array,
and the corresponding value is the shortest distance between two occurrences of that word in the array.

Each word in the array is composed solely of lowercase and uppercase English alphabets,
and the length of each word can range from 1 to 50, inclusive.

Calculating the distance between two occurrences of a word involves subtracting
the position of the first occurrence from that of the subsequent occurrence.
For example, in the array ["dog", "cat", "bird", "cat", "dog", "elephant", "dog"],
the distance between the first and second occurrences of "dog" is 4,
and the distance between the second and third occurrences of "dog" is 2.
Therefore, the shortest distance for "dog" should be considered 2.
The word "cat" appears twice in the array in positions that are 2 elements apart, so for "cat", the answer should be 2.

For words that appear only once where there is no second occurrence,
the shortest distance should be considered undefined,
and such words should be excluded from the output map.
Hence, for the example above, the output should be {"dog": 2, "cat": 2}.

Hint: Be sure to utilize a Map structure efficiently to track
the positions of word occurrences and to assist in performing
the necessary calculations to solve the task optimally.
 */
