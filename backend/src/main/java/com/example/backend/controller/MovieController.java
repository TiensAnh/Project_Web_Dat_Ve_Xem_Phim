package com.example.backend.controller;

import com.example.backend.dto.MovieResponse;
import org.springframework.http.ResponseEntity;
import com.example.backend.repository.MovieRepository;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.BusinessException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

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
            List<MovieResponse> titles = movieRepository.findAllTitle();
            return titles;
    }
   // Hàm trả về phim theo id
    @GetMapping("/api/movies/{id}")
    public ResponseEntity<MovieResponse> getMovieId(@PathVariable("id") long id){
        List<MovieResponse>  result = movieRepository.findIdMovie(id);
        if(result.isEmpty()){
            throw new BusinessException(ErrorCode.MOVIE_NOT_FOUND);
        }
        MovieResponse movie = result.get(0);

        return ResponseEntity.ok(movie);
    }

}
