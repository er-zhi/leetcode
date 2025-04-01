### Node.js and TypeScript Interview Questions

<details><summary><b>1. How does the Event Loop work in Node.js?</b></summary>

Node.js uses a single-threaded event loop to handle asynchronous operations. The Event Loop has multiple phases:

1. **Timers**: Executes `setTimeout()` and `setInterval()` callbacks.
2. **Pending Callbacks**: Executes I/O-related callbacks (excluding close handlers).
3. **Idle, Prepare**: Internal use only.
4. **Poll**: Retrieves new I/O events and executes them.
5. **Check**: Executes `setImmediate()` callbacks.
6. **Close Callbacks**: Handles `socket.on('close', callback)` and similar events.

The Event Loop ensures non-blocking I/O operations and efficient asynchronous execution.

</details>

<details><summary><b>2. What is the difference between setImmediate(), process.nextTick(), and setTimeout()?</b></summary>

- `process.nextTick()`: Executes its callback immediately after the current operation completes, before any I/O events.
- `setImmediate()`: Executes its callback after the I/O phase, before `setTimeout()`.
- `setTimeout()`: Executes its callback after a specified delay, in the Timers phase.

Example:
```javascript
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0);
process.nextTick(() => console.log('nextTick'));
```
**Output:**
```
nextTick
setTimeout
setImmediate
```

</details>

<details><summary><b>3. How does async/await work in JavaScript, and how is it different from Promise.then()?</b></summary>

- `async/await` is syntactic sugar over Promises, making asynchronous code look synchronous.
- `await` pauses execution inside an `async` function until the Promise resolves.
- `Promise.then()` chains callbacks without pausing execution.

Example:
```javascript
async function fetchData() {
  let data = await fetch('https://api.example.com');
  console.log('Data received');
}
fetchData();
console.log('Next task');
```

**Output Order:**
1. `Next task`
2. `Data received`

</details>

<details><summary><b>4. How do Streams work in Node.js?</b></summary>

Streams allow handling large amounts of data efficiently in chunks rather than loading everything into memory.

Types of Streams:
- **Readable Streams** (e.g., `fs.createReadStream()`) → Read data in chunks.
- **Writable Streams** (e.g., `fs.createWriteStream()`) → Write data in chunks.
- **Duplex Streams** (both readable and writable, e.g., Sockets).
- **Transform Streams** (modify data in transit, e.g., compression).

Example:
```javascript
const fs = require('fs');
const readStream = fs.createReadStream('file.txt');
readStream.on('data', chunk => console.log('Chunk received:', chunk));
```

</details>

<details><summary><b>5. How to enforce strict typing in TypeScript, and what are Generics?</b></summary>

- Enable strict mode in `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "strict": true
    }
  }
  ```
- **Generics** allow reusable code with different types:
  ```typescript
  function identity<T>(value: T): T {
    return value;
  }
  let num = identity<number>(42);
  let str = identity<string>('Hello');
  ```

</details>

<details><summary><b>6. How to implement Dependency Injection (DI) in TypeScript?</b></summary>

- Dependency Injection is used for modularity and testability.
- In NestJS, DI is implemented via decorators.

Example:
```typescript
@Injectable()
class UserService {
  constructor(private readonly dbService: DatabaseService) {}
  getUser(id: string) { return this.dbService.findUser(id); }
}
```

</details>

### NestJS and Application Architecture Interview Questions

<details><summary><b>1. How is the modular system in NestJS structured?</b></summary>

NestJS follows a modular architecture where every feature is encapsulated in its own module.

- A **module** is a class decorated with `@Module()` that groups related components (controllers, services, providers, etc.).
- **Feature Modules**: Each domain or feature has its own module (e.g., `UsersModule`, `OrdersModule`).
- **Core Module**: Contains global services like logging or configuration.
- **Shared Module**: Used to share common components across multiple modules.

