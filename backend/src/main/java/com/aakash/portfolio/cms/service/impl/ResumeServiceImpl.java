package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.ResumeUploadRequest;
import com.aakash.portfolio.cms.dto.response.ResumeResponse;
import com.aakash.portfolio.cms.entity.Resume;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.ResumeRepository;
import com.aakash.portfolio.cms.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;

    @Override
    @Transactional
    public ResumeResponse uploadResume(ResumeUploadRequest request) {
        Resume resume = Resume.builder()
                .fileName(request.getFileName())
                .fileUrl(request.getFileUrl())
                .publicId(request.getPublicId())
                .version(request.getVersion())
                .build();

        return toResponse(resumeRepository.save(resume));
    }

    @Override
    public ResumeResponse getLatestResume() {
        Resume resume = resumeRepository.findAll().stream()
                .max((a, b) -> a.getUploadedAt().compareTo(b.getUploadedAt()))
                .orElseThrow(() -> new ResourceNotFoundException("No resume found"));
        return toResponse(resume);
    }

    @Override
    public List<ResumeResponse> getAllResumes() {
        return resumeRepository.findAll().stream()
                .sorted((a, b) -> b.getUploadedAt().compareTo(a.getUploadedAt()))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteResume(Long id) {
        if (!resumeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Resume not found with id: " + id);
        }
        resumeRepository.deleteById(id);
    }

    private ResumeResponse toResponse(Resume resume) {
        return ResumeResponse.builder()
                .id(resume.getId())
                .fileName(resume.getFileName())
                .fileUrl(resume.getFileUrl())
                .publicId(resume.getPublicId())
                .version(resume.getVersion())
                .uploadedAt(resume.getUploadedAt())
                .build();
    }
}
