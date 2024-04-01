package org.knightline.repository.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;


//entity for storing user data in postgres
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type = "uuid-char")
    @Column(name = "user_id", updatable = false, nullable = false)
    private UUID userId;

    @Column(nullable = false, length = 120)
    @NotEmpty(message = "Name is required")
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @Column(nullable = false)
    @NotEmpty(message = "Password is required")
    private String password; // This should be encoded

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
