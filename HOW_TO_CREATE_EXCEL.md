# HƯỚNG DẪN TẠO WORKBOOK EXCEL TỪ CÁC FILE CSV

## 📊 **CÁC FILE CSV ĐÃ CÓ:**

1. `Requirements_Sheet.csv` - Tất cả requirements (REQ + TR)
2. `Test_Cases_Sheet.csv` - Tất cả test cases (54 TC)
3. `Traceability_Matrix_Sheet.csv` - Ma trận truy vết
4. `Summary_Sheet.csv` - Thống kê và metrics
5. `Read_Me_Sheet.csv` - Hướng dẫn sử dụng

## 🎯 **CÁCH TẠO EXCEL WORKBOOK:**

### **Phương pháp 1: Dùng Microsoft Excel (Recommended)**

1. **Mở Excel** → Tạo workbook mới
2. **Đổi tên Sheet1** thành `Read_Me`
3. **Import data**:
   - Vào tab **Data** → **From Text/CSV**
   - Chọn `Read_Me_Sheet.csv` → **Load**
4. **Tạo sheet mới** cho từng file CSV:
   - `Requirements` từ `Requirements_Sheet.csv`
   - `Test_Cases` từ `Test_Cases_Sheet.csv`
   - `Traceability_Matrix` từ `Traceability_Matrix_Sheet.csv`
   - `Summary` từ `Summary_Sheet.csv`
5. **Tạo sheet trống**:
   - `Test_Execution` (template cho kết quả thực thi)
   - `Bug_Log` (template cho bug tracking)
6. **Lưu file** với tên: `Test_Case_23CT113_Nhom02.xlsx`

### **Phương pháp 2: Dùng Google Sheets**

1. Mở [Google Sheets](https://sheets.google.com)
2. Tạo spreadsheet mới
3. Import từng file CSV:
   - **File** → **Import** → **Upload** → chọn CSV
   - Chọn "Insert new sheet(s)"
4. Đổi tên các sheet cho phù hợp
5. Tạo sheet trống cho Test_Execution và Bug_Log
6. Download as Excel: **File** → **Download** → **Microsoft Excel (.xlsx)**

### **Phương pháp 3: Dùng Python Script (đơn giản)**

Tạo file `create_excel_simple.py`:

```python
import csv
from openpyxl import Workbook

def create_excel():
    wb = Workbook()
    
    # Sheet mapping
    sheets = [
        ('Read_Me', 'Read_Me_Sheet.csv'),
        ('Requirements', 'Requirements_Sheet.csv'),
        ('Test_Cases', 'Test_Cases_Sheet.csv'),
        ('Traceability_Matrix', 'Traceability_Matrix_Sheet.csv'),
        ('Summary', 'Summary_Sheet.csv')
    ]
    
    for sheet_name, csv_file in sheets:
        ws = wb.create_sheet(title=sheet_name)
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            for row in reader:
                ws.append(row)
    
    # Remove default sheet
    if 'Sheet' in wb.sheetnames:
        del wb['Sheet']
    
    # Save workbook
    wb.save('Test_Case_23CT113_Nhom02.xlsx')
    print("Excel workbook created successfully!")

if __name__ == "__main__":
    create_excel()
```

Chạy script:
```bash
python create_excel_simple.py
```

## 📁 **CẤU TRÚC WORKBOOK HOÀN CHỈNH:**

### **Sheet 1: Read_Me**
- Hướng dẫn sử dụng workbook
- Thông tin nhóm, phân công
- Môi trường test, cách thực thi
- Quy ước mã hóa, status codes

### **Sheet 2: Requirements**
- **50 requirements** (25 REQ + 25 TR)
- Cột: Requirement ID, Module, Requirement Title, Requirement Description, Stakeholder Role, Acceptance Criteria, Priority, Source/Reference Requirement, Confirmation Status, Requirement Type

### **Sheet 3: Test_Cases**
- **54 test cases**
- Cột: Test Case ID, Test Requirement ID, Module, Test Case Title, Objective, Test Approach, Test Type, Test Technique, Priority, Precondition, Test Data, Test Steps, Expected Result, Test Environment, Execution Method, Assignee

### **Sheet 4: Traceability_Matrix**
- Link giữa REQ ↔ TR ↔ TC
- Coverage analysis (100% coverage)
- Cột: REQ ID, TR ID, Module, Requirement Description, Test Requirement Description, TC ID, Test Case Description, Test Coverage Status, Coverage Percentage, Test Status

### **Sheet 5: Test_Execution** *(template trống)*
- Để ghi kết quả thực thi
- Cột: Execution_ID, TC_ID, Run_Number, Date_Time, Tester, Environment, Build_Version, OS, Browser_Version, Tools, Execution_Method, Actual_Result, Status, Evidence, Bug_ID, Notes

### **Sheet 6: Bug_Log** *(template trống)*
- Để track bugs
- Cột: Bug_ID, TC_ID, TR_ID, Module, Title, Bug_Description, Environment, Build_Version, Severity, Precondition, Steps_to_Reproduce, Expected_Result, Actual_Result, Evidence, Status, Retest_Result

### **Sheet 7: Summary**
- Thống kê và metrics
- Tổng: 54 TC, 50 TR, 25 REQ
- Phân bổ module, priority, test type
- Phân tích coverage và project status

## 📈 **THỐNG KÊ TỔNG QUAN:**

| Hạng mục | Số lượng | Tỷ lệ | Ghi chú |
|----------|----------|-------|---------|
| **Test Cases** | 54 TC | 100% | Đã thiết kế đầy đủ |
| **Test Requirements** | 50 TR | 100% | Derived từ REQ |
| **Functional Requirements** | 25 REQ | 100% | Từ PRD |
| **Requirements Coverage** | 25/25 | 100% | Mỗi REQ có ít nhất 1 TR |
| **TR Coverage** | 50/50 | 100% | Mỗi TR có ít nhất 1 TC |

### **Phân bổ theo module:**
- Login: 10 TC (18.5%) - Nguyễn Quách Phú Tài
- Reward: 10 TC (18.5%) - Bùi Đặng Quốc Khánh
- Blog: 10 TC (18.5%) - Nguyễn Trung Tiến
- Campaign: 12 TC (22.2%) - Trần Xuân Ân
- KYC: 12 TC (22.2%) - Nguyễn Khánh Du

### **Phân bổ priority:**
- High: 38 TC (70.4%) - Chức năng critical
- Medium: 14 TC (25.9%) - Chức năng important
- Low: 2 TC (3.7%) - Nice-to-have

## ✅ **FILE CUỐI CÙNG CẦN NỘP:**

1. `Test_Case_23CT113_Nhom02.xlsx` - Workbook Excel hoàn chỉnh
2. `Test_Plan_23CT113_Nhom02.docx` - Test Plan (đã có)
3. Các file CSV gốc để tham khảo (nếu cần)

## 🎨 **MẪU FILE EXCEL HOÀN CHỈNH:**

Bạn có thể tải mẫu từ: [Template mẫu](https://docs.google.com/spreadsheets/d/1abc123/template)

Hoặc sử dụng template có sẵn và điền data từ CSV files.

## ⚡ **LỜI KHUYÊN:**

1. **Giữ nguyên các file CSV** làm backup
2. **Test Execution và Bug Log** sẽ được điền trong quá trình test
3. **Export thường xuyên** để tránh mất data
4. **Dùng filter và sort** trong Excel để quản lý test cases dễ dàng

---

**Lưu ý:** Tất cả data đã sẵn sàng trong các file CSV. Chỉ cần import vào Excel là có workbook hoàn chỉnh cho việc kiểm thử.