package org.knightline.controller;

import org.knightline.service.PhotoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Map;
@RestController
@RequestMapping("/photos")
public class PhotoController {
    private final PhotoService photoService;

    public PhotoController(PhotoService photoservice) {
        this.photoService = photoservice;
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file, Principal principal) {
        //principal variable should work to determine logged in user, contrary to local storage.

        try {
            String photoUrl = photoService.uploadPhoto(file, principal.getName());
            return ResponseEntity.ok().body(Map.of("url", photoUrl));
        } catch (Exception e) {
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

}

