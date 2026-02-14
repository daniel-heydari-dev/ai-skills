---
name: code-review
description: Comprehensive code review command that analyzes code for quality, security, performance, and best practices.
---

# Code Review Command

Review the provided code thoroughly and provide actionable feedback.

## Review Focus Areas

Analyze the code for:

1. **Correctness** - Does it work as intended?
2. **Security** - Any vulnerabilities or unsafe patterns?
3. **Performance** - Inefficient algorithms or operations?
4. **Maintainability** - Is it easy to understand and modify?
5. **Best Practices** - Does it follow conventions?

## Review Format

Provide feedback in this format:

```
## Summary
[One paragraph overview of the code quality]

## Critical Issues 🔴
[Must fix before merging]
- Issue: [description]
  Location: [file:line]
  Fix: [recommendation]

## Suggestions 🟡
[Should consider fixing]
- [suggestion with reasoning]

## Nitpicks 🟢
[Minor improvements]
- [optional improvement]

## Positive Notes ✨
[What was done well]
- [good practice observed]
```

## Review Checklist

- [ ] Error handling is appropriate
- [ ] Edge cases are handled
- [ ] Input validation is present
- [ ] No hardcoded secrets or credentials
- [ ] Functions are reasonably sized (<30 lines)
- [ ] Variable names are descriptive
- [ ] Comments explain "why", not "what"
- [ ] Tests would be straightforward to write
