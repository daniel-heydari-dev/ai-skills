---
name: feature-spec
description: Generate detailed feature specifications from requirements.
---

# Feature Specification Prompt

Generate a detailed feature specification from the provided requirements.

## Output Format

```markdown
# Feature Specification: [Feature Name]

**Author:** [Name]
**Date:** [YYYY-MM-DD]
**Status:** [Draft/Review/Approved/In Progress/Complete]

## Overview

### Problem Statement

[What problem does this feature solve? Why is it important?]

### Proposed Solution

[High-level description of the solution]

### Goals

- [Goal 1]
- [Goal 2]

### Non-Goals

- [What this feature will NOT do]
- [Out of scope items]

## User Stories

### As a [user type]

**I want to** [action]
**So that** [benefit]

**Acceptance Criteria:**

- [ ] [Criterion 1]
- [ ] [Criterion 2]

### As a [user type]

**I want to** [action]
**So that** [benefit]

**Acceptance Criteria:**

- [ ] [Criterion 1]

## Detailed Design

### User Flow
```

[Start] → [Step 1] → [Step 2] → [End]

````

### UI/UX Design
[Description or link to designs/mockups]

### Technical Approach
[How will this be implemented technically?]

### Data Model
[Any new data structures or changes to existing ones]

```typescript
interface NewEntity {
  id: string;
  // ...
}
````

### API Changes

[New or modified API endpoints]

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| POST   | /api/feature | Creates new... |

## Edge Cases

| Scenario      | Expected Behavior |
| ------------- | ----------------- |
| [Edge case 1] | [How to handle]   |
| [Edge case 2] | [How to handle]   |

## Security Considerations

- [Security concern 1 and mitigation]
- [Security concern 2 and mitigation]

## Performance Considerations

- [Performance concern and approach]

## Testing Strategy

### Unit Tests

- [Test area 1]

### Integration Tests

- [Test area 1]

### E2E Tests

- [User flow to test]

## Rollout Plan

### Phase 1: [Name]

- [ ] Task 1
- [ ] Task 2

### Phase 2: [Name]

- [ ] Task 1

## Success Metrics

| Metric     | Current | Target |
| ---------- | ------- | ------ |
| [Metric 1] | [Value] | [Goal] |

## Open Questions

- [ ] [Question 1]
- [ ] [Question 2]

## References

- [Link to related doc]
- [Link to research]

```

## Guidelines

1. **Start with the why** - Problem statement first
2. **Be specific** - Detailed acceptance criteria
3. **Consider edge cases** - Think through failure modes
4. **Plan for testing** - How will you verify it works?
5. **Define success** - Measurable outcomes
6. **Keep it updated** - Living document
```
