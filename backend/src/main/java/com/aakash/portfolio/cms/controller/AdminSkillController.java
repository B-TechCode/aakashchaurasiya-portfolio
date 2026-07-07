package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.SkillRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.SkillResponse;
import com.aakash.portfolio.cms.service.SkillService;
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
@RequestMapping("/api/admin/skills")
@RequiredArgsConstructor
public class AdminSkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllSkills() {
        List<SkillResponse> skills = skillService.getAllSkills();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Skills fetched successfully").data(skills).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getSkillById(@PathVariable Long id) {
        SkillResponse skill = skillService.getSkillById(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Skill fetched successfully").data(skill).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createSkill(@Valid @RequestBody SkillRequest request) {
        SkillResponse skill = skillService.createSkill(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.builder().success(true).message("Skill created successfully").data(skill).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateSkill(@PathVariable Long id, @Valid @RequestBody SkillRequest request) {
        SkillResponse skill = skillService.updateSkill(id, request);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Skill updated successfully").data(skill).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Skill deleted successfully").build());
    }
}
