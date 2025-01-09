
## 41. What are weak references in JavaScript?
Weak references allow you to hold a reference to an object without preventing it from being garbage collected.
```javascript
let obj = { name: 'John' };
let weakRef = new WeakRef(obj);
```

## 42. How do you optimize performance in large-scale applications?
- **Use of lazy loading**: Load resources only when required.
- **Efficient DOM updates**: Minimize reflows and repaints.
- **Memoization**: Cache results of expensive function calls.
- **Code splitting**: Break your code into smaller chunks.
- **Use of web workers**: Offload heavy computation to background threads.

## 43. What are some common security issues in JavaScript applications?
- **Cross-Site Scripting (XSS)**: Injecting malicious scripts into web pages.
- **Cross-Site Request Forgery (CSRF)**: Trick a user into making an unwanted request.
- **Insecure APIs**: Exposing sensitive data through unprotected APIs.
- **SQL Injection**: Inserting malicious SQL queries into an application.
- **Man-in-the-Middle Attacks**: Intercepting communication between client and server.
