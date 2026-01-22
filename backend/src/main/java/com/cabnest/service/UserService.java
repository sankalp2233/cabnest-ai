package com.cabnest.service;

import com.cabnest.entity.User;
import com.cabnest.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        // Check for duplicate email
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                throw new RuntimeException("Email already exists");
            }
        }

        // Check for duplicate phone
        if (user.getPhone() != null && !user.getPhone().isEmpty()) {
            if (userRepository.findByPhone(user.getPhone()).isPresent()) {
                throw new RuntimeException("Phone number already exists");
            }
        }

        // Validate that at least email or phone is provided
        if ((user.getEmail() == null || user.getEmail().isEmpty()) &&
                (user.getPhone() == null || user.getPhone().isEmpty())) {
            throw new RuntimeException("Email or phone number is required");
        }

        // Hash password before saving
        user.setPassword(hashPassword(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String identifier, String password) {
        Optional<User> user = Optional.empty();

        // Try to find user by email first
        if (identifier.contains("@")) {
            user = userRepository.findByEmail(identifier);
        } else {
            // Otherwise try phone number
            user = userRepository.findByPhone(identifier);
        }

        if (user.isPresent() && user.get().getPassword().equals(hashPassword(password))) {
            return user.get();
        }
        throw new RuntimeException("Invalid credentials");
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
