package com.pdp.nix.security.dto;

import com.pdp.nix.security.persistence.entity.AccountEntity;
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

    public static AccountDto convertToDto(AccountEntity accountEntity) {
        return AccountDto.builder()
                .firstName(accountEntity.getFirstName())
                .lastName(accountEntity.getLastName())
                .email(accountEntity.getEmail())
                .picture(accountEntity.getPicture())
                .build();
    }
}
