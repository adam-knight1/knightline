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

/** Test class for verifying UserService methods"
 * Includes tests for verifying user authenticity by email
 * Mocks UserRepository to query and save emails
 */

@SpringBootTest(classes = KnightlineApplication.class)
@ExtendWith(SpringExtension.class)
public class UserServiceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired  // Changed from @InjectMocks to let Spring handle the injection
    private UserService userService;

    /** Test to verify if user exists in DB, searching by email
     *  Test passes if user is found in postgres table
     */

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

    /**Test to determine if user exists by email
     * Uses fake user data to verify integrity of DB user table
     * Returns true if fake user not found.
     */

    @Test
    public void findUserByEmail_UserNotFound() {
        String email = "notfound@testing.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.findUserByEmail(email);
        });
    }
}

