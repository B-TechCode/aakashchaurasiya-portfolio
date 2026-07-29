
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
public class ServiceResponse {

    private Long id;

    private String title;

    private String description;

    private String iconName;

    private String tags;

    private Integer displayOrder;

    private boolean published;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}