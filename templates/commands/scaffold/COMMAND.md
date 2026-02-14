---
name: scaffold
description: Generate project scaffolding, boilerplate code, and file structures.
---

# Scaffold Command

Generate scaffolding for new projects, features, or components.

## Scaffolding Templates

### React Component

```tsx
// components/[Name]/[Name].tsx
import { FC } from 'react';
import styles from './[Name].module.css';

interface [Name]Props {
  // Define props
}

export const [Name]: FC<[Name]Props> = ({ ...props }) => {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
};

// components/[Name]/[Name].test.tsx
import { render, screen } from '@testing-library/react';
import { [Name] } from './[Name]';

describe('[Name]', () => {
  it('renders correctly', () => {
    render(<[Name] />);
    // Add assertions
  });
});

// components/[Name]/index.ts
export { [Name] } from './[Name]';
```

### API Route (Next.js)

```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createData(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create data" },
      { status: 500 },
    );
  }
}
```

### Service Class

```typescript
// services/[Name]Service.ts
import { injectable, inject } from 'tsyringe';

@injectable()
export class [Name]Service {
  constructor(
    @inject('Repository') private repository: Repository
  ) {}

  async getAll(): Promise<[Type][]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<[Type] | null> {
    return this.repository.findById(id);
  }

  async create(data: Create[Type]Dto): Promise<[Type]> {
    return this.repository.create(data);
  }

  async update(id: string, data: Update[Type]Dto): Promise<[Type]> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
```

### Feature Folder Structure

```
feature-name/
├── components/
│   ├── FeatureComponent.tsx
│   └── index.ts
├── hooks/
│   ├── useFeature.ts
│   └── index.ts
├── services/
│   ├── featureService.ts
│   └── index.ts
├── types/
│   ├── feature.types.ts
│   └── index.ts
├── utils/
│   ├── featureUtils.ts
│   └── index.ts
└── index.ts
```

## Usage

Specify what to scaffold:

- Component name and type (page, component, hook)
- Feature requirements
- Technology stack
- Any specific patterns to follow
