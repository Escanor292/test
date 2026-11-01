// Bổ sung các ca còn thiếu bằng chứng hoặc chấm chỉ theo mã HTTP.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LIVE = 'https://test-gamma-azure-65.vercel.app';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE = path.join(ROOT, '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');
const OUT = path.join(ROOT, 'scratch', 'complete_thin_summary.json');
process.env.PLAYWRIGHT_BROWSERS_PATH = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';

const ACCOUNTS = {
  admin: { email: 'admin@crowdfunding.vn', password: 'Admin@123456' },
  backer: { email: 'test1@gmail.com', password: '123' },
};

function stamp() { return new Date().toISOString(); }
function clip(value, n = 4000) {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  if (!text) return value ?? null;
  return text.length > n ? text.slice(0, n) + '…' : value;
}
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
async function request(urlPath, { method = 'GET', cookie = '', json, form } = {}) {
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
  const response = await fetch(urlPath.startsWith('http') ? urlPath : LIVE + urlPath, { method, headers, body, redirect: 'manual' });
  const raw = await response.text();
  let parsed = null;
  try { parsed = raw ? JSON.parse(raw) : null; } catch { parsed = raw ? raw.slice(0, 800) : null; }
  return {
    status: response.status,
    location: response.headers.get('location'),
    cookie: cookieHeaderFromSetCookie(setCookieList(response), cookie),
    body: parsed,
    raw: raw.slice(0, 500),
  };
}
async function login(email, password) {
  const csrf = await request('/api/auth/csrf');
  const token = csrf.body?.csrfToken;
  if (!token) return { ok: false, error: 'no csrf', csrf };
  const posted = await request('/api/auth/callback/credentials', {
    method: 'POST',
    cookie: csrf.cookie,
    form: { csrfToken: token, email, password, callbackUrl: LIVE + '/', json: 'true' },
  });
  const session = await request('/api/auth/session', { cookie: posted.cookie });
  const user = session.body?.user || null;
  return { ok: Boolean(user?.email), email, user, cookie: posted.cookie, sessionStatus: session.status };
}
async function registerBacker(name) {
  const email = `${name}.${Date.now()}@crowdfunding.vn`;
  const password = 'ValidPassword@123';
  const registered = await request('/api/auth/register', {
    method: 'POST',
    json: { name, email, password, confirmPassword: password, acceptTerms: true },
  });
  const session = await login(email, password);
  return { email, password, registered, ...session };
}
function writeJson(tid, payload) {
  fs.writeFileSync(path.join(EVIDENCE, `${tid}_response.json`), JSON.stringify(payload, null, 2));
}
function evidenceDoc({ tid, description, status, steps, verification, role }) {
  return {
    testCaseId: tid,
    description,
    status,
    executionTimestamp: stamp(),
    steps,
    verification,
    criteriaSource: 'Test Case_23CT113_Nhom02.xlsx > TC List > cột Kết quả mong đợi. Đối chiếu body, không nới mã HTTP.',
    role: role || 'guest',
  };
}
const results = [];
function record(tid, status, verification) {
  results.push({ tid, status, verification });
  console.log(`${status.padEnd(4)} ${tid} ${verification}`);
}
function num(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function shot(cookie, urlPath, fileName) {
  const playwright = await import('/tmp/pw/node_modules/playwright/index.js');
  const browser = await playwright.default.chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const cookies = String(cookie).split(';').map((p) => p.trim()).filter(Boolean).map((p) => {
      const i = p.indexOf('=');
      return {
        name: p.slice(0, i),
        value: decodeURIComponent(p.slice(i + 1)),
        domain: 'test-gamma-azure-65.vercel.app',
        path: '/',
        secure: true,
        httpOnly: false,
      };
    });
    if (cookies.length) await context.addCookies(cookies);
    const page = await context.newPage();
    await page.goto(LIVE + urlPath, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1500);
    const text = await page.evaluate(() => document.body?.innerText?.slice(0, 1500) || '');
    await page.screenshot({ path: path.join(EVIDENCE, fileName), fullPage: false });
    return text;
  } finally {
    await browser.close();
  }
}

