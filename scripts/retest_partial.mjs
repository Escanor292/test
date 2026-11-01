import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LIVE = 'https://test-gamma-azure-65.vercel.app';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE = path.join(ROOT, '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');
process.env.PLAYWRIGHT_BROWSERS_PATH = '/opt/pw-browsers';

function stamp() { return new Date().toISOString(); }
function clip(value, n = 2500) {
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
  try { parsed = raw ? JSON.parse(raw) : null; } catch { parsed = raw ? raw.slice(0, 1500) : null; }
  return { status: response.status, location: response.headers.get('location'), cookie: cookieHeaderFromSetCookie(setCookieList(response), cookie), body: parsed };
}
async function login(email, password) {
  const csrf = await request('/api/auth/csrf');
  const token = csrf.body?.csrfToken;
  const posted = await request('/api/auth/callback/credentials', {
    method: 'POST', cookie: csrf.cookie,
    form: { csrfToken: token, email, password, callbackUrl: LIVE + '/', json: 'true' },
  });
  const session = await request('/api/auth/session', { cookie: posted.cookie });
  return { ok: Boolean(session.body?.user?.email), user: session.body?.user || null, cookie: posted.cookie };
}
function writeJson(tid, doc) {
  fs.writeFileSync(path.join(EVIDENCE, `${tid}_response.json`), JSON.stringify(doc, null, 2));
}
function doc(tid, description, status, steps, verification, role) {
  return { testCaseId: tid, description, status, executionTimestamp: stamp(), steps, verification, criteriaSource: 'Test Case_23CT113_Nhom02.xlsx > Kết quả mong đợi', role };
}
const results = [];
function record(tid, status, verification) {
  results.push({ tid, status, verification });
  console.log(`${status.padEnd(4)} ${tid} ${verification}`);
}

const admin = await login('admin@crowdfunding.vn', 'Admin@123456');
const creator = await login('test2@gmail.com', '123');
const backer = await login('test1@gmail.com', '123');
console.log('sessions', admin.ok, creator.ok, backer.ok, creator.user?.id);

const playwright = await import('/tmp/pw/node_modules/playwright/index.js');
const browser = await playwright.default.chromium.launch({ headless: true });
function cookies(header) {
  return String(header).split(';').map((p) => p.trim()).filter(Boolean).map((pair) => {
    const i = pair.indexOf('=');
    return { name: pair.slice(0, i), value: pair.slice(i + 1), url: LIVE };
  });
}

// TC_BLOG_005
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const hops = [];
  page.on('response', (res) => {
    if (res.status() >= 300 && res.status() < 400) hops.push({ status: res.status(), url: res.url(), location: res.headers().location || null });
  });
  await page.goto(LIVE + '/blog/editor', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2500);
  const finalUrl = page.url();
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_BLOG_005.png') });
  const expected = '/auth/login?callbackUrl=/blog/editor';
  const ok = /\/auth\/login\?callbackUrl=.*%2Fblog%2Feditor/.test(finalUrl) || finalUrl.includes('callbackUrl=/blog/editor');
  const status = ok ? 'PASS' : 'FAIL';
  const verification = ok
    ? `Chuyển tới ${finalUrl}`
    : `Mở /blog/editor khi chưa đăng nhập. URL cuối ${finalUrl}. Không phải ${expected}. Middleware để /blog là route công khai; editor tự đẩy /auth/signin.`;
  writeJson('TC_BLOG_005', doc('TC_BLOG_005', 'Chưa đăng nhập mở editor', status, [{ hops, finalUrl }], verification, 'guest'));
  record('TC_BLOG_005', status, verification);
  await ctx.close();
}

