package com.aakash.portfolio.cms.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ProfileImageUploadRequest(
        @NotBlank String folder,
        String publicId
) {
}


