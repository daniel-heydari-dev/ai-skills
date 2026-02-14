---
name: Generate Tests
description: Generate comprehensive tests for the selected code
---

Generate tests for the provided code following these guidelines:

## Framework

Use the project's testing framework (Vitest, Jest, or as configured).

## Coverage

- Happy path (expected behavior)
- Edge cases (empty, null, boundaries, limits)
- Error cases (invalid input, exceptions)

## Structure

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('FunctionName', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange
    const input = ...;

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe(expected);
  });
});
```

## Rules

- Use descriptive test names
- One behavior per test
- Mock external dependencies
- Include setup/teardown as needed