// TC_ADMN_007
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addCookies(cookies(admin.cookie));
  const page = await ctx.newPage();
  await page.goto(LIVE + '/dashboard/admin/revenue', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2000);
  const text = await page.locator('body').innerText();
  const charts = await page.locator('canvas, svg.recharts-surface').count();
  await page.getByText('Phân tích doanh thu').first().scrollIntoViewIfNeeded().catch(() => {});
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_ADMN_007.png') });
  const hasFee = /Phí dịch vụ|Doanh thu sàn/.test(text);
  const hasRaised = /Tổng tiền từ backers|Tổng giao dịch/.test(text);
  const hasDisbursed = /giải ngân/i.test(text);
  const ok = charts > 0 && hasRaised && hasDisbursed && hasFee;
  const status = ok ? 'PASS' : 'FAIL';
  const verification = `Trang /dashboard/admin/revenue. Biểu đồ=${charts}. Có tổng tiền=${hasRaised}. Có phí sàn=${hasFee}. Có chữ giải ngân=${hasDisbursed}.`;
  writeJson('TC_ADMN_007', doc('TC_ADMN_007', 'Biểu đồ dòng tiền và giải ngân', status, [{ url: page.url(), charts, hasRaised, hasFee, hasDisbursed }], verification, 'admin'));
  record('TC_ADMN_007', status, verification);
  await ctx.close();
}

// TC_CERT_008 — sao kê chiến dịch của creator, không dùng sổ quán
{
  const campaign = await request('/api/campaigns/sach-giao-duc-vung-cao');
  const id = campaign.body?.id || campaign.body?.campaign?.id;
  const accounting = await request('/api/campaigns/sach-giao-duc-vung-cao/accounting', { cookie: admin.cookie });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addCookies(cookies(creator.cookie));
  const page = await ctx.newPage();
  const statementUrl = id ? `/dashboard/creator/statement/${id}` : '/dashboard/creator';
  await page.goto(LIVE + statementUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2000);
  const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_CERT_008.png') });
  const hasTable = /BÁO CÁO ĐỐI SOÁT|Người ủng hộ|Tổng thực tế/.test(text);
  const hasTotal = /Tổng thực tế|Tổng khi kết thúc/.test(text);
  const hasDisbursed = /giải ngân/i.test(text);
  const ok = hasTable && hasTotal && hasDisbursed;
  const status = ok ? 'PASS' : 'FAIL';
  const summary = accounting.body?.summary || null;
  const verification = `Sao kê ${statementUrl} HTTP trang có bảng=${hasTable}, tổng đã nhận=${hasTotal}, chữ giải ngân=${hasDisbursed}. API accounting HTTP ${accounting.status} summary=${JSON.stringify(summary)}.`;
  writeJson('TC_CERT_008', doc('TC_CERT_008', 'Bảng dòng tiền gây quỹ', status, [
    { endpoint: LIVE + '/api/campaigns/sach-giao-duc-vung-cao/accounting', method: 'GET', response: { statusCode: accounting.status, summary, campaign: accounting.body?.campaign || null } },
    { url: page.url(), text: text.slice(0, 500) },
  ], verification, 'creator'));
  record('TC_CERT_008', status, verification);
  await ctx.close();
}

// TC_ADMN_008
{
  const behavior = await request('/api/admin/analytics/behavior', { cookie: admin.cookie });
  const keys = behavior.body && typeof behavior.body === 'object' ? Object.keys(behavior.body) : [];
  const blob = JSON.stringify(behavior.body || {});
  const hasViews = /pageViews|views|topPages/.test(blob);
  const hasRate = /hoàn thành|completion|progressPercent|goalAmount/.test(blob);
  const campaigns = await request('/api/campaigns?status=ACTIVE&limit=5');
  const sample = (campaigns.body?.items || []).slice(0, 3).map((it) => ({
    title: it.title, goalAmount: it.goalAmount, currentAmount: it.currentAmount, progressPercent: it.progressPercent,
  }));
  const ok = behavior.status === 200 && hasViews && hasRate;
  const status = ok ? 'PASS' : 'FAIL';
  const verification = `GET /api/admin/analytics/behavior HTTP ${behavior.status}. Có lượt xem=${hasViews}. Có tỷ lệ hoàn thành mục tiêu=${hasRate}. Khóa body: ${keys.join(', ')}. Tỷ lệ mục tiêu chỉ có ở /api/campaigns, ví dụ ${JSON.stringify(sample)}.`;
  writeJson('TC_ADMN_008', doc('TC_ADMN_008', 'Phân tích lượt xem và tỷ lệ mục tiêu', status, [
    { endpoint: LIVE + '/api/admin/analytics/behavior', method: 'GET', response: { statusCode: behavior.status, body: clip(behavior.body, 1800) } },
    { endpoint: LIVE + '/api/campaigns?status=ACTIVE&limit=5', method: 'GET', response: { statusCode: campaigns.status, sample } },
  ], verification, 'admin'));
  record('TC_ADMN_008', status, verification);
}

