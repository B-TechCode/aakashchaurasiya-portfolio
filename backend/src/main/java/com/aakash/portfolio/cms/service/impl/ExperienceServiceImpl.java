package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.ExperienceRequest;
import com.aakash.portfolio.cms.dto.response.ExperienceResponse;
import com.aakash.portfolio.cms.entity.Experience;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.ExperienceRepository;
import com.aakash.portfolio.cms.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;

    @Override
    @Transactional
    public ExperienceResponse createExperience(ExperienceRequest request) {
        Experience experience = Experience.builder()
                .title(request.getTitle())
                .organization(request.getOrganization())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .currentlyWorking(request.isCurrentlyWorking())
                .description(request.getDescription())
                .displayOrder(request.getDisplayOrder())
                .build();

        return toResponse(experienceRepository.save(experience));
    }

    @Override
    @Transactional
    public ExperienceResponse updateExperience(Long id, ExperienceRequest request) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));

        experience.setTitle(request.getTitle());
        experience.setOrganization(request.getOrganization());
        experience.setLocation(request.getLocation());
        experience.setStartDate(request.getStartDate());
        experience.setEndDate(request.getEndDate());
        experience.setCurrentlyWorking(request.isCurrentlyWorking());
        experience.setDescription(request.getDescription());
        experience.setDisplayOrder(request.getDisplayOrder());

        return toResponse(experienceRepository.save(experience));
    }

    @Override
    @Transactional
    public void deleteExperience(Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experience not found with id: " + id);
        }
        experienceRepository.deleteById(id);
    }

    @Override
    public ExperienceResponse getExperienceById(Long id) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        return toResponse(experience);
    }

 
@Override
public List<ExperienceResponse> getAllExperiences() {
    return experienceRepository
            .findAllByOrderByDisplayOrderAscStartDateDesc()
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
}


    private ExperienceResponse toResponse(Experience experience) {
        return ExperienceResponse.builder()
                .id(experience.getId())
                .title(experience.getTitle())
                .organization(experience.getOrganization())
                .location(experience.getLocation())
                .startDate(experience.getStartDate())
                .endDate(experience.getEndDate())
                .currentlyWorking(experience.isCurrentlyWorking())
                .description(experience.getDescription())
                .displayOrder(experience.getDisplayOrder())
                .createdAt(experience.getCreatedAt())
                .updatedAt(experience.getUpdatedAt())
                .build();
    }
}
