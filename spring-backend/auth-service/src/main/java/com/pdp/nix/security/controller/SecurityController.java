package com.pdp.nix.security.controller;

import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.dto.IdTokenRequestDto;
import com.pdp.nix.security.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
@AllArgsConstructor
public class SecurityController {
    private final UserService userService;

    @PostMapping("/auth")
    public ResponseEntity loginWithGoogleOauth2(@RequestBody IdTokenRequestDto idTokenRequestDto) {
        UserDto userDto = userService.loginOAuthGoogle(idTokenRequestDto);
        return ResponseEntity.ok().body(userDto);
    }
}
