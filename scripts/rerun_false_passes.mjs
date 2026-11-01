// Re-run only the cases whose PASS/FAIL label did not match the response body.
// Hits https://test-gamma-azure-65.vercel.app. Does not delete other evidence.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LIVE = 'https://test-gamma-azure-65.vercel.app';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE = path.join(ROOT, '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');
const OUT = path.join(ROOT, 'scratch', 'rerun_false_passes_summary.json');

const ACCOUNTS = {
  admin: { email: 'admin@crowdfunding.vn', password: 'Admin@123456' },
  creator: { email: 'test2@gmail.com', password: '123' },
  creator2: { email: 'test3@gmail.com', password: '123' },
  backer: { email: 'test1@gmail.com', password: '123' },
};

function stamp() {
  return new Date().toISOString();
}

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
  const response = await fetch(urlPath.startsWith('http') ? urlPath : LIVE + urlPath, {
    method,
    headers,
    body,
    redirect,
  });
  const raw = await response.text();
  let parsed = null;
  try { parsed = raw ? JSON.parse(raw) : null; } catch { parsed = raw ? raw.slice(0, 1500) : null; }
  const nextCookie = cookieHeaderFromSetCookie(setCookieList(response), cookie);
  return {
    status: response.status,
    location: response.headers.get('location'),
    setCookies: setCookieList(response).map((c) => c.split(';')[0]),
    cookie: nextCookie,
    body: parsed,
    raw: raw.slice(0, 1500),
  };
}

async function login(email, password) {
  const csrf = await request('/api/auth/csrf');
  const token = csrf.body?.csrfToken;
  if (!token) return { ok: false, error: 'no csrf', csrf };
  const posted = await request('/api/auth/callback/credentials', {
    method: 'POST',
    cookie: csrf.cookie,
    form: {
      csrfToken: token,
      email,
      password,
      callbackUrl: LIVE + '/',
      json: 'true',
    },
  });
  const session = await request('/api/auth/session', { cookie: posted.cookie, redirect: 'follow' });
  const user = session.body?.user || null;
  return { ok: Boolean(user?.email), email, user, posted, session, cookie: posted.cookie };
}

function writeJson(tid, payload) {
  const file = path.join(EVIDENCE, `${tid}_response.json`);
  fs.writeFileSync(file, JSON.stringify(payload, null, 2));
  return file;
}

function record(results, tid, status, detail) {
  results.push({ tid, status, ...detail });
  console.log(`${status.padEnd(4)} ${tid} ${detail.verification || ''}`);
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
    response: {
      statusCode: res.status,
      location: res.location || null,
      body: clip(res.body),
    },
    verification,
    criteriaSource: 'Test Case_23CT113_Nhom02.xlsx > TC List > cột Kết quả mong đợi. Không nới mã HTTP.',
    role: role || 'guest',
  };
}

const results = [];

console.log('login admin');
const admin = await login(ACCOUNTS.admin.email, ACCOUNTS.admin.password);
console.log(' admin', admin.ok, admin.user?.email, admin.user?.role, 'http', admin.posted?.status);
console.log('login creator test2');
let creator = await login(ACCOUNTS.creator.email, ACCOUNTS.creator.password);
console.log(' creator2', creator.ok, creator.user?.email, creator.user?.role);
if (!creator.ok) {
  creator = await login(ACCOUNTS.creator2.email, ACCOUNTS.creator2.password);
  console.log(' creator3 fallback', creator.ok, creator.user?.email, creator.user?.role);
}
console.log('login backer');
const backer = await login(ACCOUNTS.backer.email, ACCOUNTS.backer.password);
console.log(' backer', backer.ok, backer.user?.email, backer.user?.role);

// --- TC_AUTH_002 / 003: real CSRF form login, judge by session ---
{
  const good = admin;
  const pass = good.ok && good.user?.email === ACCOUNTS.admin.email;
  const verification = pass
    ? `Đăng nhập thật: /api/auth/session trả user ${good.user.email} role ${good.user.role || ''}`
    : `Không có session sau callback. HTTP ${good.posted?.status} location ${good.posted?.location || ''} body ${JSON.stringify(good.posted?.body)?.slice(0, 240)}`;
  writeJson('TC_AUTH_002', evidenceDoc({
    tid: 'TC_AUTH_002',
    description: 'Đăng nhập thông tin hợp lệ',
    status: pass ? 'PASS' : 'FAIL',
    role: 'guest',
    req: { endpoint: LIVE + '/api/auth/callback/credentials', method: 'POST', authenticated: false, payload: { email: ACCOUNTS.admin.email, password: '[REDACTED]', csrfToken: '[REAL]', json: true } },
    res: { status: good.posted?.status || 0, location: good.posted?.location, body: { callback: good.posted?.body, sessionUser: good.user ? { email: good.user.email, role: good.user.role, id: good.user.id } : null } },
    verification,
  }));
  record(results, 'TC_AUTH_002', pass ? 'PASS' : 'FAIL', { verification });
}

