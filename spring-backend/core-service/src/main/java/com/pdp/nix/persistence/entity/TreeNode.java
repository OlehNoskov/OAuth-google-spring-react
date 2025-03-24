package com.pdp.nix.persistence.entity;

import com.pdp.nix.persistence.enums.NodeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "tree_node")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreeNode {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String title;
    @Column(length = 1000)
    private String description;
    @Enumerated(EnumType.STRING)
    private NodeType type;
}
