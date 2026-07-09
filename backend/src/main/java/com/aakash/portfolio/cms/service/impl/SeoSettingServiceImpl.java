package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.SeoSettingRequest;
import com.aakash.portfolio.cms.dto.response.SeoSettingResponse;
import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.entity.SeoSetting;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.ProfileRepository;
import com.aakash.portfolio.cms.repository.SeoSettingRepository;
import com.aakash.portfolio.cms.service.SeoSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeoSettingServiceImpl implements SeoSettingService {

    private final SeoSettingRepository seoSettingRepository;
    private final ProfileRepository profileRepository;

    @Override
    public SeoSettingResponse getSeoSettings() {

        Profile profile = profileRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        SeoSetting seoSetting = seoSettingRepository.findByProfile(profile)
                .orElseThrow(() -> new ResourceNotFoundException("SEO settings not found"));

        return toResponse(seoSetting);
    }

    @Override
    @Transactional
    public SeoSettingResponse updateSeoSettings(SeoSettingRequest request) {

        Profile profile = profileRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        SeoSetting seoSetting = seoSettingRepository.findByProfile(profile)
                .orElseGet(() -> SeoSetting.builder()
                        .profile(profile)
                        .build());

        seoSetting.setSiteTitle(request.getSiteTitle());
        seoSetting.setMetaDescription(request.getMetaDescription());
        seoSetting.setKeywords(request.getKeywords());
        seoSetting.setOgTitle(request.getOgTitle());
        seoSetting.setOgDescription(request.getOgDescription());
        seoSetting.setOgImageUrl(request.getOgImageUrl());

        seoSetting = seoSettingRepository.save(seoSetting);

        return toResponse(seoSetting);
    }

    private SeoSettingResponse toResponse(SeoSetting seoSetting) {
        return SeoSettingResponse.builder()
                .id(seoSetting.getId())
                .siteTitle(seoSetting.getSiteTitle())
                .metaDescription(seoSetting.getMetaDescription())
                .keywords(seoSetting.getKeywords())
                .ogTitle(seoSetting.getOgTitle())
                .ogDescription(seoSetting.getOgDescription())
                .ogImageUrl(seoSetting.getOgImageUrl())
                .createdAt(seoSetting.getCreatedAt())
                .updatedAt(seoSetting.getUpdatedAt())
                .build();
    }
}