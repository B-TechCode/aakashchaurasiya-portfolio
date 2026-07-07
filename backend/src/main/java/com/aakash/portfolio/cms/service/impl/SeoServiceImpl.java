package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.SeoSettingRequest;
import com.aakash.portfolio.cms.dto.response.SeoSettingResponse;
import com.aakash.portfolio.cms.entity.SeoSetting;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.SeoSettingRepository;
import com.aakash.portfolio.cms.service.SeoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeoServiceImpl implements SeoService {

    private final SeoSettingRepository seoSettingRepository;

    @Override
    public SeoSettingResponse getSeoSettings() {
        SeoSetting seoSetting = seoSettingRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("SEO settings not found"));
        return toResponse(seoSetting);
    }

    @Override
    @Transactional
    public SeoSettingResponse updateSeoSettings(SeoSettingRequest request) {
        SeoSetting seoSetting = seoSettingRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("SEO settings not found"));

        seoSetting.setSiteTitle(request.getSiteTitle());
        seoSetting.setMetaDescription(request.getMetaDescription());
        seoSetting.setKeywords(request.getKeywords());
        seoSetting.setOgTitle(request.getOgTitle());
        seoSetting.setOgDescription(request.getOgDescription());
        seoSetting.setOgImageUrl(request.getOgImageUrl());

        return toResponse(seoSettingRepository.save(seoSetting));
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
