package org.knightline.controller;

import org.knightline.dto.FamilyUpdateDto;
import org.knightline.repository.entity.FamilyUpdate;
import org.knightline.service.FamilyUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**Controller class that defines various endpoints related to creating, editing, and deleting
 * family notification updates
 */
public class FamilyUpdateController {
    @Autowired
    private final FamilyUpdateService familyUpdateService;

    public FamilyUpdateController(FamilyUpdateService familyUpdateService) {
        this.familyUpdateService = familyUpdateService;
    }

    @PostMapping
    public ResponseEntity<FamilyUpdate> postUpdate(@RequestBody FamilyUpdateDto familyUpdateDto) {


    }
}
