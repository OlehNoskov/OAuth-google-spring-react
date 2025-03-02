package com.pdp.nix.security.persistence.repository;

import com.pdp.nix.security.persistence.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
