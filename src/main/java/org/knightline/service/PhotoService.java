package org.knightline.service;

import org.knightline.repository.PhotoRepository;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

public class PhotoService {
    private final S3Client s3Client;
    private final PhotoRepository photoRepository;

    public PhotoService(S3Client s3Client,PhotoRepository photoRepository){
        this.s3Client = s3Client;
        this.photoRepository = photoRepository;
    }

    public String uploadPhoto(MultipartFile file, String username) throws IOException {
        String bucketName = "knightlinePhotos";
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

        //save photo metadata to postgres and

        return photoUrl;

    }


    private String generateUniqueKey(String originalFilename, String username){
        return "";
    }


}
