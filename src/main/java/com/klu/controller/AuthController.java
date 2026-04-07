package com.klu.controller;

import com.klu.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000") // frontend URL
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    // 🔐 REGISTER
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> request) {

        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");

        return service.register(username, email, password);
    }

    // 🔐 LOGIN
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        return service.login(email, password);
    }
}