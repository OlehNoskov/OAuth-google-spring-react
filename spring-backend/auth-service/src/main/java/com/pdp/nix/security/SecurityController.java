package com.pdp.nix.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class SecurityController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/secured")
    public String secured() {
        return "Hello! This is a secured service";
    }
}
