package com.pdp.nix.controller;

import com.pdp.nix.dto.PageableResponse;
import com.pdp.nix.dto.TreeDto;
import com.pdp.nix.persistence.entity.DocumentTree;
import com.pdp.nix.service.TreeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TreeControllerTest {

    @Mock
    private TreeService treeService;

    @InjectMocks
    private TreeController treeController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(treeController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldCreateNewTree() throws Exception {
        TreeDto inputTree = TreeDto.builder()
                .title("My Tree")
                .description("A sample tree")
                .createdBy("user@example.com")
                .build();
        TreeDto createdTree = TreeDto.builder()
                .id(1L)
                .title("My Tree")
                .description("A sample tree")
                .createdBy("user@example.com")
                .build();

        when(treeService.create(any(TreeDto.class))).thenReturn(createdTree);

        mockMvc.perform(post("/tree/create")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(inputTree)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("My Tree")))
                .andExpect(jsonPath("$.description", is("A sample tree")))
                .andExpect(jsonPath("$.createdBy", is("user@example.com")));

        verify(treeService).create(any(TreeDto.class));
    }

    @Test
    void shouldRetrieveTreeById() throws Exception {
        TreeDto tree = TreeDto.builder()
                .id(1L)
                .title("Test Tree")
                .description("Test Description")
                .build();

        when(treeService.getTreeNodeById(1L)).thenReturn(tree);

        mockMvc.perform(get("/tree/get/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("Test Tree")))
                .andExpect(jsonPath("$.description", is("Test Description")));

        verify(treeService).getTreeNodeById(1L);
    }

    @Test
    void shouldUpdateExistingTree() throws Exception {
        TreeDto inputTree = TreeDto.builder()
                .id(1L)
                .title("Updated Tree")
                .description("Updated Description")
                .build();
        TreeDto updatedTree = TreeDto.builder()
                .id(1L)
                .title("Updated Tree")
                .description("Updated Description")
                .build();

        when(treeService.update(any(TreeDto.class))).thenReturn(updatedTree);

        mockMvc.perform(put("/tree/update")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(inputTree)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("Updated Tree")))
                .andExpect(jsonPath("$.description", is("Updated Description")));

        verify(treeService).update(any(TreeDto.class));
    }

    @Test
    void shouldDeleteTreeById() throws Exception {
        mockMvc.perform(delete("/tree/delete/1"))
                .andExpect(status().isOk());

        verify(treeService).delete(1L);
    }

    @Test
    void shouldRetrieveAllTreesByUsername() throws Exception {
        List<DocumentTree> trees = Arrays.asList(
                DocumentTree.builder().id("1").title("Tree 1").createdBy("user1").build(),
                DocumentTree.builder().id("2").title("Tree 2").createdBy("user1").build()
        );
        PageableResponse<DocumentTree> response = PageableResponse.<DocumentTree>builder()
                .elements(trees)
                .page(0)
                .size(10)
                .totalElements(2L)
                .totalPages(1)
                .build();

        when(treeService.getAllTreeByUser(anyString(), any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get("/tree/get-all/user1")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.elements", hasSize(2)))
                .andExpect(jsonPath("$.elements[0].title", is("Tree 1")))
                .andExpect(jsonPath("$.elements[1].title", is("Tree 2")))
                .andExpect(jsonPath("$.page", is(0)))
                .andExpect(jsonPath("$.size", is(10)))
                .andExpect(jsonPath("$.totalElements", is(2)))
                .andExpect(jsonPath("$.totalPages", is(1)));

        verify(treeService).getAllTreeByUser(anyString(), any(Pageable.class));
    }

    @Test
    void shouldRetrieveAllTreesByUsernameWithDefaultPagination() throws Exception {
        List<DocumentTree> trees = Collections.singletonList(
                DocumentTree.builder().id("1").title("Tree 1").createdBy("user1").build()
        );
        PageableResponse<DocumentTree> response = PageableResponse.<DocumentTree>builder()
                .elements(trees)
                .page(0)
                .size(10)
                .totalElements(1L)
                .totalPages(1)
                .build();

        when(treeService.getAllTreeByUser(anyString(), any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get("/tree/get-all/user1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.elements", hasSize(1)))
                .andExpect(jsonPath("$.page", is(0)))
                .andExpect(jsonPath("$.size", is(10)));

        verify(treeService).getAllTreeByUser(anyString(), any(Pageable.class));
    }

    @Test
    void shouldRetrieveAllTreesWithOwnerRole() throws Exception {
        List<DocumentTree> trees = Arrays.asList(
                DocumentTree.builder().id("1").title("Tree 1").build(),
                DocumentTree.builder().id("2").title("Tree 2").build(),
                DocumentTree.builder().id("3").title("Tree 3").build()
        );
        PageableResponse<DocumentTree> response = PageableResponse.<DocumentTree>builder()
                .elements(trees)
                .page(0)
                .size(10)
                .totalElements(3L)
                .totalPages(1)
                .build();

        when(treeService.getAllTrees(any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get("/tree/get-all")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.elements", hasSize(3)))
                .andExpect(jsonPath("$.totalElements", is(3)))
                .andExpect(jsonPath("$.totalPages", is(1)));

        verify(treeService).getAllTrees(any(Pageable.class));
    }

    @Test
    void shouldRetrieveAllTreesWithDefaultPagination() throws Exception {
        List<DocumentTree> trees = Collections.emptyList();
        PageableResponse<DocumentTree> response = PageableResponse.<DocumentTree>builder()
                .elements(trees)
                .page(0)
                .size(10)
                .totalElements(0L)
                .totalPages(0)
                .build();

        when(treeService.getAllTrees(any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get("/tree/get-all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.elements", hasSize(0)))
                .andExpect(jsonPath("$.totalElements", is(0)))
                .andExpect(jsonPath("$.totalPages", is(0)));

        verify(treeService).getAllTrees(any(Pageable.class));
    }

    @Test
    void shouldReturnEmptyListWhenNoTreesExistForUser() throws Exception {
        PageableResponse<DocumentTree> response = PageableResponse.<DocumentTree>builder()
                .elements(Collections.emptyList())
                .page(0)
                .size(10)
                .totalElements(0L)
                .totalPages(0)
                .build();

        when(treeService.getAllTreeByUser(anyString(), any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get("/tree/get-all/unknownUser"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.elements", hasSize(0)))
                .andExpect(jsonPath("$.totalElements", is(0)));

        verify(treeService).getAllTreeByUser(anyString(), any(Pageable.class));
    }

    @Test
    void shouldHandleMultiplePageRequests() throws Exception {
        List<DocumentTree> page1Trees = Collections.singletonList(
                DocumentTree.builder().id("1").title("Tree 1").build()
        );
        PageableResponse<DocumentTree> page1Response = PageableResponse.<DocumentTree>builder()
                .elements(page1Trees)
                .page(0)
                .size(1)
                .totalElements(2L)
                .totalPages(2)
                .build();

        List<DocumentTree> page2Trees = Collections.singletonList(
                DocumentTree.builder().id("2").title("Tree 2").build()
        );
        PageableResponse<DocumentTree> page2Response = PageableResponse.<DocumentTree>builder()
                .elements(page2Trees)
                .page(1)
                .size(1)
                .totalElements(2L)
                .totalPages(2)
                .build();

        when(treeService.getAllTrees(PageRequest.of(0, 1))).thenReturn(page1Response);
        when(treeService.getAllTrees(PageRequest.of(1, 1))).thenReturn(page2Response);

        mockMvc.perform(get("/tree/get-all")
                .param("page", "0")
                .param("size", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page", is(0)));

        mockMvc.perform(get("/tree/get-all")
                .param("page", "1")
                .param("size", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page", is(1)));

        verify(treeService, times(2)).getAllTrees(any(Pageable.class));
    }

    @Test
    void shouldCreateTreeWithAllFields() throws Exception {
        TreeDto inputTree = TreeDto.builder()
                .title("Complete Tree")
                .description("Complete Description")
                .createdBy("user@example.com")
                .labels(new HashSet<>())
                .owners(new HashSet<>())
                .nodes(Collections.emptyList())
                .build();
        TreeDto createdTree = TreeDto.builder()
                .id(2L)
                .title("Complete Tree")
                .description("Complete Description")
                .createdBy("user@example.com")
                .labels(new HashSet<>())
                .owners(new HashSet<>())
                .nodes(Collections.emptyList())
                .build();

        when(treeService.create(any(TreeDto.class))).thenReturn(createdTree);

        mockMvc.perform(post("/tree/create")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(inputTree)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(2)))
                .andExpect(jsonPath("$.title", is("Complete Tree")));

        verify(treeService).create(any(TreeDto.class));
    }
}

