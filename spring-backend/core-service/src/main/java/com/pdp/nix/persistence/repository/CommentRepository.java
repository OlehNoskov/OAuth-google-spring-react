package com.pdp.nix.persistence.repository;

import com.pdp.nix.persistence.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findCommentByUserId(String userId);
}
