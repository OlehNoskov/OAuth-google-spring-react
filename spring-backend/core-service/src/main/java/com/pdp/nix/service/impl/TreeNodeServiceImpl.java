package com.pdp.nix.service.impl;

import com.pdp.nix.persistence.enums.NodeType;
import com.pdp.nix.service.TreeNodeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreeNodeServiceImpl implements TreeNodeService {

    @Override
    public List<NodeType> getAllNodeTypes() {
        return NodeType.getAllTypes();
    }
}
