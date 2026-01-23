# Branching Strategy & Workflow

This document outlines the branching strategy and workflow for the blackjack-premium repository.

## Protected Branches

The following branches are protected and have special rules:

### `master`
- **Purpose**: Production-ready code
- **Protection**: Direct commits are **FORBIDDEN**
- **Updates**: Only through PRs from `development` or `hotfix/*` branches
- **Triggers**: Production deployments, releases

### `development`
- **Purpose**: Integration branch for features
- **Protection**: Direct commits are **FORBIDDEN**
- **Updates**: Only through PRs from feature branches
- **Triggers**: Development/staging deployments

## Branch Types

### Feature Branches
- **Naming**: `feature/descriptive-name`
- **Source**: Always branch from `development`
- **Target**: Merge back to `development`
- **Purpose**: New features, enhancements
- **Examples**:
  - `feature/add-card-animation`
  - `feature/implement-split-logic`
  - `feature/betting-ui-component`

### Fix Branches
- **Naming**: `fix/descriptive-name`
- **Source**: Branch from `development`
- **Target**: Merge back to `development`
- **Purpose**: Bug fixes, non-critical issues
- **Examples**:
  - `fix/dealer-logic-bug`
  - `fix/card-flip-animation`
  - `fix/betting-calculation-error`

### Hotfix Branches
- **Naming**: `hotfix/descriptive-name`
- **Source**: Branch from `master` (for critical production fixes)
- **Target**: Merge to both `master` AND `development`
- **Purpose**: Critical production bugs requiring immediate fix
- **Examples**:
  - `hotfix/security-vulnerability`
  - `hotfix/game-breaking-bug`
  - `hotfix/payment-processing-error`

### Other Branch Types
- `docs/descriptive-name` - Documentation updates
- `refactor/descriptive-name` - Code refactoring
- `test/descriptive-name` - Test additions/updates
- `chore/descriptive-name` - Maintenance tasks

## Workflow

### Starting a New Feature

```bash
# 1. Switch to development branch
git checkout development

# 2. Update development with remote
git pull origin development

# 3. Create your feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes
# ... edit files ...

# 5. Commit your changes
git add .
git commit -m "Add your feature description

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 6. Push to remote
git push -u origin feature/your-feature-name

# 7. Create PR on GitHub: feature/your-feature-name → development
```

### Working on a Fix

```bash
# Same process as feature, but use fix/ prefix
git checkout development
git pull origin development
git checkout -b fix/bug-description
# ... make changes ...
git push -u origin fix/bug-description
# Create PR: fix/bug-description → development
```

### Hotfix (Critical Production Fix)

```bash
# 1. Branch from master
git checkout master
git pull origin master
git checkout -b hotfix/critical-issue

# 2. Make fix
# ... edit files ...

# 3. Push and create PR to master
git push -u origin hotfix/critical-issue
# Create PR: hotfix/critical-issue → master

# 4. After merging to master, also merge to development
# Create PR: hotfix/critical-issue → development
```

### Merging to Master (Release)

```bash
# Development has been tested and is ready for production
# Create PR: development → master
# After approval and merge, master will deploy to production
```

## Automated Checks

The repository has automated workflows that enforce these rules:

### Branch Protection Check
**Workflow**: `.github/workflows/branch-protection-check.yml`

**What it does:**
- ✅ Warns about direct commits to protected branches
- ✅ Validates PR source branch naming conventions
- ✅ Ensures PRs to master come from development or hotfix branches
- ✅ Ensures PRs to development come from properly named feature branches
- ✅ Posts helpful comments on PRs that don't follow conventions

**When it runs:**
- On every push to `master` or `development`
- On every PR to `master` or `development`

### Auto-Label Workflow
**Workflow**: `.github/workflows/auto-label.yml`

Automatically labels issues and PRs based on content and file changes.

### CodeQL Workflow
**Workflow**: `.github/workflows/codeql.yml`

Runs security and code quality analysis.

## Best Practices

### ✅ DO

1. **Always branch from development** for new features/fixes
2. **Always update development** before creating a new branch
   ```bash
   git checkout development
   git pull origin development
   ```
3. **Use descriptive branch names** with proper prefixes
4. **Keep branches focused** - one feature/fix per branch
5. **Create small, reviewable PRs** when possible
6. **Write clear commit messages** explaining the "why"
7. **Test locally** before pushing
8. **Request reviews** from appropriate team members

### ❌ DON'T

1. **Never commit directly to `master`** - always use PRs
2. **Never commit directly to `development`** - always use PRs
3. **Don't create feature branches from `master`** - use `development`
4. **Don't merge without review** (unless it's your own tested hotfix)
5. **Don't force push** to shared branches
6. **Don't leave branches stale** - merge or close them
7. **Don't include unrelated changes** in a single PR

## Branch Lifecycle

```
development (always exists)
    ↓
feature/add-betting-ui (created)
    ↓
(make changes, commit, push)
    ↓
PR: feature/add-betting-ui → development
    ↓
(code review, tests pass)
    ↓
Merge to development
    ↓
feature/add-betting-ui (delete after merge)


development (ready for release)
    ↓
PR: development → master
    ↓
(final review, all tests pass)
    ↓
Merge to master
    ↓
Production deployment
```

## Emergency Workflow (Hotfix)

When production is broken and needs immediate fix:

```
master (production is broken!)
    ↓
hotfix/fix-critical-bug (branch from master)
    ↓
(make minimal fix, test thoroughly)
    ↓
PR: hotfix/fix-critical-bug → master (URGENT)
    ↓
Merge to master (production fixed!)
    ↓
PR: hotfix/fix-critical-bug → development
    ↓
Merge to development (keep branches in sync)
    ↓
Delete hotfix branch
```

## Common Scenarios

### Scenario 1: Forgot to Branch from Development
```bash
# If you committed to development directly
git checkout -b feature/my-feature  # Create proper branch
git push -u origin feature/my-feature  # Push it
git checkout development  # Go back to development
git reset --hard origin/development  # Reset to remote state
# Now create PR from feature/my-feature
```

### Scenario 2: Need to Update Feature Branch with Latest Development
```bash
git checkout feature/my-feature
git fetch origin
git merge origin/development
# Resolve any conflicts
git push
```

### Scenario 3: Branch Name Typo
```bash
# Rename local and remote branch
git branch -m old-name new-name  # Rename locally
git push origin -u new-name  # Push new name
git push origin --delete old-name  # Delete old name from remote
```

## Questions?

If you're unsure about the branching workflow:
1. Check this document first
2. Ask in the team chat
3. When in doubt, create a feature branch from development

Remember: **The branch protection checks are here to help, not to block you!** They'll guide you toward best practices.
