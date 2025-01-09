function solution(jsonString, updateValue) {
  const object = JSON.parse(jsonString);
  const key = 'key4';
  
  const upd = (obj) => {
    if (obj.hasOwnProperty(key)) {
      obj[key] = updateValue;
      return true;
    }

    for (const innerMap of Object.values(obj)) {
      if(typeof innerMap === 'object' && innerMap !== null) {
        if (upd(innerMap)) {
          return true;
        }
      }
    }

    return false;
  };

  upd(object);

  return object;
}

const jsonString = "{\"key1\": \"value1\", \"key2\": {\"key3\": \"value3\", \"key4\": \"value4\"}, \"key5\": \"value5\"}";
const newValue = "newValue";

const updatedObject = solution(jsonString, newValue);
console.log(updatedObject);
