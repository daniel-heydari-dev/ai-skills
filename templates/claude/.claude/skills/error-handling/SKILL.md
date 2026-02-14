---
name: Error Handling
description: Patterns for robust error handling
---

# Skill: Error Handling

Handle errors gracefully to build reliable applications.

## Custom Errors

### Rules

- ✅ DO: Create custom error classes for different error types
- ✅ DO: Include relevant context in errors
- ✅ DO: Use error codes for programmatic handling
- ❌ DON'T: Throw generic `Error` for known conditions
- ❌ DON'T: Include sensitive data in error messages

### Examples

```typescript
// ✅ Good - custom error hierarchy
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(
    message: string,
    public fields: Record<string, string>,
  ) {
    super(message, "VALIDATION_ERROR", 400);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`, "NOT_FOUND", 404);
  }
}

class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, "UNAUTHORIZED", 401);
  }
}

// Usage
throw new NotFoundError("User", userId);
throw new ValidationError("Invalid input", { email: "Invalid email format" });
```

## Result Types

### Rules

- ✅ DO: Use Result/Either pattern for expected failures
- ✅ DO: Reserve exceptions for unexpected errors
- ✅ DO: Make success/failure explicit in return types
- ❌ DON'T: Use exceptions for control flow

### Examples

```typescript
// ✅ Good - Result type
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

function parseJSON<T>(json: string): Result<T, SyntaxError> {
  try {
    return { ok: true, value: JSON.parse(json) };
  } catch (error) {
    return { ok: false, error: error as SyntaxError };
  }
}

// Usage
const result = parseJSON<User>(input);
if (result.ok) {
  console.log(result.value.name);
} else {
  console.error("Parse failed:", result.error.message);
}

// ✅ Good - async Result
async function fetchUser(id: string): Promise<Result<User, ApiError>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return { ok: false, error: new ApiError(response.status) };
    }
    const user = await response.json();
    return { ok: true, value: user };
  } catch (error) {
    return { ok: false, error: new ApiError(0, "Network error") };
  }
}
```

## Error Boundaries (React)

### Rules

- ✅ DO: Use error boundaries to prevent full app crashes
- ✅ DO: Show user-friendly error messages
- ✅ DO: Log errors for debugging
- ✅ DO: Provide recovery options (retry, go back)

### Examples

```typescript
// ✅ Good - Error boundary
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by boundary:', error, info);
    // Log to error reporting service
    reportError(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

## Try-Catch Best Practices

### Rules

- ✅ DO: Catch specific errors when possible
- ✅ DO: Handle or rethrow, don't swallow
- ✅ DO: Add context when rethrowing
- ❌ DON'T: Use empty catch blocks
- ❌ DON'T: Catch errors you can't handle

### Examples

```typescript
// ❌ Bad - swallowing error
try {
  await saveData(data);
} catch (error) {
  // Silent failure - data loss!
}

// ❌ Bad - catching too broadly
try {
  await complexOperation();
} catch (error) {
  console.log("Error"); // Lost all context
}

// ✅ Good - handle appropriately
try {
  await saveData(data);
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation specifically
    return { success: false, errors: error.fields };
  }
  if (error instanceof NetworkError) {
    // Retry or queue for later
    await queueForRetry(data);
    return { success: false, message: "Saved for retry" };
  }
  // Rethrow unexpected errors
  throw error;
}

// ✅ Good - add context when rethrowing
async function processOrder(orderId: string) {
  try {
    await chargePayment(orderId);
  } catch (error) {
    throw new AppError(
      `Failed to process order ${orderId}`,
      "ORDER_PROCESSING_ERROR",
      500,
      { cause: error },
    );
  }
}
```

## Async Error Handling

### Rules

- ✅ DO: Always handle promise rejections
- ✅ DO: Use try-catch with async/await
- ✅ DO: Add global unhandled rejection handler
- ❌ DON'T: Forget `.catch()` on promises
- ❌ DON'T: Mix callbacks and promises

### Examples

```typescript
// ✅ Good - async/await with try-catch
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new HttpError(response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      handleHttpError(error);
    } else {
      handleNetworkError(error);
    }
    throw error; // Rethrow for caller to handle
  }
}

// ✅ Good - Promise.all with error handling
async function fetchAllUsers(ids: string[]) {
  const results = await Promise.allSettled(ids.map((id) => fetchUser(id)));

  const users = results
    .filter((r): r is PromiseFulfilledResult<User> => r.status === "fulfilled")
    .map((r) => r.value);

  const errors = results
    .filter((r): r is PromiseRejectedResult => r.status === "rejected")
    .map((r) => r.reason);

  if (errors.length > 0) {
    console.error("Some users failed to load:", errors);
  }

  return users;
}

// ✅ Good - global handler (Node.js)
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Log to error reporting service
});
```

## Logging Errors

### Rules

- ✅ DO: Log errors with context (user, request, stack)
- ✅ DO: Use structured logging
- ✅ DO: Set appropriate log levels
- ❌ DON'T: Log sensitive data (passwords, tokens)
- ❌ DON'T: Log the same error multiple times

### Examples

```typescript
// ✅ Good - structured error logging
function logError(error: Error, context: Record<string, unknown>) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: "error",
    message: error.message,
    name: error.name,
    stack: error.stack,
    ...context,
  };

  // Redact sensitive fields
  if (logEntry.password) logEntry.password = "[REDACTED]";
  if (logEntry.token) logEntry.token = "[REDACTED]";

  console.error(JSON.stringify(logEntry));
}

// Usage
logError(error, {
  userId: user.id,
  action: "createOrder",
  orderId: order.id,
});
```

## User-Facing Errors

### Rules

- ✅ DO: Show user-friendly messages
- ✅ DO: Provide actionable guidance
- ✅ DO: Hide technical details from users
- ❌ DON'T: Show stack traces to users
- ❌ DON'T: Expose internal error codes

### Examples

```typescript
// ✅ Good - user-friendly error mapping
const userMessages: Record<string, string> = {
  VALIDATION_ERROR: "Please check your input and try again.",
  NOT_FOUND: "The requested item could not be found.",
  UNAUTHORIZED: "Please sign in to continue.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NETWORK_ERROR: "Unable to connect. Please check your internet connection.",
  DEFAULT: "Something went wrong. Please try again later.",
};

function getUserMessage(error: AppError): string {
  return userMessages[error.code] ?? userMessages.DEFAULT;
}
```
