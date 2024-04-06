package org.knightline.repository.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

/** this is the entity that will be used for the notification structure
 * to be displayed in the family updates notification module after user login
 */

@Entity
@Table(name = "family_updates")
public class FamilyUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String body;

    @ManyToOne(fetch = FetchType.LAZY) //lazy fetch will only get user from DB if needed in code
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    //getters + setters below

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