const admin = await login(ACCOUNTS.admin.email, ACCOUNTS.admin.password);
console.log('admin', admin.ok, admin.user?.role, admin.user?.id);
const backer = await login(ACCOUNTS.backer.email, ACCOUNTS.backer.password);
console.log('backer', backer.ok, backer.user?.email);

// TC_CAMP_007 — chỉ chiến dịch ACTIVE
{
  const res = await request('/api/campaigns?status=ACTIVE&limit=50');
  const items = res.body?.items || [];
  const statuses = {};
  for (const it of items) statuses[it.status] = (statuses[it.status] || 0) + 1;
  const onlyActive = items.length > 0 && items.every((it) => it.status === 'ACTIVE');
  const status = onlyActive ? 'PASS' : 'FAIL';
  writeJson('TC_CAMP_007', evidenceDoc({
    tid: 'TC_CAMP_007',
    description: 'Danh sách chiến dịch công khai trạng thái ACTIVE',
    status,
    role: 'guest',
    steps: [{
      endpoint: LIVE + '/api/campaigns?status=ACTIVE&limit=50',
      method: 'GET',
      response: {
        statusCode: res.status,
        total: items.length,
        statusCounts: statuses,
        sample: items.slice(0, 5).map((it) => ({ id: it.id, slug: it.slug, title: it.title, status: it.status, category: it.category })),
      },
    }],
    verification: onlyActive
      ? `HTTP ${res.status}. ${items.length} chiến dịch, tất cả status=ACTIVE.`
      : `HTTP ${res.status}. Không chỉ toàn ACTIVE: ${JSON.stringify(statuses)}`,
  }));
  record('TC_CAMP_007', status, onlyActive ? `${items.length} ACTIVE` : JSON.stringify(statuses));
}

// TC_BLOG_006 — tiêu đề trống, type và visibility đã có
{
  const emptyTitle = await request('/api/blog/posts', {
    method: 'POST',
    cookie: admin.cookie,
    json: { title: '', content: '', type: 'PLATFORM', visibility: 'PUBLIC' },
  });
  const emptyContent = await request('/api/blog/posts', {
    method: 'POST',
    cookie: admin.cookie,
    json: { title: `QA khong noi dung ${Date.now()}`, content: '', type: 'PLATFORM', visibility: 'PUBLIC' },
  });
  let deleted = null;
  if (emptyContent.body?.slug) {
    deleted = await request('/api/blog/posts/' + emptyContent.body.slug, { method: 'DELETE', cookie: admin.cookie });
  }
  const titleRejected = emptyTitle.status === 400 && String(emptyTitle.body?.error || '').toLowerCase().includes('title');
  const contentRejected = emptyContent.status === 400;
  const status = titleRejected ? 'PASS' : 'FAIL';
  const verification = titleRejected
    ? `Tiêu đề trống + type/visibility hợp lệ → HTTP ${emptyTitle.status}: ${emptyTitle.body?.error}. Nội dung trống khi đã có tiêu đề → HTTP ${emptyContent.status}${contentRejected ? '' : ' (nội dung không bị bắt buộc)'}${deleted ? `; đã xóa bài thử HTTP ${deleted.status}` : ''}.`
    : `Không từ chối tiêu đề trống. HTTP ${emptyTitle.status} ${JSON.stringify(emptyTitle.body)}`;
  writeJson('TC_BLOG_006', evidenceDoc({
    tid: 'TC_BLOG_006',
    description: 'Từ chối bài viết thiếu tiêu đề',
    status,
    role: 'admin',
    steps: [
      { endpoint: LIVE + '/api/blog/posts', method: 'POST', payload: { title: '', content: '', type: 'PLATFORM', visibility: 'PUBLIC' }, response: { statusCode: emptyTitle.status, body: emptyTitle.body } },
      { endpoint: LIVE + '/api/blog/posts', method: 'POST', payload: { title: '(có tiêu đề)', content: '', type: 'PLATFORM', visibility: 'PUBLIC' }, response: { statusCode: emptyContent.status, body: clip(emptyContent.body, 500) } },
      deleted ? { endpoint: 'DELETE bài thử', method: 'DELETE', response: { statusCode: deleted.status, body: deleted.body } } : null,
    ].filter(Boolean),
    verification,
  }));
  record('TC_BLOG_006', status, verification);
}

