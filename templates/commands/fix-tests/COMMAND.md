---
name: fix-tests
description: Analyze failing tests and provide fixes with explanations.
---

# Fix Tests Command

Analyze the failing test(s) and provide a solution.

## Analysis Process

1. **Understand the test intent** - What behavior is being tested?
2. **Identify the failure** - Why is it failing?
3. **Determine the root cause** - Is it the test or the implementation?
4. **Propose the fix** - Provide corrected code

## Response Format

````
## Test Analysis

### Test Intent
[What the test is trying to verify]

### Failure Reason
[Why the test is failing]

### Root Cause
☐ Test is incorrect
☐ Implementation is incorrect
☐ Test setup is wrong
☐ Environment/configuration issue

## Fix

### If Implementation Bug:
```[language]
// Fixed implementation code
````

### If Test Bug:

```[language]
// Fixed test code
```

## Explanation

[Why this fix resolves the issue]

## Prevention

[How to prevent similar issues]

```

## Common Test Failures

| Failure Type | Likely Cause | Fix |
|--------------|--------------|-----|
| Timeout | Async not awaited | Add await/done callback |
| Undefined | Missing mock/setup | Add proper test setup |
| Not equal | Logic error | Debug expected vs actual |
| Mock not called | Wrong invocation | Check mock setup and call |
```
