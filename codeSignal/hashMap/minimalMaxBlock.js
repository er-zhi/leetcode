function minimalMaxBlock(array) {
  const lastOccurrence = new Map();
  const maxBlockSizes = new Map();

  for (let i = 0; i < array.length; ++i) {
    const num = array[i];
    if (!lastOccurrence.has(num)) {
      maxBlockSizes.set(num, i);
    } else {
      const blockSize = i - lastOccurrence.get(num) - 1;
      maxBlockSizes.set(num, Math.max(maxBlockSizes.get(num), blockSize));
    }
    lastOccurrence.set(num, i);
  }

  lastOccurrence.forEach((pos, num) => {
    const blockSize = array.length - pos - 1;
    maxBlockSizes.set(num, Math.max(maxBlockSizes.get(num), blockSize));
  });

  let minNum = -1;
  let minBlockSize = Number.MAX_VALUE;
  maxBlockSizes.forEach((blockSize, num) => {
    if (blockSize < minBlockSize) {
      minBlockSize = blockSize;
      minNum = num;
    }
  });

  return minNum;
}
/*
In this unit's task, we'll manipulate a list of integers. You are required to construct a JavaScript function titled
minimalMaxBlock(). This function should accept an array as an input and compute an intriguing property related
to contiguous blocks within the array.

More specifically, you must select a particular integer, k, from the array. Once you've selected k,
the function should remove all occurrences of k from the array, thereby splitting it into several contiguous blocks
or remaining sub-arrays. A unique feature of k is that it is chosen such that the maximum length among these
blocks is minimized.

For instance, consider the list [1, 2, 2, 3, 1, 4, 4, 4, 1, 2, 5]. If we eliminate all instances
of 2 (our k), the remaining blocks would be [1], [3, 1, 4, 4, 4, 1], [5], with the longest containing 6 elements.
Now, if we instead remove all instances of 1, the new remaining blocks would be [2, 2, 3], [4, 4, 4], [2, 5],
the longest of which contains 3 elements. As such, the function should return 1 in this case, as it leads
to a minimally maximal block length.
 */
