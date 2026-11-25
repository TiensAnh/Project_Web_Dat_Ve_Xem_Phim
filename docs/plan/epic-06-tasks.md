# Epic 06 — Chọn ghế và giữ chỗ cơ bản

Cập nhật ngày 22/11/2026

[Danh sách epic](epics.md) · Phụ thuộc Epic 02 và 05.

## Phạm vi

- Một đơn gồm các ghế của một suất, thời hạn giữ chỗ cố định cấu hình ở backend.
- Backend tính giá theo base_price, không nhận tổng tiền/quyền sở hữu từ frontend.
- Chưa cần scheduler, Redis hoặc WebSocket. Kiểm tra hết hạn khi có thao tác liên quan; tự động dọn nền để ở Epic 10.
- Phần transaction/khóa học ngay trước task cần dùng, bằng ví dụ hai người cùng chọn một ghế.

## Task theo thứ tự

- [ ] **T6.1 — Dữ liệu đơn và ghế đã đặt**
  - Tạo bookings và booking_seats bằng migration theo schema. Dùng booking_code, expires_at và các trạng thái đã quy định.
  - Giữ khóa ngoại để đơn, suất, phòng và ghế khớp nhau; unique một ghế/suất khi trạng thái held hoặc sold.
  - [ ] DB từ chối ghế không thuộc phòng của suất và hai bản ghi đang giữ/bán cùng ghế trong một suất.

- [ ] **T6.2 — Đọc sơ đồ và chọn ghế trên UI**
  - API trả ghế trống, đang giữ, đã bán của một suất; ghế hết hạn giữ được hiển thị có thể chọn lại.
  - Nối UI chọn/bỏ chọn ghế và tính tạm tổng tiền để hiển thị; đây chưa phải xác nhận giữ chỗ.
  - [ ] Chọn đúng suất thấy đúng sơ đồ, ghế đã bán không chọn được, không có dữ liệu mẫu chen vào trạng thái DB.

- [ ] **T6.3 — Học transaction và thống nhất thứ tự khóa**
  - Đọc ví dụ BEGIN/COMMIT/ROLLBACK, sau đó áp dụng transaction của Spring cho Service hiện có, không tự quản lý kết nối rời rạc.
  - Bản đầu dùng khóa hàng screenings của suất tương ứng để tuần tự hóa thao tác giữ/nhả/xác nhận ghế trong cùng suất; dùng cùng thứ tự khóa ở các bước sau.
  - [ ] Giải thích được vì sao kiểm tra ghế trống rồi INSERT ở hai transaction không có bảo vệ vẫn có thể tranh chấp; DB unique là lớp bảo vệ cuối.

- [ ] **T6.4 — Tạo đơn chờ thanh toán**
  - API cần đăng nhập, lấy user ID từ Authentication; kiểm tra suất open, chưa qua giờ đặt, ghế đang hoạt động và thuộc đúng phòng.
  - Trong một transaction theo T6.3: giải phóng đơn pending đã hết hạn của suất, kiểm tra các ghế, tạo booking pending và các ghế held.
  - Tính giá và thời hạn bằng backend; nếu một ghế đã bị giữ/bán thì từ chối cả yêu cầu, không tạo đơn một phần.
  - [ ] Chọn ghế → giữ thành công → nhận booking_code, hạn giữ và giá do backend trả; customer khác không dùng được đơn này.

- [ ] **T6.5 — Hết hạn và trả ghế**
  - Tách thao tác kiểm tra/giải phóng đơn hết hạn thành hàm Service dùng lại trong giữ ghế và xác nhận thanh toán.
  - Đơn hết hạn đổi thành expired, ghế held đổi thành released trong cùng transaction; đơn paid không bị giải phóng.
  - UI hiển thị thời gian còn lại; backend luôn kiểm tra lại dù frontend chưa hết bộ đếm.
  - [ ] Hết hạn không cần scheduler vẫn đặt lại ghế được khi có yêu cầu giữ mới; không thể thanh toán đơn hết hạn.

- [ ] **T6.6 — Kiểm tra tranh chấp và rollback**
  - [ ] Viết test hai transaction đồng thời giữ cùng ghế: chỉ một thành công.
  - [ ] Viết test đơn hết hạn nhường lại ghế, ghế sold không bị nhả, yêu cầu nhiều ghế lỗi thì không giữ dở một phần.
  - [ ] Kiểm tra UI thông báo ghế vừa bị giữ và tải lại sơ đồ thay vì báo thành công sai.

## Để nâng cấp sau

- Dọn hết hạn bằng scheduler, cập nhật ghế realtime và tối ưu khóa nằm ở [Epic 10](epic-10-upgrade-tasks.md). Không hoãn ràng buộc chống trùng ghế sang nâng cấp.
