# ĐẶC TẢ YÊU CẦU SẢN PHẨM (PRODUCT REQUIREMENTS DOCUMENT)

**Dự án:** Nền tảng Gây quỹ Cộng đồng TửTế Fund (`crowdfunding-vn`)
**Mã tài liệu:** `01-IC-PRD-23CT113-Nhom02`
**Phiên bản:** `2.0.0` — viết lại, đối chiếu trực tiếp với mã nguồn
**Tiêu chuẩn áp dụng:** IEEE 830 / ISO/IEC/IEEE 29148
**Ngày lập:** 07/09/2026
**Người lập:** Nguyễn Quách Phú Tài (123000609) — Test Lead / Product Owner
**Nhóm:** 23CT113 — Nhóm 02

> **Nguyên tắc biên soạn:** Mọi yêu cầu trong tài liệu này đều kèm **căn cứ mã nguồn** (đường dẫn file hoặc tên model/enum trong `prisma/schema.prisma`). Yêu cầu nào chưa xác minh được bằng mã nguồn đều được đánh dấu rõ ở Mục 10, không suy đoán.

---

## 1. TẦM NHÌN & MỤC TIÊU SẢN PHẨM

### 1.1. Tầm nhìn

Xây dựng nền tảng gây quỹ cộng đồng minh bạch cho thị trường Việt Nam, nơi một cá nhân hoặc tổ chức có thể:

1. Khởi tạo chiến dịch gây quỹ (có quà tặng hoặc thuần quyên góp) trong vài phút.
2. Nhận ủng hộ qua cổng thanh toán nội địa (VietQR, Momo, VNPay, PayOS).
3. Công khai tiến độ, sao kê tài chính và nghĩa vụ thuế.
4. Được bảo vệ bằng quy trình xác minh danh tính (KYC) và cơ chế hoàn tiền tự động.

### 1.2. Mục tiêu định lượng (Measurable Objectives)

| Mã | Mục tiêu | Chỉ số nghiệm thu | Căn cứ / Cách đo |
|:---|:---|:---|:---|
| **OBJ-01** | Rút ngắn thời gian tạo chiến dịch | Tạo xong một campaign `DRAFT` trong **≤ 5 phút** kể từ trang `/campaigns/create` | Đo bằng Playwright E2E với bản ghi thời gian |
| **OBJ-02** | Xác minh danh tính trước khi nhận tiền | **100%** Creator phải có `kyc_info.verificationStatus = VERIFIED` mới được duyệt chiến dịch | `src/lib/kyc.ts` → `isKYCVerified()` |
| **OBJ-03** | Minh bạch dòng tiền | **100%** chiến dịch có bảng sao kê hiển thị phí nền tảng và thuế | `/dashboard/creator/statement/[campaignId]`, `src/lib/invoice-generator.ts` |
| **OBJ-04** | Tự động hoá vòng đời chiến dịch | **0** chiến dịch `ACTIVE` tồn tại quá `endDate` sau mỗi lần chạy cron | `src/lib/campaign-lifecycle.ts` |
| **OBJ-05** | Kiểm soát hạn mức giao dịch | Giao dịch vượt hạn mức bị chặn **100%** với thông báo lý do cụ thể | `src/lib/kyc.ts` → `checkTransactionLimit()` |
| **OBJ-06** | Độ phủ kiểm thử các phân hệ cốt lõi | **≥ 80%** Test Case (TC) của 5 phân hệ cốt lõi đạt trạng thái Pass | Đối chiếu `Test Case_23CT113_Nhom02.xlsx` |

### 1.3. Vấn đề cần giải quyết

| Vấn đề hiện tại | Hệ quả | Cách sản phẩm giải quyết |
|:---|:---|:---|
| Gây quỹ qua mạng xã hội thiếu kiểm chứng | Lừa đảo, chiếm đoạt tiền ủng hộ | KYC bắt buộc + Admin duyệt chiến dịch trước khi `ACTIVE` |
| Người ủng hộ không biết tiền đi đâu | Mất niềm tin | Sao kê công khai + tra cứu giao dịch độc lập `/lookup` |
| Không có cơ chế hoàn tiền khi chiến dịch thất bại | Tranh chấp | Hoàn tiền tự động theo mô hình gây quỹ (`ALL_OR_NOTHING`) |
| Creator không có công cụ quản lý đơn hàng | Thất lạc quà tặng | Vòng đời giao hàng `FulfillmentStatus` + SLA 2 ngày |

---

## 2. PHẠM VI (SCOPE)

### 2.1. Trong phạm vi — Phase 1 (5 phân hệ cốt lõi)

Đây là 5 phân hệ được **kiểm thử** trong học phần và là đối tượng của bộ Test Case hiện hành:

| # | Phân hệ | Mã module | Trang chính | API chính |
|:---|:---|:---|:---|:---|
| 1 | Xác thực & Phiên đăng nhập | `AUTH` | `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/reset-password` | `/api/auth/[...nextauth]`, `/api/auth/register`, `/api/auth/forgot-password`, `/api/auth/reset-password` |
| 2 | Chiến dịch gây quỹ | `CAMP` | `/campaigns`, `/campaigns/[slug]`, `/campaigns/create` | `/api/campaigns`, `/api/campaigns/[slug]/submit`, `/api/campaigns/[slug]/cancel`, `/api/admin/campaigns/[id]/review` |
| 3 | Gói phần thưởng & Tồn kho | `REWD` | `/dashboard/creator/rewards/[slug]`, `/products/[rewardId]` | `/api/rewards`, `/api/rewards/[id]`, `/api/rewards/[id]/toggle`, `/api/rewards/[id]/digital-assets` |
| 4 | Bài viết cộng đồng | `BLOG` | `/blog`, `/blog/[slug]`, `/blog/editor`, `/blog/my-posts` | `/api/blog/posts`, `/api/blog/posts/[slug]/publish`, `/api/blog/posts/[slug]/comments`, `/api/blog/posts/[slug]/like` |
| 5 | Xác minh danh tính | `KYC` | `/kyc`, `/kyc/to-chuc`, `/dashboard/admin/kyc` | `/api/kyc/submit`, `/api/kyc/status`, `/api/kyc/ekyc/*`, `/api/admin/kyc/[id]/review` |

### 2.2. Ngoài phạm vi kiểm thử Phase 1 (nhưng **có tồn tại trong sản phẩm**)

Các phân hệ dưới đây **đã được cài đặt trong mã nguồn** nhưng **không có Test Case** trong bộ 54 TC. Cần nêu rõ để tránh hiểu nhầm rằng đã kiểm thử toàn hệ thống:

| Phân hệ | Trang / API tồn tại | Trạng thái kiểm thử |
|:---|:---|:---|
| Đóng góp & Thanh toán | `/campaigns/[slug]/pledge`, `/cart`, `/thanh-toan/chuyen-khoan`, `/api/checkout-sessions`, `/api/payment/{payos,sepay,vnpay,momo}/*` | ❌ Chưa có TC |
| Kho đồ / Purchases | `/purchases`, `/api/purchases/digital`, `checkout_sessions` model | ❌ Chưa có TC |
| Huy hiệu (Badge) | `/dashboard/admin/badges`, `/api/admin/badges`, `/api/me/badges` | ❌ Chưa có TC |
| Báo cáo vi phạm | `/dashboard/admin/reports`, `/api/reports`, `/api/admin/reports` | ❌ Chưa có TC |
| Nhắn tin & Gọi | `/chat`, `/messages`, `/api/chat/conversations/*` | ❌ Chưa có TC |
| Hội viên trả phí định kỳ | `/dashboard/creator/hoi-vien`, `/api/memberships`, `/api/creator/tiers` | ❌ Chưa có TC |
| Hồ sơ & Profile Studio | `/profile/[userId]`, `/profile/[userId]/customize`, `/api/profile/customization` | ❌ Chưa có TC |
| Thuế & Chứng từ | `/dashboard/creator/thue`, `/hoa-don/[number]`, `/chung-tu/[code]`, `so_ledgers` model | ❌ Chưa có TC |
| Bằng cấp / Chứng chỉ | `/dashboard/bang-cap`, `/api/credentials`, `/api/admin/credentials` | ❌ Chưa có TC |
| Quản trị hệ thống | `/dashboard/admin/*` (users, permissions, system, templates, analytics) | ⚠️ Chỉ phần duyệt KYC & duyệt campaign có TC |

