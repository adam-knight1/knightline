package org.knightline.service;

import org.knightline.repository.PhotoRepository;
import org.knightline.repository.entity.Photo;
import org.knightline.repository.entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PhotoService {
    private final S3Client s3Client;
    private final PhotoRepository photoRepository;

    private final UserService userService;

    public PhotoService(S3Client s3Client,PhotoRepository photoRepository,UserService userService){
        this.s3Client = s3Client;
        this.photoRepository = photoRepository;
        this.userService = userService;
    }

    public String uploadPhoto(MultipartFile file, String username) throws IOException {
        String bucketName = "knightlinephotos";
        String s3Key = generateUniqueKey(file.getOriginalFilename(), username);
        String region = "us-east-1";

        PutObjectRequest putObjectRequest = PutObjectRequest.builder() //creating the putObject Request
                .bucket(bucketName)
                .key(s3Key)
                .build();
        //uploading file to S3
        s3Client.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        // Constructing the URL for the uploaded file
        String photoUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, s3Key);

        User user = userService.findUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        Photo photo = new Photo();
        photo.setTitle("Some title"); // set by user
        photo.setDescription("Some description"); // set by user
        photo.setUrl(photoUrl); // The URL generated after upload
        photo.setS3ObjectKey(s3Key); // The key used to store the photo in S3
        photo.setUser(user); //user who uploaded the photo
        photo.setUploadTime(LocalDateTime.now()); // upload time

        photoRepository.save(photo); //saving photo entity/metadata to postgres database

        return photoUrl;

    }

    private String generateUniqueKey(String originalFilename, String username){
        String fileExtension = StringUtils.getFilenameExtension(originalFilename);
        String baseName = StringUtils.stripFilenameExtension(originalFilename);

        //using username and time for uniqueness

        return String.format("%s_%s_%s.%s", username, baseName, UUID.randomUUID().toString(), fileExtension);
    }
}

