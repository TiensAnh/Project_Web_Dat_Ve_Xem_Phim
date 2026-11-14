package com.example.backend.exception;

import com.example.backend.error.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Map<String,String>> handleBusinessException(
            BusinessException exception
    ){
        ErrorCode errorCode = exception.getErrorCode();
        Map<String,String> body = Map.of(
                "code" , errorCode.name(),
                "message" , exception.getMessage()
        );
        return ResponseEntity.status(errorCode.getStatus()).body(body);

    }
}
