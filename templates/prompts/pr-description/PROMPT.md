---
name: pr-description
description: Generate comprehensive pull request descriptions from git diffs.
---

# PR Description Prompt

Generate a comprehensive pull request description from the provided changes.

## Output Format

```markdown
## Summary

[1-2 sentence summary of what this PR does]

## Changes

### Added

- [New feature/file 1]
- [New feature/file 2]

### Changed

- [Modified behavior 1]
- [Modified behavior 2]

### Fixed

- [Bug fix 1]
- [Bug fix 2]

### Removed

- [Removed feature/file 1]

## Details

[More detailed explanation of the implementation approach, architectural decisions, or complex changes]

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

### Test Instructions

1. [Step to test feature]
2. [Expected result]

## Screenshots

[If UI changes, include before/after screenshots]

## Related

- Closes #[issue number]
- Related to #[issue number]

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## Guidelines

1. **Be specific** - Describe what changed, not just which files
2. **Explain why** - Context for reviewers
3. **Link issues** - Connect to related issues/tickets
4. **Include testing steps** - Help reviewers verify
5. **Note breaking changes** - Call out anything that affects others
