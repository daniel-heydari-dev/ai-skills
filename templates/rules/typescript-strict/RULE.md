---
name: typescript-strict
description: Enforce strict TypeScript practices with proper typing, no any, and strict null checks.
---

# TypeScript Strict Mode Rules

## Core Rules

### No `any` Type

```typescript
// ❌ Bad
function process(data: any) { ... }
const result: any = fetchData();

// ✅ Good
function process(data: ProcessableData) { ... }
const result: FetchResult = fetchData();

// ✅ When truly unknown, use unknown
function handle(input: unknown) {
  if (typeof input === 'string') {
    // Now TypeScript knows it's a string
  }
}
```

### Explicit Return Types

```typescript
// ❌ Bad
function getUser(id: string) {
  return db.users.find((u) => u.id === id);
}

// ✅ Good
function getUser(id: string): User | undefined {
  return db.users.find((u) => u.id === id);
}

// ✅ Async functions
async function fetchUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}
```

### Strict Null Checks

```typescript
// ❌ Bad - assumes user exists
function getName(user: User | null) {
  return user.name; // Potential runtime error!
}

// ✅ Good - handle null case
function getName(user: User | null): string {
  return user?.name ?? "Anonymous";
}

// ✅ Good - guard clause
function getName(user: User | null): string {
  if (!user) {
    throw new Error("User is required");
  }
  return user.name;
}
```

### Discriminated Unions

```typescript
// ❌ Bad - loose typing
interface ApiResponse {
  success: boolean;
  data?: Data;
  error?: string;
}

// ✅ Good - discriminated union
type ApiResponse =
  | { success: true; data: Data }
  | { success: false; error: string };

function handleResponse(response: ApiResponse) {
  if (response.success) {
    // TypeScript knows data exists here
    console.log(response.data);
  } else {
    // TypeScript knows error exists here
    console.log(response.error);
  }
}
```

### Readonly When Possible

```typescript
// ❌ Bad - mutable by default
interface Config {
  apiUrl: string;
  timeout: number;
}

// ✅ Good - immutable config
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// ✅ Good - readonly arrays
function process(items: readonly Item[]) {
  // items.push() would be a compile error
}
```

## tsconfig.json Strict Settings

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true
  }
}
```

## Enforcement

When reviewing code, flag:

- [ ] Any use of `any` type
- [ ] Missing return type annotations
- [ ] Unhandled null/undefined cases
- [ ] Type assertions without validation
- [ ] Implicit any from untyped imports
