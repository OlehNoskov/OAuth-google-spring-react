package com.pdp.nix.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class IdTokenRequestDto {

    private String idToken;
}
