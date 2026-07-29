package com.aakash.portfolio.cms.config;

import com.aakash.portfolio.cms.entity.AdminUser;
import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.repository.AdminUserRepository;
import com.aakash.portfolio.cms.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger log =
            LoggerFactory.getLogger(DataInitializer.class);

    private final AdminUserRepository adminUserRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_USERNAME:}")
    private String adminUsername;

    @Value("${ADMIN_PASSWORD:}")
    private String adminPassword;

    @Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    @Value("${ADMIN_FULL_NAME:Aakash Prasad Chaurasiya}")
    private String adminFullName;

    @Override
    public void run(String... args) {

        // Existing database already has an admin.
        if (adminUserRepository.count() > 0) {
            log.info("Admin account already exists. Skipping admin initialization.");
            return;
        }

        // Fresh database must receive credentials through environment variables.
        if (isBlank(adminUsername)
                || isBlank(adminPassword)
                || isBlank(adminEmail)) {

            log.warn(
                    "Admin account was not initialized because ADMIN_USERNAME, " +
                    "ADMIN_PASSWORD or ADMIN_EMAIL is missing."
            );

            return;
        }

        AdminUser admin = AdminUser.builder()
                .username(adminUsername)
                .email(adminEmail)
                .passwordHash(passwordEncoder.encode(adminPassword))
                .fullName(adminFullName)
                .enabled(true)
                .build();

        admin = adminUserRepository.save(admin);

        Profile profile = Profile.builder()
                .fullName(adminFullName)
                .headline("Java Full Stack Developer")
                .aboutMe("Portfolio CMS Owner")
                .location("India")
                .email(adminEmail)
                .adminUser(admin)
                .build();

        profileRepository.save(profile);

        // Never print username/password or other credentials.
        log.info("Initial admin account and profile created successfully.");
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}