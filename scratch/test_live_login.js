// scratch/test_live_login.js
const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("Navigating to login page with domcontentloaded...");
    await page.goto('https://test-gamma-azure-65.vercel.app/auth/login', { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log("Page title:", await page.title());
    console.log("URL:", page.url());

    // Wait for form to appear
    await page.waitForSelector('input[name="email"], input[type="email"]', { timeout: 10000 });
    await page.screenshot({ path: 'scratch/login_page.png' });
    console.log("Saved scratch/login_page.png");

    const emailInput = await page.$('input[name="email"], input[type="email"]');
    const passInput = await page.$('input[name="password"], input[type="password"]');
    const submitBtn = await page.$('button[type="submit"]');

    if (emailInput && passInput && submitBtn) {
      await emailInput.fill('admin@crowdfunding.vn');
      await passInput.fill('Admin@123456');
      await page.screenshot({ path: 'scratch/login_filled.png' });
      console.log("Filled login credentials, clicking submit...");
      await submitBtn.click();
      await page.waitForTimeout(3000);
      console.log("URL after submit:", page.url());
      await page.screenshot({ path: 'scratch/after_login.png' });

      const cookies = await context.cookies();
      console.log("Session cookies:", cookies.map(c => ({ name: c.name, value: c.value.slice(0, 15) + '...' })));
    }
  } catch (err) {
    console.error("Test error:", err.message);
  } finally {
    await browser.close();
  }
})();
