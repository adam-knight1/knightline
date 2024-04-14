package org.knightline.repository.entity;

import javax.persistence.*;

@Entity
@Table(name="calender_events")
public class CalenderEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;





}
