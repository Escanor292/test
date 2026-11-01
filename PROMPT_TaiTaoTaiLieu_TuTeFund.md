# PROMPT: SINH TR/TC TỪ HỆ THỐNG + TỰ CHẠY TEST + DỌN TÀI LIỆU — NHÓM 02 (23CT113) — TỬ TẾ FUND

> Cách dùng: copy toàn bộ nội dung từ dòng "BẮT ĐẦU PROMPT" trở xuống, dán vào AI (Claude/ChatGPT/Cursor/agent có terminal)
> đang mở repo `https://github.com/Escanor292/test`, kèm 2 thư mục:
> `22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)` (mẫu định dạng) và
> `23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)` (thư mục tài liệu cần dọn).
> Lưu ý: mã nguồn Next.js nằm ở **gốc repo** (`package.json`, `prisma/`, `src/`), không nằm trong thư mục tài liệu.

---

## BẮT ĐẦU PROMPT

Bạn là kỹ sư kiểm thử cho đồ án môn **Kiểm thử và Đảm bảo Chất lượng Phần mềm**. Nhiệm vụ gồm 3 phần, làm đúng thứ tự:

1. **Đọc hệ thống thật** (mã nguồn + app đang chạy) rồi **suy ra TR và TC** — không dựng user story, không chép kịch bản mẫu.
2. **Tự thực thi** những test chạy được (API, browser, unit/e2e có sẵn) và **ghi kết quả kèm bằng chứng**. Test nào bạn không chạy được thì **để trống kết quả** và ghi lý do để nhóm tự chạy.
3. **Sinh/dọn bộ tài liệu nộp bài** theo đúng định dạng mẫu Nhóm 07.

### 0. LUẬT CHƠI (vi phạm là làm lại)

1. **Không được ghi `PASS` cho một TC mà bạn chưa thực sự chạy.** Mỗi dòng có kết quả phải có bằng chứng ở cột "Bằng chứng" (lệnh + output, HTTP code, hoặc đường dẫn ảnh chụp). Không có bằng chứng = để trống kết quả.
2. **Không chạy được thì để trống, không đoán.** Cột kết quả để rỗng, cột ghi chú ghi `CHƯA CHẠY – nhóm tự test: <lý do cụ thể>`. Không dùng `PASS`/`FAIL` để "cho đủ số".
3. **Bạn tự quyết số lượng TR/TC theo độ phủ thật của code.** Không có quota "mỗi phân hệ 20 TC", không có tổng 80/200, không có tỉ lệ PASS mục tiêu. Cấm điền số cho tròn.
4. **TR/TC phải truy được về một route/màn hình/API/model có thật.** Cấm viết theo kiểu user story ("Là một người dùng, tôi muốn…") và cấm viết năng lực chung chung không đo được.
5. **Không bịa tính năng.** Tính năng có nhưng đang lỗi/thiếu → đó là `FAIL` kèm bug, không được mô tả như đã hoạt động.
6. **Không copy nội dung Sweet-Sip** — chỉ copy **cấu trúc và cách trình bày**. Sót chữ "Sweet Sip", "quán cà phê", "đồ uống", "nhóm 7" = lỗi nặng.
7. **Không ghi tên giảng viên vào ô TÁC GIẢ.** Tác giả là 5 sinh viên; GVHD chỉ xuất hiện ở dòng "Giảng viên hướng dẫn".
8. **Mọi con số trong tài liệu phải tính ra từ workbook thật** (Dashboard, RTM, Test Plan, Test Report, file kế hoạch trưởng nhóm). Không chép số từ bản tài liệu cũ.
9. **Không tạo script sinh tài liệu** trong repo (`generate_*.py`, `build_*.js`…). Xử lý bằng lệnh một lần rồi xóa, hoặc sửa file trực tiếp.
10. **Chỉ tạo đúng bộ file ở Mục 4** — trong đó `01-IC-Product-Requirements_23CT113_Nhom02.xlsx` là **bắt buộc**, không được bỏ (Mục 6). Không `.md`, `.csv`, `.txt`, không `_UPDATED`, không `_final_v2`.

---

#### 0.1. Chọn công cụ — đừng bắt một công cụ làm cả 3 pha

Ba pha có tính chất khác nhau; giao sai công cụ là nguyên nhân phổ biến nhất khiến tài liệu ra rỗng hoặc bịa.

| Pha | Việc | Công cụ đúng | Công cụ phải tránh |
|---|---|---|---|
| **P1** | Kiểm kê code, suy TR/TC (Mục 2) | agent đọc được cả repo + grep (**Cline** ở chế độ *Plan*, hoặc agent có terminal) | Aider — không quét cây thư mục, không đếm được route |
| **P2** | Chạy test, chụp bằng chứng (Mục 3) | **Cline** (terminal + browser automation + screenshot), hoặc agent có browser | Chat thuần (không browser → mọi TC giao diện **buộc** phải để trống kết quả); Aider (không có browser) |
| **P3** | Sinh `.xlsx` / `.docx` / `.pptx` (Mục 7–12) | một script Python chạy **một lần** bằng terminal (môi trường này đã có `openpyxl 3.1.5`, `python-docx`, `python-pptx 1.0.2`) | Aider — nó sửa file **text**, không sinh nội dung binary |

Luật khi dùng công cụ:

- **Cline:** bật **Plan** cho P1 và bắt nó in bảng phạm vi (2.4) **trước khi** sửa bất kỳ file nào; **Act** cho P2/P3. Chỉ trỏ `http://localhost:3000` khi test có ghi/xóa; không thao tác trên bản Vercel công khai. Đừng để nó tự bò cả repo (tốn token vô ích) — đưa danh sách file bằng `find`/`grep` của Bước 2.1 trước. Ảnh chụp phải đổ vào `evidence/` đúng tên `TC_<mã>_<số>.png`.
- **Aider (0.86.2):** **không dùng để sinh bộ tài liệu này.** Nếu vẫn dùng để đọc code thì chạy `aider --read <file> --no-auto-commits`, vì mặc định aider **tự `git commit` sau mỗi lần sửa** → làm bẩn repo và vi phạm luật 9 + 10 của Mục 0. Aider còn tạo `.aider.chat.history.md`, `.aider.input.history`, `.aider.tags.cache.v4/` ngay trong repo → phải xóa trước khi kết thúc.
- **Không đủ context:** chia theo pha; sau mỗi pha ghi 1 handoff (phân hệ đã kiểm kê / TR-TC đã chốt / TC đã chạy + kết quả / việc còn lại) vào thư mục tạm của HĐH (`%TEMP%`), **không** ghi vào repo.
- **Mặc định không tự commit/push.** Kết thúc: `git status --short` chỉ có thay đổi trong thư mục bài nộp, đúng bộ file Mục 4 + `evidence/`. **Ngoại lệ duy nhất:** đúng **một** commit + **một** push ở bước cuối để đồng bộ GitHub/Vercel, theo Mục 3.6 — không commit gì khác, không `git add -A`, không `--force`.
- Có browser **không** miễn luật 1 của Mục 0: vẫn không được ghi `PASS` khi chưa chạy. Có ảnh nhưng không mở đúng màn hình của TC = không có bằng chứng.

---

### 1. SỰ THẬT VỀ DỰ ÁN (chỉ những dòng dưới đây là cố định)

| Hạng mục | Giá trị đúng |
|---|---|
| Tên đề tài (đầy đủ) | **Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)** |
| Tên ngắn | Tử Tế Fund |
| Lớp / Nhóm | 23CT113 / Nhóm 02 |
| Trưởng nhóm | Nguyễn Quách Phú Tài — MSSV 123000609 |
| Thành viên | Trần Xuân Ân (123001127), Bùi Đặng Quốc Khánh (123001005), Nguyễn Trung Tiến (123000127), Nguyễn Khánh Du (123000159) |
| GVHD | ThS. Nguyễn Minh Phúc — **chỉ ở dòng GVHD** |
| Web Demo | https://test-gamma-azure-65.vercel.app |
| Repo | https://github.com/Escanor292/test |
| Stack | Next.js 15.1.4 (App Router) + React 19 + TypeScript + Prisma 5.22 + PostgreSQL (Neon) + NextAuth v5 beta + Tailwind + TipTap + bcrypt + Cloudinary, deploy Vercel |
| Tài khoản test (nguồn: `src/data/seed.ts`) | `admin@crowdfunding.vn` — ADMIN, mật khẩu **`Admin@123456`**; `test1@gmail.com` — BACKER, `123`; `test2@gmail.com` — CREATOR, `123`; `test3@gmail.com` — CREATOR kèm status `PRO`, `123`. Đây là 4 tài khoản **để nhóm test tay cho tiện**; **phải tự đăng nhập thử để xác nhận**. Nếu có xung đột (không vào được, sai role, bị blacklist) thì xử theo **Mục 3.5** — tạo tài khoản mới để **hệ thống tự cấp quyền**, không nâng quyền bằng tay. |

