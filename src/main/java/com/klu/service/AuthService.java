package com.klu.service;

import com.klu.entity.User;
import com.klu.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import com.klu.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository repo;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository repo, JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    public String register(String username, String email, String password) {

        try {

            if (repo.findByEmail(email).isPresent()) {
                return "User already exists";
            }

            if (password.length() < 8) {
                return "Weak password";
            }

            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(encoder.encode(password));
            user.setRole("USER");
            user.setEnabled(true);
            user.setVerified(true);   // ✅ IMPORTANT FIX
            user.setCreatedAt(LocalDateTime.now());

            repo.save(user);

            return "User registered";

        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR: " + e.getMessage();
        }
    }

    public String login(String email, String password) {

        User user = repo.findByEmail(email).orElse(null);

        if (user == null) return "User not found";

        if (!encoder.matches(password, user.getPassword())) {
            return "Invalid password";
        }

        return jwtUtil.generateToken(email); // 🔐 RETURN TOKEN
    }
}