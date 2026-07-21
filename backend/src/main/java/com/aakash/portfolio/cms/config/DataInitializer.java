package com.aakash.portfolio.cms.config;

import com.aakash.portfolio.cms.entity.AdminUser;
import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.repository.AdminUserRepository;
import com.aakash.portfolio.cms.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

     private static final Logger log =
            LoggerFactory.getLogger(DataInitializer.class);

    private final AdminUserRepository adminUserRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (adminUserRepository.count() == 0) {

            AdminUser admin = AdminUser.builder()
                    .username("admin")
                   .email("aakashchaurasiya630@gmail.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .fullName("Aakash Prasad Chaurasiya")
                    .enabled(true)
                    .build();

            admin = adminUserRepository.save(admin);

            Profile profile = Profile.builder()
                    .fullName("Aakash Prasad Chaurasiya")
                    .headline("Java Full Stack Developer")
                    .aboutMe("Portfolio CMS Owner")
                    .location("India")
                    .email("aakashchaurasiya630@gmail.com")
                    .phone("9999999999")
                    .adminUser(admin)
                    .build();

            profileRepository.save(profile);

          log.info("====================================");
log.info("DEFAULT ADMIN CREATED");
log.info("Username: admin");
log.info("Password: admin123");
log.info("====================================");
        }
    }
}