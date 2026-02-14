---
name: systematic-debugging
description: Methodical debugging process using binary search, logging strategies, and root cause analysis. Use when tracking down bugs, investigating issues, or diagnosing system problems.
category: testing
tags: [debugging, troubleshooting, logging, root-cause-analysis]
---

# Skill: Systematic Debugging

Debug issues methodically using proven techniques for root cause analysis.

## The Debugging Mindset

### Rules

- ✅ DO: Reproduce the bug consistently first
- ✅ DO: Understand expected vs actual behavior
- ✅ DO: Form hypotheses before changing code
- ✅ DO: Change one thing at a time
- ✅ DO: Document your findings
- ❌ DON'T: Make random changes hoping to fix it
- ❌ DON'T: Assume you know the cause without evidence
- ❌ DON'T: Skip reproducing the issue
- ❌ DON'T: Fix symptoms instead of root causes

## The Debugging Process

### 1. Reproduce

Before anything else, reliably reproduce the bug.

```markdown
## Bug Reproduction Steps

**Environment:**

- OS: macOS 14.2
- Node: 20.10.0
- Browser: Chrome 120

**Steps:**

1. Navigate to /dashboard
2. Click "Export" button
3. Select "CSV" format
4. Click "Download"

**Expected:** CSV file downloads
**Actual:** Error toast "Export failed"

**Frequency:** 100% reproducible
**First noticed:** After deploy on 2024-01-15
```

### 2. Isolate

Narrow down where the bug occurs using binary search.

```typescript
// Binary search debugging: comment out half the code
async function processData(input: Data) {
  // Step 1: Validate
  const validated = validate(input);
  console.log("After validate:", validated); // Check here

  // Step 2: Transform
  const transformed = transform(validated);
  console.log("After transform:", transformed); // Check here

  // Step 3: Save
  const saved = await save(transformed);
  console.log("After save:", saved); // Check here

  return saved;
}
```

### 3. Identify Root Cause

Dig deeper until you find the actual cause, not just symptoms.

```markdown
## Root Cause Analysis (5 Whys)

**Problem:** Export fails with error

1. **Why?** The API returns 500 error
2. **Why?** Database query times out
3. **Why?** Query scans entire table (no index)
4. **Why?** New column added without index
5. **Why?** Migration review didn't check query plans

**Root Cause:** Missing index on `created_at` column
**Fix:** Add index + update migration review checklist
```

### 4. Fix and Verify

Apply the fix, verify it works, and prevent regression.

```typescript
// Add a test that would have caught this bug
describe("Export", () => {
  it("should export large datasets within timeout", async () => {
    // Arrange: Create 10k records
    await seedTestData(10000);

    // Act: Export with timeout
    const result = await exportCSV({ timeout: 5000 });

    // Assert: Should complete successfully
    expect(result.status).toBe("success");
    expect(result.rowCount).toBe(10000);
  });
});
```

## Debugging Techniques

### Binary Search Debugging

When you have a large codebase or long process:

```typescript
// Instead of reading all code, bisect
function complexProcess() {
  stepA();
  stepB();
  stepC();
  // Problem is somewhere below this log
  console.log("Checkpoint 1: OK");
  stepD();
  stepE();
  // Problem is between checkpoints
  console.log("Checkpoint 2: OK");
  stepF();
  stepG();
}
```

### Git Bisect for Regression

```bash
# Find the commit that introduced a bug
git bisect start
git bisect bad                 # Current commit is broken
git bisect good v1.2.0         # This version worked

# Git checks out middle commit, test it
npm test
git bisect good  # or bad

# Repeat until found
# git bisect reset when done
```

### Rubber Duck Debugging

Explain the problem out loud (or in writing):

```markdown
## Rubber Duck Session

I'm trying to understand why user authentication fails
intermittently.

The user submits credentials →
The server validates them →
JWT is generated →
Token is stored in localStorage →
Next request includes token →
**Sometimes token is missing** ←

Wait... "sometimes"? That's a timing issue.
The redirect happens before localStorage.setItem completes!
```

### Diff Debugging

Compare working vs broken states:

```bash
# Compare working branch with broken branch
git diff working-branch..broken-branch -- src/

# Compare working config with broken config
diff -u config.working.json config.broken.json

# Compare successful request with failed request
diff -u response-success.json response-failure.json
```

## Strategic Logging

### Log Levels

```typescript
// Use appropriate log levels
logger.error("Payment failed", { orderId, error }); // Errors that need attention
logger.warn("Rate limit approaching", { usage }); // Potential issues
logger.info("Order completed", { orderId }); // Business events
logger.debug("Cache miss", { key }); // Development details
logger.trace("Entering function", { args }); // Verbose tracing
```

