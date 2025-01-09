function solution(data, userId, key, newValue) {
  const res = []; // Result array to store user objects
  const arr = data.split('\n'); // Split the data into rows

  for (const str of arr) {
    let firstDelimiter = str.indexOf(','); // Find the first delimiter to extract the ID
    const ID = str.substring(0, firstDelimiter); // Extract user ID
    const props = str.substring(firstDelimiter + 1); // Remaining properties string
    const user = { ID }; // Initialize user object with ID
    const stack = [user]; // Stack to handle nested structures
    let activeMap = user; // Active object to populate key-value pairs
    let i = 0;

    while (i < props.length) {
      if (props[i] === '{') {
        // Start of a nested structure
        const newMap = {};
        const lastKey = stack[stack.length - 1].__currentKey;
        stack[stack.length - 1][lastKey] = newMap;
        stack.push(newMap);
        activeMap = newMap;
        delete activeMap.__currentKey; // Clean up temporary key
        i++;
      } else if (props[i] === '}') {
        // End of a nested structure
        stack.pop();
        activeMap = stack[stack.length - 1];
        i++;
        if (i < props.length && props[i] === ',') i++; // Skip ',' if present
      } else {
        // Parse key-value pair
        const equalPos = props.indexOf('=', i); // Find '='
        const delimiter = props.indexOf(',', equalPos); // Find next ','
        const bracePos = props.indexOf('}', equalPos); // Find next '}'
        const endPos = Math.min(
          delimiter === -1 ? Infinity : delimiter,
          bracePos === -1 ? Infinity : bracePos
        );

        const currentKey = props.substring(i, equalPos).trim(); // Extract key
        const currentVal = props.substring(equalPos + 1, endPos).trim(); // Extract value

        if (currentVal.startsWith('{')) {
          // Handle nested structure
          activeMap.__currentKey = currentKey;
          i = equalPos + 1; // Move to the nested structure
        } else {
          // Assign key-value to the active map
          activeMap[currentKey] = currentVal;
          i = endPos !== Infinity ? endPos : props.length; // Move to the next pair
          if (i < props.length && props[i] === ',') i++; // Skip ',' if present
        }
      }
    }

    res.push(user); // Add parsed user to the result array
  }

  // Update the specified key for the given user ID
  const targetUser = res.find(u => u.ID === userId); // Find the target user
  if (targetUser) {
    // Recursively search for the key in nested structures
    const updateKey = (obj) => {
      if (key in obj) {
        obj[key] = newValue; // Update the key's value
        return true;
      }
      for (const k in obj) {
        if (typeof obj[k] === 'object' && updateKey(obj[k])) {
          return true;
        }
      }
      return false;
    };
    updateKey(targetUser);
  }

  return res;
}

// Example usage
const data = "001,Age=25,Name=John,Address={Street=Main St,City=NY,Zip=10001},Email=john@gmail.com\n002,Age=30,Name=Jane,Address={Street=2nd St,City=LA,Zip=90001},Email=jane@hotmail.com";
const userId = "001";
const key = "Email";
const newValue = "johndoe@gmail.com";

const result = solution(data, userId, key, newValue);
console.log(result);
