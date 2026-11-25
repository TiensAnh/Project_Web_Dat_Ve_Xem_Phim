package com.example.backend.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import  org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.ClassInfo;
import org.springframework.stereotype.Component;

import java.util.Date;
import javax.crypto.SecretKey;
import java.security.Key;


@Component
public class JwtProvider {
    private final SecretKey signingKey;
    private final long expirationMillis;
    public JwtProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-ms}") long expirationMillis)
    {
        byte[] secretBytes = Decoders.BASE64.decode(secret);
        this.signingKey = Keys.hmacShaKeyFor(secretBytes);
        this.expirationMillis = expirationMillis;
    }
    // Hàm tạo token và thông tin dưới dạng json
    public String generateToken( long userId , String role){
        long issuedAtMillis = System.currentTimeMillis();
        long expiresAtMillis = issuedAtMillis + expirationMillis;

        Date issuedAt = new Date(issuedAtMillis);
        Date expiresAt = new Date(expiresAtMillis);

        String subject = Long.toString(userId);

        String accesstoken = Jwts.builder()
                .subject(subject)
                .claim("role",role)
                .issuedAt(issuedAt)
                .expiration(expiresAt)
                .signWith(signingKey)
                .compact();
        return accesstoken;
    }
    // Hàm kiểm tra token và hạn sử dụng của token
    public Claims parseToken(String accessToken){
        Claims claims = Jwts.parser()
                        .verifyWith(signingKey)
                        .build()
                        .parseSignedClaims(accessToken)
                        .getPayload();
        return claims;
    }
}
