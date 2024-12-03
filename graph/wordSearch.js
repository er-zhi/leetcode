// https://leetcode.com/problems/word-search/description/
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = (board, word) => {
  var rows = board.length;
  var cols = board[0].length;

  // Helper function to perform DFS with backtracking
  var dfs = (row, col, index) => {
    // Base case: if all characters in the word are matched
    if (index === word.length) return true;

    // Check boundaries and character match
    if (
      row < 0 || row >= rows ||
      col < 0 || col >= cols ||
      board[row][col] !== word[index]
    ) {
      return false;
    }

    // Temporarily mark the cell as visited
    var temp = board[row][col];
    board[row][col] = '\0';

    // Explore all four possible directions
    var found =
      dfs(row + 1, col, index + 1) || // Down
      dfs(row - 1, col, index + 1) || // Up
      dfs(row, col + 1, index + 1) || // Right
      dfs(row, col - 1, index + 1);   // Left

    // Restore the original value of the cell
    board[row][col] = temp;

    return found;
  };

  // Start the search for each cell in the grid
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return true; // Start DFS from this cell
    }
  }

  return false; // Return false if no valid path is found
};
/*
Input: board = [["A","B","C","E"],
                ["S","F","C","S"],
                ["A","D","E","E"]],
       word = "ABCCED"

Step-by-Step Explanation:

1. The function iterates over each cell in the board.
2. When the first character of the word ('A') matches, the DFS function is called.

Step-by-Step DFS for "ABCCED":

- Starting at board[0][0] = 'A', match index 0 ('A'):
  - Mark board[0][0] as visited.
  - Move to board[0][1] = 'B', match index 1 ('B'):
    - Mark board[0][1] as visited.
    - Move to board[0][2] = 'C', match index 2 ('C'):
      - Mark board[0][2] as visited.
      - Move to board[1][2] = 'C', match index 3 ('C'):
        - Mark board[1][2] as visited.
        - Move to board[2][2] = 'E', match index 4 ('E'):
          - Mark board[2][2] as visited.
          - Move to board[2][1] = 'D', match index 5 ('D'):
            - Mark board[2][1] as visited.
            - All characters in the word are matched.

3. The function returns true as the word "ABCCED" is found in the board.
4. The cells are restored after each step to allow exploration of other paths if needed.

Final Output:
- The function returns true because the word "ABCCED" exists in the board.
*/
