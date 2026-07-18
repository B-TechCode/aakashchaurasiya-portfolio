package com.aakash.portfolio.cms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectResponse {

    private Long id;

    private String title;

    private String slug;

    private String description;

    private String summary;

    private String githubUrl;

    private String liveUrl;

    private boolean featured;

    private boolean published;

    private Integer displayOrder;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<SkillResponse> skills;

    private List<ProjectImageResponse> images;
}