// TC_ADMN_004
{
  const email = `block.qa.${Date.now()}@crowdfunding.vn`;
  const password = 'ValidPassword@123';
  const registered = await request('/api/auth/register', { method: 'POST', json: { name: 'Block QA', email, password, confirmPassword: password, acceptTerms: true } });
  const fresh = await login(email, password);
  const userId = fresh.user?.id;
  const blocked = await request(`/api/admin/users/${userId}/update-status`, { method: 'POST', cookie: admin.cookie, json: { status: 'BLOCKED' } });
  const banned = await request(`/api/admin/users/${userId}/update-status`, { method: 'POST', cookie: admin.cookie, json: { status: 'BANNED' } });
  const retry = await login(email, password);
  const follow = await request('/api/admin/analytics/behavior', { cookie: retry.cookie });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addCookies(cookies(retry.cookie));
  const page = await ctx.newPage();
  await page.goto(LIVE + '/dashboard', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_ADMN_004.png') });
  const pageText = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 240);
  const restored = await request(`/api/admin/users/${userId}/update-status`, { method: 'POST', cookie: admin.cookie, json: { status: 'NORMAL' } });
  const loginBlocked = !retry.ok;
  const ok = blocked.status === 200 && blocked.body?.status === 'BLOCKED' && loginBlocked;
  const status = ok ? 'PASS' : 'FAIL';
  const verification = `User ${email}. BLOCKED HTTP ${blocked.status} ${JSON.stringify(blocked.body)}. BANNED HTTP ${banned.status} status=${banned.body?.status || banned.body?.user?.status || ''}. Đăng nhập sau khóa ok=${retry.ok}. Follow HTTP ${follow.status}. Trang ${page.url()} ${pageText}. Đã trả NORMAL HTTP ${restored.status}.`;
  writeJson('TC_ADMN_004', doc('TC_ADMN_004', 'Khóa tài khoản BLOCKED', status, [
    { endpoint: LIVE + '/api/auth/register', method: 'POST', response: { statusCode: registered.status, id: userId } },
    { endpoint: LIVE + `/api/admin/users/${userId}/update-status`, method: 'POST', payload: { status: 'BLOCKED' }, response: { statusCode: blocked.status, body: blocked.body } },
    { endpoint: LIVE + `/api/admin/users/${userId}/update-status`, method: 'POST', payload: { status: 'BANNED' }, response: { statusCode: banned.status, body: clip(banned.body, 500) } },
    { loginAfter: retry.ok, followStatus: follow.status, page: page.url() },
    { restore: restored.status },
  ], verification, 'admin'));
  record('TC_ADMN_004', status, verification);
  await ctx.close();
}

// TC_AUTH_008
{
  const email = `bcrypt.qa.${Date.now()}@crowdfunding.vn`;
  const password = 'ValidPassword@123';
  const registered = await request('/api/auth/register', { method: 'POST', json: { name: 'Bcrypt QA', email, password, confirmPassword: password, acceptTerms: true } });
  const session = await login(email, password);
  const body = registered.body || {};
  const leaked = JSON.stringify(body).includes(password) || Object.prototype.hasOwnProperty.call(body.user || {}, 'password');
  const roleOk = body.user?.role === 'BACKER' && (registered.status === 200 || registered.status === 201);
  const source = fs.readFileSync(path.join(ROOT, 'src/app/api/auth/register/route.ts'), 'utf8');
  const hashes = /bcrypt\.genSalt\(10\)/.test(source) && /bcrypt\.hash\(password, salt\)/.test(source);
  const ok = roleOk && session.ok && hashes && !leaked;
  const status = ok ? 'PASS' : 'FAIL';
  const verification = `Đăng ký HTTP ${registered.status} role=${body.user?.role}. Đăng nhập lại ok=${session.ok}. Response không trả password=${!leaked}. Route register băm bcrypt.genSalt(10) rồi bcrypt.hash trước khi ghi users=${hashes}.`;
  fs.writeFileSync(path.join(EVIDENCE, 'TC_AUTH_008_test.log'), [
    'src/app/api/auth/register/route.ts',
    source.split('\n').slice(71, 85).join('\n'),
  ].join('\n'));
  writeJson('TC_AUTH_008', doc('TC_AUTH_008', 'Đăng ký Backer và băm bcrypt', status, [
    { endpoint: LIVE + '/api/auth/register', method: 'POST', response: { statusCode: registered.status, body } },
    { endpoint: LIVE + '/api/auth/callback/credentials', method: 'POST', response: { session: session.ok, role: session.user?.role } },
  ], verification, 'guest'));
  record('TC_AUTH_008', status, verification);
}

