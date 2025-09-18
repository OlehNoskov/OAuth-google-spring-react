package com.pdp.nix.service.impl;

import com.pdp.nix.dto.LabelDto;
import com.pdp.nix.dto.PageableResponse;
import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.dto.TreeNodeDto;
import com.pdp.nix.mapper.TreeMapper;
import com.pdp.nix.mapper.TreeNodeMapper;
import com.pdp.nix.persistence.entity.Label;
import com.pdp.nix.persistence.entity.Tree;
import com.pdp.nix.persistence.entity.TreeNode;
import com.pdp.nix.persistence.repository.LabelRepository;
import com.pdp.nix.persistence.repository.TreeRepository;
import com.pdp.nix.service.TreeService;
import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.persistence.entity.User;
import com.pdp.nix.security.persistence.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class TreeServiceImpl implements TreeService {
    private TreeMapper treeMapper;
    private TreeNodeMapper treeNodeMapper;
    private TreeRepository treeRepository;
    private LabelRepository labelRepository;
    private UserRepository userRepository;

    @Override
    public TreeDto create(TreeDto treeDto) {
        Set<Label> labels = resolveLabels(treeDto.getLabels());
        Set<User> owners = resolveUsers(treeDto.getOwners());
        Tree treeNode = treeMapper.toTreeEntity(treeDto);
        treeNode.setLabels(labels);
        treeNode.setOwners(owners);
        treeRepository.save(treeNode);

        log.info("Tree with name: '{}' was created.", treeNode.getTitle());

        return treeMapper.toTreeDto(treeNode);
    }

    @Override
    public TreeDto getTreeNodeById(long treeId) {
        Tree tree = treeRepository.findById(treeId).orElseThrow(() -> new RuntimeException("Tree wasn't found by id " + treeId));
        return treeMapper.toTreeDto(tree);
    }

    @Override
    @Transactional
    public TreeDto update(TreeDto treeDto) {
        Tree tree = treeRepository.findById(treeDto.getId())
                .orElseThrow(() -> new RuntimeException("Tree wasn't found by id " + treeDto.getId()));

        tree.setTitle(treeDto.getTitle());
        tree.setDescription(treeDto.getDescription());
        tree.setLabels(resolveLabels(treeDto.getLabels()));
        tree.setOwners(resolveUsers(treeDto.getOwners()));
        tree.setNodes(mapTreeNodeDtosToEntities(treeDto.getNodes()));

        Tree updatedTree = treeRepository.save(tree);

        log.info("Tree with id: '{}' was updated.", treeDto.getId());

        return treeMapper.toTreeDto(updatedTree);
    }

    @Override
    public void delete(long treeId) {
        treeRepository.deleteById(treeId);

        log.info("Tree with id: '{}' was deleted.", treeId);
    }

    @Override
    public PageableResponse<TreeDto> getAllTreeByUser(String username, Pageable pageable) {
        Page<Tree> trees = treeRepository.findByCreatedBy(username, pageable);

        return PageableResponse.<TreeDto>builder()
                .elements(trees.map(treeMapper::toTreeDto).getContent())
                .page(trees.getNumber())
                .size(trees.getSize())
                .totalElements(trees.getTotalElements())
                .totalPages(trees.getTotalPages())
                .build();
    }

    @Override
    public PageableResponse<TreeDto> getTreeNodeByTitle(String title, Pageable pageable) {
        Page<Tree> trees = treeRepository.findByTitleLike(title, pageable);

        return PageableResponse.<TreeDto>builder()
                .elements(trees.map(treeMapper::toTreeDto).getContent())
                .page(trees.getNumber())
                .size(trees.getSize())
                .totalElements(trees.getTotalElements())
                .totalPages(trees.getTotalPages())
                .build();
    }

    private Set<Label> resolveLabels(Set<LabelDto> labelDtos) {
        return labelDtos.stream()
                .map(dto -> labelRepository.findLabelByLabelKey(dto.getLabelKey())
                        .orElseGet(() -> Label.builder()
                                .labelKey(dto.getLabelKey())
                                .value(dto.getValue())
                                .build()))
                .collect(Collectors.toSet());
    }

    private Set<User> resolveUsers(Set<UserDto> userDtos) {
        return userDtos.stream()
                .map(dto -> userRepository.findByEmail(dto.getEmail())
                        .orElseGet(() -> userRepository.save(User.builder()
                                .firstName(dto.getFirstName())
                                .lastName(dto.getLastName())
                                .email(dto.getEmail())
                                .picture(dto.getPicture())
                                .build())))
                .collect(Collectors.toSet());
    }

    private List<TreeNode> mapTreeNodeDtosToEntities(List<TreeNodeDto> nodeDtos) {
        if (nodeDtos == null) {
            return List.of();
        }

        return nodeDtos.stream().map(dto -> {
            TreeNode nodes = treeNodeMapper.toTreeNodeEntity(dto);
            nodes.setChildren(mapTreeNodeDtosToEntities(dto.getChildren()));
            return nodes;
        }).collect(Collectors.toList());
    }
}
