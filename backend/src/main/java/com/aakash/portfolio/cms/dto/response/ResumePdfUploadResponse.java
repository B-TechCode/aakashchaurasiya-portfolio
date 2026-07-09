package com.aakash.portfolio.cms.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ResumePdfUploadResponse {

    private Long resumeId;

    private String fileName;

    private String fileUrl;

    private String publicId;

    private Integer version;

    private LocalDateTime uploadedAt;

    private LocalDateTime updatedAt;
}

