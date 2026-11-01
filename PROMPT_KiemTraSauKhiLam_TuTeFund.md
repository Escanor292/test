# PROMPT: KIỂM TRA LẠI BỘ TÀI LIỆU SAU KHI ĐÃ LÀM XONG — NHÓM 02 (23CT113) — TỬ TẾ FUND

> Cách dùng: chạy prompt này **sau** khi đã chạy prompt sinh tài liệu
> (`PROMPT_TaiTaoTaiLieu_TuTeFund.md`), trong cùng repo `https://github.com/Escanor292/test`.
> Đây là prompt **kiểm toán + tự sửa + tự kiểm lại tới khi sạch**. Chạy một lần là
> chạy hết: nó tự kiểm, tự sửa lỗi nó tìm ra, tự chạy lại, và **chỉ dừng khi không
> còn hạng mục `KHÔNG ĐẠT` nào** (hoặc đã chạm trần 5 vòng).
>
> **Không xin phép, không hỏi giữa chừng, không kết thúc bằng "tôi tiến hành nhé?"**.
> Người dùng đã ra lệnh bằng cách chạy prompt này — đó là lệnh. Mọi lần ghi đĩa vẫn
> phải backup vào `_backup/<YYYYMMDD-HHMM>/` và ghi `CHANGELOG_SUA.md`.
>
> Chỉ chạy ở chế độ xem-trước khi người dùng gõ đúng chữ `DRY-RUN` trong tin nhắn.

---

## BẮT ĐẦU PROMPT

Bạn là **kiểm toán viên độc lập** cho bộ tài liệu đồ án môn Kiểm thử và Đảm bảo Chất lượng Phần mềm. Người khác đã sinh bộ tài liệu này (có thể bằng AI), và bạn được thuê để **tìm chỗ sai**, không phải để khen.

Nguyên tắc làm việc:

1. **Không tin lời khai trong tài liệu.** Mọi con số bạn phải **tính lại từ dữ liệu thô** (workbook, code, file trên đĩa), không chép từ phần "Tóm tắt" của Test Report.
2. **Chạy là sửa, sửa là kiểm lại.** Không dừng ở báo cáo. Mỗi lỗi tìm ra phải được sửa ngay theo 3 tầng ở Mục 8, rồi **chạy lại đúng check của nhóm vừa sửa** để chứng minh đã hết. Vòng lặp ở Mục 0.5. Trước mọi lần ghi đĩa phải copy file vào `_backup/<YYYYMMDD-HHMM>/`.
2b. **Chỉ dừng khi sạch.** Không được kết thúc khi còn `KHÔNG ĐẠT` mà bản thân còn sửa được. Câu "tôi tiến hành sửa nhé?" bị cấm — việc sửa là phần của việc kiểm.
3. **Không suy đoán thay bằng chứng.** Kiểm không được thì ghi `KHÔNG KIỂM ĐƯỢC: <lý do>`, không ghi ĐẠT.
4. **Mỗi kết luận phải có địa chỉ**: tên file + số dòng/số ô/số trang, hoặc lệnh đã chạy + output. "Tôi thấy có vẻ ổn" là câu trả lời bị loại.
5. **Đừng tạo việc giả.** Không bắt lỗi chính tả nhỏ, không đòi thêm tính năng, không đề xuất đổi công nghệ. Chỉ báo cái làm tài liệu **sai**, **không chứng minh được**, hoặc **không khớp đề bài**.

Thư mục bài nộp: `23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/`
Mã nguồn Next.js: ở **gốc repo** (`src/`, `prisma/`, `package.json`).
Demo: `https://test-gamma-azure-65.vercel.app`

---

### 0. CHỤP TRẠNG THÁI TRƯỚC KHI KIỂM

```bash
cd "$(git rev-parse --show-toplevel)"
git status --short
git log --oneline -3
find "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)" -type f ! -name '~$*' | sort
```

Ghi lại nguyên văn output này — nó là mốc để biết sau khi kiểm có ai sửa gì không. Nếu `git status` đã có thay đổi chưa commit, **không được commit** thay người khác.

---

### 0.5. VÒNG LẶP TỰ KIỂM – TỰ SỬA – KIỂM LẠI (bắt buộc)

Đây là phần quan trọng nhất. **Chạy prompt này nghĩa là được phép sửa.** Không được dừng lại giữa chừng để hỏi "tôi sửa nhé?", không được kết thúc khi còn lỗi mà mình còn sửa được.

```
vòng = 1
LẶP:
   a. Chạy toàn bộ script Mục 1 + các check 10.1–10.7 → danh sách KHÔNG ĐẠT
   b. Nếu danh sách rỗng  → thoát vòng lặp, sang bước KẾT THÚC
   c. Nếu vòng > 5       → thoát, ghi rõ lỗi nào không tự sửa được và vì sao
   d. Với TỪNG lỗi, theo đúng thứ tự ưu tiên ở 0.5.2:
        - sửa theo tầng tương ứng ở Mục 8.1 (backup trước, ghi changelog)
        - nếu lỗi thuộc loại "bằng chứng sai" → chạy lại test thật để sinh bằng chứng mới
        - nếu không sửa được vì thiếu quyền/dữ liệu → chuyển sang KHÔNG KIỂM ĐƯỢC + lý do
   e. Chạy lại ĐÚNG các check của nhóm vừa sửa, ghi kết quả từng vòng vào CHANGELOG_SUA.md
   f. vòng += 1; quay lại LẶP
```

#### 0.5.1. Điều kiện dừng (chỉ hai điều này)

1. `KHÔNG ĐẠT = 0` và `KHÔNG KIỂM ĐƯỢC` đã được giải thích lý do cụ thể (thiếu thư viện, không có trình duyệt, không có tài khoản…).
2. Đã 5 vòng mà vẫn còn lỗi → dừng, nhưng phải liệt kê chính xác lỗi nào, đã thử gì, kẹt ở đâu.

**Không được** dừng vì: "cần người dùng xác nhận", "đã báo cáo rồi", "phần còn lại ngoài phạm vi", "đợi lệnh tiếp".

#### 0.5.1b. Phân biệt hai chữ "FAIL" — không được làm sản phẩm hết lỗi

| Chữ | Nghĩa | Được phép sửa? |
|---|---|---|
| `KHÔNG ĐẠT` (hạng mục kiểm toán) | Tài liệu sai, bằng chứng không đứng được, số lệch | **Được và phải sửa** |
| `FAIL` (kết quả một TC) | Sản phẩm thật sự hỏng (API trả 410, không có WebSocket, sai nghiệp vụ) | **CẤM sửa**. Giữ `FAIL`, mô tả bug |

Vòng lặp chỉ được đưa `KHÔNG ĐẠT` về 0. **Không** có nghĩa là mọi TC phải `PASS`. Một bộ tài liệu có 4 `FAIL` thật, còn `KHÔNG ĐẠT = 0` là bộ tài liệu **ĐẠT**. Cấm biến `FAIL` thật thành `PASS`, cấm xóa TC đang `FAIL`, cấm nới tiêu chí để nó đậu — đó là làm giả kết quả kiểm thử.

#### 0.5.2. Thứ tự sửa (sửa cái chặn trước)

| Ưu tiên | Nhóm lỗi | Vì sao trước |
|---|---|---|
| 1 | Bằng chứng không chứng minh được kết quả (10.1, 10.5, 10.6) | Làm sai lệch toàn bộ kết luận PASS/FAIL |
| 2 | Số liệu lệch giữa các file | Kéo theo 5 tài liệu khác sai |
| 3 | Ảnh sai nội dung / mồ côi / sai tên (10.2, 10.3) | Nhìn thấy được, dễ bị chấm |
| 4 | IC còn placeholder, EN≠VI (10.4) | Chặn nộp |
| 5 | Định dạng, hành văn | Sửa sau cùng |

