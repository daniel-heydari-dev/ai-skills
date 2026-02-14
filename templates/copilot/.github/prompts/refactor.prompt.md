---
name: Refactor
description: Suggest refactoring improvements for the selected code
---

Analyze the code and suggest refactoring improvements:

## Look For

- Long functions (>20 lines)
- Deep nesting
- Code duplication
- Mixed abstraction levels
- God classes/functions
- Magic numbers/strings
- Poor naming

## Suggest

- Extract function/method
- Extract variable
- Introduce parameter object
- Replace conditional with polymorphism
- Use early returns
- Apply SOLID principles

## Output Format

```markdown
## Current Issues

[Describe problems]

## Proposed Refactoring

[Name the pattern]

## Before

[Current code]

## After

[Refactored code]

## Benefits

- [Benefit 1]
- [Benefit 2]
```
