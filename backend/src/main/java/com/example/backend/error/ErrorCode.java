package com.example.backend.error;

import org.springframework.http.HttpStatus;

// Định nghĩa mã lỗi nghiệp vụ và phản hồi HTTP tương ứng.
public enum ErrorCode {
    MOVIE_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy phim.");

    private final HttpStatus status;
    private final String message;

    // Lưu trạng thái HTTP và thông báo cho từng mã lỗi.
    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    // Lấy trạng thái HTTP của lỗi.
    public HttpStatus getStatus() {
        return status;
    }

    // Lấy thông báo gửi về frontend.
    public String getMessage() {
        return message;
    }
}