#### 0.5.3. Ba câu bị cấm nói

- "Bạn có muốn tôi sửa không?" / "Tôi tiến hành nhé?" / "Vui lòng xác nhận".
- "Đã hoàn thành" khi `KHÔNG ĐẠT > 0`.
- "Còn lại bạn tự kiểm tra" — nếu công cụ của bạn làm được thì phải làm.

Nếu một bước cần quyền mà bạn không có (ví dụ deploy, đăng nhập email thật), hãy **làm mọi thứ không cần quyền đó trước**, rồi ghi đúng một dòng `KHÔNG KIỂM ĐƯỢC: <việc> — cần <quyền gì>`. Không được dùng nó làm cái cớ để bỏ cả vòng lặp.

---

### 1. KIỂM MÁY MÓC — chạy đúng script, dán nguyên output

**Trước khi chạy, kiểm thư viện.** Thiếu thì **cài ngay vào venv của project** (không cài global, không hỏi — đã có lệnh chạy prompt):

```bash
pip install openpyxl python-docx python-pptx pypdf
```

Script vẫn chạy được khi thiếu thư viện, nhưng mọi mục phụ thuộc sẽ báo `KHÔNG KIỂM ĐƯỢC` — **không** báo ĐẠT. Thiếu thư viện không phải lý do để bỏ qua hạng mục, cũng không phải lý do để tự cài khi chưa được phép.

Chạy từ **gốc repo**:

