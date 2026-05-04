#!/bin/bash

# Pre-deployment validation script
# Runs fast checks before full Vercel deployment
# Exit on first error to fail fast

set -e

echo "🚀 Pre-deployment Validation Starting..."
start_time=$(date +%s)

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track failures
FAILED=0

# 1. Check Node/pnpm availability (10ms)
echo -e "${YELLOW}[1/6]${NC} Checking dependencies..."
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}✗ pnpm not found${NC}"
    FAILED=1
else
    echo -e "${GREEN}✓ pnpm available${NC}"
fi

# 2. TypeScript compilation check (2-3s)
echo -e "${YELLOW}[2/6]${NC} Checking TypeScript..."
if ! pnpm exec tsc --noEmit 2>/dev/null; then
    echo -e "${RED}✗ TypeScript compilation failed${NC}"
    FAILED=1
else
    echo -e "${GREEN}✓ TypeScript check passed${NC}"
fi

# 3. Run test suite (10-15s) - fast unit tests only
echo -e "${YELLOW}[3/6]${NC} Running unit tests..."
if ! pnpm test:unit 2>/dev/null; then
    echo -e "${RED}✗ Unit tests failed${NC}"
    FAILED=1
else
    echo -e "${GREEN}✓ All tests passed${NC}"
fi

# 4. Lint check (1-2s)
echo -e "${YELLOW}[4/6]${NC} Checking lint rules..."
if ! pnpm lint 2>/dev/null; then
    echo -e "${YELLOW}⚠ Lint warnings found (non-blocking)${NC}"
else
    echo -e "${GREEN}✓ Lint check passed${NC}"
fi

# 5. Build validation (3-5s)
echo -e "${YELLOW}[5/6]${NC} Building project..."
if ! pnpm build 2>/dev/null; then
    echo -e "${RED}✗ Build failed${NC}"
    FAILED=1
else
    echo -e "${GREEN}✓ Build successful${NC}"

    # Check that dist directory exists and has content
    if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
        echo -e "${RED}✗ Build output is empty${NC}"
        FAILED=1
    else
        dist_size=$(du -sh dist | cut -f1)
        echo -e "${GREEN}✓ Build output: ${dist_size}${NC}"
    fi
fi

# 6. Environment validation (100ms)
echo -e "${YELLOW}[6/6]${NC} Checking environment..."
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}✗ vercel.json not found${NC}"
    FAILED=1
else
    echo -e "${GREEN}✓ vercel.json exists${NC}"
fi

# Summary
end_time=$(date +%s)
duration=$((end_time - start_time))

echo ""
echo "========================================="
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Pre-deployment validation PASSED${NC}"
    echo "Duration: ${duration}s"
    echo "========================================="
    exit 0
else
    echo -e "${RED}✗ Pre-deployment validation FAILED${NC}"
    echo "Duration: ${duration}s"
    echo "========================================="
    exit 1
fi
