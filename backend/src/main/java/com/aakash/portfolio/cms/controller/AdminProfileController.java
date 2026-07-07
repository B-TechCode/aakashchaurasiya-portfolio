package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.ProfileRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ProfileResponse;
import com.aakash.portfolio.cms.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/profile")
@RequiredArgsConstructor
public class AdminProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ApiResponse> getProfile() {
        ProfileResponse profile = profileService.getProfile();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Profile fetched successfully").data(profile).build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateProfile(@Valid @RequestBody ProfileRequest request) {
        ProfileResponse profile = profileService.updateProfile(request);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Profile updated successfully").data(profile).build());
    }
}
