package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ExperienceRequest;
import com.aakash.portfolio.cms.dto.response.ExperienceResponse;

import java.util.List;

public interface ExperienceService {

    ExperienceResponse createExperience(ExperienceRequest request);

    ExperienceResponse updateExperience(Long id, ExperienceRequest request);

    void deleteExperience(Long id);

    ExperienceResponse getExperienceById(Long id);

    List<ExperienceResponse> getAllExperiences();
}
