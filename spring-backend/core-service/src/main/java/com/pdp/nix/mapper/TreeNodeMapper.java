package com.pdp.nix.mapper;

import com.pdp.nix.dto.TreeNodeDto;
import com.pdp.nix.persistence.entity.Tree;
import com.pdp.nix.persistence.entity.TreeNode;
import org.mapstruct.Mapper;

@Mapper
public interface TreeNodeMapper {

    TreeNodeDto toTreeNodeDto(TreeNode treeNode);

    Tree toTreeNodeEntity(TreeNodeDto treeNodeDto);
}
