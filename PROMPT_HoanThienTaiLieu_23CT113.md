# PROMPT — HOÀN THIỆN & KIỂM ĐẠT BỘ TÀI LIỆU 23CT113 (NHÓM 02)

> Dán toàn bộ file này vào AI (một lần, không cần hỏi lại). AI phải tự làm — tự kiểm — tự sửa tới khi ĐẠT, tối đa 3 vòng, rồi mới báo cáo.

---

## 0.1. TRẠNG THÁI MỚI NHẤT (02/11/2026) — ĐỌC TRƯỚC KHI LÀM

Đã xong, **không làm lại** (sẽ đè mất kết quả):
- 7 file Word: `Normal` = Times New Roman 12 (ascii + eastAsia); có `Heading 1`/`Heading 2`.
- `Báo Cáo Word`: mục lục **field TOC** thật (đã cập nhật số trang), footer số trang, mục `TÀI LIỆU THAM KHẢO` (8 nguồn), `PHỤ LỤC A`, `PHỤ LỤC B` (B.1/B.2/B.3 — 3 biên bản).
- PDF đã xuất lại: **14 trang** (bỏ ngắt trang cứng từng chương để về đúng 10–15 trang).
- Đã sửa số liệu sai: Phụ lục A `23 ảnh chụp / 94 json / 11 log` → `29 / 92 / 7` (đếm từ `evidence/`); biên bản 3 `KIỂM THỨ` → `KIỂM THỬ`, phân loại bug `8/12/6` → `10/14/2` (theo bảng bug Test Report); 16 chỗ `73.1%` → `73,1%`.
- Bản sao lưu trước khi sửa: `_backup/truoc_sua_dinh_dang/`.

**Còn lại của prompt này:** chỉ còn **Nhiệm vụ A (đổi tên file kế hoạch)** nếu người dùng đồng ý; phần B–G đã đạt, chạy mục 6 để xác nhận lại bằng số.

---

---

## 0. NHIỆM VỤ MỘT CÂU

Làm cho bộ tài liệu `23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)` **đủ chuẩn để nộp**: đổi tên file kế hoạch, chuẩn hóa heading/mục lục/văn phong, đồng bộ số liệu giữa Excel ↔ Word ↔ PPT, và **mọi khẳng định kỹ thuật phải đối chiếu được với mã nguồn thật** — không bịa, không làm đẹp số.

---

## 1. DỮ KIỆN ĐÃ XÁC MINH (dùng làm chuẩn, KHÔNG tự suy diễn số khác)

Thư mục gốc: `D:\Kiem_Thu\testing\23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)\`

| Hạng mục | Số chuẩn | Nguồn đã đo |
|---|---|---|
| TR (yêu cầu kiểm thử) | **42** | `Test Case_...xlsx` sheet `TR List`, dòng 2–43 |
| TC (kịch bản kiểm thử) | **104** | sheet `TC List`, dòng 2–105 |
| PASS / FAIL / BLOCKED | **76 / 28 / 0** | `TC List` cột `J` (Kết quả thực thi) |
| Tỷ lệ pass | **73,1 %** | 76/104 |
| Bug phát hiện | **26** | `Test Report_...docx` bảng 2 (27 dòng kể header) |
| Thành viên | **5** (Tài 123000609, Ân 123001127, Khánh 123001005, Tiến 123000127, Du 123000159) | `TimeLine/TimeLine_...xlsx` sheet `Phân công` |
| Phân hệ | **10**: AUTH 5TR/12TC · KYC 4/11 · CAMP 5/15 · REWARD 4/8 · PLEDGE 5/10 · CERT 4/10 · COMM 4/11 · BLOG 4/12 · CHAT 3/6 · ADMIN 4/9 | `Nhom2_Ke_hoach_...docx` bảng 3 |
| Ưu tiên TC | High 59 · Medium 33 · Boundary 4 · Low 8 | đoạn 10 của file kế hoạch |
| Môi trường | Node.js 24 + Next.js 15.1 + Neon Postgres, demo `https://test-gamma-azure-65.vercel.app` | `TongQuan_Dashboard!F5`, `!B4` |
| Số trang PDF đã xuất | **14 trang** (đúng khoảng 10–15) | đếm bằng pypdf, lần xuất 02/11/2026 |
| Font Normal | **Cả 7 file Word đã đặt Times New Roman 12** (ascii + eastAsia). 25 run "10 pt" từng đo thực chất là khối mục lục gõ tay — khối này đã bị xoá, không phải thân bài | python-docx, kiểm lại 02/11/2026 |