{
  const csrf = await request('/api/auth/csrf');
  const posted = await request('/api/auth/callback/credentials', {
    method: 'POST',
    cookie: csrf.cookie,
    form: {
      csrfToken: csrf.body?.csrfToken || '',
      email: ACCOUNTS.admin.email,
      password: 'WrongPassword@999',
      callbackUrl: LIVE + '/auth/login',
      json: 'true',
    },
  });
  const session = await request('/api/auth/session', { cookie: posted.cookie, redirect: 'follow' });
  const blob = `${posted.location || ''} ${typeof posted.body === 'string' ? posted.body : JSON.stringify(posted.body || {})}`;
  const rejected = /CredentialsSignin|error=/i.test(blob) && !session.body?.user;
  const verification = rejected
    ? `Sai mật khẩu không cấp session. Redirect/body có CredentialsSignin. HTTP ${posted.status}`
    : `Không chứng minh được từ chối CredentialsSignin. HTTP ${posted.status} location ${posted.location} session=${JSON.stringify(session.body)?.slice(0, 180)}`;
  writeJson('TC_AUTH_003', evidenceDoc({
    tid: 'TC_AUTH_003',
    description: 'Từ chối đăng nhập sai mật khẩu',
    status: rejected ? 'PASS' : 'FAIL',
    role: 'guest',
    req: { endpoint: LIVE + '/api/auth/callback/credentials', method: 'POST', payload: { email: ACCOUNTS.admin.email, password: 'WrongPassword@999', csrfToken: '[REAL]' } },
    res: posted,
    verification,
  }));
  record(results, 'TC_AUTH_003', rejected ? 'PASS' : 'FAIL', { verification });
}

// --- TC_AUTH_009: same response for missing email means DB insert is not shown ---
{
  const known = await request('/api/auth/forgot-password', { method: 'POST', json: { email: ACCOUNTS.admin.email } });
  const missing = await request('/api/auth/forgot-password', { method: 'POST', json: { email: `khong-co-${Date.now()}@crowdfunding.vn` } });
  const same = JSON.stringify(known.body) === JSON.stringify(missing.body);
  const revealed = JSON.stringify(known.body || {}).includes('debugResetUrl') || JSON.stringify(known.body || {}).toLowerCase().includes('token');
  const pass = revealed && !same;
  const verification = pass
    ? 'Response có token/debugResetUrl, phân biệt được email tồn tại'
    : `HTTP ${known.status} body giống email không tồn tại (${same}). Không thấy token SHA-256. Không chứng minh được dòng trong password_reset_tokens.`;
  writeJson('TC_AUTH_009', evidenceDoc({
    tid: 'TC_AUTH_009',
    description: 'Yêu cầu token khôi phục mật khẩu',
    status: pass ? 'PASS' : 'FAIL',
    req: { endpoint: LIVE + '/api/auth/forgot-password', method: 'POST', payload: { email: ACCOUNTS.admin.email } },
    res: known,
    verification,
  }));
  record(results, 'TC_AUTH_009', pass ? 'PASS' : 'FAIL', { verification });
}

// --- TC_KYC_009: register backer, submit fake fixture KYC, admin approves that row only ---
{
  const email = `kyc.rerun.${Date.now()}@crowdfunding.vn`;
  const password = 'ValidPassword@123';
  const registered = await request('/api/auth/register', {
    method: 'POST',
    json: { name: 'KYC Rerun QA', email, password, confirmPassword: password, acceptTerms: true },
  });
  const kycUser = await login(email, password);
  const submitted = kycUser.ok ? await request('/api/user/upgrade-creator', {
    method: 'POST',
    cookie: kycUser.cookie,
    json: {
      type: 'PERSONAL',
      fullName: 'KYC Rerun QA',
      idCardNumber: '000000009999',
      idCardFrontImage: 'https://placehold.co/600x400.png?text=QA-FRONT',
      idCardBackImage: 'https://placehold.co/600x400.png?text=QA-BACK',
    },
  }) : { status: 0, body: { error: 'login failed', register: registered.body } };
  let review = { status: 0, body: null };
  let matched = null;
  if (admin.ok && submitted.status && submitted.status < 300) {
    const list = await request('/api/admin/kyc', { cookie: admin.cookie, redirect: 'follow' });
    const items = list.body?.items || [];
    matched = items.find((row) => row.user?.email === email);
    if (matched?.id) {
      review = await request(`/api/admin/kyc/${matched.id}/review`, {
        method: 'PATCH',
        cookie: admin.cookie,
        json: { action: 'APPROVE' },
      });
    } else {
      review = { status: list.status, body: { error: 'Khong thay ho so vua nop', listStatus: list.status, count: items.length } };
    }
  }
  const pass = review.body?.status === 'VERIFIED' && review.body?.role === 'CREATOR';
  const verification = pass
    ? `Đã duyệt hồ sơ ${matched.id}: verificationStatus=VERIFIED, role=CREATOR`
    : `Không đạt tiêu chí duyệt + đổi role. register HTTP ${registered.status}; submit HTTP ${submitted.status}; review HTTP ${review.status} body ${JSON.stringify(review.body)?.slice(0, 300)}`;
  writeJson('TC_KYC_009', evidenceDoc({
    tid: 'TC_KYC_009',
    description: 'Admin phê duyệt hồ sơ KYC',
    status: pass ? 'PASS' : 'FAIL',
    role: 'admin',
    req: { endpoint: matched ? `${LIVE}/api/admin/kyc/${matched.id}/review` : LIVE + '/api/admin/kyc', method: 'PATCH', authenticated: true, payload: { action: 'APPROVE', email } },
    res: review.status ? review : submitted,
    verification,
  }));
  record(results, 'TC_KYC_009', pass ? 'PASS' : 'FAIL', { verification });
}

