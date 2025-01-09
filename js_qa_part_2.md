
## 11. Implement the Publisher-Subscriber pattern in JavaScript
```javascript
class PubSub {
    constructor() {
        this.subscribers = {};
    }
    
    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    }
    
    unsubscribe(event, callback) {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
        }
    }

    publish(event, data) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(callback => callback(data));
        }
    }
}
```

## 12. Prototype and prototype inheritance
```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    console.log(`Hello, my name is ${this.name}`);
};

const john = new Person('John');
john.sayHello();  // Outputs: Hello, my name is John
```

## 13. Event delegation and event propagation in JavaScript
### Event Delegation
```javascript
document.getElementById('parent').addEventListener('click', function (event) {
    if (event.target && event.target.matches('button.classname')) {
        console.log('Button clicked');
    }
});
```

### Event Propagation
```javascript
// Event capturing
document.getElementById('parent').addEventListener('click', () => console.log('Parent Capturing'), true);

// Event bubbling
document.getElementById('child').addEventListener('click', () => console.log('Child Bubbling'));
```

## 14. Clone an object
```javascript
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const original = { name: 'John', age: 30 };
const clone = deepClone(original);
console.log(clone);
```

## 15. Debouncing and Throttling
### Debouncing
```javascript
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}
```

### Throttling
```javascript
function throttle(func, delay) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            func(...args);
        }
    };
}
```

## 16. Implement clearAllTimeout()
```javascript
function clearAllTimeout() {
    let id = setTimeout(() => {}, 0);
    while (id--) {
        clearTimeout(id);
    }
}
```

## 17. How does "this" work in different scenarios?
- **Global context**: In non-strict mode, `this` refers to the global object (`window` in browsers).
- **Inside a function**: `this` refers to the function's execution context, which may depend on how the function is called.
- **Inside an object method**: `this` refers to the object calling the method.
- **Inside an arrow function**: `this` is lexically bound and refers to the outer context.
  
## 18. What is the difference between synchronous and asynchronous code?
- **Synchronous code** is executed sequentially, blocking the following operations until the current one is completed.
- **Asynchronous code** allows operations to run independently, enabling non-blocking execution, often using callbacks, promises, or async/await.

## 19. Explain the concept of "truthy" and "falsy" values.
- **Falsy values**: values that evaluate to false in a boolean context (e.g., `false`, `0`, `''`, `null`, `undefined`, `NaN`).
- **Truthy values**: values that evaluate to true (e.g., non-empty strings, numbers other than 0, objects).

## 20. How do you handle errors in JavaScript?
You can handle errors using `try...catch` blocks or by using the `.catch()` method with promises.
```javascript
try {
    throw new Error('Something went wrong');
} catch (error) {
    console.log(error.message);
}
```

## 21. Implement a function to flatten a nested array
```javascript
function flatten(arr) {
    return arr.reduce((acc, item) => {
        return Array.isArray(item) ? acc.concat(flatten(item)) : acc.concat(item);
    }, []);
}
```

## 22. Implement an LRU Cache
```javascript
class LRUCache {
    constructor(limit) {
        this.cache = new Map();
        this.limit = limit;
    }

    get(key) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }

    put(key, value) {
        if (this.cache.size >= this.limit) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }
}
```

## 23. What are closures in JavaScript?
A closure is a function that retains access to variables from its lexical scope, even when the function is executed outside of that scope.
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

## 24. Explain the event loop in JavaScript.
The event loop is the mechanism that allows JavaScript to handle asynchronous operations. It continuously checks the message queue and moves tasks to the call stack when the stack is empty.

## 25. What is the difference between 'var', 'let', and 'const'?
- **var**: Function-scoped or globally scoped (not block-scoped). Can be redeclared and updated.
- **let**: Block-scoped. Can be updated but not redeclared within the same block.
- **const**: Block-scoped. Cannot be updated or redeclared after initialization.
