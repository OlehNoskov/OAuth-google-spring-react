package com.pdp.nix.security.mapper;

import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.persistence.entity.User;
import org.mapstruct.Mapper;

@Mapper()
public interface UserMapper {

    UserDto userToUserDto(User user);
}
