# Test Generate Command

Generate tests for the selected code.

## Usage

```
/test-generate [function or class]
```

## Test Generation Guidelines

### Structure

- Use AAA pattern: Arrange, Act, Assert
- One assertion per test when possible
- Descriptive test names

### Coverage

- Happy path (expected behavior)
- Edge cases (empty, null, boundaries)
- Error cases (invalid input, failures)

### Naming Convention

```typescript
describe("functionName", () => {
  it("should [expected behavior] when [condition]", () => {
    // test
  });
});
```

## Output Format

```typescript
import { describe, it, expect } from 'vitest';
import { functionName } from './module';

describe('functionName', () => {
  // Happy path
  it('should return expected result for valid input', () => {
    // Arrange
    const input = ...;

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Edge cases
  it('should handle empty input', () => {
    expect(functionName('')).toBe(...);
  });

  // Error cases
  it('should throw error for invalid input', () => {
    expect(() => functionName(null)).toThrow();
  });
});
```
