package com.example.backend.repository;

import java.lang.management.MonitorInfo;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalTime;
import java.util.List;

import java.time.LocalDate;
import com.example.backend.dto.MovieResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

// Gom các truy vấn liên quan đến phim

@Repository
public class MovieRepository {
    private final JdbcTemplate jdbcTemplate;

    //Hàm Khởi tạo constructor nhan jdbc tu MovieRepository
    public MovieRepository (JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    // Hàm lấy danh sách movies
    public List<MovieResponse> findAllTitle() {
        String sql_query = """
                SELECT m.id, m.slug, m.title, m.english_title, m.duration_minutes,
                       m.age_rating, m.country, m.status, m.poster_url, m.backdrop_url,
                       m.trailer_url, m.synopsis, m.story_plot, m.highlights, m.release_date,
                       STRING_AGG(g.name, ',') AS genre_names
                FROM movies m
                LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                LEFT JOIN genres g ON mg.genre_id = g.id
                GROUP BY m.id
                ORDER BY m.id
                """;
        RowMapper<MovieResponse> movieResponseRowMapper = this::mapMovieRow;

        List<MovieResponse> movies = jdbcTemplate.query(sql_query, movieResponseRowMapper);
        return movies;
    }

    // Hàm lấy dữ liệu của 1 phim theo id
    public List<MovieResponse> findIdMovie (long id){
        String sql = """
                SELECT m.id, m.slug, m.title, m.english_title, m.duration_minutes,
                       m.age_rating, m.country, m.status, m.poster_url, m.backdrop_url,
                       m.trailer_url, m.synopsis, m.story_plot, m.highlights, m.release_date,
                       STRING_AGG(g.name, ',') AS genre_names
                FROM movies m
                LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                LEFT JOIN genres g ON mg.genre_id = g.id
                WHERE m.id = ?
                GROUP BY m.id
                ORDER BY m.id
                """;
        RowMapper<MovieResponse> movieIdResponseRowMapper= this::mapMovieRow;
        List<MovieResponse> movie= jdbcTemplate.query(sql,movieIdResponseRowMapper,id);

        return movie;
    }

    // Ham lay du lieu tu bang tra ve
    public MovieResponse mapMovieRow (ResultSet resultSet, int rowNumber  ) throws SQLException {

        long idMovie = resultSet.getLong("id");
        String slugMovie = resultSet.getString("slug");
        String titleMovie = resultSet.getString("title");
        String englishTitleMovie = resultSet.getString("english_title");
        int durationMinutesMovie = resultSet.getInt("duration_minutes");
        String ageRatingMovie = resultSet.getString("age_rating");
        String countryMovie = resultSet.getString("country");
        String statusMovie = resultSet.getString("status");
        String posterUrlMovie = resultSet.getString("poster_url");
        String backdropUrlMovie = resultSet.getString("backdrop_url");
        String trailerUrlMovie = resultSet.getString("trailer_url");
        String synopsisMovie = resultSet.getString("synopsis");
        String storyPlotMovie = resultSet.getString("story_plot");
        String highlightsUrlMovie = resultSet.getString("highlights");
        LocalDate releaseDateUrlMovie = resultSet.getObject("release_date",LocalDate.class);
        // gộp danh sách genres từ bảng genres-
        String rawGenres = resultSet.getString("genre_names");
        List<String> genresMovie;
        if(rawGenres != null && !rawGenres.isBlank()){
            genresMovie = List.of(rawGenres.split(","));
        }
        else{
            genresMovie = List.of();
        }

        return new MovieResponse(idMovie,
                slugMovie,
                titleMovie,
                englishTitleMovie,
                durationMinutesMovie,
                ageRatingMovie,
                countryMovie,
                statusMovie,
                posterUrlMovie,
                backdropUrlMovie,
                trailerUrlMovie,
                synopsisMovie,
                storyPlotMovie,
                highlightsUrlMovie,
                releaseDateUrlMovie,
                genresMovie);
    }
}
