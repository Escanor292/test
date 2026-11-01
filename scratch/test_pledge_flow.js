const https = require('https');

function req(url, options = {}, payload = null, cookies = []) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const headers = {
      'User-Agent': 'TuTeFund-RealRunner/2.0',
      'Accept': 'application/json',
      'Accept-Encoding': 'identity',
      ...(options.headers || {})
    };
    if (cookies && cookies.length > 0) {
      headers['Cookie'] = cookies.map(c => `${c.name}=${c.value}`).join('; ');
    }
    const bodyStr = payload ? JSON.stringify(payload) : null;
    if (bodyStr) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers,
      timeout: 15000
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        let b = null;
        try { b = JSON.parse(d); } catch (e) { b = d; }
        resolve({ statusCode: res.statusCode, headers: res.headers, body: b });
      });
    });
    req.on('error', e => resolve({ statusCode: 0, error: e.message }));
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

const { chromium } = require('@playwright/test');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const adminCtx = await browser.newContext();
  const adminPage = await adminCtx.newPage();
  await adminPage.goto('https://test-gamma-azure-65.vercel.app/auth/login');
  await adminPage.fill('input[type="email"]', 'admin@crowdfunding.vn');
  await adminPage.fill('input[type="password"]', 'Admin@123456');
  await adminPage.click('button[type="submit"]');
  await adminPage.waitForTimeout(3000);
  const adminCookies = await adminCtx.cookies();

  const backerCtx = await browser.newContext();
  const backerPage = await backerCtx.newPage();
  await backerPage.goto('https://test-gamma-azure-65.vercel.app/auth/login');
  await backerPage.fill('input[type="email"]', 'test1@gmail.com');
  await backerPage.fill('input[type="password"]', '123');
  await backerPage.click('button[type="submit"]');
  await backerPage.waitForTimeout(3000);
  const backerCookies = await backerCtx.cookies();

  const campRes = await req('https://test-gamma-azure-65.vercel.app/api/campaigns');
  const activeCamp = campRes.body.items.find(c => c.status === 'ACTIVE');
  const campId = activeCamp.id;
  console.log('Active Campaign ID:', campId, activeCamp.title);

  // 1. Create pledge
  const pledRes = await req('https://test-gamma-azure-65.vercel.app/api/payments', { method: 'POST' }, {
    campaignId: campId,
    amount: 50000,
    paymentMethod: 'ONLINE',
    displayName: 'Nguyen Backer',
    guestEmail: 'test1@gmail.com'
  }, backerCookies);
  console.log('Pledge created:', pledRes.statusCode, pledRes.body);

  if (pledRes.body && pledRes.body.pledgeId) {
    const pledgeId = pledRes.body.pledgeId;
    // 2. Settle pledge as Admin
    const settleRes = await req(`https://test-gamma-azure-65.vercel.app/api/admin/pledges/${pledgeId}/settle`, { method: 'POST' }, {
      status: 'SUCCESS',
      transactionRef: 'FT2611019999'
    }, adminCookies);
    console.log('Settle result:', settleRes.statusCode, settleRes.body);
  }

  await browser.close();
}

test().catch(console.error);
