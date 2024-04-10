import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.knightline.KnightlineApplication;
import org.knightline.repository.PhotoRepository;
import org.knightline.repository.entity.Photo;
import org.knightline.repository.entity.User;
import org.knightline.service.PhotoService;
import org.knightline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;

import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

/** Test class for testing various functions of the photo upload features
 *  Includes verification for successful/unsuccessful S3 photo uploads and postgres metadata save"
 */
@SpringBootTest(classes= KnightlineApplication.class)
@ExtendWith(SpringExtension.class)
public class PhotoServiceTest {
    @MockBean
    private PhotoRepository photoRepository;
    @MockBean
    private UserService userService;
    @MockBean
    private S3Client s3Client;
    @Autowired
    private PhotoService photoService;

    /** Tests if photo upload to S3 and metadata to postgres is successful
     *
     * @throws IOException
     */
    @Test
    public void uploadPhoto_ValidPhoto_UploadSuccess() throws IOException {
        // Mocking the multipart file
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "test image content".getBytes());
        User mockUser = new User();
        mockUser.setEmail("user@test.com");
        when(userService.findUserByEmail("user@test.com")).thenReturn(mockUser);

        // Mocking S3 upload
        when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class))).thenReturn(PutObjectResponse.builder().build());

        // Mocking repository save
        when(photoRepository.save(any(Photo.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Calling service method
        String resultUrl = photoService.uploadPhoto(file, "user@test");

        //Assertions and verifications
        assertNotNull(resultUrl);
        assertTrue(resultUrl.contains("https://knightlinephotos.s3.us-east-1.amazonaws.com/"));
        verify(s3Client, times(1)).putObject(any(PutObjectRequest.class), any(RequestBody.class));
        verify(photoRepository, times(1)).save(any(Photo.class));

    }

    @Test
    public void uploadPhoto_UserNotFound_ThrowsException() {
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "test image content".getBytes());
        when(userService.findUserByEmail("user@test.com")).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> {
            photoService.uploadPhoto(file, "user@test.com");
        });
    }
}


