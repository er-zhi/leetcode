function binarySearchIndex(arr, value) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < value) {
      left = mid + 1;
    } else if (arr[mid] > value) {
      right = mid - 1;
    } else {
      return mid; // Value found
    }
  }

  return left; // Appropriate insert position
}

function processOperations(operations) {
  const ans = [];
  const arr = [];
  const set = new Set();

  for (const [type, val] of operations) {
    switch (type) {
      case 0: /* add val   */{
        const index = binarySearchIndex(arr, val);
        if (set.has(val)) {
          console.log(`Value: ${val} exists.`);
        } else {
          arr.splice(index, 0, val);
        }
        set.add(val);
        ans.push(arr.length);
      }; break;
      case 1: /* remove val or ignore */{
        const index = binarySearchIndex(arr, val);
        if (index !== arr.length && arr[index] === val) {
          arr.splice(index, 1);
          set.delete(val);
        }
        ans.push(arr.length);
      }; break;
      case 2: /* finding the maximum number */{
        ans.push(arr.length ? arr.at(-1) : -1);
      }; break;
      case 3: /* checking if a number exists */{
        ans.push(set.has(val));
      }; break;
    }
  }

  return ans;
}

// Example usage
const operations = [
  [0, 20],
  [0, 30],
  [2, null],
  [1, 20],
  [0, 20],
  [3, 20],
  [2, null]
];

console.log(processOperations(operations)); // [1, 2, 30, 1, 2, true, 30].
