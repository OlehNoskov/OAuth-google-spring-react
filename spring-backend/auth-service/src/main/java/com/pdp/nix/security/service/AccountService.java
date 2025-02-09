package com.pdp.nix.security.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.pdp.nix.security.dto.Account;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.util.Collections;
import java.util.Date;

@Service
public class AccountService {

    private final GoogleIdTokenVerifier verifier;
    private final Key key;

    public AccountService(@Value("${spring.security.oauth2.client.registration.google.client-id}") String clientId, @Value("${spring.application.jwtSecret}") String secret) {
        NetHttpTransport transport = new NetHttpTransport();
        verifier = new GoogleIdTokenVerifier.Builder(transport, new GsonFactory())
                .setAudience(Collections.singletonList(clientId)).build();
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String verifyIDToken(String idToken) {
        try {
            GoogleIdToken idTokenObj = verifier.verify(idToken);
            if (idTokenObj == null) {
                return null;
            }
            GoogleIdToken.Payload payload = idTokenObj.getPayload();
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");
            String email = payload.getEmail();

            return createToken(new Account(firstName, lastName, email), false);
        } catch (GeneralSecurityException | IOException e) {
            return null;
        }
    }

    private static final long TOKEN_VALIDITY = 86400000L;
    private static final long TOKEN_VALIDITY_REMEMBER = 2592000000L;

    public String createToken(Account account, boolean rememberMe) {
        long now = (new Date()).getTime();
        Date validity = rememberMe ? new Date(now + TOKEN_VALIDITY_REMEMBER) : new Date(now + TOKEN_VALIDITY);

        return Jwts.builder()
                .setSubject(account.getId().toString())
                .setIssuedAt(new Date())
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
}