Example:
```typescript
@Module({
  imports: [UsersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

</details>

<details><summary><b>2. How do Guards, Interceptors, Pipes, and Middleware work?</b></summary>

- **Guards** (`@Injectable()`) – Handle authentication & authorization (`CanActivate`).
- **Interceptors** (`@Injectable()`) – Modify request/response (`@UseInterceptors`).
- **Pipes** (`@Injectable()`) – Validate and transform request data (`@UsePipes`).
- **Middleware** – Process requests before they reach controllers.

Example Guard:
```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true; // Replace with actual auth logic
  }
}
```

</details>

<details><summary><b>3. How does a GraphQL Resolver differ from a REST Controller?</b></summary>

| Feature | REST Controller | GraphQL Resolver |
|---------|----------------|------------------|
| Endpoint-based | Uses routes (`/users`, `/orders`) | Uses a single `/graphql` endpoint |
| Data retrieval | Fetches full resources | Fetches only requested fields |
| HTTP Methods | Uses `GET`, `POST`, etc. | Uses `Query` and `Mutation` |

Example:
```typescript
// REST Controller
@Controller('users')
export class UserController {
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}

// GraphQL Resolver
@Resolver('User')
export class UserResolver {
  @Query(() => User)
  getUser(@Args('id') id: string) {
    return this.userService.findById(id);
  }
}
```

</details>

<details><summary><b>4. How to use CQRS (Command Query Responsibility Segregation) in NestJS?</b></summary>

- **Commands**: Used to modify state (e.g., `CreateUserCommand`).
- **Queries**: Used to retrieve data (`GetUserQuery`).
- **Event Handlers**: Handle domain events (`UserCreatedEvent`).

Example:
```typescript
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  async execute(command: CreateUserCommand) {
    return this.userService.create(command.data);
  }
}
```

</details>

<details><summary><b>5. How to handle events in an Event-Driven Architecture?</b></summary>

- Use **EventEmitters** or **Kafka, RabbitMQ, AWS SQS** for event processing.
- Subscribe to events using `@OnEvent()`.

Example:
```typescript
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    console.log(`User created: ${event.userId}`);
  }
}
```

</details>

### GraphQL Interview Questions

<details><summary><b>1. What is the difference between Query, Mutation, and Subscription?</b></summary>

- **Query**: Used to fetch data (read-only operation).
- **Mutation**: Used to modify data (create, update, delete operations).
- **Subscription**: Used for real-time updates via WebSockets or other transport layers.

Example:

```graphql
# Query
query {
  getUser(id: "123") {
    name
    email
  }
}

# Mutation
mutation {
  createUser(name: "Alice", email: "alice@example.com") {
    id
    name
  }
}

# Subscription
subscription {
  userCreated {
    id
    name
  }
}
```

</details>

<details><summary><b>2. How to prevent N+1 problems in GraphQL API using DataLoader?</b></summary>

- **N+1 Problem**: Occurs when multiple queries are executed separately, leading to inefficiencies.
- **Solution**: Use DataLoader to batch and cache database requests.

Example:

```typescript
import DataLoader from 'dataloader';

const userLoader = new DataLoader(async (userIds) => {
  const users = await userRepository.findByIds(userIds);
  return userIds.map(id => users.find(user => user.id === id));
});

// Usage in Resolver
@Resolver()
class UserResolver {
  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return userLoader.load(id);
  }
}
```

</details>

<details><summary><b>3. How do GraphQL type schema and directives work?</b></summary>

- **Schema** defines types and relationships in GraphQL.
- **Directives** modify query execution behavior (e.g., `@deprecated`, `@auth`).

Example:

```graphql
type User {
  id: ID!
  name: String!
  email: String! @deprecated(reason: "Use contact field instead")
}

directive @auth(role: String) on FIELD_DEFINITION

type Query {
  getUser(id: ID!): User @auth(role: "admin")
}
```

</details>

<details><summary><b>4. What are the authentication and authorization methods in GraphQL?</b></summary>

- **Authentication**: Verifying user identity (JWT, OAuth, API Keys).
- **Authorization**: Defining user permissions (role-based, attribute-based access control).

Example using JWT authentication:

```typescript
import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";

