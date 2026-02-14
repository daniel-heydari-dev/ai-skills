---
name: no-console
description: Disallow console.log statements in production code, require proper logging.
---

# No Console Rules

## Rule

Remove `console.log`, `console.warn`, `console.error` and other console methods from production code. Use proper logging infrastructure instead.

## Why

- Console statements are noisy in production
- No log levels, filtering, or rotation
- May expose sensitive information
- Can impact performance with excessive logging
- Not captured by monitoring systems

## What to Use Instead

### Development

```typescript
// ✅ OK in development with debug flag
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}
```

### Production

```typescript
// ✅ Use a proper logger
import { logger } from "@/lib/logger";

logger.info("User logged in", { userId: user.id });
logger.warn("Rate limit approaching", { remaining: 10 });
logger.error("Failed to process payment", { error, orderId });
```

### Logger Implementation

```typescript
// lib/logger.ts
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV === "development"
      ? { target: "pino-pretty" }
      : undefined,
});

// Usage
logger.info({ userId, action }, "User action logged");
logger.error({ err, context }, "Operation failed");
```

## Exceptions

Console is acceptable in:

- CLI tools (user-facing output)
- Build scripts
- Test files (debugging)
- Development-only code paths

```typescript
// ✅ CLI output is fine
console.log(chalk.green("✓ Build successful"));

// ✅ Test debugging
it("should process data", () => {
  console.log("Test data:", testData); // OK in tests
});
```

## ESLint Configuration

```json
{
  "rules": {
    "no-console": [
      "error",
      {
        "allow": ["warn", "error"]
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.test.ts", "scripts/**"],
      "rules": {
        "no-console": "off"
      }
    }
  ]
}
```

## Enforcement

When reviewing code:

- [ ] No `console.log` in production code
- [ ] Proper logger used for all logging needs
- [ ] Sensitive data not logged
- [ ] Appropriate log levels used
