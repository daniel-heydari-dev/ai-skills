---
applyTo: "**/*.tsx,**/components/**"
---

# React Component Instructions

When writing React components:

## Structure

- Use functional components with TypeScript
- Define props interface above component
- Export named components (not default)

## Patterns

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}
```

## Rules

- Keep components small and focused
- Extract custom hooks for reusable logic
- Use composition over configuration
- Avoid useEffect for derived state
- Use proper TypeScript types for props and events

## Accessibility

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast
