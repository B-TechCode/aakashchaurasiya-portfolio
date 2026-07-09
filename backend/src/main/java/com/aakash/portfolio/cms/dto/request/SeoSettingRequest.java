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
public class SeoSettingRequest {

    @Size(max = 160, message = "Site title must not exceed 160 characters")
    private String siteTitle;

    @Size(max = 5000, message = "Meta description is too long")
    private String metaDescription;

    @Size(max = 5000, message = "Keywords are too long")
    private String keywords;

    @Size(max = 160, message = "OG title must not exceed 160 characters")
    private String ogTitle;

    @Size(max = 5000, message = "OG description is too long")
    private String ogDescription;

    @Size(max = 500, message = "OG image URL must not exceed 500 characters")
    private String ogImageUrl;
}