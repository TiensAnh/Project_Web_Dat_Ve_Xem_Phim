package com.example.backend.dto;

public record RegisterRequest (
        String fullName,
        String email ,
        String phone,
        String password
){
}