**Các điểm đã xác minh bằng đọc code — khi test phải kiểm chứng LẠI bằng lần chạy thật; nếu kết quả chạy khác thì ghi theo kết quả chạy, không ghi theo danh sách này:**

- Đăng ký: mật khẩu tối thiểu **6 ký tự**, không có max, bắt buộc tick điều khoản, có blacklist email/IP (`src/app/api/auth/register/route.ts`).
- Token reset mật khẩu: **30 phút** (`src/lib/password-reset.ts`).
- Cổng MoMo/VNPay/PayOS **trả HTTP 410** — thanh toán thật chỉ còn VietQR + admin settle thủ công. Không được viết "ví điện tử hoạt động".
- `PaymentMethodType` chỉ có CARD, BANK_ACCOUNT, MOMO, ZALOPAY — **không có COD, không có E_WALLET**.
- Chat **chưa có WebSocket**, đang polling (`src/hooks/useCall.ts`) → là giới hạn/bug, không phải realtime.
- Góp ý (`/api/feedback`) cắt 2000 ký tự, **không có min**.
- `prisma/schema.prisma`: 4 role (`ADMIN`, `BACKER`, `CREATOR_PENDING`, `CREATOR`); `CampaignStatus` DRAFT → PENDING_REVIEW → ACTIVE → SUCCESS/FAILED/CANCELED; `PledgeStatus` PENDING/SUCCESS/FAILED/REFUNDED; `KYCStatus` PENDING/VERIFIED/REJECTED/EXPIRED.

**Không có bảng TR/TC/kết quả nào được cho sẵn.** Số lượng và nội dung do bạn suy ra ở Mục 2, kết quả do bạn chạy ở Mục 3.

---

### 2. CÁCH SINH TR VÀ TC — ĐỌC HỆ THỐNG, KHÔNG DỰNG USER STORY

#### Bước 2.1 — Kiểm kê hệ thống (làm trước khi viết bất kỳ dòng TR nào)

Chạy các lệnh sau và **giữ lại output làm dữ liệu đầu vào**:

```bash
# trang và route
find src/app -name "page.tsx" | sed 's|src/app||; s|/page.tsx||' | sort
find src/app/api -name "route.ts" | sed 's|src/app||; s|/route.ts||' | sort
# model + enum
grep -E "^(model|enum) " prisma/schema.prisma
# server action, middleware, cron
ls src/lib/actions 2>/dev/null; ls src/middleware.ts src/lib/auth* 2>/dev/null; ls src/app/api/cron 2>/dev/null
# ràng buộc hợp lệ (min/max ký tự, số tiền, ngày)
grep -rn "min(\|max(\|z\.\|PASSWORD_RESET_TTL_MS" src/lib src/app/api --include=*.ts | head -80
```

Kết quả kiểm kê phải được dùng để **chia phân hệ theo cụm chức năng thật**. Đặt mã phân hệ ngắn (3–8 ký tự) và dùng y nguyên mã đó ở mọi file. Số phân hệ do bạn chốt theo code — không cần đúng 10.

#### Bước 2.2 — Suy ra TR

Một **TR = một hành vi kiểm chứng được** của hệ thống, gắn với đúng một route/màn hình/API. Viết theo dạng: *"Hệ thống [làm gì] khi [điều kiện]"*, có thể kiểm bằng một lần chạy.

- Quét **từng route/API** đã kiểm kê: mỗi route thường sinh 1–3 TR (luồng đúng, biên, âm bản, quyền).
- Quét **từng ràng buộc** trong code: mỗi ngưỡng (6 ký tự, 2000 ký tự, số tiền tối thiểu, ngày kết thúc, trạng thái enum) sinh 1 TR biên.
- Quét **phân quyền**: mỗi cặp (vai trò × tài nguyên nhạy cảm) sinh 1 TR.
- Không sinh TR cho thứ code không có (ví dụ đừng tạo TR "thanh toán MoMo thành công" khi route trả 410).

#### Bước 2.3 — Suy ra TC từ TR

Mỗi TR có **≥ 2 TC**, chọn kỹ thuật theo bản chất TR: `Functional`, `Boundary`, `Negative`, `LooknFeel`. Mỗi TC bắt buộc đủ 3 thành phần, lấy từ code chứ không bịa:

1. **Điểm vào cụ thể** — `/campaigns/create`, `POST /api/auth/register`, `/kyc`…
2. **Dữ liệu cụ thể** — email, số tiền, độ dài chuỗi, giá trị enum, ngày. Lấy đúng ngưỡng trong code (ví dụ mật khẩu 5 ký tự và 6 ký tự để thử biên).
3. **Kết quả quan sát được** — HTTP code, câu chữ trên UI, hoặc bản ghi trong DB.

**Ví dụ ĐẠT:**
```
TR-017 | TC_CAMP_003 | CAMP | Boundary | High
Mô tả: Từ chối lưu nháp chiến dịch khi ngày kết thúc nằm trong quá khứ
Tiền điều kiện: đăng nhập test1@gmail.com; KYC VERIFIED
Bước: 1. Mở /campaigns/create
      2. Nhập tiêu đề "Ung ho tre em vung cao 2026", mục tiêu 50.000.000
      3. Chọn endDate = hôm nay - 1 ngày
      4. Bấm "Lưu nháp"
Mong đợi: không tạo bản ghi; hiện lỗi cạnh ô ngày kết thúc; ở lại /campaigns/create
Bằng chứng: <lệnh/ảnh/log thực tế>
Kết quả: <PASS/FAIL/để trống>
```

**Ví dụ KHÔNG ĐẠT (cấm):** "Xác minh nghiệp vụ Quản lý Đăng nhập — Kịch bản tiêu chuẩn #01 / nhập dữ liệu kiểm thử hợp lệ / hệ thống xử lý chính xác mã 200/201".

**Cấm tuyệt đối các cụm sau (grep phải ra 0 kết quả):**
`Kịch bản kiểm thử tiêu chuẩn` · `Nhập dữ liệu kiểm thử hợp lệ` · `Thực hiện thao tác kiểm tra` · `Hệ thống xử lý chính xác` · `Dữ liệu kiểm thử hợp lệ theo đặc tả` · `Người dùng có vai trò phù hợp, hệ thống hoạt động ổn định`

#### Bước 2.4 — Báo cáo phạm vi trước khi viết tài liệu

Sau bước 2.1–2.3, in ra một bảng tạm: `phân hệ | số route | số TR | số TC dự kiến | lý do chọn` và nêu rõ TC nào sẽ chạy được, TC nào thuộc nhóm không chạy được (xem 3.3). Chỉ khi bảng này hợp lý mới bắt đầu thực thi.

---

### 3. THỰC THI — BẠN TỰ CHẠY TEST

#### 3.1. Dựng môi trường (theo thứ tự, dừng ở mức đủ dùng)

```bash
# 0) xác nhận app đang sống (không cần cài gì)
curl -s -o /dev/null -w "%{http_code}\n" https://test-gamma-azure-65.vercel.app/

# 1) chạy local (khuyến nghị cho test có ghi dữ liệu)
npm ci
npx prisma generate
npm run dev            # http://localhost:3000
```

- Repo root đã có `.env` trỏ **PostgreSQL Neon dùng chung** → **test có tạo/xóa dữ liệu phải chạy local** và chỉ dùng 4 tài khoản seed (cộng tài khoản tạo thêm theo Mục 3.5, nếu buộc phải tạo); không xóa user, không duyệt KYC hàng loạt, không bắn webhook trên bản demo công khai.
- Dữ liệu mẫu: `database/seed.sql`, `npm run seed:campaigns:fresh` (chỉ khi DB trống).
- Bộ test có sẵn: `npm test` (jest), `npm run test:db`, `npm run test:e2e` (playwright). Chạy và **trích kết quả thật** vào phần bằng chứng khi TC tương ứng trùng với case của bộ test — không thay thế việc chạy tay các TC còn lại.

#### 3.2. Ba làn thực thi (dùng làn rẻ nhất đủ chứng minh)

| Làn | Cách làm | Dùng cho | Định dạng bằng chứng |
|---|---|---|---|
| **HTTP** | `curl -i -X ...` hoặc Playwright API request với cookie/session | API: mã lỗi, validate, phân quyền, 410, redirect | `evidence/<TC_ID>_response.json` (hoặc ảnh chụp API output) |
| **Browser** | Mở trang thật bằng Playwright automation, thao tác, chụp màn hình | UI: hiển thị, form, thông báo lỗi, responsive, luồng nghiệp vụ | `evidence/<TC_ID>.png` |
| **DB/log** | truy vấn bản ghi sau thao tác (`prisma studio`, `psql`), đọc log server | trạng thái enum, dữ liệu đã lưu, thứ tự trạng thái | file log / query output |