const authMiddleware: MiddlewareFn = ({ context }, next) => {
  const token = context.req.headers.authorization;
  if (!token) throw new Error("Unauthorized");

  try {
    context.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    throw new Error("Invalid token");
  }
};
```

</details>

### Databases (DynamoDB & PostgreSQL) Interview Questions

<details><summary><b>1. What is the difference between NoSQL (DynamoDB) and relational databases (PostgreSQL)?</b></summary>

- **DynamoDB (NoSQL)**:
    - Schema-less, key-value or document-based storage.
    - Horizontally scalable (auto-scaling, partitioning).
    - Best for high-velocity, unstructured, or semi-structured data.

- **PostgreSQL (SQL/Relational DB)**:
    - Schema-based, relational model with ACID compliance.
    - Scales vertically (stronger single-node performance).
    - Best for structured data and complex queries with joins.

</details>

<details><summary><b>2. How do transactions work in PostgreSQL?</b></summary>

- PostgreSQL supports **ACID transactions**:
    - **Atomicity**: All statements in a transaction succeed or fail together.
    - **Consistency**: Database remains in a valid state before/after the transaction.
    - **Isolation**: Transactions do not interfere with each other.
    - **Durability**: Committed transactions are permanently stored.

Example:
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

- Use **ROLLBACK** to undo uncommitted changes.

</details>

<details><summary><b>3. How to optimize SQL queries (indexes, EXPLAIN ANALYZE)?</b></summary>

- **Indexes** improve query performance:
    - `CREATE INDEX idx_name ON users(email);`
    - Use **B-tree** for equality searches, **GIN** for full-text search.

- **EXPLAIN ANALYZE** helps diagnose slow queries:
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```
- **Common optimizations**:
    - Avoid `SELECT *`, specify needed columns.
    - Use **JOINs** efficiently.
    - Normalize data to avoid redundancy.

</details>

<details><summary><b>4. How to scale PostgreSQL (Replication, Sharding)?</b></summary>

- **Replication**:
    - **Streaming Replication**: Sync secondary replicas for read scaling.
    - **Logical Replication**: Syncs specific tables for selective updates.

- **Sharding**:
    - Distribute data across multiple servers.
    - Implemented via **Citus** (PostgreSQL extension) or manual partitioning.

- **Connection Pooling**:
    - Use **PgBouncer** or built-in **connection pooling** for high-concurrency handling.

</details>

<details><summary><b>5. When should DynamoDB be chosen over PostgreSQL?</b></summary>

- **Choose DynamoDB when**:
    - You need **auto-scaling** for unpredictable traffic.
    - Query patterns are simple (key-based lookups, no joins).
    - You require **low-latency, high-availability** across regions.

- **Choose PostgreSQL when**:
    - You need **complex queries** with relationships (JOINs, aggregations).
    - Strong **transaction guarantees** (ACID compliance) are required.
    - The dataset is structured and fits a relational model.

</details>

### DevOps & Infrastructure (Docker, Terraform, AWS) Interview Questions

<details><summary><b>1. How does containerization work in Docker?</b></summary>

- **Containerization** allows applications to run in isolated environments using Docker.
- Each container includes the application and its dependencies, ensuring consistency across environments.
- Uses **Docker Engine** to manage containers with images, layers, and a filesystem.

