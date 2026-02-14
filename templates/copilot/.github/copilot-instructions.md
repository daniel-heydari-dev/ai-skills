# GitHub Copilot Instructions

## Project Overview

{{projectDescription}}

## Stack

{{stack}}

## Code Style

- Use TypeScript with strict mode
- Prefer functional programming patterns
- Use early returns to reduce nesting
- Keep functions small and focused (single responsibility)
- Use descriptive variable and function names

## Naming Conventions

- **Files**: kebab-case (`user-service.ts`)
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Types/Interfaces**: PascalCase (`UserProfile`)

## Documentation

- Add JSDoc comments to public functions
- Document complex algorithms
- Keep comments focused on "why", not "what"

## Testing

- Write tests for new features
- Use descriptive test names: "should [behavior] when [condition]"
- Follow AAA pattern: Arrange, Act, Assert

## Commands

- Dev: `{{devCommand}}`
- Build: `{{buildCommand}}`
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Do

- ✅ Follow existing patterns in the codebase
- ✅ Handle errors gracefully
- ✅ Validate user input
- ✅ Write self-documenting code
- ✅ Use TypeScript types effectively

## Don't

- ❌ Use `any` type without justification
- ❌ Leave `console.log` in production code
- ❌ Commit sensitive data or secrets
- ❌ Skip input validation
- ❌ Use `@ts-ignore` without explanation