**Quy tắc bất di bất dịch về bằng chứng:**
- Với mỗi TC đã chạy thành công (`PASS`): Bắt buộc phải có **file bằng chứng vật lý** nằm trên đĩa trong thư mục `evidence/` (`evidence/<TC_ID>.png` hoặc `evidence/<TC_ID>_response.json`).
- Cột "Bằng chứng (lệnh/ảnh/log)": Phải trỏ đúng tên file vật lý tương ứng (ví dụ: `evidence/TC_AUTH_001.png; HTTP 200` hoặc `evidence/TC_AUTH_006_response.json; HTTP 400`).
- Tuyệt đối cấm "PASS chỉ có chữ" (mô tả curl suông mà không có file lưu kết quả trên đĩa). Mỗi file bằng chứng phải tương ứng 1-1 với TC, không dùng chung 1 file cho nhiều TC (0 duplicate MD5), không để file mồ côi (0 orphan files).

#### 3.3. Nhóm KHÔNG chạy được → để trống kết quả

Các trường hợp sau **không được đoán**, phải để trống kết quả và ghi lý do:

- Chuyển tiền thật qua VietQR/ngân hàng, hoàn tiền thật, xác nhận từ app banking.
- Webhook SePay/MoMo/VNPay thật (cần merchant + chữ ký) — nếu chỉ kiểm được việc route trả 410 hoặc từ chối chữ ký sai thì đó là TC khác, được chạy.
- Đăng nhập Google OAuth (cần tài khoản Google thật) — trừ khi bạn thao tác được bằng browser.
- Nhận email/SMS thật (hộp thư, đầu số). Nếu chỉ kiểm được "hệ thống tạo token trong DB" thì ghi rõ là kiểm ở mức DB.
- Chờ 30 phút để token hết hạn — được phép lùi `created_at`/`expires` trong DB local để kiểm, ghi rõ cách làm; nếu không đụng được DB thì để trống.
- Hiệu năng tải cao (500 CCU), thiết bị di động thật/iOS Safari thật — để trống nếu chỉ có giả lập.
- Bất kỳ thao tác phá hủy trên bản demo công khai.

Ghi chú chuẩn cho các dòng này: `CHƯA CHẠY – nhóm tự test: <lý do>`. Cột "Kết quả thực thi" bắt buộc để RỖNG.

#### 3.4. Bug chỉ sinh ra từ FAIL thật

Không có danh sách bug cho sẵn. Mỗi `FAIL` phải kèm: TC ID, route/file gây lỗi, dữ liệu tái hiện, output thật. Đánh số `BUG-001…` **sau khi chạy xong**, theo thứ tự phát hiện. Nếu một TC không chạy được thì nó **không** sinh bug.

#### 3.5. Tài khoản test: dùng cái có sẵn, thiếu thì để **hệ thống tự cấp quyền**

Bốn tài khoản seed (`src/data/seed.ts`) tồn tại **để con người test tay cho tiện** — mật khẩu ngắn, dễ nhớ. Giá trị đúng (đã đọc từ seed, không phải `admin@gmail.com`/`123`):

| Email | Role | Mật khẩu | Dùng cho |
|---|---|---|---|
| `admin@crowdfunding.vn` | ADMIN (+ `isAdmin`) | **`Admin@123456`** | duyệt KYC, duyệt/feature chiến dịch, settle pledge — tài khoản duy nhất làm được |
| `test1@gmail.com` | BACKER | `123` | luồng ủng hộ / theo dõi chiến dịch |
| `test2@gmail.com` | CREATOR | `123` | luồng tạo – sửa – gửi duyệt chiến dịch |
| `test3@gmail.com` | CREATOR (status `PRO`) | `123` | luồng creator nâng cao (tier, thưởng) |

- **Đăng nhập thử cả 4 trước khi test**, ghi lại cái nào vào được, cái nào không. Không vào được thì đó là **phát hiện** (FAIL/ghi chú), không được tự đổi mật khẩu của tài khoản người khác đang dùng.
- **Chỉ khi tài khoản có sẵn thật sự không dùng được** (không đăng nhập, sai role, bị blacklist, bị đổi mật khẩu) mới tạo tài khoản mới — và tạo **qua chính app/API để hệ thống tự gán quyền**, không can thiệp DB thủ công:

| Cần role | Cách hệ thống cấp quyền | Tuyệt đối không |
|---|---|---|
| BACKER | `POST /api/auth/register` với `{name, email, password ≥ 6, confirmPassword, acceptTerms: true, isOrganization: false}` → route tự gán `BACKER` | `INSERT INTO users` |
| CREATOR | cùng route với `isOrganization: true` → route tự gán `CREATOR` | `UPDATE users SET role='CREATOR'` |
| CREATOR_PENDING → CREATOR | đăng ký BACKER → `POST /api/user/upgrade-creator` (kèm `type`, `fullName`, `idCardNumber`, `idCardFrontImage`, `idCardBackImage`) → hệ thống đặt `CREATOR_PENDING`; admin duyệt ở `/admin/kyc` hoặc `POST /api/admin/kyc/<id>/review` → `CREATOR` | tự UPDATE role sau khi nộp KYC |
| ADMIN | **không có đường tự đăng ký.** Dùng `admin@crowdfunding.vn`; nếu DB chưa có thì chạy `npx tsx src/data/seed.ts` (upsert idempotent — quyền do seed cấp, không phải sửa tay) | `UPDATE users SET role='ADMIN'`, sửa seed để nhét mật khẩu mới |

Quy ước khi buộc phải tạo: email `qa.nhom02.<mã phân hệ>@gmail.com`, mật khẩu chung `Nhom02@2026` (≥6 ký tự — **không dùng `123`** vì register chặn dưới 6), tối đa **4** tài khoản. Mỗi lần tạo ghi ngay một dòng log tạm: `email | role | lý do | thời điểm` — cuối cùng đưa vào Test Plan mục 5 và câu trả lời cuối. Sau khi tạo, **phải đăng nhập lại bằng chính tài khoản đó** và xác nhận role đúng như mong đợi; tạo xong mà không kiểm tra = coi như chưa tạo.

Cấm: xóa user, đổi role/mật khẩu của 4 tài khoản seed, chạy script xóa dữ liệu trên DB dùng chung, để lại 1 tài khoản admin mới không ghi vào tài liệu.

#### 3.6. Lộ trình thực thi kiểm thử thật 100% (Real Automated Playwright & API Harness)

Toàn bộ quá trình kiểm thử được triển khai tự động hóa bằng runner Playwright / Node.js harness:
1. **Lộ trình E2E UI:** Runner khởi động trình duyệt Chromium tự động (headless hoặc headed), mở từng route của Web Demo (`https://test-gamma-azure-65.vercel.app` hoặc localhost), tương tác form/nút bấm, xác thực giao diện và lưu ảnh chụp màn hình trực tiếp vào `evidence/<TC_ID>.png`.
2. **Lộ trình API Integration:** Runner gửi HTTP request tới các API endpoint thật, xác thực status code (200, 201, 400, 401, 403, 404, 410, 429), parse response body và lưu output json có timestamp vào `evidence/<TC_ID>_response.json` (hoặc ảnh chụp).
3. **Đồng bộ bảng tính Test Case:** Cột "Bằng chứng" trong `Test Case_23CT113_Nhom02.xlsx` được cập nhật chính xác tên file bằng chứng vật lý vừa sinh.
4. **Đối soát tính toàn vẹn:** Bộ kiểm tra Mục 10 (Check 10.1 - 10.4) tự động quét để đảm bảo 0 ca PASS thiếu bằng chứng, 0 file mồ côi, 0 tên lệch mã TC.

#### 3.7. Đồng bộ GitHub → Vercel (một lần, ở cuối)

Sự thật kỹ thuật phải nắm: `.env` local và bản Vercel cùng trỏ **một** PostgreSQL Neon, nên tài khoản tạo qua API/UI **xuất hiện trên demo ngay**, không phải deploy lại. Push lên GitHub **không** tạo tài khoản — nó chỉ để repo khớp với trạng thái DB và để Vercel build lại phần code/tài liệu đã sửa.

