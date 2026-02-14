---
name: generate-tests
description: Generate comprehensive test suites for code with unit tests, edge cases, and mocks.
---

# Generate Tests Command

Generate comprehensive tests for the provided code.

## Test Generation Guidelines

Include tests for:

1. **Happy path** - Normal expected usage
2. **Edge cases** - Boundary conditions, empty inputs
3. **Error cases** - Invalid inputs, failure scenarios
4. **Integration points** - Mocked external dependencies

## Output Format

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { functionToTest } from "./module";

describe("functionToTest", () => {
  // Setup
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Happy path tests
  describe("when called with valid input", () => {
    it("should return expected result", () => {
      // Arrange
      const input = createValidInput();

      // Act
      const result = functionToTest(input);

      // Assert
      expect(result).toEqual(expectedOutput);
    });
  });

  // Edge cases
  describe("edge cases", () => {
    it("should handle empty input", () => {
      expect(functionToTest([])).toEqual([]);
    });

    it("should handle null values", () => {
      expect(() => functionToTest(null)).toThrow();
    });
  });

  // Error cases
  describe("error handling", () => {
    it("should throw ValidationError for invalid input", () => {
      expect(() => functionToTest(invalidInput)).toThrow(ValidationError);
    });
  });
});
```

## Test Quality Checklist

- [ ] Tests are independent (no shared state)
- [ ] Test names describe behavior
- [ ] AAA pattern (Arrange-Act-Assert)
- [ ] Mocks are properly typed
- [ ] Edge cases covered
- [ ] Error paths tested
