### Node.js Basics

- <details>
  <summary>1. What is Node.js and why is it used?</summary>

  Node.js is a runtime environment that allows you to run JavaScript on the server side. It is built on the V8 JavaScript engine and is known for its non-blocking, event-driven architecture, which makes it ideal for building scalable, real-time applications.

  ```javascript
  // Example: Simple HTTP server in Node.js
  import http from 'http';

  const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, World!');
  });

  server.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
  });
  ```
  </details>

- <details>
  <summary>2. How does Node.js handle child threads?</summary>

  Node.js uses a single-threaded event loop to handle asynchronous operations. For CPU-intensive tasks, you can create child processes using the `child_process` module.

  ```javascript
  import { fork } from 'child_process';

  const child = fork('./child.js');

  child.on('message', (message) => {
      console.log('Message from child:', message);
  });

  child.send('Hello from parent!');

  // child.js
  process.on('message', (message) => {
      console.log('Message from parent:', message);
      process.send('Hello from child!');
  });
  ```
  </details>

- <details>
  <summary>3. Describe the event-driven programming in Node.js.</summary>

  Event-driven programming is a paradigm where the flow of the program is determined by events such as user actions, messages, or sensor outputs. Node.js heavily relies on this paradigm with its `EventEmitter` class.

  ```javascript
  import EventEmitter from 'events';

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  myEmitter.on('event', () => {
      console.log('An event occurred!');
  });

  myEmitter.emit('event');
  ```
  </details>

- <details>
  <summary>4. What is the event loop in Node.js?</summary>

  The event loop is a mechanism in Node.js that handles asynchronous operations. It continuously checks for tasks in the event queue and processes them when the call stack is empty.

  ```javascript
  console.log('Start');

  setTimeout(() => {
      console.log('Timeout executed');
  }, 0);

  console.log('End');
  // Output:
  // Start
  // End
  // Timeout executed
  ```
  </details>

- <details>
  <summary>5. What is the difference between Node.js and traditional web server technologies?</summary>

  Node.js differs in that it uses an event-driven, non-blocking I/O model, while traditional web servers like Apache use multi-threading to handle requests.

  | Feature            | Node.js                      | Traditional Servers      |
    |--------------------|------------------------------|--------------------------|
  | Concurrency        | Event-driven, non-blocking  | Multi-threaded           |
  | Performance        | High for I/O-heavy tasks    | Can handle CPU-heavy tasks|
  | Language           | JavaScript                  | Multiple (e.g., PHP, Java)|
  </details>

- <details>
  <summary>6. Explain what “non-blocking” means in Node.js.</summary>

  Non-blocking means that operations, like reading files or fetching data, do not stop the execution of the program. Instead, they use callbacks or promises.

  ```javascript
  import fs from 'fs/promises';

  fs.readFile('example.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));

  console.log('File is being read...');
  ```
  </details>

- <details>
  <summary>7. How do you update Node.js to the latest version?</summary>

  Using `nvm` (Node Version Manager):
  ```bash
  nvm install node   # Installs the latest version
  nvm use node       # Switches to the latest version
  ```

  Or using `n`:
  ```bash
  sudo npm install -g n
  sudo n latest
  ```
  </details>

- <details>
  <summary>8. What is “npm” and what is it used for?</summary>

  `npm` (Node Package Manager) is a tool for managing packages and dependencies in Node.js projects.

  ```bash
  # Install a package
  npm install express

  # List installed packages
  npm list

  # Uninstall a package
  npm uninstall express
  ```
  </details>

- <details>
  <summary>9. How do you manage packages in a Node.js project?</summary>

  You manage packages using `npm` or `yarn`. Dependencies are listed in `package.json` and can be installed, updated, or removed as needed.

  ```bash
  # Add a package as a dependency
  npm install lodash --save

  # Add a package as a dev dependency
  npm install jest --save-dev
  ```
  </details>

- <details>
  <summary>10. What is a package.json file?</summary>

  `package.json` is a file that contains metadata about a Node.js project and its dependencies.

  Example:
  ```json
  {
    "name": "my-project",
    "version": "1.0.0",
    "description": "A sample Node.js project",
    "main": "index.js",
    "type": "module",
    "scripts": {
      "start": "node index.js",
      "test": "jest"
    },
    "dependencies": {
      "express": "^4.17.1"
    },
    "devDependencies": {
      "jest": "^27.0.6"
    }
  }
  ```
  </details>
### Node.js Core Modules

- <details>
  <summary>11. Describe some of the core modules of Node.js.</summary>

  Node.js includes several core modules that provide functionality without the need to install additional packages. Examples include:

    - **http**: Used to create HTTP servers and clients.
    - **fs**: Provides file system operations like reading and writing files.
    - **path**: Helps in handling and transforming file paths.
    - **os**: Provides operating system-related utility methods and properties.
    - **events**: Implements the EventEmitter class for event-driven programming.

  ```javascript
  import os from 'os';

  console.log('System architecture:', os.arch());
  console.log('Free memory:', os.freemem());
  ```
  </details>

- <details>
  <summary>12. How do you create a simple server in Node.js using the HTTP module?</summary>

  The `http` module is used to create HTTP servers. Here’s an example:

  ```javascript
  import http from 'http';

  const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, World!');
  });

  server.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
  });
  ```
  </details>