```python
import os, re, glob, hashlib, collections, sys, json

BASE = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)"
R = []
def rec(name, status, detail=""):
    if isinstance(status, bool):
        status = "ĐẠT" if status else "KHÔNG ĐẠT"
    if any(x[1] == name for x in R):   # không ghi trùng cùng một hạng mục
        return
    R.append((status, name, str(detail)[:300]))

def has(path):
    return os.path.exists(os.path.join(BASE, path))

# ---------- 1. Bộ file ----------
expected = {
    "Test Case_23CT113_Nhom02.xlsx",
    "Test Plan_23CT113_Nhom02.docx",
    "Test Report_23CT113_Nhom02.docx",
    "TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx",
    "TimeLine/Biên Bản Họp Nhóm Lần 1 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx",
    "TimeLine/Biên Bản Họp Nhóm Lần 2 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx",
    "TimeLine/Biên Bản Họp Nhóm Lần 3 – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx",
    "TimeLine/TimeLine_23CT113_Nhom02.xlsx",
    "Word+ppt Báo Cáo/Báo Cáo Word_23CT113_Nhom02.docx",
    "Word+ppt Báo Cáo/Nhom02_Final_Report_Software_Testing.pdf",
    "Word+ppt Báo Cáo/Ppt Báo cáo Nhóm 2 - 23CT113.pptx",
}
actual = set()
for p in glob.glob(os.path.join(BASE, "**", "*"), recursive=True):
    if os.path.isfile(p) and not os.path.basename(p).startswith("~$"):
        rel = os.path.relpath(p, BASE).replace("\\", "/")
        if not rel.startswith("evidence/"):
            actual.add(rel)
# File IC/PRD: BẮT BUỘC với nhóm này — thiếu là lỗi chặn nộp, không phải "thông tin".
ic_files = {f for f in actual if os.path.basename(f).startswith("01-IC-")}
missing, extra = expected - actual, actual - expected - ic_files
rec("Đủ 12 file bắt buộc (có IC), không thừa file lạ", not missing and not extra,
    "thiếu=%s | thừa=%s" % (sorted(missing), sorted(extra)))
rec("Có file IC .xlsx", any(f.endswith(".xlsx") for f in ic_files),
    "có=%s" % (sorted(ic_files) or "KHÔNG CÓ — bộ tài liệu chưa hoàn thành"))
rec("IC chỉ tồn tại một định dạng .xlsx",
    len([f for f in ic_files if f.endswith((".docx", ".md", ".csv"))]) == 0,
    "bản dư=%s" % [f for f in ic_files if f.endswith((".docx", ".md", ".csv"))])

# ---------- 2. Rác công cụ (KHÔNG gồm file IC — xem khối trên) ----------
bad = []
for p in glob.glob(os.path.join(BASE, "**", "*"), recursive=True):
    rel = os.path.relpath(p, BASE).replace("\\", "/")
    b = os.path.basename(p)
    if b.startswith("~$"): bad.append(rel)
    if b.lower().endswith((".csv", ".md", ".txt")): bad.append(rel)
    if "_UPDATED" in b or "_final" in b or "_v2" in b: bad.append(rel)
    if b.startswith(("generate_", "build_")): bad.append(rel)
rec("Không còn file rác công cụ (csv/md/_UPDATED/~$/script sinh)", not bad, bad)

# ---------- 3. Workbook ----------
wb = None
try:
    import openpyxl
except ImportError:
    openpyxl = None
if openpyxl is None:
    rec("Đọc workbook .xlsx", "KHÔNG KIỂM ĐƯỢC", "thiếu openpyxl — pip install openpyxl")
else:
    try:
        wb = openpyxl.load_workbook(os.path.join(BASE, "Test Case_23CT113_Nhom02.xlsx"), data_only=True)
    except Exception as e:
        rec("Mở được workbook", False, e)

rows, trs, rtm_rows = [], [], []
if wb:
    rec("Workbook đúng 4 sheet", set(wb.sheetnames) == {"TongQuan_Dashboard", "TR List", "TC List", "RTM"}, wb.sheetnames)
    tc = wb["TC List"] if "TC List" in wb.sheetnames else None
    if tc:
        hdr = [str(c.value or "").strip() for c in tc[1]]
        def find(*keys):
            for k in keys:
                for i, h in enumerate(hdr):
                    if k.lower() in h.lower(): return i
            return -1
        i_id, i_tr, i_ph = find("tc id"), find("tr id"), find("phân hệ")
        i_sc = find("kịch bản", "test scenario")
        i_st = find("kết quả thực thi", "trạng thái thực thi", "trạng thái")
        i_ev = find("bằng chứng", "evidence")
        i_dt = find("ngày chạy", "ngày test")
        i_steps = find("các bước", "test steps")
        i_exp = find("kết quả mong đợi", "expected result")
        rec("TC List có cột 'Kết quả mong đợi' (để đối soát mã HTTP)", i_exp >= 0,
            "thiếu cột — không đối soát được statusCode" if i_exp < 0 else "ok")
        rec("TC List có cột 'Kết quả thực thi'", i_st >= 0, hdr)
        rec("TC List có cột 'Bằng chứng' (thiếu = PASS vô nghĩa)", i_ev >= 0,
            "thiếu cột — mọi PASS/FAIL không chứng minh được")
        rec("TC List có cột 'Ngày chạy'", i_dt >= 0)
        rows = [r for r in tc.iter_rows(min_row=2, values_only=True) if any(v not in (None, "") for v in r)]
        def cell(r, i):
            return r[i] if 0 <= i < len(r) else None
        st = collections.Counter(str(cell(r, i_st) or "TRỐNG").strip().upper() for r in rows)
        executed = sum(st[k] for k in ("PASS", "FAIL", "BLOCKED"))
        rec("Có ≥15 test case (yêu cầu đề bài)", len(rows) >= 15, len(rows))
        if i_ev >= 0:
            missing = [cell(r, i_id) for r in rows
                       if str(cell(r, i_st) or "").strip() and not str(cell(r, i_ev) or "").strip()]
            rec("Mọi dòng có kết quả đều có bằng chứng", not missing, missing[:10])
            blank_no_reason = [cell(r, i_id) for r in rows if not str(cell(r, i_st) or "").strip()
                               and "CHƯA CHẠY" not in str(cell(r, i_ev) or "").upper()]
            rec("Dòng để trống đều ghi lý do CHƯA CHẠY", not blank_no_reason, blank_no_reason[:10])
        ids = [cell(r, i_id) for r in rows]
        rec("TC ID không trùng", len(ids) == len(set(ids)), len(ids) - len(set(ids)))
        # câu văn mẫu
        banned = ["kịch bản kiểm thử tiêu chuẩn", "nhập dữ liệu kiểm thử hợp lệ",
                  "hệ thống xử lý chính xác", "thực hiện thao tác kiểm tra",
                  "dữ liệu kiểm thử hợp lệ theo đặc tả"]
        junk = [cell(r, i_id) for r in rows if any(b in " ".join(str(x or "") for x in r).lower() for b in banned)]
        rec("Không còn test case văn mẫu", not junk, junk[:10])
        dup = collections.Counter(str(cell(r, i_sc) or "").strip().lower()[:60] for r in rows)
        d = sum(c for k, c in dup.items() if c > 1 and k)
        rec("Không lặp kịch bản (tỉ lệ trùng < 10%)", d < max(1, len(rows) * 0.1), "%d/%d dòng trùng" % (d, len(rows)))
        # dòng nào thiếu bước, hoặc có kết quả mà không có ngày chạy
        thin = [cell(r, i_id) for r in rows
                if len(str(cell(r, i_steps) or "")) < 20
                or (i_dt >= 0 and str(cell(r, i_st) or "").strip() and not str(cell(r, i_dt) or "").strip())]
        rec("Mọi TC có bước cụ thể (+ ngày chạy nếu đã có kết quả)", not thin, thin[:10])

    if "TR List" in wb.sheetnames:
        t = wb["TR List"]
        thdr = [str(c.value or "").strip() for c in t[1]]
        j_tr = next((i for i, h in enumerate(thdr) if "tr id" in h.lower()), -1)
        trs = [r for r in t.iter_rows(min_row=2, values_only=True) if any(v not in (None, "") for v in r)]
        rec("Có TR List", len(trs) > 0, len(trs))
        if rows and tc and i_tr >= 0 and j_tr >= 0:
            def tcell(r, i):
                return r[i] if 0 <= i < len(r) else None
            tr_ids = {cell(r, i_tr) for r in rows}
            listed = {tcell(r, j_tr) for r in trs}
            rec("Mọi TC trỏ tới TR có trong TR List", tr_ids <= listed, sorted(str(x) for x in tr_ids - listed)[:10])
            orphan = [tcell(r, j_tr) for r in trs if tcell(r, j_tr) not in tr_ids]
            rec("Mọi TR có ≥1 TC", not orphan, orphan[:10])

    if "RTM" in wb.sheetnames:
        rtm = wb["RTM"]
        rtm_rows = [r for r in rtm.iter_rows(min_row=2, values_only=True) if any(v not in (None, "") for v in r)]
        if rtm_rows and rows:
            i_tot = next((i for i, h in enumerate([str(c.value or "") for c in rtm[1]]) if "Tổng" in h), -1)
            if i_tot > 0:
                tot = sum(r[i_tot] for r in rtm_rows if isinstance(r[i_tot], (int, float)))
                rec("RTM tổng TC = số dòng TC List", tot == len(rows), "RTM=%s vs TC=%s" % (tot, len(rows)))

# ---------- 4. Bằng chứng ----------
ev_dir = os.path.join(BASE, "evidence")
ev_files = [p for p in glob.glob(os.path.join(ev_dir, "*")) if os.path.isfile(p) and not p.endswith(".gitkeep")] if os.path.isdir(ev_dir) else []
rec("Có thư mục evidence/ với file bằng chứng", len(ev_files) > 0, "%d file bằng chứng" % len(ev_files))
if ev_files:
    md5 = collections.Counter(hashlib.md5(open(p, "rb").read()).hexdigest() for p in ev_files)
    dupimg = [h for h, c in md5.items() if c > 1]
    rec("Không có file bằng chứng trùng nội dung (1 file dùng cho nhiều TC)", not dupimg, "%d cặp trùng" % len(dupimg))
    if rows:
        refd = [m.group(0) for r in rows for m in re.finditer(r"evidence/[\w\-]+\.(?:png|jpg|jpeg|txt|json|log)", str(r) or "")]
        miss = [f for f in set(refd) if not os.path.exists(os.path.join(BASE, f))]
        rec("Mọi file bằng chứng được dẫn trong workbook đều tồn tại", not miss, miss[:10])

# ---------- 4b. Bốn check bắt buộc bổ sung (Mục 10) ----------
on_disk = {os.path.basename(p) for p in ev_files}
weak, used, wrongname = [], set(), []
if rows and i_ev >= 0:
    for r in rows:
        tid = str(cell(r, i_id) or "").strip()
        stt = str(cell(r, i_st) or "").strip().upper()
        ev = str(cell(r, i_ev) or "")
        files = re.findall(r"[A-Za-z0-9_\-]+\.(?:png|jpg|jpeg|txt|json|log)", ev)
        real = [f for f in files if f in on_disk]
        if real: used.update(real)
        if stt in ("PASS", "ĐẠT", "PASSED"):
            if not real: weak.append(tid)
        for f in real:
            if tid and not f.startswith(tid): wrongname.append("%s dẫn %s" % (tid, f))
    rec("PASS có file bằng chứng thật trên đĩa (10.1)", not weak,
        "%d PASS chỉ có chữ%s" % (len(weak), (": " + ", ".join(weak[:12])) if weak else ""))
if ev_files:
    orphan = sorted(on_disk - used)
    rec("Không có file mồ côi trong evidence/ (10.2)", not orphan, orphan[:10])
    rec("Tên file bằng chứng khớp mã TC đang dẫn (10.3)", not wrongname, wrongname[:10])

# 10.5 — statusCode trong json phải khớp mã ghi trong "Kết quả mong đợi"
# Đây là lỗi đã khiến 15 PASS sai mà script vẫn báo xanh: chỉ kiểm "có file" là chưa đủ.
if rows and i_st >= 0 and i_exp >= 0:
    bad_code, no_json, unauth = [], [], []
    for r in rows:
        tid = str(cell(r, i_id) or "").strip()
        stt = str(cell(r, i_st) or "").strip().upper()
        if stt not in ("PASS", "ĐẠT", "PASSED") or not tid:
            continue
        jp = os.path.join(ev_dir, tid + "_response.json")
        want = [int(x) for x in re.findall(r"\b([1-5]\d\d)\b", str(cell(r, i_exp) or ""))]
        if not os.path.exists(jp):
            no_json.append(tid)
            continue
        try:
            js = json.load(open(jp, encoding="utf-8"))
        except Exception:
            no_json.append(tid)
            continue
        got = (js.get("response") or {}).get("statusCode")
        auth = (js.get("request") or {}).get("authenticated")
        if want and got not in want:
            bad_code.append("%s: nhận %s, mong đợi %s%s" % (tid, got, want, "" if auth else " [request chưa đăng nhập]"))
        if 403 in want and auth is False:
            unauth.append(tid)
    rec("PASS có statusCode khớp 'Kết quả mong đợi' — lệch là tự động FAIL (10.5)",
        not bad_code, "; ".join(bad_code[:15]) or "khớp hết")
    rec("TC kiểm quyền (mong 403) có request đăng nhập đúng vai (10.6)",
        not unauth, "gửi lúc chưa đăng nhập: %s" % unauth[:10] if unauth else "ok")
    if no_json:
        rec("PASS có file <TC>_response.json để đối soát (10.5)", "KHÔNG KIỂM ĐƯỢC",
            "%d PASS không có json: %s" % (len(no_json), no_json[:10]))

# 10.4 — PRD/IC: sạch placeholder + EN khớp VI
icxl = glob.glob(os.path.join(BASE, "01-IC-*.xlsx"))
if not icxl:
    rec("IC .xlsx đọc được", "KHÔNG ĐẠT", "không thấy 01-IC-*.xlsx — bộ tài liệu chưa hoàn thành")
else:
    try:
        iw = openpyxl.load_workbook(icxl[0], data_only=True)
        PATS = [r"MM/DD/YY", r"^\s*Name\s*$", r"^OBJECTIVE\s+\d", r"^Constraint\s+\d",
                r"^DEPENDENCY\s+\d", r"REQUIREMENT CONDITION", r"^(High|Medium|Low)$",
                r"TEMPLATE|MẪU YÊU CẦU"]
        junk = ["%s!%s" % (ws.title, c.coordinate) for ws in iw.worksheets
                for row in ws.iter_rows() for c in row
                if c.value is not None and any(re.search(pp, str(c.value)) for pp in PATS)]
        rec("IC sạch placeholder template (10.4)", not junk,
            "%d ô%s" % (len(junk), (": " + ", ".join(junk[:10])) if junk else ""))
        jsheet = [s for s in iw.sheetnames if re.search(r"do not delete|disclaimer|^blank|instruction|sample", s, re.I)]
        rec("IC không còn sheet rác / tiền tố BLANK (10.4)", not jsheet, jsheet or "sạch")
        nm = iw.sheetnames
        def _n(s): return s.lower().replace("blank ", "").strip()
        def _pick(want_vi):
            for s in nm:
                x = _n(s)
                if "product requirements" in x and x.startswith(("vi", "vn")) == want_vi: return s
            return None
        sa, sb = _pick(False), _pick(True)
        if sa and sb:
            def _rows(ws):
                return [i for i in range(1, ws.max_row + 1)
                        if any(ws.cell(i, c).value not in (None, "") for c in range(1, ws.max_column + 1))]
            a, b = _rows(iw[sa]), _rows(iw[sb])
            rec("PRD EN và VI cùng số dòng có nội dung (10.4)", len(a) == len(b),
                "EN=%d VI=%d lệch=%d" % (len(a), len(b), abs(len(a) - len(b))))
        else:
            rec("PRD EN và VI cùng số dòng có nội dung (10.4)", "KHÔNG KIỂM ĐƯỢC", nm)
    except Exception as e:
        rec("IC .xlsx đọc được", "KHÔNG KIỂM ĐƯỢC", "%s: %s" % (type(e).__name__, e))

# ---------- 5. Docx / pptx / pdf ----------
# Thư viện có thể thiếu — import ở đây KHÔNG được làm chết cả script.
try:
    import docx
except ImportError:
    docx = None
try:
    from pptx import Presentation
except ImportError:
    Presentation = None
try:
    from pypdf import PdfReader
except ImportError:
    try:
        from PyPDF2 import PdfReader
    except ImportError:
        PdfReader = None

if docx is None or Presentation is None:
    print("CẢNH BÁO: thiếu python-docx / python-pptx → các mục .docx/.pptx sẽ là KHÔNG KIỂM ĐƯỢC."
          " Cài: pip install python-docx python-pptx")

def doc(path):
    if docx is None:
        rec("Đọc được file .docx", "KHÔNG KIỂM ĐƯỢC", "thiếu python-docx — pip install python-docx")
        return None
    try: return docx.Document(os.path.join(BASE, path))
    except Exception as e:
        rec("Mở được %s" % path, False, e); return None

for p in ["Test Plan_23CT113_Nhom02.docx", "Test Report_23CT113_Nhom02.docx",
          "TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx"]:
    d = doc(p)
    if d:
        sizes = collections.Counter()
        fonts = collections.Counter()
        for x in d.paragraphs:
            for r in x.runs:
                if r.font.size: sizes[r.font.size.pt] += 1
                if r.font.name: fonts[r.font.name] += 1
        if sizes:
            rec("%s: cỡ chữ phổ biến 12–13" % p, sizes.most_common(1)[0][0] in (12.0, 13.0), dict(sizes))
        else:
            rec("%s: cỡ chữ" % p, "KHÔNG KIỂM ĐƯỢC", "không set size trực tiếp — kiểm bằng tay")
        if fonts:
            rec("%s: font Times New Roman" % p,
                "times new roman" in fonts.most_common(1)[0][0].lower(), dict(fonts))

k = doc("TimeLine/Nhom2_Ke_hoach_Truong_nhom_Bao_cao_cuoi_ky.docx")
if k:
    rec("Kế hoạch trưởng nhóm: đúng 3 bảng", len(k.tables) == 3, len(k.tables))
    rec("Kế hoạch trưởng nhóm: bảng 1 đúng 6 dòng", bool(k.tables) and len(k.tables[0].rows) == 6,
        len(k.tables[0].rows) if k.tables else 0)
    rec("Kế hoạch trưởng nhóm: có mục 4 đối chiếu",
        any("ĐỐI CHIẾU PHÂN HỆ" in (x.text or "").upper() for x in k.paragraphs))

for i in (1, 2, 3):
    d = doc("TimeLine/Biên Bản Họp Nhóm Lần %d – Báo Cáo Cuối Kỳ Môn Kiểm Thử Phần Mềm.docx" % i)
    if d:
        rec("Biên bản lần %d: có ảnh cuộc họp" % i, len(d.inline_shapes) > 0, "%d ảnh" % len(d.inline_shapes))

if Presentation is None:
    rec("Đếm slide PPT", "KHÔNG KIỂM ĐƯỢC", "thiếu python-pptx — pip install python-pptx")
else:
    try:
        prs = Presentation(os.path.join(BASE, "Word+ppt Báo Cáo/Ppt Báo cáo Nhóm 2 - 23CT113.pptx"))
        rec("PPT 10–12 slide", 10 <= len(prs.slides) <= 12, len(prs.slides))
    except Exception as e:
        rec("Đọc được PPT", False, e)

pdf_path = os.path.join(BASE, "Word+ppt Báo Cáo/Nhom02_Final_Report_Software_Testing.pdf")
if PdfReader is None:
    rec("Đếm trang PDF", "KHÔNG KIỂM ĐƯỢC", "thiếu pypdf — pip install pypdf, hoặc mở file đếm tay")
else:
    try:
        n = len(PdfReader(pdf_path).pages)
        rec("PDF 10–15 trang", 10 <= n <= 15, n)
    except Exception as e:
        rec("Đếm trang PDF", "KHÔNG KIỂM ĐƯỢC", "%s — mở file đếm tay" % e)

# ---------- 6. Rác copy từ mẫu Sweet-Sip ----------
# Nếu thiếu thư viện đọc file thì không được kết luận "sạch" — chỉ là chưa quét được.
libs_ok = docx is not None and Presentation is not None and openpyxl is not None
if not libs_ok:
    rec("Quét dấu vết Sweet-Sip trong .docx/.xlsx/.pptx", "KHÔNG KIỂM ĐƯỢC",
        "thiếu thư viện đọc file — pip install openpyxl python-docx python-pptx")
res, skipped = [], []
for p in glob.glob(os.path.join(BASE, "**", "*"), recursive=True):
    if not p.lower().endswith((".docx", ".xlsx", ".pptx")): continue
    try:
        if p.endswith(".docx"):
            t = "\n".join(x.text for x in docx.Document(p).paragraphs)
            for tb in docx.Document(p).tables:
                for row in tb.rows:
                    t += "\n" + " ".join(c.text for c in row.cells)
        elif p.endswith(".pptx"):
            t = " ".join(sh.text_frame.text for s in Presentation(p).slides for sh in s.shapes if sh.has_text_frame)
        else:
            t = " ".join(str(c.value) for ws in openpyxl.load_workbook(p, data_only=True) for row in ws.iter_rows() for c in row if c.value)
    except Exception:
        skipped.append(os.path.relpath(p, BASE)); continue
    for w in ("sweet sip", "nhóm 7", "nhom7", "phuc@lhu.edu.vn", "quán cà phê", "gợi ý đồ uống"):
        if w in t.lower(): res.append("%s → %s" % (os.path.relpath(p, BASE), w))
# Chỉ được kết luận "sạch" khi THỰC SỰ đọc được hết file.
if libs_ok:
    if skipped:
        rec("Quét Sweet-Sip: có file không đọc được", "KHÔNG KIỂM ĐƯỢC", skipped[:10])
    rec("Không còn dấu vết Sweet-Sip", not res, res)

# ---------- 7. Tóm tắt số liệu + Báo cáo ----------
try:
    _st = dict(st); _n = len(rows)
except NameError:
    _st, _n = {}, 0
try:
    _tr = len(trs)
except NameError:
    _tr = 0
_exec = sum(_st.get(k, 0) for k in ("PASS", "FAIL", "BLOCKED"))
print("TÓM TẮT: TR=%d | TC=%d | PASS=%d FAIL=%d BLOCKED=%d TRỐNG=%d | %%PASS/đã chạy=%s" % (
    _tr, _n, _st.get("PASS", 0), _st.get("FAIL", 0), _st.get("BLOCKED", 0),
    _st.get("TRỐNG", 0), round(100 * _st.get("PASS", 0) / _exec, 1) if _exec else "n/a"))

print("\n%-12s %-70s %s" % ("KẾT LUẬN", "HẠNG MỤC", "CHI TIẾT"))
print("-" * 120)
for s, n, d in R:
    print("%-12s %-70s %s" % (s, n, d))
# Tổng phải tự cộng lại và kiểm khớp — không được in tổng suông
from collections import Counter
_c = Counter(x[0] for x in R)
fail = [x for x in R if x[0] == "KHÔNG ĐẠT"]
print("\nĐẠT: %d | KHÔNG ĐẠT: %d | KHÔNG KIỂM ĐƯỢC: %d | THÔNG TIN: %d | TỔNG: %d"
      % (_c.get("ĐẠT", 0), _c.get("KHÔNG ĐẠT", 0), _c.get("KHÔNG KIỂM ĐƯỢC", 0),
         _c.get("THÔNG TIN", 0), len(R)))
if sum(_c.values()) != len(R):
    print("LỖI ĐẾM: tổng các nhóm không bằng số hạng mục — báo KHÔNG KIỂM ĐƯỢC, không che")
```

