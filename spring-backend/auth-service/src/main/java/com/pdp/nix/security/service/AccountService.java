package com.pdp.nix.security.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.pdp.nix.security.config.JWTUtils;
import com.pdp.nix.security.dto.IdTokenRequestDto;
import com.pdp.nix.security.persistence.entity.Account;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class AccountService {

    private final GoogleIdTokenVerifier verifier;
    private final JWTUtils jwtUtils;

    public AccountService(@Value("${spring.security.oauth2.client.registration.google.client-id}") String clientId,
                          JWTUtils jwtUtils) {
        NetHttpTransport transport = new NetHttpTransport();
        verifier = new GoogleIdTokenVerifier.Builder(transport, new GsonFactory())
                .setAudience(Collections.singletonList(clientId)).build();
        this.jwtUtils = jwtUtils;
    }

    public String loginOAuthGoogle(IdTokenRequestDto requestBody) {
        Account account = verifyIdToken(requestBody.getIdToken());
        if (account == null) {
            throw new IllegalArgumentException();
        }
        return jwtUtils.createToken(account);
    }

    public Account verifyIdToken(String idToken) {
        try {
            GoogleIdToken idTokenObj = verifier.verify(idToken);
            if (idTokenObj == null) {
                return null;
            }
            GoogleIdToken.Payload payload = idTokenObj.getPayload();
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");
            String picture = (String) payload.get("picture");
            String email = payload.getEmail();

            return Account.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .picture(picture)
                    .build();

        } catch (GeneralSecurityException | IOException e) {
            return null;
        }
    }
}