### 2.3. Ràng buộc kỹ thuật bắt buộc

| Hạng mục | Giá trị | Căn cứ |
|:---|:---|:---|
| Framework | Next.js `^15.1.4` (App Router), React `^19` | `package.json` |
| Ngôn ngữ | TypeScript 5 | `package.json` |
| ORM / CSDL | Prisma `^5.22` + PostgreSQL (`pg ^8.23`) | `package.json`, `prisma/schema.prisma` |
| Xác thực | NextAuth `^5.0.0-beta.30` + `@auth/prisma-adapter` | `package.json`, `src/lib/auth.ts` |
| Lưu trữ ảnh | Cloudinary `^2.9.0` | `package.json`, `src/app/api/upload/route.ts` |
| Cổng thanh toán | PayOS, SePay, VNPay, Momo | `package.json`, `src/app/api/payment/*` |
| Rich text | TipTap `2.6.6` + DOMPurify | `package.json`, `src/lib/editor` |
| Kiểm thử | Jest `^30` + Playwright `^1.62` | `package.json`, `playwright.config.ts` |
| Triển khai | Vercel | `vercel.json` |

### 2.4. Quy mô mã nguồn tại thời điểm lập tài liệu

| Chỉ số | Số lượng | Cách đếm |
|:---|:---|:---|
| Model Prisma | **60** | `grep -c "^model " prisma/schema.prisma` |
| Enum Prisma | **41** | `grep -c "^enum " prisma/schema.prisma` |
| Trang (page.tsx) | **87** | `find src/app -name page.tsx \| wc -l` |
| API route (route.ts) | **168** | `find src/app/api -name route.ts \| wc -l` |

---

## 3. TÁC NHÂN & PHÂN QUYỀN

### 3.1. Định nghĩa tác nhân

Căn cứ: `enum UserRole` và `enum UserStatus` trong `prisma/schema.prisma`, cùng cờ `users.isAdmin`.

| Mã | Tác nhân | Điều kiện nhận diện | Quyền hạn chính |
|:---|:---|:---|:---|
| **ACT-01** | Khách (Guest) | Chưa có session | Xem trang công khai, blog đã `PUBLISHED`, danh sách campaign `ACTIVE/SUCCESS/FAILED`, tra cứu giao dịch `/lookup` |
| **ACT-02** | Backer | `role = BACKER` (mặc định khi đăng ký) | Ủng hộ, bình luận, thả tim, bookmark, theo dõi campaign, yêu cầu nâng cấp Creator |
| **ACT-03** | Creator | `role = CREATOR` | Toàn quyền trên campaign/reward thuộc sở hữu, xem sao kê, gửi duyệt |
| **ACT-04** | Creator Pro | `role = CREATOR` **và** `status = PRO` | Được mở rộng quyền nâng cao như tính năng Pro, banner “Pro”, quyền content premium; đây là **không phải** trạng thái chờ duyệt |
| **ACT-05** | Admin | `role = ADMIN` **hoặc** `users.isAdmin = true` | Duyệt/từ chối campaign, duyệt KYC, quản lý user, badge, báo cáo, credentials |

### 3.2. Ghi chú quan trọng về cơ chế quyền

Mã nguồn dùng **đồng thời hai cơ chế**: `role` (enum) và cờ `isAdmin` (boolean). Ví dụ tại `src/lib/blog/blog.service.ts`, điều kiện kiểm tra là `!user?.isAdmin`; trong `src/lib/auth.ts`, `token.isAdmin` được gắn vào session. Trong khi đó `src/app/api/admin/campaigns/[id]/review/route.ts` kiểm tra quyền Admin theo logic riêng.

> **Hệ quả cần kiểm thử:** Một tài khoản có `role = ADMIN` nhưng `isAdmin = false` (hoặc ngược lại) có thể rơi vào trạng thái **không nhất quán quyền**. Đây là **rủi ro bảo mật cần có test case** (xem NFR-SECU-01).

### 3.3. Trạng thái tài khoản

| Mã | Trạng thái | Ý nghĩa | Căn cứ |
|:---|:---|:---|:---|
| `NORMAL` | Bình thường | Mặc định | `enum UserStatus` |
| `PRO` | Nâng cao | Huy hiệu PRO, hiển thị khác biệt | `src/app/api/admin/users/[userId]/update-status` |
| `BANNED` | Bị khoá | Chuyển hướng về `/banned` | `src/app/banned`, `src/lib/blacklist.ts` |

**Quy tắc nghiệp vụ (đã đối chiếu với mã nguồn):** `Creator Pro` là một trạng thái nâng cao của `Creator`, được biểu diễn bằng `role = CREATOR` + `status = PRO`; không phải `role = CREATOR_PENDING`. Trạng thái `CREATOR_PENDING` là giai đoạn chờ Admin/KYC duyệt nâng cấp từ `BACKER` sang `CREATOR`, không được gộp với `Creator Pro`.

---

## 4. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

Cú pháp định danh: `FR-[MODULE]-[STT]`. Mỗi yêu cầu gồm **Mô tả**, **Quy tắc nghiệp vụ** và **Căn cứ mã nguồn**.

### 4.1. Phân hệ Xác thực & Phiên đăng nhập (`AUTH`)

**`FR-AUTH-01` — Đăng ký tài khoản**
- **Mô tả:** Người dùng đăng ký bằng `name`, `email`, `password`, `confirmPassword`, tùy chọn `isOrganization`, bắt buộc `acceptTerms`.
- **Quy tắc:**
  - `name` không được rỗng sau khi `trim()`.
  - `password.length >= 6`.
  - Nếu có `confirmPassword` thì phải khớp `password`.
  - Mật khẩu băm bằng `bcrypt` trước khi lưu.
  - Mặc định `role = BACKER`, `status = NORMAL`.
- **Căn cứ:** `src/app/api/auth/register/route.ts` (dòng 11, 25, 32, 73); `enum UserRole`, `enum UserStatus`.
- **Trạng thái:** VERIFIED.

**`FR-AUTH-02` — Đăng nhập & Quản lý phiên**
- **Mô tả:** Xác thực qua NextAuth v5 (Credentials provider), quản lý phiên bằng JWT, gắn `id`, `role`, `isAdmin` vào token/session.
- **Quy tắc:** Người đã đăng nhập truy cập `/auth/login` được chuyển về `/dashboard`.
- **Căn cứ:** `src/app/api/auth/[...nextauth]/route.ts`, `src/lib/auth.ts` (dòng 58, 68, 77).
- **Trạng thái:** VERIFIED.

**`FR-AUTH-03` — Quên / Đặt lại mật khẩu**
- **Mô tả:** Gửi yêu cầu quên mật khẩu, tạo token trong `password_reset_tokens`, đặt lại mật khẩu bằng token.
- **Căn cứ:** `src/app/api/auth/forgot-password/route.ts`, `src/app/api/auth/reset-password/route.ts`, model `password_reset_tokens`.
- **Trạng thái:** VERIFIED (tồn tại endpoint); luồng gửi email: **UNKNOWN** (chưa xác minh dịch vụ gửi mail).