Sau khi chạy, **dán nguyên output** vào báo cáo. Với mọi dòng `KHÔNG ĐẠT`, mở đúng file để xác nhận lại bằng mắt — có thể script bắt nhầm (ví dụ ô header lệch một dòng).

**Giới hạn của script, phải nói rõ khi báo cáo:** phần ảnh chỉ so **MD5** — nó biết hai ảnh giống hệt nhau, biết ảnh được dẫn nhưng không tồn tại, và **không biết ảnh chụp cái gì**. Không được biến "MD5 khác nhau" thành "ảnh đúng màn hình".

---

### 2. ĐỐI CHIẾU SỐ GIỮA CÁC FILE — chỗ dễ sai nhất

Script trên chỉ biết workbook. Số trong 4 tài liệu còn lại **không tự khớp** — bạn phải so bằng tay.

1. **Tính một lần, dùng nhiều lần.** Từ `TC List`, lập bảng chuẩn:

```python
import openpyxl, collections
wb = openpyxl.load_workbook("23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx")
tc = wb["TC List"]; h = [str(c.value or "") for c in tc[1]]
i_ph = next((i for i, x in enumerate(h) if "phân hệ" in x.lower()), -1)
i_st = next((i for i, x in enumerate(h) if "thực thi" in x.lower() or "trạng thái" in x.lower()), -1)
assert i_ph >= 0 and i_st >= 0, "Không tìm thấy cột Phân hệ / Kết quả thực thi — in header row 1 ra xem: %s" % h
rows = [r for r in tc.iter_rows(min_row=2, values_only=True) if r[0]]
g = collections.defaultdict(lambda: collections.Counter())
for r in rows:
    g[r[i_ph]][str(r[i_st] or "TRỐNG").strip().upper()] += 1
for k in sorted(g):
    c = g[k]
    print("%-12s TC=%-3d PASS=%-3d FAIL=%-3d BLOCKED=%-3d TRỐNG=%d" % (k, sum(c.values()), c["PASS"], c["FAIL"], c["BLOCKED"], c["TRỐNG"]))
```

