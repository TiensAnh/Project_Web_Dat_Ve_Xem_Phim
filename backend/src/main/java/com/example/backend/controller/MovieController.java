package com.example.backend.controller;
import com.example.backend.dto.MovieResponse;
import com.example.backend.repository.MovieRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {
    private final MovieRepository movieRepository;

    // Nhận đối tượng MovieRepository từ spring
    public MovieController (MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }
    // trả về danh sách movies
    @GetMapping("/api/movies")
    public List<MovieResponse> getMovie(){
        List<MovieResponse> titles = movieRepository.findALlTitle();
        return titles;
    }
}
