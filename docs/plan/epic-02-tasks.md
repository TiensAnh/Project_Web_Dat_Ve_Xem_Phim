# Epic 02 — Tài khoản và phân quyền

Cập nhật ngày 18/11/2026

[Danh sách epic](epics.md)

## Task theo thứ tự làm

### Phần A: Xác thực cơ bản với Access Token (Hoàn thiện luồng chạy)

- [x] **T2.1 — Tạo bảng `users` qua Liquibase** · `database` · ~1 giờ
  - Tạo changeset `004` tạo enum `user_role`, `user_status` và bảng `users` theo schema chuẩn.
  - Tạo changeset `005` seed tài khoản admin và tài khoản khách mẫu với mật khẩu đã mã hóa BCrypt.
  - Phụ thuộc database `tianmovie` hiện có.
  - [x] Chạy Liquibase thành công, bảng `users` xuất hiện trong PostgreSQL.
  - [x] Truy vấn có đủ tài khoản mẫu admin và khách.

- [ ] **T2.2 — Cấu hình Spring Security & JJWT (Lõi Access Token)** · `feature` · ~2 giờ
  - Thêm dependency Spring Security và JJWT vào `pom.xml`.
  - Viết `JwtProvider` quản lý sinh và giải mã/xác thực Access Token.
  - Cấu hình `SecurityConfig` và `JwtAuthenticationFilter`: mở route công khai (phim, thể loại, auth); bảo vệ các route cần đăng nhập.
  - Phụ thuộc **T2.1**.
  - [ ] Ứng dụng khởi động bình thường với Spring Security không bị chặn các API công khai hiện có.
  - [ ] Filter giải mã được token và thiết lập authentication context cho request hợp lệ.

- [ ] **T2.3 — Viết các API Xác thực cơ bản (Register, Login, Me)** · `feature` · ~2 giờ
  - Viết `AuthController`, `AuthService`, `UserRepository` qua Spring JDBC.
  - `POST /api/auth/register`: Đăng ký tài khoản khách mới, mật khẩu mã hóa BCrypt.
  - `POST /api/auth/login`: Xác thực tài khoản, trả về `accessToken` duy nhất cùng thông tin user.
  - `GET /api/auth/me`: Đọc thông tin người dùng từ token.
  - Phụ thuộc **T2.2**.
  - [ ] Đăng ký tài khoản mới thành công và mật khẩu được mã hóa an toàn trong DB.
  - [ ] Đăng nhập đúng trả `accessToken`, đăng nhập sai mật khẩu trả lỗi `401`.
  - [ ] `GET /api/auth/me` trả đúng thông tin người dùng từ token.

- [ ] **T2.4 — Phân quyền API quản trị ở Backend** · `feature` · ~1 giờ
  - Cấu hình phân quyền: Chỉ tài khoản có role `super_admin` hoặc `brand_admin` mới được gọi các endpoint `/api/admin/**`.
  - Phụ thuộc **T2.3**.
  - [ ] Khách (`customer`) hoặc người chưa đăng nhập gọi API admin nhận mã `401 Unauthorized` hoặc `403 Forbidden`.
  - [ ] Tài khoản admin gọi API admin thành công.

- [ ] **T2.5 — Nối Auth vào Frontend (AuthModal & Header)** · `feature` · ~2 giờ
  - Tạo `authService.js` và `AuthContext.jsx` để lưu trạng thái đăng nhập, lưu `accessToken` vào `localStorage`.
  - Nối form Đăng ký và Đăng nhập trong `AuthModal.jsx`.
  - Cập nhật Header: Hiển thị tên/avatar người dùng khi đã đăng nhập kèm nút Đăng xuất.
  - Gắn `Authorization: Bearer <accessToken>` vào các request gửi lên backend.
  - Phụ thuộc **T2.3**.
  - [ ] Đăng ký và đăng nhập thành công từ giao diện `AuthModal`.
  - [ ] Tải lại trang vẫn duy trì đăng nhập từ `accessToken`.
  - [ ] Đăng xuất xóa sạch token và đưa giao diện về trạng thái chưa đăng nhập.

- [ ] **T2.6 — Bảo vệ route Quản trị `/admin` trên Frontend & Kiểm tra luồng** · `chore` · ~1–2 giờ
  - Viết `ProtectedRoute` trong React Router: Khách thường truy cập `/admin/*` sẽ bị chặn và điều hướng về trang chủ hoặc thông báo không có quyền.
  - Phụ thuộc **T2.4** và **T2.5**.
  - [ ] Đăng nhập tài khoản khách: Vào `/admin` bị chặn.
  - [ ] Đăng nhập tài khoản admin: Vào `/admin` bình thường.
  - [ ] Kiểm tra trọn vẹn luồng từ Đăng ký, Đăng nhập đến Đăng xuất.

### Phần B: Nâng cấp bảo mật với Refresh Token (Duy trì phiên dài hạn)

- [ ] **T2.7 — Tạo bảng `refresh_tokens` qua Liquibase** · `database` · ~1 giờ
  - Tạo changeset `006` tạo bảng `refresh_tokens` tham chiếu `users.id`.
  - Phụ thuộc **T2.1**.
  - [ ] Chạy Liquibase thành công, bảng `refresh_tokens` xuất hiện trong PostgreSQL.

- [ ] **T2.8 — Backend xử lý Refresh Token & Đăng xuất** · `feature` · ~2 giờ
  - Viết `RefreshTokenRepository` và mở rộng `AuthService`.
  - `POST /api/auth/login`: Trả thêm `refreshToken` và lưu vào DB.
  - `POST /api/auth/refresh`: Nhận Refresh Token hợp lệ và cấp Access Token mới.
  - `POST /api/auth/logout`: Thu hồi/xóa Refresh Token trong DB.
  - Phụ thuộc **T2.7** và **T2.3**.
  - [ ] Đăng nhập trả về cặp token (`accessToken` hạn ngắn và `refreshToken`).
  - [ ] Refresh token thành công khi token còn hạn và bị từ chối khi hết hạn hoặc không khớp.

- [ ] **T2.9 — Frontend tự động Refresh Token trong nền** · `feature` · ~2 giờ
  - Xử lý auto-refresh token trong nền khi Access Token hết hạn mà không ngắt quãng trải nghiệm người dùng.
  - Phụ thuộc **T2.8** và **T2.5**.
  - [ ] Tự động lấy lại Access Token mới qua Refresh Token mà không bắt đăng nhập lại.

---

Giữ nguyên mã task khi đổi thứ tự hoặc ước lượng. Đánh dấu `[x]` khi checklist của task đã đạt. Với task tính năng, ưu tiên một lát cắt chạy được qua DB, API và UI. Task chỉ liên quan một tầng hoặc tài liệu có thể giữ phạm vi tương ứng.
