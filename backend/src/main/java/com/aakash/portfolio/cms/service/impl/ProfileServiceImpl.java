package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.cloudinary.CloudinaryService;
import com.aakash.portfolio.cms.cloudinary.CloudinaryUploadResult;
import com.aakash.portfolio.cms.dto.request.ProfileRequest;
import com.aakash.portfolio.cms.dto.response.ProfileResponse;
import com.aakash.portfolio.cms.entity.AdminUser;
import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.AdminUserRepository;
import com.aakash.portfolio.cms.repository.ProfileRepository;
import com.aakash.portfolio.cms.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final AdminUserRepository adminUserRepository;
    private final CloudinaryService cloudinaryService;

    // =========================================================
    // GET PROFILE
    // =========================================================

    @Override
    public ProfileResponse getProfile() {

        Profile profile = getCurrentAdminProfile();

        return toResponse(profile);
    }






    @Override
public ProfileResponse getPublicProfile() {

    Profile profile = profileRepository
            .findFirstByOrderByIdAsc()
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Profile not found"
                    )
            );

    return toResponse(profile);
}
    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    @Override
    @Transactional
    public ProfileResponse updateProfile(ProfileRequest request) {

        Profile profile = getCurrentAdminProfile();

        profile.setFullName(request.getFullName());
        profile.setHeadline(request.getHeadline());
        profile.setAboutMe(request.getAboutMe());
        profile.setLocation(request.getLocation());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setProfileImageUrl(request.getProfileImageUrl());

        profile = profileRepository.save(profile);

        return toResponse(profile);
    }

    // =========================================================
    // UPLOAD PROFILE IMAGE
    // =========================================================

    @Override
    @Transactional
    public ProfileResponse uploadProfileImage(MultipartFile file) {

        Profile profile = getCurrentAdminProfile();

        if (profile.getProfileImagePublicId() != null
                && !profile.getProfileImagePublicId().isBlank()) {

            cloudinaryService.deleteResource(
                    profile.getProfileImagePublicId(),
                    "image"
            );
        }

        CloudinaryUploadResult result =
                cloudinaryService.uploadImage(
                        file,
                        "portfolio/profile",
                        null
                );

        profile.setProfileImageUrl(result.secureUrl());
        profile.setProfileImagePublicId(result.publicId());

        profile = profileRepository.save(profile);

        return toResponse(profile);
    }

    // =========================================================
    // GET CURRENT AUTHENTICATED ADMIN PROFILE
    // =========================================================

    private Profile getCurrentAdminProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {

            throw new ResourceNotFoundException(
                    "Authenticated admin not found"
            );
        }

        String username = authentication.getName();

        AdminUser adminUser = adminUserRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Admin user not found"
                        )
                );

        return profileRepository
                .findByAdminUserId(adminUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Profile not found"
                        )
                );
    }

    // =========================================================
    // ENTITY -> RESPONSE
    // =========================================================

    private ProfileResponse toResponse(Profile profile) {

        return ProfileResponse.builder()
                .id(profile.getId())
                .fullName(profile.getFullName())
                .headline(profile.getHeadline())
                .aboutMe(profile.getAboutMe())
                .location(profile.getLocation())
                .email(profile.getEmail())
                .phone(profile.getPhone())
                .profileImageUrl(profile.getProfileImageUrl())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}