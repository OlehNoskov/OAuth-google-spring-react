package com.pdp.nix.mapper;

import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.persistence.entity.Tree;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface TreeMapper {

    Tree toTreeEntity(TreeDto treeDto);

    TreeDto toTreeDto(Tree tree);

    List<TreeDto> toTreeDtoList(List<Tree> trees);
}
