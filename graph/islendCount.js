const islandCount = (grid) => {
  const visited = new Set();
  let count = 0;

  for (let r = 0; r < grid.length; r++) {
    for(let c = 0; c < grid[0].length; c++) {
      if(explore(grid, r, c, visited)) count++;
      // if(bfs(grid, r, c, visited)) count++;
    }
  }

  return count;
};

const explore = (grid, r, c, visited) => {
  if (r < 0 || r >=grid.length) return false;
  if (c < 0 || c >=grid[0].length) return false;
  if (grid[r][c] === 'W') return false;

  const pos = r + ',' + c;
  if (visited.has(pos)) return false;
  visited.add(pos);

  explore(grid, r, c+1, visited);
  explore(grid, r, c-1, visited);
  explore(grid, r+1, c, visited);
  explore(grid, r-1, c, visited);

  return true;
};

const bfs = (grid, startRow, startCol, visited) => {
  if (grid[startRow][startCol] === 'W') return false; // Water, skip this cell

  const queue = [[startRow, startCol]];
  const pos = startRow + ',' + startCol;

  if (visited.has(pos)) return false; // Already visited
  visited.add(pos);

  while (queue.length > 0) {
    const [r, c] = queue.shift(); // Dequeue

    // Visit all neighbors
    const neighbors = [
      [r, c + 1], // Right
      [r, c - 1], // Left
      [r + 1, c], // Down
      [r - 1, c], // Up
    ];

    for (const [nr, nc] of neighbors) {
      // Check bounds
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
        const neighborPos = nr + ',' + nc;

        // If it's land and not visited, add it to the queue
        if (grid[nr][nc] === 'L' && !visited.has(neighborPos)) {
          visited.add(neighborPos);
          queue.push([nr, nc]);
        }
      }
    }
  }

  return true; // BFS successfully explored an island
};

  const grid = [
    ['W', 'L', 'W', 'W', 'W'],
    ['W', 'L', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'L', 'W'],
    ['W', 'W', 'L', 'L', 'W'],
    ['L', 'W', 'W', 'L', 'L'],
    ['L', 'L', 'W', 'W', 'W'],
  ];

  console.log(islandCount(grid)); // -> 3
