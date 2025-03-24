package com.pdp.nix.security.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.pdp.nix.security.dto.AccountDto;
import com.pdp.nix.security.dto.IdTokenRequestDto;
import com.pdp.nix.security.persistence.entity.User;
import com.pdp.nix.security.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class UserService {

    private final GoogleIdTokenVerifier verifier;
    private final UserRepository userRepository;

    public UserService(@Value("${spring.security.oauth2.client.registration.google.client-id}") String clientId, UserRepository userRepository) {
        NetHttpTransport transport = new NetHttpTransport();
        this.verifier = new GoogleIdTokenVerifier.Builder(transport, new GsonFactory())
                .setAudience(Collections.singletonList(clientId)).build();
        this.userRepository = userRepository;

    }

    public AccountDto loginOAuthGoogle(IdTokenRequestDto requestBody) {
        User user = verifyIdToken(requestBody.getIdToken());
        if (user == null) {
            throw new IllegalArgumentException();
        }

        return AccountDto.convertToDto(createOrUpdateUser(user));
    }

    private User verifyIdToken(String idToken) {
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

            return User.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .picture(picture)
                    .build();

        } catch (GeneralSecurityException e) {
            throw new IllegalArgumentException();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public User createOrUpdateUser(User user) {
        return userRepository.findByEmail(user.getEmail())
                .map(existingUser -> {
                    existingUser.setFirstName(user.getFirstName());
                    existingUser.setLastName(user.getLastName());
                    existingUser.setPicture(user.getPicture());
                    return userRepository.save(existingUser);
                })
                .orElseGet(() -> userRepository.save(user));
    }
}
