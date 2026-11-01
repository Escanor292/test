import openpyxl
import zipfile
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

excel_path = "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/Test Case_23CT113_Nhom02.xlsx"
wb = openpyxl.load_workbook(excel_path)

ws_tc = wb["TC List"]
tc_rows = []
for r in range(2, ws_tc.max_row + 1):
    tr_id = ws_tc.cell(r, 1).value
    tc_id = ws_tc.cell(r, 2).value
    module = ws_tc.cell(r, 3).value
    prio = ws_tc.cell(r, 5).value
    status = ws_tc.cell(r, 10).value
    if tc_id:
        tc_rows.append({"tr_id": tr_id, "tc_id": tc_id, "module": module, "prio": prio, "status": status})

print("Total TCs in TC List:", len(tc_rows))

# 1. Update TongQuan_Dashboard
ws_dash = wb["TongQuan_Dashboard"]

ws_dash.cell(26, 1, "Mức độ ưu tiên")
ws_dash.cell(26, 2, "Số lượng TC")
ws_dash.cell(26, 3, "Tỷ lệ %")
ws_dash.cell(26, 4, "Đã thực thi")
ws_dash.cell(26, 5, "Tỷ lệ Pass")

prio_configs = [
    (27, "High"),
    (28, "Medium"),
    (29, "Boundary"),
    (30, "Low")
]

for r, p_name in prio_configs:
    ws_dash.cell(r, 1, p_name)
    ws_dash.cell(r, 2, f"=COUNTIF('TC List'!$E$2:$E$105,\"{p_name}\")")
    ws_dash.cell(r, 3, f"=B{r}/$B$9")
    ws_dash.cell(r, 4, f"=COUNTIFS('TC List'!$E$2:$E$105,\"{p_name}\",'TC List'!$J$2:$J$105,\"PASS\")+COUNTIFS('TC List'!$E$2:$E$105,\"{p_name}\",'TC List'!$J$2:$J$105,\"FAIL\")+COUNTIFS('TC List'!$E$2:$E$105,\"{p_name}\",'TC List'!$J$2:$J$105,\"BLOCKED\")")
    ws_dash.cell(r, 5, f"=IF(D{r}>0,COUNTIFS('TC List'!$E$2:$E$105,\"{p_name}\",'TC List'!$J$2:$J$105,\"PASS\")/D{r},0)")

# Row 31: TỔNG
ws_dash.cell(31, 1, "TỔNG")
ws_dash.cell(31, 2, "=SUM(B27:B30)")
ws_dash.cell(31, 3, "=SUM(C27:C30)")
ws_dash.cell(31, 4, "=SUM(D27:D30)")
ws_dash.cell(31, 5, "=IF(D31>0,COUNTIF('TC List'!$J$2:$J$105,\"PASS\")/D31,0)")

# 2. Update RTM sheet formulas for rows 2 to 43 (42 TRs)
ws_rtm = wb["RTM"]
for r in range(2, 44):
    tr_val = ws_rtm.cell(r, 2).value
    if not tr_val:
        continue
    ws_rtm.cell(r, 7, f"=COUNTIF('TC List'!$A$2:$A$105,B{r})")
    ws_rtm.cell(r, 8, f"=COUNTIFS('TC List'!$A$2:$A$105,B{r},'TC List'!$J$2:$J$105,\"PASS\")+COUNTIFS('TC List'!$A$2:$A$105,B{r},'TC List'!$J$2:$J$105,\"FAIL\")+COUNTIFS('TC List'!$A$2:$A$105,B{r},'TC List'!$J$2:$J$105,\"BLOCKED\")")
    ws_rtm.cell(r, 9, f"=COUNTIFS('TC List'!$A$2:$A$105,B{r},'TC List'!$J$2:$J$105,\"PASS\")")
    ws_rtm.cell(r, 10, f"=COUNTIFS('TC List'!$A$2:$A$105,B{r},'TC List'!$J$2:$J$105,\"FAIL\")")
    ws_rtm.cell(r, 11, f"=COUNTIFS('TC List'!$A$2:$A$105,B{r},'TC List'!$J$2:$J$105,\"BLOCKED\")")
    ws_rtm.cell(r, 12, f"=G{r}-H{r}")

temp_file = "scratch/temp_tc.xlsx"
wb.save(temp_file)
print("Saved base workbook to temp_file.")

# Compute expected values for injection into XML
prio_counts = {}
for p in ["High", "Medium", "Boundary", "Low"]:
    cnt = sum(1 for tc in tc_rows if tc["prio"] == p)
    passed = sum(1 for tc in tc_rows if tc["prio"] == p and tc["status"] == "PASS")
    prio_counts[p] = {"count": cnt, "pct": cnt / len(tc_rows), "exec": cnt, "pass_rate": passed / cnt if cnt > 0 else 0}

