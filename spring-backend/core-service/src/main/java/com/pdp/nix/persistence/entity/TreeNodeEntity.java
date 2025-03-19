package com.pdp.nix.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@Table(schema = "tree_node")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreeNodeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    @Column(length = 255)
    private String title;
    @Column(length = 1000)
    private String description;
    private String type;
}
