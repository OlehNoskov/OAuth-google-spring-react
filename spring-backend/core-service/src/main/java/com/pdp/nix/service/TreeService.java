package com.pdp.nix.service;

import com.pdp.nix.dto.PageableResponse;
import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.persistence.entity.DocumentTree;
import org.springframework.data.domain.Pageable;

public interface TreeService {

    TreeDto create(TreeDto treeNodeDto);

    TreeDto getTreeNodeById(long treeId);

    TreeDto update(TreeDto treeNodeDto);

    void delete(long treeId);

    PageableResponse<DocumentTree> getAllTreeByUser(String username, Pageable pageable);

    PageableResponse<DocumentTree> getAllTrees(Pageable pageable);
}
