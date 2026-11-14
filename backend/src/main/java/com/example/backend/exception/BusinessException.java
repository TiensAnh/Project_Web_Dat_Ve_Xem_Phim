package com.example.backend.exception;

import com.example.backend.error.ErrorCode;
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;
    // hàm khởi tạo để truyền errcode
    public BusinessException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode =errorCode;
    }

    public ErrorCode getErrorCode(){
        return errorCode;
    }
}
