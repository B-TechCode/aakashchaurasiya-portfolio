package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.SocialLinkRequest;
import com.aakash.portfolio.cms.dto.response.SocialLinkResponse;

import java.util.List;

public interface SocialLinkService {

    SocialLinkResponse createSocialLink(SocialLinkRequest request);

    SocialLinkResponse updateSocialLink(Long id, SocialLinkRequest request);

    void deleteSocialLink(Long id);

    List<SocialLinkResponse> getAllSocialLinks();
}
