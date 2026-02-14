# Code Review Command

Review the current file or selection for code quality issues.

## Usage

```
/code-review [file or selection]
```

## What to Review

1. **Code Quality**
   - Naming clarity
   - Function size and complexity
   - Code duplication
   - Single responsibility

2. **TypeScript**
   - Type safety
   - Proper error handling
   - Null/undefined checks

3. **Best Practices**
   - SOLID principles
   - Clean code guidelines
   - Framework conventions

4. **Security**
   - Input validation
   - Data sanitization
   - Auth checks

5. **Performance**
   - Unnecessary operations
   - Memory considerations
   - Async handling

## Output Format

Provide feedback in this format:

```markdown
## Review: [filename]

### Critical Issues 🔴

- [Issue with line number and fix]

### Improvements 🟡

- [Suggestion with example]

### Good Practices ✅

- [What was done well]
```
