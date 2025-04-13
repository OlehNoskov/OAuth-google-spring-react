package com.pdp.nix.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabelDto {

    @NonNull
    private String labelKey;

    @NonNull
    private String value;
}