// TC_BLOG_009 — like tăng số đếm và bookmark
{
  const list = await request('/api/blog/posts');
  const post = (list.body?.posts || []).find((p) => p.slug && p.status === 'PUBLISHED') || (list.body?.posts || [])[0];
  const fan = await registerBacker('like.qa');
  const before = await request('/api/blog/posts/' + post.slug, { cookie: fan.cookie });
  const like = await request('/api/blog/posts/' + post.slug + '/like', { method: 'POST', cookie: fan.cookie, json: {} });
  const bookmark = await request('/api/blog/posts/' + post.slug + '/bookmark', { method: 'POST', cookie: fan.cookie, json: {} });
  const after = await request('/api/blog/posts/' + post.slug, { cookie: fan.cookie });
  const beforeLike = num(before.body?.likeCount);
  const afterLike = num(after.body?.likeCount);
  const beforeBm = num(before.body?.bookmarkCount);
  const afterBm = num(after.body?.bookmarkCount);
  const ok = like.body?.liked === true && bookmark.body?.bookmarked === true && afterLike === beforeLike + 1 && afterBm === beforeBm + 1;
  const status = ok ? 'PASS' : 'FAIL';
  const verification = `Bài ${post?.slug}. Like ${beforeLike} → ${afterLike} (liked=${like.body?.liked}). Bookmark ${beforeBm} → ${afterBm} (bookmarked=${bookmark.body?.bookmarked}).`;
  writeJson('TC_BLOG_009', evidenceDoc({
    tid: 'TC_BLOG_009',
    description: 'Like tăng số đếm và lưu bookmark',
    status,
    role: 'backer',
    steps: [
      { endpoint: LIVE + '/api/blog/posts/' + post?.slug, method: 'GET', response: { statusCode: before.status, likeCount: beforeLike, bookmarkCount: beforeBm } },
      { endpoint: LIVE + '/api/blog/posts/' + post?.slug + '/like', method: 'POST', response: { statusCode: like.status, body: like.body } },
      { endpoint: LIVE + '/api/blog/posts/' + post?.slug + '/bookmark', method: 'POST', response: { statusCode: bookmark.status, body: bookmark.body } },
      { endpoint: LIVE + '/api/blog/posts/' + post?.slug, method: 'GET', response: { statusCode: after.status, likeCount: afterLike, bookmarkCount: afterBm } },
    ],
    verification,
  }));
  record('TC_BLOG_009', status, verification);
}

