package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.SkillRequest;
import com.aakash.portfolio.cms.dto.response.SkillResponse;

import java.util.List;

public interface SkillService {

    SkillResponse createSkill(SkillRequest request);

    SkillResponse updateSkill(Long id, SkillRequest request);

    void deleteSkill(Long id);

    SkillResponse getSkillById(Long id);

    List<SkillResponse> getAllSkills();

    List<SkillResponse> getPublishedSkills();
}
