package org.knightline.service;

import org.knightline.repository.FamilyUpdateRepository;
import org.knightline.repository.entity.FamilyUpdate;
import org.knightline.repository.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

public class FamilyUpdateService {
    private final FamilyUpdateRepository familyUpdateRepository;

    @Autowired
    public FamilyUpdateService(FamilyUpdateRepository familyUpdateRepository) {
        this.familyUpdateRepository = familyUpdateRepository;
    }

    /**
     * Posts a new family update to the database.
     * @param user The user posting the update.
     * @param message The message content of the update.
     * @return The saved FamilyUpdate entity.
     */
    @Transactional
    public FamilyUpdate postUpdate(User user, String message) {
        FamilyUpdate update = new FamilyUpdate();
        update.setUser(user);
        update.setBody(message);
        update.setCreatedAt(LocalDateTime.now());
        return familyUpdateRepository.save(update);
    }





}
