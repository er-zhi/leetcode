
# JavaScript Q&A

## 1. Implement the compose() and pipe() polyfill
### compose()
```javascript
function compose(...fns) {
    return (x) => fns.reverse().reduce((v, fn) => fn(v), x);
}
```

### pipe()
```javascript
function pipe(...fns) {
    return (x) => fns.reduce((v, fn) => fn(v), x);
}
```

## 2. Promises (Polyfill for Promise.all, Promise.race, Promise.allSettled)
### Promise.all
```javascript
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let count = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((value) => {
                result[index] = value;
                count++;
                if (count === promises.length) resolve(result);
            }).catch(reject);
        });
    });
};
```

### Promise.race
```javascript
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            Promise.resolve(promise).then(resolve).catch(reject);
        });
    });
};
```

### Promise.allSettled
```javascript
Promise.allSettled = function (promises) {
    return new Promise((resolve) => {
        let results = [];
        let count = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                results[index] = { status: 'fulfilled', value };
            }).catch(reason => {
                results[index] = { status: 'rejected', reason };
            }).finally(() => {
                count++;
                if (count === promises.length) resolve(results);
            });
        });
    });
};
```

## 3. Implement the Function.bind, call, and apply methods on the Function prototype
### bind()
```javascript
Function.prototype.myBind = function (context, ...args) {
    return (...newArgs) => this.apply(context, [...args, ...newArgs]);
};
```

### call()
```javascript
Function.prototype.myCall = function (context, ...args) {
    context = context || globalThis;
    const uniqueFn = Symbol('fn');
    context[uniqueFn] = this;
    const result = context[uniqueFn](...args);
    delete context[uniqueFn];
    return result;
};
```

### apply()
```javascript
Function.prototype.myApply = function (context, args) {
    context = context || globalThis;
    const uniqueFn = Symbol('fn');
    context[uniqueFn] = this;
    const result = context[uniqueFn](...args);
    delete context[uniqueFn];
    return result;
};
```

## 4. Implement Async.parallel and Async.series for executing async tasks
### Async.parallel
```javascript
function parallel(tasks, callback) {
    let results = [];
    let count = 0;
    tasks.forEach((task, index) => {
        task((result) => {
            results[index] = result;
            count++;
            if (count === tasks.length) callback(results);
        });
    });
}
```

### Async.series
```javascript
function series(tasks, callback) {
    let results = [];
    let count = 0;
    function next() {
        if (count === tasks.length) {
            callback(results);
            return;
        }
        tasks[count]((result) => {
            results.push(result);
            count++;
            next();
        });
    }
    next();
}
```

## 5. Build a Promise from scratch
```javascript
function MyPromise(executor) {
    this.state = 'pending';
    this.value = null;
    this.callbacks = [];

    const resolve = (value) => {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
            this.callbacks.forEach(callback => callback(value));
        }
    };

    const reject = (reason) => {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.value = reason;
            this.callbacks.forEach(callback => callback(reason));
        }
    };

    executor(resolve, reject);
}

MyPromise.prototype.then = function (callback) {
    if (this.state === 'fulfilled') {
        callback(this.value);
    } else {
        this.callbacks.push(callback);
    }
};
```

## 6. Implement a Retry API
```javascript
function retry(fn, retries, delay) {
    return new Promise((resolve, reject) => {
        const attempt = () => {
            fn().then(resolve).catch((err) => {
                if (retries > 0) {
                    setTimeout(() => attempt(), delay);
                    retries--;
                } else {
                    reject(err);
                }
            });
        };
        attempt();
    });
}
```

## 7. Implement Memoization
```javascript
function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}
```

## 8. Currying (with examples)
```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return function (...newArgs) {
            return curried(...args, ...newArgs);
        };
    };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));  // Outputs 6
```

## 9. String.prototype.repeat
```javascript
if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
        let result = '';
        for (let i = 0; i < count; i++) {
            result += this;
        }
        return result;
    };
}
```

## 10. Design patterns (Singleton, Factory patterns, Builder etc.)
### Singleton
```javascript
const Singleton = (function () {
    let instance;
    function createInstance() {
        return { name: 'Singleton Instance' };
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
```

### Factory Pattern
```javascript
function CarFactory(type) {
    if (type === 'SUV') {
        return new SUV();
    } else if (type === 'Sedan') {
        return new Sedan();
    }
}
```

### Builder Pattern
```javascript
class CarBuilder {
    setEngine(engine) {
        this.engine = engine;
        return this;
    }
    setWheels(wheels) {
        this.wheels = wheels;
        return this;
    }
    build() {
        return new Car(this.engine, this.wheels);
    }
}
```

### Other patterns can be implemented similarly...

# Additional Questions

## How does "this" work in different scenarios?
- **Global context**: In non-strict mode, `this` refers to the global object (`window` in browsers).
- **Inside a function**: `this` refers to the function's execution context, which may depend on how the function is called.
- **Inside an object method**: `this` refers to the object calling the method.
- **Inside an arrow function**: `this` is lexically bound and refers to the outer context.
