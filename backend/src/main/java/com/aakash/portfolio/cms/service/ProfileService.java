package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ProfileRequest;
import com.aakash.portfolio.cms.dto.response.ProfileResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {

    ProfileResponse getProfile();

    ProfileResponse updateProfile(ProfileRequest request);

    ProfileResponse uploadProfileImage(MultipartFile file);
}
