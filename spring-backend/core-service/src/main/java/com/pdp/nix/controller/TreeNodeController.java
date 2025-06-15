package com.pdp.nix.controller;

import com.pdp.nix.persistence.enums.NodeType;
import com.pdp.nix.service.TreeNodeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tree-node")
@AllArgsConstructor
public class TreeNodeController {

    private TreeNodeService treeNodeService;

    @GetMapping
    @RequestMapping("/types/all")
    public List<NodeType> getAllTypes() {
        return treeNodeService.getAllNodeTypes();
    }
}
