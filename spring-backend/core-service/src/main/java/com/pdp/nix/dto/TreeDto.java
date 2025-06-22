package com.pdp.nix.dto;

import com.pdp.nix.security.dto.UserDto;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreeDto {

    private Long id;

    @Max(100)
    private String createdBy;

    @Max(255)
    private String title;

    @Max(1000)
    private String description;

    @Max(5)
    private Set<LabelDto> labels;

    @Min(1)
    private Set<UserDto> owners;

    private List<TreeNodeDto> nodes;
}
