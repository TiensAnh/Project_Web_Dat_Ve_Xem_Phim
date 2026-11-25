package com.example.backend.controller;

import com.example.backend.dto.UserResponse;
import com.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final UserRepository userRepository;

    // Ham constructor
    public UserController (UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @GetMapping("/api/auth/user")
    public List<UserResponse> getAllUser(){

        return userRepository.findAllUser();
    }


    //

}
