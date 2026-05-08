export const DESIGN_KIT_VERSION = '2.1';

export const BUILD_INFO = {
  version: '2.1',
  commit: import.meta.env.VITE_COMMIT_SHA || 'local-dev',
  timestamp: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
  branch: import.meta.env.VITE_BRANCH || 'main',
};

export const DESIGN_KIT_FEATURES = {
  '2.1': 'Multiplayer Table Layouts (1-5 Players) + Game Tables Preview + Open Graph Standards',
  '2.0': 'Fairness Receipt & Proof-of-Play Sales Pitch',
  '1.2': 'Notifications & Outcome Indicators',
  '1.1': 'Animations & State Machine',
};
