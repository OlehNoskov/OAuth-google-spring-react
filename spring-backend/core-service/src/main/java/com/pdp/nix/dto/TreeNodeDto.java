package com.pdp.nix.dto;

import com.pdp.nix.persistence.entity.TreeNode;
import com.pdp.nix.persistence.enums.NodeType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import static com.pdp.nix.constants.Constants.MAX_DEPTH;
import static com.pdp.nix.constants.Constants.ZERO;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreeNodeDto {
    private Long id;

    @Max(255)
    private String title;

    @Max(1000)
    private String description;

    @Size(min = ZERO, max = MAX_DEPTH)
    private int depth;

    @NotNull
    private NodeType type;

    List<TreeNodeDto> children;
}