**Đã kiểm và THẤY ĐÚNG — cấm sửa (đừng "sửa" thành sai):**
- Công thức dashboard đã trỏ đúng `'TC List'!$C$2:$C$105`, `$E$2:$E$105`, `$J$2:$J$105` (kể cả `B27:B30`). Vùng dòng đã đủ 104 ca. Không được "nới" thành `$2:$200` hay sửa gì ở đây.
- Tổng trong bảng 3 file kế hoạch khớp: TR 42, TC 104, đã chạy 104, 76/28/0. Nếu AI tính ra số khác thì **AI sai**, phải đếm lại từ Excel.
- `Test Plan_...docx` dòng **P5 đã có `Ngày lập: 07/09/2026`** (chèn ngày 02/11/2026) — **giữ nguyên**, không xoá, không đổi thành ngày khác.
- `evidence/` hiện có **92 json + 29 png + 7 log** (đã đếm). Con số này thay đổi sau mỗi lần chạy lại harness → nếu trích số lượng bằng chứng vào tài liệu thì **phải đếm lại bằng lệnh**, không chép số cũ.

**Đã chốt ngày kết thúc dự án: 01/11/2026.** Toàn bộ tài liệu đã được đồng bộ sang mốc này (Test Plan P8, `TongQuan_Dashboard!F3`, file kế hoạch P6, Word báo cáo, Test Report). Từ nay **không sửa thành 30/10/2026** ở bất kỳ file nào; nếu thấy "30/10/2026" thì đó là lỗi còn sót, phải sửa lại.
---

## 2. MƯỜI ĐIỀU CẤM

1. **Cấm đổi số liệu** (PASS/FAIL/TR/TC/bug) để tài liệu "đẹp". 28 FAIL là kết quả thật, phải giữ và giải thích.
2. **Cấm bịa** mã lỗi, tên route, số dòng, tên hàm, tên model Prisma. Trích dẫn kỹ thuật phải chỉ đúng `đường/dẫn/file.ts:<dòng>` có thật.
3. **Cấm sửa** thư mục `evidence/` (hiện **92 json + 29 png + 7 log**) và sheet dữ liệu gốc (`TR List`, `TC List` cột A–I).
4. **Cấm viết lại cả file** khi chỉ cần sửa cục bộ. Sửa đúng đoạn/bảng/ô, giữ nguyên nội dung đúng đang có.
5. **Cấm** dùng từ ngữ sáo rỗng kiểu AI: "cực kỳ", "vô cùng quan trọng", "đóng vai trò then chốt", "nhìn chung có thể thấy rằng", "một cách toàn diện".
6. **Cấm** trộn ngôn ngữ tuỳ tiện: thuật ngữ kỹ thuật giữ tiếng Anh (route, API, model, PASS/FAIL), phần diễn giải phải là tiếng Việt.
7. **Cấm** đổi tên/xóa file khác ngoài đúng 1 file được giao ở Nhiệm vụ A.
8. **Cấm** nói "đã sửa xong" khi chưa mở lại file bằng code để kiểm (mục 6).
9. **Cấm** thêm thư viện, đổi cấu trúc thư mục, nén file. Riêng PDF: **bắt buộc xuất lại từ Word sau khi sửa** (xem mục 9.5), vì PDF cũ sẽ lạc hậu so với Word đã sửa.
10. **Cấm** bỏ trống phần không làm được: phải ghi rõ `KHÔNG LÀM ĐƯỢC: <lý do>` ở cuối báo cáo.

---

## 3. NHIỆM VỤ (làm theo thứ tự, mỗi việc có tiêu chí ĐẠT đo được)

### A. Đổi tên file kế hoạch
- Đổi: `TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx` → `TimeLine/Nhom2_Ke_hoach_Bao_cao_cuoi_ky.docx`.
- Giữ nguyên nội dung file (đây là báo cáo của trưởng nhóm — tiêu đề trong file vẫn được phép nhắc "trưởng nhóm").
- **Cập nhật mọi chỗ nhắc tên cũ**: dò trong tất cả `.docx`, `.xlsx`, `.pptx`, `.md` của thư mục (đọc text từng đoạn/ô/slide, không chỉ tìm tên file). Nếu Word có bảng "Danh mục tài liệu" (bảng 8, 14 dòng) hoặc PPT có slide nhắc tên → sửa theo tên mới.
- **ĐẠT khi**: file cũ không còn tồn tại; `grep`-tương-đương trên nội dung không còn chuỗi `Truong_nhom`; không file nào bị mất nội dung.

### B. Chuẩn hóa heading + mục lục cho 4 file Word và 3 biên bản
Hiện trạng đã đo: `Test Plan_...docx`, `Test Report_...docx`, `Báo Cáo Word_...docx` **chỉ dùng style `Normal`**, không có field TOC → mục lục trong Word báo cáo là **gõ tay** (các dòng `1.1. Giới thiệu ... .......... T`), số trang sẽ sai khi in.
- Gán `Heading 1` cho chương (`1.`, `2.`…), `Heading 2` cho mục (`1.1.`, `2.3.`…), `Heading 3` cho mục con nếu có. Không đổi câu chữ.
- Xóa khối mục lục gõ tay, chèn **field TOC thật** (`References → Table of Contents`, hoặc chèn `w:fldSimple`/`fldChar` với instrText `TOC \o "1-3" \h \z \u`).
- Áp dụng cho cả 3 biên bản họp trong `TimeLine/` (đang dùng `Normal` cho tiêu đề mục).
- **ĐẠT khi**: 3 file chính (Test Plan, Test Report, Word báo cáo) có ≥3 đoạn `Heading 1` và ≥8 đoạn `Heading 2`, XML chứa `TOC \o`; riêng 3 biên bản chỉ cần ≥4 đoạn `Heading 2`, không bắt buộc TOC; số mục trong field = số heading cấp 1–2.

