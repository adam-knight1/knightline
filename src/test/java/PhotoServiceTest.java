import org.junit.jupiter.api.Test;
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
import org.springframework.web.bind.annotation.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;


import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/** Class for testing various functions of the photo uploading mechanisms
 *
 */
@SpringBootTest(classes = KnightlineApplication.class)
public class PhotoServiceTest {

    @MockBean
    private PhotoRepository photoRepository;
    @MockBean
    private UserService userService;
    @MockBean
    private S3Client s3Client;

    @Autowired
    private PhotoService photoService;

    @Test
    public void uploadPhoto_ValidPhoto_UploadSuccess() throws IOException, IOException {
        // Mock multipart file
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


