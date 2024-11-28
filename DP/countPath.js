const memo = {};

const helper = (r, c, grid) => {
  if(r >= grid.length || c >= grid[0].length) return 0;

  if(grid[r][c] === 'X') return 0;

  const pos = `${r},${c}`;
  if (pos in memo) return memo[pos];

  if(r === grid.length -1 && c === grid[0].length -1) return 1;

  const result =  helper(r, c + 1, grid) + helper(r + 1, c, grid);

  memo[pos] = result;

  return result;
};

const countPaths = (grid) => {
  return helper(0, 0, grid);
};
/*
Write a function, countPaths, that takes in a grid as an argument. In the grid, 'X' represents walls and 'O'
represents open spaces. You may only move down or to the right and cannot pass through walls.
The function should return the number of ways possible to travel from the top-left corner of the grid to the bottom-right corner.
*/
const grid = [
  ["O", "O"],
  ["O", "O"],
];
countPaths(grid); // -> 2

const grid1 = [
  ["O", "X"],
  ["X", "O"],
];
countPaths(grid1); // -> 0

const grid2 = [
  ["O", "O", "X"],
  ["O", "O", "O"],
  ["O", "O", "O"],
];
countPaths(grid2); // -> 5
