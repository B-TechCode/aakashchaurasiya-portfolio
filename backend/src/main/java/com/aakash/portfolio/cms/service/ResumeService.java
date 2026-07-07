package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ResumeUploadRequest;
import com.aakash.portfolio.cms.dto.response.ResumeResponse;

import java.util.List;

public interface ResumeService {

    ResumeResponse uploadResume(ResumeUploadRequest request);

    ResumeResponse getLatestResume();

    List<ResumeResponse> getAllResumes();

    void deleteResume(Long id);
}
