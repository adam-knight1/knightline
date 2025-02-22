package org.knightline.service;

import org.knightline.dto.UserDto;
import org.knightline.repository.UserRepository;
import org.knightline.repository.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.UUID;

//This class is responsible for the User specific operations at the service layer
//Such as create and find user
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /** Creates a new user on the create user page accessed from the main landing page
     * Uses a password encoder for an extra layer of security.
     *
     * @param user
     * @return User object
     */
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        logger.info("Saving user with name: {}", user.getName());
        return userRepository.save(user);
    }

    /**
     *
     * @param username
     * @return User Object
     * This method needs some revision as it's currently using findByEmail with the username, which is confusing and incorrect
     */

    public User findUserByUsername(String username) { //todo get this aligned with username or email
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    /**
     * Method to find user by email
     * @param email
     * @return
     */
    public User findUserByEmailUserDto(String email){

       User user = userRepository.findByEmail(email)
               .orElseThrow(() -> new UsernameNotFoundException("not found here"));

       UserDto userDto = new UserDto(user.getUserId(),user.getName(),user.getEmail(),user.getProfilePictureUrl());

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("not found" + userDto + " and " + email));
    }

    public User findUserByEmail(String email) {

        System.out.println(userRepository.findByEmail(email));
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public User findUserByEmailOptional(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }


    public UserDto getUserData(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        return new UserDto(user.getUserId(), user.getName(), user.getEmail(), user.getProfilePictureUrl());
    }

/*
    public UserDto modifyUsername()  //todo - edit username
*/

    public void updateUser(User user) {
        userRepository.save(user);
    }
}
