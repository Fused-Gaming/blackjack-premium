#!/usr/bin/env node

/**
 * Swarm Orchestrator Session Initialization Hook
 * Runs automatically on every session start to ensure packages are up-to-date
 * and orchestrator is properly initialized
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const SCRIPT_PATH = path.join(PROJECT_DIR, 'scripts', 'init-swarm.sh');

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    warn: '\x1b[33m',
    error: '\x1b[31m',
    reset: '\x1b[0m',
  };

  const prefix = type === 'info' ? '[i]' : type === 'success' ? '[✓]' : type === 'warn' ? '[!]' : '[✗]';
  console.log(`${colors[type]}${prefix} ${message}${colors.reset}`);
}

async function initSwarmSession() {
  try {
    log('Initializing swarm orchestrator for session...', 'info');

    // Check if the init script exists
    if (!fs.existsSync(SCRIPT_PATH)) {
      log(`Swarm init script not found at ${SCRIPT_PATH}`, 'warn');
      return;
    }

    // Run the initialization script
    try {
      const output = execSync(`bash ${SCRIPT_PATH} 2>&1`, {
        cwd: PROJECT_DIR,
        stdio: 'inherit',
        timeout: 60000, // 60 second timeout
      });

      log('Swarm orchestrator initialization complete', 'success');
    } catch (error) {
      if (error.killed) {
        log('Swarm initialization timed out after 60 seconds', 'warn');
      } else if (error.status !== 0) {
        log(`Swarm initialization exited with code ${error.status}`, 'warn');
      }
      // Don't fail the hook, just warn
    }
  } catch (error) {
    log(`Session initialization error: ${error.message}`, 'error');
    // Non-fatal error - session continues
  }
}

// Run the initialization
if (require.main === module) {
  initSwarmSession().catch((error) => {
    console.error('Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = { initSwarmSession };
