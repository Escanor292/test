// Re-test the cases that were PASS only because the HTTP code was in a loose list.
// Judges the response body against the Excel expected result. Does not delete other evidence.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LIVE = 'https://test-gamma-azure-65.vercel.app';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE = path.join(ROOT, '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');
const OUT = path.join(ROOT, 'scratch', 'rerun_remaining_real_summary.json');

const ACCOUNTS = {
  admin: { email: 'admin@crowdfunding.vn', password: 'Admin@123456' },
  creator: { email: 'test2@gmail.com', password: '123' },
  creator2: { email: 'test3@gmail.com', password: '123' },
  backer: { email: 'test1@gmail.com', password: '123' },
};

function stamp() { return new Date().toISOString(); }
function clip(value, n = 1800) {
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
  const session = await request('/api/auth/session', { cookie: posted.cookie, redirect: 'follow' });
  const user = session.body?.user || null;
  return { ok: Boolean(user?.email), email, user, posted, session, cookie: posted.cookie };
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
function evidenceDoc({ tid, description, status, req, res, verification, role }) {
  return {
    testCaseId: tid,
    description,
    status,
    executionTimestamp: stamp(),
    request: {
      endpoint: req.endpoint,
      method: req.method,
      authenticated: Boolean(req.authenticated),
      payload: req.payload ?? null,
    },
    response: { statusCode: res.status, location: res.location || null, body: clip(res.body) },
    verification,
    criteriaSource: 'Test Case_23CT113_Nhom02.xlsx > TC List > cột Kết quả mong đợi. Không nới mã HTTP.',
    role: role || 'guest',
  };
}
function textOf(body) {
  return typeof body === 'string' ? body : JSON.stringify(body || {});
}
const results = [];
function record(tid, status, verification) {
  results.push({ tid, status, verification });
  console.log(`${status.padEnd(4)} ${tid} ${verification}`);
}

const admin = await login(ACCOUNTS.admin.email, ACCOUNTS.admin.password);
console.log('admin', admin.ok, admin.user?.role);
let creator = await login(ACCOUNTS.creator.email, ACCOUNTS.creator.password);
if (!creator.ok || creator.user?.role === 'BACKER') {
  const alt = await login(ACCOUNTS.creator2.email, ACCOUNTS.creator2.password);
  if (alt.ok) creator = alt;
}
console.log('creator', creator.ok, creator.user?.email, creator.user?.role);
const backer = await login(ACCOUNTS.backer.email, ACCOUNTS.backer.password);
console.log('backer', backer.ok, backer.user?.email, backer.user?.role);

const longHtml = '<p>Noi dung chi tiet du de qua buoc kiem tra, khong keu goi tien that.</p>';

// TC_CAMP_003 — valid category, title, tagline; only goal is 0
{
  const payload = {
    title: 'QA von muc tieu bang 0',
    tagline: 'Mo ta ngan hop le de loi rot xuong buoc von.',
    description: longHtml,
    goalAmount: 0,
    category: 'Giáo dục',
    type: 'DONATION',
    fundingModel: 'ALL_OR_NOTHING',
  };
  const actor = creator.ok ? creator : admin;
  const res = await request('/api/campaigns', { method: 'POST', cookie: actor.cookie, json: payload });
  const msg = textOf(res.body);
  const pass = res.status === 400 && msg.includes('So von muc tieu khong hop le');
  const verification = pass
    ? `HTTP 400 đúng câu "So von muc tieu khong hop le". Danh mục Giáo dục, tiêu đề và mô tả ngắn đã điền.`
    : `Không đúng câu vốn mục tiêu. HTTP ${res.status} ${msg.slice(0, 300)}`;
  writeJson('TC_CAMP_003', evidenceDoc({
    tid: 'TC_CAMP_003', description: 'Từ chối tạo chiến dịch khi vốn mục tiêu <= 0', status: pass ? 'PASS' : 'FAIL', role: actor.user?.role || 'creator',
    req: { endpoint: LIVE + '/api/campaigns', method: 'POST', authenticated: true, payload }, res, verification,
  }));
  record('TC_CAMP_003', pass ? 'PASS' : 'FAIL', verification);
}

// TC_CAMP_004 — valid category, empty title
{
  const payload = {
    title: '',
    tagline: 'Mo ta ngan van co, de loi rot xuong tieu de.',
    description: longHtml,
    goalAmount: 5000000,
    category: 'Giáo dục',
    type: 'DONATION',
    fundingModel: 'ALL_OR_NOTHING',
  };
  const actor = creator.ok ? creator : admin;
  const res = await request('/api/campaigns', { method: 'POST', cookie: actor.cookie, json: payload });
  const msg = textOf(res.body);
  const pass = res.status === 400 && msg.includes('Ten chien dich la bat buoc');
  const verification = pass
    ? `HTTP 400 đúng câu "Ten chien dich la bat buoc". Danh mục đã hợp lệ, chỉ để trống tiêu đề.`
    : `Không đúng câu tiêu đề bắt buộc. HTTP ${res.status} ${msg.slice(0, 300)}`;
  writeJson('TC_CAMP_004', evidenceDoc({
    tid: 'TC_CAMP_004', description: 'Từ chối tạo chiến dịch khi để trống tiêu đề', status: pass ? 'PASS' : 'FAIL', role: actor.user?.role || 'creator',
    req: { endpoint: LIVE + '/api/campaigns', method: 'POST', authenticated: true, payload }, res, verification,
  }));
  record('TC_CAMP_004', pass ? 'PASS' : 'FAIL', verification);
}

// TC_KYC_006 — fresh backer, identity filled, org missing MST and license
{
  const fresh = await registerBacker('KYC To Chuc QA');
  const payload = {
    type: 'organization',
    fullName: 'Nguyen Thi To Chuc',
    idCardNumber: '079123456789',
    idCardFrontImage: 'https://placehold.co/600x400.png?text=QA-FRONT',
    idCardBackImage: 'https://placehold.co/600x400.png?text=QA-BACK',
    companyName: 'To Chuc Thien Nguyen QA',
    taxCode: '',
    businessLicense: '',
  };
  const res = fresh.ok
    ? await request('/api/user/upgrade-creator', { method: 'POST', cookie: fresh.cookie, json: payload })
    : { status: 0, body: { error: 'khong dang nhap duoc', register: fresh.registered?.status } };
  const msg = textOf(res.body);
  const pass = res.status === 400 && msg.includes('Doanh nghiep can MST hoac giay DKKD');
  const verification = pass
    ? `HTTP 400 đúng câu "Doanh nghiep can MST hoac giay DKKD". Đã có họ tên, số giấy tờ và ảnh CCCD. Tài khoản ${fresh.email}.`
    : `Không đúng câu MST/ĐKKD. HTTP ${res.status} ${msg.slice(0, 300)}`;
  writeJson('TC_KYC_006', evidenceDoc({
    tid: 'TC_KYC_006', description: 'Từ chối hồ sơ tổ chức khi thiếu MST và ĐKKD', status: pass ? 'PASS' : 'FAIL', role: 'backer',
    req: { endpoint: LIVE + '/api/user/upgrade-creator', method: 'POST', authenticated: true, payload: { ...payload, email: fresh.email } }, res, verification,
  }));
  record('TC_KYC_006', pass ? 'PASS' : 'FAIL', verification);
}

// TC_KYC_007 — read status of an account that actually has a KYC row
{
  const probes = [creator, backer, admin].filter((s) => s.ok);
  let chosen = null;
  let res = null;
  for (const session of probes) {
    const got = await request('/api/kyc/status', { cookie: session.cookie, redirect: 'follow' });
    if (got.body?.kyc?.status) { chosen = session; res = got; break; }
    if (!res) { chosen = session; res = got; }
  }
  if (!res?.body?.kyc?.status) {
    const person = await registerBacker('KYC Status QA');
    if (person.ok) {
      await request('/api/user/upgrade-creator', {
        method: 'POST', cookie: person.cookie,
        json: {
          type: 'PERSONAL', fullName: 'KYC Status QA', idCardNumber: '079000000111',
          idCardFrontImage: 'https://placehold.co/600x400.png?text=QA-FRONT',
          idCardBackImage: 'https://placehold.co/600x400.png?text=QA-BACK',
        },
      });
      res = await request('/api/kyc/status', { cookie: person.cookie, redirect: 'follow' });
      chosen = person;
    }
  }
  const statusValue = res?.body?.kyc?.status || null;
  const allowed = ['NOT_SUBMITTED', 'PENDING', 'VERIFIED'];
  const pass = res?.status === 200 && allowed.includes(statusValue);
  const verification = pass
    ? `HTTP 200, kyc.status=${statusValue}, tài khoản ${chosen?.email || chosen?.user?.email}.`
    : `Không có trạng thái KYC trong body. HTTP ${res?.status} ${textOf(res?.body).slice(0, 300)}`;
  writeJson('TC_KYC_007', evidenceDoc({
    tid: 'TC_KYC_007', description: 'Truy vấn trạng thái KYC', status: pass ? 'PASS' : 'FAIL', role: chosen?.user?.role || 'backer',
    req: { endpoint: LIVE + '/api/kyc/status', method: 'GET', authenticated: true, payload: { email: chosen?.email || chosen?.user?.email } },
    res: res || { status: 0, body: null }, verification,
  }));
  record('TC_KYC_007', pass ? 'PASS' : 'FAIL', verification);
}

// Own a real campaign before the reward test
let ownedCampaignId = null;
{
  const actor = creator.ok ? creator : admin;
  const mine = await request('/api/rewards/my', { cookie: actor.cookie, redirect: 'follow' });
  const rewards = mine.body?.rewards || mine.body?.items || (Array.isArray(mine.body) ? mine.body : []);
  ownedCampaignId = rewards.find((r) => r.campaignId)?.campaignId || null;
  if (!ownedCampaignId) {
    const created = await request('/api/campaigns', {
      method: 'POST', cookie: actor.cookie,
      json: {
        title: `QA reward owner ${Date.now()}`,
        tagline: 'Chiến dịch chỉ để giữ campaignId của chính creator.',
        description: longHtml,
        goalAmount: 3000000,
        category: 'Giáo dục',
        type: 'DONATION',
        fundingModel: 'ALL_OR_NOTHING',
      },
    });
    ownedCampaignId = created.body?.id || created.body?.campaign?.id || null;
    console.log(' created owner campaign', created.status, ownedCampaignId);
  }
}

// TC_REWD_001 — real campaign, minAmount 0 and then -1
{
  const actor = creator.ok ? creator : admin;
  const base = {
    title: 'Goi QA so tien toi thieu',
    description: 'Kiem thu minAmount khong duoc nho hon hoac bang 0',
    campaignId: ownedCampaignId,
    fulfillmentType: 'DOWNLOAD',
  };
  const zero = await request('/api/rewards', { method: 'POST', cookie: actor.cookie, json: { ...base, minAmount: 0 } });
  const negative = await request('/api/rewards', { method: 'POST', cookie: actor.cookie, json: { ...base, title: 'Goi QA am', minAmount: -1 } });
  const zeroMsg = textOf(zero.body);
  const negMsg = textOf(negative.body);
  const zeroRejected = zero.status === 400 && !zero.body?.id;
  const negativeRejected = negative.status >= 400 && !negative.body?.id;
  const mentionsAmount = /toi thieu|minAmount|lon hon 0|Missing required fields/i.test(zeroMsg + negMsg);
  const pass = Boolean(ownedCampaignId) && zeroRejected && negativeRejected && mentionsAmount;
  if (negative.body?.id) {
    await request(`/api/rewards/${negative.body.id}`, { method: 'DELETE', cookie: actor.cookie });
  }
  const verification = pass
    ? `campaignId ${ownedCampaignId}. minAmount=0 → HTTP ${zero.status} ${zeroMsg.slice(0, 140)}. minAmount=-1 → HTTP ${negative.status} ${negMsg.slice(0, 140)}. Không tạo được gói.`
    : `Không chứng minh được từ chối mọi mức <= 0. campaignId=${ownedCampaignId}. 0: HTTP ${zero.status} ${zeroMsg.slice(0, 180)}. -1: HTTP ${negative.status} ${negMsg.slice(0, 180)}`;
  writeJson('TC_REWD_001', evidenceDoc({
    tid: 'TC_REWD_001', description: 'Từ chối phần thưởng khi minAmount <= 0', status: pass ? 'PASS' : 'FAIL', role: actor.user?.role || 'creator',
    req: { endpoint: LIVE + '/api/rewards', method: 'POST', authenticated: true, payload: { ...base, minAmount: 0, alsoTried: -1 } },
    res: { status: zero.status, body: { zero: zero.body, negative: { status: negative.status, body: negative.body } } },
    verification,
  }));
  record('TC_REWD_001', pass ? 'PASS' : 'FAIL', verification);
}

// TC_PLED_003 — pledge against a real FAILED or SUCCESS campaign, not a made-up id
{
  let campaign = null;
  for (const status of ['FAILED', 'SUCCESS']) {
    const list = await request(`/api/campaigns?status=${status}&limit=5`);
    const item = list.body?.items?.[0];
    if (item?.id) { campaign = { ...item, queriedStatus: status }; break; }
  }
  const payload = {
    campaignId: campaign?.id || null,
    amount: 50000,
    paymentMethod: 'ONLINE',
    displayName: 'QA Closed Campaign',
    guestEmail: 'qa.closed.pledge@crowdfunding.vn',
  };
  const res = campaign
    ? await request('/api/payments', { method: 'POST', cookie: backer.cookie, json: payload })
    : { status: 0, body: { error: 'Khong tim thay chien dich FAILED/SUCCESS' } };
  const msg = textOf(res.body);
  const notMissingOnly = campaign && !/^\{"error":"Chiến dịch không tồn tại"\}$/.test(msg.trim()) && msg.includes('chưa mở nhận ủng hộ');
  const pass = Boolean(campaign) && res.status >= 400 && notMissingOnly && campaign.status !== 'ACTIVE';
  const verification = pass
    ? `Chiến dịch thật ${campaign.id} "${campaign.title}" status=${campaign.status}. Từ chối ủng hộ HTTP ${res.status}: ${msg.slice(0, 220)}`
    : `Không chứng minh chiến dịch đã đóng. HTTP ${res.status} ${msg.slice(0, 260)} campaign=${JSON.stringify(campaign && { id: campaign.id, status: campaign.status, title: campaign.title })}`;
  writeJson('TC_PLED_003', evidenceDoc({
    tid: 'TC_PLED_003', description: 'Từ chối ủng hộ khi chiến dịch đã đóng', status: pass ? 'PASS' : 'FAIL', role: backer.ok ? 'backer' : 'guest',
    req: { endpoint: LIVE + '/api/payments', method: 'POST', authenticated: backer.ok, payload }, res, verification,
  }));
  record('TC_PLED_003', pass ? 'PASS' : 'FAIL', verification);
}

// TC_COMM_008 — new account follows once
{
  const fan = await registerBacker('Follow QA');
  const res = fan.ok
    ? await request('/api/campaigns/sach-giao-duc-vung-cao/follow', { method: 'POST', cookie: fan.cookie, json: {} })
    : { status: 0, body: { error: 'khong dang nhap duoc' } };
  const msg = textOf(res.body);
  const pass = res.status === 200 && msg.includes('Đã thêm vào danh sách quan tâm') && res.body?.isFollowing === true;
  const verification = pass
    ? `Tài khoản mới ${fan.email} follow lần đầu. HTTP 200: ${msg.slice(0, 180)}`
    : `Không phải lượt follow mới. HTTP ${res.status} ${msg.slice(0, 220)}`;
  writeJson('TC_COMM_008', evidenceDoc({
    tid: 'TC_COMM_008', description: 'Follow chiến dịch lần đầu', status: pass ? 'PASS' : 'FAIL', role: 'backer',
    req: { endpoint: LIVE + '/api/campaigns/sach-giao-duc-vung-cao/follow', method: 'POST', authenticated: true, payload: { email: fan.email } },
    res, verification,
  }));
  record('TC_COMM_008', pass ? 'PASS' : 'FAIL', verification);
}

// TC_COMM_009 — backer who already has a pledge posts a review; check whether average changes
{
  const before = await request('/api/campaigns/sach-giao-duc-vung-cao');
  const beforeAvg = before.body?.ratingAverage ?? before.body?.campaign?.ratingAverage ?? null;
  const payload = { rating: 4, comment: `QA danh gia that ${Date.now()}` };
  const res = backer.ok
    ? await request('/api/campaigns/sach-giao-duc-vung-cao/reviews', { method: 'POST', cookie: backer.cookie, json: payload })
    : { status: 0, body: { error: 'khong dang nhap backer' } };
  const after = await request('/api/campaigns/sach-giao-duc-vung-cao');
  const afterAvg = after.body?.ratingAverage ?? after.body?.campaign?.ratingAverage ?? null;
  const saved = res.status === 200 || res.status === 201;
  const hasId = Boolean(res.body?.id);
  const averageMoved = beforeAvg != null && afterAvg != null && beforeAvg !== afterAvg;
  const pass = saved && hasId && averageMoved;
  const verification = pass
    ? `Backer ${backer.user?.email} tạo review ${res.body.id}. ratingAverage ${beforeAvg} → ${afterAvg}.`
    : `Review HTTP ${res.status} id=${res.body?.id || 'không'}. ratingAverage trước=${beforeAvg} sau=${afterAvg}. ${saved && hasId ? 'Đã lưu review nhưng điểm trung bình không đổi.' : textOf(res.body).slice(0, 180)}`;
  writeJson('TC_COMM_009', evidenceDoc({
    tid: 'TC_COMM_009', description: 'Backer đã ủng hộ gửi đánh giá', status: pass ? 'PASS' : 'FAIL', role: 'backer',
    req: { endpoint: LIVE + '/api/campaigns/sach-giao-duc-vung-cao/reviews', method: 'POST', authenticated: true, payload },
    res: { status: res.status, body: { review: res.body, ratingAverageBefore: beforeAvg, ratingAverageAfter: afterAvg } },
    verification,
  }));
  record('TC_COMM_009', pass ? 'PASS' : 'FAIL', verification);
}

// TC_COMM_010 — logged-in user who has never pledged
{
  const stranger = await registerBacker('Chua Ung Ho QA');
  const payload = { rating: 1, comment: 'QA chua tung ung ho, khong duoc phep danh gia' };
  const res = stranger.ok
    ? await request('/api/campaigns/sach-giao-duc-vung-cao/reviews', { method: 'POST', cookie: stranger.cookie, json: payload })
    : { status: 0, body: { error: 'khong dang nhap duoc' } };
  const msg = textOf(res.body);
  const rejected = res.status === 401 || res.status === 403;
  const explains = /ủng hộ|ung ho|pledge|đã nhận|chua tung/i.test(msg);
  const pass = stranger.ok && rejected && explains && !res.body?.id;
  const verification = pass
    ? `User mới ${stranger.email} bị từ chối HTTP ${res.status}: ${msg.slice(0, 200)}`
    : `User đã đăng nhập ${stranger.email || ''} nhưng không bị chặn vì chưa ủng hộ. HTTP ${res.status} ${msg.slice(0, 240)}`;
  writeJson('TC_COMM_010', evidenceDoc({
    tid: 'TC_COMM_010', description: 'Chặn đánh giá khi chưa từng ủng hộ', status: pass ? 'PASS' : 'FAIL', role: 'backer',
    req: { endpoint: LIVE + '/api/campaigns/sach-giao-duc-vung-cao/reviews', method: 'POST', authenticated: true, payload: { ...payload, email: stranger.email } },
    res, verification,
  }));
  record('TC_COMM_010', pass ? 'PASS' : 'FAIL', verification);
}

// Pages: real status code, no injected banner
process.env.PLAYWRIGHT_BROWSERS_PATH = '/opt/pw-browsers';
const playwright = await import('/tmp/pw/node_modules/playwright/index.js');
const browser = await playwright.chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

async function shoot(tid, urlPath, description, expect404) {
  const response = await page.goto(LIVE + urlPath, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1200);
  const status = response?.status() ?? 0;
  const bodyText = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 240);
  const shot = path.join(EVIDENCE, `${tid}.png`);
  await page.screenshot({ path: shot });
  const pass = expect404 ? status === 404 : status === 200 && !/404|could not be found|không tồn tại/i.test(bodyText);
  return { status, bodyText, shot, pass };
}

