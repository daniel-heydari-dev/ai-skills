## Stack: Go

- Language: Go
- Module System: Go Modules

## Commands

```bash
# Development
go run .

# Build
go build -o app .

# Test
go test ./...

# Lint
golangci-lint run
```

## Conventions

- Follow Effective Go guidelines
- Use `gofmt` for formatting
- Keep packages small and focused
- Handle errors explicitly (no panic in libraries)
