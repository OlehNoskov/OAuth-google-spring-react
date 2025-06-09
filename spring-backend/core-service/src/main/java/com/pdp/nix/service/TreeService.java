package com.pdp.nix.service;

import com.pdp.nix.dto.PageableResponse;
import com.pdp.nix.dto.TreeDto;
import org.springframework.data.domain.Pageable;

public interface TreeService {

    TreeDto create(TreeDto treeNodeDto);

    TreeDto getTreeNodeById(long treeId);

    TreeDto update(TreeDto treeNodeDto);

    void delete(long treeId);

    PageableResponse<TreeDto> getAllTreeByUser(String username, Pageable pageable);

    PageableResponse<TreeDto> getTreeNodeByTitle(String title, Pageable pageable);
}