const campaignBody = (title) => ({
  title,
  tagline: 'Mo ta ngan chien dich kiem thu lai, khong keu goi tien that.',
  description: '<p>Noi dung chi tiet chien dich do script kiem thu tao ra de kiem tra lai ket qua PASS gia. Khong dung chien dich cua nguoi dung khac.</p>',
  goalAmount: 5000000,
  category: 'Giáo dục',
  type: 'DONATION',
  fundingModel: 'ALL_OR_NOTHING',
});

async function createCampaign(cookie, title) {
  return request('/api/campaigns', { method: 'POST', cookie, json: campaignBody(title) });
}

// --- TC_CAMP_005: valid category so the banned-word check is actually reached ---
{
  const actor = creator.ok ? creator : admin;
  const created = actor.ok ? await createCampaign(actor.cookie, `QA cam tu_cam_moi_2026 ${Date.now()}`) : { status: 0, body: { error: 'no actor' } };
  const text = JSON.stringify(created.body || {});
  const pass = created.status === 400 && /cấm|cam|banned/i.test(text);
  const verification = pass
    ? `HTTP 400 và thông báo từ cấm: ${text.slice(0, 220)}`
    : `Không chặn vì từ cấm. HTTP ${created.status} body ${text.slice(0, 300)}`;
  writeJson('TC_CAMP_005', evidenceDoc({
    tid: 'TC_CAMP_005',
    description: 'Từ chối chiến dịch chứa từ cấm',
    status: pass ? 'PASS' : 'FAIL',
    role: creator.ok ? 'creator' : 'admin',
    req: { endpoint: LIVE + '/api/campaigns', method: 'POST', authenticated: true, payload: { title: 'QA cam tu_cam_moi_2026', category: 'Giáo dục', goalAmount: 5000000 } },
    res: created,
    verification,
  }));
  record(results, 'TC_CAMP_005', pass ? 'PASS' : 'FAIL', { verification });
}

let campaignA = null;
// --- TC_CAMP_011 creator submit DRAFT -> PENDING_REVIEW ---
{
  if (!creator.ok) {
    const verification = 'Không đăng nhập được tài khoản Creator test2/test3 nên không gửi duyệt với vai Creator.';
    writeJson('TC_CAMP_011', evidenceDoc({
      tid: 'TC_CAMP_011', description: 'Creator gửi duyệt chiến dịch DRAFT', status: 'FAIL', role: 'creator',
      req: { endpoint: LIVE + '/api/campaigns', method: 'POST', payload: null },
      res: { status: creator.posted?.status || 0, body: creator.posted?.body },
      verification,
    }));
    record(results, 'TC_CAMP_011', 'FAIL', { verification });
  } else {
    const created = await createCampaign(creator.cookie, `QA gui duyet ${Date.now()}`);
    const slug = created.body?.slug || created.body?.campaign?.slug;
    const id = created.body?.id || created.body?.campaign?.id;
    campaignA = { id, slug, created };
    const submitted = id || slug
      ? await request(`/api/campaigns/${slug || id}/submit`, { method: 'POST', cookie: creator.cookie, json: {} })
      : { status: created.status, body: created.body };
    const pass = submitted.body?.status === 'PENDING_REVIEW';
    const verification = pass
      ? `Creator gửi duyệt, status=PENDING_REVIEW, slug=${slug}`
      : `Không ra PENDING_REVIEW. Tạo HTTP ${created.status} body ${JSON.stringify(created.body)?.slice(0, 240)}; submit HTTP ${submitted.status} body ${JSON.stringify(submitted.body)?.slice(0, 240)}`;
    writeJson('TC_CAMP_011', evidenceDoc({
      tid: 'TC_CAMP_011', description: 'Creator gửi duyệt chiến dịch DRAFT', status: pass ? 'PASS' : 'FAIL', role: 'creator',
      req: { endpoint: `${LIVE}/api/campaigns/${slug || id || ''}/submit`, method: 'POST', authenticated: true, payload: { title: created.body?.title || null } },
      res: submitted.status ? submitted : created,
      verification,
    }));
    record(results, 'TC_CAMP_011', pass ? 'PASS' : 'FAIL', { verification });
    if (pass) campaignA.pending = true;
  }
}

