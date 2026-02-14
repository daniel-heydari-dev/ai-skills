import { describe, expect, it } from "vitest";
import {
  loadCatalog,
  loadContentType,
  searchCatalog,
  parseFrontmatter,
  validateFrontmatter,
} from "../src/catalog.js";
import {
  getAllAssistants,
  getAssistantsForContentType,
} from "../src/agents.js";

// ============================================================================
// CATALOG TESTS
// ============================================================================

describe("loadCatalog", () => {
  it("loads bundled skills from templates directory", async () => {
    const catalog = await loadCatalog();
    const skills = catalog.get("skills");

    expect(skills).toBeDefined();
    expect(skills!.length).toBeGreaterThan(0);
    // Skills should exist, check a few known ones
    const skillNames = skills!.map((s) => s.name);
    expect(skillNames.length).toBeGreaterThan(5); // Should have multiple skills
  });

  it("loads bundled agents from templates directory", async () => {
    const catalog = await loadCatalog();
    const agents = catalog.get("agents");

    expect(agents).toBeDefined();
    expect(agents!.length).toBeGreaterThan(0);
    // Should have our new agents
    expect(agents!.some((a) => a.name === "code-reviewer")).toBe(true);
  });

  it("loads bundled commands from templates directory", async () => {
    const catalog = await loadCatalog();
    const commands = catalog.get("commands");

    expect(commands).toBeDefined();
    expect(commands!.length).toBeGreaterThan(0);
    expect(commands!.some((c) => c.name === "code-review")).toBe(true);
  });
});

describe("parseFrontmatter", () => {
  it("parses valid frontmatter and returns object with frontmatter and body", () => {
    const content = `---
name: test
description: Test description
---

# Content`;

    const result = parseFrontmatter(content);
    expect(result.frontmatter.name).toBe("test");
    expect(result.frontmatter.description).toBe("Test description");
    expect(result.body).toContain("# Content");
  });

  it("returns empty frontmatter for content without frontmatter", () => {
    const content = `# No Frontmatter

Just content`;

    const result = parseFrontmatter(content);
    expect(result.frontmatter).toEqual({});
    expect(result.body).toContain("# No Frontmatter");
  });
});

describe("searchCatalog", () => {
  it("finds items by name", async () => {
    const results = await searchCatalog("react");
    expect(results.length).toBeGreaterThan(0);
  });

  it("finds items by description", async () => {
    const results = await searchCatalog("debugging");
    expect(results.length).toBeGreaterThan(0);
  });
});

// ============================================================================
// AGENTS TESTS
// ============================================================================

describe("getAllAssistants", () => {
  it("returns all supported assistants", () => {
    const assistants = getAllAssistants();
    expect(assistants.length).toBeGreaterThanOrEqual(18);
    expect(assistants.some((a) => a.id === "claude")).toBe(true);
    expect(assistants.some((a) => a.id === "cursor")).toBe(true);
    expect(assistants.some((a) => a.id === "copilot")).toBe(true);
    expect(assistants.some((a) => a.id === "windsurf")).toBe(true);
    expect(assistants.some((a) => a.id === "gemini")).toBe(true);
    expect(assistants.some((a) => a.id === "codex")).toBe(true);
    expect(assistants.some((a) => a.id === "amp")).toBe(true);
    expect(assistants.some((a) => a.id === "cline")).toBe(true);
    expect(assistants.some((a) => a.id === "roo")).toBe(true);
    expect(assistants.some((a) => a.id === "goose")).toBe(true);
    expect(assistants.some((a) => a.id === "kiro")).toBe(true);
    expect(assistants.some((a) => a.id === "trae")).toBe(true);
  });

  it("each assistant has required fields", () => {
    const assistants = getAllAssistants();
    for (const a of assistants) {
      expect(a.id).toBeTruthy();
      expect(a.name).toBeTruthy();
      expect(a.description).toBeTruthy();
      expect(typeof a.detectInstalled).toBe("function");
      expect(a.paths.skills).toBeTruthy();
      expect(a.globalPaths.skills).toBeTruthy();
    }
  });

  it("universal agents use .agents/skills path", () => {
    const assistants = getAllAssistants();
    const universals = assistants.filter((a) => a.isUniversal);
    expect(universals.length).toBeGreaterThanOrEqual(4);
    for (const a of universals) {
      expect(a.paths.skills).toBe(".ai/skills");
    }
  });
});

describe("getAssistantsForContentType", () => {
  it("returns assistants that support skills", () => {
    const assistants = getAssistantsForContentType("skills");
    expect(assistants.length).toBeGreaterThanOrEqual(18);
  });

  it("returns assistants that support rules", () => {
    const assistants = getAssistantsForContentType("rules");
    expect(assistants.length).toBeGreaterThan(0);
  });

  it("returns assistants that support agents", () => {
    const assistants = getAssistantsForContentType("agents");
    expect(assistants.length).toBeGreaterThan(0);
  });

  it("returns assistants that support commands", () => {
    const assistants = getAssistantsForContentType("commands");
    expect(assistants.length).toBeGreaterThan(0);
    // Only Claude Code supports commands currently
    expect(assistants.some((a) => a.id === "claude")).toBe(true);
  });

  it("returns assistants that support prompts", () => {
    const assistants = getAssistantsForContentType("prompts");
    expect(assistants.length).toBeGreaterThan(0);
    // Only GitHub Copilot supports prompts currently
    expect(assistants.some((a) => a.id === "copilot")).toBe(true);
  });
});

