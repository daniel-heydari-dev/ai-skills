---
name: Code Review
description: Review code for quality, security, and best practices
---

Review the provided code for:

## Code Quality

- Clean code principles (naming, readability)
- Single responsibility
- DRY (Don't Repeat Yourself)
- Proper error handling

## TypeScript

- Type safety (no unnecessary `any`)
- Proper null/undefined handling
- Effective use of types

## Security

- Input validation
- XSS prevention
- Authentication/authorization checks

## Performance

- Unnecessary re-renders (React)
- Memory leaks
- Bundle size impact

## Output Format

```markdown
## Summary

[Brief assessment]

## Issues

### 🔴 Critical

[Security issues, bugs]

### 🟡 Important

[Code quality, performance]

### 🟢 Suggestions

[Nice-to-haves]

## Good Practices

[What was done well]
```
