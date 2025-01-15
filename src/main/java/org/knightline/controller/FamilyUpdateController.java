// See the LICENSE file in the root of the repository for license details.
package org.knightline.controller;

import org.knightline.dto.FamilyUpdateDto;
import org.knightline.dto.UserDto;
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
 * These are displayed on a separate page off of the landing page with user and timestamps.
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

    /** Method to post updates to the family message board
     * Principal established via secure login, used for authenticating various API calls.
     * User is found by email (needs editing to fix username/email discrepancy)
     * FamilyUpdateDto used to create FamilyUpdate entity
     * Body, user, time created all set
     *
     *
     * @param familyUpdateDto
     * @param principal
     * @return the update and a 201 if successful
     */

    @PostMapping("/post-update")
    public ResponseEntity<FamilyUpdateDto> postUpdate(@RequestBody FamilyUpdateDto familyUpdateDto, Principal principal) {
        User user = userService.findUserByEmail(principal.getName());
        FamilyUpdate update = familyUpdateService.postUpdate(user, familyUpdateDto.getBody());

        FamilyUpdateDto response = new FamilyUpdateDto();
        response.setBody(update.getBody());
        response.setUser(new UserDto(user.getUserId(), user.getName(), user.getEmail(), user.getProfilePictureUrl()));
        response.setCreatedAt(update.getCreatedAt());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    /** Retrieves all messages posted on the update board which are displayed and persist through each login on the updates page.
     * Calls FamilyUpdateService logic to fetch all updates.
     * Condition checks present in service logic
     * @return all updates
     */

    @GetMapping("/retrieve-all")
    public List<FamilyUpdate> getAllUpdates() {
        return familyUpdateService.getAllUpdates();
    }
}
