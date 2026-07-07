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

    private String metaDescription;

    private String keywords;

    @Size(max = 160, message = "Open Graph title must not exceed 160 characters")
    private String ogTitle;

    private String ogDescription;

    @Size(max = 500, message = "Open Graph image URL must not exceed 500 characters")
    private String ogImageUrl;
}
