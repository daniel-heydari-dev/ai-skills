export interface Skill {
  id: string;
  name: string;
  description: string;
  category: "skills" | "agents" | "commands" | "rules" | "prompts";
  tags: string[];
  file: string;
}

export const catalog: Skill[] = [
  // ─── Skills (18) ─────────────────────────────────────────────────
  {
    id: "accessibility",
    name: "Accessibility",
    description:
      "Build inclusive web applications following WCAG standards — semantic HTML, keyboard navigation, ARIA attributes, and screen reader support.",
    category: "skills",
    tags: ["accessibility", "a11y", "wcag", "aria"],
    file: "skills/accessibility/SKILL.md",
  },
  {
    id: "api-design",
    name: "API Design",
    description:
      "RESTful API design conventions, OpenAPI specifications, versioning strategies, and error response patterns.",
    category: "skills",
    tags: ["api", "rest", "openapi", "http"],
    file: "skills/api-design/SKILL.md",
  },
  {
    id: "brainstorming",
    name: "Brainstorming",
    description:
      "Explores user intent, requirements, and design before implementation through collaborative dialogue.",
    category: "skills",
    tags: ["planning", "design", "architecture", "requirements"],
    file: "skills/brainstorming/SKILL.md",
  },
  {
    id: "changelog-generation",
    name: "Changelog Generation",
    description:
      "Conventional commits, semantic versioning, and automated changelog generation for managing releases.",
    category: "skills",
    tags: ["git", "versioning", "releases", "changelog"],
    file: "skills/changelog-generation/SKILL.md",
  },
  {
    id: "clean-code",
    name: "Clean Code",
    description:
      "Principles for writing readable, maintainable, and simple code — naming conventions, function design, and quality.",
    category: "skills",
    tags: ["clean-code", "naming", "readability", "refactoring"],
    file: "skills/clean-code/SKILL.md",
  },
  {
    id: "clean-typescript",
    name: "Clean TypeScript",
    description:
      "TypeScript best practices for type safety, strict typing, discriminated unions, utility types, and maintainability.",
    category: "skills",
    tags: ["typescript", "types", "type-safety", "generics"],
    file: "skills/clean-typescript/SKILL.md",
  },
  {
    id: "documentation",
    name: "Documentation",
    description:
      "Write clear, useful documentation including JSDoc comments, README files, and API docs.",
    category: "skills",
    tags: ["documentation", "jsdoc", "readme", "api-docs"],
    file: "skills/documentation/SKILL.md",
  },
  {
    id: "error-handling",
    name: "Error Handling",
    description:
      "Patterns for robust error handling including custom error classes, Result types, and retry logic.",
    category: "skills",
    tags: ["error-handling", "errors", "result-type", "resilience"],
    file: "skills/error-handling/SKILL.md",
  },
  {
    id: "git-workflow",
    name: "Git Workflow",
    description:
      "Git best practices for clean history, branching strategies, commit conventions, and team collaboration.",
    category: "skills",
    tags: ["git", "version-control", "commits", "branching"],
    file: "skills/git-workflow/SKILL.md",
  },
  {
    id: "interface-design",
    name: "Interface Design",
    description:
      "Modern UI design patterns, design systems, component architecture, spacing systems, and visual consistency.",
    category: "skills",
    tags: ["ui", "design", "components", "ux", "css"],
    file: "skills/interface-design/SKILL.md",
  },
  {
    id: "modern-nextjs",
    name: "Modern Next.js",
    description:
      "Next.js App Router best practices including server/client components, data fetching, and routing patterns.",
    category: "skills",
    tags: ["nextjs", "react", "app-router", "server-components"],
    file: "skills/modern-nextjs/SKILL.md",
  },
  {
    id: "modern-react",
    name: "Modern React",
    description:
      "Modern React patterns and best practices including hooks, composition, component structure, and performance.",
    category: "skills",
    tags: ["react", "hooks", "components", "state-management"],
    file: "skills/modern-react/SKILL.md",
  },
  {
    id: "node-backend",
    name: "Node.js Backend",
    description:
      "Best practices for Node.js server applications including Express project structure, middleware, and controllers.",
    category: "skills",
    tags: ["nodejs", "express", "backend", "api", "server"],
    file: "skills/node-backend/SKILL.md",
  },
  {
    id: "performance",
    name: "Performance",
    description:
      "Techniques for building fast applications including bundle optimization, React performance, caching, and web vitals.",
    category: "skills",
    tags: ["performance", "optimization", "bundle-size", "caching"],
    file: "skills/performance/SKILL.md",
  },
  {
    id: "solid-principles",
    name: "SOLID Principles",
    description:
      "Five SOLID principles for maintainable object-oriented design — SRP, OCP, LSP, ISP, and DIP with examples.",
    category: "skills",
    tags: ["solid", "oop", "design-patterns", "architecture"],
    file: "skills/solid-principles/SKILL.md",
  },
  {
    id: "systematic-debugging",
    name: "Systematic Debugging",
    description:
      "Methodical debugging process using binary search, logging strategies, 5-whys root cause analysis.",
    category: "skills",
    tags: ["debugging", "troubleshooting", "logging", "root-cause"],
    file: "skills/systematic-debugging/SKILL.md",
  },
  {
    id: "testing-best-practices",
    name: "Testing Best Practices",
    description:
      "Write effective, maintainable tests following AAA pattern, proper naming, mocking strategies, and organization.",
    category: "skills",
    tags: ["testing", "unit-tests", "mocking", "coverage"],
    file: "skills/testing-best-practices/SKILL.md",
  },
  {
    id: "web-security",
    name: "Web Security",
    description:
      "Security best practices for web applications including XSS prevention, CSRF protection, and input validation.",
    category: "skills",
    tags: ["security", "xss", "csrf", "authentication"],
    file: "skills/web-security/SKILL.md",
  },

  // ─── Agents (8) ──────────────────────────────────────────────────
  {
    id: "architect",
    name: "Architect",
    description:
      "Software architect that designs scalable systems, evaluates tradeoffs, and creates technical specifications.",
    category: "agents",
    tags: ["architecture", "design", "scalability", "system-design"],
    file: "agents/architect/AGENT.md",
  },
  {
    id: "code-reviewer",
    name: "Code Reviewer",
    description:
      "Expert code reviewer that analyzes code for quality, security, performance, and best practices.",
    category: "agents",
    tags: ["review", "quality", "security", "best-practices"],
    file: "agents/code-reviewer/AGENT.md",
  },
  {
    id: "docs-explorer",
    name: "Docs Explorer",
    description:
      "Documentation specialist that navigates codebases, explains architecture, and helps understand unfamiliar code.",
    category: "agents",
    tags: ["documentation", "architecture", "onboarding", "exploration"],
    file: "agents/docs-explorer/AGENT.md",
  },
  {
    id: "migration-helper",
    name: "Migration Helper",
    description:
      "Migration specialist that helps upgrade frameworks, migrate databases, and modernize legacy codebases.",
    category: "agents",
    tags: ["migration", "upgrade", "modernization", "compatibility"],
    file: "agents/migration-helper/AGENT.md",
  },
  {
    id: "performance-optimizer",
    name: "Performance Optimizer",
    description:
      "Performance specialist that identifies bottlenecks, optimizes code, and improves application speed.",
    category: "agents",
    tags: ["performance", "optimization", "profiling", "bottlenecks"],
    file: "agents/performance-optimizer/AGENT.md",
  },
  {
    id: "refactor-expert",
    name: "Refactor Expert",
    description:
      "Code refactoring specialist that improves code quality, applies design patterns, and modernizes legacy code.",
    category: "agents",
    tags: ["refactoring", "clean-code", "patterns", "modernization"],
    file: "agents/refactor-expert/AGENT.md",
  },
  {
    id: "security-auditor",
    name: "Security Auditor",
    description:
      "Security specialist that identifies vulnerabilities, reviews code for security issues, and recommends protections.",
    category: "agents",
    tags: ["security", "vulnerabilities", "audit", "owasp"],
    file: "agents/security-auditor/AGENT.md",
  },
  {
    id: "test-writer",
    name: "Test Writer",
    description:
      "Expert test writer that generates comprehensive test suites with unit tests, integration tests, and edge cases.",
    category: "agents",
    tags: ["testing", "unit-tests", "integration", "coverage"],
    file: "agents/test-writer/AGENT.md",
  },

  // ─── Commands (8) ────────────────────────────────────────────────
  {
    id: "code-review",
    name: "/code-review",
    description:
      "Comprehensive code review that analyzes code for quality, security, performance, and best practices.",
    category: "commands",
    tags: ["review", "quality", "security"],
    file: "commands/code-review/COMMAND.md",
  },
  {
    id: "document",
    name: "/document",
    description:
      "Generates documentation for code including JSDoc/TSDoc, README sections, and API docs.",
    category: "commands",
    tags: ["documentation", "jsdoc", "api-docs"],
    file: "commands/document/COMMAND.md",
  },
  {
    id: "explain",
    name: "/explain",
    description:
      "Explains code, concepts, or architecture in clear, accessible language with examples.",
    category: "commands",
    tags: ["explanation", "learning", "concepts"],
    file: "commands/explain/COMMAND.md",
  },
  {
    id: "fix-tests",
    name: "/fix-tests",
    description:
      "Analyzes failing tests and provides fixes with explanations of root causes.",
    category: "commands",
    tags: ["testing", "debugging", "fixes"],
    file: "commands/fix-tests/COMMAND.md",
  },
  {
    id: "generate-tests",
    name: "/generate-tests",
    description:
      "Generates comprehensive test suites with unit tests, edge cases, and mocks.",
    category: "commands",
    tags: ["testing", "generation", "coverage"],
    file: "commands/generate-tests/COMMAND.md",
  },
  {
    id: "optimize",
    name: "/optimize",
    description:
      "Analyzes and optimizes code for better performance with before/after comparisons.",
    category: "commands",
    tags: ["performance", "optimization", "profiling"],
    file: "commands/optimize/COMMAND.md",
  },
  {
    id: "refactor",
    name: "/refactor",
    description:
      "Refactors code to improve quality while preserving behavior with verification steps.",
    category: "commands",
    tags: ["refactoring", "clean-code", "quality"],
    file: "commands/refactor/COMMAND.md",
  },
  {
    id: "scaffold",
    name: "/scaffold",
    description:
      "Generates project scaffolding, boilerplate code, and file structures.",
    category: "commands",
    tags: ["scaffolding", "boilerplate", "generation"],
    file: "commands/scaffold/COMMAND.md",
  },

  // ─── Rules (6) ───────────────────────────────────────────────────
  {
    id: "accessibility-required",
    name: "Accessibility Required",
    description:
      "Enforces WCAG 2.1 AA accessibility standards including semantic HTML, keyboard navigation, and color contrast.",
    category: "rules",
    tags: ["a11y", "accessibility", "wcag", "aria"],
    file: "rules/accessibility-required/RULE.md",
  },
  {
    id: "error-boundaries",
    name: "Error Boundaries",
    description:
      "Requires React Error Boundaries for graceful error handling and preventing full app crashes.",
    category: "rules",
    tags: ["react", "error-handling", "boundaries", "resilience"],
    file: "rules/error-boundaries/RULE.md",
  },
  {
    id: "import-order",
    name: "Import Order",
    description:
      "Enforces consistent import ordering and grouping across 7 priority groups.",
    category: "rules",
    tags: ["imports", "organization", "style", "eslint"],
    file: "rules/import-order/RULE.md",
  },
  {
    id: "no-console",
    name: "No Console",
    description:
      "Disallows console.log in production code; requires proper structured logging infrastructure.",
    category: "rules",
    tags: ["console", "logging", "production", "pino"],
    file: "rules/no-console/RULE.md",
  },
  {
    id: "react-patterns",
    name: "React Patterns",
    description:
      "Enforces modern React patterns including hooks, composition, and state management best practices.",
    category: "rules",
    tags: ["react", "patterns", "hooks", "composition"],
    file: "rules/react-patterns/RULE.md",
  },
  {
    id: "typescript-strict",
    name: "TypeScript Strict",
    description:
      "Enforces strict TypeScript with proper typing, no any, strict null checks, and discriminated unions.",
    category: "rules",
    tags: ["typescript", "strict", "types", "no-any"],
    file: "rules/typescript-strict/RULE.md",
  },

  // ─── Prompts (5) ─────────────────────────────────────────────────
  {
    id: "bug-report",
    name: "Bug Report",
    description:
      "Generates structured bug reports with reproduction steps, environment info, and severity classification.",
    category: "prompts",
    tags: ["bug", "issue", "reporting", "reproduction"],
    file: "prompts/bug-report/PROMPT.md",
  },
  {
    id: "commit-message",
    name: "Commit Message",
    description:
      "Generates conventional commit messages with proper type, scope, and subject formatting.",
    category: "prompts",
    tags: ["commit", "git", "conventional-commits"],
    file: "prompts/commit-message/PROMPT.md",
  },
  {
    id: "feature-spec",
    name: "Feature Spec",
    description:
      "Generates detailed feature specifications with user stories, acceptance criteria, and technical design.",
    category: "prompts",
    tags: ["feature", "specification", "planning", "user-stories"],
    file: "prompts/feature-spec/PROMPT.md",
  },
  {
    id: "pr-description",
    name: "PR Description",
    description:
      "Generates comprehensive pull request descriptions with change summaries and review checklists.",
    category: "prompts",
    tags: ["pr", "git", "documentation", "review"],
    file: "prompts/pr-description/PROMPT.md",
  },
  {
    id: "release-notes",
    name: "Release Notes",
    description:
      "Generates user-facing release notes with highlights, features, fixes, and migration instructions.",
    category: "prompts",
    tags: ["release", "changelog", "documentation", "migration"],
    file: "prompts/release-notes/PROMPT.md",
  },
];