- <details>
  <summary>13. Explain the purpose of the File System (fs) module.</summary>

  The `fs` module allows you to interact with the file system, enabling you to read, write, and manipulate files and directories.

  ```javascript
  import fs from 'fs/promises';

  // Write to a file
  await fs.writeFile('example.txt', 'Hello, World!');

  // Read from a file
  const data = await fs.readFile('example.txt', 'utf8');
  console.log(data);
  ```
  </details>

- <details>
  <summary>14. What is the Buffer class in Node.js?</summary>

  The `Buffer` class is used to handle binary data. It is particularly useful when working with streams and file I/O.

  ```javascript
  import { Buffer } from 'buffer';

  const buf = Buffer.from('Hello, World!');
  console.log(buf.toString('utf8')); // Outputs: Hello, World!
  console.log(buf.toJSON()); // Outputs the buffer in JSON format
  ```
  </details>

- <details>
  <summary>15. What are streams in Node.js and what types are available?</summary>

  Streams are objects that let you read or write data continuously. Types of streams include:

    - **Readable**: For reading data.
    - **Writable**: For writing data.
    - **Duplex**: For both reading and writing.
    - **Transform**: A type of duplex stream that can modify or transform the data.

  ```javascript
  import fs from 'fs';

  const readable = fs.createReadStream('example.txt');
  readable.on('data', (chunk) => {
      console.log('Read chunk:', chunk.toString());
  });
  ```
  </details>

- <details>
  <summary>16. How do you read and write files in Node.js?</summary>

  You can use the `fs` module to perform file operations:

  ```javascript
  import fs from 'fs/promises';

  // Write to a file
  await fs.writeFile('example.txt', 'Hello, World!');

  // Read from a file
  const data = await fs.readFile('example.txt', 'utf8');
  console.log(data);
  ```
  </details>

- <details>
  <summary>17. How do you use the EventEmitter in Node.js?</summary>

  The `EventEmitter` class is used for event-driven programming. You can define and listen for custom events.

  ```javascript
  import { EventEmitter } from 'events';

  const emitter = new EventEmitter();

  emitter.on('customEvent', (message) => {
      console.log('Received:', message);
  });

  emitter.emit('customEvent', 'Hello, EventEmitter!');
  ```
  </details>

- <details>
  <summary>18. What is the QueryString module?</summary>

  The `querystring` module provides utilities to parse and stringify URL query strings.

  ```javascript
  import querystring from 'querystring';

  const query = 'name=John&age=30';
  const parsed = querystring.parse(query);
  console.log(parsed); // { name: 'John', age: '30' }

  const stringified = querystring.stringify(parsed);
  console.log(stringified); // name=John&age=30
  ```
  </details>

- <details>
  <summary>19. How do you manage path operations in Node.js?</summary>

  The `path` module helps with handling and transforming file paths.

  ```javascript
  import path from 'path';

  const filePath = '/user/local/file.txt';
  console.log(path.basename(filePath)); // Outputs: file.txt
  console.log(path.dirname(filePath));  // Outputs: /user/local
  console.log(path.extname(filePath));  // Outputs: .txt
  ```
  </details>
### Asynchronous Programming

- <details>
  <summary>20. What are callbacks in Node.js?</summary>

  Callbacks are functions passed as arguments to other functions and executed after some operation is completed. They are widely used in Node.js for handling asynchronous operations.

  ```javascript
  import fs from 'fs';

  fs.readFile('example.txt', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }
      console.log('File content:', data);
  });
  ```
  </details>

- <details>
  <summary>21. What is callback hell and how can it be avoided?</summary>

  Callback hell occurs when multiple nested callbacks make code difficult to read and maintain. It can be avoided using:

    - **Modular functions**: Break callbacks into separate named functions.
    - **Promises**: Replace callbacks with `.then()` and `.catch()`.
    - **Async/await**: Simplify asynchronous code with synchronous-like syntax.

  ```javascript
  // Example of using promises to avoid callback hell
  import fs from 'fs/promises';

  async function readFileContent() {
      try {
          const data = await fs.readFile('example.txt', 'utf8');
          console.log('File content:', data);
      } catch (err) {
          console.error('Error reading file:', err);
      }
  }

  readFileContent();
  ```
  </details>

- <details>
  <summary>22. Explain promises in Node.js.</summary>

  Promises are objects representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

  ```javascript
  const fetchData = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Data fetched successfully'), 1000);
  });

  fetchData
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  ```
  </details>

- <details>
  <summary>23. How do async/await functions work in Node.js?</summary>

  Async/await functions simplify working with promises by allowing asynchronous code to be written in a synchronous style.

  ```javascript
  const fetchData = () => {
      return new Promise((resolve, reject) => {
          setTimeout(() => resolve('Data fetched successfully'), 1000);
      });
  };

  async function getData() {
      try {
          const data = await fetchData();
          console.log(data);
      } catch (err) {
          console.error(err);
      }
  }

  getData();
  ```
  </details>

