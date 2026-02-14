---
name: commit-message
description: Generate conventional commit messages from staged changes.
---

# Commit Message Prompt

Generate a conventional commit message from the staged changes.

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

## Types

| Type     | Description                             |
| -------- | --------------------------------------- |
| feat     | New feature                             |
| fix      | Bug fix                                 |
| docs     | Documentation only                      |
| style    | Formatting, no code change              |
| refactor | Code change that neither fixes nor adds |
| perf     | Performance improvement                 |
| test     | Adding tests                            |
| build    | Build system or dependencies            |
| ci       | CI configuration                        |
| chore    | Other changes (configs, scripts)        |

## Examples

```
feat(auth): add OAuth2 login with Google

Implements Google OAuth2 authentication flow with:
- Login button component
- OAuth callback handler
- Session management

Closes #123
```

```
fix(api): handle null response from user endpoint

The user endpoint could return null for deleted users,
causing a TypeError. Added null check and proper error.

Fixes #456
```

```
refactor(utils): extract date formatting to utility

Moved date formatting logic from components to shared
utility for reuse across the application.
```

## Rules

1. **Subject line** - 50 chars max, imperative mood
2. **Body** - Explain what and why, not how
3. **Footer** - Reference issues, breaking changes

### Good Subjects

- ✅ "add user authentication"
- ✅ "fix memory leak in worker"
- ❌ "added user authentication" (past tense)
- ❌ "fixes the bug" (vague)
- ❌ "WIP" (not descriptive)

### Breaking Changes

```
feat(api)!: change response format for /users

BREAKING CHANGE: The /users endpoint now returns
paginated results. Update clients to handle the new
{ data: [], pagination: {} } format.
```
