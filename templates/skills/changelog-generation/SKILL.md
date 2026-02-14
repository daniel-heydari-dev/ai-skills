---
name: changelog-generation
description: Conventional commits, semantic versioning, and automated changelog generation. Use when managing releases, writing commit messages, or generating release notes.
category: process
tags: [git, versioning, releases, commits, changelog]
---

# Skill: Changelog Generation

Generate professional changelogs using conventional commits and semantic versioning.

## Conventional Commits

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type       | Description             | Semver | Changelog Section |
| ---------- | ----------------------- | ------ | ----------------- |
| `feat`     | New feature             | MINOR  | ✨ Features       |
| `fix`      | Bug fix                 | PATCH  | 🐛 Bug Fixes      |
| `docs`     | Documentation           | -      | 📚 Documentation  |
| `style`    | Code style (formatting) | -      | -                 |
| `refactor` | Code refactoring        | -      | ♻️ Refactoring    |
| `perf`     | Performance improvement | PATCH  | ⚡ Performance    |
| `test`     | Adding tests            | -      | -                 |
| `build`    | Build system            | -      | -                 |
| `ci`       | CI configuration        | -      | -                 |
| `chore`    | Maintenance             | -      | -                 |
| `revert`   | Revert commit           | PATCH  | ⏪ Reverts        |

### Breaking Changes

```
feat(api)!: change authentication method

BREAKING CHANGE: The `api_key` parameter is now required.
Old authentication via cookies is no longer supported.
```

### Examples

```bash
# Feature
feat(auth): add OAuth2 login support

# Bug fix
fix(cart): resolve quantity update race condition

# With scope
feat(users): implement email verification flow

# With body
fix(payments): handle declined card errors gracefully

The payment form now displays a user-friendly error message
when a card is declined, instead of showing a generic error.

Closes #234

# Breaking change
feat(api)!: require API version header

BREAKING CHANGE: All API requests must include X-API-Version header.
Requests without this header will return 400 Bad Request.

Migration guide: Add `X-API-Version: 2024-01` to all requests.
```

## Semantic Versioning

### Format

```
MAJOR.MINOR.PATCH

Examples:
1.0.0   → Initial release
1.1.0   → New feature (backward compatible)
1.1.1   → Bug fix
2.0.0   → Breaking change
```

### Version Rules

| Change Type     | Version Bump | Example       |
| --------------- | ------------ | ------------- |
| Breaking change | MAJOR        | 1.2.3 → 2.0.0 |
| New feature     | MINOR        | 1.2.3 → 1.3.0 |
| Bug fix         | PATCH        | 1.2.3 → 1.2.4 |
| Pre-release     | Suffix       | 2.0.0-alpha.1 |

### Pre-release Versions

```
2.0.0-alpha.1    # Alpha release
2.0.0-beta.1     # Beta release
2.0.0-rc.1       # Release candidate
2.0.0            # Stable release
```

## Changelog Format

### Keep a Changelog Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New feature description

### Changed

- Modified behavior description

### Deprecated

- Feature being phased out

### Removed

- Feature removed

### Fixed

- Bug fix description

### Security

- Security fix description

## [1.2.0] - 2024-01-15

### Added

