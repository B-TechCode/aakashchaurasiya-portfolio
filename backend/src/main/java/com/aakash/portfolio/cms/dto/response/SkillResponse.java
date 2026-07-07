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
public class SkillResponse {

    private Long id;

    private String name;

    private String category;

    private Integer proficiency;

    private String iconName;

    private Integer displayOrder;

    private boolean published;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