2. Với **từng** tài liệu sau, mở và kiểm từng con số nó khẳng định:
   - `Test Plan` mục 1 (bảng thành viên), mục 2 (tiêu chí chất lượng)
   - `Test Report` mục 2, 3 (bảng theo phân hệ)
   - `TimeLine/Nhom2_Ke_hoach...` mục 2 và mục 4
   - `Word+ppt Báo Cáo/Báo Cáo Word...` và `Ppt...`
   - Sheet `TongQuan_Dashboard` và `RTM`

3. Ghi kết quả vào bảng sau, mỗi dòng một con số **khác nhau** (kể cả lệch 1):

| Con số | Nguồn chuẩn (workbook) | Test Plan | Test Report | Kế hoạch TN | Báo cáo Word | PPT | Dashboard | RTM |
|---|---|---|---|---|---|---|---|---|
| Tổng TR | | | | | | | | |
| Tổng TC | | | | | | | | |
| Đã chạy | | | | | | | | |
| PASS | | | | | | | | |
| FAIL | | | | | | | | |
| BLOCKED | | | | | | | | |
| Chưa chạy | | | | | | | | |
| %PASS (trên đã chạy) | | | | | | | | |

Quy tắc kết luận:

- Lệch số ở **bất kỳ** ô nào = `KHÔNG ĐẠT`, nêu rõ file + vị trí + giá trị thấy được.
- `%PASS` phải tính **trên số đã chạy**, không phải trên tổng TC. Tài liệu tính trên tổng = sai công thức, không phải "khác quan điểm".
- Nếu tài liệu ghi `100%` cho một thành viên mà người đó còn TC chưa chạy → sai.
- Nếu tài liệu còn số cũ (`173`, `200 TC`, `23 FAIL`, `14 BUG`, `86.5%`) → sai, trừ khi đó là số **thật vừa chạy ra**.

---

### 3. KIỂM NỘI DUNG — 200 kịch bản đẹp có thể vẫn là rác

Chọn **ngẫu nhiên nhưng có hệ thống**: 3 TC mỗi phân hệ + toàn bộ TC có kết quả `FAIL`. Với mỗi TC, kiểm 4 điều:

1. **Điểm vào có thật?** Route/màn hình trong cột "Điểm vào" hoặc trong bước — `grep` xem có tồn tại (`src/app/api/.../route.ts`, `src/app/.../page.tsx`). Không có = bịa.
2. **Dữ liệu có khớp code?** Ví dụ TC nói "mật khẩu 5 ký tự bị từ chối" thì code phải có `password.length < 6`; TC nói "token hết hạn sau 30 phút" thì phải có `PASSWORD_RESET_TTL_MS`; TC nói "MoMo trả 410" thì route phải trả 410. Lấy ngưỡng **từ code**, đối chiếu với ngưỡng trong TC.
3. **Kết quả mong đợi có đo được?** "Hệ thống hoạt động đúng" / "hiển thị thông báo phù hợp" không đo được → ghi nhận là TC yếu.
4. **Bằng chứng có thật sự chứng minh kết quả?** Với mỗi `PASS`: lệnh trong cột bằng chứng có chạy được không, output có đúng là của TC đó không. Với ảnh: script ở Mục 1 **chỉ so MD5**, nó phát hiện được 1 ảnh dùng cho nhiều TC và ảnh được dẫn nhưng không tồn tại, nhưng **không đọc được nội dung ảnh**.
   - Nếu công cụ của bạn **có** khả năng đọc ảnh (vision / view image): mở 3–5 ảnh, đối chiếu màn hình với TC.
   - Nếu bạn **chỉ có terminal**: tuyệt đối không đoán. Ghi `KHÔNG KIỂM ĐƯỢC — chưa xác nhận nội dung ảnh`, kèm danh sách đường dẫn ảnh cần người dùng tự mở xem.
   - Ảnh chụp sản phẩm khác, ảnh trang lỗi 404, hay 1 ảnh dùng cho 5 TC = không phải bằng chứng.

