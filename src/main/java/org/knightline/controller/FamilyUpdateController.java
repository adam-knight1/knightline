package org.knightline.controller;

import org.knightline.dto.FamilyUpdateDto;
import org.knightline.repository.entity.FamilyUpdate;
import org.knightline.repository.entity.User;
import org.knightline.service.FamilyUpdateService;
import org.knightline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**Controller class that defines various endpoints related to creating, editing, and deleting family notification updates
 */
@RestController
@RequestMapping("/updates")
public class FamilyUpdateController {
    @Autowired
    private final FamilyUpdateService familyUpdateService;
    private final UserService userService;

    public FamilyUpdateController(FamilyUpdateService familyUpdateService,UserService userService) {
        this.familyUpdateService = familyUpdateService;
        this.userService = userService;
    }

    /** Method to post updates to the family messageboard
     *
     * @param familyUpdateDto
     * @param principal
     * @return the update and a 201 if successful
     */

    //todo - change to use FamilyUpdateDto

    @PostMapping("/post-update")
    public ResponseEntity<FamilyUpdate> postUpdate(@RequestBody FamilyUpdateDto familyUpdateDto, Principal principal) {
        User user = userService.findUserByEmail(principal.getName());
        FamilyUpdate update = familyUpdateService.postUpdate(user,familyUpdateDto.getMessage());
        return new ResponseEntity<>(update, HttpStatus.CREATED);
    }

    /** Retrieves all messages posted on the update board, to be displayed on the front end
     *
     * @return all updates
     */

    //todo - decide how many I want to render once I start hacking the front end together

    @GetMapping("/retrieve-all")
    public List<FamilyUpdate> getAllUpdates() {
        return familyUpdateService.getAllUpdates();
    }
}
