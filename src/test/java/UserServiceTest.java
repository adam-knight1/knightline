import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.knightline.KnightlineApplication;
import org.knightline.repository.UserRepository;
import org.knightline.repository.entity.User;
import org.knightline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = KnightlineApplication.class)
@ExtendWith(SpringExtension.class)  // This is actually not needed with @SpringBootTest as it already includes it I think
public class UserServiceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired  // Changed from @InjectMocks to let Spring handle the injection
    private UserService userService;

    @Test
    public void findUserByEmail_UserFound() {
        String email = "test@testing";
        User mockUser = new User();
        mockUser.setEmail(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));

        User foundUser = userService.findUserByEmail(email);

        assertNotNull(foundUser);
        assertEquals(email, foundUser.getEmail());
    }

    @Test
    public void findUserByEmail_UserNotFound() {
        String email = "notfound@testing.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.findUserByEmail(email);
        });
    }
}