{
  const pageRes = await shoot('TC_BLOG_004', '/blog/bai-viet-khong-ton-tai-999', 'blog missing', true);
  const pass = pageRes.status === 404;
  const verification = pass
    ? `GET /blog/bai-viet-khong-ton-tai-999 trả HTTP 404. Ảnh không gắn banner.`
    : `Trang có chữ 404 nhưng mã HTTP là ${pageRes.status}, không phải 404. ${pageRes.bodyText}`;
  writeJson('TC_BLOG_004', evidenceDoc({
    tid: 'TC_BLOG_004', description: 'Trang bài viết không tồn tại', status: pass ? 'PASS' : 'FAIL', role: 'guest',
    req: { endpoint: LIVE + '/blog/bai-viet-khong-ton-tai-999', method: 'GET', payload: null },
    res: { status: pageRes.status, body: pageRes.bodyText }, verification,
  }));
  record('TC_BLOG_004', pass ? 'PASS' : 'FAIL', verification);
}

{
  const pageRes = await shoot('TC_CERT_005', '/chung-tu/CT-INVALID-999', 'bad certificate', true);
  const pass = pageRes.status === 404;
  const verification = pass
    ? `GET /chung-tu/CT-INVALID-999 trả HTTP 404.`
    : `Trang chứng từ mã sai trả HTTP ${pageRes.status}, không phải 404. ${pageRes.bodyText}`;
  writeJson('TC_CERT_005', evidenceDoc({
    tid: 'TC_CERT_005', description: 'Mã chứng nhận không tồn tại', status: pass ? 'PASS' : 'FAIL', role: 'guest',
    req: { endpoint: LIVE + '/chung-tu/CT-INVALID-999', method: 'GET', payload: null },
    res: { status: pageRes.status, body: pageRes.bodyText }, verification,
  }));
  record('TC_CERT_005', pass ? 'PASS' : 'FAIL', verification);
}

