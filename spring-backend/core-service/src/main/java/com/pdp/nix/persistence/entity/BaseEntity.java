package com.pdp.nix.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BaseEntity {
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
}
