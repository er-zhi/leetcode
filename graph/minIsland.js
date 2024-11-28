const minimumIsland = (grid) => {
  const visited = new Set();
  let minimum = Infinity;

  for (let r = 0; r < grid.length; r++) {
    for(let c = 0; c < grid[0].length; c++) {
      const size = explore(grid, r, c, visited);
      if(size !== 0 && minimum > size) minimum = size;
    }
  }

  return minimum;
};

const explore = (grid, r, c, visited) => {
  if (r < 0 || r >=grid.length) return false;
  if (c < 0 || c >=grid[0].length) return false;
  if (grid[r][c] === 'W') return false;

  const pos = r + ',' + c;
  if (visited.has(pos)) return false;
  visited.add(pos);

  let size = 1;

  size += explore(grid, r, c+1, visited);
  size += explore(grid, r, c-1, visited);
  size += explore(grid, r+1, c, visited);
  size += explore(grid, r-1, c, visited);

  return size;
};

const grid = [
  ['W', 'W'],
  ['L', 'L'],
  ['W', 'W'],
  ['W', 'L']
];

console.log(minimumIsland(grid));
