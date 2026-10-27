# THƯ MỤC DỰ ÁN KIỂM THỬ PHẦN MỀM

## THÔNG TIN DỰ ÁN
- **Đề tài:** Nền tảng Crowdfunding (Tử Tế Fund)
- **Lớp/Nhóm:** 23CT113_Nhom02
- **Thời gian:** 12/10/2026 - 01/11/2026
- **Trưởng nhóm:** Nguyễn Quách Phú Tài

## CẤU TRÚC THƯ MỤC

```
23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)/
│
├── Test Report_23CT113_Nhom02_TEMPLATE.docx      # Template báo cáo kiểm thử
├── 01-IC-Product-Requirements_23CT113_Nhom02.xlsx # Product Requirements
├── Test Plan_23CT113_Nhom02.docx                 # Kế hoạch kiểm thử
├── Test Case_23CT113_Nhom02_COMPLETE.xlsx        # Workbook đầy đủ test case
├── Test Case_23CT113_Nhom02.xlsx                 # File test case gốc
├── Test Case_23CT113_Nhom02_VIETNAMESE.xlsx      # File test case tiếng Việt
│
├── Word+ppt Báo Cáo/
│   ├── Báo Cáo Word_23CT113_Nhom02.docx          # Báo cáo cuối kỳ
│   └── Ppt Báo cáo Nhóm 2 - 23CT113.pptx          # Slide trình bày
│
├── TimeLine/
│   ├── TimeLine_23CT113_Nhom02.xlsx              # Timeline dự án
│   ├── Biên Bản Họp Nhóm Lần 1.docx              # Biên bản họp lần 1
│   ├── Biên Bản Họp Nhóm Lần 2.docx              # Biên bản họp lần 2
│   └── Biên Bản Họp Nhóm Lần 3.docx              # Biên bản họp lần 3
│
├── MinhChung/
│   ├── Deploy/                                   # Minh chứng môi trường Deploy
│   └── Local/                                    # Minh chứng môi trường Local
│
└── README.md                                     # File hướng dẫn này
```

## MÔ TẢ FILE QUAN TRỌNG

### 1. Test Case Workbook (`Test Case_23CT113_Nhom02_COMPLETE.xlsx`)
Workbook đầy đủ với 8 sheets:
- **Read Me:** Hướng dẫn sử dụng workbook
- **Requirements:** Danh sách requirements (25 REQ)
- **Test Cases:** 54 test cases thiết kế đầy đủ
- **Traceability Matrix:** Ma trận truy vết REQ-TR-TC
- **Summary:** Thống kê tổng quan
- **Test Execution:** Template ghi kết quả thực thi
- **Bug Log:** Template ghi bug report
- **TR List:** Danh sách Test Requirements

### 2. Test Plan (`Test Plan_23CT113_Nhom02.docx`)
Kế hoạch kiểm thử chi tiết bao gồm:
- Mục tiêu và phạm vi kiểm thử
- Phương pháp và loại kiểm thử
- Tài nguyên và môi trường
- Phân công thành viên
- Tiến độ thực hiện
- Tiêu chí bắt đầu/hoàn thành
- Rủi ro và biện pháp giảm thiểu

### 3. Product Requirements (`01-IC-Product-Requirements_23CT113_Nhom02.xlsx`)
Tài liệu yêu cầu sản phẩm với:
- Project Overview
- Functional Requirements (25 REQ)
- Non-Functional Requirements
- Glossary

### 4. Test Report Template (`Test Report_23CT113_Nhom02_TEMPLATE.docx`)
Template báo cáo kiểm thử sau khi thực thi, cần điền:
- Kết quả thực tế từ Excel
- Phân tích lỗi phát hiện
- Đánh giá và khuyến nghị

## HƯỚNG DẪN SỬ DỤNG

### 1. Trước khi thực thi kiểm thử:
1. Review Test Plan để hiểu phạm vi và phương pháp
2. Xem Requirements sheet trong workbook để hiểu yêu cầu
3. Kiểm tra Test Cases đã được thiết kế
4. Chuẩn bị test data theo Precondition và Test Data

### 2. Trong quá trình thực thi:
1. Mở sheet **Test Execution** trong workbook
2. Ghi kết quả thực thi cho từng test case
3. Chụp ảnh minh chứng và lưu vào thư mục `MinhChung/`
4. Nếu phát hiện lỗi, ghi vào sheet **Bug Log**

### 3. Sau khi thực thi:
1. Tổng hợp kết quả vào sheet **Summary**
2. Điền kết quả vào **Test Report** template
3. Hoàn thiện **Báo Cáo Word** và **PowerPoint**
4. Đối chiếu số liệu giữa các file cho nhất quán

## QUY ƯỚC ĐẶT TÊN

### Mã định danh:
- **REQ-{MODULE}-{001}:** Functional Requirement
- **TR-{MODULE}-{001}:** Test Requirement  
- **TC-{MODULE}-{001}:** Test Case
- **BUG-{MODULE}-{001}:** Bug Report

### Module codes:
- **LOGIN:** Đăng nhập
- **REWARD:** Quản lý Reward
- **BLOG:** Blog
- **CAMP:** Campaign
- **KYC:** KYC thủ công

## PHÂN CÔNG THÀNH VIÊN

| Thành viên | Module | Số Test Cases |
|------------|---------|---------------|
| Nguyễn Quách Phú Tài | Login | 10 |
| Bùi Đặng Quốc Khánh | Reward | 10 |
| Nguyễn Trung Tiến | Blog | 10 |
| Trần Xuân Ân | Campaign | 12 |
| Nguyễn Khánh Du | KYC | 12 |

## LIÊN HỆ
- **Trưởng nhóm:** Nguyễn Quách Phú Tài
- **Email nhóm:** [Group email]
- **GitHub:** [Repository link]

## LƯU Ý
1. Tất cả nội dung test case đã được chuyển sang tiếng Việt
2. Cột tiêu đề (header) giữ nguyên tiếng Anh theo chuẩn học thuật
3. Cần đảm bảo tính nhất quán giữa các file documentation
4. Minh chứng cần được lưu đầy đủ trong thư mục `MinhChung/`