- Bình thường sẽ **luôn có** thay đổi để commit, vì bộ tài liệu nằm ngay trong repo (thư mục `23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)` đang được git theo dõi). Nếu `git status --short` rỗng thật (ví dụ thư mục bị gitignore) thì **không tạo commit rỗng** — chỉ kiểm chứng bằng cách đăng nhập tài khoản mới trên demo và báo rõ là không có gì để push.
- **Có sửa file trong repo** (seed, script test, tài liệu) → đúng **một** commit + **một** push ở bước cuối, sau khi Mục 14 đạt 1–5:
  ```bash
  git status --short
  git add "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)"    # + đúng file seed/script đã sửa, nếu có
  git diff --cached --stat
  git check-ignore -v .env      # phải in ra .gitignore; .env KHÔNG bao giờ được add
  git diff --cached -- '*.ts' '*.js' '*.sql' '*.json' | grep -iE "postgres://|NEXTAUTH_SECRET|CLOUDINARY_URL|API_KEY" || echo "OK: không có secret"
  git commit -m "docs(test): regenerate test documents + verify test accounts"
  git push origin HEAD          # không --force, không đổi remote
  ```
- Không `git add -A`; không commit file prompt này, `node_modules/`, `.next/`.
- Push thất bại (auth, không quyền, không mạng) → **dừng**, dán nguyên văn lỗi, không thử remote khác, không `--force`.
- Sau push: Vercel tự build từ nhánh đó. Xem được trạng thái deploy thì nêu thời điểm commit mới lên; không xem được thì ghi rõ `chưa kiểm chứng thời điểm deploy`. Luôn mở lại `https://test-gamma-azure-65.vercel.app`, đăng nhập 1 tài khoản cũ + 1 tài khoản mới (nếu có tạo) và ghi kết quả thật.

---

### 4. BỘ FILE ĐẦU RA DUY NHẤT

Thư mục: `23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/`

```
23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/
├── Test Case_23CT113_Nhom02.xlsx                       ← BẮT BUỘC (workbook)
├── 01-IC-Product-Requirements_23CT113_Nhom02.xlsx      ← BẮT BUỘC (IC/PRD, Mục 6)
├── Test Plan_23CT113_Nhom02.docx                       ← BẮT BUỘC
├── Test Report_23CT113_Nhom02.docx                     ← BẮT BUỘC
├── TimeLine/
│   ├── Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx ← GIỮ + SỬA (Mục 10)
│   ├── Biên Bản Họp Nhóm Lần 1 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx
│   ├── Biên Bản Họp Nhóm Lần 2 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx
│   ├── Biên Bản Họp Nhóm Lần 3 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx
│   └── TimeLine_23CT113_Nhom02.xlsx
├── Word+ppt Báo Cáo/
│   ├── Báo Cáo Word_23CT113_Nhom02.docx
│   ├── Nhom02_Final_Report_Software_Testing.pdf
│   └── Ppt Báo cáo Nhóm 2 - 23CT113.pptx
└── evidence/                                            ← ĐƯỢC PHÉP (ảnh/log bằng chứng)
    └── TC_<mã>_<số>.png
```

`evidence/` là ngoại lệ duy nhất được thêm file, vì mỗi kết quả PASS/FAIL giờ phải có bằng chứng. Tên file theo mã TC; không để ảnh rời rạc, không để ảnh ngoài thư mục này.

**File IC/PRD là bắt buộc** — Mục 6 quy định cách tạo. Đúng **12 file** (4 file gốc + 5 file trong `TimeLine/` + 3 file trong `Word+ppt Báo Cáo/`), cộng thêm `evidence/`.

Mẫu Nhóm 07 có 11 file (không có file kế hoạch trưởng nhóm). Bộ này hơn mẫu đúng 1 file kế hoạch trưởng nhóm + 1 file IC + thư mục `evidence/`. IC chỉ tồn tại **một** định dạng: `.xlsx`.

**Vị trí file kế hoạch trưởng nhóm:** nằm **bên trong `TimeLine/`**, không ở gốc thư mục tài liệu. Nếu còn bản ở gốc thì `mv` vào `TimeLine/` — không giữ 2 bản, không đổi tên file, không thêm `_final`/`_v2`/`_UPDATED`. Chỉ dùng đúng đường dẫn `TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx` ở mọi nơi (Test Report phụ lục, mục 1 Test Plan, checklist).

---

### 5. PHẢI XÓA

Xóa trong `23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/`:

1. `01-IC-Product-Requirements_23CT113_Nhom02.docx` — IC chỉ giữ bản `.xlsx` (Mục 6), xóa bản `.docx`.
2. `01-IC-Product-Requirements_23CT113_Nhom02.md` — bản markdown dư.
3. `Requirements_Sheet.csv`, `Test_Cases_Sheet.csv`, `Traceability_Matrix_Sheet.csv` — export dư từ Excel.
4. `Workbook_KiemThu_TuTeFund_ToanDien.xlsx` — **trùng** với `Test Case_23CT113_Nhom02.xlsx` (cùng 4 sheet). Giữ 1 file.
5. `TimeLine/Biên Bản Họp Nhóm Lần 1 – ..._UPDATED.docx` — **CẢNH BÁO: đây là bản duy nhất chứa 1 ảnh cuộc họp (≈353 KB)**; bản Lần 1 chuẩn chỉ ≈8 KB và không có ảnh. Trích ảnh chèn vào file chuẩn (caption `Hình 1. Phiên họp nhóm lần 1 – ngày …`), xác nhận ảnh hiển thị, **rồi mới** xóa.
6. `~$om2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx` (ở gốc **hoặc** trong `TimeLine/`), `~$01-IC-Product-Requirements_23CT113_Nhom02.xlsx` — file khóa tạm của Word/Excel. Xóa ở cả hai vị trí nếu còn; không ảnh hưởng file `.docx` thật.

**Không xóa file kế hoạch trưởng nhóm** khi nó đã nằm trong `TimeLine/` — đây là file được giữ lại và sửa (Mục 10), không phải file rác.

**Không xóa:** `Word+ppt Báo Cáo/`, 3 biên bản họp, `TimeLine_23CT113_Nhom02.xlsx`, Test Plan, Test Report, Test Case, `evidence/`.

---

### 6. PRD / IC — BẮT BUỘC TẠO FILE MỚI

Theo đề bài chính thức (repo `NguyenMinhPhuc/SoftwareTesting`: `Report/Final_Report_Guidelines_Software_Testing.markdown` + `Moodle_HTML/08_Huong_dan_bao_cao_cuoi_ky.html`):

- Sản phẩm bắt buộc: Test Plan, **Test Case (≥ 15)**, kết quả thực thi + **≥3 bug**, Test Report có RTM, PDF 10–15 trang, PPT 10–12 slide, ≥3 biên bản họp.
- Danh sách nộp không ghi tên PRD, nhưng **nhóm phải có file IC** — đây là yêu cầu của nhóm, không phải tuỳ chọn. Thiếu file IC = bộ tài liệu **chưa hoàn thành**, không được tuyên bố xong.

**→ LỆNH BẮT BUỘC: TẠO `01-IC-Product-Requirements_23CT113_Nhom02.xlsx`.** Chỉ một định dạng `.xlsx`. Không tạo `.docx`/`.md`/`.csv`.

**File mẫu chỉ để tham khảo khung — không được sửa trực tiếp lên file mẫu và không được Save-As đè.** Xuất ra file mới, rồi áp bảng ánh xạ dưới đây. Bản IC hiện tại trong thư mục bài nộp **sai** vì là file mẫu chưa dọn: sai tên sheet, còn placeholder, còn câu hướng dẫn của mẫu — xem 6.2.

Các phân hệ nghiệp vụ suy ra từ code ở Mục 2 cũng phải vào IC thành các nhóm `FR-xx` liên tục, khớp 1-1 với nhóm TR trong `TR List`/`RTM`: số phân hệ do bạn chốt theo code, **không gò cho đủ 10**; mã `FR` trong IC và mã `FR` trong cột `Yêu cầu đặc tả` của `RTM` phải trùng nhau từng chữ.

Bảng ánh xạ **bắt buộc áp** khi tạo file IC:

