# Epic 03 — Quản trị phim và thể loại cơ bản

Cập nhật ngày 22/11/2026

[Danh sách epic](epics.md) · Phụ thuộc Epic 01 và 02.

## Phạm vi

- Dùng trang admin hiện có; thêm, sửa, cập nhật trạng thái phim và gán thể loại.
- Ảnh dùng URL nhập tay. Upload ảnh, quản lý diễn viên/đạo diễn và nội dung blog chưa thuộc bản cơ bản.
- Đọc schema và code truy vấn hiện có trước mỗi phần; không sửa lại migration đã chạy.

## Task theo thứ tự

- [ ] **T3.1 — Admin đọc danh sách và chi tiết phim**
  - Thêm API GET dưới `/api/admin/movies`, trả dữ liệu từ DB; tận dụng truy vấn hiện có khi phù hợp.
  - Nối bảng danh sách phim admin, giữ trạng thái loading/rỗng/lỗi.
  - [ ] Super_admin xem được dữ liệu thật; customer gọi trực tiếp API nhận `403`.

- [ ] **T3.2 — Thêm phim với các trường cơ bản**
  - Làm DTO → Repository → Service → Controller → form thêm phim.
  - Kiểm tra trường bắt buộc, thời lượng dương, trạng thái hợp lệ và các ràng buộc hiện có; ảnh dùng URL.
  - [ ] Thêm từ UI, tải lại vẫn thấy phim trong DB và ở trang khách theo bộ lọc trạng thái tương ứng.

- [ ] **T3.3 — Sửa phim và đổi trạng thái**
  - Dùng form hiện có cho chỉnh sửa; ID không tồn tại trả `404` qua global.
  - Chưa làm xóa cứng phim đã có quan hệ suất chiếu/đơn; dùng trạng thái phù hợp trong schema.
  - [ ] Sửa tên/thông tin/trạng thái phản ánh đúng ở admin và trang khách, dữ liệu sai không được lưu.

- [ ] **T3.4 — Thể loại và gán thể loại cho phim**
  - Dùng API đọc thể loại đã có; bổ sung thêm/sửa thể loại cho admin, rồi nối chọn thể loại vào form phim.
  - Lưu phim và các liên kết movie_genres trong một transaction; từ chối ID thể loại không tồn tại, tránh liên kết trùng.
  - [ ] Phim có nhiều thể loại hiển thị và lọc đúng trên trang khách; lỗi lưu liên kết không để lại phim cập nhật dở.

- [ ] **T3.5 — Kiểm tra luồng quản trị phim**
  - [ ] Thêm → sửa → đổi trạng thái → lọc/xem ở trang khách chạy được với DB thật.
  - [ ] Kiểm tra dữ liệu sai, ID không tồn tại, thiếu token và sai quyền bằng Postman/UI.

## Để nâng cấp sau

- Xem nhóm quản trị và dữ liệu tại [Epic 10](epic-10-upgrade-tasks.md); không làm thêm các màn quản trị chưa phục vụ luồng đặt vé.
