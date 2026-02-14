---
name: release-notes
description: Generate user-facing release notes from commits or changelog.
---

# Release Notes Prompt

Generate user-facing release notes from the provided commits or changelog.

## Output Format

```markdown
# Release v[X.Y.Z]

**Release Date:** [YYYY-MM-DD]

## Highlights

[2-3 sentences about the most important changes in this release]

## ✨ New Features

### [Feature Name]

[User-friendly description of the feature and how to use it]

### [Feature Name]

[Description]

## 🐛 Bug Fixes

- **[Area]**: [Description of what was fixed] (#[issue])
- **[Area]**: [Description] (#[issue])

## ⚡ Improvements

- **[Area]**: [Description of improvement]
- **[Area]**: [Description]

## 🔧 Technical Changes

- [Technical change that power users might care about]

## ⚠️ Breaking Changes

### [Breaking Change Title]

**What changed:** [Description]
**Migration:** [How to update]

## 📦 Dependencies

- Updated [package] from vX to vY
- Added [new package] for [purpose]

## 🙏 Contributors

Thanks to everyone who contributed to this release:

- @contributor1
- @contributor2

---

**Full Changelog:** [link to compare]
```

## Guidelines

1. **User-focused** - Write for end users, not developers
2. **Highlight value** - Lead with benefits, not implementation
3. **Group logically** - Features, fixes, improvements
4. **Link issues** - Reference related issues/PRs
5. **Call out breaking changes** - With migration instructions
6. **Credit contributors** - Acknowledge community contributions

## Tone

- Clear and concise
- Excited but professional
- Focused on user benefits
- Honest about breaking changes
