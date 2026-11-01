import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LIVE = 'https://test-gamma-azure-65.vercel.app';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE = path.join(ROOT, '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');
process.env.PLAYWRIGHT_BROWSERS_PATH = '/opt/pw-browsers';

const playwright = await import('/tmp/pw/node_modules/playwright/index.js');
const browser = await playwright.default.chromium.launch({ headless: true });
const notes = [];

async function shot(page, file, locator) {
  const target = locator ? page.locator(locator).first() : page;
  if (locator) await target.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(400);
  if (locator) await target.screenshot({ path: path.join(EVIDENCE, file) });
  else await page.screenshot({ path: path.join(EVIDENCE, file), fullPage: false });
}

try {
  const guest = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await guest.newPage();

  await page.goto(LIVE + '/blog/editor', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2500);
  const blogUrl = page.url();
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_BLOG_005.png') });
  notes.push({ tid: 'TC_BLOG_005', url: blogUrl, text: (await page.locator('body').innerText()).slice(0, 180) });

  await page.goto(LIVE + '/campaigns/sach-giao-duc-vung-cao', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2000);
  const support = page.getByRole('button', { name: /ủng hộ ngay/i }).first();
  if (await support.count()) await support.click();
  await page.waitForTimeout(1200);
  const rewardText = await page.locator('body').innerText();
  const hasBook = /Gói Sách Giấy/.test(rewardText);
  if (hasBook) {
    const card = page.getByText('Gói Sách Giấy').first();
    await card.scrollIntoViewIfNeeded();
    const box = await card.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(EVIDENCE, 'TC_REWD_006.png'),
        clip: {
          x: Math.max(0, box.x - 40),
          y: Math.max(0, box.y - 80),
          width: Math.min(900, 1280 - Math.max(0, box.x - 40)),
          height: Math.min(520, 900 - Math.max(0, box.y - 80)),
        },
      });
    } else {
      await page.screenshot({ path: path.join(EVIDENCE, 'TC_REWD_006.png') });
    }
  } else {
    await page.screenshot({ path: path.join(EVIDENCE, 'TC_REWD_006.png') });
  }
  notes.push({ tid: 'TC_REWD_006', url: page.url(), hasBook, snippet: rewardText.replace(/\s+/g, ' ').slice(0, 300) });

  await page.goto(LIVE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2000);
  const home = await page.locator('body').innerText();
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_CAMP_014.png') });
  notes.push({ tid: 'TC_CAMP_014', url: page.url(), hasAlbum: /Album Mầm sáng|nổi bật|Mầm sáng/.test(home) });
  await guest.close();

  const adminCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const admin = await adminCtx.newPage();
  await admin.goto(LIVE + '/auth/login', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await admin.fill('input[type="email"], input[name="email"]', 'admin@crowdfunding.vn');
  await admin.fill('input[type="password"], input[name="password"]', 'Admin@123456');
  await admin.click('button[type="submit"]');
  await admin.waitForTimeout(4000);
  notes.push({ tid: 'LOGIN', url: admin.url() });

  await admin.goto(LIVE + '/dashboard/admin/moderation', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await admin.waitForTimeout(2000);
  const words = admin.getByText('Từ bị cấm').first();
  if (await words.count()) await words.scrollIntoViewIfNeeded();
  await admin.waitForTimeout(800);
  await admin.screenshot({ path: path.join(EVIDENCE, 'TC_ADMN_005.png'), fullPage: false });
  const modText = await admin.locator('body').innerText();
  notes.push({
    tid: 'TC_ADMN_005',
    url: admin.url(),
    hasWords: /Từ bị cấm/.test(modText),
    hasDelete: /Xóa/.test(modText),
    hasAdd: /Thêm/.test(modText),
  });

  await admin.goto(LIVE + '/dashboard/admin/revenue', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await admin.waitForTimeout(2500);
  await admin.screenshot({ path: path.join(EVIDENCE, 'TC_ADMN_007.png') });
  const revText = (await admin.locator('body').innerText()).replace(/\s+/g, ' ');
  notes.push({ tid: 'TC_ADMN_007', url: admin.url(), snippet: revText.slice(0, 400) });

  await admin.goto(LIVE + '/so', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await admin.waitForTimeout(2500);
  const soText = await admin.locator('body').innerText();
  const bank = admin.getByText(/Ngân hàng|Sổ quỹ|Thu|Chi/).first();
  if (await bank.count()) await bank.click().catch(() => {});
  await admin.waitForTimeout(800);
  await admin.screenshot({ path: path.join(EVIDENCE, 'TC_CERT_008.png') });
  notes.push({ tid: 'TC_CERT_008', url: admin.url(), snippet: soText.replace(/\s+/g, ' ').slice(0, 300) });

  const providers = await admin.request.get(LIVE + '/api/auth/providers');
  const providersBody = await providers.json();
  fs.writeFileSync(path.join(EVIDENCE, 'TC_AUTH_004_response.json'), JSON.stringify({
    testCaseId: 'TC_AUTH_004',
    status: providersBody.google?.type === 'oidc' ? 'PASS' : 'FAIL',
    executionTimestamp: new Date().toISOString(),
    request: { endpoint: LIVE + '/api/auth/providers', method: 'GET' },
    response: { statusCode: providers.status(), body: providersBody },
    verification: providersBody.google
      ? `GET /api/auth/providers có google id=${providersBody.google.id} type=${providersBody.google.type}. Nút Google nằm trên /auth/login, ảnh TC_AUTH_004.png.`
      : 'Không thấy provider google',
  }, null, 2));
  notes.push({ tid: 'TC_AUTH_004', google: providersBody.google || null });
  await adminCtx.close();
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(ROOT, 'scratch', 'recapture_ui.json'), JSON.stringify(notes, null, 2));
console.log(JSON.stringify(notes, null, 2));
