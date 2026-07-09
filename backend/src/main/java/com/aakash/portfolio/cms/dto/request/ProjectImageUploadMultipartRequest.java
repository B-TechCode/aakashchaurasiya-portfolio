package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ProjectImageUploadMultipartRequest(
        @NotBlank String folder,
        String publicId,
        String caption,
        Boolean primary
) {
}

