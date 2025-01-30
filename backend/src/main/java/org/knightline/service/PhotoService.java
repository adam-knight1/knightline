package org.knightline.service;

import org.knightline.dto.UserDto;
import org.knightline.repository.PhotoRepository;
import org.knightline.repository.UserRepository;
import org.knightline.repository.entity.Photo;
import org.knightline.repository.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PhotoService {
    private final S3Client s3Client;
    private final PhotoRepository photoRepository;
    private UserRepository userRepository;

    private static final Logger log = LoggerFactory.getLogger(PhotoService.class);
    private final UserService userService;

    public PhotoService(S3Client s3Client,PhotoRepository photoRepository,UserService userService){
        this.s3Client = s3Client;
        this.photoRepository = photoRepository;
        this.userService = userService;
    }

    public String uploadPhoto(MultipartFile file, String email) throws IOException { //todo revisit this is and
        System.out.println("Reached service");
        String bucketName = "knightfamphotos";
        String s3Key = generateUniqueKey(file.getOriginalFilename(), email);
        String region = "us-east-1";

        PutObjectRequest putObjectRequest = PutObjectRequest.builder() //creating the putObject Request
                .bucket(bucketName)
                .key(s3Key)
                .build();

        //upload file to S3
        s3Client.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        // Constructing the URL for the uploaded file
        String photoUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, s3Key);

       //error
        User user = userService.findUserByEmail(email);

        User user4 = userService.findUserByEmailUserDto(email);

        User user2 = userService.findUserByUsername(email);

        User user3 = userService.findUserByEmailOptional(email);

        System.out.println(email);

        System.out.println(user);
        System.out.println(user2);
        System.out.println(user3);
        System.out.println(user4);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        Photo photo = new Photo();
        photo.setTitle("Some title"); // title + description set by user
        photo.setDescription("Some description");
        photo.setUrl(photoUrl); // The URL generated after upload
        photo.setS3ObjectKey(s3Key); // The key used to store the photo in S3
        photo.setUser(user); //user who uploaded the photo
        photo.setUploadTime(LocalDateTime.now()); // upload time

        photoRepository.save(photo); //saving photo entity/metadata to postgres database

        return photoUrl;
    }

    public String uploadProfilePicture(MultipartFile file, String email) throws IOException {
        log.info("Starting uploadProfilePicture method");

        System.out.println("reached profile service here");

        String bucketName = "knightfamphotos";
        //String directoryPrefix = "profile-pictures/"; // Specific directory for profile pictures //todo this is working as is with these two lines commented out
        //String s3Key = directoryPrefix + generateUniqueKey(file.getOriginalFilename(), email);
        String s3Key = generateUniqueKey(file.getOriginalFilename(), email);

        String region = "us-east-1";

        log.info("Generated S3 key: {}", s3Key);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .build();

        log.info("Uploading file to S3");

        try {
            // Uploading file to S3 directly from an InputStream
            s3Client.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        } catch (Exception e) {
            log.error("Error uploading file to S3", e);
            throw new IOException("Error uploading file to S3", e);
        }

        // Constructing the URL for the uploaded profile picture
        String profilePicUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, s3Key);

        log.info("Constructed profile picture URL: {}", profilePicUrl);

        try {
            log.info("Fetching user by email: {}", email);
            // Updating the user's profile picture URL in the database
            User user = userService.findUserByEmailUserDto(email);
            System.out.println("reached me in service, user is : " + user);
                   // .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            log.info("User found: {}", user.getEmail());

            user.setProfilePictureUrl(profilePicUrl);
            userService.updateUser(user);
            log.info("User profile picture URL updated");
        } catch (UsernameNotFoundException e) {
            log.error("User not found for email: {}", email, e);
            throw new IOException("User not found", e);
        } catch (DataAccessException e) {
            log.error("Database access error", e);
            throw new IOException("Error updating user information", e);
        } catch (Exception e) {
            log.error("Unexpected error", e);
            throw e;
        }

        log.info("Completed uploadProfilePicture method");
        return profilePicUrl;
    }



    private String generateUniqueKey(String originalFilename, String username){
        String fileExtension = StringUtils.getFilenameExtension(originalFilename);
        String baseName = StringUtils.stripFilenameExtension(originalFilename);

        //using username and time for uniqueness

        return String.format("%s_%s_%s.%s", username, baseName, UUID.randomUUID(), fileExtension); //removed redundant toString call 9/26
    }

    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }

    public Photo getProfilePhoto(String username) {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        String profilePictureUrl = user.getProfilePictureUrl();

        Photo profilePhoto = new Photo();
        profilePhoto.setUrl(profilePictureUrl);
        return profilePhoto;
    }
}

