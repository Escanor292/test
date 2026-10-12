# Database local - crowdfunding-vn

Thư mục này chứa dữ liệu test để chạy nền tảng offline (không cần Internet).

## Nội dung

| File | Mô tả |
|:---|:---|
| `seed.sql` | Dump đầy đủ schema + dữ liệu test từ PostgreSQL |
| `restore.bat` | Script tự động restore cho Windows |

## Cách restore (Windows)

### Cách 1 - Tự động (khuyên dùng)
1. Cài PostgreSQL (bất kỳ phiên bản nào)
2. Mở `restore.bat` → nó sẽ tự tạo DB và import data
3. Cập nhật `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:123@localhost:5432/crowdfunding_local"
   ```

### Cách 2 - Thủ công
```bash
# Tạo database
psql -U postgres -c "CREATE DATABASE crowdfunding_local;"

# Restore data
psql -U postgres -d crowdfunding_local -f database/seed.sql
```

## Tài khoản test

| Email | Password | Vai trò |
|:---|:---|:---|
| `admin@gmail.com` | `123` | Admin |
| `test1@gmail.com` | `123` | Backer |
| `test2@gmail.com` | `123` | Creator |
| `test3@gmail.com` | `123` | Creator |

> **Lưu ý:** File `seed.sql` dùng password PostgreSQL là `123`.  
> Nếu PostgreSQL của bạn dùng password khác, hãy cập nhật `DATABASE_URL` trong `.env`.