// TC_PLED_001 + TC_PLED_007 — VietQR rồi đối soát, so số dư
let pledgeId = null;
let campaign = null;
{
  const list = await request('/api/campaigns?status=ACTIVE&limit=20');
  campaign = (list.body?.items || []).find((it) => it.status === 'ACTIVE');
  const beforeAmount = num(campaign?.currentAmount);
  const payload = {
    campaignId: campaign.id,
    amount: 50000,
    paymentMethod: 'ONLINE',
    displayName: 'QA VietQR',
  };
  const created = await request('/api/payments', { method: 'POST', cookie: backer.cookie, json: payload });
  pledgeId = created.body?.pledgeId || null;
  const qr = pledgeId
    ? await request('/api/thanh-toan/chuyen-khoan/' + pledgeId, { cookie: backer.cookie })
    : { status: 0, body: null };
  const qrUrl = qr.body?.transfer?.qrUrl || '';
  const content = qr.body?.transfer?.content || created.body?.transfer?.content || '';
  const vietqr = qrUrl.includes('img.vietqr.io') && qrUrl.includes('970436') && qrUrl.includes('amount=50000');
  let pageText = '';
  try {
    pageText = await shot(backer.cookie, '/thanh-toan/chuyen-khoan?pledge=' + pledgeId, 'TC_PLED_001.png');
  } catch (error) {
    pageText = 'screenshot error: ' + error.message;
  }
  const pageShowsQr = /vietcombank|chuyển khoản|chuyen khoan|tử tế|tute/i.test(pageText);
  const status = pledgeId && vietqr ? 'PASS' : 'FAIL';
  const verification = `Pledge ${pledgeId}. qrUrl=${qrUrl}. Nội dung CK ${content}. Ảnh trang chuyển khoản ${pageShowsQr ? 'có thông tin ngân hàng' : 'không đọc được chữ mong đợi'}.`;
  writeJson('TC_PLED_001', evidenceDoc({
    tid: 'TC_PLED_001',
    description: 'Sinh mã VietQR và cú pháp chuyển khoản',
    status,
    role: 'backer',
    steps: [
      { endpoint: LIVE + '/api/payments', method: 'POST', payload, response: { statusCode: created.status, body: clip(created.body, 1200) } },
      { endpoint: LIVE + '/api/thanh-toan/chuyen-khoan/' + pledgeId, method: 'GET', response: { statusCode: qr.status, transfer: qr.body?.transfer || null, pledgeStatus: qr.body?.status || null } },
    ],
    verification,
  }));
  record('TC_PLED_001', status, verification);

  const settle = await request('/api/admin/pledges/' + pledgeId + '/settle', {
    method: 'POST',
    cookie: admin.cookie,
    json: { status: 'SUCCESS', transactionRef: 'FT' + Date.now() },
  });
  const afterList = await request('/api/campaigns?status=ACTIVE&limit=50');
  const after = (afterList.body?.items || []).find((it) => it.id === campaign.id);
  const afterAmount = num(after?.currentAmount);
  const delta = afterAmount != null && beforeAmount != null ? afterAmount - beforeAmount : null;
  const settled = settle.status === 200 && settle.body?.ok === true;
  const amountOk = delta === 50000;
  const p7 = settled && amountOk ? 'PASS' : 'FAIL';
  const v7 = `Trước ${beforeAmount}, sau ${afterAmount}, lệch ${delta} (mong +50000). Settle HTTP ${settle.status} ok=${settle.body?.ok}. Pledge ${pledgeId}.`;
  writeJson('TC_PLED_007', evidenceDoc({
    tid: 'TC_PLED_007',
    description: 'Đối soát làm tăng số tiền gây quỹ',
    status: p7,
    role: 'admin',
    steps: [
      { note: 'currentAmount trước', campaignId: campaign.id, slug: campaign.slug, currentAmount: beforeAmount },
      { endpoint: LIVE + '/api/admin/pledges/' + pledgeId + '/settle', method: 'POST', response: { statusCode: settle.status, body: clip(settle.body, 800) } },
      { note: 'currentAmount sau', currentAmount: afterAmount, delta },
    ],
    verification: v7,
  }));
  record('TC_PLED_007', p7, v7);
}

// TC_CERT_009 — sổ cái thật. Nếu trống, mở /so để ứng dụng tự ghi seed rồi đọc lại.
{
  const first = await request('/api/so/ledger', { cookie: admin.cookie });
  let ledger = first.body;
  let seededByUi = false;
  const hasBooks = (row) => Array.isArray(row?.state?.journals) || Array.isArray(row?.state?.bank);
  if (!hasBooks(ledger)) {
    try {
      await shot(admin.cookie, '/so', 'TC_CERT_009.png');
      seededByUi = true;
    } catch (error) {
      console.log('so screenshot', error.message);
    }
    const second = await request('/api/so/ledger', { cookie: admin.cookie });
    ledger = second.body;
  }
  const journals = ledger?.state?.journals || [];
  const bank = ledger?.state?.bank || [];
  const thu = bank.filter((b) => Number(b.amount) > 0);
  const chi = bank.filter((b) => Number(b.amount) < 0);
  const ok = first.status === 200 && (journals.length > 0 || bank.length > 0);
  const status = ok ? 'PASS' : 'FAIL';
  const verification = ok
    ? `HTTP 200. so_ledgers id trial, rev ${ledger.rev}. ${journals.length} bút toán, ${bank.length} dòng ngân hàng (${thu.length} thu, ${chi.length} chi).${seededByUi ? ' Sổ trống nên đã mở /so để ứng dụng ghi seed rồi đọc lại.' : ''}`
    : `HTTP ${first.status} nhưng không có danh sách thu/chi. Body ${JSON.stringify(ledger)?.slice(0, 180)}`;
  writeJson('TC_CERT_009', evidenceDoc({
    tid: 'TC_CERT_009',
    description: 'Đọc sổ cái thu chi',
    status,
    role: 'admin',
    steps: [
      { endpoint: LIVE + '/api/so/ledger', method: 'GET', response: { statusCode: first.status, firstBody: clip(first.body, 300) } },
      {
        endpoint: LIVE + '/api/so/ledger',
        method: 'GET',
        response: {
          rev: ledger?.rev ?? null,
          journalCount: journals.length,
          bankCount: bank.length,
          journals: journals.slice(0, 3),
          bank: bank.slice(0, 6),
        },
      },
    ],
    verification,
  }));
  record('TC_CERT_009', status, verification);
}

