package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.SeoSettingRequest;
import com.aakash.portfolio.cms.dto.response.SeoSettingResponse;

public interface SeoService {

    SeoSettingResponse getSeoSettings();

    SeoSettingResponse updateSeoSettings(SeoSettingRequest request);
}
