/**
 * Comprehensive Testing Suite Generator for TuTeFund
 * Group: 23CT113 - Nhóm 02
 * Based strictly on teacher guidelines from https://github.com/NguyenMinhPhuc/SoftwareTesting
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const TARGET_DIR = path.resolve('23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)');

// 1. MODULES DEFINITION (Each member has exactly 36 TCs across modules)
const MODULES = [
  { id: 'AUTH', name: 'Login / Auth & Hồ sơ', assignee: 'Nguyễn Quách Phú Tài', desc: 'Đăng ký, xác thực email, đăng nhập mật khẩu/Google OAuth, quên/đặt lại mật khẩu, phân quyền RBAC, hồ sơ người dùng' },
  { id: 'CAMP', name: 'Quản lý Chiến dịch gây quỹ', assignee: 'Trần Xuân Ân', desc: 'Khởi tạo chiến dịch (DRAFT), soạn nội dung câu chuyện, gửi duyệt (PENDING_REVIEW), Admin duyệt/từ chối, Project Hub' },
  { id: 'REWARD', name: 'Gói Phần thưởng & Tồn kho', assignee: 'Trần Xuân Ân', desc: 'Thiết lập gói phần thưởng vật lý/số, ràng buộc giá trị tối thiểu, quản lý tồn kho (stock), trừ tồn kho khi cam kết' },
  { id: 'PAY', name: 'Checkout & Thanh toán VietQR', assignee: 'Nguyễn Quách Phú Tài', desc: 'Luồng thanh toán chuyển khoản ngân hàng trung gian VietQR Escrow (BANK_ESCROW), cổng trực tuyến trả 410, đối soát admin, kho đồ purchases' },
  { id: 'SIM', name: 'Giả lập Thanh toán & Vận chuyển', assignee: 'Bùi Đặng Quốc Khánh', desc: 'Bật/tắt simulation_mode trong quản trị, ghi nhận thanh toán giả lập mã SIM-, endpoint dọn dữ liệu DELETE /api/admin/simulation' },
  { id: 'SHIP', name: 'Quản lý Vận chuyển & Giao nhận', assignee: 'Bùi Đặng Quốc Khánh', desc: 'Thu thập địa chỉ giao hàng, liên kết mã vận đơn theo nhà vận chuyển (GHTK/GHN/VTP/SPX), cập nhật chu kỳ trạng thái giao nhận' },
  { id: 'REFUND', name: 'Khiếu nại & Hoàn tiền Ký quỹ', assignee: 'Nguyễn Trung Tiến', desc: 'Hoàn tiền chiến dịch All-or-Nothing thất bại, hoàn tiền chiến dịch bị hủy vi phạm, hủy pledge tự nguyện hợp lệ, kiểm soát số dư ký quỹ' },
  { id: 'CHAT', name: 'Chat & Gọi · Hội thoại Trực tiếp', assignee: 'Nguyễn Trung Tiến', desc: 'Khởi tạo hội thoại 1-1 giữa Backer và Creator, gửi/nhận tin nhắn văn bản tức thời, lưu trữ lịch sử tin nhắn PostgreSQL/Prisma' },
  { id: 'BLOG', name: 'Tin tức Blog & Cộng đồng', assignee: 'Nguyễn Khánh Du', desc: 'Soạn thảo bài viết Rich Text/Markdown, đính kèm ảnh tải lên, lưu nháp (DRAFT), gửi duyệt và xuất bản (PUBLISHED), phân loại danh mục' },
  { id: 'KYC', name: 'Định danh KYC & Profile Studio', assignee: 'Nguyễn Khánh Du', desc: 'Nộp hồ sơ KYC gồm ảnh CCCD 2 mặt và video chân dung, kiểm tra định dạng và dung lượng, thẩm định bằng cấp & chứng từ pháp lý' },
  { id: 'ADMIN', name: 'Quản trị Hệ thống & Báo cáo', assignee: 'Bùi Đặng Quốc Khánh', desc: 'Quản trị người dùng, khoá tài khoản, gắn huy hiệu danh hiệu (Badges), tiếp nhận và xử lý báo cáo vi phạm cộng đồng (Reports)' },
  { id: 'NFR', name: 'Kiểm thử Phi chức năng & Bảo mật', assignee: 'Nguyễn Khánh Du', desc: 'Kiểm soát truy cập RBAC, chống SQL Injection/XSS, hiệu năng thời gian phản hồi API < 2s, tương thích Responsive Desktop/Mobile' }
];

module.exports = { MODULES, TARGET_DIR };
