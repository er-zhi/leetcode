## ✅ **30 TypeScript Questions for NestJS Developers**
(Covers TS concepts relevant to backend, OOP, and framework integration)

<details><summary><b>1. What is the difference between `interface` and `type` in TypeScript?</b></summary>
- `interface` is best for object shape declarations and is extendable.
- `type` can describe primitives, unions, tuples, and intersections.
- `interface` supports declaration merging; `type` does not.

</details>

<details><summary><b>2. How does TypeScript's `Partial<T>` utility type work?</b></summary>
It makes all properties of type `T` optional.
```ts
type User = { id: number; name: string };
type PartialUser = Partial<User>; // { id?: number; name?: string }
```

</details>

<details><summary><b>3. What is the purpose of `Record<K, T>`?</b></summary>
Creates an object type with keys `K` and values of type `T`.
```ts
type Roles = Record<'admin' | 'user', boolean>;
```

</details>

<details><summary><b>4. How is `readonly` used in TypeScript?</b></summary>
It makes a property immutable.
```ts
readonly name: string;
```

</details>

<details><summary><b>5. What are decorators in TypeScript and how do they work in NestJS?</b></summary>
Decorators are functions prefixed with `@` that apply metadata to classes/methods/params. NestJS uses them heavily (`@Controller`, `@Injectable`, etc.).

</details>

<details><summary><b>6. How does TypeScript support dependency injection in NestJS?</b></summary>
It uses metadata via decorators and **reflect-metadata** to inject dependencies based on class types or tokens.

</details>

<details><summary><b>7. What is a generic and how is it used in NestJS?</b></summary>
A generic allows reusing types with different data.
```ts
class HttpResponse<T> { data: T }
```

</details>

<details><summary><b>8. How to infer types from other types?</b></summary>
Using `typeof`, `ReturnType<T>`, or `keyof`.
```ts
type UserKeys = keyof User;
```

</details>

<details><summary><b>9. What is the difference between `any`, `unknown`, and `never`?</b></summary>
- `any`: disables type checking.
- `unknown`: safe version of `any`.
- `never`: function never returns.

</details>

<details><summary><b>10. How do conditional types work in TS?</b></summary>
```ts
type IsString<T> = T extends string ? true : false;
```

</details>

<details><summary><b>11. What does the `infer` keyword do?</b></summary>
Extracts types within conditional types.
```ts
type Return<T> = T extends (...args: any) => infer R ? R : never;
```

</details>

<details><summary><b>12. How do enums work in TS?</b></summary>
```ts
enum Role { Admin, User }
```
They map names to numbers or strings.

</details>

<details><summary><b>13. How can you define optional parameters in functions?</b></summary>
```ts
function greet(name?: string) {}
```

</details>

<details><summary><b>14. What's the difference between `public`, `private`, and `protected` in classes?</b></summary>
- `public`: accessible everywhere
- `private`: only in class
- `protected`: in class and subclasses

</details>

<details><summary><b>15. How do mapped types work?</b></summary>
```ts
type Optional<T> = { [K in keyof T]?: T[K] };
```

</details>

<details><summary><b>16. How does `Exclude<T, U>` work?</b></summary>
Removes `U` from `T`.
```ts
type Result = Exclude<'a' | 'b' | 'c', 'a'>; // "b" | "c"
```

</details>

<details><summary><b>17. How to define a tuple in TypeScript?</b></summary>
```ts
const tuple: [number, string] = [1, 'hi'];
```

</details>

<details><summary><b>18. What is a union type?</b></summary>
```ts
type Status = 'active' | 'inactive';
```

</details>

<details><summary><b>19. What is a discriminated union?</b></summary>
A union of object types with a shared literal field for narrowing.
```ts
type A = { type: 'a'; value: number };
type B = { type: 'b'; value: string };
```

</details>

<details><summary><b>20. What is `as const`?</b></summary>
Freezes a value and its type.
```ts
const config = { env: 'prod' } as const;
```

</details>

<details><summary><b>21. How to create type-safe routes or query params?</b></summary>
Use DTOs with validation and class-transformer.

</details>

<details><summary><b>22. What is `NonNullable<T>`?</b></summary>
Removes `null` and `undefined` from `T`.

</details>

<details><summary><b>23. What’s the difference between interface inheritance and type intersection?</b></summary>
```ts
interface A extends B {}
type A = B & C;
```

Interfaces can be extended; types are composed.

</details>

<details><summary><b>24. What’s the difference between structural and nominal typing?</b></summary>
TypeScript is **structural** — type compatibility is based on shape, not name.

</details>

<details><summary><b>25. How to narrow down a union type?</b></summary>
With `typeof`, `in`, `instanceof`, or discriminated unions.

</details>

<details><summary><b>26. What is `keyof typeof`?</b></summary>
Used to get enum keys or object keys as types.

</details>

<details><summary><b>27. What is module augmentation?</b></summary>
Allows adding to existing modules/interfaces:
```ts
declare module 'express' {
  interface Request {
    user?: User;
  }
}
```

</details>

<details><summary><b>28. What is declaration merging?</b></summary>
Interfaces with the same name in the same scope are merged.
```ts
interface A { x: string }
interface A { y: number } // merged to A { x, y }
```

</details>

<details><summary><b>29. How does `typeof import()` help in NestJS modules?</b></summary>
It allows referencing types from external modules safely.

</details>

<details><summary><b>30. What are template literal types?</b></summary>
```ts
type Lang = `en-${'US' | 'UK'}`; // "en-US" | "en-UK"
```

---

## 🆕 **10 New Features/Changes in NestJS v5.8**
(as of March 2024 — if you want the freshest updates later, I can use web search)

> 🧠 *Note: The latest major version as of early 2024 was v10, so NestJS 5.8 is older — but here’s what was introduced back then (and still useful for legacy systems or historical context):*

<details><summary><b>1. Support for Fastify as an alternative HTTP adapter</b></summary>
- Improved performance.
- Swappable with Express.

</details>

<details><summary><b>2. Enhanced WebSockets support</b></summary>
- Unified API for gateways.
- Simplified message/event patterns.

</details>

<details><summary><b>3. Configuration module improvements</b></summary>
- `.env` integration built-in.
- Async configuration support.

</details>

<details><summary><b>4. New lifecycle hooks: `onApplicationShutdown()`</b></summary>
- Allows graceful shutdown of services and DBs.

</details>

<details><summary><b>5. Improved exception filters</b></summary>
- Can now inject services into custom exception filters.

</details>

<details><summary><b>6. Support for global pipes, guards, filters, interceptors</b></summary>
- With `app.useGlobalPipes(...)` and friends.

</details>

<details><summary><b>7. GraphQL module refactor</b></summary>
- First-class support for schema-first and code-first approaches.

</details>

<details><summary><b>8. Better testing utilities with `Test.createTestingModule()`</b></summary>
- Simplifies e2e and unit test setup.

</details>

<details><summary><b>9. Performance improvements in lifecycle injection</b></summary>
- Faster bootstrapping of services.

</details>

<details><summary><b>10. New support for async providers using factory functions</b></summary>
```ts
{
  provide: 'ASYNC_TOKEN',
  useFactory: async () => await loadSomething()
}
```

</details>
