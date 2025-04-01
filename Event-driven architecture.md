Вот 10 интервью-вопросов и ответов по **Event-Driven Architecture (EDA)** — всё на английском, в удобном `<details>` формате. Эта подборка охватывает основные концепции, паттерны, преимущества и применение в бэкенде, включая **Node.js, NestJS, Kafka и RabbitMQ**.

---

### 🔟 Event-Driven Architecture (EDA) – Interview Questions & Answers

<details><summary><b>1. What is Event-Driven Architecture?</b></summary>

**Event-Driven Architecture (EDA)** is a design pattern in which services or components **communicate through events**.

- **Producer** emits an event (e.g., `OrderCreated`)
- **Consumers** listen and react asynchronously
- Events are typically **immutable facts** about something that happened

EDA enables **loose coupling** and high scalability.

</details>

<details><summary><b>2. What are the core components of EDA?</b></summary>

1. **Event Producer**: Sends out events (e.g., Order Service emits `order.created`)
2. **Event Consumer**: Listens and reacts (e.g., Billing Service processes payment)
3. **Event Broker**: Transports events (e.g., Kafka, RabbitMQ, NATS)

Events are often JSON objects with metadata like `type`, `timestamp`, and `payload`.

</details>

<details><summary><b>3. What are the benefits of Event-Driven Architecture?</b></summary>

- **Loose coupling** of components
- Supports **asynchronous workflows**
- Enables **scalability and resilience**
- Promotes **modularity and flexibility**
- Ideal for **microservices** and **real-time** applications

</details>

<details><summary><b>4. What are common challenges in Event-Driven systems?</b></summary>

- **Debugging** becomes harder (asynchronous flow)
- **Event ordering and duplication**
- **Event schema versioning**
- **Eventually consistent state**
- Need for **monitoring and observability**

</details>

<details><summary><b>5. How do events differ from commands?</b></summary>

| Concept     | Event                           | Command                          |
|-------------|----------------------------------|-----------------------------------|
| Purpose     | Notify that something happened   | Request that something happens   |
| Direction   | Broadcast (one-to-many)          | Directed (one-to-one)            |
| Coupling    | Decoupled from outcome           | Expect response or side effect   |
| Examples    | `UserRegistered`                 | `RegisterUserCommand`            |

</details>

<details><summary><b>6. How does EDA support microservices?</b></summary>

EDA lets microservices:
- Communicate without direct dependencies
- React to each other’s events (e.g., via Kafka topics)
- Scale independently
- Maintain **eventual consistency** through local data and event syncing

Each service owns its state and subscribes to events it cares about.

</details>

<details><summary><b>7. How do you implement EDA in NestJS?</b></summary>

NestJS offers `@nestjs/microservices` module for EDA using:
- **Kafka**, **RabbitMQ**, **NATS**, etc.

Example with Kafka:
```ts
@MessagePattern('user.created')
handleUserCreated(@Payload() data) {
  // react to event
}
```

Emit event:
```ts
kafkaClient.emit('user.created', { userId: 123 });
```

</details>

<details><summary><b>8. What is event replay and when is it useful?</b></summary>

**Event replay** is the ability to **reprocess past events** to:
- Rebuild read models (in CQRS)
- Debug or recover corrupted state
- Load historical data into new consumers

Kafka supports replay by resetting **consumer offsets**.

</details>

<details><summary><b>9. What is an event schema and how should you manage it?</b></summary>

An **event schema** defines the structure of the event (e.g., fields, types).

To manage schemas:
- Use **JSON Schema**, **Avro**, or **Protobuf**
- Store versions centrally (e.g., **Schema Registry**)
- Ensure **backward/forward compatibility** during evolution

</details>

<details><summary><b>10. What is eventual consistency in EDA?</b></summary>

Since services process events asynchronously, data may not be instantly consistent.

Example:
- `OrderCreated` emitted
- `InventoryService` and `ShippingService` update at different times

Each service reaches consistency **eventually**, not immediately. Your system must **tolerate lag** and **duplicate events**.

</details>

### 📊 EDA vs REST — Comparison Table

| Feature                  | Event-Driven Architecture (EDA)         | REST (Request-Response)         |
|--------------------------|-----------------------------------------|----------------------------------|
| Communication Style      | Asynchronous, message-based             | Synchronous, HTTP-based         |
| Coupling                 | Loosely coupled                         | Tightly coupled (service must respond) |
| Latency                 | Eventually consistent                    | Immediate response               |
| Reliability              | Resilient (with retries)                | Fragile (dependent on uptime)    |
| Scalability              | High — independently scalable services | Harder to scale tightly coupled services |
| Observability            | More complex (needs tracing)            | Simpler (clear request path)     |
| Use Case Fit             | Real-time processing, microservices     | Traditional APIs, CRUD ops       |