**`FR-AUTH-04` — Cập nhật hồ sơ cá nhân**
- **Mô tả:** Cập nhật `displayName`, `bio`, `location`, `website`, `phone`, `shippingAddress`, `avatar`, `coverImage`, `socialLinks`, `privacySettings`, `notificationSettings`.
- **Căn cứ:** model `users`; `src/app/api/user/profile/route.ts`, `src/app/api/profile/update/route.ts`, trang `/profile/edit`.
- **Trạng thái:** VERIFIED.

**`FR-AUTH-05` — Nâng cấp tài khoản Creator**
- **Mô tả:** `BACKER` gửi yêu cầu nâng cấp; hệ thống chuyển `role` sang `CREATOR_PENDING` để Admin duyệt.
- **Căn cứ:** `src/app/api/user/upgrade-creator/route.ts`, trang `/upgrade`, `/upgrade/individual`, `/upgrade/organization`; `enum UserRole`.
- **Trạng thái:** VERIFIED.

---

### 4.2. Phân hệ Chiến dịch gây quỹ (`CAMP`)

**`FR-CAMP-01` — Khám phá & Tìm kiếm chiến dịch**
- **Mô tả:** Danh sách campaign công khai có **tìm kiếm từ khóa** và **bộ lọc đa chiều**: danh mục, thẻ (tags), trạng thái, mô hình gây quỹ, có/không quà.
- **Quy tắc:** Chỉ hiển thị campaign có trạng thái công khai; campaign `DRAFT`/`PENDING_REVIEW` không xuất hiện với khách.
- **Căn cứ:** `src/app/api/campaigns/route.ts`, `src/lib/campaign-filters.ts`, `src/lib/campaign-query-params.ts`, trang `/campaigns`.
- **Trạng thái:** VERIFIED.

**`FR-CAMP-02` — Khởi tạo chiến dịch**
- **Mô tả:** Creator tạo campaign với `title`, `description`, `category`, `goalAmount`, `fundingModel`, `type`, ảnh bìa, ngày kết thúc.
- **Quy tắc:**
  - Sinh tự động `campaignCode` (unique) và `slug` (unique).
  - Trạng thái khởi tạo bắt buộc `DRAFT`.
  - `fundingModel` mặc định `ALL_OR_NOTHING`; chỉ được đổi khi status là `DRAFT`, `PENDING_REVIEW` hoặc chưa có status.
  - Ngày kết thúc mặc định = **hiện tại + 60 ngày**.
  - Phí nền tảng mặc định `feeRate = 0.08` (8%).
- **Căn cứ:** model `campaigns` (dòng 356); `src/lib/funding-model.ts` (`DEFAULT_PLATFORM_FEE_RATE = 0.08`, `DEFAULT_DONATION_DURATION_DAYS = 60`, `canEditFundingModel()`); trang `/campaigns/create`.
- **Trạng thái:** VERIFIED.

**`FR-CAMP-03` — Chỉnh sửa chiến dịch**
- **Mô tả:** Chỉ chủ sở hữu (`creatorId`) hoặc Admin được sửa.
- **Ràng buộc:** Không cho đổi `fundingModel` khi campaign đã `ACTIVE` trở lên (`canEditFundingModel` trả `false`).
- **Căn cứ:** `src/lib/funding-model.ts`; `src/app/api/campaigns/[slug]`.
- **Trạng thái:** VERIFIED.

**`FR-CAMP-04` — Gửi duyệt chiến dịch**
- **Mô tả:** Creator chuyển campaign từ `DRAFT` sang `PENDING_REVIEW` để Admin xét.
- **Quy tắc:** Chỉ chủ sở hữu được gửi duyệt (nếu sai → `403`).
- **Căn cứ:** `src/app/api/campaigns/[slug]/submit/route.ts` (dòng 41).
- **Trạng thái:** VERIFIED.

**`FR-CAMP-05` — Admin duyệt / từ chối chiến dịch**
- **Mô tả:** Admin xét campaign đang `PENDING_REVIEW` và chọn **duyệt** hoặc **từ chối**.
- **Quy tắc (chính xác theo mã nguồn):**
  - Tập trạng thái hợp lệ chỉ gồm **`ACTIVE`** (duyệt) và **`CANCELED`** (từ chối). Giá trị khác → `400`.
  - Từ chối **bắt buộc** có lý do (`reason`), thiếu → `400`.
  - Campaign không ở `PENDING_REVIEW` → `409` (xung đột trạng thái).
  - Ghi `audit_logs` với hành động `APPROVE`/`REJECT`.
  - Gửi thông báo `CAMPAIGN_APPROVED` / `CAMPAIGN_REJECTED` cho Creator.
- **Căn cứ:** `src/app/api/admin/campaigns/[id]/review/route.ts` (dòng 9, 32–36, 48, 57, 61, 72–75).
- **Trạng thái:** VERIFIED.

**`FR-CAMP-06` — Rút khỏi hàng đợi duyệt**
- **Mô tả:** Creator rút campaign khỏi trạng thái chờ duyệt, đưa về `DRAFT` để sửa tiếp.
- **Quy tắc:** Chỉ chủ chiến dịch (sai quyền → `403`); kết quả trả `status: 'DRAFT'`.
- **Căn cứ:** `src/app/api/campaigns/[slug]/withdraw/route.ts` (dòng 22, 29).
- **Trạng thái:** VERIFIED.

**`FR-CAMP-07` — Hủy chiến dịch & Hoàn tiền tự động**
- **Mô tả:** Chủ chiến dịch (hoặc Admin) hủy campaign đang chạy; hệ thống chuyển sang `FAILED` và hoàn tiền cho toàn bộ pledge `SUCCESS`.
- **Quy tắc:**
  - Campaign đã `FAILED` hoặc `CANCELED` → `400` ("Dự án đã bị hủy trước đó").
  - Cập nhật `status = FAILED`, sau đó gọi `processCampaignRefund(campaignId)`.
  - Trả về số giao dịch đã hoàn: `refundedCount / total`.
- **Căn cứ:** `src/app/api/campaigns/[slug]/cancel/route.ts` (dòng 34, 42, 51, 60).
- **Trạng thái:** VERIFIED.

**`FR-CAMP-08` — Bài cập nhật tiến độ**
- **Mô tả:** Creator đăng bài cập nhật cho campaign (hỗ trợ ghim, gắn thẻ, chèn ảnh).
- **Căn cứ:** model `campaign_updates`; `src/app/api/campaigns/[slug]/updates/route.ts`, `/[id]/route.ts`.
- **Trạng thái:** VERIFIED (tồn tại); chi tiết ràng buộc nội dung: PARTIAL.

**`FR-CAMP-09` — Đánh giá chiến dịch**
- **Mô tả:** Người dùng gửi đánh giá sao (1–5) kèm nhận xét.
- **Căn cứ:** model `reviews`; `src/app/api/campaigns/[slug]/reviews/route.ts`.
- **Trạng thái:** VERIFIED (tồn tại); ràng buộc "mỗi user một đánh giá": PARTIAL (chưa xác minh).

**`FR-CAMP-10` — Theo dõi chiến dịch**
- **Mô tả:** Người dùng theo dõi/bỏ theo dõi campaign để nhận thông báo.
- **Căn cứ:** model `campaign_followers`; `src/app/api/campaigns/[slug]/follow/route.ts`.
- **Trạng thái:** VERIFIED.