- OAuth2 authentication support (#123)
- User profile export feature (#145)

### Fixed

- Cart quantity update race condition (#234)
- Email validation on signup form (#256)

### Security

- Updated dependencies to patch CVE-2024-1234

## [1.1.0] - 2024-01-01

### Added

- Initial release with core features

[Unreleased]: https://github.com/user/repo/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/user/repo/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/user/repo/releases/tag/v1.1.0
```

## Automated Generation

### Git Commit Analysis

```typescript
interface Commit {
  hash: string;
  type: string;
  scope?: string;
  description: string;
  body?: string;
  breaking: boolean;
  issues?: string[];
}

function parseCommit(message: string): Commit {
  const regex = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/;
  const match = message.match(regex);

  if (!match) {
    return { type: "other", description: message };
  }

  const [, type, scope, bang, description] = match;
  const breaking = !!bang || message.includes("BREAKING CHANGE");
  const issues = message.match(/#(\d+)/g);

  return { type, scope, description, breaking, issues };
}
```

### Generate Changelog Entry

```typescript
function generateChangelog(commits: Commit[], version: string): string {
  const sections = {
    feat: { title: "### ✨ Features", items: [] },
    fix: { title: "### 🐛 Bug Fixes", items: [] },
    perf: { title: "### ⚡ Performance", items: [] },
    docs: { title: "### 📚 Documentation", items: [] },
    refactor: { title: "### ♻️ Refactoring", items: [] },
    breaking: { title: "### 💥 Breaking Changes", items: [] },
  };

  for (const commit of commits) {
    if (commit.breaking) {
      sections.breaking.items.push(formatCommit(commit));
    }
    if (sections[commit.type]) {
      sections[commit.type].items.push(formatCommit(commit));
    }
  }

  let changelog = `## [${version}] - ${formatDate(new Date())}\n\n`;

  for (const section of Object.values(sections)) {
    if (section.items.length > 0) {
      changelog += `${section.title}\n\n`;
      changelog += section.items.map((item) => `- ${item}`).join("\n");
      changelog += "\n\n";
    }
  }

  return changelog;
}

function formatCommit(commit: Commit): string {
  let line = commit.description;
  if (commit.scope) {
    line = `**${commit.scope}:** ${line}`;
  }
  if (commit.issues?.length) {
    line += ` (${commit.issues.join(", ")})`;
  }
  return line;
}
```

## Release Process

### Manual Release

```bash
# 1. Update version in package.json
npm version minor  # or patch/major

# 2. Generate/update CHANGELOG.md
# (manually or with tool)

# 3. Commit changes
git add CHANGELOG.md package.json
git commit -m "chore(release): v1.2.0"

# 4. Create tag
git tag -a v1.2.0 -m "Release v1.2.0"

# 5. Push
git push origin main --tags
```

### Automated with GitHub Actions

```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Generate changelog
        run: npx conventional-changelog -p angular -i CHANGELOG.md -s

      - name: Bump version
        run: npm version patch --no-git-tag-version

      - name: Commit and tag
        run: |
          git config user.name "github-actions"
          git config user.email "actions@github.com"
          VERSION=$(node -p "require('./package.json').version")
          git add .
          git commit -m "chore(release): v$VERSION"
          git tag "v$VERSION"
          git push origin main --tags
```

## Release Notes Template

````markdown
# Release v1.2.0

## Highlights

🎉 This release introduces OAuth2 authentication support, making it easier
to integrate with third-party services.

## What's New

### ✨ Features

- **auth:** OAuth2 login support for Google and GitHub (#123)
- **export:** User profile export in CSV and JSON formats (#145)
- **ui:** Dark mode support (#167)

### 🐛 Bug Fixes

- **cart:** Fixed race condition when updating quantities (#234)
- **email:** Fixed validation regex for edge cases (#256)

### ⚡ Performance

- **api:** Reduced response time by 40% with query optimization (#189)

### 💥 Breaking Changes

- **api:** Authentication endpoint moved from `/auth` to `/v2/auth`
  - Migration: Update your API calls to use the new endpoint
  - Old endpoint will be removed in v2.0.0

## Upgrade Guide

1. Update your dependencies:
   ```bash
   npm update your-package
   ```
````

2. If using OAuth, add your credentials to `.env`:
   ```
   OAUTH_CLIENT_ID=your-client-id
   OAUTH_CLIENT_SECRET=your-secret
   ```

## Contributors

Thanks to all contributors who made this release possible:

- @contributor1
- @contributor2

## Full Changelog

https://github.com/user/repo/compare/v1.1.0...v1.2.0

````

## Tools

### Conventional Changelog

```bash
# Install
npm install -D conventional-changelog-cli

# Generate changelog
npx conventional-changelog -p angular -i CHANGELOG.md -s

# First release (full history)
npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0
````

### Commitlint

```bash
# Install
npm install -D @commitlint/{cli,config-conventional}

# Configure (commitlint.config.js)
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['auth', 'api', 'ui', 'core']],
  },
};

# Add husky hook
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

### Release Please

```yaml
# .github/workflows/release-please.yml
name: Release Please

on:
  push:
    branches: [main]

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/release-please-action@v4
        with:
          release-type: node
          package-name: your-package
```

## Best Practices

### Rules

- ✅ DO: Write clear, descriptive commit messages
- ✅ DO: Reference issues/PRs in commits
- ✅ DO: Group related changes in single commit
- ✅ DO: Update changelog before release
- ✅ DO: Tag releases with semantic versions
- ❌ DON'T: Mix unrelated changes in one commit
- ❌ DON'T: Use vague messages ("fix bug", "update")
- ❌ DON'T: Skip changelog for releases
- ❌ DON'T: Use inconsistent versioning
