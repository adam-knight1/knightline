package org.knightline.service;

import org.knightline.repository.PhotoRepository;
import software.amazon.awssdk.services.s3.S3Client;

public class PhotoService {
    private final S3Client s3Client;
    private final PhotoRepository photoRepository;

    public PhotoService(S3Client s3Client,PhotoRepository photoRepository){
        this.s3Client = s3Client;
        this.photoRepository = photoRepository;
    }
}