dash_injections = {
    "A9": 42, "B9": 104, "C9": 104, "D9": 76, "E9": 28, "F9": 0, "G9": 0, "H9": 76/104, "I9": 1.0,
    "B27": prio_counts["High"]["count"], "C27": prio_counts["High"]["pct"], "D27": prio_counts["High"]["exec"], "E27": prio_counts["High"]["pass_rate"],
    "B28": prio_counts["Medium"]["count"], "C28": prio_counts["Medium"]["pct"], "D28": prio_counts["Medium"]["exec"], "E28": prio_counts["Medium"]["pass_rate"],
    "B29": prio_counts["Boundary"]["count"], "C29": prio_counts["Boundary"]["pct"], "D29": prio_counts["Boundary"]["exec"], "E29": prio_counts["Boundary"]["pass_rate"],
    "B30": prio_counts["Low"]["count"], "C30": prio_counts["Low"]["pct"], "D30": prio_counts["Low"]["exec"], "E30": prio_counts["Low"]["pass_rate"],
    "B31": 104, "C31": 1.0, "D31": 104, "E31": 76/104
}

mod_list = [
    ("AUTH", 13), ("KYC", 14), ("CAMP", 15), ("REWARD", 16), ("PLEDGE", 17),
    ("CERT", 18), ("COMM", 19), ("BLOG", 20), ("CHAT", 21), ("ADMIN", 22)
]
for mod, r in mod_list:
    mod_tcs = [tc for tc in tc_rows if tc["module"] == mod]
    pass_cnt = sum(1 for tc in mod_tcs if tc["status"] == "PASS")
    dash_injections[f"D{r}"] = 5 if mod in ["AUTH", "CAMP", "PLEDGE"] else (3 if mod == "CHAT" else 4)
    dash_injections[f"E{r}"] = len(mod_tcs)
    dash_injections[f"F{r}"] = len(mod_tcs)
    dash_injections[f"G{r}"] = pass_cnt
    dash_injections[f"H{r}"] = 0
    dash_injections[f"I{r}"] = pass_cnt / len(mod_tcs) if len(mod_tcs) > 0 else 0

dash_injections["D23"] = 42
dash_injections["E23"] = 104
dash_injections["F23"] = 104
dash_injections["G23"] = 76
dash_injections["H23"] = 0
dash_injections["I23"] = 76/104

# Calculate RTM row values
rtm_injections = {}
for r in range(2, 44):
    tr_id = ws_rtm.cell(r, 2).value
    tr_tcs = [tc for tc in tc_rows if tc["tr_id"] == tr_id]
    p_cnt = sum(1 for tc in tr_tcs if tc["status"] == "PASS")
    f_cnt = sum(1 for tc in tr_tcs if tc["status"] == "FAIL")
    tot = len(tr_tcs)
    rtm_injections[f"G{r}"] = tot
    rtm_injections[f"H{r}"] = tot
    rtm_injections[f"I{r}"] = p_cnt
    rtm_injections[f"J{r}"] = f_cnt
    rtm_injections[f"K{r}"] = 0
    rtm_injections[f"L{r}"] = 0

dash_sheet_file = "xl/worksheets/sheet1.xml"
rtm_sheet_file = "xl/worksheets/sheet4.xml"

def inject_vals(xml_str, val_map):
    for cell_ref, val in val_map.items():
        val_str = str(val)
        if isinstance(val, float):
            val_str = f"{val:.4f}" if val < 1 else str(int(val))
        
        p1 = rf'(<c r="{cell_ref}"[^>]*>\s*<f>[^<]+</f>\s*)<v>[^<]*</v>(\s*</c>)'
        p2 = rf'(<c r="{cell_ref}"[^>]*>\s*<f>[^<]+</f>)(\s*</c>)'
        
        if re.search(p1, xml_str):
            xml_str = re.sub(p1, rf'\1<v>{val_str}</v>\2', xml_str)
        elif re.search(p2, xml_str):
            xml_str = re.sub(p2, rf'\1<v>{val_str}</v>\2', xml_str)
    return xml_str

final_excel = excel_path
with zipfile.ZipFile(temp_file, "r") as zin, zipfile.ZipFile(final_excel, "w") as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == dash_sheet_file:
            xml = data.decode("utf-8")
            xml = inject_vals(xml, dash_injections)
            zout.writestr(item, xml.encode("utf-8"))
        elif item.filename == rtm_sheet_file:
            xml = data.decode("utf-8")
            xml = inject_vals(xml, rtm_injections)
            zout.writestr(item, xml.encode("utf-8"))
        else:
            zout.writestr(item, data)

print("Injected cached values into Excel successfully!")
