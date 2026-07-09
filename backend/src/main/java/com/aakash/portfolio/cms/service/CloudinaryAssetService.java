package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.response.ProjectImageResponse;
import com.aakash.portfolio.cms.dto.response.ProfileImageUploadResponse;
import com.aakash.portfolio.cms.dto.response.ResumePdfUploadResponse;
import com.aakash.portfolio.cms.dto.request.ProjectImageUploadRequest;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryAssetService {

    ProfileImageUploadResponse uploadProfileImage(Long profileId, MultipartFile file, String folder, String publicId);

    ResumePdfUploadResponse uploadResumePdf(Long resumeIdToReplaceOrNull, MultipartFile file, String folder, String publicId, Integer version);

    ProjectImageResponse uploadProjectImage(Long projectId, MultipartFile file, ProjectImageUploadRequest request);

}

