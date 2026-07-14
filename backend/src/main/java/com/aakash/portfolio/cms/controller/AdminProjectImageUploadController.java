package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.ProjectImageUploadMultipartRequest;
import com.aakash.portfolio.cms.dto.request.ProjectImageUploadRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ProjectImageResponse;
import com.aakash.portfolio.cms.service.CloudinaryAssetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;
@RestController
@RequestMapping("/api/admin/projects")
@RequiredArgsConstructor
public class AdminProjectImageUploadController {

    private final CloudinaryAssetService cloudinaryAssetService;
    private final ObjectMapper objectMapper;

      @PostMapping(
        value = "/{projectId}/images",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ResponseEntity<ApiResponse> uploadProjectImage(
        @PathVariable Long projectId,
        @RequestPart("image") MultipartFile file,
        @RequestPart("meta") String meta
) throws Exception {

    ProjectImageUploadMultipartRequest request =
            objectMapper.readValue(
                    meta,
                    ProjectImageUploadMultipartRequest.class
            );

    ProjectImageResponse response =
            cloudinaryAssetService.uploadProjectImage(
                    projectId,
                    file,
                    new ProjectImageUploadRequest(
                            request.folder(),
                            request.publicId(),
                            request.caption(),
                            request.primary()
                    )
            );

    return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.builder()
                    .success(true)
                    .message("Project image uploaded successfully")
                    .data(response)
                    .build());
}
}

