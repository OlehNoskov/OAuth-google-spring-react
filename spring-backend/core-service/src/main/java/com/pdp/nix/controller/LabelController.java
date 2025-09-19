package com.pdp.nix.controller;

import com.pdp.nix.dto.LabelDto;
import com.pdp.nix.service.LabelService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/label")
@AllArgsConstructor
public class LabelController {

    private final LabelService labelService;

    @PreAuthorize("hasAnyRole('OWNER', 'EDITOR')")
    @GetMapping
    @RequestMapping("/all")
    public List<LabelDto> getAllLabels() {
        return labelService.getAllLabels();
    }
}
