package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ProfileRequest;
import com.aakash.portfolio.cms.dto.response.ProfileResponse;

public interface ProfileService {

    ProfileResponse getProfile();

    ProfileResponse updateProfile(ProfileRequest request);
}
