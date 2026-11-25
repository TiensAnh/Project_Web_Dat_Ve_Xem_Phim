# Epic 05 — Suất chiếu và một giá vé cơ bản

Cập nhật ngày 22/11/2026

[Danh sách epic](epics.md) · Phụ thuộc Epic 03 và 04.

## Phạm vi

- Một giá `base_price` cho mỗi suất, mọi ghế STANDARD có cùng giá.
- Làm tạo và mở bán suất trước; sửa/hủy suất đã có đơn và pricing_rules để nâng cấp sau.
- Chống trùng lịch trong cùng phòng là yêu cầu cơ bản, gồm cả hai request đồng thời.

## Task theo thứ tự

- [ ] **T5.1 — Bảng suất chiếu và API đọc cho admin**
  - Tạo screenings theo schema, khóa ngoại phim/phòng và các ràng buộc thời gian; dùng migration mới.
  - Đọc danh sách phim, phòng để chọn trên form; API trả chi tiết suất kèm tên phim/rạp/phòng.
  - [ ] Danh sách/chi tiết đọc DB thật; tham chiếu phim hoặc phòng sai không được chấp nhận.

- [ ] **T5.2 — Tạo suất nháp và tính thời gian**
  - Nhập phim, phòng, giờ bắt đầu, định dạng/ngôn ngữ và giá; backend tính giờ kết thúc từ thời lượng phim ở thời điểm tạo.
  - Kiểm tra phòng hoạt động, giá dương, kết thúc sau bắt đầu. Dùng một quy ước múi giờ nhất quán khi gửi/đọc thời gian.
  - [ ] Tạo suất nháp đúng thông tin từ form admin; dữ liệu sai trả lỗi rõ ràng.

- [ ] **T5.3 — Chặn trùng phòng và mở bán**
  - Kiểm tra khoảng thời gian giao nhau; dùng ràng buộc DB theo schema để bảo vệ cả request đồng thời, không chỉ SELECT kiểm tra trước khi INSERT.
  - Suất cancelled không chiếm lịch; các trạng thái chiếm lịch khác theo cùng một quy tắc ở Service và DB.
  - Chỉ cho mở bán khi phòng có ghế và dữ liệu suất hợp lệ; bản cơ bản không sửa suất đã mở bán.
  - [ ] Viết test: trùng giờ cùng phòng bị từ chối, phòng khác được phép, suất nối tiếp đúng mốc kết thúc được phép, tạo đồng thời không gây trùng lịch.

- [ ] **T5.4 — Khách xem và chọn suất**
  - API công khai lọc suất open còn thời gian đặt theo phim/rạp/ngày; backend tính khoảng ngày theo múi giờ đã dùng.
  - Nối giao diện lịch chiếu hiện có, chọn suất chuyển sang bước chọn ghế với screening ID.
  - [ ] Không thấy suất nháp/đóng/đã qua; trạng thái không có suất, tải và lỗi hoạt động đúng.

## Để nâng cấp sau

- Pricing_rules, phụ thu, sửa/hủy suất có đơn và các quy trình vận hành mở rộng nằm ở [Epic 10](epic-10-upgrade-tasks.md).
