package org.knightline.repository;

import org.knightline.repository.entity.FamilyUpdate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FamilyUpdateRepository extends JpaRepository<FamilyUpdate,Long> {
    List<FamilyUpdate> findAllByOrderByCreatedAtDesc();  //name derived from Spring query derivatives

}
