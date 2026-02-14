---
name: document
description: Generate documentation for code including JSDoc, README sections, and API docs.
---

# Document Command

Generate comprehensive documentation for the provided code.

## Documentation Types

### 1. JSDoc/TSDoc Comments

````typescript
/**
 * Calculates the total price including tax and discounts.
 *
 * @param items - Array of items with price and quantity
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @param discount - Optional discount code to apply
 * @returns The total price after tax and discounts
 * @throws {ValidationError} When items array is empty
 * @example
 * ```ts
 * const total = calculateTotal(
 *   [{ price: 10, quantity: 2 }],
 *   0.08,
 *   'SAVE10'
 * );
 * // Returns: 19.44
 * ```
 */
function calculateTotal(
  items: CartItem[],
  taxRate: number,
  discount?: string,
): number;
````

### 2. README Section

````markdown
## [Feature Name]

### Overview

[What this feature does]

### Installation

```bash
npm install package-name
```
````

### Usage

```typescript
import { feature } from "package-name";

const result = feature(options);
```

### Configuration

| Option  | Type   | Default | Description |
| ------- | ------ | ------- | ----------- |
| option1 | string | -       | Description |

### Examples

#### Basic Usage

```typescript
// Example code
```

#### Advanced Usage

```typescript
// More complex example
```

````

### 3. API Documentation

```markdown
## `functionName(param1, param2)`

Description of what the function does.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| param1 | string | Yes | Description |
| param2 | Options | No | Description |

### Returns

`ReturnType` - Description of return value

### Errors

- `ValidationError` - When input is invalid
- `NetworkError` - When request fails

### Example

```typescript
const result = functionName('value', { option: true });
````

```

## Documentation Principles

1. **Explain the "why"** - Not just the "what"
2. **Include examples** - Show, don't just tell
3. **Be concise** - Respect reader's time
4. **Keep current** - Documentation that lies is worse than none
5. **Use consistent format** - Follow project conventions
```
