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
public class SeoSettingResponse {

    private Long id;

    private String siteTitle;

    private String metaDescription;

    private String keywords;

    private String ogTitle;

    private String ogDescription;

    private String ogImageUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
