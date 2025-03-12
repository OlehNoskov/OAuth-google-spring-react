package com.pdp.nix.security.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.pdp.nix.security.dto.AccountDto;
import com.pdp.nix.security.dto.IdTokenRequestDto;
import com.pdp.nix.security.persistence.entity.Account;
import com.pdp.nix.security.persistence.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class AccountService {

    private final GoogleIdTokenVerifier verifier;
    private final AccountRepository accountRepository;

    public AccountService(@Value("${spring.security.oauth2.client.registration.google.client-id}") String clientId, AccountRepository accountRepository) {
        NetHttpTransport transport = new NetHttpTransport();
        this.verifier = new GoogleIdTokenVerifier.Builder(transport, new GsonFactory())
                .setAudience(Collections.singletonList(clientId)).build();
        this.accountRepository = accountRepository;

    }

    public AccountDto loginOAuthGoogle(IdTokenRequestDto requestBody) {
        Account account = verifyIdToken(requestBody.getIdToken());
        if (account == null) {
            throw new IllegalArgumentException();
        }

        return AccountDto.convertToDto(createOrUpdateUser(account));
    }

    private Account verifyIdToken(String idToken) {
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

        } catch (GeneralSecurityException e) {
            throw new IllegalArgumentException();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Account createOrUpdateUser(Account account) {
        return accountRepository.findByEmail(account.getEmail())
                .map(existingAccount -> {
                    existingAccount.setFirstName(account.getFirstName());
                    existingAccount.setLastName(account.getLastName());
                    existingAccount.setPicture(account.getPicture());
                    return accountRepository.save(existingAccount);
                })
                .orElseGet(() -> accountRepository.save(account));
    }
}
