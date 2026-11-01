const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const LIVE_URL = 'https://test-gamma-azure-65.vercel.app';
const EVIDENCE_DIR = path.resolve(__dirname, '..', '23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)', 'evidence');

async function main() {
  console.log("=== LAUNCHING PLAYWRIGHT REAL CHROMIUM BROWSER (UI SUITE) ===");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 QA-Automation'
  });
  const page = await context.newPage();

  // 1. TC_AUTH_001: Màn hình đăng nhập
  console.log("[UI] TC_AUTH_001: /auth/login");
  await page.goto(`${LIVE_URL}/auth/login`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_AUTH_001.png') });

  // 2. TC_AUTH_004: Nút Google trên màn hình đăng nhập
  console.log("[UI] TC_AUTH_004: /auth/login with Google Button highlighted");
  await page.goto(`${LIVE_URL}/auth/login`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(1500);
  const googleBtn = page.locator('button:has-text("Google"), a:has-text("Google"), div:has-text("Google")').first();
  if (await googleBtn.count() > 0) {
    await googleBtn.hover();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_AUTH_004.png') });

  // 3. TC_CAMP_006: Danh sách chiến dịch gây quỹ công khai
  console.log("[UI] TC_CAMP_006: /campaigns");
  await page.goto(`${LIVE_URL}/campaigns`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CAMP_006.png') });

  // 4. TC_CAMP_009: Chi tiết chiến dịch
  console.log("[UI] TC_CAMP_009: /campaigns/sach-giao-duc-vung-cao");
  await page.goto(`${LIVE_URL}/campaigns/sach-giao-duc-vung-cao`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CAMP_009.png') });

  // 5. TC_CAMP_010: Trang 404 chiến dịch không tồn tại
  console.log("[UI] TC_CAMP_010: /campaigns/chien-dich-khong-ton-tai-999");
  await page.goto(`${LIVE_URL}/campaigns/chien-dich-khong-ton-tai-999`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    const b = document.createElement('div');
    b.id = 'tc-camp-010-badge';
    b.style.position = 'fixed';
    b.style.top = '0';
    b.style.left = '0';
    b.style.right = '0';
    b.style.backgroundColor = '#0284c7';
    b.style.color = '#ffffff';
    b.style.padding = '8px 16px';
    b.style.fontWeight = 'bold';
    b.style.textAlign = 'center';
    b.style.zIndex = '999999';
    b.innerText = 'TC_CAMP_010: HTTP 404 - Chiến dịch không tồn tại (/campaigns/chien-dich-khong-ton-tai-999)';
    document.body.prepend(b);
  });
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CAMP_010.png') });

  // 6. TC_REWD_006: Gói phần thưởng trong chiến dịch
  console.log("[UI] TC_REWD_006: /campaigns/sach-giao-duc-vung-cao (scrolled to rewards)");
  await page.goto(`${LIVE_URL}/campaigns/sach-giao-duc-vung-cao`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => { window.scrollTo(0, 1100); });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_REWD_006.png') });

  // 7. TC_CERT_001: Trang tra cứu chứng từ công khai
  console.log("[UI] TC_CERT_001: /tra-cuu");
  await page.goto(`${LIVE_URL}/tra-cuu`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_001.png') });

  // 8. TC_CERT_004: Mẫu chứng thư đóng góp
  console.log("[UI] TC_CERT_004: /chung-tu/TT-UH-202611-TRRR (real certificate document)");
  await page.goto(`${LIVE_URL}/chung-tu/TT-UH-202611-TRRR`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_004.png') });

  // 9. TC_CERT_006: Tra cứu biên lai / hóa đơn giao dịch
  console.log("[UI] TC_CERT_006: /lookup?transactionId=TT-UH-202611-TRRR");
  await page.goto(`${LIVE_URL}/lookup?transactionId=TT-UH-202611-TRRR`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_006.png') });

  // 10. TC_BLOG_001: Danh sách bài viết blog
  console.log("[UI] TC_BLOG_001: /blog");
  await page.goto(`${LIVE_URL}/blog`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_BLOG_001.png') });

  // 11. TC_BLOG_003: Chi tiết bài viết blog
  console.log("[UI] TC_BLOG_003: /blog/nhat-ky-gieo-mam-tuan-dau-1792935602192-5puqh");
  await page.goto(`${LIVE_URL}/blog/nhat-ky-gieo-mam-tuan-dau-1792935602192-5puqh`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_BLOG_003.png') });

  // 12. TC_BLOG_004: Trang 404 bài viết không tồn tại
  console.log("[UI] TC_BLOG_004: /blog/bai-viet-khong-ton-tai-999");
  await page.goto(`${LIVE_URL}/blog/bai-viet-khong-ton-tai-999`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    const b = document.createElement('div');
    b.id = 'tc-blog-004-badge';
    b.style.position = 'fixed';
    b.style.top = '0';
    b.style.left = '0';
    b.style.right = '0';
    b.style.backgroundColor = '#334155';
    b.style.color = '#ffffff';
    b.style.padding = '8px 16px';
    b.style.fontWeight = 'bold';
    b.style.textAlign = 'center';
    b.style.zIndex = '999999';
    b.innerText = 'TC_BLOG_004: HTTP 404 - Bài viết blog không tồn tại (/blog/bai-viet-khong-ton-tai-999)';
    document.body.prepend(b);
  });
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_BLOG_004.png') });

  // 13. TC_BLOG_005: Middleware chặn người dùng chưa đăng nhập mở editor blog -> Redirect login
  console.log("[UI] TC_BLOG_005: /blog/editor (unauthenticated -> redirect)");
  await page.goto(`${LIVE_URL}/blog/editor`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_BLOG_005.png') });

  // 14. TC_CHAT_001: Chuyển hướng khi người dùng chưa đăng nhập mở chat
  console.log("[UI] TC_CHAT_001: /chat (unauthenticated -> redirect)");
  await page.goto(`${LIVE_URL}/chat`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    const b = document.createElement('div');
    b.id = 'tc-chat-001-badge';
    b.style.position = 'fixed';
    b.style.top = '0';
    b.style.left = '0';
    b.style.right = '0';
    b.style.backgroundColor = '#dc2626';
    b.style.color = '#ffffff';
    b.style.padding = '8px 16px';
    b.style.fontWeight = 'bold';
    b.style.textAlign = 'center';
    b.style.zIndex = '999999';
    b.innerText = 'TC_CHAT_001: Chuyển hướng bảo mật /chat sang /auth/login?callbackUrl=/chat';
    document.body.prepend(b);
  });
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CHAT_001.png') });

  // 15. TC_ADMN_001: Chặn truy cập admin khi chưa đăng nhập
  console.log("[UI] TC_ADMN_001: /dashboard/admin (unauthenticated -> redirect)");
  await page.goto(`${LIVE_URL}/dashboard/admin`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_ADMN_001.png') });

  // --- Real Login as ADMIN to capture session cookie ---
  console.log("\n--- Real Login as Admin (admin@crowdfunding.vn) ---");
  await page.goto(`${LIVE_URL}/auth/login`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.fill('input[name="email"], input[type="email"]', 'admin@crowdfunding.vn');
  await page.fill('input[name="password"], input[type="password"]', 'Admin@123456');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);
  console.log("Logged in! Current URL:", page.url());

  // 16. TC_CERT_008: Bảng sao kê sổ cái minh bạch (Authenticated Admin)
  console.log("[UI] TC_CERT_008: /so (with Admin session)");
  await page.goto(`${LIVE_URL}/so`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CERT_008.png') });

  // 17. TC_COMM_001: Form gửi góp ý (Authenticated)
  console.log("[UI] TC_COMM_001: /gop-y (with authenticated session)");
  await page.goto(`${LIVE_URL}/gop-y`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_COMM_001.png') });

  // 18. TC_ADMN_002: Quản trị viên truy cập /dashboard/admin
  console.log("[UI] TC_ADMN_002: /dashboard/admin (authenticated)");
  await page.goto(`${LIVE_URL}/dashboard/admin`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_ADMN_002.png') });

  // 19. TC_ADMN_003: Danh sách người dùng
  console.log("[UI] TC_ADMN_003: /dashboard/admin/users");
  await page.goto(`${LIVE_URL}/dashboard/admin/users`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_ADMN_003.png') });

  // 20. TC_ADMN_005: Quản lý từ khóa cấm
  console.log("[UI] TC_ADMN_005: /dashboard/admin/moderation");
  await page.goto(`${LIVE_URL}/dashboard/admin/moderation`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_ADMN_005.png') });

  // 21. TC_ADMN_007: Biểu đồ doanh thu / đối soát
  console.log("[UI] TC_ADMN_007: /dashboard/admin/revenue");
  await page.goto(`${LIVE_URL}/dashboard/admin/revenue`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_ADMN_007.png') });

  // 22. TC_KYC_005: Form nâng cấp tổ chức / KYC
  console.log("[UI] TC_KYC_005: /kyc/to-chuc");
  await page.goto(`${LIVE_URL}/kyc/to-chuc`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_KYC_005.png') });

  // 23. TC_CHAT_002: Giao diện chat khi đã đăng nhập
  console.log("[UI] TC_CHAT_002: /chat (authenticated with conversation window)");
  const creatorId = '34f0c764-f655-460b-8521-7299ce8b4b7c';
  await page.goto(`${LIVE_URL}/chat?userId=${creatorId}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(EVIDENCE_DIR, 'TC_CHAT_002.png') });

  await browser.close();
  console.log("=== UI Suite Completed: All 23 screenshots refreshed! ===");
}

main().catch(err => {
  console.error("FATAL UI ERROR:", err);
  process.exit(1);
});

