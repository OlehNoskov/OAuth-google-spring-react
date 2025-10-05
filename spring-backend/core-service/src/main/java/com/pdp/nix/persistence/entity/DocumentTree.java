package com.pdp.nix.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Set;

import static jakarta.persistence.GenerationType.IDENTITY;

@Data
@Builder
@Document(indexName = "tree")
public class DocumentTree {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @Column(name = "created_by")
  private String createdBy;

  private String title;

  private String description;

  private Set<String> labels;
}
