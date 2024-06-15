package org.knightline.dto;

import java.util.UUID;

public class UserDto {
    private UUID userId;
    private String name;
    private String email;
    private String profilePictureUrl;

    public UserDto(UUID userId, String name, String email, String profilePictureUrl) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.profilePictureUrl = profilePictureUrl;
    }

    // Getters and setters
    public UUID getUserId() {
        return userId;
    }
    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

}