// --- TC_CAMP_013 approve the campaign this run just submitted ---
{
  const id = campaignA?.id;
  if (!admin.ok || !id || !campaignA?.pending) {
    const verification = 'Không có chiến dịch PENDING_REVIEW vừa tạo bởi Creator, nên không duyệt bừa chiến dịch có sẵn.';
    writeJson('TC_CAMP_013', evidenceDoc({
      tid: 'TC_CAMP_013', description: 'Admin duyệt chiến dịch sang ACTIVE', status: 'FAIL', role: 'admin',
      req: { endpoint: LIVE + '/api/admin/campaigns/' + (id || ''), method: 'PATCH', payload: { status: 'ACTIVE' } },
      res: { status: 0, body: { error: verification } },
      verification,
    }));
    record(results, 'TC_CAMP_013', 'FAIL', { verification });
  } else {
    const review = await request(`/api/admin/campaigns/${id}/review`, {
      method: 'PATCH', cookie: admin.cookie, json: { status: 'ACTIVE', reviewerNote: 'QA rerun duyet chien dich vua tao' },
    });
    const pass = review.status < 300 && review.body?.campaign?.status === 'ACTIVE';
    const verification = pass
      ? `Chiến dịch ${id} chuyển ACTIVE`
      : `Không chuyển ACTIVE. HTTP ${review.status} body ${JSON.stringify(review.body)?.slice(0, 300)}`;
    writeJson('TC_CAMP_013', evidenceDoc({
      tid: 'TC_CAMP_013', description: 'Admin duyệt chiến dịch sang ACTIVE', status: pass ? 'PASS' : 'FAIL', role: 'admin',
      req: { endpoint: `${LIVE}/api/admin/campaigns/${id}/review`, method: 'PATCH', authenticated: true, payload: { status: 'ACTIVE' } },
      res: review,
      verification,
    }));
    record(results, 'TC_CAMP_013', pass ? 'PASS' : 'FAIL', { verification });
    if (pass) campaignA.active = true;
  }
}

// --- rewards on campaign A ---
let reward = null;
if (creator.ok && campaignA?.id && campaignA.active) {
  reward = await request('/api/rewards', {
    method: 'POST',
    cookie: creator.cookie,
    json: {
      title: 'Goi QA tai',
      description: 'Goi phan thuong tao de kiem thu lai',
      minAmount: 200000,
      campaignId: campaignA.id,
      fulfillmentType: 'DOWNLOAD',
      quantity: 20,
    },
  });
  console.log(' reward', reward.status, reward.body?.id || JSON.stringify(reward.body)?.slice(0, 180));
}

{
  const id = reward?.body?.id;
  if (!id) {
    const verification = 'Không tạo được phần thưởng của chính Creator nên không tắt gói. Không dùng id giả.';
    writeJson('TC_REWD_004', evidenceDoc({
      tid: 'TC_REWD_004', description: 'Tắt kích hoạt gói phần thưởng', status: 'FAIL', role: 'creator',
      req: { endpoint: LIVE + '/api/rewards', method: 'POST', payload: reward?.body || null },
      res: reward || { status: 0, body: null },
      verification,
    }));
    record(results, 'TC_REWD_004', 'FAIL', { verification });
  } else {
    const toggled = await request(`/api/rewards/${id}/toggle`, {
      method: 'PATCH', cookie: creator.cookie, json: { isActive: false },
    });
    const pass = toggled.status < 300 && toggled.body?.isActive === false;
    const verification = pass
      ? `Reward ${id} isActive=false`
      : `Không chuyển INACTIVE. HTTP ${toggled.status} body ${JSON.stringify(toggled.body)?.slice(0, 240)}`;
    writeJson('TC_REWD_004', evidenceDoc({
      tid: 'TC_REWD_004', description: 'Tắt kích hoạt gói phần thưởng', status: pass ? 'PASS' : 'FAIL', role: 'creator',
      req: { endpoint: `${LIVE}/api/rewards/${id}/toggle`, method: 'PATCH', authenticated: true, payload: { isActive: false } },
      res: toggled,
      verification,
    }));
    record(results, 'TC_REWD_004', pass ? 'PASS' : 'FAIL', { verification });
  }
}

