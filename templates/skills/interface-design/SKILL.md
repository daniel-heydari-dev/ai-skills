---
name: interface-design
description: Modern UI design patterns, design systems, component architecture, and visual consistency. Use when building user interfaces, design systems, or improving UX.
category: frontend
tags: [ui, design, components, ux, css, styling]
---

# Skill: Interface Design

Build interface design with craft and consistency.

## Scope

**Use for:** Dashboards, admin panels, SaaS apps, tools, settings pages, data interfaces.

**Not for:** Landing pages, marketing sites, campaigns. Redirect those to marketing/frontend-design guidelines.

## The Problem

Generic UI output is the default. Warm colors on cold structures. Friendly fonts on generic layouts. "Kitchen feel" that looks like every other app.

To break out: explore the domain, name a signature, state your intent — and execute with precision.

## Design Principles

### Rules

- ✅ DO: Establish a clear visual hierarchy
- ✅ DO: Use consistent spacing (8px grid system)
- ✅ DO: Create a limited, purposeful color palette
- ✅ DO: Design for accessibility from the start
- ✅ DO: Use whitespace intentionally
- ❌ DON'T: Mix multiple design languages
- ❌ DON'T: Use more than 2-3 typefaces
- ❌ DON'T: Rely solely on color for meaning
- ❌ DON'T: Ignore touch targets (min 44x44px)

### Visual Hierarchy

```
1. Size — Larger elements draw attention first
2. Color — High contrast elements stand out
3. Position — Top-left reads first (LTR languages)
4. Whitespace — Isolated elements appear important
5. Typography — Bold/different fonts create emphasis
```

## Component Architecture

### Atomic Design Pattern

```
atoms/          → buttons, inputs, labels, icons
molecules/      → form fields, search bars, cards
organisms/      → headers, forms, data tables
templates/      → page layouts, grid systems
pages/          → full page compositions
```

### Component API Design

```typescript
// ✅ Good - Composable, flexible API
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}

// ✅ Good - Consistent prop naming
<Button variant="primary" size="md" isLoading>
  Save Changes
</Button>

// ❌ Bad - Inconsistent, unclear API
<Button type="1" sz="medium" loading={true} disabled={false}>
  Save
</Button>
```

## Spacing System

### 8px Grid

```css
:root {
  --space-1: 4px; /* 0.5 unit - tight */
  --space-2: 8px; /* 1 unit - default */
  --space-3: 12px; /* 1.5 units */
  --space-4: 16px; /* 2 units */
  --space-5: 24px; /* 3 units */
  --space-6: 32px; /* 4 units */
  --space-7: 48px; /* 6 units */
  --space-8: 64px; /* 8 units */
}
```

### Spacing Rules

- **Related items:** 8-16px apart
- **Grouped sections:** 24-32px apart
- **Major sections:** 48-64px apart
- **Page margins:** 16-24px (mobile), 32-64px (desktop)

## Color System

### Semantic Colors

```css
:root {
  /* Brand */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;

  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Neutrals */
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-background: #ffffff;
  --color-surface: #f9fafb;
}
```

### Color Contrast

| Usage              | Minimum Ratio  |
| ------------------ | -------------- |
| Body text          | 4.5:1          |
| Large text (18px+) | 3:1            |
| UI components      | 3:1            |
| Decorative         | No requirement |

## Typography

### Type Scale

```css
:root {
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
}
```

### Typography Rules

- **Body text:** 16px minimum, 1.5 line-height
- **Headings:** 1.2-1.3 line-height
- **Line length:** 45-75 characters optimal
- **Paragraph spacing:** 1em between paragraphs

## Layout Patterns

### Dashboard Layout

```tsx
<div className="min-h-screen flex">
  {/* Sidebar - fixed width */}
  <aside className="w-64 border-r bg-surface">
    <nav>...</nav>
  </aside>

  {/* Main content - flexible */}
  <main className="flex-1 overflow-auto">
    {/* Header - sticky */}
    <header className="sticky top-0 h-16 border-b bg-white z-10">...</header>

    {/* Content area */}
    <div className="p-6">{children}</div>
  </main>
</div>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>{item.description}</CardContent>
      <CardFooter>
        <Button variant="ghost">View Details</Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

## Interaction States

### Button States

```css
.button {
  /* Default */
  background: var(--color-primary);

  /* Hover */
  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
  }

  /* Focus - always visible */
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Active/Pressed */
  &:active {
    transform: scale(0.98);
  }

  /* Disabled */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Loading */
  &[data-loading] {
    pointer-events: none;
  }
}
```

### Form Field States

```css
.input {
  border: 1px solid var(--color-border);

  &:hover {
    border-color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &[aria-invalid="true"] {
    border-color: var(--color-error);
  }

  &:disabled {
    background: var(--color-surface);
    cursor: not-allowed;
  }
}
```

## Animation & Motion

### Timing Functions

```css
:root {
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Duration Guidelines

| Type                       | Duration  |
| -------------------------- | --------- |
| Micro (hover, focus)       | 100-150ms |
| Small (buttons, toggles)   | 150-200ms |
| Medium (modals, dropdowns) | 200-300ms |
| Large (page transitions)   | 300-500ms |

### Motion Principles

- ✅ DO: Use motion to provide feedback
- ✅ DO: Keep animations subtle and fast
- ✅ DO: Respect `prefers-reduced-motion`
- ❌ DON'T: Animate for decoration only
- ❌ DON'T: Block user interaction during animation

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

### Breakpoints

```css
/* Mobile first */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
@media (min-width: 1536px) {
  /* 2xl */
}
```

### Responsive Patterns

```tsx
// ✅ Good - Mobile-first responsive
<div
  className="
  flex flex-col gap-4
  md:flex-row md:gap-6
  lg:gap-8
"
>
  <aside className="w-full md:w-64 lg:w-80">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

## Dark Mode

### Implementation

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1f2937;
  --color-border: #e5e7eb;
}

[data-theme="dark"] {
  --color-bg: #111827;
  --color-text: #f9fafb;
  --color-border: #374151;
}

/* Or with media query */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #111827;
    --color-text: #f9fafb;
  }
}
```

### Dark Mode Rules

- ✅ DO: Reduce contrast slightly (not pure white on black)
- ✅ DO: Desaturate colors slightly
- ✅ DO: Use elevated surfaces to show hierarchy
- ❌ DON'T: Simply invert colors
- ❌ DON'T: Use the same shadows as light mode
