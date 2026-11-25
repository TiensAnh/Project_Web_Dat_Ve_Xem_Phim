# Epic 04 — Rạp, phòng và ghế cơ bản

Cập nhật ngày 22/11/2026

[Danh sách epic](epics.md) · Phụ thuộc Epic 02.

## Phạm vi

- Một brand mẫu, nhiều rạp/phòng nếu cần demo. Super_admin quản lý toàn hệ thống.
- Phòng hình chữ nhật, ghế STANDARD, phụ thu bằng 0. Chưa có kéo thả sơ đồ, ghế đôi hoặc phân quyền theo brand.
- Tạo bảng theo [schema](../../../docs/tianmovie.md) bằng migration mới; seed tách khỏi schema. Không cần làm mọi bảng mở rộng cùng lúc.

## Task theo thứ tự

- [ ] **T4.1 — Dữ liệu rạp và API đọc**
  - Tạo bảng brands/cinemas, seed một brand và một rạp mẫu. Đọc schema để dùng đúng trường bắt buộc và khóa ngoại.
  - Viết API danh sách/chi tiết rạp, nối trang khách tra cứu rạp từ DB.
  - [ ] Xem được rạp thật; ID sai trả `404`, danh sách rỗng hiển thị đúng.

- [ ] **T4.2 — Admin thêm và sửa rạp**
  - Viết API admin và nối form rạp có sẵn; brand mẫu được chọn cố định cho bản cơ bản.
  - Kiểm tra tên, địa chỉ, thành phố, ràng buộc tên trùng và trạng thái hoạt động.
  - [ ] Thêm/sửa rạp ở admin hiển thị đúng ở trang khách; customer không sửa được.

- [ ] **T4.3 — Admin tạo phòng trong rạp**
  - Tạo bảng rooms; API và form nhập rạp, tên phòng, số hàng/cột và trạng thái theo schema.
  - Kiểm tra rạp tồn tại, kích thước dương và tên phòng không trùng trong cùng rạp.
  - [ ] Tạo được phòng và xem lại thông tin; dữ liệu sai không được lưu.

- [ ] **T4.4 — Sinh sơ đồ ghế STANDARD**
  - Tạo seat_types/seats, seed STANDARD. Sinh hàng/cột bằng vòng lặp rõ ràng, lưu các ghế trong một transaction.
  - Dùng row_label, seat_number, grid_row/grid_col theo schema; giữ ràng buộc duy nhất trong phòng.
  - Khi đã có ghế được dùng cho suất/đơn, không cho thay đổi kích thước và sinh lại ghế ở bản cơ bản.
  - [ ] Phòng 3 hàng × 4 cột tạo đúng 12 ghế, không trùng nhãn/tọa độ; bấm tạo lặp không tạo ghế trùng.

- [ ] **T4.5 — Hiển thị phòng và ghế từ DB**
  - Nối bảng phòng và sơ đồ ghế trên admin. API đọc sơ đồ phục vụ bước chọn ghế sau này.
  - [ ] Chọn rạp/phòng thấy đúng ghế; dữ liệu không thuộc cùng phòng không bị trộn.
  - [ ] Kiểm tra lỗi sinh ghế không để lại một phần sơ đồ; nên có test tự động cho logic hàng/cột.

## Để nâng cấp sau

- Nhiều loại ghế, sơ đồ tùy biến và quản trị nhiều brand nằm ở [Epic 10](epic-10-upgrade-tasks.md).
