package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 160)
    private String title;

    @NotBlank(message = "Organization is required")
    @Size(max = 160)
    private String organization;

    @Size(max = 120)
    private String location;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean currentlyWorking;

    private String description;

    private Integer displayOrder;
}