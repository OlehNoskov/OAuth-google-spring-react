package com.pdp.nix.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageableResponse<T> {

    private List<T> elements;
    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;
}