**`FR-CAMP-11` — Xác nhận đã giao hàng cho đơn vị vận chuyển**
- **Mô tả:** Creator xác nhận campaign đã bàn giao hàng, ghi `fulfillmentConfirmedAt`.
- **Quy tắc:** Campaign phải có reward (nếu không → `400` "không có sản phẩm để giao"); trạng thái phải thuộc `SUCCESS`, `FAILED` hoặc `ACTIVE` (nếu không → `400`).
- **Căn cứ:** `src/app/api/campaigns/[slug]/confirm-fulfillment/route.ts` (dòng 31–39).
- **Trạng thái:** VERIFIED.

**`FR-CAMP-12` — Sao kê tài chính chiến dịch**
- **Mô tả:** Creator xem chi tiết số tiền gây quỹ, tip, phí nền tảng, thuế VAT.
- **Căn cứ:** `src/app/api/campaigns/[slug]/accounting/route.ts`, trang `/dashboard/creator/statement/[campaignId]`, `src/lib/invoice-generator.ts`.
- **Trạng thái:** VERIFIED (tồn tại); công thức VAT: PARTIAL.

---

### 4.3. Phân hệ Gói phần thưởng & Tồn kho (`REWD`)

**`FR-REWD-01` — Tạo gói phần thưởng**
- **Mô tả:** Creator tạo reward gồm `title`, `description`, `minAmount`, `maxAmount`, `maxQuantity`, `stock`, ngày giao dự kiến, ảnh/video sản phẩm.
- **Quy tắc:**
  - `minAmount` là mức đóng góp tối thiểu, bắt buộc.
  - `maxQuantity` = số lượng tối đa phát hành; `stock` = tồn kho hiện tại (kiểu nullable → không giới hạn).
  - Reward thuộc **một** campaign **hoặc** một project (`campaignId` hoặc `projectId`).
  - `fulfillmentType` mặc định `PHYSICAL`; `availability` mặc định `AVAILABLE`.
  - Tỉ lệ đặt cọc: `onlineDepositPercent = 30`, `codDepositPercent = 50`.
- **Căn cứ:** model `rewards` (dòng 642); `enum RewardAvailability`, `enum RewardFulfillmentType`.
- **Trạng thái:** VERIFIED.

**`FR-REWD-02` — Cập nhật / Bật-tắt gói phần thưởng**
- **Mô tả:** Chỉ chủ sở hữu campaign được sửa; có endpoint bật/tắt nhanh `isActive`.
- **Căn cứ:** `src/app/api/rewards/[id]/route.ts`, `src/app/api/rewards/[id]/toggle/route.ts`.
- **Trạng thái:** VERIFIED.

**`FR-REWD-03` — Sản phẩm số (Digital Assets)**
- **Mô tả:** Reward loại số (`EMAIL`, `DOWNLOAD`, `LICENSE_KEY`, `DIGITAL_COMIC`) có kho asset riêng, cấp phát cho từng pledge.
- **Quy tắc:** Mỗi asset gắn `pledgeId` **unique** → một pledge nhận tối đa một asset; vòng đời `AVAILABLE → RESERVED → DELIVERED → CLAIMED` (hoặc `REVOKED`).
- **Căn cứ:** model `reward_digital_assets`; `enum DigitalAssetStatus`; `src/app/api/rewards/[id]/digital-assets/route.ts`, `/api/purchases/digital`.
- **Trạng thái:** VERIFIED.

**`FR-REWD-04` — Đánh giá sản phẩm**
- **Mô tả:** Người đã ủng hộ gói quà có thể đánh giá sản phẩm.
- **Quy tắc:** `pledgeId` là **unique** trong `product_reviews` → **mỗi pledge chỉ được đánh giá một lần**.
- **Căn cứ:** model `product_reviews` (dòng 698); `src/app/api/products/[rewardId]/reviews/route.ts`.
- **Trạng thái:** VERIFIED.

**`FR-REWD-05` — Trạng thái giao hàng (Fulfillment)**
- **Mô tả:** Theo dõi vòng đời giao hàng của từng pledge.
- **Vòng đời:** `NOT_APPLICABLE`, `AWAITING_PAYMENT`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `DELIVERY_FAILED`, `CANCELED`, `RETURN_REQUESTED`, `RETURNED`.
- **Căn cứ:** `enum FulfillmentStatus`; `src/app/api/pledges/[pledgeId]/fulfillment/route.ts`.
- **Trạng thái:** VERIFIED.

---

### 4.4. Phân hệ Bài viết cộng đồng (`BLOG`)

**`FR-BLOG-01` — Soạn thảo bài viết (TipTap)**
- **Mô tả:** Trình biên tập rich text hỗ trợ tiêu đề, danh sách, trích dẫn, ảnh, video YouTube, bảng, task list, màu chữ, căn lề.
- **Quy tắc:** Nội dung HTML **bắt buộc** đi qua sanitizer (`persistRichText` + DOMPurify) trước khi lưu.
- **Căn cứ:** `package.json` (`@tiptap/*`), `src/lib/editor`, `src/lib/blog/blog.service.ts` (`persistRichText`), `dompurify`.
- **Trạng thái:** VERIFIED.

**`FR-BLOG-02` — Quy trình xuất bản**
- **Mô tả:** Vòng đời bài viết: `DRAFT → PENDING_REVIEW → PUBLISHED → ARCHIVED` (có thể `REJECTED`).
- **Quy tắc xuất bản (chính xác theo mã nguồn):** Khi tác giả yêu cầu `PUBLISHED` mà **không phải Admin**, hệ thống kiểm tra theo thứ tự:
  1. Có quyền `blog.publish_direct` → `PUBLISHED` ngay.
  2. Bài loại `CAMPAIGN_UPDATE` **và** tác giả đã KYC `VERIFIED` → `PUBLISHED` ngay.
  3. Ngược lại → `PENDING_REVIEW` (chờ duyệt).
- **Căn cứ:** `src/lib/blog/blog.service.ts` (dòng 49–56, 280–293); `src/lib/blog/blog-review.ts`; `enum BlogPostStatus`.
- **Trạng thái:** VERIFIED.

**`FR-BLOG-03` — Hiển thị công khai & hẹn giờ**
- **Mô tả:** Chỉ bài `PUBLISHED` **và** `publishedAt` không nằm ở tương lai mới hiển thị công khai.
- **Căn cứ:** `src/lib/blog/blog-policy.ts` (`isPubliclyVisibleBlog`), có unit test `src/lib/blog/blog-review.test.ts`.
- **Trạng thái:** VERIFIED.

**`FR-BLOG-04` — Tương tác: thả tim, bookmark, bình luận**
- **Mô tả:** Like, Bookmark, bình luận phân cấp (reply lồng nhau), bình luận có trạng thái duyệt.
- **Quy tắc:** `enum BlogCommentStatus` = `PENDING`, `APPROVED`, `HIDDEN`, `DELETED`; mỗi user chỉ like/bookmark một lần (ràng buộc unique).
- **Căn cứ:** model `blog_likes`, `blog_bookmarks`, `blog_comments`; `/api/blog/posts/[slug]/like|bookmark|comments`, `/api/blog/comments/[id]`.
- **Trạng thái:** VERIFIED.

**`FR-BLOG-05` — Báo cáo bài viết**
- **Mô tả:** Người dùng báo cáo bài viết vi phạm.
- **Căn cứ:** model `blog_reports`; `enum BlogReportReason`, `enum ReportStatus`; `src/lib/content-report.ts`.
- **Trạng thái:** VERIFIED (tồn tại); ràng buộc chống spam: PARTIAL.

---

### 4.5. Phân hệ Xác minh danh tính (`KYC`)