- <details>
  <summary>24. What is the difference between synchronous and asynchronous methods in the fs module?</summary>

    - **Synchronous methods** block the execution of the program until the operation is complete.
    - **Asynchronous methods** allow the program to continue execution while the operation is performed in the background.

  ```javascript
  import fs from 'fs';

  // Synchronous method
  const dataSync = fs.readFileSync('example.txt', 'utf8');
  console.log('Synchronous read:', dataSync);

  // Asynchronous method
  fs.readFile('example.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log('Asynchronous read:', data);
  });
  ```
  </details>

### Networking in Node.js

- <details>
  <summary>25. How does Node.js handle HTTP requests and responses?</summary>

  Node.js handles HTTP requests and responses using the `http` module. You can create an HTTP server and define request-response logic.

  ```javascript
  import http from 'http';

  const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, HTTP!');
  });

  server.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
  });
  ```
  </details>

- <details>
  <summary>26. What is Express.js and why is it important for Node.js?</summary>

  Express.js is a minimal and flexible web application framework for Node.js that provides tools to build web applications and APIs.

  ```javascript
  import express from 'express';

  const app = express();

  app.get('/', (req, res) => {
      res.send('Hello, Express!');
  });

  app.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
  });
  ```
  </details>

- <details>
  <summary>27. How do you create a RESTful API with Node.js?</summary>

  You can use Express.js to create a RESTful API with endpoints for CRUD operations.

  ```javascript
  import express from 'express';

  const app = express();
  app.use(express.json());

  const items = [];

  app.post('/items', (req, res) => {
      items.push(req.body);
      res.status(201).send(req.body);
  });

  app.get('/items', (req, res) => {
      res.send(items);
  });

  app.listen(3000, () => {
      console.log('API running at http://localhost:3000/');
  });
  ```
  </details>

- <details>
  <summary>28. What is middleware in the context of Node.js?</summary>

  Middleware in Express.js is a function that has access to the request, response, and next middleware function in the application’s request-response cycle.

  ```javascript
  import express from 'express';

  const app = express();

  // Middleware to log requests
  app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
  });

  app.get('/', (req, res) => {
      res.send('Hello, Middleware!');
  });

  app.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
  });
  ```
  </details>

- <details>
  <summary>29. How do you ensure security in HTTP headers with Node.js?</summary>

  Use middleware like `helmet` to secure HTTP headers in Express.js.

  ```javascript
  import express from 'express';
  import helmet from 'helmet';

  const app = express();

  app.use(helmet());

  app.get('/', (req, res) => {
      res.send('Secure headers applied!');
  });

  app.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
  });
  ```
  </details>
### Error Handling & Debugging

- <details>
  <summary>30. How do you handle errors in Node.js?</summary>

  In Node.js, errors can be handled using:
    - **Try-catch blocks** for synchronous code and async/await.
    - **Error-first callbacks** for asynchronous operations.
    - **Event emitters** to listen for and handle errors.

  ```javascript
  // Async error handling with try-catch
  import fs from 'fs/promises';

  async function readFile() {
      try {
          const data = await fs.readFile('example.txt', 'utf8');
          console.log(data);
      } catch (err) {
          console.error('Error:', err);
      }
  }

  readFile();
  ```
  </details>

- <details>
  <summary>31. Describe some error-first callback patterns in Node.js.</summary>

  Error-first callbacks pass an error as the first argument and the result as the second argument. This pattern ensures consistent error handling.

  ```javascript
  import fs from 'fs';

  fs.readFile('example.txt', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }
      console.log('File content:', data);
  });
  ```
  </details>

- <details>
  <summary>32. What are some common debugging techniques for Node.js applications?</summary>

  Common debugging techniques include:
    - **Using `console.log()`** for basic debugging.
    - **Node.js Debugger**: Run with `node --inspect` or `node --inspect-brk`.
    - **Third-party tools**: Use tools like Chrome DevTools or Visual Studio Code debugger.

  ```bash
  # Start debugging
  node --inspect-brk app.js
  ```
  </details>

- <details>
  <summary>33. Explain process.nextTick().</summary>

  `process.nextTick()` defers the execution of a callback function until the next iteration of the event loop.

  ```javascript
  console.log('Before nextTick');

  process.nextTick(() => {
      console.log('Inside nextTick');
  });

  console.log('After nextTick');

  // Output:
  // Before nextTick
  // After nextTick
  // Inside nextTick
  ```
  </details>

- <details>
  <summary>34. What is the global object in Node.js?</summary>

  The `global` object provides access to global variables and functions in Node.js, such as `console`, `process`, and `Buffer`.

  ```javascript
  console.log(global.process.version); // Node.js version
  console.log(global.console.log('Hello, global!'));
  ```
  </details>

### Testing in Node.js

- <details>
  <summary>35. What frameworks are available for testing Node.js applications?</summary>

  Popular testing frameworks for Node.js include:
    - **Mocha**: Flexible and widely used.
    - **Jest**: Great for JavaScript/TypeScript testing.
    - **Chai**: Provides assertion libraries.

  ```javascript
  // Example using Jest
  test('adds 1 + 2 to equal 3', () => {
      expect(1 + 2).toBe(3);
  });
  ```
  </details>

