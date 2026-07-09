package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.response.ResumeResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResumeService {

    ResumeResponse uploadResume(MultipartFile file);

    ResumeResponse getLatestResume();

    List<ResumeResponse> getAllResumes();

    void deleteResume(Long id);
}