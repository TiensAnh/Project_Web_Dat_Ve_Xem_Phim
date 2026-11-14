# Kế hoạch TianMovie

Cập nhật ngày 14/11/2026

## Phạm vi bản đầu

Khách xem phim, tra lịch chiếu, chọn ghế và nhận xác nhận đặt vé qua thanh toán giả lập. Admin cấu hình dữ liệu và tra cứu đơn. Các epic mở rộng sẽ được bổ sung khi chủ dự án yêu cầu.

## Danh sách epic theo thứ tự làm

### Epic 01 — Danh mục phim

- **Mục tiêu** — Khách tìm và xem thông tin phim từ dữ liệu backend.
- **Xong khi** — Khách xem danh sách, lọc theo thể loại và mở chi tiết phim. Giao diện xử lý trạng thái đang tải, rỗng và lỗi. Xác minh hai API đã nối ở trang Tất cả phim trong commit `c4fea31`.
- **Phụ thuộc** — API phim và thể loại đã có.
- **Task** — [Mẫu file task của Epic 01](epic-01-tasks.md).

### Epic 02 — Tài khoản và phân quyền

- **Mục tiêu** — Khách có tài khoản và các thao tác quản trị được kiểm soát theo quyền.
- **Xong khi** — Khách đăng ký, đăng nhập và đăng xuất được. Backend từ chối truy cập API quản trị khi tài khoản thiếu quyền.
- **Phụ thuộc** — Không có.

### Epic 03 — Quản trị phim và thể loại

- **Mục tiêu** — Admin quản lý danh mục phim hiển thị cho khách.
- **Xong khi** — Admin tạo, sửa, cập nhật trạng thái phim và gán thể loại. Dữ liệu lưu vào DB và phản ánh đúng trên trang khách.
- **Phụ thuộc** — Epic 01 và 02.

### Epic 04 — Cụm rạp, phòng và sơ đồ ghế

- **Mục tiêu** — Admin cấu hình địa điểm chiếu và sơ đồ ghế. Khách tra cứu thông tin rạp.
- **Xong khi** — Admin cấu hình được cụm rạp, rạp, phòng và ghế. Khách xem được danh sách và chi tiết rạp từ dữ liệu backend.
- **Phụ thuộc** — Epic 02.

### Epic 05 — Suất chiếu và giá vé

- **Mục tiêu** — Admin lập lịch và cấu hình giá. Khách tìm được suất phù hợp.
- **Xong khi** — Admin tạo suất và thiết lập giá. Hệ thống từ chối suất trùng giờ trong cùng phòng. Khách lọc lịch theo phim, rạp và ngày rồi chọn được suất mở bán.
- **Phụ thuộc** — Epic 03 và 04.

### Epic 06 — Chọn ghế và giữ chỗ

- **Mục tiêu** — Khách chọn ghế và tạo đơn chờ thanh toán.
- **Xong khi** — Khách thấy sơ đồ ghế và tổng tiền. Hai khách tranh cùng một ghế thì chỉ một người giữ được. Ghế hết hạn giữ chỗ có thể chọn lại.
- **Phụ thuộc** — Epic 05.

### Epic 07 — Thanh toán giả lập và xác nhận vé

- **Mục tiêu** — Khách hoàn tất luồng đặt vé với giao dịch giả lập.
- **Xong khi** — Giao dịch thành công trả mã đặt vé. Giao dịch thất bại hoặc hết hạn được xử lý đúng. Xử lý lặp cùng giao dịch chỉ xác nhận vé một lần.
- **Phụ thuộc** — Epic 06.

### Epic 08 — Lịch sử vé và tra cứu đơn

- **Mục tiêu** — Khách xem vé của mình và người vận hành tra cứu được đơn.
- **Xong khi** — Khách xem được vé thuộc tài khoản của mình. Người có quyền tra cứu đơn theo mã và xem ghế, trạng thái đơn và thanh toán.
- **Phụ thuộc** — Epic 02 và 07.

### Epic 09 — Kiểm thử và bàn giao bản đầu

- **Mục tiêu** — Chạy và kiểm tra được luồng đặt vé từ đầu đến cuối.
- **Xong khi** — Kiểm tra được luồng cấu hình phim, rạp, suất chiếu đến đặt vé và tra cứu đơn, gồm các ca trùng ghế, hết hạn, lỗi thanh toán và sai quyền. Có dữ liệu demo và hướng dẫn chạy.
- **Phụ thuộc** — Epic 01–08.
