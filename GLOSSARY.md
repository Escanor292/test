# GLOSSARY — Tử Tế Fund / CrowdFund VN

Thuật ngữ domain dùng thống nhất trong code, docs và khi làm việc với AI agent.
Cập nhật khi có khái niệm mới hoặc thay đổi ý nghĩa.

## Actors

- **Guest / Visitor**: Người dùng chưa đăng nhập, chỉ xem public.
- **Backer**: Người ủng hộ / mua sản phẩm.
- **Creator**: Nhà sáng tạo, quản lý campaign, reward, project, blog.
- **Admin**: Quản trị, review, settle, moderation.

## Core entities

- **Campaign**: Chiến dịch gây quỹ. Có goal, current amount, status, category, tags, type (REWARD/DONATION/…).
- **Pledge**: Lềnh ủng hộ / cam kết thanh toán của Backer cho một Campaign (có thể kèm Reward).
- **Reward**: Phần quà / sản phẩm gắn với campaign hoặc độc lập. Có availability (AVAILABLE / DEVELOPMENT), stock, giá.
- **Project**: Hub của Creator, liên kết campaign, blog, reward.
- **Digital Warehouse / Kho đồ số**: Nơi Backer nhận digital asset sau khi pledge SUCCESS (route `/purchases`).
- **Membership / Hội viên**: Support tier định kỳ, settle bởi admin, không cộng vào campaign goal.

## Payment & settlement

- **ONLINE**: Thanh toán trực tuyến (PayOS/VietQR, MoMo…). Mặc định khi không có reward hoặc !allowsCod.
- **COD**: Cash on delivery — chỉ khi reward cho phép.
- **Settle / Settlement**: Admin xác nhận SUCCESS (thường BANK_ESCROW). Chỉ sau settle mới grant digital asset / certificate / kích hoạt membership.
- **BANK_ESCROW**: Trạng thái chờ settle.
- **Tip**: Phần trăm tip tùy chọn (0–1000%), ẩn với ready product và COD.

## KYC & trust

- **KYC**: Xác minh danh tính (CCCD, selfie, eKYC). Status: PENDING / VERIFIED / …
- **eKYC**: Bật/tắt bởi admin (`platform_settings.ekyc_enabled`). Tắt → form manual.
- **Credential**: Bằng cấp / chứng chỉ public sau khi admin VERIFIED.

## Other

- **Certificate (TT-UH)**: Chứng chỉ sau no-reward pledge, chỉ issue sau settle SUCCESS.
- **Góp ý**: Feedback (BUG/IDEA/OTHER) tại `/gop-y`, không phải báo cáo vi phạm.
- **Taxonomy**: Category (VI label) + tags (ids) trên campaign.

Khi agent đặt tên biến, file, test, hoặc viết spec: ưu tiên dùng thuật ngữ trong file này.
