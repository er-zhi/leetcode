function updatePreference(inputString, userIndex, prefKey, newValue) {
  // Split the input string into user-specific segments
  const usersStr = inputString.split('User').filter(i => i.trim() !== '');
  const obj = {}; // The resulting nested object

  for (const str of usersStr) {
    // Split user data into userId and properties
    const [userId, props] = str.split(':');
    const key = 'User' + userId.trim(); // Create the user key
    obj[key] = {}; // Initialize the user object
    const stack = [obj[key]]; // Stack to handle nested structures
    let activeMap = obj[key]; // Current active object for parsing
    let i = 0;

    while (i < props.length) {
      if (props[i] === '{') {
        // If a nested structure starts, create a new map
        const newMap = {};
        const lastKey = stack[stack.length - 1].__currentKey; // Get the key for the nested object
        stack[stack.length - 1][lastKey] = newMap; // Assign the new map to the parent
        stack.push(newMap); // Push the new map to the stack
        activeMap = newMap; // Update the active map
        delete activeMap.__currentKey; // Clean up the temporary key
        i++; // Move past the '{'
      } else if (props[i] === '}') {
        // If a nested structure ends, pop the stack
        stack.pop();
        activeMap = stack[stack.length - 1]; // Update the active map to the parent
        i++;
        if (i < props.length && props[i] === ';') i++; // Skip ';' if present
      } else {
        // Parse a key-value pair
        const equalPos = props.indexOf('=', i); // Find '='
        const delimiter = props.indexOf(';', equalPos); // Find next ';'
        const bracePos = props.indexOf('}', equalPos); // Find next '}'
        const endPos = Math.min(
          delimiter === -1 ? Infinity : delimiter,
          bracePos === -1 ? Infinity : bracePos
        );

        const key = props.substring(i, equalPos).trim(); // Extract key
        const val = props.substring(equalPos + 1, endPos).trim(); // Extract value

        if (val.startsWith('{')) {
          // If the value is a nested structure, set a temporary key
          activeMap.__currentKey = key;
          i = equalPos + 1; // Move to the start of the nested structure
        } else {
          // Assign key-value to the active map
          activeMap[key] = val;
          i = endPos !== Infinity ? endPos : props.length; // Move to the next key-value pair
          if (i < props.length && props[i] === ';') i++; // Skip ';' if present
        }
      }
    }
  }

  // Locate the target user and update the preference
  const userKey = 'User' + userIndex; // Construct the user key
  if (obj[userKey] && obj[userKey].Preferences1 && prefKey in obj[userKey].Preferences1) {
    obj[userKey].Preferences1[prefKey] = newValue; // Update the preference value
  }

  return obj; // Return the updated object
}

// Example usage
let input = "User1:Age1=21;Location1=USA;Preferences1={Food1=Italian;Sport1=Fencing};User2:Age2=30;Location2=Canada;Preferences2={Music2=Jazz;Color2=Blue}";
let userIndex = 1;
let prefKey = "Sport1";
let newValue = "Hockey";

let updatedPreferences = updatePreference(input, userIndex, prefKey, newValue);
console.log(updatedPreferences);
