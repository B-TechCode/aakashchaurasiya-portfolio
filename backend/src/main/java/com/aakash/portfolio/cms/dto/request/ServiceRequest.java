
package com.aakash.portfolio.cms.dto.request;

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
public class ServiceRequest {

    @NotBlank(message = "Service title is required")
    @Size(max = 120, message = "Service title must not exceed 120 characters")
    private String title;

    @NotBlank(message = "Service description is required")
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @Size(max = 120, message = "Icon name must not exceed 120 characters")
    private String iconName;

    @Size(max = 500, message = "Tags must not exceed 500 characters")
    private String tags;

    private Integer displayOrder;

    private boolean published;
}