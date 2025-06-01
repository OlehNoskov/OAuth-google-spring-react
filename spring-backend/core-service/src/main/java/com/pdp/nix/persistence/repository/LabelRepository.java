package com.pdp.nix.persistence.repository;

import com.pdp.nix.persistence.entity.Label;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LabelRepository extends JpaRepository<Label, Long> {

    Optional<Label> findLabelByLabelKey(String labelKey);
    List<Label> findAll();
}
