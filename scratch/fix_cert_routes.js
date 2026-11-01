// scratch/fix_cert_routes.js
const { chromium } = require('@playwright/test');
const path = require('path');

const EVIDENCE_DIR = path.join(__dirname, '..', '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');
const LIVE_URL = 'https://test-gamma-azure-65.vercel.app';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. TC_CERT_001: /lookup (Trang tra cứu)
  console.log("Navigating to /lookup");
  await page.goto(`${LIVE_URL}/lookup`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_001.png') });
  console.log("Saved TC_CERT_001.png at /lookup");

  // 2. TC_CERT_004: /chung-tu/CT-2026-001
  console.log("Navigating to /chung-tu/CT-2026-001");
  await page.goto(`${LIVE_URL}/chung-tu/CT-2026-001`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_004.png') });
  console.log("Saved TC_CERT_004.png at /chung-tu/CT-2026-001");

  // 3. TC_CERT_006: /hoa-don/HD-2026-001
  console.log("Navigating to /hoa-don/HD-2026-001");
  await page.goto(`${LIVE_URL}/hoa-don/HD-2026-001`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_006.png') });
  console.log("Saved TC_CERT_006.png at /hoa-don/HD-2026-001");

  // 4. TC_CERT_008: /so (Sổ cái)
  console.log("Navigating to /so");
  await page.goto(`${LIVE_URL}/so`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_008.png') });
  console.log("Saved TC_CERT_008.png at /so");

  await browser.close();
  console.log("Done updating CERT screenshots!");
})();

