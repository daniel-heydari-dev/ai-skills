---
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx"
---

# Testing Instructions

When writing or modifying tests:

## Structure

- Use AAA pattern: Arrange, Act, Assert
- One assertion per test when possible
- Use descriptive test names: "should [behavior] when [condition]"

## Naming

```typescript
describe("FunctionName", () => {
  it("should return expected result when given valid input", () => {});
  it("should throw error when input is invalid", () => {});
});
```

## Coverage

Include tests for:

- Happy path (expected behavior)
- Edge cases (empty, null, boundaries)
- Error cases (invalid input, failures)

## Mocking

- Mock external dependencies (APIs, databases)
- Reset mocks between tests
- Verify mock interactions when relevant

## Example

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("calculateTotal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return sum of item prices", () => {
    // Arrange
    const items = [{ price: 10 }, { price: 20 }];

    // Act
    const result = calculateTotal(items);

    // Assert
    expect(result).toBe(30);
  });

  it("should return 0 for empty array", () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```