Ghi lại **3 TC tệ nhất** làm ví dụ, kèm mã TC và lý do cụ thể.

Đồng thời kiểm 3 câu hỏi lớn:

- Có TC nào mô tả **tính năng không tồn tại** (ví điện tử hoạt động, WebSocket realtime, COD, AI gợi ý) không?
- Có `FAIL` nào thực chất là **môi trường sai** (sai mật khẩu, chưa seed, thiếu KYC) nhưng bị ghi thành bug sản phẩm không?
- Danh sách bug có **≥3 bug thật**, mỗi bug dẫn được file/route cụ thể, có dữ liệu tái hiện? Bug nào không tái hiện được thì ghi rõ là chưa xác nhận.

---

### 4. KIỂM TÀI KHOẢN TEST — có đăng nhập thật hay chỉ chép

1. Đọc `src/data/seed.ts`, ghi ra 4 tài khoản + role + mật khẩu **theo code**.
2. Đăng nhập thử từng tài khoản trên `http://localhost:3000` (nếu app chạy) hoặc trên demo. Ghi: `email → vào được / lỗi gì`.
3. Đối chiếu với bảng tài khoản trong `Test Plan` mục 5:
   - Sai email/role/mật khẩu so với seed → `KHÔNG ĐẠT`.
   - Ghi `admin@gmail.com` / `123` trong khi seed là `admin@crowdfunding.vn` / `Admin@123456` → `KHÔNG ĐẠT`.
4. Nếu có tài khoản do nhóm tạo thêm: kiểm nó có trong tài liệu không, role có đúng không, và có ai đó đã **nâng quyền bằng tay trong DB** không (`UPDATE users SET role`, `INSERT INTO users`) — nếu có, ghi nhận là vi phạm quy trình.
5. Không được đổi mật khẩu, khóa, hay xóa tài khoản nào khi kiểm.

---

### 5. KIỂM ĐỒNG BỘ GIT / VERCEL

```bash
git status --short
git log --oneline -3
git remote -v
git show --stat --oneline HEAD
git show HEAD --name-only | grep -E "(^|/)\.env" && echo "NGHIÊM TRỌNG: commit chứa .env" || echo "OK: không có .env"
git show HEAD -- '*.ts' '*.js' '*.sql' '*.json' | grep -iE "postgres://|NEXTAUTH_SECRET|CLOUDINARY_URL|API_KEY" || echo "OK: không có secret"
```

- Commit cuối có đúng phạm vi (thư mục bài nộp + file seed/script nếu có) hay kéo theo file lạ?
- Có file rác công cụ (`.aider*`, `generate_*.py`, `build_*.js`, `node_modules`, `.next`) bị commit không?
- Có nhiều commit/push hơn mức cần thiết không?
- Mở `https://test-gamma-azure-65.vercel.app`, đăng nhập 1 tài khoản, xác nhận app còn chạy. **Lưu ý kỹ thuật:** bản Vercel dùng **cùng** database Neon với local, nên tài khoản tạo qua app xuất hiện trên demo ngay — push GitHub **không** phải nguyên nhân tạo ra tài khoản. Nếu tài liệu nói "push để đồng bộ tài khoản" thì đó là mô tả sai cơ chế, chỉ là lỗi hành văn, không phải lỗi dữ liệu — ghi mức thấp.

---

### 6. KIỂM THEO ĐỀ BÀI — đừng bỏ qua phần dễ được điểm

Đối chiếu với yêu cầu môn học (`NguyenMinhPhuc/SoftwareTesting`, `Report/Final_Report_Guidelines_Software_Testing.markdown`, `Moodle_HTML/08_Huong_dan_bao_cao_cuoi_ky.html`):

| Yêu cầu | Ngưỡng | Thực tế | Kết luận |
|---|---|---|---|
| Test case | ≥ 15 | | |
| Bug report | ≥ 3, tái hiện được | | |
| Test Plan đủ mục | 9 mục | | |
| Test Report có RTM | có bảng RTM | | |
| PDF | 10–15 trang | | |
| PPT | 10–12 slide, mọi thành viên có phần | | |
| Biên bản họp | ≥ 3, mỗi phiên có ảnh | | |
| Test Case + kết quả thực thi | có bằng chứng | | |
| File IC `.xlsx` | **bắt buộc** — thiếu là `KHÔNG ĐẠT` | | |
| IC sạch template | 0 ô rác mẫu, không sheet phụ | | |
| IC bản EN = bản VI | cùng số dòng có nội dung | | |

File IC **là bắt buộc** với nhóm này, không phải file thừa. Ba mức kiểm IC:

1. **Có file** `01-IC-Product-Requirements_23CT113_Nhom02.xlsx` — thiếu = `KHÔNG ĐẠT`, chặn nộp.
2. **Sạch template**: không còn sheet `Key - DO NOT DELETE` / `- Disclaimer -` / `*BLANK*`; không còn ô `MM/DD/YY`, `Name`, `OBJECTIVE 5`, `Constraint 3`, `DEPENDENCY 5`, `REQUIREMENT CONDITION`, ô ưu tiên trống tên, câu hướng dẫn của mẫu.
3. **EN khớp VI**: hai sheet phải cùng số dòng có nội dung; lệch = `KHÔNG ĐẠT` kèm số dòng lệch.

Đừng kết luận "IC ổn" chỉ vì file tồn tại — mở ra đếm từng ô. Một file IC còn 57 ô placeholder là **chưa làm xong**, không phải "tạm ổn".

---

### 7. BÁO CÁO — viết sau cùng, chỉ khi `KHÔNG ĐẠT = 0`

> **Mục 7 không phải điểm kết thúc.** Báo cáo chỉ được viết **sau khi** đã sửa và chạy lại xong. Nếu còn lỗi mà bạn in bảng A–G rồi dừng, đó là **làm sai mục 0.5**, không phải "đã kiểm xong". Thứ tự bắt buộc: chạy check → sửa → chạy lại → lặp → **sạch** → mới viết A–G.
>
> **Nếu công cụ của bạn không sửa được file** (sandbox chỉ đọc, không có quyền ghi), câu **đầu tiên** của câu trả lời phải là: `KHÔNG SỬA ĐƯỢC: <lý do cụ thể>` rồi mới tới bảng. Cấm trình bày bảng như thể đã hoàn thành nhiệm vụ.
>
> **Sửa được mà chỉ báo lỗi = chưa làm gì cả.** Người dùng đã chạy prompt này để nó tự sửa, không phải để nhận thêm một danh sách lỗi.

Trả lời theo đúng thứ tự sau, không thêm mở bài dài:

**A. Kết luận một dòng:** `ĐẠT` / `ĐẠT CÓ ĐIỀU KIỆN` / `KHÔNG ĐẠT` — và số hạng mục hỏng.

**B. Bảng lỗi, sắp theo mức độ** (mỗi dòng 1 lỗi, không gộp):

| # | Mức | Vị trí (file + ô/trang/dòng) | Sai thế nào | Đúng phải là | Cách sửa |
|---|---|---|---|---|---|
| 1 | Chặn nộp | | | | |
| 2 | Nặng | | | | |
| 3 | Nhẹ | | | | |