Example Dockerfile:
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
```

Commands:
```sh
docker build -t my-app .
docker run -d -p 3000:3000 my-app
```

</details>

<details><summary><b>2. How to create and manage Terraform state?</b></summary>

- **Terraform state** tracks infrastructure changes and stores resource mappings.
- Use **remote backends** (S3, Azure Blob) for shared state management.

Example initialization:
```hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-bucket"
    key    = "state/terraform.tfstate"
    region = "us-east-1"
  }
}
```

Commands:
```sh
terraform init
terraform apply
terraform state list
```

</details>

<details><summary><b>3. What are AWS Lambda Triggers and how to use them?</b></summary>

- **Lambda triggers** are events that invoke AWS Lambda functions.
- Common triggers:
    - **S3 Events** (file uploads)
    - **DynamoDB Streams** (database changes)
    - **API Gateway** (HTTP requests)
    - **SNS/SQS** (message processing)

Example setup with S3:
```json
{
  "LambdaFunctionConfigurations": [
    {
      "LambdaFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:my-function",
      "Events": ["s3:ObjectCreated:*"]
    }
  ]
}
```

</details>

<details><summary><b>4. How to manage secrets and environment variables in AWS?</b></summary>

- **AWS Secrets Manager**: Stores API keys, passwords securely.
- **AWS Systems Manager Parameter Store**: Manages configuration parameters.
- **Environment Variables** in Lambda/ECS:
```json
{
  "Environment": {
    "Variables": {
      "DB_HOST": "my-database.amazonaws.com",
      "API_KEY": "secret-key"
    }
  }
}
```

AWS CLI example:
```sh
aws ssm put-parameter --name "/app/api-key" --value "my-secret" --type "SecureString"
```

</details>

<details><summary><b>5. What are common architectural patterns and principles?</b></summary>

- **Microservices**: Breaks applications into independent services.
- **Event-Driven Architecture**: Uses events for decoupling services.
- **Serverless Architecture**: Reduces infrastructure management using Lambda, DynamoDB, API Gateway.
- **Infrastructure as Code (IaC)**: Automates provisioning with Terraform, CloudFormation.
- **SOLID Principles**: Ensures maintainable and scalable software design.

</details>

### Architectural Patterns & Principles Interview Questions

<details><summary><b>1. What are the pros and cons of Hexagonal Architecture?</b></summary>

- **Hexagonal Architecture (Ports & Adapters)** separates business logic from external dependencies.
- **Pros:**
    - Increases testability by decoupling core logic from I/O operations.
    - Improves maintainability and scalability.
    - Facilitates switching infrastructure components (e.g., databases, APIs).
- **Cons:**
    - Higher complexity due to multiple abstraction layers.
    - Requires strict adherence to dependency inversion principles.

Example structure:
```typescript
// Application Layer (Use Case)
class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  execute(userData: CreateUserDto) {
    return this.userRepository.save(userData);
  }
}
```

</details>

<details><summary><b>2. How does Domain-Driven Design (DDD) work?</b></summary>

- **DDD focuses on modeling business logic around domain concepts.**
- **Key components:**
    - **Entities**: Unique objects with an identity (`User`, `Order`).
    - **Value Objects**: Immutable objects without identity (`Price`, `Address`).
    - **Aggregates**: Groups of entities with a single root (`Order -> OrderItems`).
    - **Repositories**: Handles data persistence.
    - **Domain Events**: Captures changes (`OrderCreatedEvent`).

Example:
```typescript
class Order {
  private items: OrderItem[] = [];
  addItem(item: OrderItem) {
    this.items.push(item);
  }
}
```

</details>

<details><summary><b>3. What is the difference between SOA (Service-Oriented Architecture) and Microservices?</b></summary>

| Feature          | SOA                            | Microservices                     |
|-----------------|--------------------------------|-----------------------------------|
| Communication   | Enterprise Service Bus (ESB)  | Lightweight APIs (REST, gRPC)    |
| Granularity    | Coarse-grained (large services) | Fine-grained (small services)    |
| Scalability    | Vertical scaling               | Horizontal scaling               |
| Deployment     | Shared database, centralized   | Independent deployment            |
| Flexibility    | Moderate flexibility           | High flexibility and agility     |

</details>

<details><summary><b>4. What are the SOLID principles and how to apply them in TypeScript?</b></summary>

- **SOLID** is a set of five design principles for maintainable code:
    - **S**ingle Responsibility: Each class should have one reason to change.
    - **O**pen/Closed: Classes should be open for extension but closed for modification.
    - **L**iskov Substitution: Subtypes should be interchangeable with base types.
    - **I**nterface Segregation: Avoid large interfaces; create smaller, specific ones.
    - **D**ependency Inversion: Depend on abstractions, not concrete implementations.

Example in TypeScript:
```typescript
// Dependency Inversion
interface PaymentProcessor {
  process(amount: number): void;
}

class StripeProcessor implements PaymentProcessor {
  process(amount: number) {
    console.log(`Processing $${amount} via Stripe.`);
  }
}
```

</details>