{
  const id = reward?.body?.id;
  if (!id) {
    const verification = 'Không có reward DOWNLOAD của Creator để tải quà số.';
    writeJson('TC_REWD_008', evidenceDoc({
      tid: 'TC_REWD_008', description: 'Tải lên quà tặng kỹ thuật số', status: 'FAIL', role: 'creator',
      req: { endpoint: LIVE + '/api/rewards', method: 'POST' },
      res: reward || { status: 0, body: null },
      verification,
    }));
    record(results, 'TC_REWD_008', 'FAIL', { verification });
  } else {
    const uploaded = await request(`/api/rewards/${id}/digital-assets`, {
      method: 'POST',
      cookie: creator.cookie,
      json: { assetUrl: 'https://example.com/qa-rerun-ebook.pdf', fileName: 'Sach_QA.pdf' },
    });
    const pass = (uploaded.status === 200 || uploaded.status === 201) && uploaded.body?.asset?.id;
    const verification = pass
      ? `Đã tạo reward_digital_assets ${uploaded.body.asset.id}`
      : `Không tạo asset. HTTP ${uploaded.status} body ${JSON.stringify(uploaded.body)?.slice(0, 240)}`;
    writeJson('TC_REWD_008', evidenceDoc({
      tid: 'TC_REWD_008', description: 'Tải lên quà tặng kỹ thuật số', status: pass ? 'PASS' : 'FAIL', role: 'creator',
      req: { endpoint: `${LIVE}/api/rewards/${id}/digital-assets`, method: 'POST', authenticated: true, payload: { assetUrl: 'https://example.com/qa-rerun-ebook.pdf' } },
      res: uploaded,
      verification,
    }));
    record(results, 'TC_REWD_008', pass ? 'PASS' : 'FAIL', { verification });
  }
}

// --- TC_PLED_002 amount above global minimum but below reward minimum ---
{
  const id = reward?.body?.id;
  if (!backer.ok || !id || !campaignA?.id) {
    const verification = 'Thiếu backer hoặc reward minAmount=200000 nên không kiểm được mức thưởng.';
    writeJson('TC_PLED_002', evidenceDoc({
      tid: 'TC_PLED_002', description: 'Từ chối ủng hộ khi số tiền không đủ nhận thưởng', status: 'FAIL', role: 'backer',
      req: { endpoint: LIVE + '/api/payments', method: 'POST' },
      res: { status: 0, body: { error: verification } },
      verification,
    }));
    record(results, 'TC_PLED_002', 'FAIL', { verification });
  } else {
    const pledged = await request('/api/payments', {
      method: 'POST',
      cookie: backer.cookie,
      json: {
        campaignId: campaignA.id,
        rewardId: id,
        amount: 80000,
        paymentMethod: 'ONLINE',
        shippingMethod: 'DOWNLOAD',
        displayName: 'QA Backer',
        guestEmail: ACCOUNTS.backer.email,
      },
    });
    const text = JSON.stringify(pledged.body || {});
    const pass = pledged.status === 400 && /tối thiểu|toi thieu|không đủ|khong du/i.test(text);
    const verification = pass
      ? `HTTP 400 vì dưới min thưởng: ${text.slice(0, 220)}`
      : `Không ra lỗi mức thưởng. HTTP ${pledged.status} body ${text.slice(0, 300)}`;
    writeJson('TC_PLED_002', evidenceDoc({
      tid: 'TC_PLED_002', description: 'Từ chối ủng hộ khi số tiền không đủ nhận thưởng', status: pass ? 'PASS' : 'FAIL', role: 'backer',
      req: { endpoint: LIVE + '/api/payments', method: 'POST', authenticated: true, payload: { amount: 80000, rewardMin: 200000, rewardId: id } },
      res: pledged,
      verification,
    }));
    record(results, 'TC_PLED_002', pass ? 'PASS' : 'FAIL', { verification });
  }
}

