package com.pdp.nix.mapper;

import com.pdp.nix.dto.TreeNodeDto;
import com.pdp.nix.persistence.entity.TreeNode;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface TreeNodeMapper {

    TreeNodeDto toTreeNodeDto(TreeNode treeNode);

    TreeNode toTreeNodeEntity(TreeNodeDto treeNodeDto);

    List<TreeNode> toTreeNodeEntities(List<TreeNodeDto> treeNodeDto);

    List<TreeNodeDto> toTreeNodeDtos(List<TreeNode> treeNode);
}
