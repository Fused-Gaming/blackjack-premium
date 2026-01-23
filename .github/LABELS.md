# Label System Documentation

This repository uses an automated label system to categorize issues and pull requests for the master project board.

## Automatic Label Attribution

Labels are automatically applied based on:
- Issue/PR title and body content
- File changes in pull requests
- PR size (number of changes)

## Label Categories

### Priority Labels
- `priority:critical` - Critical priority - immediate attention required
- `priority:high` - High priority - should be addressed soon
- `priority:medium` - Medium priority - normal queue
- `priority:low` - Low priority - can be deferred

### Type Labels
- `type:bug` - Something is not working
- `type:feature` - New feature or request
- `type:documentation` - Documentation improvements
- `type:refactor` - Code refactoring
- `type:testing` - Testing related
- `type:chore` - Maintenance and chores

### Component Labels
- `component:ui` - UI components and styling
- `component:engine` - Game engine and logic
- `component:animation` - Animations and transitions
- `component:state` - State management
- `component:build` - Build system and configuration

### Status Labels
- `status:wip` - Work in progress
- `status:ready-for-review` - Ready for review
- `status:blocked` - Blocked by dependencies
- `status:on-hold` - On hold

### Area Labels
- `area:security` - Security related
- `area:performance` - Performance improvements
- `area:accessibility` - Accessibility improvements
- `area:dx` - Developer experience

### Difficulty Labels
- `difficulty:beginner` - Good for newcomers
- `difficulty:intermediate` - Requires some experience
- `difficulty:advanced` - Requires significant expertise

### Size Labels (PRs only)
- `size:xs` - Extra small PR (< 10 changes)
- `size:s` - Small PR (10-49 changes)
- `size:m` - Medium PR (50-199 changes)
- `size:l` - Large PR (200-499 changes)
- `size:xl` - Extra large PR (500+ changes)

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
- `invalid` - This does not seem right

## Workflows

### Auto-Label Workflow
**File**: `.github/workflows/auto-label.yml`

Triggers on:
- Issue opened, edited, or reopened
- PR opened, edited, reopened, or synchronized
- Manual dispatch

This workflow automatically applies labels based on:
1. Content analysis of title and body
2. File changes (PRs only)
3. PR size calculation

### Label Sync Workflow
**File**: `.github/workflows/sync-labels.yml`

Triggers on:
- Manual dispatch
- Weekly schedule (Sundays at 00:00 UTC)

This workflow ensures all labels are consistent with the master configuration.

## Usage Tips

### For Issue Creation
Include keywords in your issue title or description to trigger automatic labels:

- **Priority**: "critical", "urgent", "high priority", "low priority"
- **Type**: "bug", "fix", "feature", "add", "docs", "refactor", "test"
- **Components**: "ui", "component", "engine", "game logic", "animation", "state"
- **Areas**: "security", "performance", "accessibility", "a11y"

Example:
```
Title: [Bug] Critical performance issue in card animation
Body: The card dealing animation is causing performance degradation...
```

This would automatically receive:
- `priority:critical`
- `type:bug`
- `component:animation`
- `area:performance`
- `game:cards`

### For Pull Requests
- Labels are applied based on both content and file changes
- PR size is automatically calculated
- Draft PRs automatically get `status:wip`
- Non-draft PRs get `status:ready-for-review`

### Manual Label Management
You can always manually add or remove labels as needed. The automatic system will not remove manually added labels.

## Project Board Integration

These labels are designed to work seamlessly with the master project board:

- **Priority labels** help with task ordering
- **Type labels** categorize work types
- **Component labels** group related work
- **Status labels** track progress
- **Size labels** aid in sprint planning

## Maintenance

The label sync workflow runs weekly to ensure consistency. You can also trigger it manually:

1. Go to Actions tab
2. Select "Sync Labels Across Organization"
3. Click "Run workflow"

## Contributing

When creating issues or PRs, help the automation by:
1. Using descriptive titles with relevant keywords
2. Providing detailed descriptions
3. Mentioning specific components affected
4. Indicating priority when applicable