- <details>
  <summary>36. Explain the concept of mocking in Node.js.</summary>

  Mocking is a technique to simulate external dependencies in tests to isolate the functionality being tested.

  ```javascript
  // Mocking a function with Jest
  const fetchData = jest.fn(() => Promise.resolve('Mocked Data'));

  test('fetchData should return mocked data', async () => {
      const data = await fetchData();
      expect(data).toBe('Mocked Data');
  });
  ```
  </details>

- <details>
  <summary>37. Why is benchmarking important in Node.js?</summary>

  Benchmarking helps measure the performance of code to identify bottlenecks and optimize applications.

  ```javascript
  console.time('Loop');
  for (let i = 0; i < 1000000; i++) {
      // Simulate work
  }
  console.timeEnd('Loop');
  ```
  </details>

- <details>
  <summary>38. How do you test an HTTP server in Node.js?</summary>

  Use testing libraries like **Supertest** with frameworks like Jest or Mocha to test HTTP servers.

  ```javascript
  import request from 'supertest';
  import express from 'express';

  const app = express();

  app.get('/', (req, res) => {
      res.status(200).send('Hello, HTTP Test!');
  });

  test('GET / should return 200', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello, HTTP Test!');
  });
  ```
  </details>
### Node.js with Databases

- <details>
  <summary>39. How do you connect a MySQL database with Node.js?</summary>

  Use the `mysql2` or `sequelize` package to connect and interact with a MySQL database.

  ```javascript
  import mysql from 'mysql2/promise';

  async function connectToDatabase() {
      const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'password',
          database: 'testdb'
      });

      const [rows] = await connection.execute('SELECT * FROM users');
      console.log(rows);
  }

  connectToDatabase();
  ```
  </details>

- <details>
  <summary>40. Explain how NoSQL databases like MongoDB can be used with Node.js.</summary>

  Use the `mongoose` library or MongoDB's native driver to interact with MongoDB.

  ```javascript
  import mongoose from 'mongoose';

  async function connectToMongoDB() {
      await mongoose.connect('mongodb://localhost:27017/testdb', {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });

      const userSchema = new mongoose.Schema({ name: String, age: Number });
      const User = mongoose.model('User', userSchema);

      const user = new User({ name: 'John', age: 30 });
      await user.save();
      console.log('User saved:', user);
  }

  connectToMongoDB();
  ```
  </details>

- <details>
  <summary>41. What’s the role of ORM in Node.js?</summary>

  ORM (Object-Relational Mapping) simplifies database interactions by allowing you to use JavaScript objects instead of raw SQL queries.

  Example using `Sequelize`:
  ```javascript
  import { Sequelize, DataTypes } from 'sequelize';

  const sequelize = new Sequelize('sqlite::memory:');

  const User = sequelize.define('User', {
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      age: {
          type: DataTypes.INTEGER
      }
  });

  await sequelize.sync();
  const user = await User.create({ name: 'Jane', age: 25 });
  console.log(user.toJSON());
  ```
  </details>

### Node.js Performance

- <details>
  <summary>42. How can you monitor the performance of a Node.js app?</summary>

  Use monitoring tools like:
    - **PM2**: For process management and monitoring.
    - **New Relic** or **Datadog**: For application performance monitoring.
    - **Node.js built-in profiler**: Use `node --inspect` to analyze performance.

  ```bash
  # Start app with PM2
  pm2 start app.js

  # Monitor app with PM2
  pm2 monit
  ```
  </details>

- <details>
  <summary>43. What is clustering in Node.js and how does it work?</summary>

  Clustering allows Node.js to utilize multiple CPU cores by creating child processes (workers).

  ```javascript
  import cluster from 'cluster';
  import os from 'os';
  import http from 'http';

  if (cluster.isPrimary) {
      const numCPUs = os.cpus().length;

      for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
      }

      cluster.on('exit', (worker) => {
          console.log(`Worker ${worker.process.pid} exited`);
      });
  } else {
      http.createServer((req, res) => {
          res.writeHead(200);
          res.end('Hello, Cluster!');
      }).listen(3000);
  }
  ```
  </details>

- <details>
  <summary>44. How can you prevent memory leaks in a Node.js application?</summary>

  Tips to prevent memory leaks:
    - Avoid global variables.
    - Monitor memory usage with `process.memoryUsage()`.
    - Use tools like **Heapdump** or **clinic.js** to analyze memory.

  ```javascript
  setInterval(() => {
      console.log(process.memoryUsage());
  }, 5000);
  ```
  </details>

- <details>
  <summary>45. Explain the use of the --inspect flag in Node.js.</summary>

  The `--inspect` flag enables debugging of Node.js applications using Chrome DevTools or other debuggers.

  ```bash
  node --inspect-brk app.js
  ```

  Open `chrome://inspect` in Chrome to debug the app.
  </details>

### Concurrency in Node.js

- <details>
  <summary>46. How does Node.js handle concurrency?</summary>

  Node.js uses the event loop and a single-threaded model for handling concurrency. Long-running tasks are offloaded to the **worker pool** using the `libuv` library.

  ```javascript
  import fs from 'fs';

  fs.readFile('example.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
  });

  console.log('File is being read...');
  ```
  </details>

