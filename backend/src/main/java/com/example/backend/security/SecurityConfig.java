package com.example.backend.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import jakarta.servlet.DispatcherType;

// Khai báo cho Spring đay là 1 class dùng để cấu hình
@Configuration
public class SecurityConfig {
    // Cung cấp công cụ xử lý pass
    @Bean
    public PasswordEncoder passwordEncoder(){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        // tao 1 objec chua cac api public
        http.authorizeHttpRequests(authorization -> {
            authorization.requestMatchers(HttpMethod.GET,"/api/movies").permitAll();
            authorization.requestMatchers(HttpMethod.GET, "/api/genres").permitAll();
            authorization.requestMatchers(HttpMethod.GET, "/api/movies/*").permitAll();
            authorization.requestMatchers(HttpMethod.GET, "/api/health").permitAll();
            authorization.requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll();
            authorization.requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll();
            authorization.dispatcherTypeMatchers(DispatcherType.ERROR).permitAll();
            authorization.requestMatchers(HttpMethod.GET,"/api/auth/user").hasAuthority("super_admin");
            authorization.anyRequest().authenticated();
            });

        // tao object tra ve loi 401 yeu cau dang nhap
        HttpStatusEntryPoint httpStatusEntryPoint = new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);
        http.exceptionHandling(exceptionHandling -> {
            exceptionHandling.authenticationEntryPoint(httpStatusEntryPoint);
        });
        // Không lưu token vào tỏn
        http.sessionManagement(sessionManagement -> {
            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        });
        // Tắt cấu hình csrf
        http.csrf(csrf -> {
            csrf.disable();
        });
        // Tao 1 o
        SecurityFilterChain filterChain  = http.build();
        return filterChain;
    }
}
