# Kế hoạch TianMovie

Cập nhật ngày 22/11/2026

## Cách đi theo lộ trình

- Hoàn thành **bản cơ bản: Epic 01 → 09**, sau đó mới chọn task trong **Epic 10 — Nâng cấp**.
- Mỗi lần học một khái niệm, làm một bước nhỏ và kiểm tra được kết quả rồi mới đi tiếp. Riêng Epic 02 có thứ tự task con để tránh học JWT, filter và xử lý lỗi cùng lúc.
- Người dùng tự viết backend; trợ lý giải thích và hướng dẫn theo task đang làm.
- Tận dụng UI, Spring JDBC, Liquibase và code đã có. Không thêm framework hoặc tầng trừu tượng chỉ để chuẩn bị cho tương lai.
- Cấu trúc cho logic mới: Controller nhận/trả dữ liệu → Service xử lý nghiệp vụ → Repository truy vấn DB. Frontend gọi API qua service riêng. Không refactor phần đã chạy nếu không cần.
- Schema tham chiếu: [tianmovie.md](../../../docs/tianmovie.md). Chỉ tạo các bảng/cột cần cho task hiện tại; migration mới dùng số tiếp theo đang trống, không giữ chỗ số migration cho nâng cấp.

## Phạm vi bản cơ bản

- Khách xem phim, lịch chiếu, chọn ghế, thanh toán **giả lập** và xem vé của mình.
- Một hệ thống rạp mẫu, admin `super_admin` quản lý dữ liệu; người dùng đăng ký mang quyền `customer`.
- Đăng nhập bằng một Access Token, hết hạn thì đăng nhập lại. Chi tiết và giới hạn nằm ở [Epic 02](epic-02-tasks.md).
- Bắt đầu với phòng hình chữ nhật, ghế STANDARD và một giá cơ bản cho mỗi suất chiếu.
- Vẫn giữ BCrypt, kiểm tra quyền ở backend, quyền sở hữu đơn, kiểm tra dữ liệu, transaction và ràng buộc chống đặt trùng ghế.
- Refresh Token, phân quyền nhiều cấp, chuẩn hóa lỗi filter và các cơ chế vận hành nâng cao nằm ở [Epic 10](epic-10-upgrade-tasks.md).

## Thứ tự thực hiện

| Epic | Mục tiêu của bản cơ bản | Phụ thuộc | Checklist |
|---|---|---|---|
| 01 — Danh mục phim | Danh sách, lọc thể loại, chi tiết phim; đã hoàn thành | API phim và thể loại hiện có | [Epic 01](epic-01-tasks.md) |
| 02 — Tài khoản | Đăng ký, đăng nhập, xem tài khoản, đăng xuất và chặn API admin | Bảng users đã có | [Epic 02](epic-02-tasks.md) |
| 03 — Quản trị phim | Admin thêm, sửa phim và gán thể loại; trang khách đọc dữ liệu thật | 01, 02 | [Epic 03](epic-03-tasks.md) |
| 04 — Rạp và ghế | Cấu hình rạp, phòng, ghế STANDARD; khách xem rạp | 02 | [Epic 04](epic-04-tasks.md) |
| 05 — Suất chiếu | Tạo suất, một giá vé, chặn trùng phòng; khách chọn suất | 03, 04 | [Epic 05](epic-05-tasks.md) |
| 06 — Chọn và giữ ghế | Tạo đơn chờ thanh toán, chống trùng ghế, giải phóng chỗ hết hạn | 02, 05 | [Epic 06](epic-06-tasks.md) |
| 07 — Thanh toán giả lập | Xác nhận thành công/thất bại; không xác nhận lặp đơn | 06 | [Epic 07](epic-07-tasks.md) |
| 08 — Tra cứu vé | Khách xem vé của mình; admin tra cứu mã đặt vé | 02, 07 | [Epic 08](epic-08-tasks.md) |
| 09 — Hoàn thành bản cơ bản | Kiểm tra toàn luồng, dữ liệu demo và hướng dẫn chạy | 01–08 | [Epic 09](epic-09-tasks.md) |
| 10 — Nâng cấp | Làm từng nhóm nâng cấp sau khi nghiệm thu bản cơ bản | 09 và điều kiện của từng task | [Epic 10](epic-10-upgrade-tasks.md) |

## Kiểm tra theo mức độ

- Task CRUD, UI: kiểm tra bằng Postman và giao diện, gồm thành công, dữ liệu sai, rỗng và lỗi; chưa cần bộ test tự động rộng.
- Epic 02 và 08: kiểm tra `401`, `403` và không đọc được dữ liệu của tài khoản khác; nên có test tự động cho các ca này.
- Epic 04: kiểm tra số lượng và tọa độ ghế; nên có test cho logic sinh ghế.
- Epic 05–07: giữ test tự động cho trùng suất, tranh chấp ghế, hết hạn và xác nhận thanh toán lặp. Đây là điều kiện để luồng đặt vé hoạt động đúng.
- Epic 09: chạy checklist toàn luồng thủ công. Bộ E2E tự động rộng và kiểm thử tải để ở Epic 10.

## Quy ước task

- Chỉ đánh dấu `[x]` khi đã kiểm tra điều kiện hoàn thành, không chỉ vì đã tạo file.
- Giữ mã task cũ khi chia nhỏ hoặc chuyển vị trí. **T2.7–T2.9** được chuyển sang Epic 10 và giữ mã để tra lại lịch sử.
- Các file task mô tả việc cần làm; trạng thái tổng hợp theo dõi tại [progress.md](../../../docs/progress.md).
