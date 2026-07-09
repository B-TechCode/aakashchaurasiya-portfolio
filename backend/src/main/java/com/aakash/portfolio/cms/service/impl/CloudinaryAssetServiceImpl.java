package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.cloudinary.CloudinaryService;
import com.aakash.portfolio.cms.cloudinary.CloudinaryUploadResult;
import com.aakash.portfolio.cms.dto.request.ProjectImageUploadRequest;
import com.aakash.portfolio.cms.dto.response.ProjectImageResponse;
import com.aakash.portfolio.cms.dto.response.ProfileImageUploadResponse;
import com.aakash.portfolio.cms.dto.response.ResumePdfUploadResponse;



import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.entity.Project;
import com.aakash.portfolio.cms.entity.ProjectImage;
import com.aakash.portfolio.cms.entity.Resume;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;

import com.aakash.portfolio.cms.repository.ProfileRepository;
import com.aakash.portfolio.cms.repository.ProjectImageRepository;
import com.aakash.portfolio.cms.repository.ProjectRepository;
import com.aakash.portfolio.cms.repository.ResumeRepository;
import com.aakash.portfolio.cms.service.CloudinaryAssetService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class CloudinaryAssetServiceImpl implements CloudinaryAssetService {

    private final CloudinaryService cloudinaryService;
    private final ProfileRepository profileRepository;
    private final ResumeRepository resumeRepository;
    private final ProjectRepository projectRepository;
    private final ProjectImageRepository projectImageRepository;

    @Override
    public ProfileImageUploadResponse uploadProfileImage(Long profileId, MultipartFile file, String folder, String publicId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with id: " + profileId));

        String oldPublicId = profile.getProfileImagePublicId();
        if (oldPublicId != null && !oldPublicId.isBlank()) {
            cloudinaryService.deleteResource(oldPublicId, "image");
        }


        CloudinaryUploadResult result = cloudinaryService.uploadImage(file, folder, publicId);
        profile.setProfileImageUrl(result.secureUrl());
        profile.setProfileImagePublicId(result.publicId());

        return ProfileImageUploadResponse.builder()
                .profileId(profile.getId())
                .profileImageUrl(result.secureUrl())
                .publicId(result.publicId())
                .build();

    }

    @Override
    public ResumePdfUploadResponse uploadResumePdf(Long resumeIdToReplaceOrNull, MultipartFile file, String folder, String publicId, Integer version) {
        Resume resume;
        if (resumeIdToReplaceOrNull != null) {
            resume = resumeRepository.findById(resumeIdToReplaceOrNull)
                    .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id: " + resumeIdToReplaceOrNull));
        } else {
            resume = null;
        }

        if (resume != null && resume.getPublicId() != null && !resume.getPublicId().isBlank()) {
            cloudinaryService.deleteResource(resume.getPublicId(), "raw");
        }

        CloudinaryUploadResult result = cloudinaryService.uploadRawPdf(file, folder, publicId);

        Resume saved;
        if (resume == null) {
            saved = Resume.builder()
                    .fileName(file.getOriginalFilename())
                    .fileUrl(result.secureUrl())
                    .publicId(result.publicId())
                    .version(version)
                    .build();
        } else {
            resume.setFileName(file.getOriginalFilename());
            resume.setFileUrl(result.secureUrl());
            resume.setPublicId(result.publicId());
            resume.setVersion(version);
            saved = resume;
        }

        saved = resumeRepository.save(saved);

        return ResumePdfUploadResponse.builder()
                .resumeId(saved.getId())
                .fileName(saved.getFileName())
                .fileUrl(saved.getFileUrl())
                .publicId(saved.getPublicId())
                .version(saved.getVersion())
                .uploadedAt(saved.getUploadedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

    @Override
    public ProjectImageResponse uploadProjectImage(Long projectId, MultipartFile file, ProjectImageUploadRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));

        // Replace: if client provides publicId, delete existing matching primary? We don't have mapping from publicId to record.
        // We'll delete only the current primary (if request.primary == true) by Cloudinary publicId stored on record.
        if (Boolean.TRUE.equals(request.primary())) {
            projectImageRepository.findByProjectIdAndPrimaryTrue(projectId)
                    .ifPresent(existingPrimary -> {
                        if (existingPrimary.getPublicId() != null && !existingPrimary.getPublicId().isBlank()) {
                            cloudinaryService.deleteResource(existingPrimary.getPublicId(), "image");
                        }
                        existingPrimary.setPrimary(false);
                        projectImageRepository.save(existingPrimary);
                    });
        }

        CloudinaryUploadResult result = cloudinaryService.uploadImage(file, request.folder(), request.publicId());

        ProjectImage image = ProjectImage.builder()
                .imageUrl(result.secureUrl())
                .publicId(result.publicId())
                .caption(request.caption())
                .primary(Boolean.TRUE.equals(request.primary()))
                .project(project)
                .build();

        ProjectImage saved = projectImageRepository.save(image);

        return ProjectImageResponse.builder()
                .id(saved.getId())
                .imageUrl(saved.getImageUrl())
                .publicId(saved.getPublicId())
                .caption(saved.getCaption())
                .primary(saved.isPrimary())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

}


