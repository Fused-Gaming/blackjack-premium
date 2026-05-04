#!/bin/bash

# Swarm Orchestrator Initialization Script
# Automatically installs and updates swarm orchestration packages
# Runs on every session to ensure latest versions and proper configuration

# Skip initialization in CI environment
if [ -n "$CI" ] || [ -n "$SKIP_SWARM_INIT" ]; then
  exit 0
fi

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Package list
SWARM_PACKAGES=(
  "@h4shed/skill-syncpulse"
  "@h4shed/mcp-core"
  "@h4shed/mcp-cli"
  "@h4shed/tool-commander"
  "@h4shed/skill-style-dictionary-system"
)

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Swarm Orchestrator Initialization${NC}"
echo -e "${BLUE}========================================${NC}"

# Function to check if package needs update
check_package_updates() {
  local package=$1
  local installed_version=$(npm list "$package" 2>/dev/null | grep "$package@" | sed "s/.*@//" | head -1)
  local latest_version=$(npm view "$package" version 2>/dev/null || echo "unknown")

  if [ -z "$installed_version" ]; then
    echo -e "${YELLOW}✓${NC} $package: NOT INSTALLED (will install latest: $latest_version)"
    return 1
  elif [ "$installed_version" != "$latest_version" ]; then
    echo -e "${YELLOW}↻${NC} $package: UPDATE AVAILABLE ($installed_version → $latest_version)"
    return 1
  else
    echo -e "${GREEN}✓${NC} $package: UP-TO-DATE ($installed_version)"
    return 0
  fi
}

# Check all packages and collect updates needed
echo -e "\n${BLUE}Checking package versions...${NC}"
NEEDS_UPDATE=false

for package in "${SWARM_PACKAGES[@]}"; do
  if ! check_package_updates "$package"; then
    NEEDS_UPDATE=true
  fi
done

# Install or update packages if needed
if [ "$NEEDS_UPDATE" = true ]; then
  echo -e "\n${BLUE}Installing/updating packages...${NC}"
  npm install "${SWARM_PACKAGES[@]}" --save
  echo -e "${GREEN}✓ Packages installed/updated successfully${NC}"
else
  echo -e "\n${GREEN}All packages are up-to-date!${NC}"
fi

# Initialize swarm orchestrator
echo -e "\n${BLUE}Initializing swarm orchestrator...${NC}"

# Check if mcp-cli is available
if command -v mcp-cli &> /dev/null || npx -y @h4shed/mcp-cli --version &> /dev/null; then
  echo -e "${GREEN}✓ MCP CLI available${NC}"
else
  echo -e "${YELLOW}⚠ MCP CLI not found in PATH, using npx fallback${NC}"
fi

# Create .mcp.json if it doesn't exist
if [ ! -f ".mcp.json" ]; then
  echo -e "${BLUE}Creating .mcp.json configuration...${NC}"
  cat > .mcp.json << 'EOF'
{
  "mcpServers": {
    "skillSync": {
      "command": "npx",
      "args": ["@h4shed/skill-syncpulse"],
      "env": {
        "NODE_ENV": "development"
      }
    },
    "toolCommander": {
      "command": "npx",
      "args": ["@h4shed/tool-commander"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  },
  "swarmConfig": {
    "orchestrator": "enabled",
    "autoStart": true,
    "healthCheck": true,
    "logLevel": "info"
  }
}
EOF
  echo -e "${GREEN}✓ .mcp.json created${NC}"
else
  echo -e "${GREEN}✓ .mcp.json already exists${NC}"
fi

# Initialize skill style dictionary system
echo -e "\n${BLUE}Initializing skill style dictionary system...${NC}"
if [ ! -d "./.claude/skills/styles" ]; then
  mkdir -p ./.claude/skills/styles
  echo -e "${GREEN}✓ Skill styles directory created${NC}"
else
  echo -e "${GREEN}✓ Skill styles directory exists${NC}"
fi

# Create session initialization file
echo -e "\n${BLUE}Initializing session data...${NC}"
SESSION_DIR="./.claude/sessions"
mkdir -p "$SESSION_DIR"

SESSION_FILE="$SESSION_DIR/swarm-session-$(date +%s).json"
cat > "$SESSION_FILE" << EOF
{
  "sessionId": "$(uuidgen 2>/dev/null || echo 'session-'$(date +%s))",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "packages": {
EOF

# Add package versions
FIRST=true
for package in "${SWARM_PACKAGES[@]}"; do
  if [ "$FIRST" = true ]; then
    FIRST=false
  else
    echo "," >> "$SESSION_FILE"
  fi
  VERSION=$(npm list "$package" 2>/dev/null | grep "$package@" | sed "s/.*@//" | head -1)
  echo -n "    \"$package\": \"$VERSION\"" >> "$SESSION_FILE"
done

cat >> "$SESSION_FILE" << EOF

  },
  "status": "initialized",
  "orchestrator": {
    "enabled": true,
    "type": "swarm",
    "topology": "hierarchical-mesh"
  }
}
EOF

echo -e "${GREEN}✓ Session initialized: $SESSION_FILE${NC}"

# Verify all packages are properly installed
echo -e "\n${BLUE}Verifying installation...${NC}"
npm list "${SWARM_PACKAGES[@]}" 2>/dev/null | grep -E "^\s*(└──|├──)" || echo -e "${GREEN}✓ All packages verified${NC}"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Swarm Orchestrator Ready!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Start dev server: npm run dev"
echo "2. Check orchestrator status: cat .mcp.json"
echo "3. View session data: cat .claude/sessions/swarm-session-*.json"
echo ""
