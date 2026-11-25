// PHẦN DÀNH CHO CÁC EPIC NÂNG CẤP


package com.example.backend.security;

import com.example.backend.error.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Map;
import tools.jackson.databind.ObjectMapper;
public class JwtAuthenticationEntryPoint {
    private final ObjectMapper objectMapper;
    public JwtAuthenticationEntryPoint(ObjectMapper objectMapper){
        this.objectMapper = objectMapper;
    }

}
