package com.pdp.nix.controller;

import com.pdp.nix.persistence.enums.NodeType;
import com.pdp.nix.service.TreeNodeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TreeNodeControllerTest {

    @Mock
    private TreeNodeService treeNodeService;

    @InjectMocks
    private TreeNodeController treeNodeController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(treeNodeController).build();
    }

    @Test
    void shouldReturnAllNodeTypes() throws Exception {
        List<NodeType> nodeTypes = Arrays.asList(
                NodeType.DEFAULT,
                NodeType.FLAG,
                NodeType.LINK
        );

        when(treeNodeService.getAllNodeTypes()).thenReturn(nodeTypes);

        mockMvc.perform(get("/tree-node/types/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0]", is("DEFAULT")))
                .andExpect(jsonPath("$[1]", is("FLAG")))
                .andExpect(jsonPath("$[2]", is("LINK")));

        verify(treeNodeService).getAllNodeTypes();
    }

    @Test
    void shouldReturnEmptyListWhenNoNodeTypesExist() throws Exception {
        when(treeNodeService.getAllNodeTypes()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/tree-node/types/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        verify(treeNodeService).getAllNodeTypes();
    }

    @Test
    void shouldReturnSingleNodeType() throws Exception {
        List<NodeType> nodeTypes = Collections.singletonList(NodeType.DEFAULT);

        when(treeNodeService.getAllNodeTypes()).thenReturn(nodeTypes);

        mockMvc.perform(get("/tree-node/types/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0]", is("DEFAULT")));

        verify(treeNodeService).getAllNodeTypes();
    }

    @Test
    void shouldReturnNodeTypesInSpecificOrder() throws Exception {
        List<NodeType> nodeTypes = Arrays.asList(
                NodeType.FLAG,
                NodeType.LINK,
                NodeType.DEFAULT
        );

        when(treeNodeService.getAllNodeTypes()).thenReturn(nodeTypes);

        mockMvc.perform(get("/tree-node/types/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0]", is("FLAG")))
                .andExpect(jsonPath("$[1]", is("LINK")))
                .andExpect(jsonPath("$[2]", is("DEFAULT")));

        verify(treeNodeService).getAllNodeTypes();
    }

    @Test
    void shouldReturnMultipleNodeTypesWithDuplicates() throws Exception {
        List<NodeType> nodeTypes = Arrays.asList(
                NodeType.DEFAULT,
                NodeType.DEFAULT,
                NodeType.FLAG
        );

        when(treeNodeService.getAllNodeTypes()).thenReturn(nodeTypes);

        mockMvc.perform(get("/tree-node/types/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0]", is("DEFAULT")))
                .andExpect(jsonPath("$[1]", is("DEFAULT")))
                .andExpect(jsonPath("$[2]", is("FLAG")));

        verify(treeNodeService).getAllNodeTypes();
    }

    @Test
    void shouldReturnLinkNodeType() throws Exception {
        List<NodeType> nodeTypes = Collections.singletonList(NodeType.LINK);

        when(treeNodeService.getAllNodeTypes()).thenReturn(nodeTypes);

        mockMvc.perform(get("/tree-node/types/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0]", is("LINK")));

        verify(treeNodeService).getAllNodeTypes();
    }

    @Test
    void shouldReturnFlagNodeType() throws Exception {
        List<NodeType> nodeTypes = Collections.singletonList(NodeType.FLAG);

        when(treeNodeService.getAllNodeTypes()).thenReturn(nodeTypes);

        mockMvc.perform(get("/tree-node/types/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0]", is("FLAG")));

        verify(treeNodeService).getAllNodeTypes();
    }
}

