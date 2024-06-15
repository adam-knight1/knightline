package org.knightline.controller;

import org.knightline.dto.UserDto;
import org.knightline.repository.entity.User;
import org.knightline.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Handles the endpoints for user operations, such as create user.
 * Will add more like deleting, updating etc. once MVP is finished
 */
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        log.info(user.getEmail());
        log.info(user.getName());
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable UUID userId) {
        try {
            UserDto userDto = userService.getUserData(userId);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            log.error("Failed to fetch user data for userId: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user data");
        }
    }
}
