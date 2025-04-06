package com.pdp.nix.persistence.repository;

import com.pdp.nix.persistence.entity.TreeNode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreeNodeRepository extends JpaRepository<TreeNode, Long> {
}
