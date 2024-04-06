package org.knightline.service;

import org.knightline.repository.FamilyUpdateRepository;
import org.knightline.repository.entity.FamilyUpdate;
import org.knightline.repository.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/** Service class containing business logic for posting to notifications board
 * Includes functionality for retrieving all updates
 */
@Service
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
    @Transactional //annotation simplifies interaction with DB, handles creation,rollback,closing
    public FamilyUpdate postUpdate(User user, String message) {
        FamilyUpdate update = new FamilyUpdate();
        update.setUser(user);
        update.setBody(message);
        update.setCreatedAt(LocalDateTime.now());
        return familyUpdateRepository.save(update);
    }

    /**
     * Retrieves all family updates from the database, ordered by creation time descending.
     * @return A list of FamilyUpdate entities.
     */
    @Transactional(readOnly = true)
    public List<FamilyUpdate> getAllUpdates() {
        return familyUpdateRepository.findAllByOrderByCreatedAtDesc();
    }
}
