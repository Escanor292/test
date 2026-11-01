import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LIVE = 'https://test-gamma-azure-65.vercel.app';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE = path.join(ROOT, '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');

function cookieHeaderFromSetCookie(setCookies, previous = '') {
  const jar = new Map();
  for (const part of String(previous).split(';').map((s) => s.trim()).filter(Boolean)) {
    const i = part.indexOf('=');
    if (i > 0) jar.set(part.slice(0, i), part.slice(i + 1));
  }
  for (const raw of setCookies || []) {
    const pair = String(raw).split(';')[0];
    const i = pair.indexOf('=');
    if (i > 0) jar.set(pair.slice(0, i).trim(), pair.slice(i + 1).trim());
  }
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
}
function setCookieList(response) {
  return typeof response.headers.getSetCookie === 'function' ? response.headers.getSetCookie() : [];
}
async function request(urlPath, { method = 'GET', cookie = '', json, form, redirect = 'manual' } = {}) {
  const headers = { Accept: 'application/json, text/html;q=0.8' };
  if (cookie) headers.Cookie = cookie;
  let body;
  if (form) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    body = form instanceof URLSearchParams ? form.toString() : new URLSearchParams(form).toString();
  } else if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  }
  const response = await fetch(urlPath.startsWith('http') ? urlPath : LIVE + urlPath, { method, headers, body, redirect });
  const raw = await response.text();
  let parsed = null;
  try { parsed = raw ? JSON.parse(raw) : null; } catch { parsed = raw ? raw.slice(0, 800) : null; }
  return { status: response.status, location: response.headers.get('location'), cookie: cookieHeaderFromSetCookie(setCookieList(response), cookie), body: parsed, raw: raw.slice(0, 400) };
}
async function login(email, password) {
  const csrf = await request('/api/auth/csrf');
  const posted = await request('/api/auth/callback/credentials', {
    method: 'POST', cookie: csrf.cookie,
    form: { csrfToken: csrf.body?.csrfToken || '', email, password, callbackUrl: LIVE + '/', json: 'true' },
  });
  const session = await request('/api/auth/session', { cookie: posted.cookie, redirect: 'follow' });
  return { ok: Boolean(session.body?.user?.email), user: session.body?.user || null, cookie: posted.cookie };
}
function writeJson(tid, payload) {
  fs.writeFileSync(path.join(EVIDENCE, `${tid}_response.json`), JSON.stringify(payload, null, 2));
}
function doc(tid, description, status, req, res, verification, role) {
  return {
    testCaseId: tid, description, status, executionTimestamp: new Date().toISOString(),
    request: req, response: res, verification, role,
    criteriaSource: 'Test Case_23CT113_Nhom02.xlsx > TC List > cột Kết quả mong đợi. Không nới mã HTTP.',
  };
}

const creator = await login('test2@gmail.com', '123');
const deleted = await request('/api/rewards/a60cd2e9-1534-4105-b559-8a3d8719cd4d', { method: 'DELETE', cookie: creator.cookie });
console.log('delete negative reward', deleted.status, JSON.stringify(deleted.body)?.slice(0, 180));

const email = `follow.qa.${Date.now()}@crowdfunding.vn`;
const password = 'ValidPassword@123';
const registered = await request('/api/auth/register', {
  method: 'POST',
  json: { name: 'Follow QA 2', email, password, confirmPassword: password, acceptTerms: true },
});
const fan = await login(email, password);
console.log('fan', fan.ok, fan.user?.id, fan.user?.email, 'register', registered.status);
const follow = await request('/api/campaigns/sach-giao-duc-vung-cao/follow', {
  method: 'POST', cookie: fan.cookie, json: { email },
});
const msg = JSON.stringify(follow.body);
const pass = follow.status === 200 && msg.includes('Đã thêm vào danh sách quan tâm') && follow.body?.isFollowing === true;
const verification = pass
  ? `Tài khoản mới ${email} (id ${fan.user?.id}) follow lần đầu, gửi kèm email riêng. HTTP 200: ${msg}`
  : `Vẫn không tạo follow mới cho ${email} id=${fan.user?.id}. HTTP ${follow.status} ${msg}`;
writeJson('TC_COMM_008', doc('TC_COMM_008', 'Follow chiến dịch lần đầu', pass ? 'PASS' : 'FAIL',
  { endpoint: LIVE + '/api/campaigns/sach-giao-duc-vung-cao/follow', method: 'POST', authenticated: true, payload: { email, userId: fan.user?.id } },
  { statusCode: follow.status, body: follow.body }, verification, 'backer'));
console.log(pass ? 'PASS' : 'FAIL', 'TC_COMM_008', verification);