| Ô / vùng | Bản cũ sai | Phải thành |
|---|---|---|
| TÊN SẢN PHẨM | "Tu Te Fund - Crowdfunding Platform" | "Nền tảng Crowdfunding gây quỹ cộng đồng (Tử Tế Fund)" |
| TÁC GIẢ | "Lớp 23CT113 - Nhóm 02 - GVHD: ThS. Nguyễn Minh Phúc" | danh sách 5 sinh viên; GVHD chuyển xuống dòng Tổng quan |
| C8 / D8 | `phuc@lhu.edu.vn`, `nhom7_product requirement_Sweet Sip` | để trống |
| MỤC TIÊU 5 | văn của Sweet Sip | mục tiêu thật: hóa đơn – chứng từ – tra cứu công khai |
| B19/C19 | `TÊN` / `TÊN` (trùng) | `BÊN LIÊN QUAN` / `VAI TRÒ` |
| 4 dòng stakeholder | cột B là vai trò, cột C chứa tài khoản test, D/E văn Sweet Sip | B = vai trò, C = loại người dùng, D = trách nhiệm gắn route thật, E = lợi ích |
| YÊU CẦU CHỨC NĂNG | 1 nhóm + 14 dòng không mã | nhóm theo phân hệ thật ở Mục 2, mỗi dòng `FR-01…` nêu route + trạng thái enum |
| YÊU CẦU PHI CHỨC NĂNG | rời rạc, có `NFR-008` | `NFR-01…` liên tục, có ngưỡng đo được |
| GIẢ ĐỊNH / HẠN CHẾ | văn Sweet Sip (AI, localStorage, quán cà phê) | giả định + ràng buộc thật (thanh toán mô phỏng, dữ liệu seed, 3 tuần, chi phí 0đ) |
| PHỤ THUỘC | "API Google AI/Genkit" | Vercel, Neon/PostgreSQL + Prisma, NextAuth + Google OAuth, Cloudinary, VietQR |
| TIÊU CHÍ CHẤP NHẬN | đặt hàng, tồn kho, doanh thu | đăng nhập/phân quyền, tạo–duyệt chiến dịch, ủng hộ–đối soát, KYC, tra cứu công khai |
| B88/C88, B98/C98 | header trùng chữ | `YÊU CẦU`/`MỨC ƯU TIÊN`, `PHIÊN BẢN`/`NGƯỜI THỰC HIỆN` |
| PRIORITY | cột tên trống | các dòng có tên FR + mức ưu tiên + effort |
| VERSION HISTORY | `Name`, `MM/DD/YY` | 4 dòng thật, xóa placeholder |

#### 6.1. Dọn template trước khi điền nội dung

File mẫu là template dùng chung, mang sẵn rác của người khác. Thứ tự bắt buộc: **dọn trước, điền sau**. Dọn sau khi điền là nguyên nhân sinh ra file IC nửa mẫu nửa thật.

Phải xóa/đổi trong file mới:

1. Sheet `Key - DO NOT DELETE`, sheet `- Disclaimer -`, mọi sheet `Instruction`/`Sample`/`Example`/`How to use` — **xóa hẳn**, không ẩn.
2. Tiền tố `BLANK ` / `Vi_BLANK ` trong tên sheet — bỏ, chỉ còn `Product Requirements` và `Vi_Product Requirements`.
3. Toàn bộ dòng mẫu/minh họa không phải nội dung dự án.
4. Chữ `TEMPLATE` trong tiêu đề sheet — thay bằng tên sản phẩm.
5. Các heading lai: `OBJECTIVE 5`, `Constraint 3`, `Constraint 4`, `DEPENDENCY 5`, `REQUIREMENT CONDITION` (×4) — điền nội dung thật hoặc xóa dòng, **không để trơ heading**.
6. Bảng PRIORITY: 7 ô `High`/`Medium`/`Low` đang trống tên — mỗi dòng phải có tên FR + mức ưu tiên + effort.
7. VERSION HISTORY: 8 dòng `Name` / `MM/DD/YY` — thay bằng 4 dòng thật, xóa phần còn lại.
8. Các câu hướng dẫn của mẫu (`Define the overarching…`, `List and describe…`, `Identify any assumptions…`, `Outline any external factors…`, `Assess potential risks…`, `Assign priority levels…`, `Maintain a record of…`, `Incorporate diagrams…`) — thay bằng nội dung thật của dự án, không giữ câu mẫu.

Kiểm bằng lệnh, không bằng mắt — chạy trước khi nộp, kết quả phải là `0`:

```bash
python - <<'PY'
import re
from openpyxl import load_workbook
p = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx"
wb = load_workbook(p, data_only=True)
PAT = [r"MM/DD/YY", r"^\s*Name\s*$", r"^OBJECTIVE\s+\d", r"^Constraint\s+\d",
       r"^DEPENDENCY\s+\d", r"REQUIREMENT CONDITION", r"^(High|Medium|Low)$",
       r"TEMPLATE|MẪU YÊU CẦU", r"^(Identify|Outline|Assign|Maintain|Assess|Incorporate|List and describe|Define the)"]
total = 0
for ws in wb.worksheets:
    for row in ws.iter_rows():
        for c in row:
            if c.value is not None and any(re.search(p_, str(c.value)) for p_ in PAT):
                print(f"CÒN RÁC: {ws.title}!{c.coordinate} = {str(c.value)[:40]}")
                total += 1
print("TỔNG Ô RÁC TEMPLATE:", total, "| ĐẠT" if total == 0 else "| KHÔNG ĐẠT")
print("Sheet còn lại:", wb.sheetnames)
PY
```

#### 6.2. Bản EN và bản VI phải trùng khít cấu trúc

Hai sheet `Product Requirements` (EN) và `Vi_Product Requirements` (VI) phải **cùng số dòng có nội dung, cùng số mục, cùng thứ tự, cùng số bảng**. Khi dịch **không được lược mục nào**; mục không dịch được thì giữ nguyên nhãn gốc + ghi `N/A`. Lệch số dòng giữa hai bản = lỗi, vì bản EN thường bị bỏ rơi nửa chừng.

```bash
python - <<'PY'
from openpyxl import load_workbook
p = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/01-IC-Product-Requirements_23CT113_Nhom02.xlsx"
wb = load_workbook(p, data_only=True)
names = wb.sheetnames
def norm(s):
    return s.lower().replace("blank ", "").strip()
def pick(want_vi):
    for s in names:
        n = norm(s)
        if "product requirements" in n and n.startswith(("vi", "vn")) == want_vi:
            return s
    return None
en, vi = pick(False), pick(True)
if not en or not vi:
    print("KHÔNG KIỂM ĐƯỢC: không tìm ra cặp sheet EN/VI trong", names)
    raise SystemExit(1)
def rows(ws):
    return [r for r in range(1, ws.max_row + 1)
            if any(ws.cell(r, c).value not in (None, "") for c in range(1, ws.max_column + 1))]
a, b = rows(wb[en]), rows(wb[vi])
print(f"EN={len(a)} dòng | VI={len(b)} dòng | lệch={abs(len(a)-len(b))}")
print("ĐẠT" if len(a) == len(b) else "KHÔNG ĐẠT")
PY
```

#### 6.3. Quét dấu vết sản phẩm cũ trên mọi sheet

Áp danh sách đen của Mục 0 luật 6 lên **toàn bộ ô của mọi sheet còn lại**, kể cả sheet ẩn: `sweet sip`, `quán`, `đồ uống`, `trà sữa`, `cà phê`, `thực đơn`, `món`, `order`, `shop`, `restaurant`, `drink`, `beverage`, `cake`, `food`. Ba chỗ hay sót nhất: mô tả mục tiêu, chân dung người dùng, phụ lục công nghệ. Mỗi ô bắt được phải sửa hoặc xóa; `0` hit mới được coi là sạch.

#### 6.4. Bằng chứng phải là file, không phải câu văn

Cột `Bằng chứng` của `TC List` là chỗ dễ tự lừa mình nhất. `curl ... -> HTTP 200` là **mô tả việc đã làm**, không phải bằng chứng ai khác kiểm lại được.

- `PASS` chỉ hợp lệ khi có **ít nhất một file**: ảnh `.png`, log/response `.txt`/`.json`, hoặc output chạy test có timestamp.
- Tên file khớp mã TC: `evidence/TC_<mã>_<số>.png`. Không dùng lại một ảnh cho nhiều TC.
- Ảnh phải chứa **dấu vết dữ liệu của chính TC đó**: URL trên thanh địa chỉ (chụp cả cửa sổ trình duyệt, không chụp mỗi vùng nội dung) + một giá trị đặc trưng (email, ID, mã chiến dịch, số tiền) trùng với cột `Dữ liệu kiểm thử`.
- Ảnh có trên đĩa mà không TC nào dẫn tới = **file mồ côi**, phải xóa hoặc gắn đúng TC. Ảnh có tên TC này nhưng nội dung là màn hình của TC khác = lỗi nặng hơn cả không có ảnh.
- Không có trình duyệt thì **không được ghi `PASS` cho TC giao diện**: để trống kết quả và ghi `CHƯA CHẠY – thiếu trình duyệt` (luật 2, Mục 0).