### C. Test Report / Test Plan: kiểm đủ mục theo giáo viên (KHÔNG thêm mục thừa)
Đã đo thực tế, không đoán:
- `Test Report_...docx` **đã có 7 mục**: 1. Thông tin chung dự án · 2. Tóm tắt kết quả thực thi · 3. Bảng kết quả chi tiết theo phân hệ · 4. Báo cáo lỗi phát hiện · 5. Đánh giá chất lượng và khuyến nghị · 6. Kết luận và bài học kinh nghiệm · 7. Phụ lục tài liệu và minh chứng.
- `Test Plan_...docx` **đã có 9 mục**: 1. Thông tin dự án · 2. Mục tiêu và tiêu chí · 3. Phạm vi (in/out) · 4. Phương pháp và ba làn thực thi · 5. Môi trường và dữ liệu · 6. Lịch trình 3 tuần · 7. Tiêu chí bắt đầu/tạm dừng/kết thúc · 8. Rủi ro và giảm thiểu · 9. Tổng hợp và liên kết tài liệu.
→ **Không thêm mục mới.** Việc thật phải làm:
1. Gán Heading style cho các mục đã có (mục B).
2. Kiểm mục 5 của Test Report có **hành động tiếp theo / quyết định triển khai** rõ ràng; nếu chỉ có "khuyến nghị" chung chung thì viết thêm 2–3 câu kết luận hành động (Release / Sửa trước khi release / Chấp nhận rủi ro).
3. Kiểm Test Plan có đủ 6 thành phần giáo viên yêu cầu: phạm vi, mục tiêu chất lượng, phương pháp, tài nguyên/môi trường, tiêu chí hoàn thành, rủi ro — đã đủ theo 9 mục trên, chỉ xác nhận lại bằng mắt.
- **ĐẠT khi**: Test Report giữ đúng 7 mục (không thành 8–9 mục thừa), Test Plan giữ 9 mục, cả hai có Heading style, mục 5 Test Report có câu kết luận hành động cụ thể.

### D. Sửa văn phong & trình bày (áp cho 4 file Word)
Xem chuẩn ở mục 4. Bắt buộc sửa các lỗi cụ thể sau (đã thấy trong file):
- `Nhom2_Ke_hoach_...docx` đoạn 11: câu *"Repo môn không bắt tỷ lệ pass. Nhóm tự đặt ≥ 85.0% và chưa đạt."* → viết lại thành văn báo cáo: *"Tiêu chí nội bộ của nhóm là tỷ lệ PASS ≥ 85 %; kết quả đạt 73,1 % nên nhóm chưa đạt tiêu chí này và đã ghi rõ nguyên nhân trong mục 4."*
- Thống nhất dấu thập phân: dùng **dấu phẩy** kiểu Việt Nam (`73,1 %`, `26,9 %`) trong toàn bộ văn bản; riêng số trong code/bảng kỹ thuật giữ nguyên.
- Mọi bảng phải có **caption** phía trên: `Bảng 1. ...`, `Bảng 2. ...`; mọi hình có `Hình 1. ...`. Không đánh số lại nếu đã có, chỉ bổ sung chỗ thiếu.
- Câu quá dài (> 45 từ) hoặc có 2 ý chính → tách.
- Danh sách gạch đầu dòng phải **song song ngữ pháp** (cùng bắt đầu bằng động từ hoặc cùng là cụm danh từ).
- **ĐẠT khi**: không còn câu nào chứa từ cấm ở mục 4; 100 % bảng có caption; dấu thập phân thống nhất; không còn bullet lệch cấu trúc.

