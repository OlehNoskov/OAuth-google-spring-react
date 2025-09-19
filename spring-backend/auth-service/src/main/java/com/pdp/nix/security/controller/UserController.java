package com.pdp.nix.security.controller;

import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasAnyRole('OWNER', 'EDITOR')")
    @GetMapping
    @RequestMapping("/all")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }
}
