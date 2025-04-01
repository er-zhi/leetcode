<details><summary><b>1. What is CQRS?</b></summary>

**CQRS** stands for **Command Query Responsibility Segregation**. It’s a pattern where:

- **Commands** modify state (`createOrder`, `updateUser`)
- **Queries** read state (`getUserById`, `listOrders`)

This separation improves scalability, clarity, and enables different data models for read and write operations.

</details>

<details><summary><b>2. What are the main benefits of CQRS?</b></summary>

- **Scalability**: Separate read/write workloads
- **Optimized queries**: Tailored read models
- **Security**: Fine-grained control over who can read/write
- **Event sourcing compatibility**
- **Decoupling**: Better modularity of responsibilities

</details>

<details><summary><b>3. What’s the difference between CQRS and CRUD?</b></summary>

- **CRUD**: Single model for reading and writing
- **CQRS**: Separate models for commands (writes) and queries (reads)

CQRS avoids overloading a single model with both responsibilities.

</details>

<details><summary><b>4. Is CQRS the same as Event Sourcing?</b></summary>

No — but they are often used together.

- **CQRS** = pattern for separating reads/writes
- **Event Sourcing** = persistence model using events instead of state

CQRS works with or without event sourcing.

</details>

<details><summary><b>5. When should I use CQRS?</b></summary>

Use it when:
- You need **high read/write throughput**
- Your **read/write models differ**
- You’re using **event-driven architecture**
- You need **auditability** or **replayability**
- You have **complex domain logic** (DDD)

Avoid it for **simple CRUD apps**.

</details>

<details><summary><b>6. How do Commands work in CQRS?</b></summary>

A **Command**:
- Represents an intent to change the system
- Is always **write-only**
- Is handled by a **Command Handler**

Example:
```ts
interface CreateUserCommand {
  name: string;
  email: string;
}
```

</details>

<details><summary><b>7. How do Queries work in CQRS?</b></summary>

A **Query**:
- Retrieves data
- Must not mutate state
- Is handled by a **Query Handler**

Example:
```ts
interface GetUserByIdQuery {
  userId: string;
}
```

</details>

<details><summary><b>8. How is data consistency maintained in CQRS?</b></summary>

- **Eventually consistent**: Commands update the write model → events → update read model
- Use **events** or **message buses** to synchronize models
- For strict consistency, avoid separation or use **transactions**

</details>

<details><summary><b>9. How do you implement CQRS in NestJS?</b></summary>

Use [`@nestjs/cqrs`](https://docs.nestjs.com/recipes/cqrs):

1. Define commands/queries
2. Create command/query handlers
3. Register in `CqrsModule`

Example:
```ts
export class CreateUserCommand {
  constructor(public readonly name: string) {}
}
@CommandHandler(CreateUserCommand)
export class CreateUserHandler {
  async execute(command: CreateUserCommand) {
    // write logic
  }
}
```

</details>

<details><summary><b>10. What is a Command Bus in CQRS?</b></summary>

The **Command Bus**:
- Routes commands to their handlers
- Handles command execution lifecycle
- Decouples sender from receiver

In NestJS: `commandBus.execute(new CreateUserCommand(...))`

</details>

<details><summary><b>11. What is a Query Bus?</b></summary>

The **Query Bus**:
- Routes queries to appropriate handlers
- Ensures query logic is isolated
- Used like: `queryBus.execute(new GetUserByIdQuery(...))`

It separates concerns and supports testing, mocking, and logging.

</details>

<details><summary><b>12. How does Kafka relate to CQRS?</b></summary>

Kafka can be used in CQRS for:
- **Emitting domain events** after a command
- **Updating read models** asynchronously
- **Decoupling** write and read services

Example: `OrderCreatedEvent` sent via Kafka → triggers update of read DB.

</details>

<details><summary><b>13. How does CQRS help with performance?</b></summary>

- Read side can be **heavily optimized** (denormalized, indexed)
- Write side can use **complex validation and domain logic**
- You can scale reads and writes **independently**

</details>

<details><summary><b>14. How do you update the read model in CQRS?</b></summary>

After a command:
1. Emit a **domain event**
2. A consumer listens and **updates the read database**

This is usually **asynchronous** → eventual consistency.

</details>

<details><summary><b>15. What challenges can arise with CQRS?</b></summary>

- **Complexity**: More components, more code
- **Eventual consistency**: Must handle stale reads
- **Debugging**: Harder due to async flow
- **Testing**: Requires mocking buses and handlers

</details>

<details><summary><b>16. What’s the role of events in CQRS?</b></summary>

- Events capture what **happened** in the system
- They are used to:
    - Update read models
    - Notify other systems
    - Enable event sourcing (optional)

</details>

<details><summary><b>17. Can I use the same database for command and query in CQRS?</b></summary>

Yes, but:
- You lose some benefits (e.g., independent scaling, tailored models)
- It’s useful for **transition phase** before full separation

</details>

<details><summary><b>18. How do I version events in a CQRS system?</b></summary>

Use:
- **Schema versioning** (e.g., Avro, JSON Schema)
- Store `version` field in the event
- Write backward/forward-compatible handlers

Important for long-lived systems.

</details>

<details><summary><b>19. Can CQRS be used without microservices?</b></summary>

Absolutely. CQRS is a **design pattern**, not an architecture.

You can use it in a monolith:
- Separate command/query classes and handlers
- Use in-memory event bus instead of Kafka

</details>

<details><summary><b>20. What tools support CQRS in Node.js?</b></summary>

- [`@nestjs/cqrs`](https://www.npmjs.com/package/@nestjs/cqrs)
- KafkaJS (for event bus)
- TypeORM/Prisma (for persistence)
- Redis (for fast read model)
- EventStoreDB (for event sourcing)

</details>
