package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsRequest {

    @Size(max = 80, message = "Entity type must not exceed 80 characters")
    private String entityType;

    private Long entityId;
}