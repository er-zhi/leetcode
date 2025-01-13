
## 26. How does hoisting work in JavaScript?
Hoisting is JavaScript's default behavior of moving all declarations to the top of their containing scope during compile time. Only variable declarations (`var`) and function declarations are hoisted.

```javascript
console.log(x); // undefined
var x = 5;
```

## 27. What is the purpose of 'setTimeout' and 'setInterval'?
- **setTimeout()**: Executes a function once after a specified delay.
```javascript
setTimeout(() => console.log('Hello'), 1000);
```
- **setInterval()**: Repeatedly executes a function at specified intervals.
```javascript
setInterval(() => console.log('Hello'), 1000);
```

## 28. Describe how to implement deep cloning of an object.
```javascript
// #1
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
// #2
const modernDeepClone = (original) => structuredClone(original);
// #3
function deepCopyRecursive(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // Return primitives and null as is
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]); // Recursive call
    }
  }

  return copy;
}
```

## 29. What are modules in JavaScript? How do you use them?
Modules allow you to separate your code into reusable pieces. You can import and export functions, objects, and variables between files using `import` and `export`.

```javascript
// module.js
export const greet = (name) => `Hello, ${name}`;

// app.js
import { greet } from './module.js';
console.log(greet('World'));
```

## 30. Explain the concept of `this` binding with examples.
- In a function, `this` refers to the object that called the function.
- In an arrow function, `this` is lexically bound to the outer context.

```javascript
const obj = {
    name: 'John',
    greet: function() {
        console.log(this.name);
    }
};

obj.greet();  // Outputs: John
```

## 31. What is a closure? Provide an example.
A closure is a function that retains access to variables from its lexical scope even after the outer function has returned.
```javascript
function outer() {
    let count = 0;
    return function inner() {
        count++;
        console.log(count);
    };
}

const counter = outer();
counter();  // Outputs: 1
counter();  // Outputs: 2
```

## 33. What are arrow functions, and how do they differ from regular functions?
Arrow functions are anonymous functions introduced in ES6. They do not have their own `this` context, unlike regular functions.
```javascript
// Regular function
function regularFunc() {
    console.log(this);
}

// Arrow function
const arrowFunc = () => {
    console.log(this);
};
```

## 34. Explain the concept of promises chaining.
Promise chaining allows you to execute multiple asynchronous operations in sequence using `.then()`.

```javascript
fetchData()
    .then(data => processData(data))
    .then(result => displayResult(result))
    .catch(error => console.log(error));
```

## 35. What is the purpose of 'Object.create()'?
`Object.create()` is used to create a new object with a specified prototype object.
```javascript
const person = {
    greet() {
        console.log('Hello');
    }
};

const john = Object.create(person);
john.greet();  // Outputs: Hello
```

## 36. How can you check if an object is an array?
```javascript
Array.isArray([]);  // true
Array.isArray({});  // false
```

## 37. What are IIFE (Immediately Invoked Function Expressions)?
IIFE is a function that is defined and executed immediately.
```javascript
(function() {
    console.log('Hello');
})();
```

## 38. Explain how to create a custom event in JavaScript.
```javascript
const event = new Event('myEvent');
element.dispatchEvent(event);
```

## 39. What is JSON, and how do you parse it?
JSON (JavaScript Object Notation) is a lightweight data interchange format.
```javascript
const jsonString = '{"name":"John"}';
const obj = JSON.parse(jsonString);
```

## 40. Describe how to implement a simple event emitter.
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}
```
