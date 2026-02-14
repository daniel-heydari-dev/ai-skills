---
name: bug-report
description: Generate structured bug reports with reproduction steps and context.
---

# Bug Report Prompt

Generate a structured bug report from the provided information.

## Output Format

```markdown
## Bug Report

### Title

[Clear, specific title describing the bug]

### Environment

- **OS:** [e.g., macOS 14.2, Windows 11]
- **Browser:** [e.g., Chrome 120, Firefox 121]
- **App Version:** [e.g., v2.3.1]
- **Node Version:** [if applicable]

### Description

#### Expected Behavior

[What should happen]

#### Actual Behavior

[What actually happens]

### Steps to Reproduce

1. [First step]
2. [Second step]
3. [Third step]
4. [See error]

### Screenshots/Recordings

[Attach screenshots or screen recordings if applicable]

### Error Messages
```

[Paste any error messages, stack traces, or console output]

```

### Additional Context

- **Frequency:** [Always/Sometimes/Rarely]
- **Regression:** [Did this work before? Which version?]
- **Workaround:** [Any known workaround?]
- **Related Issues:** [Links to related issues]

### Logs

<details>
<summary>Relevant logs</summary>

```

[Paste relevant log output]

```

</details>

### Possible Cause

[If you have any idea what might be causing this]

---

**Priority:** [Critical/High/Medium/Low]
**Labels:** `bug`, `[area]`, `[severity]`
```

## Guidelines

1. **Be specific** - Vague reports are hard to fix
2. **Include reproduction steps** - Step by step
3. **Provide context** - Environment, versions
4. **Attach evidence** - Screenshots, logs, errors
5. **One bug per report** - Keep focused
6. **Check for duplicates** - Search existing issues first
