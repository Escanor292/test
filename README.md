# HƯỚNG DẪN CÀI ĐẶT VÀ TEST NỀN TẢNG (TỬ TẾ FUND)

Chào mừng bạn đến với môi trường kiểm thử nền tảng gây quỹ cộng đồng **Tử Tế Fund**. Tài liệu này hướng dẫn bạn thiết lập nhanh và bắt đầu kiểm thử hệ thống.

---

## 1. Yêu cầu hệ thống

- **Node.js**: Phiên bản 18, 20 hoặc 22 (khuyến nghị Node 22).
- **PostgreSQL**: Đã cài đặt và đang chạy dịch vụ (Service) trên máy tính.

---

## 2. Các bước cài đặt nhanh (Quick Start)

### Bước 1: Khôi phục Cơ sở dữ liệu (Database)
Hệ thống đã chuẩn bị sẵn file dữ liệu mẫu (`seed.sql`) chứa đầy đủ các bảng, tài khoản, chiến dịch và giao dịch mẫu.

- **Trên Windows**: 
  - Nhấp đúp (hoặc chạy trong terminal) file:
    ```cmd
    database\restore.bat
    ```
  - *Lưu ý*: Script mặc định kết nối PostgreSQL qua cổng `6090` với mật khẩu `123`. Nếu bạn dùng cổng `5432` mặc định hoặc mật khẩu khác, hãy mở file `database\restore.bat` để chỉnh lại `PGPORT` và `PGPASSWORD`.

- **Trên macOS / Linux**:
  ```bash
  chmod +x database/restore.sh
  ./database/restore.sh
  ```

- **Hoặc khôi phục thủ công bằng công cụ (pgAdmin / DBeaver / psql)**:
  1. Tạo database tên: `crowdfunding_local`
  2. Thực thi toàn bộ lệnh SQL trong file: `database/seed.sql`

---

### Bước 2: Cài đặt thư viện & sinh Prisma Client

Mở terminal tại thư mục gốc của dự án và chạy:

```bash
npm install
npx prisma generate
```

---

### Bước 3: Khởi động máy chủ phát triển (Dev Server)

```bash
npm run dev
```

Sau khi terminal hiển thị sẵn sàng, truy cập vào trình duyệt:
👉 **http://localhost:3000**

---

## 3. Cấu hình Môi trường (`.env`)

File cấu hình `.env` đã được chuẩn bị sẵn trong mã nguồn với cấu hình kết nối local:

```env
DATABASE_URL="postgresql://postgres:123@localhost:6090/crowdfunding_local"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="7e476405-95cf-4a3f-a901-3f6f6700db49-reconstructed"
```

> 💡 **Mẹo**: Nếu cổng PostgreSQL trên máy của bạn là `5432`, chỉ cần sửa số `6090` trong file `.env` thành `5432`.

---

## 4. Danh sách Tài khoản Kiểm thử (Test Accounts)

Tất cả các tài khoản dưới đây đều dùng chung mật khẩu: **`123`**

| Vai trò (Role) | Email đăng nhập | Mật khẩu | Quyền hạn & Chức năng kiểm thử |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin@gmail.com` | `123` | Truy cập trang Admin (`/dashboard/admin`), duyệt chiến dịch, duyệt KYC, quản lý người dùng, thống kê |
| **Chủ dự án (Creator)** | `test1@gmail.com` | `123` | Tạo chiến dịch mới, quản lý dự án đã tạo, cập nhật tin tức tiến độ |
| **Người ủng hộ (Backer)** | `test2@gmail.com` | `123` | Đóng góp ủng hộ (pledge), chọn phần thưởng (rewards), theo dõi kho quà số |
| **Người dùng chung** | `test3@gmail.com` | `123` | Tương tác, bình luận, cập nhật hồ sơ cá nhân |

---

## 5. Các kịch bản kiểm thử gợi ý (Test Scenarios)

1. **Đăng nhập & Xác thực**:
   - Truy cập `/login`, thử đăng nhập với các tài khoản trên.
   - Kiểm tra menu người dùng hiển thị đúng thông tin và vai trò.
2. **Khám phá & Chi tiết chiến dịch**:
   - Truy cập `/campaigns` để duyệt danh sách các chiến dịch đã được seed sẵn.
   - Thử tìm kiếm theo từ khóa, lọc theo danh mục hoặc trạng thái.
   - Nhấp vào một chiến dịch để xem chi tiết, nội dung, mục tiêu và mốc thời gian.
3. **Ủng hộ chiến dịch (Pledge flow)**:
   - Tại trang chi tiết chiến dịch, chọn gói ủng hộ / phần quà và tiến hành ủng hộ.
4. **Tạo chiến dịch mới**:
   - Đăng nhập tài khoản `test1@gmail.com` hoặc `admin@gmail.com`, vào mục **Tạo chiến dịch** (`/campaigns/create`).
   - Điền thông tin tiêu đề, mục tiêu gây quỹ, thời hạn, danh mục và lưu lại.
5. **Khu vực Quản trị (Admin Dashboard)**:
   - Đăng nhập với tài khoản `admin@gmail.com` và truy cập `/dashboard/admin`.
   - Kiểm tra các tab quản lý chiến dịch, người dùng, báo cáo tài chính và phê duyệt.
