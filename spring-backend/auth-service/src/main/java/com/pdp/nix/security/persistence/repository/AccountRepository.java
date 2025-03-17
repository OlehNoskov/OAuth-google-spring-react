package com.pdp.nix.security.persistence.repository;

import com.pdp.nix.security.persistence.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByEmail(String email);
}
