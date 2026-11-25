# Epic 09 — Hoàn thành và nghiệm thu web cơ bản

Cập nhật ngày 22/11/2026

[Danh sách epic](epics.md) · Phụ thuộc Epic 01–08.

## Task theo thứ tự

- [ ] **T9.1 — Chuẩn bị dữ liệu demo**
  - Dùng migration seed phù hợp và tài khoản local: một super_admin, hai customer, phim, thể loại, một brand/rạp, phòng/ghế và suất mở bán còn trong tương lai.
  - Không ghi mật khẩu thật, secret hoặc token vào tài liệu/repo; thời gian suất demo cần được kiểm tra trước khi chạy.
  - [ ] Có đủ dữ liệu đi toàn bộ luồng mà không cần sửa trực tiếp DB giữa các bước.

- [ ] **T9.2 — Chạy luồng admin đến khách bằng tay**
  - [ ] Admin thêm/sửa phim, tạo rạp/phòng/ghế, tạo và mở bán suất; khách xem được dữ liệu thật.
  - [ ] Customer đăng ký, đăng nhập, chọn phim/suất/ghế, thanh toán giả lập thành công, xem vé và lịch sử, đăng xuất.
  - [ ] Tải lại trang vẫn đọc đúng dữ liệu đã lưu; không còn mock trong các màn thuộc phạm vi bản cơ bản.

- [ ] **T9.3 — Chạy các ca lỗi quan trọng**
  - [ ] Thiếu/sai/hết hạn token, customer gọi API admin, xem đơn tài khoản khác đều bị từ chối đúng.
  - [ ] Trùng suất, hai khách giữ cùng ghế, giữ chỗ hết hạn, thanh toán thất bại và bấm xác nhận lặp đều có kết quả đúng.
  - [ ] Chạy các test tự động bắt buộc của Epic 05–07; sửa nguyên nhân nếu có lỗi trước khi mở nâng cấp.
  - [ ] API lỗi hoặc DB không có dữ liệu không làm UI kẹt hoặc hiển thị thành công sai.

- [ ] **T9.4 — Ghi hướng dẫn chạy và giới hạn bản cơ bản**
  - Khi thực hiện task này, báo trước file tài liệu sẽ cập nhật theo rule dự án; không tự sửa MyPlan.md.
  - Ghi cách chạy DB/backend/frontend, tên biến môi trường cần có với giá trị mẫu, thứ tự demo và kết quả kiểm tra.
  - Dẫn tới phạm vi/giới hạn auth và thanh toán ở Epic 02/07, không chép lại nhiều nơi.
  - [ ] Người dùng tự chạy lại được từ hướng dẫn; chỉ đánh dấu Epic 09 hoàn thành sau khi các checklist trên đạt.

## Mốc chuyển sang nâng cấp

- Chỉ sau khi **T9.1–T9.4** đạt mới chọn nhóm trong [Epic 10 — Nâng cấp](epic-10-upgrade-tasks.md).
- Không cần làm toàn bộ nâng cấp cùng lúc; chọn một nhóm, giữ bản cơ bản chạy được sau mỗi thay đổi.
