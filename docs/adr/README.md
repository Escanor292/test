# Architecture Decision Records (ADR)

Lưu các quyết định kiến trúc khó đảo ngược.

## Quy ước

- File: `docs/adr/NNNN-ten-ngan.md`
- Nội dung: Context → Decision → Consequences
- Agent (grill-with-docs, domain-modeling) có thể tạo ADR mới khi có quyết định quan trọng.

## ADR hiện có

(Chưa có. Thêm khi cần.)

Ví dụ có thể viết sau:

- 0001: No-reward pledge luôn ONLINE
- 0002: Digital warehouse grant chỉ sau settle SUCCESS, không tạo bảng Prisma mới
- 0003: Redis chỉ dùng làm read-through cache (fail-open)
