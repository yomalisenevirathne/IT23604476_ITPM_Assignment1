const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,           // එක වින්ඩෝ එකක් පමණි
  fullyParallel: false,
  timeout: 600000,      // මුළු ටෙස්ට් එකටම කාලය වැඩි කළා (ස්ලෝ නිසා)
  use: {
    headless: false,    // බ්‍රවුසරය ඕපන් වී පෙනේ
    viewport: { width: 1280, height: 720 },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});