### E. PPT: ĐÃ DỰNG XONG — chỉ kiểm, không dựng lại
File đích: `Word+ppt Báo Cáo/Nhom02_Final_Presentation.pptx` — đã tạo bằng `_build_ppt.py`, dựa trên nền `filenengoc.pptx`:
- **Cấu trúc bám bài mẫu nhóm 22** (`22CT115_Nhom07_QuanLyBanHang(Sweet-Sip)/Word+ppt Báo Cáo/Ppt Báo cáo Nhóm 7 - 22CT115.pptx`): Giới thiệu (thành viên + GVHD → đề tài → nhiệm vụ) → **TEST PLAN** (phạm vi & mục tiêu → tiêu chí & tài nguyên → rủi ro) → **TEST CASE** (thiết kế → TC tiêu biểu) → **TEST REPORT** (kết quả & theo phân hệ → báo cáo lỗi) → khuyến nghị · quyết định · kết luận. Bài mẫu dùng 17 slide (có 3 slide phân cách); ta nén còn **12 slide** nhưng giữ nguyên thứ tự mục, thay slide phân cách bằng nhãn `PHẦN n — …` để vừa cấu trúc mẫu vừa đúng giới hạn 10–12 slide.
- **Nền + 2 logo giữ nguyên** (shape `Freeform 2`, `Group 3`, `Group 5` được chèn vào **cả 12 slide**, đứng trước phần chữ để không che nội dung).
- Khổ **20 × 11,25 in** = 16:9 (18288000 × 10287000 EMU), đúng bằng file gốc.
- **12 slide**: ① bìa · ② thành viên nhóm & GVHD · ③ giới thiệu đề tài · ④ các nhiệm vụ cần thực hiện · ⑤ phạm vi & mục tiêu · ⑥ tiêu chí chất lượng, môi trường & tài nguyên · ⑦ rủi ro & giảm thiểu · ⑧ thiết kế Test Case · ⑨ một số TC tiêu biểu (bảng) · ⑩ tổng quan kết quả + bảng theo 10 phân hệ · ⑪ báo cáo lỗi · ⑫ khuyến nghị · quyết định triển khai · kết luận.
- Số trên slide: 42 TR · 104 TC · 76 PASS · 28 FAIL · 26 phiếu lỗi; số file bằng chứng đếm động từ thư mục `evidence/`.

Việc còn lại (nếu cần):
- Kiểm **chữ không tràn** khỏi khung: mỗi slide có ≤ 7 dòng, cỡ 19 pt, khung rộng 18,1 in.
- Nếu phải sửa nội dung: sửa **trong `_build_ppt.py`** rồi chạy lại (`python _build_ppt.py`) để giữ nguyên nền + logo; **không** sửa tay file pptx (dễ mất logo).
- File cũ `Ppt Báo cáo Nhóm 2 - 23CT113.pptx` giữ lại để đối chiếu, không nộp.
- **ĐẠT khi**: **12 slide**, `slide_width == 18288000`, mỗi slide có đủ 3 shape nền/logo ở vị trí đầu, không slide nội dung nào chứa chữ của bìa, số liệu khớp Excel. Riêng `Freeform 2` (nền gốc) được phép tràn mép dưới — đó là thiết kế của file nền, không phải lỗi tràn chữ.

### F. Đồng bộ số liệu 3 nguồn (Excel ↔ Word ↔ PPT ↔ file kế hoạch)
Lập bảng đối chiếu các cặp số: TR, TC, PASS, FAIL, BLOCKED, bug, số TC theo từng phân hệ, tỷ lệ %.
- Nếu lệch: **sửa tài liệu theo Excel** (Excel là nguồn chuẩn vì sinh từ lần chạy thật), không sửa Excel theo văn bản.
- Ghi rõ từng chỗ đã sửa: `file → mục/bảng → dòng → số cũ → số mới`.
- **ĐẠT khi**: bảng đối chiếu không còn ô ℓệch, hoặc ô lệch có ghi chú giải thích hợp lý (ví dụ chênh do 1 TC chạy 2 lần).

### G. Xác minh mọi khẳng định kỹ thuật bằng mã nguồn
Đây là phần **bắt buộc đối chiếu code**, không được tin văn bản có sẵn:
1. Mở `src/` và kiểm từng bug trong bảng bug (file kế hoạch bảng 2, Test Report bảng 2, 27 dòng):
   - `src/hooks/useCall.ts` — **đã kiểm: dòng 33 `const POLL_MS = 1200;`** → bug "polling 1,2 giây thay vì WebSocket" là đúng.
   - `src/app/api/payment/momo/create/route.ts` — **đã kiểm: dòng 7 `code: "ESCROW_BANK_ONLY"`**, kèm mã HTTP 410 ngay trên → bug đúng.
   - `src/app/api/payment/vnpay/create/route.ts` — **đã kiểm: dòng 7 `code: "ESCROW_BANK_ONLY"`**, HTTP 410 → bug đúng.
   - `src/app/api/feedback/route.ts` — **đã kiểm: dòng 16 `if (message.length < 10)`** → tối thiểu **10 ký tự**, KHÔNG phải 20. Nếu tài liệu ghi 20 ký tự thì tài liệu sai, phải sửa theo code.
   - `src/app/api/campaigns/route.ts` — có `export async function POST` không? (đã xác minh: **không có**, chỉ `GET`.)
