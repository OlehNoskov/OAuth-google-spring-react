package com.pdp.nix.persistence.repository.jpa;

import com.pdp.nix.persistence.entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TreeRepository extends JpaRepository<Tree, Long> {

    @Query("SELECT DISTINCT t FROM Tree t JOIN t.labels l WHERE l.labelKey IN :labelKeys")
    List<Tree> findByLabelKeys(@Param("labelKeys") List<String> labelKeys);

    @Query("SELECT t FROM Tree t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :titlePart, '%'))")
    Page<Tree> findByTitleLike(@Param("titlePart") String titlePart, Pageable pageable);
}
