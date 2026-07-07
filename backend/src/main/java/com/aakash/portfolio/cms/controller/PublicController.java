package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.CertificateResponse;
import com.aakash.portfolio.cms.dto.response.ExperienceResponse;
import com.aakash.portfolio.cms.dto.response.ProfileResponse;
import com.aakash.portfolio.cms.dto.response.ProjectResponse;
import com.aakash.portfolio.cms.dto.response.ResumeResponse;
import com.aakash.portfolio.cms.dto.response.SeoSettingResponse;
import com.aakash.portfolio.cms.dto.response.SkillResponse;
import com.aakash.portfolio.cms.dto.response.SocialLinkResponse;
import com.aakash.portfolio.cms.service.CertificateService;
import com.aakash.portfolio.cms.service.ExperienceService;
import com.aakash.portfolio.cms.service.ProfileService;
import com.aakash.portfolio.cms.service.ProjectService;
import com.aakash.portfolio.cms.service.ResumeService;
import com.aakash.portfolio.cms.service.SeoService;
import com.aakash.portfolio.cms.service.SkillService;
import com.aakash.portfolio.cms.service.SocialLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final ProfileService profileService;
    private final ProjectService projectService;
    private final SkillService skillService;
    private final ExperienceService experienceService;
    private final CertificateService certificateService;
    private final ResumeService resumeService;
    private final SocialLinkService socialLinkService;
    private final SeoService seoService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getProfile() {
        ProfileResponse profile = profileService.getProfile();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Profile fetched successfully").data(profile).build());
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse> getProjects() {
        List<ProjectResponse> projects = projectService.getPublishedProjects();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Projects fetched successfully").data(projects).build());
    }

    @GetMapping("/projects/{slug}")
    public ResponseEntity<ApiResponse> getProjectBySlug(@PathVariable String slug) {
        ProjectResponse project = projectService.getProjectBySlug(slug);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Project fetched successfully").data(project).build());
    }

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse> getSkills() {
        List<SkillResponse> skills = skillService.getPublishedSkills();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Skills fetched successfully").data(skills).build());
    }

    @GetMapping("/experience")
    public ResponseEntity<ApiResponse> getExperience() {
        List<ExperienceResponse> experience = experienceService.getAllExperiences();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Experience fetched successfully").data(experience).build());
    }

    @GetMapping("/certificates")
    public ResponseEntity<ApiResponse> getCertificates() {
        List<CertificateResponse> certificates = certificateService.getAllCertificates();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Certificates fetched successfully").data(certificates).build());
    }

    @GetMapping("/resume/latest")
    public ResponseEntity<ApiResponse> getLatestResume() {
        ResumeResponse resume = resumeService.getLatestResume();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Resume fetched successfully").data(resume).build());
    }

    @GetMapping("/social-links")
    public ResponseEntity<ApiResponse> getSocialLinks() {
        List<SocialLinkResponse> links = socialLinkService.getAllSocialLinks();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Social links fetched successfully").data(links).build());
    }

    @GetMapping("/seo")
    public ResponseEntity<ApiResponse> getSeo() {
        SeoSettingResponse seo = seoService.getSeoSettings();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("SEO settings fetched successfully").data(seo).build());
    }
}
