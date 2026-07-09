package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.AnalyticsRequest;
import com.aakash.portfolio.cms.dto.response.AnalyticsResponse;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.entity.AnalyticsEventType;
import com.aakash.portfolio.cms.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class PublicAnalyticsController {

    private final AnalyticsService analyticsService;

    @PostMapping("/{eventType}")
    public ResponseEntity<ApiResponse> recordEvent(
            @PathVariable AnalyticsEventType eventType,
            @Valid @RequestBody AnalyticsRequest request,
            HttpServletRequest httpRequest
    ) {

        AnalyticsResponse response =
                analyticsService.recordEvent(
                        eventType,
                        request,
                        httpRequest
                );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.builder()
                        .success(true)
                        .message("Analytics event recorded successfully")
                        .data(response)
                        .build());
    }
}