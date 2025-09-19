package com.pdp.nix.security.mapper;

import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.persistence.entity.User;
import com.pdp.nix.security.persistence.entity.UserRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper
public interface UserMapper {

  @Mapping(target = "role", source = "user", qualifiedByName = "mapRole")
  UserDto userToUserDto(User user);
  List<UserDto> toListUserDto(List<User> users);

  @Named("mapRole")
  default UserRole mapRole(User user) {
    return user != null && user.getRole() != null ? user.getRole() : UserRole.VIEWER;
  }
}