2. Với mỗi bug: nếu `file:line` sai → sửa thành đúng; nếu mô tả sai bản chất → sửa mô tả theo code; nếu bug không tồn tại trong code → **giữ nguyên bug nhưng ghi `chưa tái hiện được trong mã nguồn`**, không tự xóa.
3. Không suy đoán hành vi từ tên file — phải đọc thân hàm.
- **ĐẠT khi**: 100 % dòng bug có `file:line` mở ra đúng nội dung được mô tả; bảng bug có cột `Đã đối chiếu code` = Có/Chưa.

---

## 4. CHUẨN VĂN PHONG & TRÌNH BÀY (dạy AI — đọc kỹ trước khi viết)

### 4.1. Giọng văn
- Ngôi: **"nhóm"** hoặc **"nhóm 02"**, không dùng "chúng em", "mình", "tôi" trong thân báo cáo (riêng file báo cáo trưởng nhóm được dùng "tôi").
- Thì: quá khứ cho việc đã làm ("nhóm đã thiết kế 104 kịch bản"), hiện tại cho trạng thái ("hệ thống trả về HTTP 403").
- Ưu tiên câu chủ động, ngắn (15–30 từ), mỗi câu một ý. Hạn chế bị động kiểu "được thực hiện bởi".
- Không dùng từ cường điệu, không cảm thán, không emoji, không ngoặc cười.
- Số liệu đứng riêng, không viết "khoảng", "hơn", "gần như" khi đã đếm được chính xác.

### 4.2. Từ vựng chuẩn (dùng đúng, không thay bằng từ đồng nghĩa)
| Dùng | Không dùng |
|---|---|
| yêu cầu kiểm thử (TR) | "yêu cầu test", "hạng mục test" |
| kịch bản kiểm thử (TC) | "ca test", "case test" (trong văn bản) |
| điều kiện tiên quyết | "điều kiện trước", "pre-condition" |
| kết quả mong đợi | "kết quả đúng", "expected" |
| kết quả thực thi | "kết quả chạy" |
| khiếm khuyết / lỗi | "bug" chỉ dùng trong bảng mã bug |
| độ bao phủ | "cover", "bao quát" |
| truy vết (truy xuất nguồn gốc) | "trace", "map" |
| phân hệ | "module" (trừ khi nêu tên sheet) |
| tái hiện | "repro", "làm lại lỗi" |

### 4.3. Ba câu mẫu — sửa từ văn phong yếu sang văn phong báo cáo
- Yếu: *"Nhóm đã cố gắng rất nhiều và làm được khá nhiều test case, nhìn chung kết quả cũng khá ổn."*
  Chuẩn: *"Nhóm đã thiết kế và thực thi 104 kịch bản kiểm thử, đạt 76 PASS (73,1 %) và 28 FAIL (26,9 %)."*
- Yếu: *"Cổng MoMo bị lỗi nên không thanh toán được."*
  Chuẩn: *"Cổng MoMo trả HTTP 410 với mã `ESCROW_BANK_ONLY` (`src/app/api/payment/momo/create/route.ts`), nên luồng thanh toán ví điện tử không hoàn tất."*
- Yếu: *"Repo môn không bắt tỷ lệ pass nên nhóm để 28 FAIL."*
  Chuẩn: *"Tiêu chí nội bộ là tỷ lệ PASS ≥ 85 %; kết quả 73,1 % chưa đạt. Nhóm giữ nguyên 28 FAIL và ghi nhận nguyên nhân thay vì điều chỉnh kết quả."*

### 4.4. Trình bày (chuẩn nộp bài)
- Khổ A4, lề trên 3 cm, dưới 2,5 cm, trái 3 cm, phải 2 cm.
- Font Times New Roman **12** (đúng quy định giáo viên, không phải 13), giãn dòng 1,5, giãn đoạn sau 6 pt, căn đều hai bên.
- Đánh số trang ở footer (trừ trang bìa); bìa không số trang.
- Tiêu đề chương in hoa đậm, cách đoạn trước 12 pt, sau 6 pt, không dùng WordArt.
- Bảng: header nền xám nhạt, chữ đậm, viền 0,5 pt, không tô màu loè loẹt; caption trên bảng.
- Hình: caption dưới hình, căn giữa, ghi nguồn nếu không tự chụp.
- Mục lục: field tự động (mục B), không gõ tay.
- Cuối tài liệu: mục "Tài liệu tham khảo" nếu có trích dẫn; bảng phân công có chữ ký/xác nhận nếu mẫu yêu cầu.

---

## 5. RUBRIC "ĐỦ ĐIỀU KIỆN NỘP" (AI tự chấm, tối đa 20 điểm)

| # | Tiêu chí | Điểm | Cách kiểm |
|---|---|---|---|
| 1 | Đủ bộ file, tên đúng quy ước, không còn tên cũ | 3 | liệt kê thư mục |
| 2 | 4 file Word có heading style + mục lục field | 4 | đọc style + XML |
| 3 | Test Report đúng 7 mục, Test Plan đúng 9 mục (không thêm bớt) | 2 | đếm heading |
| 4 | Số liệu khớp 3 nguồn | 4 | bảng đối chiếu mục F |
| 5 | Bug có `file:line` đúng mã nguồn | 3 | mở file kiểm |
| 6 | Văn phong sạch (không từ cấm, câu ≤ 45 từ) | 2 | quét từ khóa |
| 7 | Bảng/hình có caption, dấu thập phân thống nhất | 1 | quét |
| 8 | PPT 10–12 slide, đúng tên file, số liệu đúng | 1 | thuộc tính shape |

