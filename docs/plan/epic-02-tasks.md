# Epic 02 — Tài khoản và phân quyền

Cập nhật ngày 17/11/2026

[Danh sách epic](epics.md)

## Task theo thứ tự làm

- [ ] **T2.1 — Tạo bảng `users` và `refresh_tokens` qua Liquibase** · `database` · ~1–2 giờ
  - Tạo changeset `003` tạo enum `user_role`, `user_status` và bảng `users`, `refresh_tokens` theo schema chuẩn.
  - Tạo changeset `004` seed tài khoản admin và tài khoản khách mẫu với mật khẩu đã mã hóa BCrypt.
  - Phụ thuộc database `tianmovie` hiện có.
  - [ ] Chạy Liquibase thành công, bảng `users` và `refresh_tokens` xuất hiện trong PostgreSQL.
  - [ ] Truy vấn có đủ tài khoản mẫu admin và khách.

- [ ] **T2.2 — Cấu hình Spring Security & JJWT (Access & Refresh Token)** · `feature` · ~2–3 giờ
  - Thêm dependency Spring Security và JJWT vào `pom.xml`.
  - Viết `JwtProvider` quản lý sinh và giải mã Access Token (ngắn hạn) và Refresh Token (dài hạn).
  - Cấu hình `SecurityConfig` và `JwtAuthenticationFilter`: mở route công khai (phim, thể loại, auth); bảo vệ các route cần đăng nhập.
  - Phụ thuộc **T2.1**.
  - [ ] Ứng dụng khởi động bình thường với Spring Security không bị chặn các API công khai hiện có.
  - [ ] Filter giải mã được token và thiết lập authentication context cho request hợp lệ.

- [ ] **T2.3 — Viết các API Xác thực (Register, Login, Refresh, Me)** · `feature` · ~2–3 giờ
  - Viết `AuthController`, `AuthService`, `UserRepository`, `RefreshTokenRepository` qua Spring JDBC.
  - `POST /api/auth/register`: Đăng ký tài khoản khách mới, mật khẩu mã hóa BCrypt.
  - `POST /api/auth/login`: Xác thực tài khoản, trả cặp Access Token và Refresh Token, lưu Refresh Token vào DB.
  - `POST /api/auth/refresh`: Nhận Refresh Token hợp lệ và cấp Access Token mới.
  - `GET /api/auth/me`: Đọc thông tin người dùng từ token.
  - Phụ thuộc **T2.2**.
  - [ ] Đăng ký tài khoản mới thành công và mật khẩu được mã hóa an toàn trong DB.
  - [ ] Đăng nhập đúng trả cặp token, đăng nhập sai mật khẩu trả lỗi `401`.
  - [ ] Refresh token thành công khi token còn hạn và bị từ chối khi hết hạn hoặc không khớp.
  - [ ] `GET /api/auth/me` trả đúng thông tin người dùng từ token.

- [ ] **T2.4 — Phân quyền API quản trị ở Backend** · `feature` · ~1 giờ
  - Cấu hình phân quyền: Chỉ tài khoản có role `super_admin` hoặc `brand_admin` mới được gọi các endpoint `/api/admin/**`.
  - Phụ thuộc **T2.3**.
  - [ ] Khách (`customer`) hoặc người chưa đăng nhập gọi API admin nhận mã `401 Unauthorized` hoặc `403 Forbidden`.
  - [ ] Tài khoản admin gọi API admin thành công.

- [ ] **T2.5 — Nối Auth vào Frontend (AuthModal & Header)** · `feature` · ~2–3 giờ
  - Tạo `authService.js` và `AuthContext.jsx` để lưu trạng thái đăng nhập, tự động refresh token khi gần hết hạn.
  - Nối form Đăng ký và Đăng nhập trong `AuthModal.jsx`.
  - Cập nhật Header: Hiển thị tên/avatar người dùng khi đã đăng nhập kèm nút Đăng xuất.
  - Phụ thuộc **T2.3**.
  - [ ] Đăng ký và đăng nhập thành công từ giao diện `AuthModal`.
  - [ ] Tự động lấy lại Access Token mới qua Refresh Token khi Access Token hết hạn mà không bắt đăng nhập lại.
  - [ ] Đăng xuất xóa sạch token và đưa giao diện về trạng thái chưa đăng nhập.

- [ ] **T2.6 — Bảo vệ route Quản trị `/admin` trên Frontend & Kiểm tra luồng** · `chore` · ~1–2 giờ
  - Viết `ProtectedRoute` trong React Router: Khách thường truy cập `/admin/*` sẽ bị chặn và điều hướng về trang chủ hoặc thông báo không có quyền.
  - Phụ thuộc **T2.4** và **T2.5**.
  - [ ] Đăng nhập tài khoản khách: Vào `/admin` bị chặn.
  - [ ] Đăng nhập tài khoản admin: Vào `/admin` bình thường.
  - [ ] Kiểm tra trọn vẹn luồng từ Đăng ký, Đăng nhập, Duy trì phiên bằng Refresh Token đến Đăng xuất.

Giữ nguyên mã task khi đổi thứ tự hoặc ước lượng. Đánh dấu `[x]` khi checklist của task đã đạt. Với task tính năng, ưu tiên một lát cắt chạy được qua DB, API và UI. Task chỉ liên quan một tầng hoặc tài liệu có thể giữ phạm vi tương ứng.
