package org.knightline.repository.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String s3ObjectKey;

    // The URL to access the photo. Could be derived from S3 directly but faster to save
    private String url;

    private LocalDateTime uploadTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; //keeping many to one relationship (one user can have many photos)

}
