# Contributing to Blackjack Game

Thank you for your interest in contributing to this project!

## Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass (`npm test`)
6. Commit your changes using conventional commits
7. Push to your fork
8. Open a Pull Request

## Commit Message Format

We use conventional commits:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example:**
```
feat(game): add insurance bet option

Add insurance betting when dealer shows ace.
Implements standard 2:1 payout for insurance wins.

Closes #123
```

## Code Standards

- Use TypeScript strict mode
- Follow existing code style
- Write self-documenting code with clear names
- Add comments only for complex logic
- Keep functions small and focused
- Write tests for new features

## Testing

- Run `npm test` before committing
- Add unit tests for game logic
- Add component tests for UI changes
- Ensure code coverage doesn't decrease

## Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New code has test coverage
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventional format
- [ ] No console logs or debug code
- [ ] Branch is up to date with main

## Questions?

Open an issue for discussion before starting major changes.
