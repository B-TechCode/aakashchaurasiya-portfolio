package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.LoginRequest;
import com.aakash.portfolio.cms.dto.response.JwtResponse;
import com.aakash.portfolio.cms.entity.AdminUser;
import com.aakash.portfolio.cms.repository.AdminUserRepository;
import com.aakash.portfolio.cms.security.JwtUtil;
import com.aakash.portfolio.cms.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AdminUserRepository adminUserRepository;
    private final AuthenticationManager authenticationManager;
    // PasswordEncoder is configured in SecurityConfig and used by AuthenticationManager.
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public JwtResponse login(LoginRequest request) {
        if (request == null || request.getUsername() == null || request.getPassword() == null) {
            throw new BadCredentialsException("Invalid login request");
        }

        AdminUser adminUser = adminUserRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!adminUser.isEnabled()) {
            throw new BadCredentialsException("Admin account is disabled");
        }

        // AuthenticationManager will verify credentials using the configured PasswordEncoder.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtil.generateToken(adminUser.getUsername());
        return JwtResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .username(adminUser.getUsername())
                .build();
    }
}

