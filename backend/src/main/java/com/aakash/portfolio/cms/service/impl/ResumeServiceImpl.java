package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.cloudinary.CloudinaryService;
import com.aakash.portfolio.cms.cloudinary.CloudinaryUploadResult;
import com.aakash.portfolio.cms.dto.response.ResumeResponse;
import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.entity.Resume;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.ProfileRepository;
import com.aakash.portfolio.cms.repository.ResumeRepository;
import com.aakash.portfolio.cms.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final ProfileRepository profileRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    @Transactional
    public ResumeResponse uploadResume(MultipartFile file) {

        Profile profile = profileRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        Resume oldResume = resumeRepository
                .findTopByProfileOrderByVersionDesc(profile)
                .orElse(null);

        if (oldResume != null && oldResume.getPublicId() != null) {
            cloudinaryService.deleteResource(
                    oldResume.getPublicId(),
                    "raw"
            );
        }

        CloudinaryUploadResult uploadResult =
                cloudinaryService.uploadRawPdf(
                        file,
                        "portfolio/resume",
                        null
                );

        Resume resume = Resume.builder()
                .fileName(file.getOriginalFilename())
                .fileUrl(uploadResult.secureUrl())
                .publicId(uploadResult.publicId())
                .version(oldResume == null ? 1 : oldResume.getVersion() + 1)
                .profile(profile)
                .build();

        if (oldResume != null) {
            resumeRepository.delete(oldResume);
        }

        return toResponse(resumeRepository.save(resume));
    }

    @Override
    public ResumeResponse getLatestResume() {

        Profile profile = profileRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        Resume resume = resumeRepository
                .findTopByProfileOrderByVersionDesc(profile)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        return toResponse(resume);
    }

    @Override
    public List<ResumeResponse> getAllResumes() {
        return resumeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteResume(Long id) {

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        if (resume.getPublicId() != null) {
            cloudinaryService.deleteResource(
                    resume.getPublicId(),
                    "raw"
            );
        }

        resumeRepository.delete(resume);
    }

    private ResumeResponse toResponse(Resume resume) {

        return ResumeResponse.builder()
                .id(resume.getId())
                .fileName(resume.getFileName())
                .fileUrl(resume.getFileUrl())
                .publicId(resume.getPublicId())
                .version(resume.getVersion())
                .uploadedAt(resume.getUploadedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }
}