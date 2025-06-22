package com.pdp.nix.persistence.entity;

import com.pdp.nix.security.persistence.entity.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "tree")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tree {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    @Column(name = "created_by")
    private String createdBy;

    @CreationTimestamp
    @Column(name = "created_date")
    private OffsetDateTime createdDate;

    @Column(name = "last_updated_by")
    private String lastUpdatedBy;

    @UpdateTimestamp
    @Column(name = "last_updated_date")
    private OffsetDateTime lastUpdatedDate;

    private String title;

    @Column(length = 1000)
    private String description;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Label> labels;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Column(nullable = false)
    private Set<User> owners;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<TreeNode> nodes;

}
