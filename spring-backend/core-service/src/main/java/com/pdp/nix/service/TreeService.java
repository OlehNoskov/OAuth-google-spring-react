package com.pdp.nix.service;

import com.pdp.nix.dto.TreeDto;

public interface TreeService {

    TreeDto create(TreeDto treeNodeDto);

    TreeDto getTreeNode(long treeId);

    TreeDto update(TreeDto treeNodeDto);

    void delete(long treeId);
}