export const categories = {
  skills: {
    name: "Skills",
    icon: "⚡",
    description:
      "Reusable knowledge and best practices for common development tasks.",
    color: "var(--accent-purple)",
  },
  agents: {
    name: "Agents",
    icon: "🤖",
    description: "Specialized AI agents for specific development workflows.",
    color: "var(--accent-cyan)",
  },
  commands: {
    name: "Commands",
    icon: "⌘",
    description: "Quick actions and shortcuts for common operations.",
    color: "var(--accent-green)",
  },
  rules: {
    name: "Rules",
    icon: "📏",
    description: "Coding standards and linting rules to enforce consistency.",
    color: "var(--accent-orange)",
  },
  prompts: {
    name: "Prompts",
    icon: "💬",
    description: "Pre-built prompts for generating documentation and content.",
    color: "var(--accent-pink)",
  },
} as const;

export type CategoryId = keyof typeof categories;

export function getSkillsByCategory(categoryId: CategoryId): Skill[] {
  return catalog.filter((skill) => skill.category === categoryId);
}

export function getSkillById(id: string): Skill | undefined {
  return catalog.find((skill) => skill.id === id);
}

export function searchSkills(query: string): Skill[] {
  const lower = query.toLowerCase();
  return catalog.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lower) ||
      skill.description.toLowerCase().includes(lower) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(lower)),
  );
}
