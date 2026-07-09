package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.SocialLinkRequest;
import com.aakash.portfolio.cms.dto.response.SocialLinkResponse;
import com.aakash.portfolio.cms.entity.SocialLink;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.SocialLinkRepository;
import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.repository.ProfileRepository;
import com.aakash.portfolio.cms.service.SocialLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SocialLinkServiceImpl implements SocialLinkService {

    private final SocialLinkRepository socialLinkRepository;
    private final ProfileRepository profileRepository;


    @Override
    @Transactional
    public SocialLinkResponse createSocialLink(SocialLinkRequest request) {
        Profile profile = profileRepository.findAll()
        .stream()
        .findFirst()
        .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

SocialLink socialLink = SocialLink.builder()
        .platform(request.getPlatform())
        .url(request.getUrl())
        .displayOrder(request.getDisplayOrder())
        .profile(profile)
        .build();

        return toResponse(socialLinkRepository.save(socialLink));
    }

    @Override
    @Transactional
    public SocialLinkResponse updateSocialLink(Long id, SocialLinkRequest request) {
        SocialLink socialLink = socialLinkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Social link not found with id: " + id));

        socialLink.setPlatform(request.getPlatform());
        socialLink.setUrl(request.getUrl());
        socialLink.setDisplayOrder(request.getDisplayOrder());

        return toResponse(socialLinkRepository.save(socialLink));
    }

    @Override
    @Transactional
    public void deleteSocialLink(Long id) {
        if (!socialLinkRepository.existsById(id)) {
            throw new ResourceNotFoundException("Social link not found with id: " + id);
        }
        socialLinkRepository.deleteById(id);
    }



    @Override
public SocialLinkResponse getSocialLinkById(Long id) {

    SocialLink socialLink = socialLinkRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Social link not found with id: " + id));

    return toResponse(socialLink);
}






    @Override
    public List<SocialLinkResponse> getAllSocialLinks() {
        return socialLinkRepository.findAll().stream()
                .sorted((a, b) -> Integer.compare(a.getDisplayOrder() == null ? 0 : a.getDisplayOrder(), b.getDisplayOrder() == null ? 0 : b.getDisplayOrder()))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private SocialLinkResponse toResponse(SocialLink socialLink) {
        return SocialLinkResponse.builder()
                .id(socialLink.getId())
                .platform(socialLink.getPlatform())
                .url(socialLink.getUrl())
                .displayOrder(socialLink.getDisplayOrder())
                .createdAt(socialLink.getCreatedAt())
                .updatedAt(socialLink.getUpdatedAt())
                .build();
    }
}
