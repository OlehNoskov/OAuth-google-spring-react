package com.pdp.nix.mapper;

import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.persistence.entity.Tree;
import org.mapstruct.Mapper;

@Mapper
public interface TreeMapper {

    Tree toTreeEntity(TreeDto treeDto);

    TreeDto toTreeDto(Tree tree);
}
