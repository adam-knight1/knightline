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
     *
     * @param familyUpdateDto
     * @param principal
     * @return the update and a 201 if successful
     */

    //todo - change to use FamilyUpdateDto

    @PostMapping("/post-update")
    public ResponseEntity<FamilyUpdateDto> postUpdate(@RequestBody FamilyUpdateDto familyUpdateDto, Principal principal) {
        User user = userService.findUserByEmail(principal.getName());
        familyUpdateService.postUpdate(user,familyUpdateDto.getBody()); //removed unused FamilyUpdate variable to catch response, using dto instead

        FamilyUpdateDto response = new FamilyUpdateDto();
        response.setBody(familyUpdateDto.getBody());
        response.setUser(new UserDto(user.getUserId(),user.getName(), user.getEmail(),user.getProfilePictureUrl()));
        response.setCreatedAt(familyUpdateDto.getCreatedAt());

        return new ResponseEntity<>(HttpStatus.CREATED);
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
