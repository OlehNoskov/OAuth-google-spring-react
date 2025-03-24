package com.pdp.nix.security.dto;

import com.pdp.nix.security.persistence.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class AccountDto {

    private String firstName;
    private String lastName;
    private String email;
    private String picture;

    public static AccountDto convertToDto(User user) {
        return AccountDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .picture(user.getPicture())
                .build();
    }
}
