package org.knightline.service;

import org.knightline.repository.UserRepository;
import org.knightline.repository.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService (UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser (User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

    }
}
