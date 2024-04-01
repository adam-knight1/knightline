package org.knightline.service;

import org.knightline.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService (UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

}
