package com.pdp.nix.service.impl;

import com.pdp.nix.dto.LabelDto;
import com.pdp.nix.mapper.LabelMapper;
import com.pdp.nix.persistence.repository.jpa.LabelRepository;
import com.pdp.nix.service.LabelService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LabelServiceImpl implements LabelService {

    private final LabelRepository labelRepository;
    private final LabelMapper labelMapper;

    @Override
    public List<LabelDto> getAllLabels() {
        return labelMapper.toLabelDto(labelRepository.findAll());
    }
}