{
  const pageRes = await shoot('TC_CERT_007', '/hoa-don/HD-INVALID-999', 'bad invoice', true);
  const pass = pageRes.status === 404;
  const verification = pass
    ? `GET /hoa-don/HD-INVALID-999 trả HTTP 404.`
    : `Trang hóa đơn số sai trả HTTP ${pageRes.status}, không phải 404. ${pageRes.bodyText}`;
  writeJson('TC_CERT_007', evidenceDoc({
    tid: 'TC_CERT_007', description: 'Số hóa đơn không tồn tại', status: pass ? 'PASS' : 'FAIL', role: 'guest',
    req: { endpoint: LIVE + '/hoa-don/HD-INVALID-999', method: 'GET', payload: null },
    res: { status: pageRes.status, body: pageRes.bodyText }, verification,
  }));
  record('TC_CERT_007', pass ? 'PASS' : 'FAIL', verification);
}

{
  let invoiceHref = null;
  let lookupBody = null;
  for (const code of ['TT-UH-202611-TRRR', 'TT-UH-202611-9Q49']) {
    const looked = await request(`/api/lookup?code=${encodeURIComponent(code)}`);
    lookupBody = looked.body;
    if (looked.body?.invoiceHref) { invoiceHref = looked.body.invoiceHref; break; }
  }
  if (!invoiceHref) {
    const response = await page.goto(LIVE + '/hoa-don/HD-INVALID-999', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(800);
    const status = response?.status() ?? 0;
    const bodyText = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 240);
    await page.screenshot({ path: path.join(EVIDENCE, 'TC_CERT_006.png') });
    const verification = `Không tìm thấy hóa đơn GTGT từ mã chứng nhận đã biết. Trang /hoa-don/HD-INVALID-999 HTTP ${status}. ${bodyText}`;
    writeJson('TC_CERT_006', evidenceDoc({
      tid: 'TC_CERT_006', description: 'Hiển thị hóa đơn điện tử', status: 'FAIL', role: 'guest',
      req: { endpoint: LIVE + '/hoa-don/HD-INVALID-999', method: 'GET', payload: { lookupTried: lookupBody } },
      res: { status, body: bodyText }, verification,
    }));
    record('TC_CERT_006', 'FAIL', verification);
  } else {
    const response = await page.goto(LIVE + invoiceHref, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1200);
    const status = response?.status() ?? 0;
    const bodyText = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 400);
    await page.screenshot({ path: path.join(EVIDENCE, 'TC_CERT_006.png') });
    const pass = status === 200 && /hóa đơn|hoa don|GTGT/i.test(bodyText) && /\d/.test(bodyText);
    const verification = pass
      ? `Mở đúng ${invoiceHref}. HTTP ${status}. Có nội dung hóa đơn: ${bodyText.slice(0, 180)}`
      : `Mở ${invoiceHref} HTTP ${status} nhưng không thấy hóa đơn. ${bodyText}`;
    writeJson('TC_CERT_006', evidenceDoc({
      tid: 'TC_CERT_006', description: 'Hiển thị hóa đơn điện tử', status: pass ? 'PASS' : 'FAIL', role: 'guest',
      req: { endpoint: LIVE + invoiceHref, method: 'GET', payload: null },
      res: { status, body: bodyText }, verification,
    }));
    record('TC_CERT_006', pass ? 'PASS' : 'FAIL', verification);
  }
}

{
  const response = await page.goto(LIVE + '/chat', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1000);
  const status = response?.status() ?? 0;
  const finalUrl = page.url();
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_CHAT_001.png') });
  const pass = /\/auth\/login/.test(finalUrl) && finalUrl.includes('callbackUrl');
  const verification = pass
    ? `Vào /chat khi chưa đăng nhập thì tới ${finalUrl}. HTTP của response cuối ${status}. Ảnh không gắn banner.`
    : `Không chuyển tới trang đăng nhập. URL ${finalUrl} HTTP ${status}`;
  writeJson('TC_CHAT_001', evidenceDoc({
    tid: 'TC_CHAT_001', description: 'Chưa đăng nhập vào /chat thì chuyển login', status: pass ? 'PASS' : 'FAIL', role: 'guest',
    req: { endpoint: LIVE + '/chat', method: 'GET', payload: null },
    res: { status, location: finalUrl, body: finalUrl }, verification,
  }));
  record('TC_CHAT_001', pass ? 'PASS' : 'FAIL', verification);
}

await browser.close();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ at: stamp(), results }, null, 2));
console.log('WROTE', OUT);
