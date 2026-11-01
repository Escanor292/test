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
    body = new URLSearchParams(form).toString();
  } else if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  }
  const response = await fetch(urlPath.startsWith('http') ? urlPath : LIVE + urlPath, { method, headers, body, redirect });
  const raw = await response.text();
  let parsed = null;
  try { parsed = raw ? JSON.parse(raw) : null; } catch { parsed = raw ? raw.slice(0, 1500) : null; }
  return {
    status: response.status,
    location: response.headers.get('location'),
    cookie: cookieHeaderFromSetCookie(setCookieList(response), cookie),
    body: parsed,
  };
}
async function login(email, password) {
  const csrf = await request('/api/auth/csrf');
  const posted = await request('/api/auth/callback/credentials', {
    method: 'POST',
    cookie: csrf.cookie,
    form: { csrfToken: csrf.body?.csrfToken || '', email, password, callbackUrl: LIVE + '/', json: 'true' },
  });
  const session = await request('/api/auth/session', { cookie: posted.cookie, redirect: 'follow' });
  return { ok: Boolean(session.body?.user?.email), user: session.body?.user || null, cookie: posted.cookie, posted };
}
function writeJson(tid, doc) {
  fs.writeFileSync(path.join(EVIDENCE, `${tid}_response.json`), JSON.stringify(doc, null, 2));
}
function doc(tid, description, status, req, res, verification, role) {
  return {
    testCaseId: tid, description, status, executionTimestamp: new Date().toISOString(),
    request: req, response: { statusCode: res.status, location: res.location || null, body: res.body },
    verification, criteriaSource: 'Test Case_23CT113_Nhom02.xlsx > TC List > cột Kết quả mong đợi. Không nới mã HTTP.', role,
  };
}

const admin = await login('admin@crowdfunding.vn', 'Admin@123456');
const creator = await login('test2@gmail.com', '123');
const backer = await login('test1@gmail.com', '123');
console.log('sessions', admin.ok, creator.ok, creator.user?.id, backer.ok);

const email = 'kyc.rerun.1793533925264@crowdfunding.vn';
const list = await request('/api/admin/kyc', { cookie: admin.cookie, redirect: 'follow' });
const matched = (list.body?.items || []).find((row) => row.user?.email === email);
console.log('kyc list', list.status, 'matched', matched?.id, matched?.status, matched?.user?.role);
let review = { status: 0, body: { error: 'khong co ho so', listStatus: list.status } };
if (matched?.id) {
  review = await request(`/api/admin/kyc/${matched.id}/review`, {
    method: 'PATCH', cookie: admin.cookie, json: { action: 'APPROVE' },
  });
}
const kycPass = review.body?.status === 'VERIFIED' && review.body?.role === 'CREATOR';
console.log(kycPass ? 'PASS' : 'FAIL', 'TC_KYC_009', review.status, JSON.stringify(review.body)?.slice(0, 300));
writeJson('TC_KYC_009', doc('TC_KYC_009', 'Admin phê duyệt hồ sơ KYC', kycPass ? 'PASS' : 'FAIL',
  { endpoint: matched ? `${LIVE}/api/admin/kyc/${matched.id}/review` : `${LIVE}/api/admin/kyc`, method: 'PATCH', authenticated: true, payload: { action: 'APPROVE', email, found: Boolean(matched) } },
  review.status ? review : { status: list.status, body: { error: 'Khong thay ho so sau submit 500', count: (list.body?.items || []).length } },
  kycPass ? `Đã duyệt hồ sơ ${matched.id}: VERIFIED, role CREATOR` : `Submit trước đó HTTP 500. Duyệt lại HTTP ${review.status} ${JSON.stringify(review.body)?.slice(0, 240)}`,
  'admin'));

const created = await request('/api/campaigns', {
  method: 'POST', cookie: creator.cookie,
  json: {
    title: `QA pledge min ${Date.now()}`,
    tagline: 'Mo ta ngan chien dich de kiem muc thuong.',
    description: '<p>Noi dung chi tiet chien dich kiem thu muc tien thuong, khong dung du lieu nguoi dung khac.</p>',
    goalAmount: 5000000, category: 'Giáo dục', type: 'DONATION', fundingModel: 'ALL_OR_NOTHING',
  },
});
const campId = created.body?.id;
const slug = created.body?.slug;
console.log('camp', created.status, campId);
let rewardRes = { status: 0, body: created.body };
if (campId) {
  const submitted = await request(`/api/campaigns/${slug}/submit`, { method: 'POST', cookie: creator.cookie, json: {} });
  const approved = submitted.body?.status === 'PENDING_REVIEW'
    ? await request(`/api/admin/campaigns/${campId}/review`, { method: 'PATCH', cookie: admin.cookie, json: { status: 'ACTIVE' } })
    : submitted;
  console.log('submit/approve', submitted.body?.status, approved.body?.campaign?.status || approved.status);
  if (approved.body?.campaign?.status === 'ACTIVE') {
    rewardRes = await request('/api/rewards', {
      method: 'POST', cookie: creator.cookie,
      json: { title: 'Goi QA con bat', description: 'Goi dang bat de kiem muc toi thieu', minAmount: 200000, campaignId: campId, fulfillmentType: 'DOWNLOAD' },
    });
  } else rewardRes = approved;
}
const rewardId = rewardRes.body?.id;
console.log('reward', rewardRes.status, rewardId, JSON.stringify(rewardRes.body)?.slice(0, 200));
let pledged = { status: 0, body: { error: 'no reward' } };
if (rewardId) {
  pledged = await request('/api/payments', {
    method: 'POST', cookie: backer.cookie,
    json: { campaignId: campId, rewardId, amount: 80000, paymentMethod: 'ONLINE', shippingMethod: 'DOWNLOAD', displayName: 'QA Backer', guestEmail: 'test1@gmail.com' },
  });
}
const text = JSON.stringify(pledged.body || {});
const pledPass = pledged.status === 400 && /tối thiểu|toi thieu|không đủ|khong du/i.test(text);
console.log(pledPass ? 'PASS' : 'FAIL', 'TC_PLED_002', pledged.status, text.slice(0, 300));
writeJson('TC_PLED_002', doc('TC_PLED_002', 'Từ chối ủng hộ khi số tiền không đủ nhận thưởng', pledPass ? 'PASS' : 'FAIL',
  { endpoint: LIVE + '/api/payments', method: 'POST', authenticated: true, payload: { amount: 80000, rewardMin: 200000, rewardId } },
  pledged,
  pledPass ? `HTTP 400 vì dưới min thưởng: ${text.slice(0, 220)}` : `Không ra lỗi mức thưởng. HTTP ${pledged.status} ${text.slice(0, 300)}`,
  'backer'));

