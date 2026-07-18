package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.response.AnalyticsCountResponse;
import com.aakash.portfolio.cms.dto.response.AnalyticsResponse;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.entity.AnalyticsEventType;
import com.aakash.portfolio.cms.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
public class AdminAnalyticsController {

    private final AnalyticsService analyticsService;

   @GetMapping
public ResponseEntity<ApiResponse> getAllEvents(

        @RequestParam(defaultValue = "0") int page,

        @RequestParam(defaultValue = "10") int size

) {

    Page<AnalyticsResponse> events =
            analyticsService.getAllEvents(page, size);

    return ResponseEntity.ok(

            ApiResponse.builder()
                    .success(true)
                    .message("Analytics events fetched successfully")
                    .data(events)
                    .build()

    );

}

    @GetMapping("/type/{eventType}")
    public ResponseEntity<ApiResponse> getEventsByType(
            @PathVariable AnalyticsEventType eventType
    ) {

        List<AnalyticsResponse> events =
                analyticsService.getEventsByType(eventType);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Analytics events fetched successfully")
                        .data(events)
                        .build()
        );
    }

    @GetMapping("/counts")
    public ResponseEntity<ApiResponse> getCounts() {

        AnalyticsCountResponse counts =
                analyticsService.getCounts();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Analytics counts fetched successfully")
                        .data(counts)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteEvent(
            @PathVariable Long id
    ) {

        analyticsService.deleteEvent(id);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Analytics event deleted successfully")
                        .build()
        );
    }
}