package com.pdp.nix.security.config;

import com.pdp.nix.security.dto.Account;
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

    private static final long TOKEN_VALIDITY = 1000 * 60 * 60 * 24; //1 day

    public String createToken(Account account) {
        long now = (new Date()).getTime();
        Date validity =  new Date(now + TOKEN_VALIDITY);

        return Jwts.builder()
                .setSubject(account.getFirstName())
                .setIssuedAt(new Date())
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    //public Authentication verifyAndGetAuthentication(String token) {
    //    try {
    //        Claims claims = Jwts.parserBuilder()
    //                .setSigningKey(key)
    //                .build()
    //                .parseClaimsJws(token)
    //                .getBody();
    //        List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(claims.get("role", String.class));
    //        return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
    //    } catch (JwtException | IllegalArgumentException ignored) {
    //        return null;
    //    }
    //}
}
