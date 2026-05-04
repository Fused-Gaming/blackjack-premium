#!/bin/bash

# CI/CD optimized build script
# Skip postinstall scripts and unnecessary steps during Vercel deployment

set -e

echo "🔨 Building for CI/CD environment..."

# Skip swarm initialization during CI
export SKIP_SWARM_INIT=1

# Build with TypeScript check
echo "Running TypeScript check..."
pnpm exec tsc --noEmit

echo "Building Vite project..."
pnpm exec vite build

echo "✓ Build completed successfully"
