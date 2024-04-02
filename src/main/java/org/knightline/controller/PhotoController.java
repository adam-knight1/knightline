package org.knightline.controller;

import org.knightline.service.PhotoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoservice) {
        this.photoService = photoservice;
    }

    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file, Principal principal) {


    }
}
