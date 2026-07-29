package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.AnalyticsRequest;
import com.aakash.portfolio.cms.dto.request.ContactRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.CertificateResponse;
import com.aakash.portfolio.cms.dto.response.ContactResponse;
import com.aakash.portfolio.cms.dto.response.ExperienceResponse;
import com.aakash.portfolio.cms.dto.response.ProfileResponse;
import com.aakash.portfolio.cms.dto.response.ProjectResponse;
import com.aakash.portfolio.cms.dto.response.ResumeResponse;
import com.aakash.portfolio.cms.dto.response.SeoSettingResponse;
import com.aakash.portfolio.cms.dto.response.ServiceResponse;
import com.aakash.portfolio.cms.dto.response.SkillResponse;
import com.aakash.portfolio.cms.dto.response.SocialLinkResponse;

import com.aakash.portfolio.cms.entity.AnalyticsEventType;

import com.aakash.portfolio.cms.service.AnalyticsService;
import com.aakash.portfolio.cms.service.CertificateService;
import com.aakash.portfolio.cms.service.ContactMessageService;
import com.aakash.portfolio.cms.service.ExperienceService;
import com.aakash.portfolio.cms.service.ProfileService;
import com.aakash.portfolio.cms.service.ProjectService;
import com.aakash.portfolio.cms.service.ResumeService;
import com.aakash.portfolio.cms.service.SeoService;
import com.aakash.portfolio.cms.service.ServiceService;
import com.aakash.portfolio.cms.service.SkillService;
import com.aakash.portfolio.cms.service.SocialLinkService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final ProfileService profileService;
    private final ProjectService projectService;
    private final SkillService skillService;

    // Services CMS
    private final ServiceService serviceService;

    private final ExperienceService experienceService;
    private final CertificateService certificateService;
    private final ResumeService resumeService;
    private final SocialLinkService socialLinkService;
    private final SeoService seoService;
    private final ContactMessageService contactMessageService;
    private final AnalyticsService analyticsService;

    // =========================================================
    // PROFILE
    // =========================================================

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getProfile() {

        ProfileResponse profile =
                profileService.getPublicProfile();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Profile fetched successfully")
                        .data(profile)
                        .build()
        );
    }

    // =========================================================
    // PROJECTS
    // =========================================================

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse> getProjects() {

        List<ProjectResponse> projects =
                projectService.getPublishedProjects();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Projects fetched successfully")
                        .data(projects)
                        .build()
        );
    }

    @GetMapping("/projects/{slug}")
    public ResponseEntity<ApiResponse> getProjectBySlug(
            @PathVariable String slug
    ) {

        ProjectResponse project =
                projectService.getProjectBySlug(slug);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Project fetched successfully")
                        .data(project)
                        .build()
        );
    }

    // =========================================================
    // SKILLS
    // =========================================================

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse> getSkills() {

        List<SkillResponse> skills =
                skillService.getPublishedSkills();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Skills fetched successfully")
                        .data(skills)
                        .build()
        );
    }

    // =========================================================
    // SERVICES
    // =========================================================

    @GetMapping("/services")
    public ResponseEntity<ApiResponse> getServices() {

        List<ServiceResponse> services =
                serviceService.getPublishedServices();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Services fetched successfully")
                        .data(services)
                        .build()
        );
    }

    // =========================================================
    // EXPERIENCE
    // =========================================================

    @GetMapping("/experience")
    public ResponseEntity<ApiResponse> getExperience() {

        List<ExperienceResponse> experience =
                experienceService.getAllExperiences();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Experience fetched successfully")
                        .data(experience)
                        .build()
        );
    }

    // =========================================================
    // CERTIFICATES
    // =========================================================

    @GetMapping("/certificates")
    public ResponseEntity<ApiResponse> getCertificates() {

        List<CertificateResponse> certificates =
                certificateService.getAllCertificates();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Certificates fetched successfully")
                        .data(certificates)
                        .build()
        );
    }

    // =========================================================
    // RESUME
    // =========================================================

    @GetMapping("/resume/latest")
    public ResponseEntity<ApiResponse> getLatestResume() {

        ResumeResponse resume =
                resumeService.getLatestResume();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Resume fetched successfully")
                        .data(resume)
                        .build()
        );
    }

    @GetMapping("/resume/download")
    public RedirectView downloadResume(
            HttpServletRequest request
    ) {

        analyticsService.recordEvent(
                AnalyticsEventType.RESUME_DOWNLOAD,
                AnalyticsRequest.builder().build(),
                request
        );

        String downloadUrl =
                resumeService.getLatestResumeDownloadUrl();

        return new RedirectView(downloadUrl);
    }

    // =========================================================
    // SOCIAL LINKS
    // =========================================================

    @GetMapping("/social-links")
    public ResponseEntity<ApiResponse> getSocialLinks() {

        List<SocialLinkResponse> links =
                socialLinkService.getAllSocialLinks();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Social links fetched successfully")
                        .data(links)
                        .build()
        );
    }

    // =========================================================
    // SEO
    // =========================================================

    @GetMapping("/seo")
    public ResponseEntity<ApiResponse> getSeo() {

        SeoSettingResponse seo =
                seoService.getSeoSettings();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("SEO settings fetched successfully")
                        .data(seo)
                        .build()
        );
    }

    // =========================================================
    // CONTACT
    // =========================================================

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> submitContactMessage(
            @Valid @RequestBody ContactRequest request
    ) {

        ContactResponse response =
                contactMessageService.submitMessage(request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Message submitted successfully")
                        .data(response)
                        .build()
        );
    }
}