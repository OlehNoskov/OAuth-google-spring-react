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

@Table(schema = "labels")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabelEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    @Column(length = 15)
    private String labelKey;
    @Column(length = 15)
    private String value;
}
