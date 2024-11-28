const memo = {};

const helper = (r, c, grid) => {
  if(r >= grid.length || c >= grid[0].length) return -Infinity;

  const pos = `${r},${c}`;
  if (pos in memo) return memo[pos];

  if(r === grid.length -1 && c === grid[0].length -1) {
    return grid[r][c];
  }

  const result = grid[r][c] + Math.max(
    helper(r, c + 1, grid),
    helper(r + 1, c, grid)
  );

  memo[pos] = result;

  return result;
};

const maxPathSum = grid => helper(0, 0, grid);

/*
Write a function, maxPathSum, that takes in a grid as an argument.
The function should return the maximum sum possible
by traveling a path from the top-left corner to
the bottom-right corner. You may only travel through the grid by moving down or right.

You can assume that all numbers are non-negative.
*/

const grid = [
  [1, 3, 12],
  [5, 1, 1],
  [3, 6, 1],
];
maxPathSum(grid); // -> 18

const grid1 = [
  [1, 2, 8, 1],
  [3, 1, 12, 10],
  [4, 0, 6, 3],
];
maxPathSum(grid1); // -> 36
