package com.pdp.nix.service.impl;

import com.pdp.nix.dto.LabelDto;
import com.pdp.nix.dto.PageableResponse;
import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.dto.TreeNodeDto;
import com.pdp.nix.mapper.TreeMapper;
import com.pdp.nix.mapper.TreeNodeMapper;
import com.pdp.nix.persistence.entity.DocumentTree;
import com.pdp.nix.persistence.entity.Label;
import com.pdp.nix.persistence.entity.Tree;
import com.pdp.nix.persistence.entity.TreeNode;
import com.pdp.nix.persistence.repository.elasticsearch.TreeElasticSearchRepository;
import com.pdp.nix.persistence.repository.jpa.LabelRepository;
import com.pdp.nix.persistence.repository.jpa.TreeRepository;
import com.pdp.nix.service.TreeService;
import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.persistence.entity.User;
import com.pdp.nix.security.persistence.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
    private TreeElasticSearchRepository treeElasticSearchRepository;

    @Override
    public TreeDto create(TreeDto treeDto) {
        Set<Label> labels = resolveLabels(treeDto.getLabels());
        Set<User> owners = resolveUsers(treeDto.getOwners());
        Tree tree = treeMapper.toTreeEntity(treeDto);
        tree.setLabels(labels);
        tree.setOwners(owners);

        Tree createdTree = treeRepository.save(tree);
        treeElasticSearchRepository.save(treeMapper.toDocumentTree(createdTree));

        log.info("Tree with name: '{}' was created.", tree.getTitle());

        return treeMapper.toTreeDto(tree);
    }

    @Override
    public TreeDto getTreeNodeById(long treeId) {
        Tree tree = getTreeByIdByOwner(treeId);

        return treeMapper.toTreeDto(tree);
    }

    @Override
    @Transactional
    public TreeDto update(TreeDto treeDto) {
        Tree tree = getTreeByIdByOwner(treeDto.getId());

        if (tree.getOwners() == null || tree.getOwners().isEmpty()) {
          return treeMapper.toTreeDto(tree);
        }

        tree.setTitle(treeDto.getTitle());
        tree.setDescription(treeDto.getDescription());
        tree.setLabels(resolveLabels(treeDto.getLabels()));
        tree.setOwners(resolveUsers(treeDto.getOwners()));
        tree.setNodes(mapTreeNodeDtosToEntities(treeDto.getNodes()));

        Tree updatedTree = treeRepository.save(tree);
        treeElasticSearchRepository.save(treeMapper.toDocumentTree(updatedTree));

        log.info("Tree with id: '{}' was updated.", treeDto.getId());

        return treeMapper.toTreeDto(updatedTree);
    }

    @Override
    public void delete(long treeId) {
      Tree tree = getTreeByIdByOwner(treeId);
        if (tree.getOwners() == null || tree.getOwners().isEmpty()) {
            throw new RuntimeException("You don't have permissions to delete this tree by id " + treeId);
        }

      treeRepository.deleteById(treeId);
      treeElasticSearchRepository.deleteById(treeId);

        log.info("Tree with id: '{}' was deleted.", treeId);
    }

    @Override
    public PageableResponse<DocumentTree> getAllTreeByUser(String username, Pageable pageable) {
      return getPageableResponse(treeElasticSearchRepository.findByCreatedBy(username, pageable));
    }

  @Override
  public PageableResponse<DocumentTree> getAllTrees(Pageable pageable) {
    return getPageableResponse(treeElasticSearchRepository.findAll(pageable));
  }


  private PageableResponse<DocumentTree> getPageableResponse(Page<DocumentTree> trees) {
    return PageableResponse.<DocumentTree>builder()
            .elements(trees.getContent())
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

    private Tree getTreeByIdByOwner(long treeId) {
      Tree tree = treeRepository.findById(treeId).orElseThrow(() -> new RuntimeException("Tree wasn't found by id " + treeId));
      Set<String> owners = tree.getOwners().stream()
              .map(User::getEmail)
              .collect(Collectors.toSet());

      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String currentPrincipalName = authentication.getName();

      Optional<String> currentOwner = owners.stream().filter(owner -> owner.equals(currentPrincipalName)).findFirst();

      if (currentOwner.isPresent()) {
        return tree;
      }

      return Tree.builder()
              .title("")
              .description("")
              .nodes(List.of())
              .labels(Set.of())
              .build();
    }
}
