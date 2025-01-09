function solution(playerIds, playerScores, queries) {
  const ans = [];
  const map = new Map();
  for (let i = 0; i < playerIds.length; i++) {
    map.set(playerIds[i], playerScores[i]);
  }
  for (const num of queries) {
    if (map.has(num)) ans.push(map.get(num));
  }

  return ans;
}

// Example usage:
const playerIds = [1, 2, 3, 4, 5];
const playerScores = [100, 200, 150, 50, 300];
const queries = [2, 5, 1];
console.log(solution(playerIds, playerScores, queries));