```bash
python - <<'PY'
import os, re, glob
from openpyxl import load_workbook
BASE = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)"
wb = load_workbook(os.path.join(BASE, "Test Case_23CT113_Nhom02.xlsx"), data_only=True)
ws = wb["TC List"]
disk = {os.path.basename(f) for f in glob.glob(os.path.join(BASE, "evidence", "*"))}
weak, orphan_ok, bad = [], set(), []
for r in range(2, ws.max_row + 1):
    tid = str(ws.cell(r, 2).value or "")
    res = str(ws.cell(r, 10).value or "").strip().upper()
    ev = str(ws.cell(r, 11).value or "")
    if not tid:
        continue
    files = re.findall(r"[A-Za-z0-9_\-]+\.(?:png|jpg|jpeg|txt|json|log)", ev)
    real = [f for f in files if f in disk]
    if res == "PASS":
        (weak.append(tid) if not real else orphan_ok.update(real))
    for f in real:
        if not f.startswith(tid):
            bad.append(f"{tid} dẫn {f}")
orphan = sorted(disk - orphan_ok)
print(f"PASS không có file bằng chứng: {len(weak)} -> {weak[:40]}")
print(f"Ảnh mồ côi: {orphan}")
print(f"Ảnh gắn sai mã TC: {bad[:20]}")
print("ĐẠT" if not weak and not orphan and not bad else "KHÔNG ĐẠT")
PY
```

#### 6.5. Cổng chặn — không nộp nếu còn bất kỳ mục nào dưới đây chưa đạt

- [ ] `01-IC-Product-Requirements_23CT113_Nhom02.xlsx` tồn tại, là **file mới**, không phải file mẫu Save-As đè.
- [ ] Chỉ còn 2 sheet nội dung, tên không còn `BLANK`, không còn `Key - DO NOT DELETE` / `- Disclaimer -`.
- [ ] Script 6.1 in `TỔNG Ô RÁC TEMPLATE: 0`.
- [ ] Script 6.2 in `ĐẠT` (EN và VI cùng số dòng).
- [ ] Mục 6.3 quét danh sách đen: 0 hit.
- [ ] Script 6.4 in `ĐẠT` (không PASS thiếu file, không ảnh mồ côi, không ảnh sai mã TC).
- [ ] Mã `FR-xx` trong IC khớp từng chữ với cột `Yêu cầu đặc tả` của `RTM`.
- [ ] Số phân hệ trong IC = số nhóm TR trong `TR List`, không tự ý nới cho đủ 10.

Thiếu bất kỳ ô nào: **chưa xong việc**, không được tuyên bố hoàn thành trong câu trả lời cuối.

---

### 7. WORKBOOK `Test Case_23CT113_Nhom02.xlsx`

Giữ 4 sheet: `TongQuan_Dashboard`, `TR List`, `TC List`, `RTM`.

#### 7.1. `TR List`
`STT | TR ID | Phân hệ | Tên Yêu cầu Kiểm thử | Kỹ thuật áp dụng | Điểm vào (route/API) | Mục tiêu kiểm thử & đặc tả nghiệp vụ`

- Số dòng = số TR suy ra ở Mục 2 (không đặt trước). Cột "Điểm vào" bắt buộc có route/API thật.
- Mỗi TR chỉ một hành vi; kỹ thuật chọn theo bản chất, không lặp máy móc.

#### 7.2. `TC List`
`TR ID | TC ID | Phân hệ | Kịch bản kiểm thử | Mức độ ưu tiên | Điều kiện tiên quyết | Các bước thực hiện | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực thi | Bằng chứng (lệnh/ảnh/log) | Ngày chạy`

- **Cột "Kết quả thực thi"** chỉ nhận 3 giá trị hoặc **để trống**: `PASS`, `FAIL`, `BLOCKED`.
- **Để trống = chưa chạy được**; khi đó cột "Bằng chứng" ghi `CHƯA CHẠY – nhóm tự test: <lý do>`.
- **Đã chạy** thì "Bằng chứng" phải có lệnh + output thật, HTTP code, hoặc `evidence/TC_xxx.png`; "Ngày chạy" ghi `dd/mm/yyyy hh:mm`.
- Không TC nào được có kết quả mà bằng chứng trống.

#### 7.3. `RTM`
`STT | TR ID | Phân hệ | Tên TR | Yêu cầu đặc tả (FR/NFR) | Danh sách TC | Tổng TC | Đã chạy | PASS | FAIL | BLOCKED | Chưa chạy | Người phụ trách`

- Cột `Đã chạy` = PASS + FAIL + BLOCKED; `Chưa chạy` = Tổng TC − Đã chạy. Dùng công thức thật, không gõ tay.
- Cột "Yêu cầu đặc tả": vì **không có file IC** (Mục 6), ghi trực tiếp mã nhóm chức năng tự đánh ở đây (dạng `FR-01 — <tên phân hệ>`) hoặc `NFR-xx` cho ràng buộc phi chức năng. Không bịa mã FR từ tài liệu không tồn tại, không ghi "xem IC".

#### 7.4. `TongQuan_Dashboard`
Giữ các khối của mẫu: thông tin lớp/đề tài/GVHD/demo; **chỉ số tổng tính bằng công thức từ `TC List`**: tổng TR, tổng TC, đã chạy, PASS, FAIL, BLOCKED, chưa chạy, **% PASS trên số đã chạy** (không tính trên tổng TC); bảng theo phân hệ; bảng phân bổ ưu tiên. Không gõ số tổng bằng tay.

#### 7.5. Định dạng
Tiếng Việt có dấu, header in đậm + nền màu + freeze dòng 1, wrap text, độ rộng cột đủ đọc, không ô trống ở cột bắt buộc, không merge bừa.

---

### 8. `Test Plan_23CT113_Nhom02.docx`

Times New Roman 12, A4 (lề trên/dưới 2 cm, trái 3 cm, phải 2 cm), header/footer + số trang.

1. Thông tin dự án & đội ngũ (bảng 5 thành viên: vai trò, phân hệ phụ trách, số TR/TC **lấy từ workbook**).
2. Mục tiêu + tiêu chí chất lượng: nêu ngưỡng dựa trên số đã chạy (ví dụ "≥ 85% PASS trên các TC đã thực thi"), không đặt trước tỉ lệ khi chưa chạy.
3. Phạm vi: **trong** các phân hệ ở Mục 2; **ngoài** — nêu đúng các mục thuộc 3.3 (thanh toán thật, COD, WebSocket, mobile app, tải cao…).
4. Phương pháp: hộp đen thủ công, Functional/Boundary/Negative/LooknFeel; mô tả ngắn **ba làn thực thi** ở 3.2 (HTTP/browser/DB) và cách ghi bằng chứng.
5. Môi trường & dữ liệu: Web Demo Vercel + local (Node, PostgreSQL/Neon, `database/seed.sql`), Chrome/Edge, viewport 390×844 và 1920×1080, **bảng tài khoản đã dùng để test** (`email | role | đăng nhập được? | nguồn: seed / tạo thêm`), lấy từ Mục 1 và Mục 3.5 — chỉ ghi tài khoản đã đăng nhập thật, nêu rõ tài khoản nào do nhóm tạo thêm.
6. Lịch trình 3 tuần + phân công (khớp bảng ở mục 1).
7. Tiêu chí bắt đầu / tạm dừng / kết thúc.
8. Rủi ro & giảm thiểu (≥5, cùng nội dung IC).
9. **Không** dán toàn bộ TC vào đây — chỉ tổng hợp và trỏ sang workbook.

---

### 9. `Test Report_23CT113_Nhom02.docx`

1. Thông tin chung (dự án, build/version, ngày, môi trường, người thực hiện).
2. Tóm tắt kết quả **theo số liệu thật của workbook**: tổng TR, tổng TC, đã chạy, PASS/FAIL/BLOCKED, **số TC chưa chạy** và lý do; % PASS tính trên số đã chạy; độ bao phủ = số TR có ≥1 TC đã chạy / tổng TR.
   Nếu còn nhiều TC chưa chạy thì **nói rõ** và ghi danh sách ngắn để nhóm chạy nốt. Không được trình bày như đã kiểm thử 100%.
3. Bảng kết quả theo phân hệ (lấy từ RTM).
4. **Bug report** chỉ gồm bug từ FAIL thật: `BUG-ID | Phân hệ | Tiêu đề | Mức độ | TC liên quan | File/route gây lỗi | Dữ liệu tái hiện | Trạng thái`.
   Mỗi bug phải dẫn được file:route thật (ví dụ `src/app/api/auth/register/route.ts`, `src/app/api/payment/*/webhook/route.ts`).
5. Đánh giá & khuyến nghị (ưu tiên theo mức độ bug thật).
6. Kết luận + bài học; nêu thẳng phần chưa kiểm thử được.
7. Phụ lục: RTM tóm tắt, 3 biên bản họp, ảnh minh chứng.

---

### 10. `TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx` — GIỮ VÀ SỬA

