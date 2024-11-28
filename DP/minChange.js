const memo = new Map();

const minChange = (amount, coins) => {
  coins.sort((a, b) => a - b); // Sort coins in ascending order
  if (amount === 0) return 0; // Base case: If amount is 0, no coins are needed
  if (amount < 0) return -1; // Base case: If amount is negative, return -1 (invalid case)

  if (memo.has(amount)) return memo.get(amount); // Return cached result if available

  let minCoins = -1;

  // Try every coin and recursively solve for the remaining amount
  for (const coin of coins) {
    const subAmount = amount - coin; // Subtract current coin from amount
    const subCoins = minChange(subAmount, coins); // Recursive call for subAmount

    if (subCoins !== -1) { // If the result is valid, calculate total coins
      const numCoins = subCoins + 1; // Add 1 for the current coin
      if (minCoins === -1 || numCoins < minCoins) { // Update minCoins if it's better
        minCoins = numCoins;
      }
    }
  }

  memo.set(amount, minCoins); // Cache the result for this amount

  return minCoins; // Return the minimum number of coins
};
/*
Call stack breakdown for minChange(3, [1, 2]):

1. minChange(3, [1, 2]):
   - Tries coin 1:
      - Calls minChange(2, [1, 2]):
        - Tries coin 1:
           - Calls minChange(1, [1, 2]):
             - Tries coin 1:
                - Calls minChange(0, [1, 2]) -> Returns 0
             - Adds 1 coin for coin 1 -> Total 1 coin for minChange(1)
             - Memoizes minChange(1) = 1
        - Tries coin 2:
           - Calls minChange(0, [1, 2]) -> Returns 0
           - Adds 1 coin for coin 2 -> Total 1 coin for minChange(1) (no update)
        - Minimum coins for minChange(2): 2 (1 + 1)
        - Memoizes minChange(2) = 2
   - Tries coin 2:
      - Calls minChange(1, [1, 2]) -> Returns cached result: 1
      - Adds 1 coin for coin 2 -> Total 2 coins for minChange(3)
   - Minimum coins for minChange(3): 2
   - Memoizes minChange(3) = 2

Final memoized results:
memo = {
  0: 0,
  1: 1,
  2: 2,
  3: 2
}

Return value: minChange(3, [1, 2]) = 2
*/

const amount = 3;
const coins = [1, 2];
console.log(`minChange(${amount}, [${coins}]): ${minChange(amount, coins)}`);
