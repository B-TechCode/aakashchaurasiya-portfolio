package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.SeoSettingRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.SeoSettingResponse;
import com.aakash.portfolio.cms.service.SeoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/seo")
@RequiredArgsConstructor
public class AdminSeoController {

    private final SeoService seoService;

    @GetMapping
    public ResponseEntity<ApiResponse> getSeoSettings() {
        SeoSettingResponse seo = seoService.getSeoSettings();
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("SEO settings fetched successfully")
                        .data(seo)
                        .build()
        );
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateSeoSettings(
            @Valid @RequestBody SeoSettingRequest request) {

        SeoSettingResponse seo = seoService.updateSeoSettings(request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("SEO settings updated successfully")
                        .data(seo)
                        .build()
        );
    }
}