### Structured Logging

```typescript
// ❌ Bad - Unstructured, hard to search
console.log("User " + userId + " bought " + itemId + " for $" + price);

// ✅ Good - Structured, searchable
logger.info("Purchase completed", {
  event: "purchase",
  userId,
  itemId,
  price,
  timestamp: new Date().toISOString(),
  correlationId: req.headers["x-correlation-id"],
});
```

### Correlation IDs

```typescript
// Track requests across services
function middleware(req, res, next) {
  req.correlationId = req.headers["x-correlation-id"] || uuid();
  res.setHeader("x-correlation-id", req.correlationId);

  // Attach to all logs in this request
  req.logger = logger.child({ correlationId: req.correlationId });
  next();
}

// Now you can trace: "Show me all logs for correlation-id X"
```

## Browser Debugging

### Console Methods

```typescript
// Group related logs
console.group("User Authentication");
console.log("Checking credentials...");
console.log("Token received");
console.groupEnd();

// Table for arrays/objects
console.table(users);

// Time operations
console.time("API call");
await fetchData();
console.timeEnd("API call"); // "API call: 234ms"

// Assert conditions
console.assert(user.id, "User ID is missing");

// Stack trace
console.trace("How did we get here?");
```

### Breakpoint Strategies

```typescript
// Conditional breakpoint (right-click in DevTools)
// Break only when: userId === 'problem-user'

// Logpoint (doesn't pause, just logs)
// Log: 'User state:', user

// debugger statement (programmatic)
if (suspiciousCondition) {
  debugger; // Will pause here in DevTools
}
```

### Network Debugging

```typescript
// Intercept fetch for debugging
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  console.log("Fetch:", args[0]);
  const response = await originalFetch(...args);
  console.log("Response:", response.status);
  return response;
};
```

## Node.js Debugging

### Node Inspector

```bash
# Start with inspector
node --inspect src/index.js

# Break on first line
node --inspect-brk src/index.js

# Then open: chrome://inspect
```

### Memory Debugging

```typescript
// Check memory usage
console.log("Memory:", process.memoryUsage());

// Take heap snapshot
const v8 = require("v8");
const fs = require("fs");
const snapshot = v8.writeHeapSnapshot();
console.log("Heap snapshot written to", snapshot);
```

### Async Stack Traces

```bash
# Enable long stack traces
node --async-stack-traces src/index.js
```

## Common Bug Patterns

### Race Conditions

```typescript
// ❌ Bug: Race condition
let data;
fetchData().then((result) => {
  data = result;
});
console.log(data); // undefined!

// ✅ Fix: Await the result
const data = await fetchData();
console.log(data);
```

### Off-by-One Errors

```typescript
// ❌ Bug: Off-by-one
for (let i = 0; i <= array.length; i++) {
  // <= should be <
  console.log(array[i]); // undefined on last iteration
}

// ✅ Fix: Correct bounds
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

### Null/Undefined Access

```typescript
// ❌ Bug: Accessing property of undefined
const name = user.profile.name; // Crash if profile is undefined

// ✅ Fix: Optional chaining
const name = user?.profile?.name;

// ✅ Fix: Explicit check
const name = user.profile ? user.profile.name : "Unknown";
```

### Closure Bugs

```typescript
// ❌ Bug: Closure captures variable reference
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 3, 3, 3
}

// ✅ Fix: Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 0, 1, 2
}
```

### Floating Point Errors

```typescript
// ❌ Bug: Floating point comparison
0.1 + 0.2 === 0.3; // false!

// ✅ Fix: Use epsilon comparison
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true

// ✅ Fix: Use integers for money
const priceInCents = 999; // $9.99
```

## Debugging Checklist

```markdown
## Pre-Debug Checklist

- [ ] Can I reproduce the bug consistently?
- [ ] What changed recently? (deploys, dependencies, config)
- [ ] Does it happen in all environments?
- [ ] Is there a pattern? (specific users, times, inputs)

## During Debug Checklist

- [ ] Am I looking at the right logs/metrics?
- [ ] Have I checked error tracking (Sentry, etc.)?
- [ ] Have I tried binary search to isolate?
- [ ] Am I changing one thing at a time?

## Post-Fix Checklist

- [ ] Did I verify the fix in same conditions as bug?
- [ ] Did I add a test to prevent regression?
- [ ] Did I document the root cause?
- [ ] Are there similar bugs elsewhere?
```
