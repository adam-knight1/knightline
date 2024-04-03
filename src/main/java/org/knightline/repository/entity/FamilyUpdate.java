package org.knightline.repository.entity;

import javax.persistence.*;

@Entity
@Table(name = "family_updates")
public class FamilyUpdate {

    //body
    //author
    //message
    //created at

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String body;
    private String author;
}
