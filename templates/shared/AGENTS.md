# Agent Instructions

## Project Summary

{{projectDescription}}

## Stack

{{stack}}

## Conventions

- Prefer TypeScript for new or changed code.
- Keep components functional and hook-based; follow the Rules of Hooks.
- Respect existing file/feature structure; ask before reorganizing.
- Keep diffs focused; avoid drive-by refactors.
- Avoid adding new dependencies without explicit approval.
- Write tests for new features and bug fixes.
- Document public APIs with JSDoc comments.

## Workflow

- Confirm assumptions before making broad changes.
- Keep UI changes aligned with existing design tokens or theme.
- Update or add tests when behavior changes.
- Run linter and formatter before committing.

## Testing

- Dev: `{{devCommand}}`
- Build: `{{buildCommand}}`
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Do / Don't

Do:

- Follow existing patterns and conventions in the codebase.
- Write self-documenting code with clear naming.
- Handle errors gracefully with proper error messages.
- Use environment variables for configuration.
- Keep functions small and focused (single responsibility).

Don't:

- Bypass validation or auth flows.
- Introduce new dependencies without discussion.
- Leave console.log statements in production code.
- Commit secrets or sensitive data.
- Ignore TypeScript errors with `@ts-ignore`.
