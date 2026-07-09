package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ProfileImageMultipartUploadRequest(
        @NotBlank String folder,
        String publicId
) {
}

