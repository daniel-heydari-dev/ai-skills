---
name: accessibility-required
description: Enforce web accessibility (a11y) standards for inclusive user experiences.
---

# Accessibility Required Rules

## Rule

All UI components must meet WCAG 2.1 AA accessibility standards. No component ships without proper a11y.

## Core Requirements

### Semantic HTML

```tsx
// ❌ Bad - div soup
<div onClick={handleClick}>Click me</div>
<div class="header">Title</div>
<div class="list">
  <div>Item 1</div>
</div>

// ✅ Good - semantic elements
<button onClick={handleClick}>Click me</button>
<h1>Title</h1>
<ul>
  <li>Item 1</li>
</ul>
```

### Keyboard Navigation

```tsx
// ❌ Bad - mouse only
<div onClick={handleSelect}>Select option</div>

// ✅ Good - keyboard accessible
<button
  onClick={handleSelect}
  onKeyDown={(e) => e.key === 'Enter' && handleSelect()}
  tabIndex={0}
>
  Select option
</button>

// ✅ Better - use native elements
<button onClick={handleSelect}>Select option</button>
```

### Image Alt Text

```tsx
// ❌ Bad - missing alt
<img src="profile.jpg" />

// ❌ Bad - useless alt
<img src="profile.jpg" alt="image" />

// ✅ Good - descriptive alt
<img src="profile.jpg" alt="Sarah Johnson, Senior Developer" />

// ✅ Good - decorative image
<img src="decoration.svg" alt="" role="presentation" />
```

### Form Labels

```tsx
// ❌ Bad - no label
<input type="email" placeholder="Email" />

// ✅ Good - visible label
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Good - aria-label for icon buttons
<button aria-label="Close dialog">
  <XIcon />
</button>
```

### Color Contrast

```css
/* ❌ Bad - low contrast */
.text {
  color: #999; /* on white background - 2.8:1 ratio */
}

/* ✅ Good - WCAG AA compliant */
.text {
  color: #595959; /* on white background - 7:1 ratio */
}
```

### Focus States

```css
/* ❌ Bad - removing focus outline */
button:focus {
  outline: none;
}

/* ✅ Good - visible focus indicator */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

/* ✅ Good - focus-visible for keyboard only */
button:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
```

### ARIA Attributes

```tsx
// Loading states
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// Expandable content
<button
  aria-expanded={isOpen}
  aria-controls="panel-content"
>
  Toggle panel
</button>
<div id="panel-content" hidden={!isOpen}>
  Content
</div>

// Live regions
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

## Testing Checklist

### Automated Testing

```bash
# Install axe-core for testing
npm install @axe-core/react --save-dev
```

```tsx
// In tests
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

it("should have no a11y violations", async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing

- [ ] Navigate entire UI with keyboard only
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Check with browser zoom at 200%
- [ ] Verify color contrast ratios
- [ ] Test with reduced motion preference

## Enforcement

- [ ] Semantic HTML elements used
- [ ] All images have appropriate alt text
- [ ] All form inputs have labels
- [ ] Interactive elements are keyboard accessible
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] No accessibility errors in axe/Lighthouse