- <details>
  <summary>47. What is the difference between process and child_process modules?</summary>

    - **`process`**: Provides information and control over the current Node.js process.
    - **`child_process`**: Enables the creation of child processes to run scripts or commands.

  ```javascript
  import { exec } from 'child_process';

  exec('ls', (err, stdout) => {
      if (err) throw err;
      console.log(stdout);
  });
  ```
  </details>

- <details>
  <summary>48. How do worker threads work in Node.js?</summary>

  Worker threads allow running JavaScript code in parallel threads.

  ```javascript
  import { Worker } from 'worker_threads';

  const worker = new Worker(`
      const { parentPort } = require('worker_threads');
      parentPort.postMessage('Hello from Worker');
  `, { eval: true });

  worker.on('message', (message) => {
      console.log('Received:', message);
  });
  ```
  </details>
### Node.js and Microservices

- <details>
  <summary>49. How is Node.js used in microservices architecture?</summary>

  Node.js is well-suited for microservices due to its lightweight and asynchronous nature. Each microservice can be a separate Node.js application communicating over HTTP, WebSockets, or a message broker like RabbitMQ or Kafka.

  ```javascript
  import express from 'express';

  const app = express();

  app.get('/service', (req, res) => {
      res.json({ message: 'Response from microservice' });
  });

  app.listen(3001, () => {
      console.log('Microservice running on port 3001');
  });
  ```
  </details>

- <details>
  <summary>50. Explain inter-process communication in a Node.js microservice architecture.</summary>

  Inter-process communication (IPC) can be achieved using:
    - **Message brokers** (e.g., RabbitMQ, Kafka) for asynchronous messaging.
    - **REST APIs** for synchronous communication.
    - **WebSockets** for real-time communication.

  Example with RabbitMQ:
  ```javascript
  import amqp from 'amqplib';

  async function sendMessage() {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      const queue = 'tasks';

      await channel.assertQueue(queue);
      channel.sendToQueue(queue, Buffer.from('Hello, World!'));
      console.log('Message sent');

      await channel.close();
      await connection.close();
  }

  sendMessage();
  ```
  </details>

### Security in Node.js

- <details>
  <summary>51. What are some common security best practices for Node.js applications?</summary>

    - Validate and sanitize user inputs to prevent SQL injection and XSS.
    - Use HTTPS for secure communication.
    - Store sensitive information in environment variables.
    - Regularly update dependencies to avoid vulnerabilities.
    - Use security-focused middleware like `helmet`.

  ```javascript
  import helmet from 'helmet';
  import express from 'express';

  const app = express();
  app.use(helmet());
  ```
  </details>

- <details>
  <summary>52. How would you protect your Node.js application from XSS attacks?</summary>

    - Use libraries like `xss-clean` or sanitize user inputs manually.
    - Implement Content Security Policy (CSP) headers with `helmet`.

  ```javascript
  import express from 'express';
  import helmet from 'helmet';

  const app = express();
  app.use(helmet({
      contentSecurityPolicy: {
          directives: {
              defaultSrc: ["'self'"]
          }
      }
  }));
  ```
  </details>

- <details>
  <summary>53. What are environment variables and how could you use them in Node.js?</summary>

  Environment variables store sensitive data like API keys or database credentials. Use the `dotenv` package to load environment variables from a `.env` file.

  ```javascript
  import dotenv from 'dotenv';
  dotenv.config();

  console.log('Database URL:', process.env.DB_URL);
  ```
  </details>

### Node.js and WebSockets

- <details>
  <summary>54. What are WebSockets and how do they work with Node.js?</summary>

  WebSockets enable real-time, bidirectional communication between a server and clients. Use the `ws` library for WebSocket support in Node.js.

  ```javascript
  import { WebSocketServer } from 'ws';

  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws) => {
      ws.on('message', (message) => {
          console.log('Received:', message);
      });

      ws.send('Hello, Client!');
  });
  ```
  </details>

- <details>
  <summary>55. How do you set up a WebSocket server in Node.js?</summary>

  Example of setting up a WebSocket server:

  ```javascript
  import { WebSocketServer } from 'ws';

  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
          console.log('Received:', message);
      });

      ws.send('Welcome to WebSocket server');
  });
  ```
  </details>

### Node.js Deployment

- <details>
  <summary>56. How do you deploy a Node.js application in production?</summary>

  Steps for deploying a Node.js application:
    1. Use a process manager like PM2 for managing the application.
    2. Serve the application behind a reverse proxy (e.g., Nginx).
    3. Use Docker for containerized deployments.

  ```bash
  pm2 start app.js --name my-app
  ```
  </details>

- <details>
  <summary>57. What is PM2 and how is it used in Node.js?</summary>

  PM2 is a process manager for Node.js applications. It ensures uptime by restarting the app if it crashes.

  ```bash
  # Install PM2
  npm install -g pm2

  # Start an app
  pm2 start app.js

  # Monitor processes
  pm2 monit
  ```
  </details>