Mức độ:
- **Chặn nộp**: sai số liệu giữa các file, PASS không có bằng chứng, TC bịa route, bug < 3, thiếu file bắt buộc, file chứa secret.
- **Nặng**: tài khoản test sai, còn dấu vết Sweet-Sip, số cứng cũ, ảnh họp mất, RTM/TC không khớp.
- **Nhẹ**: hành văn, thứ tự mục, mô tả cơ chế sync sai, định dạng lệch, có file IC/PRD thừa (không trừ nặng).

**C. Ba TC tệ nhất** (mã + lý do cụ thể), và ba TC tốt nhất (để biết chuẩn đang ở đâu).

**D. Bảng đối chiếu số** ở Mục 2 đã điền đầy đủ.

**E. Đã sửa gì trong vòng lặp này** — bảng `| Vòng | File | Vị trí | Trước | Sau | Tầng | Lý do |`, lấy từ `CHANGELOG_SUA.md`. Không có dòng nào = không được sửa gì, và phải nói rõ vì sao (chỉ khi `KHÔNG ĐẠT = 0` ngay từ vòng 1).

**F. Những gì bạn KHÔNG kiểm được** (thiếu email thật, không có quyền deploy, không xem được dashboard Vercel, PDF không đọc được, **nội dung ảnh nếu công cụ không có vision**, thư viện Python còn thiếu…) — nêu thẳng, đừng bỏ trống cho đẹp.

**G. Nhật ký vòng lặp** — bắt buộc, in từ `CHANGELOG_SUA.md`:

| Vòng | ĐẦU VÀO (KHÔNG ĐẠT) | ĐÃ SỬA | CHECK LẠI | CÒN LẠI |
|---|---|---|---|---|
| 1 | 21 | 12 | 9 | 9 |
| 2 | 9 | 6 | 3 | 3 |
| 3 | 3 | 3 | 0 | **0 → DỪNG** |

Cột `CHECK LẠI` phải là kết quả chạy lại **thật**, không phải "chắc là xong". Không có bảng này = chưa chạy vòng lặp = chưa hoàn thành prompt.

---

### 8. KIỂM TRA + TỰ SỬA — BA TẦNG

Bạn **phải sửa**, không phải xin phép. Chạy prompt này là đã có lệnh sửa. Chỉ xem-trước khi người dùng gõ đúng chữ `DRY-RUN`. Ba tầng ở 8.1 quyết định **sửa được tới đâu**, không phải **có được sửa hay không**.

#### 8.1. Tầng nào được sửa gì

**TẦNG 1 — tự sửa, không cần hỏi** (lỗi cơ học, không làm thay đổi kết luận kiểm thử):

- Số tổng hợp lệch dữ liệu gốc: sai ở **ô tổng** thì sửa ô tổng theo dữ liệu thô.
- Công thức sai vùng: ví dụ ô tổng chỉ tính `E2:E96` trong khi dữ liệu tới dòng 106 → sửa vùng.
- Mã TC viết tắt lệch cột `Phân hệ` (`TC_PLEDG_*` trong khi phân hệ là `PLEDGE`) → đổi tên cho khớp.
- Sheet rác / tiền tố `BLANK` / dòng placeholder của template → xóa hoặc đổi tên.
- Ô còn sót tên sản phẩm mẫu (Sweet Sip, quán cà phê, đồ uống…).
- TC dẫn tới file **không tồn tại**; ảnh mồ coi; ảnh gắn sai mã TC.
- Ký tự ẩn, công thức hỏng, `#REF!`.

**TẦNG 2 — sửa được, bắt buộc ghi changelog** (sửa nội dung, không đổi bản chất kết quả):

- Bản EN thiếu mục so với bản VI: **dịch bổ sung**, không được lược bản VI cho bằng.
- Heading trơ không có nội dung (`OBJECTIVE 5`, `Constraint 3`, `REQUIREMENT CONDITION`…).
- Mô tả trong PRD sai so với code đã đọc thật.
- TC `PASS` chỉ có chứng cứ chữ (`curl … -> HTTP 200`): gắn cờ **BẰNG CHỨNG YẾU**, **không đổi trạng thái PASS/FAIL**.
- TR ghi sai route: chỉ sửa khi đã tìm ra route đúng trong `src/`.

**TẦNG 3 — cấm bịa, nhưng phải hạ cấp khi bằng chứng không đứng được**:

Cấm tuyệt đối:

- Sửa code sản phẩm để test dễ pass hơn.
- Thêm/xóa TR, TC, BUG cho đẹp số.
- Sửa **dữ liệu gốc** (kết quả thực thi, bằng chứng, ngày chạy) cho khớp số tổng hợp.
- Dùng lại ảnh cũ, ảnh của TC khác, hay ảnh tự tạo bằng công cụ vẽ.

**Bắt buộc phải làm** (đây là sửa thật, không phải bịa):

- `PASS` mà `statusCode` trong json **không khớp** mã ghi trong "Kết quả mong đợi" → **hạ xuống `FAIL`**, ghi changelog kèm mã thật vs mã mong đợi. Đây là sửa sai, không phải đổi kết quả cho đẹp.
- `PASS` mà ảnh không chứa nội dung TC đòi → chạy lại test, chụp lại ảnh đúng trạng thái kết quả, rồi mới giữ `PASS`. Chạy lại không ra → hạ `FAIL`/`BLOCKED`.
- `FAIL` do **điều kiện tiên quyết sai** (sai role, thiếu payload, sai tên tham số) → sửa harness rồi **chạy lại thật**; ra mã đúng thì nâng `PASS` kèm bằng chứng mới có mtime mới.
- Mọi thay đổi `PASS`/`FAIL` phải kèm đường dẫn file bằng chứng mới sinh ra trong chính lần chạy này.

#### 8.2. Chín điều cấm tuyệt đối

1. Cấm sửa dữ liệu gốc cho khớp số tổng hợp — số lệch thì **sửa số tổng hợp**.
2. Cấm xóa TR/TC/BUG để báo cáo trông đẹp hơn.
3. Cấm tạo ảnh, cấm dùng lại ảnh của TC khác, cấm đổi tên ảnh cho khớp TC.
4. Cấm nâng trạng thái (`FAIL`→`PASS`, trống→`PASS`) khi chưa có bằng chứng mới thật.
5. Cấm ghi file đang mở trong Excel/Word — báo người dùng đóng rồi chạy lại.
6. Cấm ghi đè khi chưa có bản backup trong `_backup/<YYYYMMDD-HHMM>/`.
7. Cấm hỏi người dùng giữa vòng lặp. Việc sửa là phần của việc kiểm — đã được lệnh từ đầu.
8. Cấm tuyên bố "đã xong" / "đã đạt" khi script còn in `KHÔNG ĐẠT`.
9. Cấm nâng `PASS` bằng cách sửa cột trạng thái mà không có file bằng chứng mới sinh ra trong chính lần chạy đó.

#### 8.3. Quy trình mỗi lần sửa

1. Copy file sắp sửa vào `_backup/<YYYYMMDD-HHMM>/` (giữ nguyên tên).
2. Sửa đúng phạm vi, không "nhân tiện" dọn thêm chỗ khác.
3. Chạy lại **đúng check của nhóm vừa sửa**, không chạy lại toàn bộ cho có vẻ kỹ.
4. Xuất `CHANGELOG_SUA.md` với bảng: `| File | Sheet/Ô | Trước | Sau | Tầng | Lý do |`.
5. Sửa xong mà số liệu **vẫn** lệch → báo `FAIL`, không được che.
6. Nói rõ: **"đã sửa tài liệu" không đồng nghĩa với "đã kiểm thử"**.

- Sửa **theo đúng danh sách ở mục E**, không làm thêm gì "nhân tiện".
- Mỗi lần sửa một nhóm lỗi, chạy lại **đúng check của nhóm đó**, không chạy lại toàn bộ cho có vẻ kỹ.
- Không sửa số liệu bằng cách sửa… số liệu. Nếu số sai vì thiếu bằng chứng, phải chạy test hoặc xóa kết quả đó đi, không chỉnh cho khớp tài liệu khác.
- Không commit, không push trừ khi được yêu cầu rõ. Nếu được yêu cầu: một commit, đúng phạm vi, chặn `.env`, không `--force`.
- Kết thúc: nêu **cái gì đã sửa**, **cái gì cố tình không sửa và vì sao**, **cái gì vẫn không kiểm được**.

