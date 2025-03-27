package com.pdp.nix.persistence.entity;

import com.pdp.nix.persistence.enums.NodeType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Column(nullable = false)
    private int depth;

    @Enumerated(EnumType.STRING)
    private NodeType type;

    @ManyToOne(targetEntity = Tree.class, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "ancestor", nullable = false, foreignKey = @ForeignKey(name = "ancestor_fk"))
    private Tree ancestor;

    @ManyToOne(targetEntity = Tree.class, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "descendant", nullable = false, foreignKey = @ForeignKey(name = "descendant_fk"))
    private Tree descendant;
}
