package com.example.backend.controller;

import com.example.backend.dto.GenresResponse;
import com.example.backend.repository.GenresRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
public class GenresController {
    private final GenresRepository genresRepository;
    // Hàm khởi tạo của controller
    public GenresController (GenresRepository genresRepository){
        this.genresRepository = genresRepository;
    }
    // api gọi hàm lấy danh sách genres
    @GetMapping ("/api/genres")
    public List<GenresResponse>  getGenres() {
        return genresRepository.findAllGenres();
    }

}
