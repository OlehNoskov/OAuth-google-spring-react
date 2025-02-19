package com.pdp.nix.security;

import com.google.common.net.HttpHeaders;
import com.pdp.nix.security.dto.IdTokenRequestDto;
import com.pdp.nix.security.service.AccountService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@AllArgsConstructor
public class SecurityController {

    private final AccountService accountService  ;

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/secured")
    public String secured() {
        return "Hello! This is a secured service";
    }

    @PostMapping("/verify")
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
