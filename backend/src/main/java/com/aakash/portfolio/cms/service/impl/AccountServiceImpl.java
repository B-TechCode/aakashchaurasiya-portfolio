package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.UpdateAccountRequest;
import com.aakash.portfolio.cms.entity.AdminUser;
import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.exception.DuplicateResourceException;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.AdminUserRepository;
import com.aakash.portfolio.cms.repository.ProfileRepository;
import com.aakash.portfolio.cms.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountServiceImpl implements AccountService {

    private final AdminUserRepository adminUserRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updateAccount(UpdateAccountRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String loggedInUsername = authentication.getName();

        AdminUser adminUser = adminUserRepository.findByUsername(loggedInUsername)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin user not found"));

        Profile profile = profileRepository.findByAdminUser(adminUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile not found"));

        // =============================
        // Verify Current Password
        // =============================
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                adminUser.getPasswordHash())) {

            throw new IllegalArgumentException("Current password is incorrect.");
        }

        // =============================
        // Confirm Password Validation
        // =============================
        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new IllegalArgumentException(
                    "New password and confirm password do not match.");
        }

        // =============================
        // Username Validation
        // =============================
        if (!adminUser.getUsername().equals(request.getUsername())
                && adminUserRepository.existsByUsername(request.getUsername())) {

            throw new DuplicateResourceException(
                    "Username already exists.");
        }

        // =============================
        // Email Validation
        // =============================
        if (!adminUser.getEmail().equals(request.getEmail())
                && adminUserRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException(
                    "Email already exists.");
        }

        // =============================
        // Update Admin User
        // =============================
        adminUser.setUsername(request.getUsername());
        adminUser.setEmail(request.getEmail());
        adminUser.setPasswordHash(
                passwordEncoder.encode(request.getNewPassword()));

        adminUserRepository.save(adminUser);

        // =============================
        // Sync Profile Email
        // =============================
        profile.setEmail(request.getEmail());

        profileRepository.save(profile);
    }
}