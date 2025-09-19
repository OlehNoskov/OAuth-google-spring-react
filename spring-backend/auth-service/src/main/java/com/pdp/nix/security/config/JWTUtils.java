package com.pdp.nix.security.config;

import com.pdp.nix.security.dto.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JWTUtils {

    private static final long TOKEN_VALIDITY = 24 * 60 * 60 * 1000; // 24 hours
    private final Key key;

    public JWTUtils(@Value("${spring.application.jwtSecret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String createToken(UserDto account) {
        long now = (new Date()).getTime();

        return Jwts.builder()
                .subject(account.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(now + TOKEN_VALIDITY))
                .signWith(key, SignatureAlgorithm.HS512)
                // Added it to handle permission for different endpoints @PreAuthorize("hasRole('OWNER')")
                .claim("role", "ROLE_" + account.getRole().name())
                .compact();
    }

    public Authentication verifyAndGetAuthentication(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(claims.get("role", String.class));
            return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
        } catch (JwtException | IllegalArgumentException ignored) {
            return null;
        }
    }
}
