package org.knightline.repository.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="calender_events")
public class CalenderEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.EAGER) //using eager fetch pending switch to dtos, same as FamilyUpdate
    @JoinColumn(name = "user_id", nullable = false)
    private User user;





}
