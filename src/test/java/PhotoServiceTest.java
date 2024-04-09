import org.knightline.repository.PhotoRepository;
import org.knightline.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest()
public class PhotoServiceTest {

    @MockBean
    private PhotoRepository photoRepository;
    @Autowired
    private PhotoService photoService;
}
