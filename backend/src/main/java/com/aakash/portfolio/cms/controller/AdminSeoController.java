package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.SeoSettingRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.SeoSettingResponse;
import com.aakash.portfolio.cms.service.SeoSettingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/seo")
@RequiredArgsConstructor
public class AdminSeoController {

    private final SeoSettingService seoSettingService;

    @GetMapping
    public ResponseEntity<ApiResponse> getSeoSettings() {

        SeoSettingResponse response = seoSettingService.getSeoSettings();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("SEO settings fetched successfully")
                        .data(response)
                        .build()
        );
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateSeoSettings(
            @Valid @RequestBody SeoSettingRequest request) {

        SeoSettingResponse response =
                seoSettingService.updateSeoSettings(request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("SEO settings updated successfully")
                        .data(response)
                        .build()
        );
    }
}