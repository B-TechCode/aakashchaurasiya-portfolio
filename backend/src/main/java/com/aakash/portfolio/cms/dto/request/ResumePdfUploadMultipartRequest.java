package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ResumePdfUploadMultipartRequest(
        @NotBlank String folder,
        String publicId,
        Integer version
) {
}

