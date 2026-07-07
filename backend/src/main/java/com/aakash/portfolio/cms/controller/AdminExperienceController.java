package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.ExperienceRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ExperienceResponse;
import com.aakash.portfolio.cms.service.ExperienceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/experience")
@RequiredArgsConstructor
public class AdminExperienceController {

    private final ExperienceService experienceService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllExperiences() {
        List<ExperienceResponse> experiences = experienceService.getAllExperiences();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Experiences fetched successfully").data(experiences).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getExperienceById(@PathVariable Long id) {
        ExperienceResponse experience = experienceService.getExperienceById(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Experience fetched successfully").data(experience).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createExperience(@Valid @RequestBody ExperienceRequest request) {
        ExperienceResponse experience = experienceService.createExperience(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.builder().success(true).message("Experience created successfully").data(experience).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateExperience(@PathVariable Long id, @Valid @RequestBody ExperienceRequest request) {
        ExperienceResponse experience = experienceService.updateExperience(id, request);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Experience updated successfully").data(experience).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Experience deleted successfully").build());
    }
}
