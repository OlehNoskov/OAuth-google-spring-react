package com.pdp.nix.security.config;

import com.pdp.nix.security.persistence.entity.Account;
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

    private final Key key;

    public JWTUtils(@Value("${spring.application.jwtSecret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    private static final long TOKEN_VALIDITY = 1000 * 60 * 60; //1 hour

    public String createToken(Account account) {
        long now = (new Date()).getTime();
        Date expiration =  new Date(now + TOKEN_VALIDITY);

        return Jwts.builder()
                .subject(account.getFirstName())
                .issuedAt(new Date())
                .expiration(expiration)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    public Authentication verifyAndGetAuthentication(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(claims.get("role", String.class));
            return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
        } catch (JwtException | IllegalArgumentException ignored) {
            return null;
        }
    }
}
