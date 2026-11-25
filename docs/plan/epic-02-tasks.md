# Epic 02 — Tài khoản và phân quyền

Cập nhật ngày 25/11/2026

[Danh sách epic](epics.md)

## Mục tiêu và cách làm đơn giản

- Đăng ký → đăng nhập → gọi API cần đăng nhập → phân quyền admin → nối giao diện.
- Giữ một Access Token. Hết hạn thì yêu cầu đăng nhập lại; đăng xuất ở frontend xóa token. Token đã cấp vẫn có hiệu lực đến khi hết hạn, chưa có cơ chế thu hồi ngay.
- Mật khẩu lưu bằng BCrypt; secret ở môi trường chạy, không commit `.env`; không trả mật khẩu hoặc hash ra API.
- Bản này chỉ dùng `customer` và `super_admin`. Enum khác giữ nguyên trong DB nhưng chưa mở chức năng cho `brand_admin`/`staff`.
- Trong filter: token sai/hết hạn trả `401` trực tiếp và dừng request. Chưa cần body JSON cho lỗi filter, chưa tự viết `AuthenticationEntryPoint`, chưa nối `HandlerExceptionResolver` với global.
- Lỗi nghiệp vụ phát sinh trong luồng MVC vẫn dùng `BusinessException` và `GlobalExceptionHandler` hiện có. Frontend đọc HTTP status trước, không mặc định mọi lỗi đều có JSON.
- Dùng `HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)` có sẵn trong SecurityConfig cho request thiếu đăng nhập ở API được bảo vệ; tài khoản thiếu quyền nhận `403`.
- Các phần nâng cấp nằm tại [Epic 10](epic-10-upgrade-tasks.md). Không cần hoàn thành chúng để xong Epic 02.

## Thứ tự học và thực hiện

**T2.0 → T2.2.1 → T2.3.1 → T2.3.2 → T2.2.2 → T2.3.3 → T2.2.3 → T2.2.4 → T2.3.4 → T2.4 → T2.5 → T2.6.**

- T2.1 đã xong. T2.2 và T2.3 được chia thành task con, làm xen kẽ theo dòng trên; không cần làm hết T2.2 rồi mới bắt đầu T2.3.
- Mỗi task con có một kết quả quan sát được. Nếu còn vướng Java cơ bản, dừng ở T2.0 trước khi thêm logic bảo mật.
- Code JWT đã viết được giữ để đọc lại ở bước tương ứng; chưa coi là hoàn thành cho đến khi chạy kiểm tra đạt.

## Task

- [ ] **T2.0 — Ôn Java vừa đủ cho phần đăng nhập**
  - Phân biệt class, object, constructor, biến thành viên và method bằng ví dụ nhỏ.
  - Phân biệt `extends`, `implements`, `interface`, abstract method và `@Override`.
  - Theo dõi luồng gọi hàm với `return`, `throw`, `try/catch`; phân biệt HTTP response với exception Java.
  - [ ] Tự giải thích được ai gọi `doFilterInternal`, khi nào `return` dừng hàm và ai nhận exception; chưa cần tự viết xử lý lỗi nâng cao.

- [x] **T2.1 — Tạo bảng `users` qua Liquibase**
  - Tạo changeset `004` tạo enum `user_role`, `user_status` và bảng `users` theo schema chuẩn.
  - Tạo changeset `005` seed tài khoản admin và tài khoản khách mẫu với mật khẩu đã mã hóa BCrypt.
  - Phụ thuộc database `tianmovie` hiện có.
  - [x] Chạy Liquibase thành công, bảng `users` xuất hiện trong PostgreSQL.
  - [x] Truy vấn có đủ tài khoản mẫu admin và khách.

