package com.pdp.nix.service;

import com.pdp.nix.dto.TreeDto;

import java.util.List;

public interface TreeService {

    TreeDto create(TreeDto treeNodeDto);

    TreeDto getTreeNodeById(long treeId);

    List<TreeDto> getTreeNodeByTitle(String title);

    TreeDto update(TreeDto treeNodeDto);

    List<TreeDto> getAllTreeByUser(String username);

    void delete(long treeId);
}
