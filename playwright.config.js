const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,           // 1 window
  fullyParallel: false,
  timeout: 600000,      // time 
  use: {
    headless: false,    // open the browser
    viewport: { width: 1280, height: 720 },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});