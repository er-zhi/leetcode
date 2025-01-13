function findInfluencer(connections) {
  const map = new Map();

  // Build the graph
  for (const [a, b] of connections) {
    if (!map.has(a)) map.set(a, []);
    if (!map.has(b)) map.set(b, []);
    map.get(a).push(b);
    map.get(b).push(a);
  }

  let maxNetworkSize = 0;
  let influencer = "";

  // Helper function to find all unique people within two degrees of separation
  function getNetworkSize(person) {
    const firstDegree = new Set(map.get(person)); // Set of direct friends
    const secondDegree = new Set();

    // For each first-degree friend, find their friends (second-degree connections)
    firstDegree.forEach(friend => {
      map.get(friend).forEach(friendOfFriend => {
        if (friendOfFriend !== person && !firstDegree.has(friendOfFriend)) {
          secondDegree.add(friendOfFriend);
        }
      });
    });

    // Combine first-degree and second-degree connections
    const totalNetwork = new Set([...firstDegree, ...secondDegree]);

    return totalNetwork.size;
  }

  // Iterate through each person to find the one with the largest network
  for (const person of map.keys()) {
    const networkSize = getNetworkSize(person);

    if (networkSize > maxNetworkSize || (networkSize === maxNetworkSize && person < influencer)) {
      maxNetworkSize = networkSize;
      influencer = person;
    }
  }

  return influencer;
}

// Example usage with named people
const namedConnections = [
  ['Alice', 'Bob'], ['Bob', 'Charlie'], ['Alice', 'Charlie'],
  ['Alice', 'David'], ['David', 'Eve'], ['Eve', 'Frank'],
  ['Bob', 'Frank']
];
console.log(findInfluencer(namedConnections)); // Expected output: 'Alice'


/*
You are given a list of pairs representing connections between people. Each person is represented by a unique name.

A pair [a, b] means person a is connected to person b. Connections are bidirectional, so [a, b] and [b, a] are the same.

Your goal is to find the person who can potentially connect the most people within two degrees of separation.
Two degrees of separation means:

First-degree connections (friends): People directly connected to the person.
Second-degree connections (friends of friends): People connected to the first-degree connections,
excluding the person itself and direct first-degree connections.
For example, given the connections:

JavaScript
Copy to clipboard
const connections = [
  ['Alice', 'Bob'], ['Bob', 'Charlie'], ['Alice', 'Charlie'],
  ['Alice', 'David'], ['David', 'Eve'], ['Eve', 'Frank'],
  ['Bob', 'Frank']
];
Alice connects to Bob, Charlie, and David (first-degree connections).
The second-degree connections (friends of these friends) are Frank (from Bob) and Eve (from David),
making a total of five people within two degrees (Bob, Charlie, David, Frank, Eve).
Bob connects to Alice, Charlie, and Frank (first-degree connections).
The second-degree connections (friends of these friends) are David (from Alice) and Eve (from Frank),
also making a total of five people within two degrees (Alice, Charlie, Frank, David, Eve).
You'll need to return the person with the most extensive network within these two degrees of separation.
If multiple people have the same size network, return the name that comes first in alphabetical order.
 */
