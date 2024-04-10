import org.junit.jupiter.api.Test;
import org.knightline.repository.PhotoRepository;
import org.knightline.service.PhotoService;
import org.knightline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import software.amazon.awssdk.services.s3.S3Client;

/** Class for testing various functions of the photo uploading mechanisms
 *
 */
@SpringBootTest()
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
    public void uploadPhoto_ValidPhoto_UploadSuccess() {

    }
}