---

### 🔥 10 Advanced Event-Driven Architecture Questions (with Answers)

<details><summary><b>1. What is an event envelope?</b></summary>

An **event envelope** wraps the actual payload and includes metadata like:
- `eventId`
- `eventType`
- `timestamp`
- `version`
- `sourceService`

It standardizes event formats across producers/consumers.

</details>

<details><summary><b>2. What is a dead letter queue (DLQ) in EDA?</b></summary>

A **DLQ** captures events that:
- Failed processing after max retries
- Had malformed data or triggered exceptions

Consumers can later inspect or reprocess them manually or with automation.

</details>

<details><summary><b>3. What are outbox patterns and why are they used?</b></summary>

**Outbox Pattern** ensures reliable event publishing by:
- Writing events to an **"outbox" table** in the same DB transaction
- A background service reads from it and sends events to Kafka/RabbitMQ

It solves the **dual-write problem** (writing to DB and broker in sync).

</details>

<details><summary><b>4. What is a saga in event-driven systems?</b></summary>

A **saga** is a long-running transaction split across multiple services, coordinated via **events**.

Each step listens for an event and emits a new one. If a step fails, a **compensating action** is triggered.

Used for workflows like: `PlaceOrder → ReserveInventory → ChargePayment → Ship`.

</details>

<details><summary><b>5. How do you handle event ordering issues?</b></summary>

- Use **partitioning keys** to route related events to the same partition (Kafka)
- Add **version numbers** or timestamps to detect out-of-order processing
- Keep processing **idempotent** and tolerant to reordering

</details>

<details><summary><b>6. What is event choreography vs orchestration?</b></summary>

- **Choreography**: Services **react to events**, no central controller
- **Orchestration**: A **coordinator** service triggers actions via events or commands

Choreography = decentralized logic  
Orchestration = centralized control

</details>

<details><summary><b>7. How to test event-driven systems?</b></summary>

- **Unit test** event handlers in isolation
- Use **contract testing** for event formats
- Create **integration tests** with in-memory brokers (or Testcontainers)
- Monitor consumer **lag and failures** in production

</details>

<details><summary><b>8. How to ensure exactly-once event processing?</b></summary>

- Use **idempotent consumers** (e.g., store processed event IDs)
- Enable **Kafka’s transactional mode** (`enable.idempotence`)
- Deduplicate based on `eventId` in payload

</details>

<details><summary><b>9. How do event streams differ from event sourcing?</b></summary>

- **Event streams** = transport of events between services (EDA)
- **Event sourcing** = persistence of state as a sequence of domain events

You can stream events **without** using event sourcing.

</details>

<details><summary><b>10. What is fan-out and fan-in in EDA?</b></summary>

- **Fan-out**: One event triggers **multiple** consumers (e.g., `UserSignedUp` → Email, Analytics, CRM)
- **Fan-in**: Multiple events converge into **one handler** (e.g., `payment.received` + `order.confirmed` → `ship.order`)

</details>

---

### 🧩 Example: Event-Driven E-Commerce System (Simplified Architecture)

```plaintext
[Frontend]
   |
[API Gateway] → [Order Service] → emits "order.created"
                         ↓
              [Kafka/RabbitMQ Event Bus]
                         ↓
        ┌────────────┬─────────────┬─────────────┐
        ↓            ↓             ↓
[Payment Service] [Inventory Service] [Email Service]
      ↓                  ↓                 ↓
"payment.succeeded"  "inventory.updated"  "email.sent"
```

🧠 Key patterns:
- Each service subscribes to relevant topics
- Eventual consistency via replay or reprocessing
- Retry & DLQ in each consumer

---

### 📦 Common Events in E-Commerce (EDA-ready)

| Event Name              | Producer         | Description                                 |
|-------------------------|------------------|---------------------------------------------|
| `user.registered`       | Auth Service      | New user signed up                          |
| `order.placed`          | Order Service     | New order created                           |
| `order.cancelled`       | Order Service     | User canceled an order                      |
| `payment.completed`     | Payment Service   | Payment succeeded                           |
| `inventory.reserved`    | Inventory Service | Products locked for order                   |
| `shipment.created`      | Shipping Service  | Package shipped                             |
| `email.sent`            | Notification Svc  | Confirmation/marketing email sent           |
| `product.viewed`        | Frontend          | Analytics for product browsing              |
| `cart.abandoned`        | Cart Tracker      | Trigger re-engagement emails                |
