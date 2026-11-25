# Epic 07 — Thanh toán giả lập và xác nhận vé

Cập nhật ngày 22/11/2026

[Danh sách epic](epics.md) · Phụ thuộc Epic 06.

## Phạm vi

- Chỉ mô phỏng kết quả thành công/thất bại trong môi trường học; UI ghi rõ thanh toán giả lập, không xử lý tiền thật.
- Bản cơ bản ghi kết quả trực tiếp trên bookings và booking_seats; chưa cần bảng payments, callback, webhook hoặc cổng thanh toán.
- Dùng booking_code làm mã tra cứu vé. Không tạo thêm bảng tickets khi schema hiện tại chưa cần.
- Sau này tách lịch sử giao dịch/thử thanh toán riêng mà vẫn giữ ID đơn và hợp đồng xem vé; xem Epic 10.

## Task theo thứ tự

- [ ] **T7.1 — Đọc đơn chờ thanh toán**
  - API cần đăng nhập trả thông tin đơn, phim/rạp/phòng/suất, ghế, tổng tiền, hạn giữ và trạng thái.
  - Chỉ chủ đơn được xem; giá lấy từ DB, không nhận giá do frontend gửi lại.
  - [ ] Trang thanh toán giả lập hiển thị đúng đơn của người gọi; đổi mã sang đơn người khác không đọc được dữ liệu.

- [ ] **T7.2 — Giả lập thanh toán thành công**
  - Viết một thao tác Service xác nhận đơn; Controller chỉ nhận yêu cầu mô phỏng, không tự cập nhật ghế.
  - Trong transaction theo thứ tự khóa Epic 06: kiểm tra chủ đơn, trạng thái pending, còn hạn và còn giữ đủ ghế; đổi đơn paid, ghi paid_at và ghế sold cùng lúc.
  - Trả lại kết quả đã có nếu cùng đơn paid được xác nhận lặp; không tạo đơn/vé hoặc cộng tiền thêm lần nữa.
  - [ ] Xác nhận thành công hiện mã đặt vé, không có trạng thái đơn paid nhưng ghế vẫn held.

- [ ] **T7.3 — Giả lập thất bại và hết hạn**
  - Thất bại ở bản cơ bản kết thúc đơn thành cancelled và giải phóng ghế held trong cùng transaction; không cho thử lại chính đơn đã kết thúc.
  - Đơn hết hạn xử lý theo Epic 06; tuyệt đối không đổi paid ngược lại vì một request thất bại đến sau.
  - [ ] Thất bại/hết hạn có thông báo đúng, ghế đặt lại được; khách muốn thử lại chọn ghế và tạo đơn mới.

- [ ] **T7.4 — Nối UI và kiểm tra kết quả lặp**
  - Nút mô phỏng thành công/thất bại gọi API, khóa nút khi đang gửi và hiển thị kết quả từ backend.
  - [ ] Viết test xác nhận cùng đơn hai lần hoặc đồng thời chỉ chốt một lần; request thành công/thất bại đồng thời không làm sai đơn/ghế.
  - [ ] Viết test hết hạn, sai chủ đơn và rollback khi cập nhật ghế lỗi.
  - [ ] Tải lại trang kết quả vẫn đọc được vé đã xác nhận từ DB.

## Để nâng cấp sau

- Lịch sử giao dịch và quy trình thanh toán mở rộng thuộc [Epic 10](epic-10-upgrade-tasks.md). Các API giả lập không được đưa nguyên trạng vào một hệ thống thanh toán thật.