Đường dẫn cố định: `23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx`. File này **nằm trong `TimeLine/`** (cùng chỗ với 3 biên bản họp và `TimeLine_23CT113_Nhom02.xlsx`) — không đặt ở gốc thư mục, không tạo bản thứ hai.

Mẫu Nhóm 07 không có file này nhưng phải giữ (điểm "Làm việc nhóm"). Giữ bố cục hiện tại (3 mục + 2 bảng), sửa cho khớp code và workbook:

- Bảng 1 (đóng góp): 5 dòng, cột nhiệm vụ ghi **mã phân hệ + số TR/TC thật** (dạng `mã phân hệ — TR-xxx→TR-yyy — n TC`, số lấy từ workbook), kèm review chéo.
- Bảng 2 (bug): chỉ giữ bug thật từ FAIL, mỗi dòng thêm **file/hằng số** gây lỗi.
- **Thêm mục 4 "ĐỐI CHIẾU PHÂN HỆ ↔ MÃ NGUỒN ↔ TR/TC"**: `Phân hệ | Route/API chính | Model Prisma | TR | TC | Đã chạy | PASS/FAIL/BLOCKED | Chưa chạy`.
- Mọi con số lấy từ workbook; không thêm nhận xét cảm tính không căn cứ.

#### 10.1. Cách dựng file (bắt buộc theo đúng thứ tự)

1. **Sửa tại chỗ, không dựng lại từ đầu:** mở file bằng `python-docx` (`Document(path)` → sửa `paragraphs`/`tables` → `save` cùng đường dẫn). Lý do: file đang có sẵn font Times New Roman 12, lề A4, khung bảng và tiêu đề trường/khoa — tạo `Document()` mới sẽ mất hết định dạng này và lệch mẫu.
2. Chỉ khi file **không còn tồn tại** mới tạo mới, và phải theo đúng khung ở 10.2 (đủ 4 dòng tiêu đề + 4 mục + 3 bảng), cùng cỡ chữ/lề như trên.
3. Không tạo `_UPDATED`, `_final`, `_v2`; không xuất thêm `.pdf`/`.md` của file này.

#### 10.2. Khung bắt buộc của file (đúng 4 mục + 3 bảng)

**Khối tiêu đề (giữ nguyên 4 dòng):**
```
TRƯỜNG ĐẠI HỌC LẠC HỒNG - KHOA CÔNG NGHỆ THÔNG TIN
BÁO CÁO TỔNG HỢP CỦA TRƯỞNG NHÓM VỀ KẾ HOẠCH VÀ KẾT QUẢ KIỂM THỬ CUỐI KỲ
Học phần: Kiểm thử và Đảm bảo Chất lượng Phần mềm | Lớp: 23CT113 - Nhóm: Nhóm 02
Trưởng nhóm: Nguyễn Quách Phú Tài (MSSV: 123000609)
```

**Mục 1 — ĐÁNH GIÁ TIẾN ĐỘ VÀ SỰ ĐÓNG GÓP CỦA CÁC THÀNH VIÊN**
- Đoạn dẫn: nêu khoảng thời gian thực hiện (3 tuần), số buổi họp thật, cách phối hợp; không dùng câu khen chung chung không có dữ kiện.
- **Bảng 1** — đúng 6 dòng (1 header + 5 thành viên) × 8 cột:
  `STT | Thành viên | MSSV | Vai trò | Nhiệm vụ phân hệ | Khối lượng | Review chéo | Đánh giá`
  - `Nhiệm vụ phân hệ`: mã phân hệ thật suy ra ở Mục 2 + khoảng TR/TC của người đó, lấy từ workbook.
  - `Khối lượng`: dạng `<n> TR & <n> TC` — **số thật**, không chia đều cho đẹp.
  - `Review chéo`: người thật trong nhóm, thành vòng tròn khép kín (A→B→C→D→E→A).
  - `Đánh giá`: chỉ được ghi `100%` khi **toàn bộ** TC của người đó đã có kết quả thực thi; nếu còn TC chưa chạy thì ghi `x/y TC đã chạy` thay vì 100%.

**Mục 2 — TỔNG HỢP KẾT QUẢ THỰC THI KIỂM THỬ**
- **Tiêu đề đề mục không được chứa số.** Bản cũ ghi cứng `(173 PASS / 23 FAIL / 4 BLOCKED)` → bỏ hẳn phần ngoặc, chỉ để `2. TỔNG HỢP KẾT QUẢ THỰC THI KIỂM THỬ`, vì số sẽ thay đổi sau khi chạy.
- Đúng 4 bullet, mỗi bullet lấy số **tính ra từ `TC List`/`RTM`** (không gõ tay, không chép từ bản cũ):
  1. Tổng số TR + số phân hệ thật.
  2. Tổng số TC + phân bổ ưu tiên High/Medium/Low.
  3. `PASS / FAIL / BLOCKED` + **% PASS trên số TC đã chạy** (không tính trên tổng TC).
  4. **Số TC chưa chạy + lý do** (gộp theo nhóm ở Mục 3.3).
- Cấm câu khẳng định "đạt chuẩn chất lượng ≥ 85%" khi chưa chạy hết; nếu % PASS thật dưới ngưỡng thì ghi đúng con số và nêu nguyên nhân.

**Mục 3 — BẢNG CHI TIẾT BUG REPORT**
- Tiêu đề **không chứa số bug cứng** (bản cũ ghi "14 BUG REPORTS"); số dòng bảng quyết định số bug.
- **Bảng 2** — 1 header + n bug, 7 cột:
  `Mã Bug | Phân hệ | Tiêu đề lỗi phát hiện | Mức độ | File/route gây lỗi | Dữ liệu tái hiện | Hướng xử lý đề xuất`
- Chỉ chứa bug sinh từ `FAIL` thật (Mục 3.4). Nếu số bug thật **< 3** thì báo rõ trong câu trả lời cuối và **chạy thêm test** để tìm bug thật — tuyệt đối không giữ bug cũ cho đủ số.
- Cột `File/route gây lỗi` phải là đường dẫn thật trong repo (ví dụ `src/app/api/auth/register/route.ts`) hoặc hằng số thật (`PASSWORD_RESET_TTL_MS`).

**Mục 4 — ĐỐI CHIẾU PHÂN HỆ ↔ MÃ NGUỒN ↔ TR/TC** (mục mới, bắt buộc)
- **Bảng 3** — đúng `số phân hệ + 1` dòng × 8 cột:
  `Phân hệ | Route/API chính | Model Prisma | TR | TC | Đã chạy | PASS/FAIL/BLOCKED | Chưa chạy`
- Dòng tổng cuối bảng phải khớp tuyệt đối với `TongQuan_Dashboard` và `RTM`.

#### 10.3. Định dạng

Times New Roman 12, giãn dòng 1.15–1.3, lề A4 (trên/dưới 2 cm, trái 3 cm, phải 2 cm), tiêu đề mục in đậm, bảng có header in đậm + kẻ khung, không merge ô bừa, không ô trống ở cột bắt buộc, tiếng Việt có dấu.

#### 10.4. Kiểm tra sau khi sửa

Đọc lại file bằng `python-docx` và in ra để đối chiếu: số đoạn văn, số bảng (phải là **3**), số dòng bảng 1 (**6**) và bảng 3 (**số phân hệ + 1**); grep chữ `173`, `23 FAIL`, `200 TC`, `14 BUG`, `Sweet Sip` phải ra **0 kết quả**. Con số trong mục 2 và mục 4 phải trùng `TC List`.

---

### 11. 3 BIÊN BẢN HỌP + TIMELINE

- Giữ nguyên tên file, mỗi phiên 1 `.docx`: thời gian, địa điểm/hình thức, thành viên (5/5), nội dung theo tuần (tuần 1 chốt đề tài + Test Plan; tuần 2 TC + thực thi; tuần 3 Test Report + slide + rà soát), quyết định, phân công, **ảnh cuộc họp có caption**.
- Ảnh họp hiện chỉ có trong file `_UPDATED` → chuyển sang file chuẩn **trước khi** xóa (Mục 5.5).
- `TimeLine_23CT113_Nhom02.xlsx`: 3 tuần × công việc/người/hạn/trạng thái, khớp Test Plan.

---

### 12. `Word+ppt Báo Cáo/`

- `Báo Cáo Word_23CT113_Nhom02.docx`: hợp nhất 6 phần (Giới thiệu → Test Plan → Test Case → Kết quả & Bug → Test Report → Kết luận), 10–15 trang, mục lục + số trang.
- `Nhom02_Final_Report_Software_Testing.pdf`: xuất từ file Word trên, đúng tên quy định.
- `Ppt Báo cáo Nhóm 2 - 23CT113.pptx`: 10–12 slide, mọi thành viên có phần trình bày, 10–15 phút.
- **Nếu số liệu thực tế khác các con số trong PPT/PDF cũ thì phải sửa lại cho khớp** — không để PPT nói 200 TC trong khi workbook có 90.

