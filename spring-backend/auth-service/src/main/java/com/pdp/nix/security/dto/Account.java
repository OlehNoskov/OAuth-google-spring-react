package com.pdp.nix.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Account {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    public Account(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
