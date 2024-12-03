const memo = {};

const countingChange = (amount, coins, coinIdx = 0) => {
  if(amount === 0) return 1;
  if(coinIdx >= coins.length) return 0;

  let totalWays = 0;
  const coin = coins[coinIdx];

  const key = `${coin},${amount}`;
  if (memo[key] !== undefined) return memo[key];

  for (let qty = 0; qty * coin <= amount; qty +=1) {
    const subAmount = amount - (qty * coin);
    totalWays += countingChange(subAmount, coins, coinIdx + 1);
  }

  memo[key] = totalWays;

  return totalWays;
};

/*
For example,

countingChange(4, [1,2,3]) -> 4

There are four different ways to make an amount of 4:

1. 1 + 1 + 1 + 1
2. 1 + 1 + 2
3. 1 + 3
4. 2 + 2

1. countingChange(4, [1, 2, 3], 0):
   - Coin = 1
   - Tries 0 coins of 1 -> countingChange(4, [1, 2, 3], 1)
   - Tries 1 coin of 1 -> countingChange(3, [1, 2, 3], 1)
   - Tries 2 coins of 1 -> countingChange(2, [1, 2, 3], 1)
   - Tries 3 coins of 1 -> countingChange(1, [1, 2, 3], 1)
   - Tries 4 coins of 1 -> countingChange(0, [1, 2, 3], 1) -> Returns 1 (Base case)

2. countingChange(4, [1, 2, 3], 1):
   - Coin = 2
   - Tries 0 coins of 2 -> countingChange(4, [1, 2, 3], 2)
   - Tries 1 coin of 2 -> countingChange(2, [1, 2, 3], 2)
   - Tries 2 coins of 2 -> countingChange(0, [1, 2, 3], 2) -> Returns 1 (Base case)

3. countingChange(4, [1, 2, 3], 2):
   - Coin = 3
   - Tries 0 coins of 3 -> countingChange(4, [1, 2, 3], 3) -> Returns 0 (No coins left)
   - Tries 1 coin of 3 -> countingChange(1, [1, 2, 3], 3) -> Returns 0 (No coins left)

Memoization Updates:
- memo["2,2"] = 2
- memo["2,4"] = 2
- memo["1,2"] = 2
- memo["1,4"] = 3
- memo["0,4"] = 4

Final Answer:
countingChange(4, [1, 2, 3]) = 4

Call Stack Visualization:
- countingChange(4, [1, 2, 3], 0)
  - countingChange(4, [1, 2, 3], 1)
    - countingChange(4, [1, 2, 3], 2)
      - countingChange(4, [1, 2, 3], 3)
      - countingChange(1, [1, 2, 3], 3)
    - countingChange(2, [1, 2, 3], 2)
    - countingChange(0, [1, 2, 3], 2)
  - countingChange(3, [1, 2, 3], 1)
  - countingChange(2, [1, 2, 3], 1)
  - countingChange(1, [1, 2, 3], 1)
  - countingChange(0, [1, 2, 3], 1)
*/
