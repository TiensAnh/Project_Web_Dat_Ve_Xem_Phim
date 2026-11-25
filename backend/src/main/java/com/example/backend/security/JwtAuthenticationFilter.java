package com.example.backend.security;

import com.example.backend.error.ErrorCode;
import com.example.backend.exception.BusinessException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.JwtException;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtProvider jwtProvider;
    //ham Contructor
    public JwtAuthenticationFilter (JwtProvider jwtProvider){
        this.jwtProvider = jwtProvider;
    }
    // Xử lý request đi qua filter
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    )throws IOException,ServletException{
        String authorizationHeader = request.getHeader("Authorization");
        if(authorizationHeader == null){
            filterChain.doFilter(request,response);
            return;
        }
        if(!authorizationHeader.startsWith("Bearer ")){
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }
        String accessToken = authorizationHeader.substring(7).trim();
        try {
            jwtProvider.parseToken(accessToken);
        }
        catch(JwtException | IllegalArgumentException exception){
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }
        filterChain.doFilter(request,response);
    }
}
