# Epic 10 — Nâng cấp sau khi hoàn thành web cơ bản

Cập nhật ngày 22/11/2026

[Danh sách epic](epics.md) · **Chỉ bắt đầu sau Epic 09**.

## Cách dùng epic này

- Đây là nơi để các phần khó ra sau, không phải điều kiện hoàn thành Epic 02–09.
- Mỗi lần chọn một nhóm; đọc code/schema hiện tại trước khi chốt chi tiết triển khai, giữ luồng cơ bản chạy được và kiểm tra lại sau khi sửa.
- Tận dụng các điểm đã tách: JwtProvider cho token, authService/AuthContext cho frontend, Service cho nghiệp vụ, Repository cho SQL.
- Giữ ID đơn/tài khoản và các API cơ bản khi có thể; thay đổi schema dùng migration mới với số tiếp theo lúc triển khai.
- T2.7–T2.9 giữ mã từ lộ trình cũ; nội dung chỉ theo dõi tại file này.

## Nhóm A — Hiểu và chuẩn hóa lỗi xác thực

- [ ] **T10.1 — JSON lỗi thống nhất ở tầng Security**
  - Phụ thuộc Epic 09. Ôn lại filter chain, DispatcherServlet, exception và HTTP response bằng luồng request thực tế.
  - Hoàn thiện hoặc thay phần entry point đang viết dở: AuthenticationEntryPoint cho chưa xác thực, AccessDeniedHandler cho thiếu quyền; chủ động gọi cơ chế phù hợp khi filter phát hiện lỗi token.
  - Dùng ObjectMapper do Spring cung cấp theo phiên bản dự án để ghi JSON đúng content type; thống nhất code/message với lỗi MVC, tránh tự gọi trực tiếp controller advice.
  - Chỉ cân nhắc HandlerExceptionResolver nếu chọn hướng tái sử dụng xử lý MVC; không cần triển khai cả hai cách để xử lý cùng một lỗi.
  - [ ] Thiếu token, token sai/hết hạn trả `401`, thiếu quyền trả `403`, JSON ổn định; không ghi response hai lần hoặc tiếp tục chain sau lỗi.

## Nhóm B — Refresh Token và quản lý phiên

- [ ] **T2.7 — Thiết kế và tạo dữ liệu Refresh Token**
  - Phụ thuộc Epic 09. Học vòng đời Access Token/Refresh Token trước khi viết migration.
  - Thiết kế refresh_tokens tham chiếu users, thời hạn, thu hồi và rotation; chỉ lưu hash của Refresh Token thay vì giá trị token có thể dùng lại.
  - Chọn cách truyền/lưu Refresh Token trên trình duyệt, gồm đánh giá HttpOnly cookie, SameSite, HTTPS và CSRF khi dùng cookie; ghi rõ quyết định trước khi nối frontend.
  - Tạo migration mới khi triển khai, không giữ cố định số `006` từ lộ trình cũ.
  - [ ] Schema và nơi lưu token đáp ứng luồng cấp mới, hết hạn, thu hồi và thay thế token; không lộ token trong DB/log/tài liệu.

- [ ] **T2.8 — Backend cấp lại token và đăng xuất phiên**
  - Phụ thuộc T2.7. Mở rộng AuthService và thêm RefreshTokenRepository; giữ API login cơ bản hoạt động với frontend được nâng cấp cùng đợt.
  - Login cấp Access Token và Refresh Token theo cách đã chọn; thêm `/api/auth/refresh` và `/api/auth/logout`.
  - Refresh kiểm tra user còn hợp lệ, token còn hạn/chưa thu hồi; rotation trong transaction, xử lý token cũ bị dùng lại.
  - Logout thu hồi phiên tương ứng; giải thích rõ Access Token đã phát vẫn còn hạn nếu chưa thêm cơ chế thu hồi tức thời.
  - [ ] Test refresh thành công, sai/hết hạn/thu hồi, dùng lại token cũ, hai yêu cầu refresh đồng thời và logout rồi refresh thất bại.

- [ ] **T2.9 — Frontend tự động refresh và xử lý hết phiên**
  - Phụ thuộc T2.8. Thay đổi tập trung trong authService/AuthContext; rà lại cách lưu token của bản local trước khi dùng thực tế.
  - Gặp Access Token hết hạn: chỉ một luồng refresh đang chạy, các request còn lại đợi kết quả; thử lại mỗi request tối đa một lần phù hợp.
  - Refresh thất bại thì xóa trạng thái và yêu cầu đăng nhập lại; không refresh với lỗi thiếu quyền `403`, không lặp vô hạn.
  - [ ] Tải lại trang, nhiều request cùng hết hạn và logout hoạt động đúng; token không xuất hiện trong URL hoặc log.

