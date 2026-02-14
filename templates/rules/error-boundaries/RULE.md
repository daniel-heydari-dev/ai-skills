---
name: error-boundaries
description: Require error boundaries for React components to handle errors gracefully.
---

# Error Boundaries Rules

## Rule

Every major UI section must be wrapped in an Error Boundary to prevent full app crashes and provide graceful degradation.

## Implementation

### Error Boundary Component

```tsx
// components/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="error-fallback">
            <h2>Something went wrong</h2>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

### Usage Pattern

```tsx
// ❌ Bad - no error boundary
function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  );
}

// ✅ Good - sections wrapped in error boundaries
function App() {
  return (
    <div>
      <ErrorBoundary fallback={<HeaderFallback />}>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary fallback={<SidebarFallback />}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary fallback={<MainContentFallback />}>
        <MainContent />
      </ErrorBoundary>
    </div>
  );
}
```

### With Error Logging

```tsx
import { captureException } from "@sentry/react";

function App() {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    captureException(error, { extra: errorInfo });
  };

  return (
    <ErrorBoundary fallback={<ErrorPage />} onError={handleError}>
      <Routes />
    </ErrorBoundary>
  );
}
```

## Where to Place Error Boundaries

| Location                 | Why                            |
| ------------------------ | ------------------------------ |
| App root                 | Catch-all for unhandled errors |
| Route level              | Isolate page crashes           |
| Layout sections          | Header, sidebar, main content  |
| Data-fetching components | Handle API failures            |
| Third-party widgets      | Isolate external code          |

## Error Boundary Limitations

Error boundaries do NOT catch:

- Event handlers (use try/catch)
- Async code (use .catch() or try/catch)
- Server-side rendering errors
- Errors in the boundary itself

```tsx
// For event handlers, use try/catch
function Button() {
  const handleClick = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      // Handle error
    }
  };

  return <button onClick={handleClick}>Click</button>;
}
```

## Enforcement

- [ ] App root has error boundary
- [ ] Each route/page wrapped
- [ ] Major layout sections isolated
- [ ] Error logging configured
- [ ] Fallback UI is user-friendly
