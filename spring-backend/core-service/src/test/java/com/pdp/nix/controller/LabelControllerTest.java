package com.pdp.nix.controller;

import com.pdp.nix.dto.LabelDto;
import com.pdp.nix.service.LabelService;
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
class LabelControllerTest {

    @Mock
    private LabelService labelService;

    @InjectMocks
    private LabelController labelController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(labelController).build();
    }

    @Test
    void shouldReturnAllLabels() throws Exception {
        LabelDto label1 = LabelDto.builder()
                .labelKey("color")
                .value("red")
                .build();
        LabelDto label2 = LabelDto.builder()
                .labelKey("priority")
                .value("high")
                .build();
        List<LabelDto> labels = Arrays.asList(label1, label2);

        when(labelService.getAllLabels()).thenReturn(labels);

        mockMvc.perform(get("/label/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].labelKey", is("color")))
                .andExpect(jsonPath("$[0].value", is("red")))
                .andExpect(jsonPath("$[1].labelKey", is("priority")))
                .andExpect(jsonPath("$[1].value", is("high")));

        verify(labelService).getAllLabels();
    }

    @Test
    void shouldReturnEmptyListWhenNoLabelsExist() throws Exception {
        when(labelService.getAllLabels()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/label/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        verify(labelService).getAllLabels();
    }

    @Test
    void shouldReturnSingleLabel() throws Exception {
        LabelDto label = LabelDto.builder()
                .labelKey("category")
                .value("documentation")
                .build();
        List<LabelDto> labels = Collections.singletonList(label);

        when(labelService.getAllLabels()).thenReturn(labels);

        mockMvc.perform(get("/label/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].labelKey", is("category")))
                .andExpect(jsonPath("$[0].value", is("documentation")));

        verify(labelService).getAllLabels();
    }

    @Test
    void shouldReturnMultipleLabelsPreservingOrder() throws Exception {
        List<LabelDto> labels = Arrays.asList(
                LabelDto.builder().labelKey("key1").value("value1").build(),
                LabelDto.builder().labelKey("key2").value("value2").build(),
                LabelDto.builder().labelKey("key3").value("value3").build()
        );

        when(labelService.getAllLabels()).thenReturn(labels);

        mockMvc.perform(get("/label/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].labelKey", is("key1")))
                .andExpect(jsonPath("$[1].labelKey", is("key2")))
                .andExpect(jsonPath("$[2].labelKey", is("key3")));

        verify(labelService).getAllLabels();
    }
}

