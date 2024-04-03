package org.knightline.repository;

import org.knightline.repository.entity.FamilyUpdate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyUpdateRepository extends JpaRepository<FamilyUpdate,Long> {
    List<FamilyUpdate> findAllByOrderByCreatedAtDesc


}
