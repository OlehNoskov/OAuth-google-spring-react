package com.pdp.nix.security.persistence.entity;

import java.util.Arrays;
import java.util.List;

public enum UserRole {
  OWNER,
  VIEWER,
  EDITOR;

  public static List<String> getRoles() {
    return Arrays.stream(UserRole.values())
            .map(Enum::name)
            .toList();
  }
}
