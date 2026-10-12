# Coding Standards — Tử Tế Fund

Quy tắc ngắn cho AI agent và code review. Nguồn chi tiết: `AGENTS.md`.

## Trước khi sửa

1. Đọc mã nguồn liên quan (`src/`, `prisma/schema.prisma`, route, component). Không đoán từ docs cũ nếu khác code.
2. Đọc `GLOSSARY.md` để dùng đúng thuật ngữ domain.
3. Đọc ADR trong `docs/adr/` nếu đang chạm vùng đó.

## Quy tắc bắt buộc

- **Dependency**: Dùng `npm ci` (Node 22). Không commit `node_modules` hay `prisma/generated/`.
- **Secret**: Không commit `.env` mới. Repo private đang track `.env` — không tự ý gỡ trừ khi chủ repo yêu cầu.
- **Push author**: `phutaigameplay@gmail.com` (Nguyễn Quách Phú Tài).
- **Prisma schema**: Chỉ sửa khi task yêu cầu + có migration. Bảng tạo bằng raw SQL (`CREATE TABLE IF NOT EXISTS`) không nhét vào `schema.prisma` trừ khi được yêu cầu.
- **Scripts**: `scripts/` chỉ giữ seed / migrate / CI. Không thêm `check-*`, `dump_*`, `inspect_*`, `reset_pw`…
- **Admin only**: Thuyết trình, system toggle, settle… chỉ trong `/dashboard/admin`.
- **MongoDB**: Legacy. Feature mới dùng Postgres. Không phụ thuộc Mongo.

## Code style & design

- Test ở **seam** (public interface), không test implementation detail.
- Ưu tiên vertical slice (một test → một implementation) thay vì viết hết test trước.
- Tránh Feature Envy, Duplicated Code, Shotgun Surgery (xem skill `code-review`).
- Tên biến/function/file dùng thuật ngữ trong `GLOSSARY.md`.

## Payment & critical paths

- No-reward pledge luôn ONLINE (không hiện COD).
- Digital warehouse grant chỉ sau settle SUCCESS.
- Refund phải revoke asset.
- Tip ẩn với ready product và COD.

Khi review, ưu tiên file này + `AGENTS.md` + `GLOSSARY.md`.
