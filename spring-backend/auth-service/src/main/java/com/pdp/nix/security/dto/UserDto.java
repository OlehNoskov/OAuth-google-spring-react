package com.pdp.nix.security.dto;

import com.pdp.nix.security.persistence.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class UserDto {

    private String firstName;
    private String lastName;
    private String email;
    private String picture;
    private UserRole role;
}
