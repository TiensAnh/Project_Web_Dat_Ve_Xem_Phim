package com.example.backend.repository;

import com.example.backend.dto.UserResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;



@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    // Ham khoi tao
    public  UserRepository (JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    // Ham doc sql va gom thanh 1 list response
    public List<UserResponse> findAllUser(){
        String sql = """
                SELECT u.id, u.full_name, u.email,  u.phone,
                u.avatar_url, u.role, u.status, u.brand_id, u.cinema_id
                FROM users u
                """;
        RowMapper<UserResponse> userResponseRowMapper = this::mapUserRow;
        List<UserResponse>  users = jdbcTemplate.query(sql,userResponseRowMapper);
        return users;
    }

    // ham lay user theo id kha nang khong can den
    public List<UserResponse> findUserById(long id){
        String sql = """
                SELECT u.id, u.full_name, u.email, u.phone,
                u.avatar_url, u.role, u.status, u.brand_id, u.cinema_id
                FROM users u
                WHERE id = ?
                """;
        RowMapper<UserResponse> useResponseRowMapper = this::mapUserRow;
        List<UserResponse> user = jdbcTemplate.query(sql,useResponseRowMapper,id);
        return user;
    }

    // Ham tim kiem theo email
    public List<UserResponse> findUserByEmail(String email){
        String sql = """
                SELECT u.id, u.full_name, u.email, u.phone,
                u.avatar_url, u.role, u.status, u.brand_id, u.cinema_id
                FROM users u
                WHERE email = ?
                """;
        RowMapper<UserResponse> useResponseRowMapper = this::mapUserRow;
        List<UserResponse> user = jdbcTemplate.query(sql,useResponseRowMapper,email);
        return user;
    }

    // Hàm tạo tài khoản
    public int registerUser(String fullName, String email, String phone, String password){
        String sql = """
                INSERT INTO users (full_name, email, phone, password_hash   )
                VALUES(?,?,?,?)
                """;
        int affectRow = jdbcTemplate.update(sql,fullName,email,phone,password);
        return affectRow;
    }

    // tao 1 object UseResponse va gan data
    public UserResponse mapUserRow(ResultSet resultSet, int rowNumber)throws SQLException {
        long id = resultSet.getLong("id");
        String email =  resultSet.getString("email");
        String fullName  = resultSet.getString("full_name");
        String phone = resultSet.getString("phone");
        String avatarUrl = resultSet.getString("avatar_url");
        String role = resultSet.getString("role");
        String status = resultSet.getString("status");
        Long brandId = resultSet.getObject("brand_id",Long.class);
        Long cinemaId = resultSet.getObject("cinema_id",Long.class);
        return new UserResponse(
                id,
                email,
                fullName,
                phone,
                avatarUrl,
                role,
                status,
                brandId,
                cinemaId);
    }
}
