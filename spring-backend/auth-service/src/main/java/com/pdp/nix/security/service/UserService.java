package com.pdp.nix.security.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.cloud.resourcemanager.v3.ProjectsClient;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import com.pdp.nix.security.dto.TokenRequestDto;
import com.pdp.nix.security.dto.UserDto;
import com.pdp.nix.security.mapper.UserMapper;
import com.pdp.nix.security.persistence.entity.User;
import com.pdp.nix.security.persistence.entity.UserRole;
import com.pdp.nix.security.persistence.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

import static com.pdp.nix.security.persistence.entity.UserRole.getRoles;

@Slf4j
@Service
public class UserService {

  private final GoogleIdTokenVerifier verifier;
  private final UserRepository userRepository;
  private final UserMapper userMapper;
  @Value("${google.project-id}")
  private String projectId;

  public UserService(@Value("${spring.security.oauth2.client.registration.google.client-id}") String clientId, UserRepository userRepository, UserMapper userMapper) {
    NetHttpTransport transport = new NetHttpTransport();
    this.verifier = new GoogleIdTokenVerifier.Builder(transport, new GsonFactory())
            .setAudience(Collections.singletonList(clientId)).build();
    this.userRepository = userRepository;
    this.userMapper = userMapper;

  }

  public UserDto loginOAuthGoogle(TokenRequestDto requestBody) {
    User user = verifyIdToken(requestBody.getToken());
    if (user == null) {
      throw new IllegalArgumentException();
    }
    user.setRole(getUserRole(user.getEmail()));

    return userMapper.userToUserDto(createOrUpdateUser(user));
  }

  private User verifyIdToken(String idToken) {
    try {
      GoogleIdToken idTokenObj = verifier.verify(idToken);
      if (idTokenObj == null) {
        return null;
      }
      GoogleIdToken.Payload payload = idTokenObj.getPayload();
      String firstName = (String) payload.get("given_name");
      String lastName = (String) payload.get("family_name");
      String picture = (String) payload.get("picture");
      String email = payload.getEmail();

      return User.builder()
              .firstName(firstName)
              .lastName(lastName)
              .email(email)
              .picture(picture)
              .build();

    } catch (GeneralSecurityException e) {
      log.warn("General security exception: {}", e.getMessage());
      throw new IllegalArgumentException();
    } catch (IOException e) {
      log.warn("Error verifying ID token: {}", e.getMessage());
      throw new RuntimeException(e);
    }
  }

  public User createOrUpdateUser(User user) {
    return userRepository.findByEmail(user.getEmail())
            .map(existingUser -> {
              existingUser.setFirstName(user.getFirstName());
              existingUser.setLastName(user.getLastName());
              existingUser.setPicture(user.getPicture());
              existingUser.setRole(user.getRole());

              log.info("User with id {} was updated.", user.getId());
              return userRepository.save(existingUser);
            })
            .orElseGet(() -> {
              log.info("Creating new user with email: {}", user.getEmail());
              return userRepository.save(user);
            });
  }

  public List<UserDto> getAllUsers() {
    return userMapper.toListUserDto(userRepository.findAll());
  }


  public UserRole getUserRole(String userEmail) {
    try (ProjectsClient projectsClient = ProjectsClient.create()) {
      GetIamPolicyRequest request = GetIamPolicyRequest.newBuilder()
              .setResource("projects/" + projectId)
              .build();

      Policy policy = projectsClient.getIamPolicy(request);

      return policy.getBindingsList().stream()
              .filter(binding -> isContainsEmail(binding.getMembersList(), userEmail))
              .map(binding -> {
                String role = getRole(binding.getRole()).toUpperCase();
                return getRoles().contains(role) ? UserRole.valueOf(role) : UserRole.VIEWER;
              })
              .findFirst()
              .orElse(UserRole.VIEWER);
    } catch (Exception e) {
      log.error("Error getting user role from Google Cloud IAM: {}", e.getMessage());
      throw new RuntimeException(e);
    }
  }

  private boolean isContainsEmail(List<String> members, String email) {
    return members.stream().anyMatch(member -> member.equals("user:" + email));
  }

  private String getRole(String userRole) {
    return userRole.split("/")[1];
  }
}
