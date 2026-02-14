---
name: optimize
description: Analyze and optimize code for better performance.
---

# Optimize Command

Analyze the provided code and suggest performance optimizations.

## Analysis Process

1. **Profile** - Identify hot paths and bottlenecks
2. **Measure** - Quantify current performance
3. **Optimize** - Apply targeted improvements
4. **Verify** - Confirm improvement without regression

## Output Format

````
## Performance Analysis

### Current Complexity
- Time: O([complexity])
- Space: O([complexity])

### Identified Bottlenecks
1. **[Bottleneck 1]**
   - Location: [where]
   - Impact: [estimated cost]
   - Cause: [why it's slow]

## Optimized Code

```[language]
// Optimized implementation
````

### Optimizations Applied

| Change   | Before | After | Improvement  |
| -------- | ------ | ----- | ------------ |
| [change] | O(n²)  | O(n)  | ~100x faster |

## Complexity After Optimization

- Time: O([new complexity])
- Space: O([new complexity])

## Trade-offs

- [What was sacrificed, if anything]
- [Additional memory usage, if any]

## Benchmarks

```[language]
// Benchmark code to verify improvement
```

```

## Optimization Strategies

| Strategy | When to Use | Example |
|----------|-------------|---------|
| Memoization | Repeated expensive calls | Cache function results |
| Lazy loading | Large upfront costs | Load on demand |
| Batching | Many small operations | Combine into bulk ops |
| Indexing | Frequent lookups | Use Map/Set instead of array |
| Streaming | Large data | Process chunks, not all at once |
```