- [ ] **T2.2 — Cấu hình Spring Security và Access Token**
  - [ ] **T2.2.1 — Cấu hình tối thiểu, chưa nối JWT filter**
    - Phụ thuộc T2.0 và T2.1. Kiểm tra các dependency đã thêm, không thêm lại.
    - Tạo bean BCrypt và SecurityFilterChain. Mở GET phim, thể loại, health hiện có và POST đăng ký/đăng nhập; các API khác yêu cầu đăng nhập.
    - Không mở toàn bộ `/api/auth/**` vì `/me` phải được bảo vệ. Chưa dùng form login hoặc HTTP Basic.
    - Cấu hình cho Bearer token trong header, stateless; xử lý CORS/preflight cho đúng origin Vite. CSRF theo cơ chế này, không dùng cookie đăng nhập trong bản cơ bản.
    - Dùng entry point có sẵn trả `401`, chưa dùng class entry point tự viết dở. Trước khi chạy backend, tự đưa file JwtAuthenticationEntryPoint đang dở cú pháp về một class Java hợp lệ chưa có logic, chưa đăng ký vào Spring.
    - Kiểm tra: API phim vẫn `200`, API cần đăng nhập trả `401`; POST đăng ký/đăng nhập chưa viết có thể `404` nhưng không bị chặn bởi Security.
  - [ ] **T2.2.2 — Đọc lại và kiểm tra JwtProvider**
    - Phụ thuộc T2.3.2. Tận dụng code đã v  iết: tạo token có user ID, role, thời gian cấp và hết hạn; xác minh chữ ký khi đọc.
    - Hiểu riêng từng thao tác: Base64 decode → tạo SecretKey → ký token → parse token. Chưa thêm Refresh Token hoặc ObjectMapper vào bước này.
    - Kiểm tra token tạo ra đọc lại đúng user ID và role; secret hợp lệ lấy từ cấu hình, không ghi giá trị thật vào tài liệu/log.
  - [ ] **T2.2.3 — Hoàn thiện filter theo từng nhánh**
    - Phụ thuộc T2.3.3. Không có Authorization: gọi chain rồi return, để Security quyết định route có cần đăng nhập hay không.
    - Header sai định dạng, token rỗng, sai chữ ký, hết hạn hoặc claims không hợp lệ: đặt status `401` rồi return; không gọi chain và không ném BusinessException để chờ global bắt.
    - Token hợp lệ: lấy user ID/role đã xác minh, tạo Authentication và đặt vào SecurityContext; dùng thống nhất cách ánh xạ role với SecurityConfig.
    - Chỉ catch lỗi đọc/xác minh token trong khối parse; đặt `filterChain.doFilter` bên ngoài khối đó để không đổi lỗi ở tầng sau thành lỗi token.
    - Kiểm tra rõ ba nhánh trên; chưa yêu cầu body JSON cho lỗi filter.
  - [ ] **T2.2.4 — Nối filter vào SecurityConfig**
    - Phụ thuộc T2.2.3. Đăng ký filter đúng một lần trong security chain, trước bước kiểm tra quyền; tránh vừa đăng ký servlet filter tự động vừa thêm vào security chain.
    - Kiểm tra: token hợp lệ tạo được người dùng hiện tại; token hỏng/hết hạn trả `401`; API công khai vẫn gọi được khi không gửi token.

- [ ] **T2.3 — API tài khoản, làm từng endpoint**
  - [x] **T2.3.1 — Đọc và ghi tài khoản qua Repository**
    - Phụ thuộc T2.2.1. Tạo DTO cần dùng và UserRepository bằng Spring JDBC: tìm email, tìm ID, tạo tài khoản; SQL dùng tham số.
    - Tách dữ liệu nội bộ có password hash khỏi DTO trả cho frontend.
    - Kiểm tra đọc được tài khoản mẫu, email không tồn tại được xử lý rõ ràng.
  - [x] **T2.3.2 — Đăng ký trước, chưa cần token**
    - Phụ thuộc T2.3.1. Viết AuthService và AuthController cho `POST /api/auth/register`.
    - Kiểm tra tên/email/mật khẩu; email trùng trả lỗi nghiệp vụ qua global. Backend tự gán `customer`, không nhận role do frontend gửi lên.
    - Dùng BCrypt encode trước khi lưu; trả thông tin tài khoản, không tự đăng nhập ở bước này.
    - Kiểm tra Postman: tài khoản mới được lưu, không lộ hash, email trùng/dữ liệu sai không tạo thêm user.
  - [ ] **T2.3.3 — Đăng nhập và trả Access Token**
    - Phụ thuộc T2.2.2. `POST /api/auth/login`: tìm email, dùng BCrypt matches, kiểm tra tài khoản active rồi tạo token.
    - Email không tồn tại hoặc sai mật khẩu trả cùng thông báo đăng nhập thất bại và `401` qua global; tài khoản không active không được cấp token.
    - Trả `accessToken` và DTO user; chưa có refresh/logout backend.
    - Kiểm tra Postman: đăng nhập đúng lấy được token, sai thông tin không lấy được token.
  - [ ] **T2.3.4 — Xem tài khoản đang đăng nhập**
    - Phụ thuộc T2.2.4. `GET /api/auth/me` lấy user ID từ Authentication, truy vấn tài khoản và trả DTO an toàn; không lấy user ID từ body/query để xác định người gọi.
    - Kiểm tra: token hợp lệ trả đúng người; thiếu/sai/hết hạn token trả `401`; tài khoản không còn hợp lệ không được coi là đăng nhập thành công.