**`FR-KYC-01` — Gửi hồ sơ KYC thủ công**
- **Mô tả:** Người dùng khai báo `fullName`, `idCardNumber`, `idCardType` (`CMND`/`CCCD`/`PASSPORT`), ngày cấp, nơi cấp, ngày sinh, nơi sinh, địa chỉ, nghề nghiệp, thu nhập, ảnh 2 mặt giấy tờ + ảnh selfie.
- **Quy tắc:**
  - `idCardNumber` là **unique** → một số giấy tờ không thể dùng cho hai tài khoản.
  - `userId` là **unique** → mỗi người dùng chỉ có một hồ sơ KYC.
  - Sau khi gửi: `verificationStatus = PENDING`; phản hồi "Đã gửi hồ sơ KYC thủ công. Chờ admin duyệt."
  - Lưu thời điểm đồng ý (`consentAt`).
- **Căn cứ:** model `kyc_info` (dòng 417); `src/app/api/kyc/submit/route.ts` (dòng 86, 103, 123).
- **Trạng thái:** VERIFIED.

**`FR-KYC-02` — Admin duyệt / từ chối KYC**
- **Mô tả:** Admin xét hồ sơ `PENDING`, chuyển sang `VERIFIED` hoặc `REJECTED` kèm lý do; ghi nhận `verifiedAt`, `verifiedBy`, `rejectedReason`, `riskLevel`.
- **Vòng đời:** `PENDING → VERIFIED | REJECTED | EXPIRED`.
- **Căn cứ:** `src/app/api/admin/kyc/[id]/review/route.ts`, trang `/dashboard/admin/kyc`; `enum KYCStatus`, `enum RiskLevel`.
- **Trạng thái:** VERIFIED.

**`FR-KYC-03` — eKYC tự động (OCR + Liveness + Face Match)**
- **Mô tả:** Hệ thống hỗ trợ xác minh tự động qua nhà cung cấp eKYC: đọc OCR giấy tờ, kiểm tra thực thể sống (liveness), so khớp khuôn mặt.
- **Quy tắc:**
  - Ngưỡng liveness đạt khi `is_live = true` **hoặc** `score >= 70`.
  - Có cơ chế sandbox khi chưa cấu hình nhà cung cấp thật.
  - Hỗ trợ đọc QR trên CCCD để tự điền thông tin.
- **Căn cứ:** `src/lib/ekyc/{provider,vnpt,fpt,sandbox,cccd-qr,national,ekyb}.ts`; `src/app/api/kyc/ekyc/{session,analyze,confirm,nfc}`, `/api/kyc/ekyb/lookup`.
- **Trạng thái:** VERIFIED (mã nguồn); hoạt động với nhà cung cấp thật: **UNKNOWN** (phụ thuộc biến môi trường/credentials).

**`FR-KYC-04` — Hạn mức giao dịch theo KYC**
- **Mô tả:** Hạn mức giao dịch thay đổi theo trạng thái KYC và theo cấu hình riêng của từng user.
- **Quy tắc (giá trị mặc định trong mã nguồn):**

| Đối tượng | Tối đa / giao dịch | Tối đa / ngày | Tối đa / tháng | Số giao dịch / ngày |
|:---|---:|---:|---:|---:|
| KYC `VERIFIED` | 500.000.000 | 1.000.000.000 | 5.000.000.000 | 20 |
| `PENDING` / `REJECTED` / `EXPIRED` | 20.000.000 | 50.000.000 | 200.000.000 | 5 |
| Khách chưa đăng nhập | 20.000.000 | — | — | — |

  - Ưu tiên 1: hạn mức riêng trong bảng `transaction_limits` của user.
  - Ưu tiên 2: hạn mức mặc định theo `kycStatus` (bản ghi `userId = null`).
  - Ưu tiên 3: hằng số mặc định ở trên.
- **Căn cứ:** `src/lib/kyc.ts` (`getDefaultLimit`, `checkTransactionLimit`, `getTransactionLimit`); model `transaction_limits`.
- **Trạng thái:** VERIFIED.

**`FR-KYC-05` — Hồ sơ tổ chức**
- **Mô tả:** Tổ chức khai báo thêm giấy phép kinh doanh, mã số thuế để xác minh.
- **Căn cứ:** trang `/kyc/to-chuc`; `src/lib/ekyc/ekyb.ts` (`lookupBusiness(taxCode)`); model `users` (`businessLicense`); model `credentials` (`BUSINESS_LICENSE`, `TAX_REGISTRATION`).
- **Trạng thái:** PARTIAL.

---

### 4.6. Yêu cầu chức năng các phân hệ ngoài phạm vi Phase 1

Ghi nhận để đầy đủ tài liệu; **không có Test Case**.

| Mã | Yêu cầu | Căn cứ | Trạng thái |
|:---|:---|:---|:---|
| **FR-PLDG-01** | Ủng hộ chiến dịch, mức tối thiểu **50.000 VNĐ**, hỗ trợ tip và ẩn danh | `src/app/api/checkout-sessions/route.ts` (dòng 45, 79–87) | VERIFIED |
| **FR-PLDG-02** | Thanh toán qua PayOS / SePay / VNPay / Momo + webhook | `src/app/api/payment/*` | VERIFIED (tồn tại); môi trường thật: UNKNOWN |
| **FR-PLDG-03** | Phiên thanh toán `checkout_sessions` có vòng đời `ACTIVE/COMPLETED/EXPIRED/CANCELLED` | model `checkout_sessions` | VERIFIED |
| **FR-PLDG-04** | Tra cứu giao dịch công khai, ẩn danh tính nếu `isAnonymous` | `/lookup`, `src/app/api/lookup/route.ts` | VERIFIED |
| **FR-SOC-01** | Nhắn tin 1-1 theo ngữ cảnh campaign, đánh dấu đã đọc, chặn, báo cáo | model `conversations`, `messages`, `chat_reports`; `/api/chat/*` | VERIFIED (tồn tại) |
| **FR-SOC-02** | Hội viên trả phí định kỳ theo gói (`support_tiers`) | model `support_tiers`, `memberships`; `/api/memberships` | VERIFIED (tồn tại); chu kỳ tính tiền: PARTIAL |
| **FR-SOC-03** | Kho đồ: xem quà đã nhận, tải sản phẩm số | `/purchases`, `/api/purchases/digital` | VERIFIED (tồn tại) |
| **FR-ADMN-01** | Xử lý báo cáo vi phạm, chống spam 1 báo cáo/người/target | model `campaign_reports`, `blog_reports`; `/api/admin/reports` | PARTIAL |
| **FR-ADMN-02** | Quản lý huy hiệu: tạo, cấp phát, thu hồi kèm lý do | model `badges`, `user_badges`; `/api/admin/badges`, `/api/admin/user-badges/[id]/revoke` | VERIFIED (tồn tại) |
| **FR-ADMN-03** | Quản trị trạng thái người dùng `NORMAL/PRO/BANNED` | `/api/admin/users/[userId]/update-status` | VERIFIED (tồn tại) |
| **FR-ADMN-04** | Dashboard doanh thu & phân tích hành vi | `/dashboard/admin/revenue`, `/dashboard/admin/analytics`, `src/lib/analytics-*` | PARTIAL |
| **FR-ADMN-05** | Quản lý ma trận quyền | `/dashboard/admin/permissions`, `/api/admin/permissions`, `src/lib/auth.ts` | PARTIAL |
| **FR-PROF-01** | Profile Studio: tùy biến hồ sơ, template | `profile_customizations`, `profile_customization_versions`; `/profile/templates` | PARTIAL |
| **FR-TAX-01** | Thuế, chứng từ, sao kê sổ cái | `/dashboard/creator/thue`, `/chung-tu/[code]`, model `so_ledgers` | PARTIAL |
| **FR-CRED-01** | Bằng cấp / chứng chỉ nghề nghiệp có duyệt | `credentials`, `enum CredentialStatus`; `/api/admin/credentials` | PARTIAL |
| **FR-CRON-01** | Quét chiến dịch hết hạn, chốt `SUCCESS`/`FAILED` + hoàn tiền | `src/lib/campaign-lifecycle.ts`, `/api/cron/update-campaign-status` | VERIFIED |
| **FR-CRON-02** | Hoàn tiền đơn giao trễ SLA + nhả đơn | `src/lib/ship-sla.ts`, `/api/cron/ship-sla` | VERIFIED |
| **FR-CRON-03** | Dọn phiên thanh toán treo | `/api/cron/cleanup-payments` | VERIFIED (tồn tại) |
| **FR-CRON-04** | Nhắc hội viên sắp hết hạn | `/api/cron/memberships` | VERIFIED (tồn tại) |
| **FR-CRON-05** | Kiểm tra liên kết hỏng | `/api/cron/check-links`, `/api/creator/broken-links` | VERIFIED (tồn tại) |

