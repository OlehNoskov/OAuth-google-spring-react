package com.pdp.nix.dto;

import com.pdp.nix.persistence.entity.Label;
import com.pdp.nix.security.persistence.entity.User;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreeDto {
    private Long id;

    @Max(255)
    private String title;

    @Max(1000)
    private String description;

    @Max(5)
    private List<Label> labels;

    @Min(1)
    private List<User> owners;

    private List<TreeNodeDto> nodes;
}
