package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.SkillRequest;
import com.aakash.portfolio.cms.dto.response.SkillResponse;
import com.aakash.portfolio.cms.entity.Skill;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.SkillRepository;
import com.aakash.portfolio.cms.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Override
    @Transactional
    public SkillResponse createSkill(SkillRequest request) {

        Skill skill = Skill.builder()
                .name(request.getName())
                .category(request.getCategory())
                .proficiency(request.getProficiency())
                .iconName(request.getIconName())
                .displayOrder(request.getDisplayOrder())
                .published(request.isPublished())
                .build();

        return toResponse(skillRepository.save(skill));
    }

    @Override
    @Transactional
    public SkillResponse updateSkill(Long id, SkillRequest request) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found with id: " + id));

        skill.setName(request.getName());
        skill.setCategory(request.getCategory());
        skill.setProficiency(request.getProficiency());
        skill.setIconName(request.getIconName());
        skill.setDisplayOrder(request.getDisplayOrder());
        skill.setPublished(request.isPublished());

        return toResponse(skillRepository.save(skill));
    }

    @Override
    @Transactional
    public void deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with id: " + id);
        }

        skillRepository.deleteById(id);
    }

    @Override
    public SkillResponse getSkillById(Long id) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found with id: " + id));

        return toResponse(skill);
    }

    @Override
    public List<SkillResponse> getAllSkills() {

        return skillRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }



    @Override
public List<SkillResponse> getPublishedSkills() {

    return skillRepository.findByPublishedTrueOrderByDisplayOrderAsc()
            .stream()
            .map(this::toResponse)
            .toList();
}
    private SkillResponse toResponse(Skill skill) {

        return SkillResponse.builder()
                .id(skill.getId())
                .name(skill.getName())
                .category(skill.getCategory())
                .proficiency(skill.getProficiency())
                .iconName(skill.getIconName())
                .displayOrder(skill.getDisplayOrder())
                .published(skill.isPublished())
                .createdAt(skill.getCreatedAt())
                .updatedAt(skill.getUpdatedAt())
                .build();
    }
}