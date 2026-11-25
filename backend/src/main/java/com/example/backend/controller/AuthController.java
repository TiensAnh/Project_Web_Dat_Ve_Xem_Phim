package com.example.backend.controller;

import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.nio.BufferOverflowException;

@RestController
public class AuthController
{
    private final AuthService authService;
    // Ham khoi tao
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    // Ham dang ki
    @PostMapping("/api/auth/register")
    public UserResponse registerAccount(@RequestBody RegisterRequest request){
        UserResponse result = authService.register(request);
        return result;
    }
}
