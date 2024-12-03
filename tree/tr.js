// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = (preorder, inorder) => {
  // Map each value in inorder to its index for O(1) lookups
  const memo = new Map();
  for (let i = 0; i < inorder.length; i++) {
    memo.set(inorder[i], i);
  }

  // Helper function to recursively split the tree
  const splitTree = (preLeft, inLeft, inRight) => {
    // Base case: If the indices are invalid, return null
    if (inLeft > inRight) return null;

    // Get the current root value from preorder and increment the preorder index
    const rootVal = preorder[preLeft];
    const root = new TreeNode(rootVal);

    // Find the index of the root in inorder using the memo map
    const inMid = memo.get(rootVal);

    // Recursively build the left and right subtrees
    root.left = splitTree(preLeft + 1, inLeft, inMid - 1);
    root.right = splitTree(preLeft + (inMid - inLeft) + 1, inMid + 1, inRight);

    return root;
  };

  return splitTree(0, 0, inorder.length - 1);
};

/*

A preorder traversal is [node, left, right]
P = [8,2,7,1,9,3,6] root is 8
while an inorder traversal is [left, node, right].
I = [7,2,1,8,3,9,6] 8 is index = 3 of I
I.left = [7,2,1] I.right = [3,9,6]
iLeft = 0 and iRight = I.length-1

### How It Works:

1. **Preorder Array (preorder):**
   - Represents the order in which nodes are visited: [root, left subtree, right subtree].
   - The first element is always the root of the current subtree.

2. **Inorder Array (inorder):**
   - Represents the order in which nodes are visited: [left subtree, root, right subtree].
   - The root splits the array into the left and right subtrees.

3. **Memoization (memo):**
   - The `memo` map stores the index of each value in the `inorder` array.
   - This allows \(O(1)\) lookups to quickly find the root's position in the `inorder` array.

4. **Recursive Construction (splitTree):**
   - Base Case: If the left boundary (`inLeft`) exceeds the right boundary (`inRight`), the subtree is empty, so return `null`.
   - Recursive Step:
     - Identify the root of the current subtree using `preorder[preLeft]`.
     - Use `memo` to find the root's index in `inorder`.
     - Calculate the size of the left subtree: `leftSubtreeSize = inMid - inLeft`.
     - Recursively build the left and right subtrees.

---

### Recursive Call Stack:

#### Example:
Input:
- Preorder = [8, 2, 7, 1, 9, 3, 6]
- Inorder = [7, 2, 1, 8, 3, 9, 6]

1. **Initial Call:**
   - `splitTree(0, 0, 6)`:
     - `preLeft = 0`, root = 8.
     - `inMid = 3` (8's index in inorder).
     - Left subtree = [7, 2, 1], Right subtree = [3, 9, 6].

2. **Left Subtree of 8:**
   - `splitTree(1, 0, 2)`:
     - `preLeft = 1`, root = 2.
     - `inMid = 1` (2's index in inorder).
     - Left subtree = [7], Right subtree = [1].

3. **Left Subtree of 2:**
   - `splitTree(2, 0, 0)`:
     - `preLeft = 2`, root = 7.
     - Leaf node (no children).

4. **Right Subtree of 2:**
   - `splitTree(3, 2, 2)`:
     - `preLeft = 3`, root = 1.
     - Leaf node (no children).

5. **Right Subtree of 8:**
   - `splitTree(4, 4, 6)`:
     - `preLeft = 4`, root = 3.
     - `inMid = 4` (3's index in inorder).
     - Left subtree = [], Right subtree = [9, 6].

6. **Right Subtree of 3:**
   - `splitTree(5, 5, 6)`:
     - `preLeft = 5`, root = 9.
     - `inMid = 5` (9's index in inorder).
     - Left subtree = [], Right subtree = [6].

7. **Right Subtree of 9:**
   - `splitTree(6, 6, 6)`:
     - `preLeft = 6`, root = 6.
     - Leaf node (no children).

---

### Final Tree Structure:

 */
