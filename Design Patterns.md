### 🎯 **Design Patterns – 20 Questions (Based on Refactoring Guru)**

<details><summary><b>1. What is a design pattern?</b></summary>

A **design pattern** is a general reusable solution to a common problem in software design.  
It is **not code**, but a **blueprint** for solving architectural challenges.

</details>

<details><summary><b>2. What is the difference between structural, creational, and behavioral patterns?</b></summary>

- **Creational**: Object creation logic (e.g. Singleton, Factory)
- **Structural**: Composition of classes/objects (e.g. Adapter, Composite)
- **Behavioral**: Communication between objects (e.g. Observer, Strategy)

</details>

<details><summary><b>3. What is the Singleton pattern and when is it used?</b></summary>

**Singleton** ensures a class has **only one instance** and provides a global access point.

🧠 Use when:
- You need centralized configuration
- You want to manage global state (cautiously)

```ts
class Logger {
  private static instance: Logger;
  private constructor() {}
  static getInstance() {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }
}
```

</details>

<details><summary><b>4. How is Singleton implemented in NestJS?</b></summary>

NestJS services are **singletons by default**. No extra logic is needed:
```ts
@Injectable()
export class ConfigService {} // one shared instance across app
```

</details>

<details><summary><b>5. What is the Factory Method pattern?</b></summary>

Provides an interface for creating objects but lets subclasses alter the type of object that is created.

Use when:
- You want to delegate instantiation logic
- You need extensibility in object creation

```ts
abstract class TransportFactory {
  abstract createTransport(): Transport;
}
```

</details>

<details><summary><b>6. What is the difference between Factory and Abstract Factory?</b></summary>

- **Factory Method** creates one object.
- **Abstract Factory** creates a **family of related objects**.

```ts
interface ButtonFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}
```

</details>

<details><summary><b>7. What is the Builder pattern?</b></summary>

Separates construction of a complex object from its representation.

Useful for:
- Configurable object creation (e.g. fluent APIs)
- Complex DTO/response generation

```ts
const user = new UserBuilder().setName('John').setEmail('a@b.com').build();
```

</details>

<details><summary><b>8. How does the Prototype pattern work?</b></summary>

Creates new objects by copying existing ones (cloning).

```ts
const clone = Object.create(original);
```

Use when:
- Instantiating from scratch is expensive
- You need dynamic duplication

</details>

<details><summary><b>9. What is the Adapter pattern?</b></summary>

Converts one interface into another expected by the client.

Useful for **integrating external libraries** or legacy code.

```ts
class PayPalAdapter implements Payment {
  constructor(private sdk: PayPalSdk) {}
  pay() {
    this.sdk.charge();
  }
}
```

</details>

<details><summary><b>10. How does the Decorator pattern differ from Inheritance?</b></summary>

- **Decorator** extends behavior **dynamically** via composition.
- **Inheritance** extends via class hierarchy (compile-time).

NestJS middleware, pipes, and interceptors follow **decorator principles**.

</details>

<details><summary><b>11. What is the Proxy pattern?</b></summary>

Provides a placeholder or interface to control access to another object.

Use for:
- Logging
- Caching
- Lazy loading

```ts
class CachedService implements Service {
  constructor(private real: Service) {}
  getData() {
    if (cache) return cache;
    return this.real.getData();
  }
}
```

</details>

<details><summary><b>12. What is the Observer pattern and where is it used?</b></summary>

Defines a one-to-many dependency between objects so that when one changes, all observers are notified.

Used in:
- Event systems
- Kafka consumers
- Reactivity

```ts
subject.subscribe(observer);
subject.notify(data);
```

</details>

<details><summary><b>13. How does the Strategy pattern work?</b></summary>

Enables selecting an algorithm or behavior at runtime.

Used in NestJS with DI for choosing implementations:
```ts
interface AuthStrategy { validate(): boolean }
```

Swap behavior by injecting different classes.

</details>

<details><summary><b>14. What is the Command pattern?</b></summary>

Encapsulates a request as an object.

Great for:
- Undo/redo
- Queuing
- Audit logging

```ts
class CreateUserCommand {
  constructor(public readonly userDto: CreateUserDto) {}
}
```

Used in `@nestjs/cqrs`.

</details>

<details><summary><b>15. What is the Mediator pattern?</b></summary>

Centralizes communication between objects to reduce coupling.

NestJS `@nestjs/cqrs` uses this via `CommandBus`, `EventBus`.

</details>

<details><summary><b>16. How is the Chain of Responsibility pattern implemented?</b></summary>

Passes a request along a chain of handlers.

Used in:
- Middleware pipelines
- NestJS Interceptors or Guards

```ts
class Handler {
  setNext(handler: Handler): Handler { /*...*/ }
  handle(request) {
    if (!this.canHandle()) this.next.handle(request);
  }
}
```

</details>

<details><summary><b>17. What is the State pattern?</b></summary>

Allows an object to change behavior when its internal state changes.

E.g., order lifecycle:
```ts
order.setState(new ShippedState());
```

Each state implements the same interface differently.

</details>

<details><summary><b>18. What is the Template Method pattern?</b></summary>

Defines a skeleton of an algorithm and allows subclasses to redefine steps.

```ts
abstract class ReportTemplate {
  generate() {
    this.fetchData();
    this.format();
    this.export();
  }
}
```

</details>

<details><summary><b>19. What is the Facade pattern?</b></summary>

Provides a simplified interface to a complex subsystem.

Used in:
- Module facades
- Aggregation services
```ts
class PaymentFacade {
  constructor(private stripe: Stripe, private logger: Logger) {}

  process() {
    this.logger.log();
    this.stripe.charge();
  }
}
```

</details>

<details><summary><b>20. How are patterns applied in NestJS architecture?</b></summary>

NestJS promotes:
- **Strategy** (DI)
- **Observer** (event bus)
- **Decorator** (metadata + interceptors)
- **Command / Mediator** (`@nestjs/cqrs`)
- **Singleton** (services)
- **Factory** (custom providers)
- **Proxy** (Guards/Interceptors)

It encourages **clean architecture with rich pattern usage out of the box**.

</details>
