package com.pdp.nix.service;

import com.pdp.nix.persistence.enums.NodeType;

import java.util.List;

public interface TreeNodeService {

    List<NodeType> getAllNodeTypes();
}
