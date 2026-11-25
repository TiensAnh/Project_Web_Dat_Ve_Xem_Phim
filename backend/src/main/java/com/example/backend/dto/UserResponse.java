package com.example.backend.dto;

public record UserResponse(
        long id,
        String email,
        String fullName,
        String phone,
        String avatarUrl,
        String role,
        String status,
        Long brandId,
        Long cinemaId
){

}
