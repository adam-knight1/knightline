package org.knightline.controller;

import org.knightline.service.PhotoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Map;

//Photo controller class hosting the endpoints for various photo related operations
//Centered around uploading photos into the family album or profile picture functions
@RestController
@RequestMapping("/photos")
public class PhotoController {
    private final PhotoService photoService;
    Logger log = LoggerFactory.getLogger(PhotoController.class);

    public PhotoController(PhotoService photoservice) {
        this.photoService = photoservice;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file, Principal principal) {
        //principal variable should work to determine logged in user, contrary to local storage.
        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File must not be empty.");
        }
        System.out.println(file);
        System.out.println(principal);
        if (principal == null || principal.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No authenticated user found.");
        }

        try {
            String photoUrl = photoService.uploadPhoto(file, principal.getName());
            return ResponseEntity.ok().body(Map.of("url", photoUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }



/*   @PostMapping("/upload/profile")
   public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal Principal principal) {
       log.info("Received request to upload profile picture for user: {}", principal.getName());
       System.out.println("Reached controller");
       try {
           String photoUrl = photoService.uploadProfilePicture(file, principal.getName());
           log.info("Profile picture uploaded successfully for user: {}. URL: {}", principal.getName(), photoUrl);
           return ResponseEntity.ok().body(Map.of("url", photoUrl));
       } catch (Exception e) {
           log.error("Error uploading profile picture for user: {}", principal.getName(), e);
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }
   }*/

   /* @PostMapping("/upload/profile")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            String email = authentication.getName(); // Get the email from the authenticated user
            String photoUrl = photoService.uploadProfilePicture(file, email);
            return ResponseEntity.ok().body(Map.of("url", photoUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }*/
   @PostMapping("/upload/profile")
   public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") MultipartFile file, Authentication authentication) {
       try {
           String email = authentication.getName();  // This should give the username/email from the token
           String photoUrl = photoService.uploadProfilePicture(file, email);
           return ResponseEntity.ok().body(Map.of("url", photoUrl));
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }
   }
}


