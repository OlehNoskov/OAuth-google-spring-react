package com.pdp.nix.mapper;

import com.pdp.nix.dto.LabelDto;
import com.pdp.nix.persistence.entity.Label;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface LabelMapper {

    Label toLabel(LabelDto labelDto);

    LabelDto toLabelDto(Label label);

    List<LabelDto> toLabelDto(List<Label> labels);

    List<Label> toLabels(List<LabelDto> labelDto);
}
