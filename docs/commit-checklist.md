# Commit Checklist

Use this checklist before making commits to ensure quality and consistency.

## Pre-Commit Checklist

### Code Quality
- [ ] Code follows TypeScript strict mode rules
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint warnings/errors (`npm run lint`)
- [ ] Code is properly formatted (`npm run format`)
- [ ] No console.log or debug statements left in code
- [ ] No commented-out code blocks
- [ ] Variable and function names are clear and descriptive

### Testing
- [ ] All existing tests pass (`npm test`)
- [ ] New code has corresponding tests
- [ ] Test coverage hasn't decreased
- [ ] Manual testing completed for UI changes

### Documentation
- [ ] Code comments added for complex logic
- [ ] JSDoc comments added for public functions
- [ ] README updated if needed
- [ ] CHANGELOG.md updated with changes

### Git
- [ ] Commit message follows conventional commit format
- [ ] Changes are in a feature/fix branch (not main)
- [ ] Only relevant files are staged
- [ ] No sensitive data (keys, tokens, passwords) in commit
- [ ] .env files not committed (only .env.example)

### Security
- [ ] No hardcoded credentials or API keys
- [ ] User input is validated and sanitized
- [ ] No eval() or dangerous code execution
- [ ] Dependencies are up to date

## Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Updating build tasks, package manager configs, etc.

### Examples

```
feat(game): add insurance betting option

Implement insurance betting when dealer shows ace.
Pays 2:1 on insurance wins.

Closes #45
```

```
fix(ui): correct card alignment in hand display

Cards were overlapping incorrectly on small screens.
Adjusted spacing and responsive breakpoints.
```

```
refactor(engine): simplify hand evaluation logic

Extract scoring calculation into separate function
for better testability and reusability.
```

## Quick Commands

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Final Check

Before pushing:
- [ ] Branch is up to date with main
- [ ] All commits have good messages
- [ ] CI/CD will pass (if applicable)
- [ ] Ready for code review
