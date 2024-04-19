package org.knightline.repository.entity;

import javax.persistence.*;
import java.time.ZonedDateTime;

/** This class defines the calendar event entity which interacts with the calendar event postgres table.
 * Events will be fetched from the DB and displayed on a calendar GUI on the front end upon request
 * Variables include an event id, a title, an event description, the time the event was created, and the actual event time.
 */

@Entity
@Table(name="calendar_events")
public class CalendarEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false, length = 1000)
    private String description;
    @Column(nullable = false)
    private ZonedDateTime createdAt;
    @Column(nullable = false)
    private ZonedDateTime eventTime;
    @ManyToOne(fetch = FetchType.EAGER) //using eager fetch pending switch to dtos, same as FamilyUpdate, lazy causing issues
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(ZonedDateTime eventTime) {
        this.eventTime = eventTime;
    }
}