// TC_ADMN_004 — BLOCKED không tồn tại; khóa bằng BANNED và chứng minh bị chặn quyền
{
  const fresh = await registerBacker('ban.qa');
  const blocked = await request('/api/admin/users/' + fresh.user.id + '/update-status', {
    method: 'POST',
    cookie: admin.cookie,
    json: { status: 'BLOCKED' },
  });
  const banned = await request('/api/admin/users/' + fresh.user.id + '/update-status', {
    method: 'POST',
    cookie: admin.cookie,
    json: { status: 'BANNED' },
  });
  const relog = await login(fresh.email, fresh.password);
  const follow = await request('/api/users/' + admin.user.id + '/follow', { method: 'POST', cookie: relog.cookie });
  let bannedText = '';
  try {
    bannedText = await shot(relog.cookie, '/banned', 'TC_ADMN_004.png');
  } catch (error) {
    bannedText = 'screenshot error: ' + error.message;
  }
  const restored = await request('/api/admin/users/' + fresh.user.id + '/update-status', {
    method: 'POST',
    cookie: admin.cookie,
    json: { status: 'NORMAL' },
  });
  const locked = banned.body?.user?.status === 'BANNED' || banned.body?.users?.status === 'BANNED';
  const gated = follow.status === 403;
  const screen = /tạm khóa|bị khóa|banned/i.test(bannedText);
  const status = locked && gated ? 'PASS' : 'FAIL';
  const verification = `BLOCKED → HTTP ${blocked.status} ${blocked.body?.error || ''}. BANNED → HTTP ${banned.status} status=${banned.body?.user?.status}. Đăng nhập lại vẫn có session status=${relog.user?.status}. Follow bị HTTP ${follow.status}. Trang /banned ${screen ? 'hiện thông báo khóa' : 'không thấy chữ khóa'}. Đã trả NORMAL HTTP ${restored.status}.`;
  writeJson('TC_ADMN_004', evidenceDoc({
    tid: 'TC_ADMN_004',
    description: 'Khóa tài khoản và chặn thao tác',
    status,
    role: 'admin',
    steps: [
      { endpoint: LIVE + '/api/admin/users/' + fresh.user.id + '/update-status', method: 'POST', payload: { status: 'BLOCKED' }, response: { statusCode: blocked.status, body: blocked.body } },
      { endpoint: LIVE + '/api/admin/users/' + fresh.user.id + '/update-status', method: 'POST', payload: { status: 'BANNED' }, response: { statusCode: banned.status, body: banned.body } },
      { endpoint: LIVE + '/api/auth/session', method: 'GET', response: { status: relog.user?.status, email: fresh.email } },
      { endpoint: LIVE + '/api/users/' + admin.user.id + '/follow', method: 'POST', response: { statusCode: follow.status, body: follow.body } },
      { endpoint: 'restore', method: 'POST', response: { statusCode: restored.status, body: restored.body?.user || restored.body?.users || restored.body } },
    ],
    verification,
  }));
  record('TC_ADMN_004', status, verification);
}

