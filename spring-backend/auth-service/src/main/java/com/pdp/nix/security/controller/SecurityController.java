package com.pdp.nix.security.controller;

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
        String authToken = accountService.loginOAuthGoogle(token);
        //final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
        //        .httpOnly(true)
        //        .maxAge(7 * 24 * 3600)
        //        .path("/")
        //        .secure(false)
        //        .build();
        //response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }

}
