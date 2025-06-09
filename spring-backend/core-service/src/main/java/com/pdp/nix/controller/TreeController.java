package com.pdp.nix.controller;

import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.service.TreeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tree")
@AllArgsConstructor
public class TreeController {

    private TreeService treeService;

    @PostMapping
    @RequestMapping("/create")
    public TreeDto create(@RequestBody TreeDto treeDto) {
        return treeService.create(treeDto);
    }

    @GetMapping
    @RequestMapping("/get/{treeId}")
    public TreeDto getTreeById(@PathVariable("treeId") Long treeId) {
        return treeService.getTreeNodeById(treeId);
    }

    @GetMapping
    @RequestMapping("/get/title/{title}")
    public List<TreeDto> getTreeByTitle(@PathVariable("title") String title) {
        return treeService.getTreeNodeByTitle(title);
    }

    @PutMapping
    @RequestMapping("/update")
    public TreeDto update(@RequestBody TreeDto treeDto) {
        return treeService.update(treeDto);
    }

    @DeleteMapping
    @RequestMapping("/delete/{treeId}")
    public void delete(@PathVariable("treeId") Long treeId) {
        treeService.delete(treeId);
    }

    @GetMapping
    @RequestMapping("/getAll/{username}")
    private List<TreeDto> getAllByUser(@PathVariable("username") String username) {
        return treeService.getAllTreeByUser(username);
    }
}
