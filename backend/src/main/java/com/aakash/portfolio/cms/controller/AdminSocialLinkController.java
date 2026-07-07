package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.SocialLinkRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.SocialLinkResponse;
import com.aakash.portfolio.cms.service.SocialLinkService;
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
@RequestMapping("/api/admin/social-links")
@RequiredArgsConstructor
public class AdminSocialLinkController {

    private final SocialLinkService socialLinkService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllSocialLinks() {
        List<SocialLinkResponse> links = socialLinkService.getAllSocialLinks();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Social links fetched successfully").data(links).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createSocialLink(@Valid @RequestBody SocialLinkRequest request) {
        SocialLinkResponse link = socialLinkService.createSocialLink(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.builder().success(true).message("Social link created successfully").data(link).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateSocialLink(@PathVariable Long id, @Valid @RequestBody SocialLinkRequest request) {
        SocialLinkResponse link = socialLinkService.updateSocialLink(id, request);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Social link updated successfully").data(link).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteSocialLink(@PathVariable Long id) {
        socialLinkService.deleteSocialLink(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Social link deleted successfully").build());
    }
}
