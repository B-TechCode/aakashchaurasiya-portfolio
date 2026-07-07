package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 160, message = "Title must not exceed 160 characters")
    private String title;

    @NotBlank(message = "Slug is required")
    @Size(max = 160, message = "Slug must not exceed 160 characters")
    private String slug;

    private String description;

    private String summary;

    @Size(max = 500, message = "GitHub URL must not exceed 500 characters")
    private String githubUrl;

    @Size(max = 500, message = "Live URL must not exceed 500 characters")
    private String liveUrl;

    private boolean featured;

    private boolean published;

    private Integer displayOrder;

    private Set<Long> skillIds;
}