- [ ] **T2.4 — Chặn API quản trị tại backend**
  - Phụ thuộc T2.3.4. `/api/admin/**` chỉ dành cho `super_admin` trong bản cơ bản.
  - Tạo `GET /api/admin/me` trả DTO tài khoản quản trị hiện tại để kiểm tra quyền ngay trong Epic này; dùng lại logic đọc tài khoản, không trả password hash.
  - [ ] Không token nhận `401`, customer nhận `403`, super_admin được phép; kiểm tra bằng Postman, không chỉ bằng nút ẩn trên UI.

- [ ] **T2.5 — Nối giao diện đăng ký, đăng nhập và đăng xuất**
  - Phụ thuộc T2.3.4. Làm lần lượt authService → form đăng ký → form đăng nhập → AuthContext/Header → đăng xuất.
  - Gom thao tác lưu/đọc/xóa Access Token vào authService; giữ cách localStorage của lộ trình cũ cho bản học local. Không lưu mật khẩu hoặc đưa token vào URL/log.
  - Request cần đăng nhập gửi Bearer token. Tải lại trang gọi `/me` để khôi phục thông tin; gặp `401` thì xóa trạng thái đăng nhập, yêu cầu đăng nhập lại; `403` báo thiếu quyền.
  - [ ] Form dùng được, tải lại trang còn nhận ra tài khoản khi token hợp lệ, đăng xuất xóa token và thông tin người dùng.

- [ ] **T2.6 — Bảo vệ trang admin và kiểm tra toàn luồng tài khoản**
  - Phụ thuộc T2.4 và T2.5. ProtectedRoute chỉ cho `super_admin` vào `/admin/*`; backend vẫn là nơi kiểm tra quyền cuối cùng.
  - [ ] Khách chưa đăng nhập, customer và super_admin có hành vi đúng trên giao diện và API.
  - [ ] Đăng ký → đăng nhập → `/me` → tải lại trang → đăng xuất chạy được.
  - [ ] Sửa token hoặc dùng token hết hạn nhận `401`, không thành `500`, UI yêu cầu đăng nhập lại dù response không có JSON.
  - Kiểm tra trên endpoint `/api/admin/me` đã có; không dùng `404` của endpoint chưa tồn tại làm bằng chứng phân quyền thành công.

## Các task đã chuyển

- **T2.7, T2.8, T2.9 — Refresh Token** chuyển toàn bộ sang [Epic 10 — Nâng cấp](epic-10-upgrade-tasks.md), sau Epic 09; giữ mã cũ để tra cứu.
- Tạm dừng class entry point đang viết dở. Khi tự triển khai bước T2.2.1, kiểm tra nó chưa được đăng ký vào cấu hình; không cần hoàn thiện class đó ở bản cơ bản.

---

Giữ nguyên mã task khi đổi thứ tự hoặc ước lượng. Đánh dấu `[x]` khi checklist của task đã đạt. Với task tính năng, ưu tiên một lát cắt chạy được qua DB, API và UI. Task chỉ liên quan một tầng hoặc tài liệu có thể giữ phạm vi tương ứng.
