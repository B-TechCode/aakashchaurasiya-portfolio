package com.aakash.portfolio.cms.dto.response;

import com.aakash.portfolio.cms.entity.AnalyticsEventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {

    private Long id;

    private AnalyticsEventType eventType;

    private String entityType;

    private Long entityId;

    private String ipHash;

    private String userAgent;

    private LocalDateTime createdAt;
}