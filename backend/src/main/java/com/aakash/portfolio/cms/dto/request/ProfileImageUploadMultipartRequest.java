package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ProfileImageUploadMultipartRequest(
        @NotBlank String folder,
        String publicId
) {
}

