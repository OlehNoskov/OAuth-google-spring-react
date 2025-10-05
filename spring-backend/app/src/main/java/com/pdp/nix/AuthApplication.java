package com.pdp.nix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.pdp.nix.persistence.repository.jpa", "com.pdp.nix.security.persistence.repository"})
@EnableElasticsearchRepositories(basePackages = "com.pdp.nix.persistence.repository.elasticsearch")
public class AuthApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }
}