- <details>
  <summary>58. Explain how you would use Docker with a Node.js application.</summary>

  Docker simplifies deployment by containerizing the application. Example Dockerfile:

  ```dockerfile
  # Use Node.js base image
  FROM node:16

  # Set working directory
  WORKDIR /usr/src/app

  # Copy package files
  COPY package*.json ./

  # Install dependencies
  RUN npm install

  # Copy source code
  COPY . .

  # Expose port and run the app
  EXPOSE 3000
  CMD ["node", "app.js"]
  ```

  Build and run the Docker container:
  ```bash
  docker build -t my-node-app .
  docker run -p 3000:3000 my-node-app
  ```
  </details>
### Node.js and Version Control

- <details>
  <summary>59. How do you manage versioning of a Node.js API?</summary>

  API versioning is typically handled by including the version number in the API URL or headers. This helps maintain backward compatibility.

  ```javascript
  import express from 'express';

  const app = express();

  app.get('/api/v1/resource', (req, res) => {
      res.json({ message: 'API v1 resource' });
  });

  app.get('/api/v2/resource', (req, res) => {
      res.json({ message: 'API v2 resource' });
  });

  app.listen(3000, () => {
      console.log('Server running on port 3000');
  });
  ```
  </details>

- <details>
  <summary>60. What are semantic versioning (semver) and its importance in Node.js development?</summary>

  Semantic versioning (semver) is a versioning scheme following `MAJOR.MINOR.PATCH` format:
    - **MAJOR**: Incompatible API changes.
    - **MINOR**: Backward-compatible feature additions.
    - **PATCH**: Backward-compatible bug fixes.

  ```bash
  # Example
  1.0.0 -> Initial release
  1.1.0 -> Added new features
  2.0.0 -> Breaking changes
  ```

  Importance:
    - Ensures compatibility.
    - Simplifies dependency management.
    - Communicates changes clearly.
  </details>

### Node.js Advanced Topics

- <details>
  <summary>61. What is the difference between exports and module.exports in Node.js?</summary>

  `exports` is a shorthand for `module.exports`. If you reassign `module.exports`, you need to use it explicitly.

  ```javascript
  // Using exports
  exports.greet = () => 'Hello!';

  // Using module.exports
  module.exports = {
      greet: () => 'Hello!',
      farewell: () => 'Goodbye!'
  };
  ```
  </details>

- <details>
  <summary>62. How can you create a simple TCP server in Node.js?</summary>

  Use the `net` module to create a TCP server.

  ```javascript
  import net from 'net';

  const server = net.createServer((socket) => {
      console.log('Client connected');

      socket.on('data', (data) => {
          console.log('Received:', data.toString());
          socket.write('Echo: ' + data);
      });

      socket.on('end', () => {
          console.log('Client disconnected');
      });
  });

  server.listen(8080, () => {
      console.log('TCP server running on port 8080');
  });
  ```
  </details>

- <details>
  <summary>63. What is REPL in Node.js?</summary>

  REPL (Read-Eval-Print Loop) is an interactive shell to execute Node.js code line by line.

  ```bash
  # Start REPL
  node

  > const x = 10;
  > x * 2
  20
  ```

  Features:
    - Evaluate expressions.
    - Access modules and libraries.
    - Debug small code snippets interactively.
  </details>

- <details>
  <summary>64. Explain the role of a reverse proxy with Node.js applications.</summary>

  A reverse proxy forwards client requests to backend servers. Benefits:
    - Load balancing.
    - SSL termination.
    - Improved security.

  Example using Nginx:
  ```nginx
  server {
      listen 80;
      location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
      }
  }
  ```
  </details>

- <details>
  <summary>65. How do Node.js streams enhance performance?</summary>

  Streams handle data in chunks, enabling efficient processing of large datasets.

  ```javascript
  import fs from 'fs';

  const readable = fs.createReadStream('largeFile.txt');
  const writable = fs.createWriteStream('output.txt');

  readable.pipe(writable);
  ```

  Benefits:
    - Reduced memory usage.
    - Faster data transfer for large files.
  </details>

### Frameworks and Libraries in Node.js

- <details>
  <summary>66. Describe some popular frameworks and libraries in the Node.js ecosystem.</summary>

    - **Express.js**: Minimalist web framework.
    - **NestJS**: Full-featured framework for scalable server-side apps.
    - **Koa**: Lightweight and modular framework.
    - **Socket.IO**: Real-time, bidirectional communication.
    - **Mongoose**: MongoDB object modeling.
  </details>

- <details>
  <summary>67. How is Koa different from Express.js?</summary>

    - **Koa**: Focuses on middleware composition, uses async/await natively.
    - **Express.js**: Higher-level framework with built-in routing and middleware.

  ```javascript
  // Koa example
  import Koa from 'koa';

  const app = new Koa();

  app.use(async (ctx) => {
      ctx.body = 'Hello, Koa!';
  });

  app.listen(3000);
  ```
  </details>

- <details>
  <summary>68. What is NestJS and when would you choose it for your Node.js project?</summary>

  NestJS is a framework built on TypeScript, inspired by Angular, and used for building scalable, enterprise-grade applications.

  Use it when:
    - You need a modular architecture.
    - The project requires complex domain logic.
    - TypeScript support is essential.

  ```bash
  # Create a new project
  npm i -g @nestjs/cli
  nest new project-name
  ```
  </details>

