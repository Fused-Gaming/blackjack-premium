# Label System Documentation

This repository uses an automated label system to categorize issues, pull requests, and commits for the master project board.

## Label Source

**Labels are synced from the Fused Gaming parent organization** and are shared across all organization repositories for consistency. The organization manages label definitions centrally.

## Automatic Label Attribution

The Auto-Label workflow automatically applies appropriate labels based on:
- Issue/PR title and body content analysis
- File changes in pull requests
- PR size calculation (number of changes)
- Commit patterns

## Commonly Used Labels

### Priority Labels (Organization Standard)
- `🚨Priority:CRITICAL` - P0 - Critical priority, must be addressed immediately
- `🔴Priority:HIGH` - P1 - High priority, should complete this quarter
- `🟠Priority:MEDIUM` - P2 - Medium priority, complete when possible
- `🟢Priority:LOW` - P3 - Low priority, complete when resources available
- `ℹ️Priority:INFO` - P4 - Informational, low priority

### Type Labels
- `bug` - Something isn't working
- `✨FEATURE` - New feature development
- `documentation` - Improvements or additions to documentation
- `♻️REFACTOR` - Code refactoring
- `🧪TESTING` - Testing-related
- `🔥HOTFIX` - Urgent production fix
- `💥BREAKING-CHANGE` - Breaking changes

### Component Labels (Blackjack-specific)
- `component:ui` - UI components and styling
- `component:engine` - Game engine and logic
- `component:animation` - Animations and transitions
- `component:state` - State management
- `component:build` - Build system and configuration

### Team Labels
- `front-end` - Front end and design team
- `back-end` - Back end storage team
- `devops` - DevOps engineering
- `💉DEVOPS` - DevOps team

### Status Labels (Organization Standard)
- `🎯IN-PROGRESS` - Currently being worked on
- `👀NEEDS-REVIEW` - Requires stakeholder review
- `🐌BLOCKED` - Blocked by dependencies or issues
- `⏳WAITING` - Waiting on external response
- `✅COMPLETED` - Work completed
- `🗺️PLANNED` - Planned for future implementation

### Area Labels
- `🔒SECURITY` - Security-related issues/changes
- `📈IMPROVEMENT` - Performance/quality improvement
- `area:accessibility` - Accessibility improvements
- `🎨DESIGN` - Design team
- `🔐COMPLIANCE` - Regulatory compliance matters
- `🛡️AUDIT` - Needs security/compliance audit

### Size Labels (PRs only)
- `size: XS` - Extra small - less than 1 day (< 10 changes)
- `size: S` - Small - 1-3 days (10-49 changes)
- `size: M` - Medium - 1 week (50-199 changes)
- `size: L` - Large - 2-4 weeks (200-499 changes)
- `size: XL` - Extra large - 1+ months (500+ changes)

### Game-specific Labels
- `game:cards` - Card and deck related
- `game:betting` - Betting system
- `game:dealer` - Dealer logic
- `game:actions` - Player actions (hit, stand, split, etc.)

### Special Labels
- `dependencies` - Pull requests that update a dependency
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested
- `duplicate` - This issue or PR already exists
- `wontfix` - This will not be worked on
- `invalid` - This doesn't seem right

## Workflows

### Auto-Label Workflow
**File**: `.github/workflows/auto-label.yml`

**Triggers:**
- Issue opened, edited, or reopened
- PR opened, edited, reopened, or synchronized
- Manual dispatch

**What it does:**
1. Analyzes title and body content for keywords
2. Detects priority, type, components, and areas
3. For PRs: Analyzes changed files to detect components
4. For PRs: Calculates size based on total changes
5. Applies all detected labels automatically

## Usage Tips

### For Issue Creation
Include keywords in your issue title or description to trigger automatic labels:

**Priority Detection:**
- "critical", "urgent" → `🚨Priority:CRITICAL`
- "high priority" → `🔴Priority:HIGH`
- "low priority" → `🟢Priority:LOW`
- (default) → `🟠Priority:MEDIUM`

**Type Detection:**
- "bug", "fix", "error" → `bug`
- "feature", "add", "feat" → `✨FEATURE`
- "docs", "documentation" → `documentation`
- "refactor", "cleanup" → `♻️REFACTOR`
- "test", "testing" → `🧪TESTING`
- "hotfix", "urgent fix" → `🔥HOTFIX`
- "breaking" → `💥BREAKING-CHANGE`

**Component Detection:**
- "ui", "component" → `component:ui`
- "engine", "game logic" → `component:engine`
- "animation" → `component:animation`
- "state", "store", "zustand" → `component:state`
- "build", "vite", "config" → `component:build`

**Area Detection:**
- "security", "vulnerability" → `🔒SECURITY`
- "performance", "optimize" → `📈IMPROVEMENT`
- "accessibility", "a11y" → `area:accessibility`
- "design" → `🎨DESIGN`
- "compliance", "regulatory" → `🔐COMPLIANCE`
- "audit" → `🛡️AUDIT`

**Game-specific:**
- "card", "deck" → `game:cards`
- "bet", "chip", "betting" → `game:betting`
- "dealer" → `game:dealer`
- "split", "double", "double down" → `game:actions`

**Example:**
```
Title: [Bug] Critical performance issue in card animation
Body: The card dealing animation is causing performance degradation...
```

This would automatically receive:
- `🚨Priority:CRITICAL`
- `bug`
- `component:animation`
- `📈IMPROVEMENT`
- `game:cards`

### For Pull Requests
- Labels are applied based on both content AND file changes
- PR size is automatically calculated based on total line changes
- Draft PRs automatically get `🎯IN-PROGRESS`
- Non-draft PRs get `👀NEEDS-REVIEW`
- File path detection:
  - `src/components/` → `component:ui` + `front-end`
  - `src/engine/` → `component:engine`
  - `src/store/` → `component:state`
  - `tests/`, `*.test.*`, `*.spec.*` → `🧪TESTING`
  - `docs/`, `*.md` → `documentation`
  - `package.json`, `*lock*` → `dependencies`
  - `.github/workflows/` → `component:build` + `devops` + `💉DEVOPS`

### Manual Label Management
You can always manually add or remove labels as needed. The automatic system will not remove manually added labels.

## Project Board Integration

These labels are designed to work seamlessly with the Fused Gaming organization project boards:

- **Priority labels** help with task ordering and urgency
- **Type labels** categorize work types
- **Component labels** group related work
- **Team labels** route to appropriate teams
- **Status labels** track progress
- **Size labels** aid in sprint planning and capacity

## Maintenance

Labels are managed at the **organization level** by Fused Gaming administrators.

If you need new labels or modifications to existing labels, contact the organization administrators.

## Contributing

When creating issues or PRs, help the automation by:
1. Using descriptive titles with relevant keywords
2. Including priority indicators in title/description when applicable
3. Mentioning specific components affected
4. Adding context about breaking changes, security, or performance impacts
5. Using clear language that matches the detection patterns above

The auto-label system will handle the rest!
