package com.pdp.nix.controller;

import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.persistence.entity.DocumentTree;
import com.pdp.nix.service.TreeService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.PageRequest;
import com.pdp.nix.dto.PageableResponse;

@RestController
@RequestMapping("/tree")
@AllArgsConstructor
public class TreeController {

    private TreeService treeService;

    @PreAuthorize("hasAnyRole('OWNER', 'EDITOR')")
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

    @PreAuthorize("hasAnyRole('OWNER', 'EDITOR')")
    @PutMapping
    @RequestMapping("/update")
    public TreeDto update(@RequestBody TreeDto treeDto) {
        return treeService.update(treeDto);
    }

    @PreAuthorize("hasAnyRole('OWNER', 'EDITOR')")
    @DeleteMapping
    @RequestMapping("/delete/{treeId}")
    public void delete(@PathVariable("treeId") Long treeId) {
        treeService.delete(treeId);
    }

    @GetMapping
    @RequestMapping("/get-all/{username}")
    public PageableResponse<DocumentTree> getAllByUser(@PathVariable("username") String username,
                                                       @RequestParam(name = "page", defaultValue = "0") int page,
                                                       @RequestParam(name = "size", defaultValue = "10") int size) {
        return treeService.getAllTreeByUser(username, PageRequest.of(page, size));
    }

    @GetMapping
    @RequestMapping("/get/title/{title}")
    public PageableResponse<TreeDto> getTreeByTitle(@PathVariable("title") String title,
                                             @RequestParam(name = "page", defaultValue = "0") int page,
                                             @RequestParam(name = "size", defaultValue = "10") int size) {
        return treeService.getTreeNodeByTitle(title, PageRequest.of(page, size));
    }

  @PreAuthorize("hasRole('OWNER')")
  @RequestMapping("/get-all")
  public PageableResponse<DocumentTree> getAll(@RequestParam(name = "page", defaultValue = "0") int page,
                                          @RequestParam(name = "size", defaultValue = "10") int size) {
    return treeService.getAllTrees(PageRequest.of(page, size));
  }
}
