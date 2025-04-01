### 🧱 **Deep SOLID Principles — Advanced NestJS & TypeScript**

<details><summary><b>S – Single Responsibility Principle</b></summary>

**Definition**: A class, function, or module should have only one reason to change.

---

### ✅ Why it matters:
- Easier to test, reuse, and understand code.
- Reduces side effects when changing business logic.
- Increases maintainability in large NestJS apps.

---

### ❌ Anti-pattern (Bad NestJS Service):
```ts
@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async registerUser(dto: CreateUserDto) {
    const user = await this.db.user.create({ data: dto });

    await this.sendWelcomeEmail(user.email); // 👎 mixing responsibilities
    this.logUserCreation(user.id); // 👎
  }

  private async sendWelcomeEmail(email: string) { /* SMTP logic */ }
  private logUserCreation(id: string) { console.log(id); }
}
```

---

### ✅ Refactored Version:
```ts
@Injectable()
export class EmailService {
  async sendWelcomeEmail(email: string) { /* ... */ }
}

@Injectable()
export class UserLogger {
  logUserCreation(id: string) { console.log(id); }
}

@Injectable()
export class UserService {
  constructor(
    private readonly db: PrismaService,
    private readonly email: EmailService,
    private readonly logger: UserLogger
  ) {}

  async registerUser(dto: CreateUserDto) {
    const user = await this.db.user.create({ data: dto });
    await this.email.sendWelcomeEmail(user.email);
    this.logger.logUserCreation(user.id);
  }
}
```

> ✅ Now each service has one responsibility and one reason to change.

</details>

---

<details><summary><b>O – Open/Closed Principle</b></summary>

**Definition**: Classes should be open for extension, but closed for modification.

---

### ✅ Why it matters:
- Prevents changes from breaking other parts of the system.
- Encourages using abstraction and composition over switching statements.
- Vital for **plug-and-play logic** in NestJS (strategy, filters, guards, etc.).

---

### ❌ Bad Example (violates OCP):
```ts
@Injectable()
export class PaymentService {
  process(type: 'stripe' | 'paypal') {
    if (type === 'stripe') { /* ... */ }
    if (type === 'paypal') { /* ... */ }
  }
}
```

---

### ✅ Refactored with Strategy Pattern (NestJS-friendly):
```ts
interface PaymentStrategy {
  pay(amount: number): void;
}

@Injectable()
export class StripeService implements PaymentStrategy {
  pay(amount: number) { console.log('Stripe:', amount); }
}

@Injectable()
export class PayPalService implements PaymentStrategy {
  pay(amount: number) { console.log('PayPal:', amount); }
}

@Injectable()
export class PaymentService {
  constructor(private readonly strategy: PaymentStrategy) {}

  process(amount: number) {
    this.strategy.pay(amount);
  }
}
```

> ✅ Add new payment providers without modifying `PaymentService`.

</details>

---

<details><summary><b>L – Liskov Substitution Principle</b></summary>

**Definition**: Subtypes must be replaceable for their base types **without altering correctness**.

---

### ✅ Why it matters:
- Prevents runtime errors from incompatible subclasses.
- Helps you design clean interfaces and abstract classes.

---

### ❌ Violation of LSP:
```ts
class Bird {
  fly(): void {}
}

class Penguin extends Bird {
  fly(): void {
    throw new Error('Penguins can’t fly'); // ❌ breaks substitution
  }
}
```

---

### ✅ Refactored:
```ts
interface Bird {}
interface FlyingBird extends Bird {
  fly(): void;
}

class Sparrow implements FlyingBird {
  fly() { console.log('flying'); }
}

class Penguin implements Bird {
  // does not implement fly
}
```

> ✅ Consumers relying on `FlyingBird` know that `fly()` is safe to call.

---

### ✅ NestJS Example:
Use **abstract classes** and split responsibilities instead of assuming behavior:
```ts
abstract class AuthProvider {
  abstract validateToken(token: string): boolean;
}
```

</details>

---

<details><summary><b>I – Interface Segregation Principle</b></summary>

**Definition**: Clients should not be forced to depend on methods they don’t use.

---

### ✅ Why it matters:
- Prevents bloated interfaces.
- Improves reusability.
- Encourages granular, modular design.

---

### ❌ Anti-pattern:
```ts
interface Auth {
  login(): void;
  refresh(): void;
  revoke(): void;
  oauth(): void;
}

class ApiKeyAuth implements Auth {
  login() {}         // ok
  refresh() {}       // no-op
  revoke() {}        // no-op
  oauth() {}         // ❌ irrelevant
}
```

---

### ✅ Refactored:
```ts
interface Loginable {
  login(): void;
}

interface Refreshable {
  refresh(): void;
}

class ApiKeyAuth implements Loginable {
  login() {}
}
```

---

### ✅ In NestJS:
- Use multiple **guards**, not one `AuthGuard` that handles everything.
- Separate `EmailValidator`, `PhoneValidator`, etc. — don’t force services to depend on validation they don't need.

</details>

---

<details><summary><b>D – Dependency Inversion Principle</b></summary>

**Definition**: High-level modules should not depend on low-level ones. Both should depend on abstractions.

---

### ✅ Why it matters:
- Encourages loose coupling.
- Makes testing and replacing components easier.
- Works perfectly with **NestJS providers and tokens**.

---

### ❌ Bad Example:
```ts
@Injectable()
export class AppService {
  constructor(private readonly stripe: StripeService) {} // 👎 direct dependency
}
```

---

### ✅ Good Example with Token Injection (NestJS):
```ts
// abstraction
export const PaymentProvider = Symbol('PaymentProvider');
interface Payment {
  pay(amount: number): void;
}

@Injectable()
export class StripeService implements Payment {
  pay(amount: number) {}
}

// app.module.ts
providers: [
  {
    provide: PaymentProvider,
    useClass: StripeService
  }
]

// app.service.ts
@Injectable()
export class AppService {
  constructor(@Inject(PaymentProvider) private readonly payment: Payment) {}

  charge() {
    this.payment.pay(100);
  }
}
```

> ✅ Easily replace Stripe with another provider without modifying business logic.

</details>