---

## 5. QUY TẮC NGHIỆP VỤ TRỌNG YẾU (BUSINESS RULES)

Toàn bộ con số dưới đây **lấy trực tiếp từ mã nguồn**, không phải giả định:

| Mã | Quy tắc | Giá trị | Căn cứ |
|:---|:---|:---|:---|
| **BR-01** | Phí nền tảng mặc định | **8%** (`0.08`) | `src/lib/funding-model.ts` → `DEFAULT_PLATFORM_FEE_RATE` |
| **BR-02** | Thời hạn gây quỹ mặc định | **60 ngày** | `src/lib/funding-model.ts` → `DEFAULT_DONATION_DURATION_DAYS` |
| **BR-03** | Ân hạn bàn giao vận chuyển | **2 ngày** sau hạn giao | `CARRIER_HANDOFF_GRACE_DAYS = 2` |
| **BR-04** | Hoàn tiền khi hết hạn | Chỉ hoàn khi: **`ALL_OR_NOTHING` + không có quà + chưa đạt mục tiêu** | `shouldRefundOnDeadline()` |
| **BR-05** | Campaign có quà khi hết hạn | **Luôn `SUCCESS`** dù chưa đạt mục tiêu (vẫn giao hàng) | `closeExpiredCampaigns()` |
| **BR-06** | Trạng thái hợp lệ khi Admin duyệt campaign | Chỉ **`ACTIVE`** hoặc **`CANCELED`** | `ALLOWED_STATUSES` trong review route |
| **BR-07** | Từ chối campaign | **Bắt buộc** nhập lý do | review route dòng 35–36 |
| **BR-08** | Hủy campaign bởi Creator | Chuyển **`FAILED`** + hoàn tiền toàn bộ pledge `SUCCESS` | cancel route |
| **BR-09** | Mức ủng hộ tối thiểu | **50.000 VNĐ** | `checkout-sessions/route.ts` dòng 45 |
| **BR-10** | Mật khẩu tối thiểu | **6 ký tự** | `register/route.ts` dòng 25 |
| **BR-11** | Ảnh upload tối đa | **5 MB** (`jpeg/jpg/png/webp/gif`) | `upload/route.ts` dòng 26, 39 |
| **BR-12** | Video upload tối đa | **30 MB** | `upload/route.ts` dòng 39 |
| **BR-13** | Ngưỡng liveness eKYC | `score >= 70` | `src/lib/ekyc/fpt.ts` dòng 77 |
| **BR-14** | Một số giấy tờ ↔ một tài khoản | `idCardNumber` unique | `kyc_info` |
| **BR-15** | Một pledge ↔ một đánh giá sản phẩm | `pledgeId` unique | `product_reviews` |
| **BR-16** | Tỉ lệ đặt cọc reward | Online **30%**, COD **50%** | `rewards` model default |
| **BR-17** | Đổi mô hình gây quỹ | Chỉ khi `DRAFT` / `PENDING_REVIEW` | `canEditFundingModel()` |

---

## 6. MÁY TRẠNG THÁI (STATE MACHINES)

### 6.1. Vòng đời chiến dịch (`CampaignStatus`)

```text
                    Creator gửi duyệt              Admin duyệt
   [DRAFT] ─────────────────────────► [PENDING_REVIEW] ──────────────► [ACTIVE]
      ▲                                      │                          │
      │                                      │ Admin từ chối (kèm lý do)│
      │ Creator rút                          ▼                          │
      └──────────────────────────────── [CANCELED]                     │
                                                                         │
                        ┌────────────────────────────────────────────────┤
                        │                                                │
        Hết hạn + hoàn tiền (BR-04)              Hết hạn + có quà (BR-05)
                        ▼                                                ▼
                     [FAILED]                                        [SUCCESS]
                        ▲
                        │ Creator/Admin hủy
                     [ACTIVE]
```

| Từ | Sang | Tác nhân | Điều kiện | API |
|:---|:---|:---|:---|:---|
| `DRAFT` | `PENDING_REVIEW` | Creator | Là chủ sở hữu | `/api/campaigns/[slug]/submit` |
| `PENDING_REVIEW` | `DRAFT` | Creator | Rút hồ sơ | `/api/campaigns/[slug]/withdraw` |
| `PENDING_REVIEW` | `ACTIVE` | Admin | Hợp lệ, không cần lý do | `/api/admin/campaigns/[id]/review` |
| `PENDING_REVIEW` | `CANCELED` | Admin | **Phải có lý do** | `/api/admin/campaigns/[id]/review` |
| `ACTIVE` | `FAILED` | Creator/Admin | Hủy + hoàn tiền | `/api/campaigns/[slug]/cancel` |
| `ACTIVE` | `SUCCESS` / `FAILED` | Hệ thống (cron) | Theo `endDate` + BR-04/05 | `campaign-lifecycle.ts` |

> **Lưu ý đã phát hiện:** Mã nguồn **không có** trạng thái `PAUSED` hay `COMPLETED` trong `enum CampaignStatus`. Hai giá trị này chỉ xuất hiện trong code giao diện (`campaign-filters.ts`, `CampaignCard.tsx`) dưới dạng **nhãn hiển thị được suy ra** (ví dụ `calculateCompletionState("SUCCESS") → "COMPLETED"`). Bất kỳ yêu cầu nào mô tả "đổi trạng thái campaign sang Paused/Completed" là **không khớp với mô hình dữ liệu**.

### 6.2. Vòng đời bài viết (`BlogPostStatus`)

| Từ | Sang | Tác nhân | Điều kiện |
|:---|:---|:---|:---|
| — | `DRAFT` | Tác giả | Mặc định |
| `DRAFT` | `PUBLISHED` | Admin | Có quyền Admin |
| `DRAFT` | `PUBLISHED` | Tác giả | Có quyền `blog.publish_direct`, **hoặc** là `CAMPAIGN_UPDATE` và đã KYC `VERIFIED` |
| `DRAFT` | `PENDING_REVIEW` | Tác giả | Không thuộc hai trường hợp trên |
| `PENDING_REVIEW` | `PUBLISHED` | Admin | Duyệt |
| `PENDING_REVIEW` | `REJECTED` | Admin | Từ chối |
| `PUBLISHED` | `ARCHIVED` | Tác giả/Admin | Lưu trữ |

### 6.3. Vòng đời KYC (`KYCStatus`)

```text
[PENDING] ──► [VERIFIED]   (Admin duyệt hoặc eKYC đạt ngưỡng)
    │
    ├──────► [REJECTED]    (Admin từ chối, có rejectedReason)
    │
    └──────► [EXPIRED]     (Hết hiệu lực)
```

