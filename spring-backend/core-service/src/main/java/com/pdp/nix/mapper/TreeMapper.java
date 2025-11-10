package com.pdp.nix.mapper;

import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.persistence.entity.DocumentTree;
import com.pdp.nix.persistence.entity.Tree;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface TreeMapper {

    Tree toTreeEntity(TreeDto treeDto);

    TreeDto toTreeDto(Tree tree);

    List<TreeDto> toTreeDtoList(List<Tree> trees);

    @Mapping(target = "labels", expression = "java(tree.getLabels() != null ? tree.getLabels().stream().map(label -> label.getValue()).collect(java.util.stream.Collectors.toSet()) : null)")
    @Mapping(target = "owners", expression = "java(tree.getOwners() != null ? tree.getOwners().stream().map(owner -> owner.getEmail()).collect(java.util.stream.Collectors.toSet()) : null)")
    DocumentTree toDocumentTree(Tree tree);
}