**< 17 điểm = CHƯA ĐỦ NỘP** → tự sửa phần mất điểm, chạy lại rubric, tối đa 3 vòng.

---

## 6. VÒNG TỰ KIỂM BẰNG CODE (bắt buộc, không kiểm bằng mắt)

Môi trường: `cd /d/Kiem_Thu/testing && export PYTHONIOENCODING=utf-8 && ./.venv/Scripts/python.exe`
Thư viện có sẵn: `openpyxl`, `python-docx`, `python-pptx`.

Lưu ý shell: đường dẫn có dấu ngoặc `( )` và dấu tiếng Việt → **luôn để trong nháy kép**, không `cd` vào thư mục có ngoặc.

Đoạn kiểm tối thiểu phải chạy sau khi sửa:

```python
from docx import Document
from openpyxl import load_workbook
from pptx import Presentation

T = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/"
for f in ["Test Plan_23CT113_Nhom02.docx", "Test Report_23CT113_Nhom02.docx",
          "Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx",
          "TimeLine/Nhom2_Ke_hoach_Bao_cao_cuoi_ky.docx"]:
    d = Document(T + f)
    st = [(p.style.name, p.text.strip()[:60]) for p in d.paragraphs if p.text.strip()]
    h1 = sum(1 for s, _ in st if s == "Heading 1")
    h2 = sum(1 for s, _ in st if s == "Heading 2")
    toc = "TOC \\o" in d.element.xml
    print("%-58s H1=%d H2=%d TOC=%s tables=%d" % (f[:58], h1, h2, toc, len(d.tables)))

pr = Presentation(T + "Word+ppt Báo Cáo/Nhom02_Final_Presentation.pptx")
print("slides=%d size=%sx%s (dung phai la 12 slide va 18288000x10287000)" % (len(pr.slides), pr.slide_width, pr.slide_height))
assert len(pr.slides) == 12, "PPT phai dung 12 slide theo cau truc bai mau nhom 22"
assert (pr.slide_width, pr.slide_height) == (18288000, 10287000), "sai kho slide"

wb = load_workbook(T + "Test Case_23CT113_Nhom02.xlsx", data_only=True)
tc = wb["TC List"]
from collections import Counter
c = Counter(str(tc.cell(r, 10).value).strip() for r in range(2, tc.max_row + 1) if tc.cell(r, 2).value)
print("TC=%d ket qua=%s" % (sum(c.values()), dict(c)))
```

**Luật kiểm:**
- Không được báo ĐẠT nếu script chưa chạy và in ra đúng số.
- Nếu script báo lỗi đường dẫn → sửa đường dẫn, không bỏ qua.
- Mỗi vòng lặp: chạy script → ghi lại số → sửa → chạy lại **toàn bộ** script (không chỉ phần vừa sửa).

---

## 7. ĐỊNH DẠNG BÁO CÁO CUỐI (đúng thứ tự này)

1. **Kết luận 1 dòng**: `ĐẠT 19/20 — đủ điều kiện nộp` hoặc `CHƯA ĐẠT 14/20 — còn 3 việc`.
2. **Bảng thay đổi** (mỗi dòng 1 thay đổi):

| File | Vị trí (mục/bảng/ô/slide) | Trước | Sau | Lý do |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

3. **Bảng đối chiếu số liệu 3 nguồn** (mục F) — cột: chỉ số | Excel | Word | PPT | file kế hoạch | Kết luận.
4. **Bảng đối chiếu bug ↔ mã nguồn** — cột: mã bug | `file:line` trong tài liệu | `file:line` thật | khớp? | đã sửa.
5. **Những gì KHÔNG làm được** + lý do (nếu có), bắt đầu bằng `KHÔNG LÀM ĐƯỢC:`.
6. **Việc nên làm tiếp** (tối đa 3 gạch đầu dòng, không lan man).

Không viết lời chào, không giải thích quy trình, không kể lể. Chỉ bảng và số.

---

## 8. PHỤ LỤC — ĐƯỜNG DẪN CHÍNH XÁC