// --- TC_CAMP_012 cancel own campaign that already has a pledge. Never touch other campaigns. ---
{
  if (!creator.ok || !admin.ok || !backer.ok) {
    const verification = 'Thiếu session Creator/Admin/Backer.';
    writeJson('TC_CAMP_012', evidenceDoc({
      tid: 'TC_CAMP_012', description: 'Từ chối hủy chiến dịch khi đã có pledge', status: 'FAIL', role: 'creator',
      req: { endpoint: LIVE + '/api/campaigns', method: 'POST' }, res: { status: 0, body: null }, verification,
    }));
    record(results, 'TC_CAMP_012', 'FAIL', { verification });
  } else {
    const created = await createCampaign(creator.cookie, `QA huy co pledge ${Date.now()}`);
    const id = created.body?.id;
    const slug = created.body?.slug;
    const submitted = id ? await request(`/api/campaigns/${slug}/submit`, { method: 'POST', cookie: creator.cookie, json: {} }) : null;
    const approved = id && submitted?.body?.status === 'PENDING_REVIEW'
      ? await request(`/api/admin/campaigns/${id}/review`, { method: 'PATCH', cookie: admin.cookie, json: { status: 'ACTIVE' } })
      : null;
    const pledged = approved?.body?.campaign?.status === 'ACTIVE'
      ? await request('/api/payments', {
        method: 'POST', cookie: backer.cookie,
        json: { campaignId: id, amount: 50000, paymentMethod: 'ONLINE', displayName: 'QA Backer', guestEmail: ACCOUNTS.backer.email },
      })
      : null;
    const cancelled = pledged?.body?.pledgeId
      ? await request(`/api/campaigns/${id}/cancel`, { method: 'POST', cookie: creator.cookie, json: { reason: 'QA rerun kiem tra tu choi huy' } })
      : { status: 0, body: { created: created.body, submitted: submitted?.body, approved: approved?.body, pledged: pledged?.body } };
    const text = JSON.stringify(cancelled.body || {});
    const refused = cancelled.status >= 400 && /từ chối|tu choi|không thể hủy|khong the huy|đã có|da co/i.test(text);
    const pass = refused;
    const verification = pass
      ? `API từ chối hủy: HTTP ${cancelled.status} ${text.slice(0, 220)}`
      : `Kỳ vọng từ chối hủy khi đã có pledge. Thực tế HTTP ${cancelled.status} ${text.slice(0, 350)}`;
    writeJson('TC_CAMP_012', evidenceDoc({
      tid: 'TC_CAMP_012', description: 'Từ chối hủy chiến dịch khi đã có pledge', status: pass ? 'PASS' : 'FAIL', role: 'creator',
      req: { endpoint: `${LIVE}/api/campaigns/${id || ''}/cancel`, method: 'POST', authenticated: true, payload: { campaignId: id, pledge: pledged?.body?.pledgeId || null } },
      res: cancelled,
      verification,
    }));
    record(results, 'TC_CAMP_012', pass ? 'PASS' : 'FAIL', { verification });
  }
}

// --- payment gateways: expected success, actual 410 => FAIL ---
for (const [tid, url, label] of [
  ['TC_PLED_004', '/api/payment/momo/create', 'MoMo'],
  ['TC_PLED_005', '/api/payment/vnpay/create', 'VNPay'],
]) {
  const res = await request(url, { method: 'POST', json: { amount: 50000, campaignId: 'test' } });
  const pass = false;
  const verification = `Kỳ vọng tạo phiên ${label}. Thực tế HTTP ${res.status} ${JSON.stringify(res.body)?.slice(0, 240)}`;
  writeJson(tid, evidenceDoc({
    tid, description: `Cổng ${label}`, status: 'FAIL',
    req: { endpoint: LIVE + url, method: 'POST', payload: { amount: 50000 } },
    res, verification,
  }));
  record(results, tid, 'FAIL', { verification });
}

// --- TC_BLOG_010 publish a draft this run created ---
{
  const actor = admin.ok ? admin : creator;
  const created = actor.ok ? await request('/api/blog/posts', {
    method: 'POST', cookie: actor.cookie,
    json: { title: `QA xuat ban ${Date.now()}`, content: '<p>Bai viet nhap de kiem thu duyet xuat ban.</p>', type: 'PLATFORM', visibility: 'PUBLIC' },
  }) : { status: 0, body: null };
  const id = created.body?.id;
  const review = id && admin.ok
    ? await request(`/api/admin/blog/posts/${id}/review`, { method: 'PATCH', cookie: admin.cookie, json: { status: 'PUBLISHED' } })
    : { status: created.status, body: created.body };
  const pass = review.body?.status === 'PUBLISHED';
  const verification = pass
    ? `Bài ${id} status=PUBLISHED`
    : `Không xuất bản. Tạo HTTP ${created.status} ${JSON.stringify(created.body)?.slice(0, 180)}; duyệt HTTP ${review.status} ${JSON.stringify(review.body)?.slice(0, 220)}`;
  writeJson('TC_BLOG_010', evidenceDoc({
    tid: 'TC_BLOG_010', description: 'Admin phê duyệt xuất bản bài viết', status: pass ? 'PASS' : 'FAIL', role: 'admin',
    req: { endpoint: `${LIVE}/api/admin/blog/posts/${id || ''}/review`, method: 'PATCH', authenticated: true, payload: { status: 'PUBLISHED', id } },
    res: review,
    verification,
  }));
  record(results, 'TC_BLOG_010', pass ? 'PASS' : 'FAIL', { verification });
}

