package org.knightline.controller;

import org.knightline.repository.entity.User;
import org.knightline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Handles the endpoints for user operations, such as create user.
 * Will add more like deleting, updating etc. once MVP is finished
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000") //temp pending webconfig
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
}
