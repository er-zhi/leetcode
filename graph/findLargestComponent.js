const graph = {
  1: ['2'],
  2: ['1','8'],
  6: ['7'],
  9: ['8'],
  7: ['6', '8'],
  8: ['9', '7', '2']
}; // -> 6

const  largestComponent = (graph) => {
  const visited = new Set();
  let longest = 0;

  for (let node in graph) {
    const size = exploreSize(graph, node, visited);
    if (size > longest) longest = size;
  }

  return longest;
};

const exploreSize = (graph, node, visited) => {
  if(visited.has(node)) return 0;

  let size = 1;
  visited.add(node);

  for (let neighbor of graph[node]) {
    size += exploreSize(graph, neighbor, visited);
  }

  return size;
};

console.log(largestComponent(graph));
