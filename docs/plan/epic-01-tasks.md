# Epic 01 — Danh mục phim

Cập nhật ngày 14/11/2026

[Danh sách epic](epics.md)

## Task theo thứ tự làm

- [ ] **T1.1 — Tạo API lấy chi tiết phim theo ID** · `feature` · ~2–3 giờ
  - Thêm `GET /api/movies/{id}` để đọc thông tin phim và thể loại từ DB.
  - Phụ thuộc dữ liệu phim và thể loại hiện có.
  - Đã triển khai endpoint và xử lý `MOVIE_NOT_FOUND` trong code. Chờ xác nhận hai phản hồi HTTP bên dưới khi chạy backend.
  - [ ] ID có trong DB trả `200` và dữ liệu của đúng phim.
  - [ ] ID hợp lệ nhưng không tồn tại trả `404`.

- [ ] **T1.2 — Nối API vào trang Chi tiết phim** · `feature` · ~2–3 giờ
  - Dùng API chi tiết để tải phim theo ID trên route `/phim/:id`.
  - Phụ thuộc **T1.1**.
  - [ ] Bấm phim từ trang **Tất cả phim** hoặc mở URL trực tiếp đều hiển thị đúng phim từ DB.
  - [ ] Trang có trạng thái riêng khi đang tải, khi nhận `404` và khi API lỗi.

- [ ] **T1.3 — Hoàn thiện trạng thái trang Tất cả phim** · `feature` · ~2–3 giờ
  - Dùng hai API hiện có và bổ sung phản hồi khi tải phim hoặc thể loại.
  - Có thể làm song song với **T1.1–T1.2**.
  - [ ] Có thông báo đang tải trong lúc chờ dữ liệu.
  - [ ] Phân biệt danh sách rỗng, bộ lọc không có kết quả và lỗi tải phim hoặc thể loại.

- [ ] **T1.4 — Kiểm tra luồng danh mục phim với dữ liệu thật** · `chore` · ~1 giờ
  - Kiểm tra luồng danh mục phim từ danh sách đến chi tiết.
  - Phụ thuộc **T1.2** và **T1.3**.
  - [ ] Mở danh sách, lọc theo thể loại, bấm vào một phim và xác nhận trang chi tiết khớp phim đã chọn.
  - [ ] Kiểm tra lại các trường hợp danh sách rỗng, ID không tồn tại và API lỗi. Ghi issue cho lỗi còn tái hiện được.

Giữ nguyên mã task khi đổi thứ tự hoặc ước lượng. Đánh dấu `[x]` khi checklist của task đã đạt. Với task tính năng, ưu tiên một lát cắt chạy được qua DB, API và UI. Task chỉ liên quan một tầng hoặc tài liệu có thể giữ phạm vi tương ứng.