- <details>
  <summary>69. What are the benefits of using TypeScript with Node.js?</summary>

  Benefits of TypeScript:
    - Static typing for catching errors at compile-time.
    - Better IDE support with IntelliSense.
    - Easier code refactoring.
    - Enhanced maintainability for large codebases.

  ```typescript
  // Example TypeScript file
  const greet = (name: string): string => {
      return `Hello, ${name}!`;
  };

  console.log(greet('John'));
  ```
  </details>
### Node.js and Message Queues

- <details>
  <summary>81. What are message queues and how are they used in Node.js?</summary>

  Message queues enable asynchronous communication between services by decoupling producers and consumers. Examples include RabbitMQ, Kafka, and AWS SQS.

  ```javascript
  // Example using RabbitMQ
  import amqp from 'amqplib';

  async function sendMessage() {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      const queue = 'tasks';

      await channel.assertQueue(queue);
      channel.sendToQueue(queue, Buffer.from('Hello, World!'));
      console.log('Message sent');

      await channel.close();
      await connection.close();
  }

  sendMessage();
  ```
  </details>

- <details>
  <summary>82. How do you implement RabbitMQ with Node.js?</summary>

  RabbitMQ integration uses libraries like `amqplib` for message handling.

  ```javascript
  import amqp from 'amqplib';

  async function receiveMessage() {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      const queue = 'tasks';

      await channel.assertQueue(queue);

      channel.consume(queue, (msg) => {
          if (msg) {
              console.log('Received:', msg.content.toString());
              channel.ack(msg);
          }
      });
  }

  receiveMessage();
  ```
  </details>

- <details>
  <summary>83. What is the significance of ZeroMQ in Node.js applications?</summary>

  ZeroMQ is a high-performance messaging library used for building scalable distributed systems. It supports patterns like publish/subscribe and request/reply.

  ```javascript
  import zmq from 'zeromq';

  async function run() {
      const sock = new zmq.Push();
      await sock.bind('tcp://127.0.0.1:3000');
      console.log('Producer bound to port 3000');

      setInterval(() => {
          sock.send('Hello from producer');
      }, 1000);
  }

  run();
  ```
  </details>

### Node.js and Cloud Services

- <details>
  <summary>84. How do cloud platforms like AWS, Azure, or GCP facilitate Node.js application deployment?</summary>

  Cloud platforms provide tools for deploying and scaling Node.js apps:
    - **AWS Elastic Beanstalk** for automatic deployments.
    - **Azure App Service** for managed deployments.
    - **GCP App Engine** for serverless application hosting.

  ```bash
  # AWS Elastic Beanstalk example
  eb init
  eb create
  ```
  </details>

- <details>
  <summary>85. What is serverless architecture, and how does it relate to Node.js?</summary>

  Serverless architecture abstracts infrastructure management, allowing developers to focus on writing code. AWS Lambda, Azure Functions, and GCP Cloud Functions support Node.js.

  Example using AWS Lambda:
  ```javascript
  exports.handler = async (event) => {
      return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Hello from Lambda!' })
      };
  };
  ```
  </details>

### Environment Management

- <details>
  <summary>86. How can you manage multiple Node.js versions on the same machine?</summary>

  Use version managers like `nvm` (Node Version Manager):
  ```bash
  # Install nvm
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

  # Install and use a specific Node.js version
  nvm install 16
  nvm use 16
  ```
  </details>

- <details>
  <summary>87. What are .env files and how do they work in a Node.js application?</summary>

  `.env` files store environment-specific variables. Use the `dotenv` package to load these variables into `process.env`.

  ```javascript
  import dotenv from 'dotenv';
  dotenv.config();

  console.log('Database URL:', process.env.DB_URL);
  ```
  </details>

- <details>
  <summary>88. Describe the usage of the config module in Node.js.</summary>

  The `config` module organizes application configuration by environment (e.g., `development`, `production`).

  ```bash
  # Directory structure
  config/
      default.json
      production.json
  ```

  ```javascript
  import config from 'config';

  const dbConfig = config.get('db');
  console.log('Database Host:', dbConfig.host);
  ```
  </details>

### Node.js and Continuous Integration/Continuous Deployment (CI/CD)

- <details>
  <summary>89. What is continuous integration/deployment and how is it implemented for Node.js apps?</summary>

  CI/CD automates testing, building, and deploying applications. Tools like GitHub Actions, Jenkins, and GitLab CI/CD support Node.js projects.

  ```yaml
  # Example GitHub Actions workflow
  name: CI/CD
  on: [push]

  jobs:
    build:
      runs-on: ubuntu-latest

      steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
  ```
  </details>

- <details>
  <summary>90. How do you set up a CI/CD pipeline for a Node.js project?</summary>

  Steps for setting up CI/CD:
    1. Use a CI/CD tool (e.g., GitHub Actions, Jenkins).
    2. Define workflows for building, testing, and deploying the app.

  Example with GitHub Actions:
  ```yaml
  name: Node.js CI/CD
  on:
    push:
      branches:
        - main

  jobs:
    build:
      runs-on: ubuntu-latest

      steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
  ```
  </details>
### Node.js Interview Problem Solving and Scenarios