### 6.4. Vòng đời giao dịch ủng hộ & giao hàng

- **Pledge:** `PENDING → SUCCESS | FAILED | REFUNDED`
- **Hoàn tiền:** `NO_REFUND → REQUESTED → PROCESSING → ...`
- **Giao hàng:** `AWAITING_PAYMENT → PROCESSING → SHIPPED → DELIVERED` (nhánh lỗi: `DELIVERY_FAILED`, `CANCELED`, `RETURN_REQUESTED`, `RETURNED`)

---

## 7. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

Mỗi NFR phải có **chỉ số đo được**. Giá trị mục tiêu dưới đây là **cam kết của nhóm**, không phải hằng số trong mã nguồn.

| Mã NFR | Danh mục | Yêu cầu | Chỉ số nghiệm thu | Cách đo |
|:---|:---|:---|:---|:---|
| **NFR-PERF-01** | Hiệu năng trang | Trang chủ và trang chi tiết campaign tải nhanh | FCP < 1.5s, LCP < 2.5s, CLS < 0.1 trên Desktop, mạng 4G | Lighthouse |
| **NFR-PERF-02** | Hiệu năng API | Endpoint đọc dữ liệu phản hồi nhanh | P95 < 500ms với 50 request đồng thời | k6 / Artillery |
| **NFR-SECU-01** | Phân quyền | Endpoint quản trị phải chặn truy cập trái phép | **100%** `/api/admin/*` trả `401` khi chưa đăng nhập, `403` khi sai quyền; **0** lỗi IDOR | Jest + Playwright |
| **NFR-SECU-02** | Chống XSS | Nội dung rich text phải được làm sạch | **0** payload `<script>` thực thi được trên DOM | Bộ payload OWASP |
| **NFR-SECU-03** | Toàn vẹn webhook | Chữ ký webhook thanh toán phải được xác thực | **100%** request sai chữ ký bị từ chối `400/401` | Test gửi webhook sai chữ ký |
| **NFR-SECU-04** | Bảo vệ dữ liệu KYC | Ảnh giấy tờ không lộ cho người khác | User A **không thể** truy cập ảnh KYC của User B (`403`) | Playwright |
| **NFR-RELI-01** | Bất biến (Idempotency) | Webhook lặp không làm tăng tiền 2 lần | Gửi cùng payload 2 lần → số dư chỉ tăng **1** lần | Replay test |
| **NFR-RELI-02** | Tính đúng của cron | Cron chốt campaign đúng quy tắc BR-04/05 | **0** campaign `ACTIVE` quá `endDate` sau 1 chu kỳ cron | Jest integration |
| **NFR-USAB-01** | Responsive | Không vỡ giao diện trên thiết bị phổ biến | **0%** vỡ layout tại 375×667, 390×844, 768×1024, 1366×768, 1920×1080 | Visual check |
| **NFR-COMP-01** | Tương thích trình duyệt | Hoạt động trên Chrome, Edge, Firefox, Safari | **0** lỗi JavaScript console | Playwright đa trình duyệt |
| **NFR-MAIN-01** | Khả năng bảo trì | Có kiểm thử tự động cho logic cốt lõi | Coverage **≥ 80%** trên `src/lib/{funding-model,kyc,campaign-lifecycle,blog}` | Jest `--coverage` |

---

## 8. MÔ HÌNH DỮ LIỆU (TÓM TẮT)

`prisma/schema.prisma` có **60 model** và **41 enum**. Nhóm theo miền nghiệp vụ:

| Miền | Model |
|:---|:---|
| **Người dùng & quyền** | `users`, `credentials`, `kyc_info`, `transaction_limits`, `blacklist`, `audit_logs`, `password_reset_tokens`, `notifications`, `user_metadata`, `user_notes`, `profile_customizations`, `profile_customization_versions` |
| **Chiến dịch** | `campaigns`, `campaign_updates`, `campaign_followers`, `campaign_reports`, `campaign_comments`, `campaign_comment_reactions`, `campaign_contents`, `campaign_blog_links` |
| **Dự án** | `projects`, `project_blog_links`, `project_reward_links` |
| **Phần thưởng** | `rewards`, `reward_digital_assets`, `product_reviews`, `reviews` |
| **Giao dịch** | `pledges`, `checkout_sessions`, `payment_methods`, `backer_invoices`, `platform_invoices`, `daily_tip_invoices`, `donation_certificates` |
| **Hội viên** | `support_tiers`, `memberships` |
| **Blog** | `blog_posts`, `blog_drafts`, `blog_versions`, `blog_comments`, `blog_likes`, `blog_bookmarks`, `blog_categories`, `blog_tags`, `blog_post_categories`, `blog_post_tags`, `blog_reports`, `blog_view_logs` |
| **Chat** | `conversations`, `messages`, `message_reactions`, `chat_reports` |
| **Gamification** | `badges`, `user_badges` |
| **Tài chính / thuế** | `so_ledgers`, `platform_feedback` |
| **Hệ thống & phân tích** | `analytics_events`, `analytics_settings`, `assistant_telemetry_events`, `activity_logs_v2` |

> **Ghi chú kỹ thuật:** Repo có **cả** `src/services/mongodb/*` và `src/services/pg/*`. Schema Prisma đã chứa model `conversations`/`messages` trong PostgreSQL. Vì vậy tài liệu cũ mô tả "Chat lưu trên MongoDB" cần được **tái xác minh** trước khi dùng làm căn cứ kiểm thử — xem Mục 10.

---

## 9. GIẢ ĐỊNH & RÀNG BUỘC

### 9.1. Giả định

| Mã | Giả định | Rủi ro nếu sai |
|:---|:---|:---|
| **AS-01** | Cơ sở dữ liệu đã có dữ liệu mẫu đủ cho kiểm thử (campaign `ACTIVE`, reward còn tồn kho, tài khoản Admin/Creator/Backer) | Test Case phụ thuộc dữ liệu sẽ không chạy được |
| **AS-02** | Có ít nhất một tài khoản đã KYC `VERIFIED` để test luồng xuất bản blog trực tiếp | Không kiểm được nhánh `PUBLISHED` trực tiếp |
| **AS-03** | Cổng thanh toán chạy ở chế độ sandbox/mock | Không kiểm được luồng tiền thật |
| **AS-04** | Nhà cung cấp eKYC có thể chạy ở chế độ sandbox | Chỉ kiểm được nhánh fallback |
| **AS-05** | Môi trường kiểm thử truy cập được tại `test-gamma-azure-65.vercel.app` và môi trường local | Không thực thi được test online |

### 9.2. Ràng buộc

- Không được sửa mã nguồn sản phẩm để làm test pass.
- Dữ liệu kiểm thử không được chứa thông tin cá nhân thật.
- Ảnh giấy tờ dùng cho KYC phải là ảnh giả/mẫu.

---

## 10. ĐỐI SOÁT TÍNH NĂNG VỚI MÃ NGUỒN (AUDIT)

Ba mức trạng thái: **VERIFIED** (đã đọc code và xác nhận logic), **PARTIAL** (tồn tại file/route nhưng chưa xác minh đầy đủ quy tắc), **UNKNOWN** (chưa xác minh được).