---

### 9. NHỮNG KẾT LUẬN SAI BẠN PHẢI TRÁNH

1. "Đã đủ 200 TC nên đạt" — đề bài chỉ cần ≥15; 200 dòng rác tệ hơn 60 dòng thật.
2. "Các file đều ghi 173 PASS nên khớp nhau" — cùng một con số sai ở 6 file vẫn là sai. Kiểm bằng cách tính lại từ `TC List`.
3. "Có ảnh trong evidence/ nên có bằng chứng" — phải mở ảnh xem có đúng màn hình của TC đó, và ảnh không được trùng nhau.
4. "Không thấy lỗi nên ĐẠT" — nếu bạn chưa chạy được app, chưa đăng nhập được, thì kết luận đúng là `KHÔNG KIỂM ĐƯỢC`, không phải `ĐẠT`.
5. "Thiếu PRD nên trừ điểm" — PRD không nằm trong danh sách nộp, nhưng **file IC là bắt buộc với nhóm này**: thiếu IC là chưa hoàn thành, còn IC còn nguyên placeholder template thì là lỗi nặng.

### 10. BẢY CHECK BẮT BUỘC BỔ SUNG

B‌ảy lỗ hổng dưới đây đã từng khiến báo cáo kết luận `ĐẠT` trong khi bộ tài liệu vẫn sai. Luôn chạy đủ, in đủ. Mỗi check hỏng đều là `KHÔNG ĐẠT` của **tài liệu** — không phải `FAIL` của sản phẩm.

**10.1. Bằng chứng phải tồn tại thành file.** `PASS` chỉ hợp lệ khi ô `Bằng chứng` chứa **tên file** và file đó **có thật trên đĩa**. Chỉ có chuỗi `curl … -> HTTP 200` thì ghi thêm cờ `BẰNG CHỨNG YẾU` và đếm riêng — **không** đổi trạng thái, không gộp vào "PASS hợp lệ".

**10.2. Ảnh mồ côi.** Ảnh có trong `evidence/` mà không TC nào dẫn tới = `KHÔNG ĐẠT`. Lỗi này thường đi kèm chuyện ô bằng chứng đã bị thay bằng mô tả code, trong khi ảnh đã chụp vẫn nằm đó.

**10.3. Tên ảnh phải khớp mã TC.** TC `TC_X_001` dẫn `TC_Y_004.png` = `KHÔNG ĐẠT`, kể cả khi file tồn tại. Kiểm cả chiều ngược: ảnh tên đúng TC nhưng **nội dung** là màn hình của TC khác — phải mở ảnh ra xem, MD5 không nói được điều này.

**10.4. EN và VI phải cùng số dòng.** Với PRD/IC và mọi tài liệu song ngữ: đếm dòng có nội dung ở cả hai bản, lệch = `KHÔNG ĐẠT` + in số dòng lệch. Bản EN bị bỏ rơi nửa chừng là lỗi phổ biến nhất.

**10.5. `statusCode` phải khớp "Kết quả mong đợi" — nếu không thì tự động `FAIL`.**
Đây là lỗ hổng đã khiến 15/89 `PASS` sai trong khi script vẫn báo xanh. Với mọi TC có file `evidence/<TC_ID>_response.json`:

1. Đọc `response.statusCode` trong json.
2. Trích các mã HTTP xuất hiện trong ô "Kết quả mong đợi" (`201`, `400`, `403`, `404`, `429`, `410`…).
3. `statusCode` **không thuộc** tập mã đó → TC đó **bắt buộc `FAIL`**, bất kể cột trạng thái đang ghi gì. Ghi rõ `mã thật vs mã mong đợi` + trích `response.body` để chứng minh.

**Cấm harness tự đặt tiêu chí.** Trong file json có trường `verification: "HTTP 400 verified against expected [400,404]"` — đây là chỗ harness tự khai tập mã nó chấp nhận. Tập đó **phải trích từ cột \"Kết quả mong đợi\"**, không được tự thêm mã cho dễ đậu. Đã bắt được thật: `TC_CERT_003` tự nhận `[400,404]`; `TC_CAMP_002` tự nhận `[401,403]`; `TC_COMM_005` tự nhận `[200,429]` — nhận `200` cho một test chống spam là tự chấm cho mình đậu. Kiểm: đọc `expected [...]` trong `verification`, so với mã trong Excel; mã nào có trong harness mà không có trong Excel = **KHÔNG ĐẠT**, sửa lại tập mã rồi chạy lại.

Ví dụ thật đã xảy ra, phải bắt được: `TC_REWD_003` mong `201` nhận `400` (`Can them chien dich hoac du an…`); `TC_BLOG_007` mong `201` nhận `400` (`Missing required fields`); `TC_KYC_003` mong `400` nhận `403` (`Tai khoan nay da la Creator`); `TC_CERT_003` mong `404` nhận `400` (`Vui long cung cap ma…`); `TC_CAMP_002` mong `403` nhận `401` (request chưa đăng nhập).

**10.6. Điều kiện tiên quyết của request phải đúng vai.** Lỗi "test đúng nhưng chạy sai vai" không phải lỗi sản phẩm. Với mỗi TC gọi API:

1. TC nói dùng tài khoản nào → request phải có `authenticated: true` và đúng `role` đó. `authenticated: false` cho TC cần đăng nhập = bằng chứng vô giá trị, hạ `FAIL`.
2. Tên tham số phải đọc từ **route thật**, không đoán: ví dụ `/api/lookup` đọc `transactionId` hoặc `code`, **không** phải `q`. Gửi sai tên tham số → API trả `400` chứ không `404`, và đó là lỗi harness.
3. Payload phải đủ trường bắt buộc theo schema trong route. Thiếu `title/type/visibility` hay `campaignId` → `400` là do harness.
4. Test chống spam phải gửi **≥ 4 request hợp lệ liên tiếp** (nội dung ≥ 10 ký tự) mới kỳ vọng `429`.

Khi sai tiền đề: **sửa harness, chạy lại, lấy kết quả thật**. Không được ghi `PASS` cho một lần chạy sai tiền đề, và cũng không được ghi `FAIL` cho sản phẩm khi lỗi là do harness.

**10.7. Ảnh phải chụp trạng thái **sau** hành động.** Ảnh chụp trước khi bấm nút (ô nhập đã điền nhưng chưa có kết quả) không chứng minh được gì. Trước khi chụp phải chờ phần tử kết quả xuất hiện (`waitForSelector`/`waitForResponse`), rồi mới `screenshot`. Ảnh phải có dải URL đóng dấu vào chính file ảnh để biết nó được chụp ở đâu. Ảnh không có nội dung TC đòi → hạ `FAIL`, chụp lại.

**Luật viết báo cáo cho cả 7 check:**

- Mỗi check in `TÊN_CHECK | ĐẠT/KHÔNG ĐẠT | chi tiết lấy từ dữ liệu thật`.
- Cấm hard-code chuỗi kết luận cho cả hai trường hợp. Cấm in `ĐẠT` kèm chi tiết đang nói ngược lại.
- Script lỗi ở check nào → in `KHÔNG KIỂM ĐƯỢC` + mã lỗi. Cấm bỏ qua rồi in `ĐẠT`.
- Tổng cuối phải tự cộng: `ĐẠT + KHÔNG ĐẠT + KHÔNG KIỂM ĐƯỢC + THÔNG TIN = số hạng mục`. Lệch = báo lỗi đếm.

---

## KẾT THÚC PROMPT
