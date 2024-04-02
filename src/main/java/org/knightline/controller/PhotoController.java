package org.knightline.controller;

import org.knightline.service.PhotoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Map;

public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoservice) {
        this.photoService = photoservice;
    }

    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file, Principal principal) {
        //principal variable should work to determine logged in user, contrary to local storage.

        try {
            String photoUrl = photoService.uploadPhoto(file, prinicipal.getName);
            return ResponseEntity.ok().body(Map.of("url", photoUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}

