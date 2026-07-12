


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

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Override
    @Transactional
    public SkillResponse createSkill(SkillRequest request) {

        if (skillRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException(
                    "Skill already exists: " + request.getName());
        }

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

        if (!skill.getName().equalsIgnoreCase(request.getName())
                && skillRepository.existsByName(request.getName())) {

            throw new IllegalArgumentException(
                    "Skill already exists: " + request.getName());
        }

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
                .sorted((a, b) -> {

                    Integer x = a.getDisplayOrder() == null ? 999 : a.getDisplayOrder();
                    Integer y = b.getDisplayOrder() == null ? 999 : b.getDisplayOrder();

                    return x.compareTo(y);
                })
                .map(this::toResponse)
                .toList();
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