@echo off
chcp 65001 >nul
echo ========================================================
echo   KHỞI PHỤC DATABASE CHO NỀN TẢNG (LOCAL POSTGRESQL)
echo ========================================================
echo.
set PGPASSWORD=123
set PGUSER=postgres
set PGPORT=6090
set PGDATABASE=crowdfunding_local

echo Đang kiểm tra và khởi phục database: %PGDATABASE% trên port %PGPORT%...
echo (Lưu ý: Nếu bạn dùng port PostgreSQL 5432 mặc định, hãy sửa PGPORT=5432 trong file này)
echo.

psql -U %PGUSER% -p %PGPORT% -c "CREATE DATABASE %PGDATABASE%;" 2>nul
psql -U %PGUSER% -p %PGPORT% -d %PGDATABASE% -f "%~dp0seed.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   KHỞI PHỤC THÀNH CÔNG!
    echo   Tài khoản test: admin@gmail.com (Mật khẩu: 123)
    echo   Bây giờ bạn có thể chạy: npm run dev
    echo ========================================================
) else (
    echo.
    echo Có lỗi xảy ra khi chạy psql. Vui lòng đảm bảo PostgreSQL đã được cài đặt và đang chạy.
)
pause
