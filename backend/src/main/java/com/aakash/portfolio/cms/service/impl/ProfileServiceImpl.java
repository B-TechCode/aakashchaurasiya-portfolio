package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.ProfileRequest;
import com.aakash.portfolio.cms.dto.response.ProfileResponse;
import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.ProfileRepository;
import com.aakash.portfolio.cms.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    @Override
    public ProfileResponse getProfile() {
        Profile profile = profileRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        return toResponse(profile);
    }

    @Override
    @Transactional
    public ProfileResponse updateProfile(ProfileRequest request) {
        Profile profile = profileRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        profile.setFullName(request.getFullName());
        profile.setHeadline(request.getHeadline());
        profile.setAboutMe(request.getAboutMe());
        profile.setLocation(request.getLocation());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setProfileImageUrl(request.getProfileImageUrl());

        return toResponse(profileRepository.save(profile));
    }

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
