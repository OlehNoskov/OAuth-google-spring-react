package com.pdp.nix.persistence.enums;

import java.util.List;

public enum NodeType {
    DEFAULT,
    FLAG,
    LINK;

    public static List<NodeType> getAllTypes() {
        return List.of(NodeType.values());
    }
}