- <details>
  <summary>91. How would you troubleshoot a slow running Node.js application?</summary>

  Steps to troubleshoot:
    1. Use performance monitoring tools like **Clinic.js** or **New Relic**.
    2. Analyze the event loop delay with `process.hrtime()`.
    3. Profile the application using `--inspect` and Chrome DevTools.
    4. Optimize database queries and reduce I/O operations.
    5. Use caching for frequently accessed data.

  ```javascript
  console.time('Event Loop Delay');
  setTimeout(() => {
      console.timeEnd('Event Loop Delay');
  }, 0);
  ```
  </details>

- <details>
  <summary>92. Describe how to handle file uploads in a Node.js application.</summary>

  Use libraries like `multer` for handling file uploads.

  ```javascript
  import express from 'express';
  import multer from 'multer';

  const app = express();
  const upload = multer({ dest: 'uploads/' });

  app.post('/upload', upload.single('file'), (req, res) => {
      console.log('File uploaded:', req.file);
      res.send('File uploaded successfully');
  });

  app.listen(3000, () => console.log('Server running on port 3000'));
  ```
  </details>

- <details>
  <summary>93. How would you handle heavy computation tasks in a Node.js application?</summary>

  Use worker threads or offload heavy tasks to separate processes to prevent blocking the event loop.

  ```javascript
  import { Worker } from 'worker_threads';

  const worker = new Worker('./worker.js');

  worker.on('message', (result) => {
      console.log('Computation result:', result);
  });

  worker.postMessage({ task: 'heavyComputation' });
  ```
  </details>

### Node.js and DevOps

- <details>
  <summary>94. What is the role of a Node.js application in DevOps?</summary>

  Node.js is used in DevOps for:
    - Building CLI tools for automation.
    - Creating lightweight services for CI/CD pipelines.
    - Implementing monitoring and logging systems.

  Example CLI tool:
  ```javascript
  import { exec } from 'child_process';

  exec('npm install', (err, stdout, stderr) => {
      if (err) {
          console.error('Error:', err);
          return;
      }
      console.log('Output:', stdout);
  });
  ```
  </details>

- <details>
  <summary>95. Describe containerization and its benefits for Node.js applications.</summary>

  Containerization packages applications and their dependencies into containers, ensuring consistency across environments.

  Benefits:
    - Portability and scalability.
    - Isolation of application dependencies.
    - Simplified deployments.

  Example Dockerfile for a Node.js app:
  ```dockerfile
  FROM node:16
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  EXPOSE 3000
  CMD ["node", "app.js"]
  ```
  </details>

### Node.js and IoT

- <details>
  <summary>96. How is Node.js used in IoT (Internet of Things)?</summary>

  Node.js is used in IoT for:
    - Collecting data from sensors.
    - Real-time communication using WebSockets or MQTT.
    - Managing IoT devices with lightweight services.

  Example with MQTT:
  ```javascript
  import mqtt from 'mqtt';

  const client = mqtt.connect('mqtt://broker.hivemq.com');

  client.on('connect', () => {
      client.subscribe('iot/topic');
      client.publish('iot/topic', 'Hello IoT');
  });

  client.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()}`);
  });
  ```
  </details>

- <details>
  <summary>97. What would you consider when developing a Node.js application for IoT devices?</summary>

    - Minimize resource usage (CPU, memory).
    - Ensure secure communication (TLS, encryption).
    - Implement scalability for handling multiple devices.
    - Use lightweight protocols like MQTT.
  </details>

### Node.js and Machine Learning

- <details>
  <summary>98. Can you use Node.js for machine learning? If so, how?</summary>

  Yes, Node.js can be used for machine learning by leveraging libraries like `brain.js` and `tensorflow.js`.

  Example with `brain.js`:
  ```javascript
  import brain from 'brain.js';

  const net = new brain.NeuralNetwork();
  net.train([
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] }
  ]);

  const output = net.run([1, 0]);
  console.log('Output:', output);
  ```
  </details>

- <details>
  <summary>99. What are some machine learning libraries or tools available for Node.js?</summary>

    - **brain.js**: Neural networks in JavaScript.
    - **tensorflow.js**: Machine learning models in Node.js.
    - **Synaptic**: Architecture-free neural networks.

  Example with `tensorflow.js`:
  ```javascript
  import * as tf from '@tensorflow/tfjs-node';

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
  const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

  model.fit(xs, ys, { epochs: 10 }).then(() => {
      model.predict(tf.tensor2d([5], [1, 1])).print();
  });
  ```
  </details>

### APIs and Node.js

- <details>
  <summary>100. What are best practices for designing RESTful APIs in Node.js?</summary>

    - Use meaningful resource names and HTTP verbs.
    - Validate and sanitize inputs to prevent attacks.
    - Implement proper error handling with HTTP status codes.
    - Use middleware for authentication and logging.
    - Document the API with tools like Swagger or Postman.

  ```javascript
  import express from 'express';

  const app = express();
  app.use(express.json());

  app.get('/api/resource', (req, res) => {
      res.json({ message: 'Resource retrieved' });
  });

  app.post('/api/resource', (req, res) => {
      res.status(201).json({ message: 'Resource created' });
  });

  app.listen(3000, () => console.log('API running on port 3000'));
  ```
  </details>
