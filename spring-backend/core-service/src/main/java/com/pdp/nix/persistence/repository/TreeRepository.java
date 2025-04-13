package com.pdp.nix.persistence.repository;

import com.pdp.nix.persistence.entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TreeRepository extends JpaRepository<Tree, Long> {

    @Query("SELECT DISTINCT t FROM Tree t JOIN t.labels l WHERE l.labelKey IN :labelKeys")
    List<Tree> findByLabelKeys(@Param("labelKeys") List<String> labelKeys);

    List<Tree> findByCreatedBy(String username);
}
