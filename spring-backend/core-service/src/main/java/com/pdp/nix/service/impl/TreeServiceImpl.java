package com.pdp.nix.service.impl;

import com.pdp.nix.dto.LabelDto;
import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.mapper.TreeMapper;
import com.pdp.nix.persistence.entity.Label;
import com.pdp.nix.persistence.entity.Tree;
import com.pdp.nix.persistence.repository.LabelRepository;
import com.pdp.nix.persistence.repository.TreeRepository;
import com.pdp.nix.service.TreeService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class TreeServiceImpl implements TreeService {
    private TreeMapper treeMapper;
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
    public List<TreeDto> getTreeNodeByTitle(String title) {
        List<Tree> trees = treeRepository.findByTitleLike(title);

        return treeMapper.toTreeDtoList(trees);
    }

    @Override
    @Transactional
    public TreeDto update(TreeDto treeDto) {
        Tree tree = treeRepository.findById(treeDto.getId())
                .orElseThrow(() -> new RuntimeException("Tree wasn't found by id " + treeDto.getId()));

        // Update fields from treeDto to tree
        tree.setTitle(treeDto.getTitle());
        tree.setDescription(treeDto.getDescription());
        // Update other fields as needed

        Tree updatedTree = treeRepository.save(tree);

        log.info("Tree with id: '{}' was updated.", treeDto.getId());

        return treeMapper.toTreeDto(updatedTree);
    }

    @Override
    public List<TreeDto> getAllTreeByUser(String username) {
        List<Tree> trees = treeRepository.findByCreatedBy(username);
        return treeMapper.toTreeDtoList(trees);
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
}
