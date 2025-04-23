package com.pdp.nix.security.controller;

import com.google.common.net.HttpHeaders;
import com.pdp.nix.security.config.JWTUtils;
import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.dto.IdTokenRequestDto;
import com.pdp.nix.security.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
@AllArgsConstructor
public class SecurityController {
    private final UserService userService;
    private final JWTUtils jwtUtils;

    @PostMapping("/auth")
    public ResponseEntity loginWithGoogleOauth2(@RequestBody IdTokenRequestDto idTokenRequestDto, HttpServletResponse response) {
        UserDto userDto = userService.loginOAuthGoogle(idTokenRequestDto);

        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", jwtUtils.createToken(userDto))
                .httpOnly(true)
                .maxAge(7 * 24 * 3600)
                .path("/")
                .secure(false)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().body(userDto);
    }
}
