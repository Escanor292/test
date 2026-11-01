// scratch/test_login_roles.js
const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const acc of [
    { email: 'test1@gmail.com', pass: '123', role: 'BACKER' },
    { email: 'test2@gmail.com', pass: '123', role: 'CREATOR' }
  ]) {
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      console.log(`Trying login for ${acc.email} (${acc.role})...`);
      await page.goto('https://test-gamma-azure-65.vercel.app/auth/login', { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.fill('input[name="email"], input[type="email"]', acc.email);
      await page.fill('input[name="password"], input[type="password"]', acc.pass);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(4000);
      console.log(`URL after login: ${page.url()}`);
      const cookies = await context.cookies();
      const sessionCookie = cookies.find(c => c.name.includes('session-token'));
      console.log(`Session cookie found: ${!!sessionCookie}`);
    } catch (e) {
      console.error(`Login error for ${acc.email}:`, e.message);
    }
  }

  await browser.close();
})();

