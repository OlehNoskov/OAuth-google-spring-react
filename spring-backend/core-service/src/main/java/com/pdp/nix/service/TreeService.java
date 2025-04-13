package com.pdp.nix.service;

import com.pdp.nix.dto.TreeDto;

import java.util.List;

public interface TreeService {

    TreeDto create(TreeDto treeNodeDto);

    TreeDto getTreeNode(long treeId);

    TreeDto update(TreeDto treeNodeDto);

    List<TreeDto> getAllTreeByUser(String username);

    void delete(long treeId);
}
