package com.aakash.portfolio.cms.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProfileImageUploadResponse {

    private Long profileId;

    private String profileImageUrl;

    private String publicId;
}

