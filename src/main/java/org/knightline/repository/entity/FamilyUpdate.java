package org.knightline.repository.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "familyupdates")
public class FamilyUpdate {

    //body
    //author
    //message
    //created at

    private String body;
    private String author;
}
