package com.pdp.nix.security.mapper;

import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.persistence.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    UserDto userToUserDto(User user);
    List<UserDto> toListUserDto(List<User> users);
}
