package com.example.backend.dto;

import java.time.LocalDate;
import java.util.List;

public record MovieResponse (
        long id,
        String slug,
        String title,
        String englishTitle,
        int durationMinutes,
        String ageRating,
        String country,
        String status,
        String posterUrl,
        String backdropUrl,
        String trailerUrl,
        String synopsis,
        String storyPlot,
        String highlightsUrlMovie,
        LocalDate releaseDateUrlMovie,
        List<String> genres
        ){
}
