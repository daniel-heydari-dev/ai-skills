---
name: import-order
description: Enforce consistent import ordering and grouping for better readability.
---

# Import Order Rules

## Import Groups

Organize imports in this order, with blank lines between groups:

```typescript
// 1. React and framework imports
import React, { useState, useEffect } from "react";
import { NextPage } from "next";

// 2. External library imports
import { z } from "zod";
import { clsx } from "clsx";
import { format } from "date-fns";

// 3. Internal aliases (@/ or ~/)
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";

// 4. Relative imports (parent directories first)
import { UserContext } from "../../contexts/UserContext";
import { formatName } from "../utils/format";
import { Header } from "./Header";

// 5. Type imports (grouped at end)
import type { User, Post } from "@/types";
import type { ComponentProps } from "./types";

// 6. Style imports (last)
import styles from "./Component.module.css";
import "./global.css";
```

## Rules

### Group Ordering

1. **React/Framework** - react, next, remix, etc.
2. **External** - node_modules packages
3. **Internal aliases** - @/, ~/, #/
4. **Relative parent** - ../, ../../
5. **Relative sibling** - ./
6. **Types** - import type
7. **Styles** - .css, .scss, .module.css

### Within Groups

- Alphabetical order
- Named imports before default imports
- Shorter paths before longer paths

```typescript
// ✅ Good - alphabetical within group
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

// ❌ Bad - no order
import { Card } from "@/components/Card";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
```

### No Mixed Import Styles

```typescript
// ❌ Bad - mixing default and named from same source
import React from "react";
import { useState } from "react";

// ✅ Good - combined
import React, { useState, useEffect } from "react";
```

## ESLint Configuration

```json
{
  "plugins": ["import"],
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "type",
          "index"
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "@/**",
            "group": "internal"
          }
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  }
}
```

## Enforcement

- [ ] Imports grouped correctly
- [ ] Blank lines between groups
- [ ] Alphabetical within groups
- [ ] Type imports separated
- [ ] No duplicate imports from same module