const pw = await import('/tmp/pw/node_modules/playwright/index.js');
const chromium = pw.default.chromium;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const campRes = await request('/api/campaigns/sach-giao-duc-vung-cao', { redirect: 'follow' });
const goal = Number(campRes.body?.goalAmount ?? campRes.body?.campaign?.goalAmount);
const current = Number(campRes.body?.currentAmount ?? campRes.body?.campaign?.currentAmount);
await page.goto(LIVE + '/campaigns/sach-giao-duc-vung-cao', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(EVIDENCE, 'TC_CAMP_009.png') });
const campPass = goal === 150000000 && current === 45200000;
console.log(campPass ? 'PASS' : 'FAIL', 'TC_CAMP_009', campRes.status, goal, current, campRes.body?.title);
writeJson('TC_CAMP_009', doc('TC_CAMP_009', 'Chi tiết chiến dịch sach-giao-duc-vung-cao', campPass ? 'PASS' : 'FAIL',
  { endpoint: LIVE + '/campaigns/sach-giao-duc-vung-cao', method: 'GET' },
  { status: campRes.status, body: { title: campRes.body?.title, goalAmount: goal, currentAmount: current } },
  campPass ? 'Đúng 150.000.000 / 45.200.000' : `API goal=${goal} current=${current} title=${campRes.body?.title || ''}. Kỳ vọng 150000000 / 45200000. Ảnh không gắn banner.`,
  'guest'));

const missing = await request('/campaigns/chien-dich-khong-ton-tai-999');
await page.goto(LIVE + '/campaigns/chien-dich-khong-ton-tai-999', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(1200);
const pageText = await page.locator('body').innerText();
await page.screenshot({ path: path.join(EVIDENCE, 'TC_CAMP_010.png') });
const missPass = missing.status === 404 && /không tìm thấy|khong tim thay/i.test(pageText);
console.log(missPass ? 'PASS' : 'FAIL', 'TC_CAMP_010', missing.status, pageText.slice(0, 120).replace(/\n/g, ' '));
writeJson('TC_CAMP_010', doc('TC_CAMP_010', 'Trang 404 chiến dịch không tồn tại', missPass ? 'PASS' : 'FAIL',
  { endpoint: LIVE + '/campaigns/chien-dich-khong-ton-tai-999', method: 'GET' },
  { status: missing.status, body: pageText.slice(0, 300) },
  missPass ? `HTTP 404, trang thật ghi không tìm thấy, không chèn banner` : `HTTP ${missing.status} ${pageText.slice(0, 160)}`,
  'guest'));

await page.context().clearCookies();
const cookies = backer.cookie.split(';').map((p) => p.trim()).filter(Boolean).map((pair) => {
  const i = pair.indexOf('=');
  return { name: pair.slice(0, i), value: pair.slice(i + 1), url: LIVE };
});
await page.context().addCookies(cookies);
await page.goto(LIVE + '/gop-y', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(1200);
let uiBlocked = false;
let requestFired = false;
const box = page.locator('textarea');
if (await box.count()) {
  await box.fill('ngan');
  page.on('request', (req) => { if (req.url().includes('/api/feedback') && req.method() === 'POST') requestFired = true; });
  const button = page.getByRole('button', { name: /Gửi góp ý/ });
  uiBlocked = await button.isDisabled().catch(() => false);
  if (!uiBlocked) await button.click();
  await page.waitForTimeout(2000);
}
await page.screenshot({ path: path.join(EVIDENCE, 'TC_COMM_003.png') });
const commPass = uiBlocked && !requestFired;
console.log(commPass ? 'PASS' : 'FAIL', 'TC_COMM_003', 'disabled', uiBlocked, 'fired', requestFired, 'url', page.url());
writeJson('TC_COMM_003', doc('TC_COMM_003', 'Chặn góp ý quá ngắn trên giao diện', commPass ? 'PASS' : 'FAIL',
  { endpoint: LIVE + '/gop-y', method: 'UI', payload: { message: 'ngan' } },
  { status: requestFired ? 400 : 0, body: { uiBlocked, requestFired, url: page.url() } },
  commPass ? 'Nút Gửi bị khóa, không gọi API' : `UI không chặn trước khi gọi API. disabled=${uiBlocked} requestFired=${requestFired}`,
  'backer'));

await browser.close();
console.log('followup done');
