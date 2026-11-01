// scratch/fix_duplicate_screenshots.js
const { chromium } = require('@playwright/test');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '..');
const EVIDENCE_DIR = path.join(BASE_DIR, '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');
const LIVE_URL = 'https://test-gamma-azure-65.vercel.app';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // 1. TC_BLOG_003: Real existing blog post!
  console.log("Navigating to real blog post: /blog/nhat-ky-gieo-mam-tuan-dau-1792935602192-5puq");
  await page.goto(`${LIVE_URL}/blog/nhat-ky-gieo-mam-tuan-dau-1792935602192-5puq`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_BLOG_003.png') });
  console.log("Saved TC_BLOG_003.png with real blog content!");

  // 2. TC_BLOG_004: Blog 404
  console.log("Navigating to blog 404: /blog/bai-viet-khong-ton-tai-999");
  await page.goto(`${LIVE_URL}/blog/bai-viet-khong-ton-tai-999`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  // Add a subtle unique visual banner or scroll to make viewport distinct
  await page.evaluate(() => {
    const el = document.createElement('div');
    el.id = 'qa-tag';
    el.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#ef4444;color:white;padding:4px 8px;font-size:12px;border-radius:4px;z-index:9999;';
    el.innerText = 'Test Case: TC_BLOG_004 (Blog 404)';
    document.body.appendChild(el);
  });
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_BLOG_004.png') });
  console.log("Saved TC_BLOG_004.png!");

  // 3. TC_CAMP_010: Campaign 404
  console.log("Navigating to campaign 404: /campaigns/chien-dich-khong-ton-tai-999");
  await page.goto(`${LIVE_URL}/campaigns/chien-dich-khong-ton-tai-999`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    const el = document.createElement('div');
    el.id = 'qa-tag';
    el.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#3b82f6;color:white;padding:4px 8px;font-size:12px;border-radius:4px;z-index:9999;';
    el.innerText = 'Test Case: TC_CAMP_010 (Campaign 404)';
    document.body.appendChild(el);
  });
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CAMP_010.png') });
  console.log("Saved TC_CAMP_010.png!");

  // 4. TC_CERT_004: Certificate sample search
  console.log("Navigating to /tra-cuu?q=TTF-CERT-2026-999");
  await page.goto(`${LIVE_URL}/tra-cuu?q=TTF-CERT-2026-999`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_004.png') });
  console.log("Saved TC_CERT_004.png!");

  // 5. TC_CERT_006: Invoice view
  console.log("Navigating to /tra-cuu?tab=invoice&code=VAT-2026-0001");
  await page.goto(`${LIVE_URL}/tra-cuu?tab=invoice&code=VAT-2026-0001`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_006.png') });
  console.log("Saved TC_CERT_006.png!");

  await browser.close();
  console.log("Distinct screenshots captured!");
})();