// ============================================================================
// VALIDATION TESTS (Claude Skills Guide compliance)
// ============================================================================

describe("validateFrontmatter", () => {
  it("passes valid kebab-case frontmatter", () => {
    const result = validateFrontmatter({
      name: "my-skill",
      description: "Does X and Y. Use when user asks about Z.",
      category: "frontend",
      tags: ["a", "b"],
    });
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("rejects missing name", () => {
    const result = validateFrontmatter({
      description: "Does something. Use when asked.",
    });
    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.field === "name")).toBe(true);
  });

  it("rejects non-kebab-case name", () => {
    const result = validateFrontmatter({
      name: "My Skill",
      description: "Does something. Use when asked.",
    });
    expect(result.valid).toBe(false);
    expect(
      result.issues.some(
        (i) => i.field === "name" && i.message.includes("kebab-case"),
      ),
    ).toBe(true);
  });

  it("rejects reserved name prefix", () => {
    const result = validateFrontmatter({
      name: "claude-helper",
      description: "Does something. Use when asked.",
    });
    expect(result.valid).toBe(false);
    expect(
      result.issues.some(
        (i) => i.field === "name" && i.message.includes("reserved"),
      ),
    ).toBe(true);
  });

  it("rejects XML brackets in description", () => {
    const result = validateFrontmatter({
      name: "my-skill",
      description: "Does <something>. Use when asked.",
    });
    expect(result.valid).toBe(false);
    expect(
      result.issues.some(
        (i) => i.field === "description" && i.message.includes("XML"),
      ),
    ).toBe(true);
  });

  it("rejects description over 1024 characters", () => {
    const result = validateFrontmatter({
      name: "my-skill",
      description: "x".repeat(1025),
    });
    expect(result.valid).toBe(false);
    expect(
      result.issues.some(
        (i) => i.field === "description" && i.message.includes("1024"),
      ),
    ).toBe(true);
  });

  it("warns when description missing trigger phrases", () => {
    const result = validateFrontmatter({
      name: "my-skill",
      description: "Does something useful.",
      category: "test",
      tags: ["a"],
    });
    expect(result.valid).toBe(true); // Warning, not error
    expect(
      result.issues.some(
        (i) => i.severity === "warning" && i.field === "description",
      ),
    ).toBe(true);
  });

  it("warns when category is missing", () => {
    const result = validateFrontmatter({
      name: "my-skill",
      description: "Does X. Use when asked about Y.",
      tags: ["a"],
    });
    expect(
      result.issues.some(
        (i) => i.severity === "warning" && i.field === "category",
      ),
    ).toBe(true);
  });

  it("warns when tags are missing", () => {
    const result = validateFrontmatter({
      name: "my-skill",
      description: "Does X. Use when asked about Y.",
      category: "test",
    });
    expect(
      result.issues.some((i) => i.severity === "warning" && i.field === "tags"),
    ).toBe(true);
  });

  it("warns when name does not match folder id", () => {
    const result = validateFrontmatter(
      {
        name: "my-skill",
        description: "Does X. Use when asked about Y.",
        category: "test",
        tags: ["a"],
      },
      "different-folder",
    );
    expect(
      result.issues.some(
        (i) => i.severity === "warning" && i.message.includes("folder"),
      ),
    ).toBe(true);
  });
});

describe("bundled skills compliance", () => {
  it("all bundled skills have valid frontmatter (no errors)", async () => {
    const skills = await loadContentType("skills");
    expect(skills.length).toBeGreaterThan(0);

    for (const skill of skills) {
      const { frontmatter } = parseFrontmatter(skill.content || "");
      const result = validateFrontmatter(frontmatter, skill.id);
      const errors = result.issues.filter((i) => i.severity === "error");

      expect(
        errors,
        `Skill "${skill.id}" has validation errors: ${JSON.stringify(errors)}`,
      ).toHaveLength(0);
    }
  });

  it("all bundled skills have kebab-case names matching folder", async () => {
    const skills = await loadContentType("skills");

    for (const skill of skills) {
      const { frontmatter } = parseFrontmatter(skill.content || "");
      expect(
        frontmatter.name,
        `Skill "${skill.id}" name should match folder`,
      ).toBe(skill.id);
    }
  });

  it("all bundled skills have category and tags", async () => {
    const skills = await loadContentType("skills");

    for (const skill of skills) {
      const { frontmatter } = parseFrontmatter(skill.content || "");
      expect(
        frontmatter.category,
        `Skill "${skill.id}" should have a category`,
      ).toBeTruthy();
      expect(
        frontmatter.tags,
        `Skill "${skill.id}" should have tags`,
      ).toBeTruthy();
    }
  });
});
