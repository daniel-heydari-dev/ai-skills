# {{projectName}}

{{projectDescription}}

## Stack

{{stack}}

## Project Structure

```
{{projectStructure}}
```

## Development Commands

```bash
# Development
{{devCommand}}

# Build
{{buildCommand}}

# Test
{{testCommand}}

# Lint
{{lintCommand}}
```

## Conventions

- Follow existing patterns in the codebase
- Use TypeScript with strict mode enabled
- Write tests for new features
- Document public APIs with JSDoc
- Keep functions small and focused

## Code Style

- Use descriptive variable and function names
- Prefer `const` over `let`, avoid `var`
- Use early returns to reduce nesting
- Handle errors explicitly, don't swallow them

## Do

- ✅ Follow the existing code style and patterns
- ✅ Write self-documenting code
- ✅ Add tests for new functionality
- ✅ Handle edge cases and errors gracefully
- ✅ Use TypeScript types effectively

## Don't

- ❌ Use `any` type without justification
- ❌ Leave `console.log` in production code
- ❌ Commit commented-out code
- ❌ Bypass validation or security checks
- ❌ Add dependencies without discussion

## Skills

This project uses the following skills for code quality:

- `clean-code` — Naming, readability, simplicity
- `solid-principles` — SOLID design principles
- `clean-typescript` — TypeScript best practices
- `testing-best-practices` — Testing patterns
- `error-handling` — Error handling patterns
- `web-security` — Security best practices

See `.claude/skills/` for detailed guidelines.
