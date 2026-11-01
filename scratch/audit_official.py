# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding="utf-8")
import os, re, glob, hashlib, collections, sys

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