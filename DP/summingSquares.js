const memo = [];

const summingSquares = n => {
  if (n === 0) return 0;

  if (memo[n] !== undefined) return memo[n];

  let minSquares = Infinity;

  const root = Math.floor(Math.sqrt(n));

  for (let i = 1; i <= root; i++) {
    const numSquares = 1 + summingSquares(n - i**2);

    minSquares = Math.min(numSquares, minSquares);
  }

  memo[n] = minSquares;

  return minSquares;
};

/*
Given 12:

summingSquares(12) -> 3

The minimum squares required for 12 is three, by doing 4 + 4 + 4.

Another way to make 12 is 9 + 1 + 1 + 1, but that requires four perfect squares.

/*
Example: n = 12

Call Stack Breakdown:
1. summingSquares(12) -> helper(12)
   - Tries 1²:
     - Calls helper(11):
       - Tries 1²:
         - Calls helper(10):
           - Tries 1²:
             - Calls helper(9):
               - Tries 1²:
                 - Calls helper(8):
                   - Tries 1²:
                     - Calls helper(7):
                       - Tries 1²:
                         - Calls helper(6):
                           - Tries 1²:
                             - Calls helper(5):
                               - Tries 1²:
                                 - Calls helper(4):
                                   - Tries 1²:
                                     - Calls helper(3):
                                       - Tries 1²:
                                         - Calls helper(2):
                                           - Tries 1²:
                                             - Calls helper(1):
                                               - Tries 1²:
                                                 - Calls helper(0) -> Returns 0
                                           - Min squares = 1
                                           - Memoize: memo[1] = 1
                                         - Tries 2² -> Skipped (2 > 1)
                                   - Tries 2²:
                                     - Calls helper(0) -> Returns 0
                                   - Min squares = 1
                                   - Memoize: memo[4] = 1
                               - Tries 2²:
                                 - Calls helper(1) -> Returns memo[1] = 1
                               - Min squares = 2
                               - Memoize: memo[5] = 2
                           - Tries 2²:
                             - Calls helper(2) -> Returns memo[2] = 2
                           - Min squares = 3
                           - Memoize: memo[6] = 3
                       - Tries 2²:
                         - Calls helper(3) -> Returns memo[3] = 3
                       - Min squares = 4
                       - Memoize: memo[7] = 4
                   - Tries 2²:
                     - Calls helper(4) -> Returns memo[4] = 1
                   - Min squares = 2
                   - Memoize: memo[8] = 2
               - Tries 3²:
                 - Calls helper(0) -> Returns 0
               - Min squares = 1
               - Memoize: memo[9] = 1
           - Tries 2²:
             - Calls helper(6) -> Returns memo[6] = 3
           - Tries 3²:
             - Calls helper(1) -> Returns memo[1] = 1
           - Min squares = 2
           - Memoize: memo[10] = 2
       - Tries 2²:
         - Calls helper(7) -> Returns memo[7] = 4
       - Min squares = 3
       - Memoize: memo[11] = 3
   - Tries 2²:
     - Calls helper(8) -> Returns memo[8] = 2
   - Tries 3²:
     - Calls helper(3) -> Returns memo[3] = 3
   - Min squares = 3
   - Memoize: memo[12] = 3

Final memoized results:
memo = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 1,
  5: 2,
  6: 3,
  7: 4,
  8: 2,
  9: 1,
  10: 2,
  11: 3,
  12: 3
}

Result:
summingSquares(12) = 3
*/

