package org.knightline.dto;

import java.time.LocalDateTime;

public class FamilyUpdateDto {
    private String body;
    private UserDto user;
    private LocalDateTime createdAt;
    public FamilyUpdateDto(){}

    public FamilyUpdateDto(String body, UserDto user, LocalDateTime createdAt) {
        this.body = body;
        this.user = user;
        this.createdAt = createdAt;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