```
23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/
├── 01-IC-Product-Requirements_23CT113_Nhom02.xlsx      (KHÔNG sửa)
├── Test Case_23CT113_Nhom02.xlsx   (sheets: TongQuan_Dashboard, TR List, TC List, RTM)
├── Test Plan_23CT113_Nhom02.docx
├── Test Report_23CT113_Nhom02.docx
├── TimeLine/
│   ├── TimeLine_23CT113_Nhom02.xlsx
│   ├── Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx   ← ĐỔI TÊN
│   └── Biên Bản Họp Nhóm Lần 1/2/3 – ....docx
├── Word+ppt Báo Cáo/
│   ├── Báo Cáo Word_23CT113_Nhom02.docx
│   ├── Nhom02_Final_Report_Software_Testing.pdf   (chỉ xuất lại nếu Word đã sửa xong)
│   ├── Nhom02_Final_Presentation.pptx   (đã dựng trên nền filenengoc.pptx)
│   └── Ppt Báo cáo Nhóm 2 - 23CT113.pptx (bản cũ, giữ đối chiếu, không nộp)
└── evidence/   (KHÔNG sửa: hiện 92 json, 29 png, 7 log — đếm lại bằng `ls`)

Ngoài thư mục bộ tài liệu, ở gốc project có:
- `filenengoc.pptx` — file nền của trường (1 slide: 1 freeform nền + 2 group logo). **Không nộp, không sửa.**
- `_build_ppt.py` — script sinh PPT từ nền đó. Muốn đổi nội dung slide thì sửa file này rồi chạy `./.venv/Scripts/python.exe _build_ppt.py`, **không sửa tay .pptx**.
```

---

## 9. ĐỐI CHIẾU QUY ĐỊNH GIÁO VIÊN (bắt buộc — nguồn: repo `NguyenMinhPhuc/SoftwareTesting`)

Tài liệu gốc: `Report/Final_Report_Guidelines_Software_Testing.markdown` và `Moodle_HTML/08_Huong_dan_bao_cao_cuoi_ky.html`.

### 9.1. Sản phẩm nộp và quy cách (kiểm từng dòng)
| Yêu cầu giáo viên | Hiện trạng 23CT113 | Việc phải làm |
|---|---|---|
| PDF tên `[Tên_Nhóm]_Final_Report_Software_Testing.pdf` | `Nhom02_Final_Report_Software_Testing.pdf` | **Đã đúng** |
| PPTX tên `[Tên_Nhóm]_Final_Presentation.pptx` | đã có `Nhom02_Final_Presentation.pptx` (dựng trên nền `filenengoc.pptx`, giữ 2 logo) | **Đã đúng** — không đổi tên nữa |
| Times New Roman, cỡ **12** | 3/4 file đã đúng 12; `Báo Cáo Word_...docx` **chưa đặt** font/size | đặt `Normal` = Times New Roman 12 cho Word báo cáo |
| Nội dung **10–15 trang** (không tính bìa/mục lục/phụ lục) | PDF hiện **14 trang** (pypdf, đã xuất lại 02/11/2026) | đạt; nếu sửa Word thì phải xuất lại + đếm lại (mục 9.5) |
| Slide **10–12** | **12 slide**, cấu trúc theo bài mẫu nhóm 22 (Giới thiệu → Test Plan → Test Case → Test Report → Kết luận) | đã đúng, giữ nguyên |
| Báo cáo đủ **6 phần** + Tài liệu tham khảo + Phụ lục | Word báo cáo: 6 chương, **đã đủ 4.1 / 4.2 / 4.3**; Test Report 7 mục; Test Plan 9 mục. **ĐÃ BỔ SUNG 02/11/2026:** mục `TÀI LIỆU THAM KHẢO` (8 nguồn) + `PHỤ LỤC A` (danh mục hồ sơ) + `PHỤ LỤC B` (tóm tắt 3 biên bản B.1/B.2/B.3) | giữ 6 chương; bổ sung mục Tài liệu tham khảo; chèn 3 biên bản vào Phụ lục |
| ≥ 3 biên bản họp trong phụ lục | có 3 biên bản | **phải chèn vào Phụ lục của Word báo cáo** (hiện để rời trong `TimeLine/`) |
| ≥ 15 test case, có TR, bình thường/lỗi/biên | 104 TC, 42 TR, có Boundary | đã đạt |
| ≥ 3 lỗi, có 1 High + 2 Medium/Low | 26 bug | đã đạt, kiểm lại có ≥1 High |
| RTM liên kết TR ↔ TC | sheet `RTM` | đã đạt |

### 9.2. Phân biệt Phần 4 và Phần 5 (giáo viên nêu rõ)
- **Phần 4 — Kết quả kiểm thử và lỗi**: chi tiết theo từng TC và từng lỗi (bảng kết quả + bảng bug).
- **Phần 5 — Test Report**: tổng hợp, độ bao phủ, đánh giá, rủi ro, khuyến nghị, hành động tiếp theo.
- Không được để Phần 4 chỉ có bảng tổng hợp, cũng không được để Phần 5 lặp lại nguyên bảng bug.
- **ĐẠT khi**: Phần 4 có bảng kết quả theo TC; Phần 5 có ≥1 đoạn đánh giá + ≥3 khuyến nghị cụ thể (không chung chung).

