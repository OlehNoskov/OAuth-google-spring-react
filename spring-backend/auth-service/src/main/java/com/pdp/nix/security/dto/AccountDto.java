package com.pdp.nix.security.dto;

import com.pdp.nix.security.persistence.entity.Account;
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

    public static AccountDto convertToDto(Account account) {
        return AccountDto.builder()
                .firstName(account.getFirstName())
                .lastName(account.getLastName())
                .email(account.getEmail())
                .picture(account.getPicture())
                .build();
    }
}