// --- TC_CHAT_005 real conversation + call-signal ---
{
  if (!backer.ok || !creator.user?.id) {
    const verification = 'Thiếu backer hoặc id creator để mở hội thoại.';
    writeJson('TC_CHAT_005', evidenceDoc({
      tid: 'TC_CHAT_005', description: 'Gửi tín hiệu cuộc gọi', status: 'FAIL', role: 'backer',
      req: { endpoint: LIVE + '/api/chat/conversations/start', method: 'POST' },
      res: { status: 0, body: null }, verification,
    }));
    record(results, 'TC_CHAT_005', 'FAIL', { verification });
  } else {
    const started = await request('/api/chat/conversations/start', {
      method: 'POST', cookie: backer.cookie, json: { targetUserId: creator.user.id },
    });
    const conversationId = started.body?.conversation?.id;
    const signal = JSON.stringify({ type: 'offer', sdp: 'qa-rerun' });
    const sent = conversationId
      ? await request(`/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST', cookie: backer.cookie, json: { text: signal, type: 'call-signal' },
      })
      : started;
    const message = sent.body?.message;
    const pass = message && (message.type === 'call-signal' || message.messageType === 'call-signal');
    const verification = pass
      ? `Đã tạo message ${message.id || ''} type=call-signal trong hội thoại ${conversationId}`
      : `Không tạo call-signal. start HTTP ${started.status} ${JSON.stringify(started.body)?.slice(0, 200)}; send HTTP ${sent.status} ${JSON.stringify(sent.body)?.slice(0, 220)}`;
    writeJson('TC_CHAT_005', evidenceDoc({
      tid: 'TC_CHAT_005', description: 'Gửi tín hiệu cuộc gọi thoại call-signal', status: pass ? 'PASS' : 'FAIL', role: 'backer',
      req: { endpoint: `${LIVE}/api/chat/conversations/${conversationId || ''}/messages`, method: 'POST', authenticated: true, payload: { type: 'call-signal' } },
      res: sent,
      verification,
    }));
    record(results, 'TC_CHAT_005', pass ? 'PASS' : 'FAIL', { verification });
  }
}

// --- source assertions: status comes from the check, not a hardcoded PASS ---
{
  const resetSrc = fs.readFileSync(path.join(ROOT, 'src/lib/password-reset.ts'), 'utf8');
  const ttlMatch = resetSrc.match(/PASSWORD_RESET_TTL_MS\s*=\s*([^;\n]+)/);
  let ttl = null;
  try { ttl = ttlMatch ? Function(`"use strict"; return (${ttlMatch[1]})`)() : null; } catch { ttl = null; }
  const pass = ttl === 30 * 60 * 1000;
  const log = `=== REAL TEST EXECUTION OUTPUT: TC_AUTH_010 ===
Runner: evaluate PASSWORD_RESET_TTL_MS from src/lib/password-reset.ts
Timestamp: ${stamp()}
Expression: ${ttlMatch ? ttlMatch[1].trim() : 'NOT FOUND'}
Actual: ${ttl}
Expected: 1800000
Test Status: ${pass ? 'PASS' : 'FAIL'}
`;
  fs.writeFileSync(path.join(EVIDENCE, 'TC_AUTH_010_test.log'), log);
  record(results, 'TC_AUTH_010', pass ? 'PASS' : 'FAIL', { verification: log.trim() });
}
{
  const src = fs.readFileSync(path.join(ROOT, 'src/hooks/useCall.ts'), 'utf8');
  const hasWs = /new WebSocket|io\(/.test(src);
  const poll = Number((src.match(/POLL_MS\s*=\s*(\d+)/) || [])[1] || 0);
  const timeout = Number((src.match(/CALL_TIMEOUT_MS\s*=\s*(\d+)/) || [])[1] || 0);
  const chat3 = !hasWs && poll > 0 ? 'FAIL' : 'PASS';
  const chat4 = timeout === 45000 ? 'PASS' : 'FAIL';
  fs.writeFileSync(path.join(EVIDENCE, 'TC_CHAT_003_test.log'), `=== REAL TEST EXECUTION OUTPUT: TC_CHAT_003 ===
Runner: read src/hooks/useCall.ts and evaluate
Timestamp: ${stamp()}
WebSocket: ${hasWs}
POLL_MS: ${poll}
Expected: WebSocket full-duplex, no polling
Test Status: ${chat3}
`);
  fs.writeFileSync(path.join(EVIDENCE, 'TC_CHAT_004_test.log'), `=== REAL TEST EXECUTION OUTPUT: TC_CHAT_004 ===
Runner: read src/hooks/useCall.ts and evaluate
Timestamp: ${stamp()}
CALL_TIMEOUT_MS: ${timeout}
Expected: 45000
Test Status: ${chat4}
`);
  record(results, 'TC_CHAT_003', chat3, { verification: `POLL_MS=${poll} websocket=${hasWs}` });
  record(results, 'TC_CHAT_004', chat4, { verification: `CALL_TIMEOUT_MS=${timeout}` });
}

// screenshots: no injected badge
const { chromium } = await import('/tmp/pw/node_modules/playwright/index.js');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

{
  const campRes = await request('/api/campaigns/sach-giao-duc-vung-cao', { redirect: 'follow' });
  const goal = Number(campRes.body?.goalAmount ?? campRes.body?.campaign?.goalAmount);
  const current = Number(campRes.body?.currentAmount ?? campRes.body?.campaign?.currentAmount);
  await page.goto(LIVE + '/campaigns/sach-giao-duc-vung-cao', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_CAMP_009.png') });
  const pass = goal === 150000000 && current === 45200000;
  const verification = pass
    ? 'Trang và API đúng 150.000.000 / 45.200.000'
    : `API goal=${goal} current=${current}. Kỳ vọng 150000000 / 45200000. Ảnh chụp không gắn banner.`;
  writeJson('TC_CAMP_009', evidenceDoc({
    tid: 'TC_CAMP_009', description: 'Chi tiết chiến dịch sach-giao-duc-vung-cao', status: pass ? 'PASS' : 'FAIL',
    req: { endpoint: LIVE + '/api/campaigns/sach-giao-duc-vung-cao', method: 'GET' },
    res: { status: campRes.status, body: { goalAmount: goal, currentAmount: current, title: campRes.body?.title } },
    verification,
  }));
  record(results, 'TC_CAMP_009', pass ? 'PASS' : 'FAIL', { verification });
}

{
  const missing = await request('/campaigns/chien-dich-khong-ton-tai-999');
  await page.goto(LIVE + '/campaigns/chien-dich-khong-ton-tai-999', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1500);
  const text = await page.locator('body').innerText();
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_CAMP_010.png') });
  const pass = missing.status === 404 && /không tìm thấy|khong tim thay/i.test(text);
  const verification = pass
    ? `HTTP ${missing.status}, trang thật có chữ không tìm thấy, không chèn banner`
    : `HTTP ${missing.status}. Text: ${text.slice(0, 180)}`;
  writeJson('TC_CAMP_010', evidenceDoc({
    tid: 'TC_CAMP_010', description: 'Trang 404 chiến dịch không tồn tại', status: pass ? 'PASS' : 'FAIL',
    req: { endpoint: LIVE + '/campaigns/chien-dich-khong-ton-tai-999', method: 'GET' },
    res: { status: missing.status, body: text.slice(0, 300) },
    verification,
  }));
  record(results, 'TC_CAMP_010', pass ? 'PASS' : 'FAIL', { verification });
}

{
  if (backer.ok) {
    await page.context().clearCookies();
    const cookies = backer.cookie.split(';').map((p) => p.trim()).filter(Boolean).map((pair) => {
      const i = pair.indexOf('=');
      return { name: pair.slice(0, i), value: pair.slice(i + 1), url: LIVE };
    });
    await page.context().addCookies(cookies);
  }
  await page.goto(LIVE + '/gop-y', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1500);
  const box = page.locator('textarea');
  let uiBlocked = false;
  let requestFired = false;
  if (await box.count()) {
    await box.fill('ngan');
    page.on('request', (req) => {
      if (req.url().includes('/api/feedback') && req.method() === 'POST') requestFired = true;
    });
    const button = page.getByRole('button', { name: /Gửi góp ý/ });
    const disabled = await button.isDisabled().catch(() => false);
    uiBlocked = disabled;
    if (!disabled) await button.click();
    await page.waitForTimeout(2000);
  }
  await page.screenshot({ path: path.join(EVIDENCE, 'TC_COMM_003.png') });
  const pass = uiBlocked && !requestFired;
  const verification = pass
    ? 'Nút Gửi bị khóa khi nội dung ngắn, không gọi API'
    : `UI không chặn trước. disabled=${uiBlocked} requestFired=${requestFired}. Kỳ vọng cảnh báo và không gọi API.`;
  writeJson('TC_COMM_003', evidenceDoc({
    tid: 'TC_COMM_003', description: 'Chặn góp ý quá ngắn trên giao diện', status: pass ? 'PASS' : 'FAIL', role: backer.ok ? 'backer' : 'guest',
    req: { endpoint: LIVE + '/gop-y', method: 'UI', payload: { message: 'ngan' } },
    res: { status: requestFired ? 400 : 0, body: { uiBlocked, requestFired } },
    verification,
  }));
  record(results, 'TC_COMM_003', pass ? 'PASS' : 'FAIL', { verification });
}

await browser.close();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ at: stamp(), results }, null, 2));
console.log('WROTE', OUT);
