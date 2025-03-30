package com.pdp.nix.service.impl;

import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.mapper.TreeMapper;
import com.pdp.nix.persistence.entity.Tree;
import com.pdp.nix.persistence.repository.TreeRepository;
import com.pdp.nix.service.TreeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class TreeServiceImpl implements TreeService {
    private TreeMapper treeMapper;
    private TreeRepository treeRepository;

    @Override
    public TreeDto create(TreeDto treeDto) {
        Tree treeNode = treeMapper.toTreeEntity(treeDto);
        treeRepository.save(treeNode);

        log.info("Tree was created: {}", treeNode.getTitle());

        return treeMapper.toTreeDto(treeNode);
    }

    @Override
    public TreeDto getTreeNode(long treeId) {
        Tree tree = treeRepository.findById(treeId).orElseThrow(() -> new RuntimeException("Tree wasn't found by id " + treeId));

        log.info("Get Tree by id: {}", treeId);

        return treeMapper.toTreeDto(tree);
    }

    @Override
    public TreeDto update(TreeDto treeDto) {
        Tree tree = treeRepository.findById(treeDto.getId()).orElseThrow(
                () -> new RuntimeException("Tree wasn't found by id " + treeDto.getId()));

        Tree updatedTree = treeRepository.save(tree);

        log.info("Tree with id: {} was updated.", treeDto.getId());

        return treeMapper.toTreeDto(updatedTree);
    }

    @Override
    public void delete(long treeId) {
        treeRepository.deleteById(treeId);

        log.info("Tree with id: {} was deleted.", treeId);
    }
}
