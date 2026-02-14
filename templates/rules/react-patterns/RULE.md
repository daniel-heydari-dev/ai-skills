---
name: react-patterns
description: Modern React patterns including hooks, composition, and state management best practices.
---

# React Patterns Rules

## Component Patterns

### Prefer Function Components

```tsx
// ❌ Avoid class components
class Counter extends React.Component {
  state = { count: 0 };
  render() { ... }
}

// ✅ Use function components with hooks
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Component Composition

```tsx
// ❌ Avoid prop drilling
function Page({ user, theme, locale }) {
  return <Header user={user} theme={theme} locale={locale} />;
}

// ✅ Use composition and context
function Page() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Header />
      </LocaleProvider>
    </ThemeProvider>
  );
}
```

### Custom Hooks for Logic

```tsx
// ❌ Logic mixed with UI
function UserProfile({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(id)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}

// ✅ Extract to custom hook
function useUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(id)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading };
}

function UserProfile({ id }) {
  const { user, loading } = useUser(id);
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
```

## State Management

### Colocate State

```tsx
// ❌ Global state for local concerns
const globalStore = create((set) => ({
  modalOpen: false,
  setModalOpen: (open) => set({ modalOpen: open }),
}));

// ✅ Local state for local concerns
function Dialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  );
}
```

### Derive State

```tsx
// ❌ Redundant state
const [items, setItems] = useState([]);
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(items.length);
}, [items]);

// ✅ Derive from existing state
const [items, setItems] = useState([]);
const count = items.length; // Derived, not stored
```

## Performance

### Memoize Expensive Computations

```tsx
// ❌ Recalculates on every render
function ProductList({ products, filter }) {
  const filtered = products.filter((p) => p.category === filter);
  return <List items={filtered} />;
}

// ✅ Memoize filtered result
function ProductList({ products, filter }) {
  const filtered = useMemo(
    () => products.filter((p) => p.category === filter),
    [products, filter],
  );
  return <List items={filtered} />;
}
```

### Stable Callbacks

```tsx
// ❌ New function every render
function Parent() {
  return <Child onClick={() => console.log("clicked")} />;
}

// ✅ Stable callback reference
function Parent() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);
  return <Child onClick={handleClick} />;
}
```

## Rules Summary

- [ ] Use function components, not classes
- [ ] Extract reusable logic to custom hooks
- [ ] Colocate state with components that use it
- [ ] Derive state instead of syncing state
- [ ] Memoize expensive computations
- [ ] Use stable callback references for child components
- [ ] Prefer composition over prop drilling