| Phân hệ | Trạng thái | Bằng chứng |
|:---|:---|:---|
| Đăng ký / Đăng nhập / Session | **VERIFIED** | `api/auth/register`, `api/auth/[...nextauth]`, `src/lib/auth.ts` |
| Quên / Đặt lại mật khẩu | **VERIFIED** (endpoint) | `api/auth/forgot-password`, `api/auth/reset-password` |
| Cập nhật hồ sơ | **VERIFIED** | `api/user/profile`, `api/profile/update` |
| Nâng cấp Creator | **VERIFIED** | `api/user/upgrade-creator` |
| Tạo / Sửa / Tìm kiếm campaign | **VERIFIED** | `api/campaigns`, `src/lib/campaign-*` |
| Gửi duyệt / Rút / Duyệt campaign | **VERIFIED** | `submit`, `withdraw`, `admin/.../review` |
| Hủy campaign + hoàn tiền | **VERIFIED** | `cancel`, `src/lib/payment/refund` |
| Chốt campaign hết hạn (cron) | **VERIFIED** | `src/lib/campaign-lifecycle.ts` |
| Reward CRUD + toggle | **VERIFIED** | `api/rewards`, `api/rewards/[id]/toggle` |
| Digital assets | **VERIFIED** | model `reward_digital_assets`, `api/rewards/[id]/digital-assets` |
| Đánh giá sản phẩm | **VERIFIED** (ràng buộc unique) | model `product_reviews` |
| Blog CRUD + publish gate | **VERIFIED** | `src/lib/blog/blog.service.ts`, `blog-policy.ts` |
| Like / Bookmark / Comment | **VERIFIED** | `api/blog/posts/[slug]/*` |
| KYC thủ công + Admin duyệt | **VERIFIED** | `api/kyc/submit`, `api/admin/kyc/[id]/review` |
| eKYC (OCR/Liveness/Face) | **VERIFIED** (code) / **UNKNOWN** (provider thật) | `src/lib/ekyc/*` |
| Hạn mức giao dịch | **VERIFIED** | `src/lib/kyc.ts` |
| Pledge + Checkout session | **VERIFIED** | `api/checkout-sessions` (min 50.000) |
| Thanh toán PayOS / SePay | **VERIFIED** (code) / **UNKNOWN** (live) | `api/payment/*` |
| Thanh toán VNPay / Momo | **UNKNOWN** | Có route, chưa có credentials sandbox |
| Tra cứu giao dịch | **VERIFIED** | `api/lookup`, `/lookup` |
| Chat 1-1 | **PARTIAL** | `api/chat/*`, `conversations`/`messages`; **mâu thuẫn Mongo vs PG cần xác minh** |
| Badges | **PARTIAL** | `api/admin/badges`, model `badges`/`user_badges` |
| Báo cáo vi phạm | **PARTIAL** | `api/admin/reports`, model `*_reports` |
| Hội viên định kỳ | **PARTIAL** | `api/memberships`, `api/cron/memberships` |
| Thuế / chứng từ | **PARTIAL** | `/dashboard/creator/thue`, `so_ledgers` |
| Profile Studio | **PARTIAL** | `api/profile/customization`, `api/profile/templates` |
| Bằng cấp / chứng chỉ | **PARTIAL** | `api/credentials`, `api/admin/credentials` |
| Dashboard quản trị | **PARTIAL** | `/dashboard/admin/*` |

### 10.1. Sai lệch đã phát hiện so với tài liệu cũ

| # | Sai lệch | Chi tiết | Ảnh hưởng |
|:---|:---|:---|:---|
| **D-01** | Tài liệu cũ ghi "Chat lưu trên MongoDB" | Schema Prisma đã có `conversations`/`messages`; repo có cả `src/services/mongodb` và `src/services/pg` | Mô tả kiến trúc sai → ảnh hưởng Test Plan |
| **D-02** | Tài liệu cũ mô tả trạng thái `PAUSED`, `COMPLETED` cho campaign | `enum CampaignStatus` chỉ gồm `DRAFT`, `PENDING_REVIEW`, `ACTIVE`, `SUCCESS`, `FAILED`, `CANCELED` — **không có** `PAUSED`, và `COMPLETED` chỉ thuộc `enum CheckoutSessionStatus` / `enum RefundStatus`. Ở campaign, `PAUSED`/`COMPLETED` chỉ là **nhãn hiển thị được suy ra** | Test Case mô tả sai đối tượng kiểm thử |
| **D-03** | Tồn tại hai mức ủng hộ tối thiểu | `src/lib/actions/pledge.ts` dùng **10.000** và redirect tới `/checkout/[id]` (**không tồn tại trang**); luồng thật là `checkout-sessions` với **50.000** | `pledge.ts` là **mã cũ/không dùng**; cần xác minh trước khi test |
| **D-04** | Hai cơ chế phân quyền song song | `role = ADMIN` và `users.isAdmin = true` cùng tồn tại | Rủi ro bảo mật không nhất quán |
| **D-05** | Tài liệu cũ mô tả xóa campaign khi `DRAFT` và chưa có pledge | Chưa tìm thấy route DELETE tương ứng trong `src/app/api/campaigns` | Yêu cầu có thể chưa được cài đặt |

---

## 11. TRUY VẾT YÊU CẦU → PHÂN HỆ KIỂM THỬ

Bảng này là cầu nối sang Test Plan và ma trận truy vết (RTM):

| Phân hệ | Yêu cầu chức năng | Yêu cầu phi chức năng liên quan |
|:---|:---|:---|
| **AUTH** | FR-AUTH-01 … 05 | NFR-SECU-01, NFR-PERF-01 |
| **CAMP** | FR-CAMP-01 … 12 | NFR-PERF-02, NFR-RELI-02, NFR-USAB-01 |
| **REWD** | FR-REWD-01 … 05 | NFR-PERF-01, NFR-SECU-01 |
| **BLOG** | FR-BLOG-01 … 05 | NFR-SECU-02, NFR-COMP-01 |
| **KYC** | FR-KYC-01 … 05 | NFR-SECU-04, NFR-MAIN-01 |

Các phân hệ ngoài phạm vi (Mục 2.2) **không có yêu cầu nào được kiểm thử** trong Phase 1 và phải được ghi rõ là ngoài phạm vi trong Test Plan, Test Report.

---

## 12. VẤN ĐỀ MỞ (OPEN ISSUES)

| # | Vấn đề | Cần quyết định |
|:---|:---|:---|
| **OI-01** | Chat dùng MongoDB hay PostgreSQL? | Xác minh `src/services/*` trước khi viết Test Plan |
| **OI-02** | `src/lib/actions/pledge.ts` còn dùng không? | Nếu không, loại khỏi phạm vi; tránh test nhầm |
| **OI-03** | Cơ chế quyền chuẩn là `role` hay `isAdmin`? | Chọn một và ghi rõ trong Test Plan |
| **OI-04** | Yêu cầu xóa campaign có được cài đặt? | Nếu chưa, chuyển sang backlog, không đưa vào Test Case |
| **OI-05** | Phạm vi Phase 1 có mở rộng sang Pledge/Kho đồ không? | Nếu có, phải bổ sung yêu cầu và Test Case tương ứng |

---

## 13. PHÊ DUYỆT

| Vai trò | Họ tên | Ký duyệt |
|:---|:---|:---|
| Người lập (Test Lead / Product Owner) | Nguyễn Quách Phú Tài (123000609) | ✅ |
| Tester — Campaign | Trần Xuân Ân (123001127) | ☐ |
| Tester — KYC | Nguyễn Khánh Du (123000159) | ☐ |
| Tester — Reward | Bùi Đặng Quốc Khánh (123001005) | ☐ |
| Tester — Blog | Nguyễn Trung Tiến (123000127) | ☐ |

---

*Tài liệu là cơ sở để xây dựng Test Plan, Test Case và Ma trận truy vết (RTM).*
*Mọi thay đổi về quy tắc nghiệp vụ trong Mục 5 phải cập nhật lại tài liệu này đồng thời với Test Case.*
