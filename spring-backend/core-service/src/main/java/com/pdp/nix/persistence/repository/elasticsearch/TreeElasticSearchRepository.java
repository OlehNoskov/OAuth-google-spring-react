package com.pdp.nix.persistence.repository.elasticsearch;

import com.pdp.nix.persistence.entity.DocumentTree;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface TreeElasticSearchRepository extends ElasticsearchRepository<DocumentTree, Long> {
  Page<DocumentTree> findByOwners(String createdBy, Pageable pageable);
}
