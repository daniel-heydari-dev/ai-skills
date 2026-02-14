# AI Setup Guide

This repo includes AI configuration files scaffolded by `ai-setup`. Below is guidance for each AI assistant.

---

## GitHub Copilot

### Repository Instructions

- `.github/copilot-instructions.md` — Repository-wide instructions for GitHub Copilot
- Enable in VS Code: `github.copilot.chat.codeGeneration.useInstructionFiles`

### Path-Specific Instructions

- `.github/instructions/*.instructions.md` — Path-specific instructions using `applyTo` frontmatter
- Example frontmatter:
  ```yaml
  ---
  applyTo: "**/*.test.ts"
  ---
  ```

### Prompt Files

- `.github/prompts/*.prompt.md` — Reusable prompt templates
- Frontmatter options: `name`, `description`, `argument-hint`, `agent`, `model`, `tools`
- Add extra directories: `chat.promptFilesLocations` setting

### Custom Agents

- `.github/agents/*.agent.md` — Custom chat agents
- Add extra directories: `chat.agentFilesLocations` setting

---

## Claude

### Root Instructions

- `CLAUDE.md` at repo root — Main instructions file Claude reads automatically

### Settings

- `.claude/settings.json` — Permissions and configuration

### Agents

- `.claude/agents/*.md` — Custom agents for specialized tasks

### Commands

- `.claude/commands/*.md` — Reusable slash commands

### Skills

- `.claude/skills/*/SKILL.md` — Modular best-practice guidelines
- Each skill teaches Claude specific patterns and rules

---

## Gemini

### Settings

- `.gemini/settings.json` — Core tools and excluded tools configuration
- Options: `coreTools`, `excludeTools`

### Auto-Approve Mode

- VS Code setting: `geminicodeassist.agentYoloMode` (use with caution)

---

## Universal Files

### AGENTS.md

- Repository root — Universal agent instructions
- Works with multiple AI assistants

---

## VS Code Settings (Optional)

Add to `.vscode/settings.json` for enhanced AI experience:

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "chat.useAgentSkills": true
}
```
