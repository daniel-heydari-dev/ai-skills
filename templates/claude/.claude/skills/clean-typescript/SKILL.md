---
name: Clean TypeScript
description: TypeScript best practices for type safety and maintainability
---

# Skill: Clean TypeScript

Write type-safe, maintainable TypeScript code.

## Type Safety

### Rules

- ✅ DO: Enable `strict: true` in tsconfig.json
- ✅ DO: Use explicit return types on public functions
- ✅ DO: Use `unknown` instead of `any` when type is truly unknown
- ✅ DO: Use type guards to narrow types safely
- ❌ DON'T: Use `any` (use `unknown` and narrow instead)
- ❌ DON'T: Use `@ts-ignore` or `@ts-expect-error` without comment
- ❌ DON'T: Cast with `as` unless absolutely necessary

### Examples

```typescript
// ❌ Bad
function parse(data: any) {
  return data.value; // No type safety
}

// ✅ Good
function parse(data: unknown): string {
  if (typeof data === "object" && data !== null && "value" in data) {
    const value = (data as { value: unknown }).value;
    if (typeof value === "string") {
      return value;
    }
  }
  throw new Error("Invalid data format");
}

// ✅ Better - use type guard
function isValidData(data: unknown): data is { value: string } {
  return (
    typeof data === "object" &&
    data !== null &&
    "value" in data &&
    typeof (data as { value: unknown }).value === "string"
  );
}

function parse(data: unknown): string {
  if (isValidData(data)) {
    return data.value; // TypeScript knows data.value is string
  }
  throw new Error("Invalid data format");
}
```

## Discriminated Unions

### Rules

- ✅ DO: Use discriminated unions for state/result types
- ✅ DO: Use literal types as discriminants
- ✅ DO: Handle all cases (exhaustive checking)
- ❌ DON'T: Use optional properties for mutually exclusive states

### Examples

```typescript
// ❌ Bad - ambiguous state
interface ApiResponse {
  data?: User;
  error?: Error;
  loading?: boolean;
}

// ✅ Good - discriminated union
type ApiResponse =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: Error };

function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case "idle":
      return "Ready";
    case "loading":
      return "Loading...";
    case "success":
      return response.data.name; // TypeScript knows data exists
    case "error":
      return response.error.message; // TypeScript knows error exists
  }
}

// Exhaustive checking helper
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}
```

## Utility Types

### Rules

- ✅ DO: Use built-in utility types (`Partial`, `Pick`, `Omit`, `Record`)
- ✅ DO: Create reusable generic types
- ✅ DO: Use `readonly` for immutable data
- ❌ DON'T: Redefine what utility types provide

### Examples

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Partial for updates (all optional)
type UserUpdate = Partial<Omit<User, "id" | "createdAt">>;

// Pick for specific fields
type UserPreview = Pick<User, "id" | "name">;

// Readonly for immutable data
type ReadonlyUser = Readonly<User>;

// Record for dictionaries
type UserById = Record<string, User>;

// Custom utility type
type Nullable<T> = T | null;
type AsyncResult<T> = Promise<{ data: T } | { error: Error }>;
```

## Null Handling

### Rules

- ✅ DO: Enable `strictNullChecks`
- ✅ DO: Use optional chaining (`?.`) and nullish coalescing (`??`)
- ✅ DO: Be explicit about nullable types (`T | null`)
- ❌ DON'T: Use non-null assertion (`!`) without good reason
- ❌ DON'T: Use `|| ` for defaults (use `??` instead)

### Examples

```typescript
// ❌ Bad
function getName(user: User) {
  return user.profile!.name; // Dangerous assertion
}

const value = input || "default"; // Bug: 0 and '' become 'default'

// ✅ Good
function getName(user: User): string | undefined {
  return user.profile?.name;
}

const value = input ?? "default"; // Only null/undefined trigger default

// Handle null explicitly
function processUser(user: User | null) {
  if (!user) {
    return handleNoUser();
  }
  // TypeScript knows user is not null here
  return process(user);
}
```

## Generics

### Rules

- ✅ DO: Use generics for reusable, type-safe functions
- ✅ DO: Use constraints to limit generic types
- ✅ DO: Use descriptive generic names (`TItem`, `TKey`, `TValue`)
- ❌ DON'T: Overuse generics when concrete types work
- ❌ DON'T: Use single letters for complex generics

### Examples

```typescript
// ✅ Simple generic
function first<T>(items: T[]): T | undefined {
  return items[0];
}

// ✅ Constrained generic
function getProperty<TObj, TKey extends keyof TObj>(
  obj: TObj,
  key: TKey,
): TObj[TKey] {
  return obj[key];
}

// ✅ Generic with default
interface PaginatedResult<TItem = unknown> {
  items: TItem[];
  total: number;
  page: number;
}

// ✅ Generic utility function
function groupBy<TItem, TKey extends string | number>(
  items: TItem[],
  keyFn: (item: TItem) => TKey,
): Record<TKey, TItem[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item);
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<TKey, TItem[]>,
  );
}
```

## Enums vs Union Types

### Rules

- ✅ DO: Prefer `const` objects or union types over enums
- ✅ DO: Use enums when you need reverse mapping
- ❌ DON'T: Use numeric enums (use string or const)

### Examples

```typescript
// ❌ Avoid - numeric enum pitfalls
enum Status {
  Active, // 0
  Inactive, // 1
}

// ✅ Better - const object
const Status = {
  Active: "active",
  Inactive: "inactive",
} as const;
type Status = (typeof Status)[keyof typeof Status];

// ✅ Also good - union type
type Status = "active" | "inactive";

// ✅ When enum is appropriate - need reverse mapping
enum HttpStatus {
  OK = 200,
  NotFound = 404,
}
const statusName = HttpStatus[200]; // 'OK'
```

## Configuration

### Recommended tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```