## Nhóm C — Phân quyền nhiều cấp

- [ ] **T10.2 — Brand admin và nhân viên theo phạm vi**
  - Phụ thuộc Epic 09. Mở dần brand_admin/staff từ enum đã có; làm một role và một nhóm API trước.
  - Kiểm tra cả role lẫn brand_id/cinema_id trong Service/truy vấn; không chỉ cho mọi brand_admin vào toàn bộ `/api/admin/**`.
  - Bổ sung UI theo phạm vi sau khi backend đã chặn đúng; xem lại hiệu lực token khi tài khoản bị khóa/đổi quyền và cơ chế cập nhật/thu hồi phiên.
  - [ ] Admin brand A không đọc/sửa dữ liệu brand B; staff chỉ thao tác trong rạp được giao; super_admin vẫn hoạt động.

## Nhóm D — Giữ ghế và vận hành suất chiếu

- [ ] **T10.3 — Dọn hết hạn nền và cập nhật ghế realtime**
  - Phụ thuộc Epic 09. Làm scheduler giải phóng đơn hết hạn trước, rồi mới cân nhắc SSE/WebSocket cho UI.
  - Dùng lại transaction/chuyển trạng thái của bản cơ bản; dọn nền và thanh toán đồng thời không được nhả ghế sold.
  - Chỉ tối ưu khóa sang mức ghế hoặc thêm Redis khi có đo đạc cần thiết; DB vẫn bảo vệ không bán trùng.
  - [ ] Scheduler chạy lặp an toàn; giữ/thanh toán/hết hạn đồng thời không làm sai đơn hoặc ghế.

- [ ] **T10.4 — Ghế và giá nâng cao, sửa/hủy suất có đơn**
  - Phụ thuộc Epic 09. Làm tuần tự: VIP/COUPLE và phụ thu → pricing_rules → sơ đồ ghế tùy biến.
  - Tách tính giá trong Service, lưu giá tại thời điểm đặt vào booking_seats; không đổi giá vé cũ khi quy tắc thay đổi.
  - Thiết kế riêng việc sửa/hủy suất đã mở bán hoặc có đơn: ảnh hưởng ghế, đơn, thông báo và xử lý tiền phải rõ trước khi triển khai.
  - [ ] Test quy tắc giá chồng lấn, tổng tiền và đơn cũ; không mất liên kết ghế/đơn sau chỉnh cấu hình.

## Nhóm E — Quản trị và tra cứu mở rộng

- [ ] **T10.5 — Tiện ích quản trị và dữ liệu lớn hơn**
  - Phụ thuộc Epic 09. Chọn từng phần cần dùng: quản lý nhiều brand, upload ảnh, diễn viên/đạo diễn, phân trang và tìm kiếm nhiều tiêu chí.
  - Không mở thêm mọi màn cùng lúc; mỗi phần cần API thật, quyền backend và kiểm tra đầu vào tương ứng.
  - [ ] Tính năng được chọn chạy từ UI đến DB và không làm hỏng luồng đặt vé cơ bản.

## Nhóm F — Kiểm thử và lịch sử thanh toán

- [ ] **T10.6 — Mở rộng kiểm thử tự động và theo dõi vận hành**
  - Phụ thuộc Epic 09. Tự động hóa E2E từ checklist demo, thêm CI rồi mới kiểm thử tải theo nhu cầu.
  - Bổ sung log truy vết lỗi và cấu hình môi trường; không log mật khẩu/token hoặc dữ liệu nhạy cảm.
  - [ ] Một thay đổi làm hỏng đăng nhập/đặt vé được phát hiện; kết quả tải dùng để quyết định tối ưu thay vì thêm hạ tầng trước.

- [ ] **T10.7 — Lịch sử các lần thanh toán giả lập**
  - Phụ thuộc Epic 09. Tách bản ghi giao dịch/thử thanh toán ra payments, đối chiếu schema và chốt cách biểu diễn provider giả lập trước khi viết migration.
  - Giữ booking_code và dữ liệu vé hiện có; xây dựng trạng thái giao dịch, khóa chống xử lý lặp và transaction cập nhật đơn/ghế.
  - [ ] Theo dõi được từng lần thử và xử lý lặp không tạo thêm xác nhận; lịch sử vé cũ vẫn xem được.
  - Cổng thanh toán thật, callback/webhook và hoàn tiền cần phạm vi riêng được thống nhất sau; không tự đưa vào bản cơ bản.