### 9.3. Checklist 10 mục trước khi nộp (AI phải tick từng mục, ghi ĐẠT/KHÔNG)
```
[ ] 1. Test Plan có phạm vi, mục tiêu, phương pháp, tài nguyên, tiêu chí, rủi ro
[ ] 2. ≥15 test case, liên kết TR, phủ bình thường/lỗi/biên
[ ] 3. Kết quả từng TC + ≥3 lỗi (1 High, 2 Medium/Low), trạng thái lỗi rõ
[ ] 4. Test Report: số liệu nhất quán, độ bao phủ, RTM, khuyến nghị
[ ] 5. Đủ 6 phần + Tài liệu tham khảo + Phụ lục
[ ] 6. PDF Times New Roman 12, 10-15 trang, có bìa, mục lục, số trang
[ ] 7. Slide 10-12, tổng 10-15 phút, mọi thành viên tham gia
[ ] 8. ≥3 biên bản họp trong phụ lục, ghi vai trò và đóng góp
[ ] 9. Tên file PDF/PPTX đúng quy định
[ ] 10. Không có dữ liệu giả định bị trình bày như kết quả thật
```
Mục 10 đặc biệt quan trọng: nhóm chạy kiểm thử **thật** trên `https://test-gamma-azure-65.vercel.app` ngày 01/11/2026, nên trong báo cáo phải ghi rõ môi trường, ngày chạy, tài khoản dùng và nơi lưu bằng chứng (`evidence/`). Không được mô tả kết quả như "giả định" hay "mô phỏng".

Hai mục dễ bị bỏ sót, phải kiểm riêng:
- **Tài liệu tham khảo**: Word báo cáo phải có mục này (trích slide bài giảng của học phần); nếu chưa có thì bổ sung 1 mục ngắn, không cần thêm tài liệu ngoài.
- **Kênh nộp**: nộp PDF + PPTX qua LMS/Moodle, hạn 23:59; prompt này chỉ chuẩn bị file, **không tự nộp** — ghi lại để người dùng tự nộp.

### 9.4. Điểm rubric phải nhắm (30 báo cáo + 10 thuyết trình)
| Tiêu chí | Điểm | Cách ăn điểm ở bộ 23CT113 |
|---|---|---|
| Test Plan phù hợp PRD | 4 | đã có, giữ |
| Test Case bao phủ TR, đa dạng | 4 | 42 TR / 104 TC, có Boundary |
| Kết quả + Test Report chính xác, khuyến nghị cụ thể | 4 | 76/28 thật, khuyến nghị theo từng bug |
| Cấu trúc, định dạng | 4 | mục 9.1 |
| Ngôn ngữ, chính tả | 4 | mục 4 |
| Sáng tạo (giải pháp, biểu đồ) | 6 | dashboard + RTM + biểu đồ pass theo phân hệ |
| Làm việc nhóm | 4 | 3 biên bản + bảng phân công |
| Thuyết trình | 10 | 10–12 slide, 5 người × 2–3 phút |

Bảng rubric CLO của học phần (sheet giáo viên): CLO1 = 2 điểm (viết báo cáo đúng định dạng), **CLO2 = 4 điểm** (thực hiện kiểm thử chức năng), **CLO3 = 4 điểm** (đo lường kết quả), CLO4 = 2 điểm (kỹ năng nhóm), mức đạt 75 %. Vì CLO2 và CLO3 nặng nhất, **tuyệt đối không làm đẹp số PASS/FAIL**, và mọi kết luận phải kèm số đo.

### 9.5. Xuất lại PDF sau khi sửa Word (bắt buộc)
Thứ tự đúng, không được đảo:
1. Sửa xong **toàn bộ** Word (heading, mục lục, văn phong, số liệu).
2. Cập nhật lại field mục lục (mở Word → `Ctrl+A` → `F9`, hoặc `References → Update Table`). **Bắt buộc**, nếu không mục lục vẫn ghi số trang cũ.
3. Xuất PDF đè lên `Nhom02_Final_Report_Software_Testing.pdf` (Word → Save as PDF, giữ nguyên tên).
4. Đếm lại số trang bằng `pypdf`; **phải nằm trong 10–15**. Nếu vượt: cắt phần lặp giữa Phần 4 và Phần 5, **không cắt bảng số liệu hay bảng bug**.
5. Kiểm PDF có đúng font Times New Roman 12 (mở bằng Word/Adobe xem thuộc tính font), có bìa, có mục lục, có số trang.
- **ĐẠT khi**: PDF mới có ≥ 13 trang và ≤ 15, mục lục khớp số trang thực tế, nội dung khớp bản Word vừa sửa.
- Nếu máy không có Word/LibreOffice để xuất PDF: ghi `KHÔNG LÀM ĐƯỢC: thiếu công cụ xuất PDF` và **để nguyên PDF cũ**, không giả vờ đã cập nhật.

**Bắt đầu ngay. Không hỏi lại. Không xin phép. Tự kiểm tới khi ĐẠT.**
