### 🔟 Event Sourcing Interview Questions (with Answers)

<details><summary><b>1. What is Event Sourcing?</b></summary>

**Event Sourcing** is a pattern where state is not stored as a snapshot, but instead **reconstructed from a sequence of events**.

Each **domain event** (e.g., `UserCreated`, `OrderPaid`) represents a fact that happened. The current state is rebuilt by replaying those events.

</details>

<details><summary><b>2. How is Event Sourcing different from traditional CRUD?</b></summary>

| Traditional CRUD              | Event Sourcing                      |
|------------------------------|-------------------------------------|
| Stores latest state          | Stores all events                   |
| Overwrites data              | Appends events only                 |
| Harder to audit              | Full audit log                      |
| Easier to implement          | More complex, but more flexible     |

In CRUD, you store "what is". In Event Sourcing, you store "what happened".

</details>

<details><summary><b>3. What are the benefits of Event Sourcing?</b></summary>

- Complete **audit trail**
- Natural fit for **CQRS**
- **Temporal queries** (rebuild state at any time)
- Enables **replay**, **debugging**, and **analytics**
- Supports **event-driven architecture**

</details>

<details><summary><b>4. What are the challenges of Event Sourcing?</b></summary>

- Increased **complexity**
- **Versioning** events over time
- Managing **eventual consistency**
- Requires good **domain modeling**
- Read models must be kept in sync (projections)

</details>

<details><summary><b>5. What is an Event Store?</b></summary>

An **Event Store** is a storage system that:
- Appends and persists events
- Returns event streams by aggregate ID
- Supports event replay

You can use:
- **Custom implementation** (e.g., PostgreSQL, MongoDB)
- **Dedicated store** (e.g., EventStoreDB, Axon, Marten)

</details>

<details><summary><b>6. How does Kafka relate to Event Sourcing?</b></summary>

Kafka can act as a **log-based event store**:
- Producers emit events (e.g., `OrderCreated`)
- Consumers build projections (read models)
- Replay is possible by resetting consumer offset

Limitations:
- Kafka is not an aggregate-aware event store
- No transactional consistency between aggregates

</details>

<details><summary><b>7. What is an Aggregate in Event Sourcing?</b></summary>

An **Aggregate** is a domain object that:
- Applies and raises events
- Holds business rules
- Ensures **consistency boundaries**

Example: `UserAggregate` emits `UserCreated`, `UserEmailChanged`

</details>

<details><summary><b>8. How do you reconstruct state from events?</b></summary>

By **replaying events** in order:

```ts
function applyEvents(events: DomainEvent[]): State {
  return events.reduce((state, event) => apply(state, event), initialState);
}
```

Each event mutates the state — no need to store the final state directly.

</details>

<details><summary><b>9. How do you version events in Event Sourcing?</b></summary>

Strategies:
- Include a `version` field in events
- Use **schema evolution** (e.g., Avro, JSON Schema)
- Create **new event types** (`UserRenamedV2`)

Event consumers must support **backward compatibility**.

</details>

<details><summary><b>10. How do snapshots help in Event Sourcing?</b></summary>

**Snapshots**:
- Store periodic state checkpoints (e.g., every 100 events)
- Reduce replay time on aggregate load
- Must include snapshot + events after it to fully rebuild state

They're an **optimization**, not a replacement for events.

</details>
