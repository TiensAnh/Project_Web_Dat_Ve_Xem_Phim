# Epic 08 — Lịch sử vé và tra cứu đơn cơ bản

Cập nhật ngày 22/11/2026

[Danh sách epic](epics.md) · Phụ thuộc Epic 02 và 07.

## Phạm vi

- Khách xem đơn/vé của mình; super_admin tra cứu đơn theo mã.
- Hiển thị vé từ booking paid và các ghế sold; kết quả thanh toán cơ bản đọc từ trạng thái đơn của Epic 07.
- Chưa có QR check-in, hoàn tiền, gửi email hoặc dashboard doanh thu.

## Task theo thứ tự

- [ ] **T8.1 — API danh sách đơn của tôi**
  - User ID lấy từ Authentication, truy vấn chỉ đơn thuộc người đó, sắp xếp mới nhất trước.
  - Trả mã đơn, thông tin phim/suất, tổng tiền và trạng thái; không nhận user ID tùy ý từ frontend.
  - [ ] Hai tài khoản thấy hai danh sách độc lập; chưa có đơn trả danh sách rỗng.

- [ ] **T8.2 — Chi tiết vé và kiểm tra chủ đơn**
  - Dùng lại logic chi tiết đơn ở Epic 07, bổ sung dữ liệu hiển thị vé đã paid và danh sách ghế.
  - Chủ đơn được xem; người khác không được đọc dù biết ID/mã. Dùng nhất quán `403` hoặc `404` theo quy ước API đã chọn, không trả dữ liệu đơn trong lỗi.
  - [ ] Sửa ID/mã trên URL không xem được đơn người khác; token thiếu/hết hạn nhận `401`.

- [ ] **T8.3 — Nối trang lịch sử và vé của khách**
  - Thay mock bằng API, chọn một đơn mở chi tiết; phân biệt pending, paid, cancelled và expired.
  - [ ] Hiện đúng phim, rạp, phòng, suất, ghế, mã và số tiền; loading/rỗng/lỗi hoạt động đúng.

- [ ] **T8.4 — Admin tra cứu mã đặt vé**
  - API dưới `/api/admin/**`, chỉ super_admin; nối màn tra cứu đơn tối thiểu với ô nhập mã.
  - [ ] Tìm được đơn bất kỳ của hệ thống khi đủ quyền; mã sai báo không tìm thấy; customer gọi thẳng API bị `403`.

- [ ] **T8.5 — Kiểm tra quyền và dữ liệu vé**
  - [ ] Kiểm tra với hai customer và một super_admin; nên có test tự động cho quyền sở hữu đơn và quyền tra cứu admin.
  - [ ] Kết quả vé khớp trạng thái đơn/ghế trong DB sau thành công, thất bại và hết hạn.

## Để nâng cấp sau

- Phân trang, tìm kiếm nhiều tiêu chí và chức năng vận hành thêm nằm ở [Epic 10](epic-10-upgrade-tasks.md).
