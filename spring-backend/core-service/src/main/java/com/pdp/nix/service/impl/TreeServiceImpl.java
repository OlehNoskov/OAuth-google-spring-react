package com.pdp.nix.service.impl;

import com.pdp.nix.dto.LabelDto;
import com.pdp.nix.dto.PageableResponse;
import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.mapper.TreeMapper;
import com.pdp.nix.mapper.TreeNodeMapper;
import com.pdp.nix.persistence.entity.Label;
import com.pdp.nix.persistence.entity.Tree;
import com.pdp.nix.persistence.repository.LabelRepository;
import com.pdp.nix.persistence.repository.TreeRepository;
import com.pdp.nix.service.TreeService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class TreeServiceImpl implements TreeService {
    private TreeMapper treeMapper;
    private TreeNodeMapper treeNodeMapper;
    private TreeRepository treeRepository;
    private LabelRepository labelRepository;

    @Override
    public TreeDto create(TreeDto treeDto) {
        List<Label> labels = resolveLabels(treeDto.getLabels());
        Tree treeNode = treeMapper.toTreeEntity(treeDto);
        treeNode.setLabels(labels);
        treeRepository.save(treeNode);

        log.info("Tree with name: '{}' was created.", treeNode.getTitle());

        return treeMapper.toTreeDto(treeNode);
    }

    @Override
    public TreeDto getTreeNodeById(long treeId) {
        Tree tree = treeRepository.findById(treeId).orElseThrow(() -> new RuntimeException("Tree wasn't found by id " + treeId));

        log.info("Get Tree by id: '{}'", treeId);

        return treeMapper.toTreeDto(tree);
    }

    @Override
    @Transactional
    public TreeDto update(TreeDto treeDto) {
        Tree tree = treeRepository.findById(treeDto.getId())
                .orElseThrow(() -> new RuntimeException("Tree wasn't found by id " + treeDto.getId()));

        tree.setTitle(treeDto.getTitle());
        tree.setDescription(treeDto.getDescription());
        tree.setLabels(new ArrayList<>(resolveLabels(treeDto.getLabels())));
        tree.setNodes(new ArrayList<>(treeNodeMapper.toTreeNodeEntities(treeDto.getNodes())));

        Tree updatedTree = treeRepository.save(tree);

        log.info("Tree with id: '{}' was updated.", treeDto.getId());

        return treeMapper.toTreeDto(updatedTree);
    }

    @Override
    public void delete(long treeId) {
        treeRepository.deleteById(treeId);

        log.info("Tree with id: '{}' was deleted.", treeId);
    }

    private List<Label> resolveLabels(List<LabelDto> labelDtos) {
        return labelDtos.stream()
                .map(dto -> labelRepository.findLabelByLabelKey(dto.getLabelKey())
                        .orElseGet(() -> Label.builder()
                                .labelKey(dto.getLabelKey())
                                .value(dto.getValue())
                                .build()))
                .toList();
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
}
