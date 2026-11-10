package com.example.backend.repository;

import com.example.backend.controller.GenresController;
import com.example.backend.dto.GenresResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class GenresRepository {
    private final JdbcTemplate jdbcTemplate;
    public GenresRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }
    // Hàm lấy tất cả trường của bảng genres
    public List<GenresResponse> findAllGenres ()  {
        String sql = "Select * FROM genres";
        RowMapper<GenresResponse> responseRowMapper = this::rowMapGenres;
        List<GenresResponse> genres = jdbcTemplate.query(sql,responseRowMapper);
        return genres;

    }
    // Hàm tạo 1 đối tượng genres chứa 2  trường
    public GenresResponse rowMapGenres (ResultSet resultSet, int rowNumber)throws SQLException{
        long idGenres = resultSet.getLong("id");
        String nameGenres = resultSet.getString("name");
        return new GenresResponse(idGenres,nameGenres);
    }
}
