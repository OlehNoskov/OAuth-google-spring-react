package com.pdp.nix.config;

import com.pdp.nix.mapper.TreeMapper;
import com.pdp.nix.mapper.TreeNodeMapper;
import com.pdp.nix.security.mapper.UserMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean
    public UserMapper userMapper() {
        return Mappers.getMapper(UserMapper.class);
    }

    @Bean
    public TreeMapper treeMapper() {
        return Mappers.getMapper(TreeMapper.class);
    }

    @Bean
    public TreeNodeMapper treeNodeMapper() {
        return Mappers.getMapper(TreeNodeMapper.class);
    }
}
