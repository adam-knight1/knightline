// See the LICENSE file in the root of the repository for license details.

package org.knightline.controller;

import org.knightline.repository.entity.Photo;
import org.knightline.repository.entity.User;
import org.knightline.service.PhotoService;
import org.knightline.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

//Photo controller class hosting the endpoints for various photo related operations
//Centered around uploading photos into the family album or profile picture functions
@RestController
@RequestMapping("/api/photos")
public class PhotoController {
    @Autowired
    private final PhotoService photoService;
    @Autowired
    private UserService userService;

    Logger log = LoggerFactory.getLogger(PhotoController.class);
    @Autowired
    public PhotoController(PhotoService photoservice) {
        this.photoService = photoservice;
    }

    public PhotoController(PhotoService photoService, UserService userService) { //Adding this constructor to troubleshoot null userService
        this.photoService = photoService;
        this.userService = userService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file, Principal principal) {
        log.info("Received file: {}", file.getOriginalFilename());
        log.info("Principal: {}", principal);

        if (file == null || file.isEmpty()) {
            log.error("File must not be empty.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File must not be empty.");
        }

        if (principal == null || principal.getName() == null) {
            log.error("No authenticated user found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No authenticated user found.");
        }

        try {
            String photoUrl = photoService.uploadPhoto(file, principal.getName());  //todo - The issue could be in initial upload
            log.info("Photo uploaded successfully: {}", photoUrl);
            return ResponseEntity.ok().body(Map.of("url", photoUrl));
        } catch (Exception e) {
            log.error("Error uploading photo", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/upload/profile")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") MultipartFile file, Principal principal) {
        try {
            String photoUrl = photoService.uploadProfilePicture(file, principal.getName());
            return ResponseEntity.ok().body(Map.of("url", photoUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<Photo>> getAllPhotos() {
        try {
            List<Photo> photos = photoService.getAllPhotos();
            return ResponseEntity.ok(photos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    //Method to fetch profile photos for display on login and when posting messages
    @GetMapping("/profile") //todo - Profile photo is not persisting through session termination
    public ResponseEntity<?> getProfilePhoto(Principal principal) {
        try {
            if (principal == null || principal.getName() == null) {
                log.error("No authenticated user found.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No authenticated user found.");
            }

            User user = userService.findUserByEmail(principal.getName());  //todo - check service method, userService is null?
            if (user == null) {
                log.error("User not found for email: {}", principal.getName());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            String profilePhotoUrl = user.getProfilePictureUrl(); //todo - check here as well
            if (profilePhotoUrl == null) {
                log.error("Profile photo not found for user: {}", principal.getName());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile photo not found");
            }

            log.info("Profile photo URL: {}", profilePhotoUrl);
            return ResponseEntity.ok().body(Map.of("url", profilePhotoUrl)); //todo - Let's  check logged URL and see if the issue is here.
        } catch (Exception e) {
            log.error("Error retrieving profile photo", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}


