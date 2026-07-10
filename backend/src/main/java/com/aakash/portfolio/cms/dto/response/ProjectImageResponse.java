package com.aakash.portfolio.cms.dto.response;

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
public class ProjectImageResponse {

    private Long id;

    private String imageUrl;

    private String publicId;

    private String caption;

    private boolean primary;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}