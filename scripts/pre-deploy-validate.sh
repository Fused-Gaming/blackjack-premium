#!/bin/bash

# Pre-deployment validation script
# Runs fast checks before full Vercel deployment

echo "🚀 Pre-deployment Validation Starting..."
start_time=$(date +%s)

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track failures
FAILED=0

# 1. Check Node/pnpm availability
echo -e "${YELLOW}[1/5]${NC} Checking dependencies..."
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}✗ pnpm not found${NC}"
    exit 1
else
    echo -e "${GREEN}✓ pnpm available${NC}"
fi

# 2. TypeScript compilation check
echo -e "${YELLOW}[2/5]${NC} Checking TypeScript..."
if ! pnpm exec tsc --noEmit; then
    echo -e "${RED}✗ TypeScript compilation failed${NC}"
    exit 1
else
    echo -e "${GREEN}✓ TypeScript check passed${NC}"
fi

# 3. Run test suite
echo -e "${YELLOW}[3/5]${NC} Running unit tests..."
if ! pnpm test:unit; then
    echo -e "${RED}✗ Unit tests failed${NC}"
    exit 1
else
    echo -e "${GREEN}✓ All tests passed${NC}"
fi

# 4. Lint check (non-blocking)
echo -e "${YELLOW}[4/5]${NC} Checking lint rules..."
if pnpm lint > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Lint check passed${NC}"
else
    echo -e "${YELLOW}⚠ Lint warnings found (non-blocking)${NC}"
fi

# 5. Build validation
echo -e "${YELLOW}[5/5]${NC} Building project..."
if ! pnpm build; then
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Build successful${NC}"
    if [ -d "dist" ] && [ -n "$(ls -A dist)" ]; then
        dist_size=$(du -sh dist | cut -f1)
        echo -e "${GREEN}✓ Build output: ${dist_size}${NC}"
    else
        echo -e "${RED}✗ Build output is empty${NC}"
        exit 1
    fi
fi

# Summary
end_time=$(date +%s)
duration=$((end_time - start_time))

echo ""
echo "========================================="
echo -e "${GREEN}✓ Pre-deployment validation PASSED${NC}"
echo "Duration: ${duration}s"
echo "========================================="
exit 0