// TC_AUTH_010, TC_CHAT_003, TC_CHAT_004 — đọc đúng dòng mã nguồn, ghi file
{
  const resetSrc = fs.readFileSync(path.join(ROOT, 'src/lib/password-reset.ts'), 'utf8');
  const resetLine = resetSrc.split('\n').findIndex((line) => line.includes('PASSWORD_RESET_TTL_MS')) + 1;
  const ttl = /PASSWORD_RESET_TTL_MS\s*=\s*([^;]+);/.exec(resetSrc);
  const ttlVal = ttl ? Function(`"use strict"; return (${ttl[1]})`)() : null;
  const authPass = ttlVal === 30 * 60 * 1000;
  const authLog = `=== TC_AUTH_010 ${stamp()} ===
File: src/lib/password-reset.ts:${resetLine}
Dòng: ${resetSrc.split('\n')[resetLine - 1].trim()}
Giá trị: ${ttlVal} ms = ${ttlVal / 60000} phút
Mong đợi: 1800000 ms (30 phút)
Kết quả: ${authPass ? 'PASS' : 'FAIL'}
`;
  fs.writeFileSync(path.join(EVIDENCE, 'TC_AUTH_010_test.log'), authLog);
  writeJson('TC_AUTH_010', evidenceDoc({
    tid: 'TC_AUTH_010',
    description: 'TTL đặt lại mật khẩu 30 phút',
    status: authPass ? 'PASS' : 'FAIL',
    role: 'source',
    steps: [{ file: 'src/lib/password-reset.ts', line: resetLine, valueMs: ttlVal }],
    verification: authLog.trim(),
  }));
  record('TC_AUTH_010', authPass ? 'PASS' : 'FAIL', `TTL ${ttlVal}`);

  const callSrc = fs.readFileSync(path.join(ROOT, 'src/hooks/useCall.ts'), 'utf8');
  const lines = callSrc.split('\n');
  const timeoutLine = lines.findIndex((line) => line.includes('CALL_TIMEOUT_MS')) + 1;
  const pollLine = lines.findIndex((line) => /POLL_MS\s*=/.test(line)) + 1;
  const timeoutVal = Number(/CALL_TIMEOUT_MS\s*=\s*(\d+)/.exec(callSrc)?.[1]);
  const pollVal = /POLL_MS\s*=\s*(\d+)/.exec(callSrc)?.[1] || null;
  const hasWs = callSrc.includes('new WebSocket') || callSrc.includes('io(');
  const chat4 = timeoutVal === 45000;
  const chat3 = hasWs ? 'PASS' : 'FAIL';
  const chat3Log = `=== TC_CHAT_003 ${stamp()} ===
File: src/hooks/useCall.ts
WebSocket: ${hasWs}
POLL_MS dòng ${pollLine}: ${lines[pollLine - 1]?.trim() || 'không thấy'}
Mong đợi: kết nối WebSocket full-duplex
Thực tế: short-polling ${pollVal} ms, không có WebSocket
Kết quả: FAIL
`;
  const chat4Log = `=== TC_CHAT_004 ${stamp()} ===
File: src/hooks/useCall.ts:${timeoutLine}
Dòng: ${lines[timeoutLine - 1].trim()}
Giá trị: ${timeoutVal} ms
Mong đợi: 45000 ms
Kết quả: ${chat4 ? 'PASS' : 'FAIL'}
`;
  fs.writeFileSync(path.join(EVIDENCE, 'TC_CHAT_003_test.log'), chat3Log);
  fs.writeFileSync(path.join(EVIDENCE, 'TC_CHAT_004_test.log'), chat4Log);
  writeJson('TC_CHAT_003', evidenceDoc({
    tid: 'TC_CHAT_003',
    description: 'Cuộc gọi dùng WebSocket',
    status: chat3,
    role: 'source',
    steps: [{ file: 'src/hooks/useCall.ts', pollLine, pollVal, hasWs }],
    verification: chat3Log.trim(),
  }));
  writeJson('TC_CHAT_004', evidenceDoc({
    tid: 'TC_CHAT_004',
    description: 'Timeout cuộc gọi 45 giây',
    status: chat4 ? 'PASS' : 'FAIL',
    role: 'source',
    steps: [{ file: 'src/hooks/useCall.ts', line: timeoutLine, valueMs: timeoutVal }],
    verification: chat4Log.trim(),
  }));
  record('TC_CHAT_003', chat3, `poll ${pollVal} ws ${hasWs}`);
  record('TC_CHAT_004', chat4 ? 'PASS' : 'FAIL', `timeout ${timeoutVal}`);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
console.log('wrote', OUT);