process.env.PLAYWRIGHT_BROWSERS_PATH = '/opt/pw-browsers';
const pw = await import('/tmp/pw/node_modules/playwright/index.js');
const browser = await pw.default.chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

async function shoot(tid, urlPath, want404) {
  const response = await page.goto(LIVE + urlPath, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1000);
  const status = response?.status() ?? 0;
  const bodyText = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 280);
  await page.screenshot({ path: path.join(EVIDENCE, `${tid}.png`) });
  const pass = want404 ? status === 404 : false;
  const verification = want404
    ? (pass ? `GET ${urlPath} trả HTTP 404. Ảnh không gắn banner.` : `GET ${urlPath} trả HTTP ${status}, không phải 404. ${bodyText}`)
    : bodyText;
  if (want404) {
    writeJson(tid, doc(tid, urlPath, pass ? 'PASS' : 'FAIL',
      { endpoint: LIVE + urlPath, method: 'GET', authenticated: false, payload: null },
      { statusCode: status, body: bodyText }, verification, 'guest'));
    console.log(pass ? 'PASS' : 'FAIL', tid, verification);
  }
  return { status, bodyText };
}

await shoot('TC_BLOG_004', '/blog/bai-viet-khong-ton-tai-999', true);
await shoot('TC_CERT_005', '/chung-tu/CT-INVALID-999', true);
await shoot('TC_CERT_007', '/hoa-don/HD-INVALID-999', true);

let invoiceHref = null;
for (const code of ['TT-UH-202611-TRRR', 'TT-UH-202611-9Q49']) {
  const looked = await request(`/api/lookup?code=${encodeURIComponent(code)}`);
  console.log('lookup', code, looked.status, JSON.stringify(looked.body)?.slice(0, 220));
  if (looked.body?.invoiceHref) { invoiceHref = looked.body.invoiceHref; break; }
}
if (!invoiceHref) {
  const { status, bodyText } = await shoot('TC_CERT_006', '/hoa-don/HD-INVALID-999', false);
  const verification = `Không có hóa đơn GTGT gắn với mã chứng nhận TT-UH-202611-TRRR hoặc TT-UH-202611-9Q49. Trang /hoa-don/HD-INVALID-999 HTTP ${status}. ${bodyText}`;
  writeJson('TC_CERT_006', doc('TC_CERT_006', 'Hiển thị hóa đơn điện tử', 'FAIL',
    { endpoint: LIVE + '/hoa-don/HD-INVALID-999', method: 'GET', authenticated: false, payload: null },
    { statusCode: status, body: bodyText }, verification, 'guest'));
  console.log('FAIL TC_CERT_006', verification);
} else {
  const response = await page.goto(LIVE + invoiceHref, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1000);
  const status = response?.status() ?? 0;
  const bodyText = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 400);
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_CERT_006.png') });
  const pass = status === 200 && /hóa đơn|GTGT/i.test(bodyText);
  const verification = pass ? `Mở ${invoiceHref} HTTP ${status}. ${bodyText.slice(0, 180)}` : `Mở ${invoiceHref} HTTP ${status} không thấy hóa đơn. ${bodyText}`;
  writeJson('TC_CERT_006', doc('TC_CERT_006', 'Hiển thị hóa đơn điện tử', pass ? 'PASS' : 'FAIL',
    { endpoint: LIVE + invoiceHref, method: 'GET', authenticated: false, payload: null },
    { statusCode: status, body: bodyText }, verification, 'guest'));
  console.log(pass ? 'PASS' : 'FAIL', 'TC_CERT_006', verification);
}

const chatRes = await page.goto(LIVE + '/chat', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(800);
const chatStatus = chatRes?.status() ?? 0;
const finalUrl = page.url();
await page.screenshot({ path: path.join(EVIDENCE, 'TC_CHAT_001.png') });
const chatPass = /\/auth\/login/.test(finalUrl) && finalUrl.includes('callbackUrl');
const chatVer = chatPass
  ? `Chưa đăng nhập vào /chat thì trình duyệt tới ${finalUrl}. Response HTTP ${chatStatus}. Ảnh không gắn banner.`
  : `Không về trang đăng nhập. URL ${finalUrl} HTTP ${chatStatus}`;
writeJson('TC_CHAT_001', doc('TC_CHAT_001', 'Chưa đăng nhập vào chat thì chuyển login', chatPass ? 'PASS' : 'FAIL',
  { endpoint: LIVE + '/chat', method: 'GET', authenticated: false, payload: null },
  { statusCode: chatStatus, location: finalUrl, body: finalUrl }, chatVer, 'guest'));
console.log(chatPass ? 'PASS' : 'FAIL', 'TC_CHAT_001', chatVer);
await browser.close();
