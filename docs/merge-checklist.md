# Merge/Pull Request Checklist

Use this checklist when creating or reviewing pull requests.

## PR Creation Checklist

### Branch & Commits
- [ ] Branch name is descriptive (e.g., `feature/insurance-betting`, `fix/card-overlap`)
- [ ] Branch is up to date with main/develop
- [ ] All commits have clear, conventional commit messages
- [ ] No merge commits (rebase if needed)
- [ ] Commit history is clean and logical

### Code Quality
- [ ] Code follows project style guidelines
- [ ] TypeScript strict mode compliance
- [ ] No linting errors or warnings
- [ ] Code is properly formatted
- [ ] No unnecessary console logs or debug code
- [ ] No commented-out code
- [ ] Functions are small and focused
- [ ] DRY principle followed (no unnecessary duplication)

### Testing
- [ ] All tests pass locally
- [ ] New features have unit tests
- [ ] UI changes have component tests
- [ ] Test coverage maintained or improved
- [ ] Edge cases are tested
- [ ] Manual testing completed
- [ ] No breaking changes (or documented if necessary)

### Documentation
- [ ] Code comments added where needed
- [ ] README updated if necessary
- [ ] CHANGELOG.md updated with changes
- [ ] API changes documented
- [ ] New components have JSDoc comments

### Security & Performance
- [ ] No security vulnerabilities introduced
- [ ] No sensitive data in code or commits
- [ ] No performance regressions
- [ ] Dependencies are necessary and up to date
- [ ] No eval() or dangerous code patterns

### PR Description
- [ ] Clear title summarizing the change
- [ ] Description explains what and why
- [ ] Screenshots/GIFs for UI changes
- [ ] Breaking changes highlighted
- [ ] Related issues linked
- [ ] Testing instructions provided

## PR Review Checklist

### Functionality
- [ ] PR accomplishes stated goal
- [ ] Code works as expected
- [ ] No unintended side effects
- [ ] Edge cases handled properly
- [ ] Error states handled gracefully

### Code Review
- [ ] Code is readable and maintainable
- [ ] Architecture and patterns are sound
- [ ] No code smells or anti-patterns
- [ ] TypeScript types are proper
- [ ] Logic is correct and efficient
- [ ] No unnecessary complexity

### Testing Review
- [ ] Tests are comprehensive
- [ ] Tests are meaningful (not just for coverage)
- [ ] Test names are descriptive
- [ ] Mocks are appropriate
- [ ] Tests would catch regressions

### Security Review
- [ ] No SQL injection risks
- [ ] No XSS vulnerabilities
- [ ] Input validation present
- [ ] No exposed secrets or tokens
- [ ] Dependencies are safe

## Merge Requirements

Before merging, ensure:
- [ ] At least one approval (if team project)
- [ ] All CI/CD checks pass
- [ ] No merge conflicts
- [ ] Branch is up to date with target
- [ ] Documentation is complete
- [ ] Changelog is updated

## Post-Merge Actions

After merging:
- [ ] Delete feature branch
- [ ] Close related issues
- [ ] Update project board
- [ ] Notify stakeholders if needed
- [ ] Monitor for issues in production

## PR Template

Use this template for PR descriptions:

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Done
- Test scenario 1
- Test scenario 2
- Browser testing (Chrome, Firefox, Safari)

## Screenshots (if applicable)
Add screenshots or GIFs here

## Related Issues
Closes #123
Related to #456

## Checklist
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## Common Review Comments

### Code Style
- "Consider extracting this into a separate function"
- "This variable name could be more descriptive"
- "Add a comment explaining why this logic is needed"

### Logic
- "What happens if this value is null/undefined?"
- "This could be simplified using..."
- "Consider the edge case where..."

### Testing
- "Please add a test for this scenario"
- "This test could be more specific"
- "Consider testing the error case"

### Performance
- "This could cause a performance issue with large datasets"
- "Consider memoizing this calculation"
- "This re-renders unnecessarily"
