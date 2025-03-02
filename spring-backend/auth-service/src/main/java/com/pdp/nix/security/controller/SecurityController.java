package com.pdp.nix.security.controller;

import com.pdp.nix.security.dto.AccountDto;
import com.pdp.nix.security.dto.IdTokenRequestDto;
import com.pdp.nix.security.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
@AllArgsConstructor
public class SecurityController {
    private final AccountService accountService  ;

    @PostMapping("/auth")
    public ResponseEntity loginWithGoogleOauth2(@RequestBody IdTokenRequestDto token) {
        accountService.loginOAuthGoogle(token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/info")
    public AccountDto getUserInfo() {
        return AccountDto.builder()
                .firstName("firstName")
                .lastName("lastName")
                .email("email")
                .build();
    }

}
