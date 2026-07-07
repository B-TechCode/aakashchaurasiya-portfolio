package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
public class SkillRequest {

    @NotBlank(message = "Skill name is required")
    @Size(max = 120, message = "Skill name must not exceed 120 characters")
    private String name;

    @Size(max = 80, message = "Category must not exceed 80 characters")
    private String category;

    @Min(value = 0, message = "Proficiency must be at least 0")
    @Max(value = 100, message = "Proficiency must be at most 100")
    private Integer proficiency;

    @Size(max = 120, message = "Icon name must not exceed 120 characters")
    private String iconName;

    private Integer displayOrder;

    private boolean published;
}
