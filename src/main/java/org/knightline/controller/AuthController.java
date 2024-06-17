/*
 * Proprietary License
 *
 * Copyright (c) 2024 Adam Knight. All rights reserved.
 *
 * This file is part of the Knightline project, which is licensed under
 * the Proprietary License. For details, see the LICENSE file in the root
 * of the repository.
 */
package org.knightline.controller;

import org.knightline.LoginRequest;
import org.knightline.dto.UserDto;
import org.knightline.repository.entity.User;
import org.knightline.security.CustomUserDetailsService;
import org.knightline.security.JwtUtil;
import org.knightline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller class that defines the endpoints needed for login using spring security"
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000") // Temporary pending webconfig
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());

            User user = userService.findUserByEmail(loginRequest.getEmail());
            UserDto userDto = new UserDto(user.getUserId(), user.getName(), user.getEmail(), user.getProfilePictureUrl());

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("token", jwt);
            responseBody.put("user", userDto);

            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