---

### 13. NHỮNG LỖI PHẢI TRÁNH (rút ra từ bản cũ)

1. **Chép kết quả có sẵn**: bản cũ khóa cứng 200 TC / 173 PASS / 23 FAIL / 4 BLOCKED và 173 dòng trong đó là câu rác "kịch bản tiêu chuẩn #01". Không lặp lại: kết quả chỉ đến từ lần chạy thật.
2. **Sinh TC bằng vòng lặp** cho đủ số → vô giá trị khi chấm.
3. **Copy nửa vời từ mẫu**: đổi tên sản phẩm nhưng giữ "Sweet Sip", "quán cà phê", "gợi ý đồ uống", "nhóm 7" → phải đọc lại từng ô.
4. **Nhét GVHD vào TÁC GIẢ**.
5. **Sinh 5 phiên bản của cùng một tài liệu** (xlsx + docx + md + csv + workbook trùng).
6. **Số liệu lệch giữa các file** (Dashboard, RTM, Test Plan, Test Report, kế hoạch trưởng nhóm) → một nguồn số duy nhất là workbook.
7. **Ghi tính năng không tồn tại** (ví điện tử, WebSocket, COD, AI gợi ý).
8. **Ghi sai tài khoản test**: admin là `admin@crowdfunding.vn` / `Admin@123456` (**không phải** `admin@gmail.com` / `123`); `test2` và `test3` đều là CREATOR (`test3` có status `PRO`), không phải "người dùng thường".
9. **Nâng quyền bằng tay** để test (sửa `role` trong DB, `INSERT` user, đổi mật khẩu seed) — quyền phải do chính hệ thống cấp (Mục 3.5).
10. **Sinh lại PRD/IC dù đề bài không yêu cầu** — IC chỉ là đầu vào giả định, không nằm trong danh sách nộp; sinh ra là tự tạo thêm việc sửa (Mục 6).

---

### 14. CHECKLIST TỰ KIỂM (chạy thật, dán kết quả vào câu trả lời cuối)

```bash
# 0) Repo sạch: không rác do công cụ sinh ra, chưa commit gì ngoài phạm vi
cd .. && git status --short && git log --oneline -1
# kỳ vọng: chỉ có thay đổi trong "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/" (+ file seed/script nếu có sửa)
# chưa chạy commit/push ở bước này — commit duy nhất ở check 6
ls -a | grep -E "^\.aider" || echo "OK: không có rác aider"
ls 23CT113*/generate_*.py 23CT113*/build_*.js 2>/dev/null || echo "OK: không có script sinh tài liệu"
cd "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)"

# 1) Đếm file: đúng 12 file (có IC .xlsx) + evidence/*
find . -type f ! -name '~$*' | sort
# kỳ vọng: TimeLine/ gồm 5 file — 3 biên bản họp + TimeLine_23CT113_Nhom02.xlsx
#          + Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx

# 1b) File kế hoạch trưởng nhóm phải nằm TRONG TimeLine/, không ở gốc
ls "TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx"   # phải tồn tại
ls "Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx" 2>/dev/null # phải "No such file"
find . -maxdepth 1 -name 'Nhom2_Ke_hoach*'           # phải rỗng

# 2) Không còn rác Sweet-Sip / cụm văn mẫu
grep -ril "sweet sip\|nhóm 7\|nhom7\|phuc@lhu.edu.vn\|quán cà phê\|gợi ý đồ uống" . || echo "OK: sạch"
grep -ril "Kịch bản kiểm thử tiêu chuẩn\|Nhập dữ liệu kiểm thử hợp lệ\|Hệ thống xử lý chính xác" . || echo "OK: không còn TC rác"

# 3) IC tồn tại đúng 1 bản .xlsx, không còn bản .docx/.md/.csv, không workbook trùng
ls 01-IC-Product-Requirements_23CT113_Nhom02.xlsx        # phải tồn tại
ls 01-IC-*.docx 01-IC-*.md *.csv Workbook_* 2>/dev/null   # phải "No such file"

# 3b) Chạy 3 cổng chặn của Mục 6 — cả 3 phải in ĐẠT
#   script 6.1 (rác template) / 6.2 (EN-VI cùng số dòng) / 6.4 (bằng chứng là file thật)
```

```python
# 4) Kiểm tra workbook bằng dữ liệu thật
import openpyxl, collections
wb = openpyxl.load_workbook("Test Case_23CT113_Nhom02.xlsx")
tc, tr, rtm = wb["TC List"], wb["TR List"], wb["RTM"]
hdr = [c.value for c in tc[1]]
i_st, i_ev = hdr.index("Kết quả thực thi"), hdr.index("Bằng chứng (lệnh/ảnh/log)")
rows = list(tc.iter_rows(min_row=2, values_only=True))
st = collections.Counter((r[i_st] or "TRỐNG") for r in rows)
print("TR:", tr.max_row - 1, "TC:", len(rows), dict(st))

# 4a) Không có PASS/FAIL nào thiếu bằng chứng
thieu = [(r[1]) for r in rows if r[i_st] in ("PASS", "FAIL", "BLOCKED") and not (r[i_ev] or "").strip()]
print("Thiếu bằng chứng:", thieu)        # phải là []

# 4b) Dòng để trống phải có lý do
khong_ly_do = [(r[1]) for r in rows if not (r[i_st] or "").strip()
               and "CHƯA CHẠY" not in (r[i_ev] or "").upper()]
print("Trống mà không ghi lý do:", khong_ly_do)   # phải là []

# 4c) Không còn câu văn mẫu
print("TC văn mẫu:", sum("tiêu chuẩn" in (r[3] or "").lower() for r in rows))   # phải = 0

# 5) File kế hoạch trưởng nhóm: đúng 3 bảng, đủ 4 mục, không còn số cứng của bản cũ
import docx
k = docx.Document("TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx")
print("bảng:", len(k.tables), "| bảng 1:", len(k.tables[0].rows), "| mục 4:", sum("ĐỐI CHIẾU PHÂN HỆ" in (p.text or "") for p in k.paragraphs))
txt = "\n".join(p.text for p in k.paragraphs)
print("còn số cứng:", [x for x in ("173", "200 TC", "14 BUG", "86.5") if x in txt])   # phải = []
```

```bash
# 6) Đồng bộ GitHub/Vercel — CHỈ chạy sau khi 1–5 đạt, đúng 1 lần
cd ..
git log --oneline -2
git status --short                      # sau push phải rỗng
git remote -v | grep -q "Escanor292/test" && echo "OK: đúng remote" || echo "DỪNG: sai remote"
git diff HEAD~1 --name-only | grep -E "(^|/)\.env" && echo "DỪNG: commit chứa .env" || echo "OK: không có .env"
git diff HEAD~1 -- '*.ts' '*.js' '*.sql' '*.json' | grep -iE "postgres://|NEXTAUTH_SECRET|CLOUDINARY_URL|API_KEY" || echo "OK: không có secret"
```

Kiểm tra tài khoản (phần bắt buộc, không phải lệnh): đăng nhập lại **4 tài khoản seed** + **mọi tài khoản tạo thêm ở 3.5**, cả trên `http://localhost:3000` và trên demo Vercel; dán kết quả từng cái (`email → vào được / lỗi gì`) vào câu trả lời cuối.

**Điều kiện dừng:** 4 nhóm check đều đạt; **file IC `.xlsx` tồn tại và qua cả 3 script ở Mục 6.1/6.2/6.4** (thiếu IC là chưa xong); **repo không có rác công cụ** (`.aider*`, `generate_*.py`, `build_*.js`); **đúng 1 commit + 1 push** (hoặc 0 nếu `git status` rỗng), commit không chứa `.env`/secret và không chứa file ngoài phạm vi (Mục 3.6); không còn file ngoài Mục 4; **file kế hoạch trưởng nhóm nằm trong `TimeLine/`** và có đủ 4 mục + 3 bảng của Mục 10.2; mọi con số khớp giữa Dashboard / RTM / Test Plan / Test Report / kế hoạch trưởng nhóm / PPT; và trong câu trả lời cuối cùng bạn phải báo rõ: **đã chạy bao nhiêu TC, còn bao nhiêu để trống và vì sao, bao nhiêu bug thật, tài khoản test nào đã dùng / tạo thêm và tài khoản nào không đăng nhập được**.

Không được tuyên bố "đã kiểm thử" hay "đạt 86%" khi chưa chạy checklist. Nếu một mục không đạt: sửa đúng file gây lỗi, chạy lại **chỉ** check đó, rồi báo lại.
