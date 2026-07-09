package com.aakash.portfolio.cms.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UploadedFileResponse {

    private String secureUrl;
    private String publicId;
}

