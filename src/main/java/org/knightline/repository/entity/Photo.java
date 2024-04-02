package org.knightline.repository.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

//photo entity class used to interact with AWS S3 photo bucket for upload and accessing photos
@Entity
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String s3ObjectKey;
    private String url;     // The URL to access the photo. Could be derived from S3 directly but faster to save
    private LocalDateTime uploadTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; //keeping many to one relationship (one user can have many photos)

    public Photo(){}

    public Photo(String title, String description, String s3ObjectKey,User user) {
        this.title = title;
        this.description = description;
        this.s3ObjectKey = s3ObjectKey;
        this.uploadTime = LocalDateTime.now();
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getS3ObjectKey() {
        return s3ObjectKey;
    }

    public void setS3ObjectKey(String s3ObjectKey) {
        this.s3ObjectKey = s3ObjectKey;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LocalDateTime getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(LocalDateTime uploadTime) {
        this.uploadTime = uploadTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
