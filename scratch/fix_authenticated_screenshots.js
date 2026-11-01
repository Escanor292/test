// scratch/fix_authenticated_screenshots.js
const { chromium } = require('@playwright/test');
const path = require('path');

const EVIDENCE_DIR = path.join(__dirname, '..', '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');
const LIVE_URL = 'https://test-gamma-azure-65.vercel.app';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Log in as Admin first
  console.log("Logging in as Admin...");
  await page.goto(`${LIVE_URL}/auth/login`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.fill('input[name="email"], input[type="email"]', 'admin@crowdfunding.vn');
  await page.fill('input[name="password"], input[type="password"]', 'Admin@123456');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);
  console.log("Logged in! URL:", page.url());

  // 1. TC_SO: /so (Sổ cái - Authenticated)
  console.log("Visiting /so with Admin session...");
  await page.goto(`${LIVE_URL}/so`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_008.png') });
  console.log("Saved TC_CERT_008.png (Authenticated Ledger Table)!");

  // 2. TC_COMM_001: /gop-y (Góp ý - Authenticated)
  console.log("Visiting /gop-y with Admin session...");
  await page.goto(`${LIVE_URL}/gop-y`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_COMM_001.png') });
  console.log("Saved TC_COMM_001.png (Authenticated Feedback Form)!");

  // 3. TC_CERT_004: /lookup?q=CERTIFICATE_LOOKUP_FORM
  console.log("Visiting /lookup with Certificate Query...");
  await page.goto(`${LIVE_URL}/lookup`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  const inputSearch = await page.$('input');
  if (inputSearch) {
    await inputSearch.fill('CT-2026-CHUNG-NHAN-001');
  }
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_004.png') });
  console.log("Saved TC_CERT_004.png (Certificate Lookup Query)!");

  // 4. TC_CERT_006: /lookup?tab=invoice
  console.log("Visiting /lookup with Invoice Query...");
  await page.goto(`${LIVE_URL}/lookup`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  const inputSearch2 = await page.$('input');
  if (inputSearch2) {
    await inputSearch2.fill('HD-2026-HOA-DON-VAT-001');
  }
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_006.png') });
  console.log("Saved TC_CERT_006.png (Invoice Lookup Query)!");

  await browser.close();
  console.log("All screenshots regenerated with distinct content!");
})();

