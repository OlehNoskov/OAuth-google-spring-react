package com.pdp.nix.controller;

import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.service.TreeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tree")
@AllArgsConstructor
public class TreeController {

    private TreeService treeService;

    @PutMapping
    @RequestMapping("/create")
    public TreeDto create(@RequestBody TreeDto treeDto) {
        return treeService.create(treeDto);
    }

    @GetMapping
    @RequestMapping("/get/{treeId}")
    public TreeDto getTree(@PathVariable Long treeId) {
        return treeService.getTreeNode(treeId);
    }

    @PutMapping
    @RequestMapping("/update")
    public TreeDto update(@RequestBody TreeDto treeDto) {
        return treeService.update(treeDto);
    }

    @DeleteMapping
    @RequestMapping("/delete/{treeId}")
    public void delete(@PathVariable Long treeId) {
        treeService.delete(treeId);
    }
}