// TC_REWD_008
{
  const camp = await request('/api/campaigns/sach-giao-duc-vung-cao');
  const campaignId = camp.body?.id;
  const rewardRes = await request('/api/rewards', {
    method: 'POST', cookie: creator.cookie,
    json: { campaignId, title: 'Goi tai QA ' + Date.now(), description: 'File thu nghiem quyen tai', minAmount: 50000, fulfillmentType: 'DOWNLOAD' },
  });
  const rewardId = rewardRes.body?.id;
  const assetUrl = 'https://example.com/qa-ebook-' + Date.now() + '.pdf';
  const asset = rewardId ? await request('/api/rewards/' + rewardId + '/digital-assets', {
    method: 'POST', cookie: creator.cookie, json: { assetUrl, fileName: 'Sach_Dien_Tu.pdf' },
  }) : { status: 0, body: null };
  const pledge = rewardId ? await request('/api/payments', {
    method: 'POST', cookie: backer.cookie,
    json: { campaignId, rewardId, amount: 50000, paymentMethod: 'ONLINE', displayName: 'QA Kho Do' },
  }) : { status: 0, body: null };
  const pledgeId = pledge.body?.pledgeId || pledge.body?.id;
  const settle = pledgeId ? await request('/api/admin/pledges/' + pledgeId + '/settle', { method: 'POST', cookie: admin.cookie, json: {} }) : { status: 0, body: null };
  const warehouse = await request('/api/purchases/digital', { cookie: backer.cookie });
  const items = warehouse.body?.items || [];
  const mine = items.find((it) => it.pledgeId === pledgeId || it.asset?.assetUrl === assetUrl || it.reward?.id === rewardId);
  const granted = Boolean(mine && (mine.asset?.assetUrl || mine.availability === 'READY' || mine.asset?.status));
  const ok = asset.status === 201 && settle.body?.ok === true && granted;
  const status = ok ? 'PASS' : 'FAIL';
  const verification = `Reward HTTP ${rewardRes.status} id=${rewardId}. Asset HTTP ${asset.status} ${JSON.stringify(asset.body)}. Pledge HTTP ${pledge.status} id=${pledgeId}. Settle HTTP ${settle.status} ok=${settle.body?.ok}. Kho đồ HTTP ${warehouse.status} thấy quyền tải=${granted} item=${JSON.stringify(mine ? { availability: mine.availability, asset: mine.asset, href: mine.href } : null)}.`;
  writeJson('TC_REWD_008', doc('TC_REWD_008', 'Quà số và quyền tải sau thanh toán', status, [
    { endpoint: LIVE + '/api/rewards', method: 'POST', response: { statusCode: rewardRes.status, body: clip(rewardRes.body, 400) } },
    { endpoint: LIVE + '/api/rewards/' + rewardId + '/digital-assets', method: 'POST', response: { statusCode: asset.status, body: asset.body } },
    { endpoint: LIVE + '/api/payments', method: 'POST', response: { statusCode: pledge.status, body: clip(pledge.body, 500) } },
    { endpoint: LIVE + '/api/admin/pledges/' + pledgeId + '/settle', method: 'POST', response: { statusCode: settle.status, body: clip(settle.body, 400) } },
    { endpoint: LIVE + '/api/purchases/digital', method: 'GET', response: { statusCode: warehouse.status, matched: mine || null } },
  ], verification, 'creator'));
  record('TC_REWD_008', status, verification);
}

await browser.close();
fs.writeFileSync(path.join(ROOT, 'scratch', 'retest_partial.json'), JSON.stringify(results, null, 2));
